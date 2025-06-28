"use client";

import React, { useEffect, useState } from "react";
import api from "@/assets/lib/api";

type Task = {
    id: string;
    body: string;
};

const TestTaskPage: React.FC = () => {
    const [task, setTask] = useState<Task | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTask = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get<Task>("/tasks/", {
                    params: {
                        exam: "oge",
                        subject: "info",
                        task: "t_1",
                    },
                });
                setTask(response.data);
            } catch (err: any) {
                setError(err.message || "Ошибка при загрузке задания");
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, []);

    if (loading) return <p>Загрузка задания...</p>;
    if (error) return <p style={{ color: "red" }}>Ошибка: {error}</p>;

    return (
        <div>
            <h1>Тестовое задание</h1>
            {task ? (
                <div>
                    <p><strong>ID:</strong> {task.id}</p>
                    <p><strong>Текст задания:</strong> <span dangerouslySetInnerHTML={{
                        __html: task.body.replace(/\\n/g, "<br />"),
                    }}/></p>
                </div>
            ) : (
                <p>Задание не найдено</p>
            )}
        </div>
    );
};

export default TestTaskPage;
