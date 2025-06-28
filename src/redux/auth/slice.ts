import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface AuthState {
  user: { id: string; phone: string } | null;
  isLoading: boolean;
  error: string | null;
}
const initialState: AuthState = { user: null, isLoading: false, error: null };
export const login = createAsyncThunk(
  "auth/login",
  async (
    { phone, code }: { phone: string; code: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/verify-otp",
        { phone, code },
        { withCredentials: true },
      );
      return response.data.user;
    } catch (error) {
      return rejectWithValue("Неверный телефон или код");
    }
  },
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
export const { logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
