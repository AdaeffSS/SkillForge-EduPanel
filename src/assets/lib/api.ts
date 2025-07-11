import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
    withCredentials: true,
});

let isRefreshing = false;
let isRedirecting = false;

type FailedRequest = {
    resolve: (value: AxiosResponse) => void;
    reject: (error: AxiosError) => void;
    originalRequest: AxiosRequestConfig;
};

let failedQueue: FailedRequest[] = [];

function processQueue(error: AxiosError | null) {
    failedQueue.forEach(({ resolve, reject, originalRequest }) => {
        if (error) {
            reject(error);
        } else {
            api(originalRequest).then(resolve).catch(reject);
        }
    });
    failedQueue = [];
}

api.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
        const status = error.response?.status;

        if (
            status === 401 &&
            (originalRequest.url === '/auth/refresh' || originalRequest.url?.includes('/auth/refresh'))
        ) {
            console.warn('[axios] Refresh itself failed with 401. Redirecting to /login');
            if (!isRedirecting && typeof window !== 'undefined') {
                isRedirecting = true;
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }

        if (status === 401 && !originalRequest._retry) {
            console.warn('[axios] 401 detected. Starting refresh flow…');
            originalRequest._retry = true;

            if (isRefreshing) {
                console.warn('[axios] Already refreshing. Queuing request…');
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject, originalRequest });
                });
            }

            isRefreshing = true;

            try {
                await api.post('/auth/refresh');
                processQueue(null);
                return api(originalRequest);
            } catch (refreshError: any) {
                processQueue(refreshError as AxiosError);

                if (!isRedirecting && typeof window !== 'undefined') {
                    isRedirecting = true;
                    window.location.href = '/login';
                }

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
