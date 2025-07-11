"use client";

import React, { useEffect, useState } from "react";
import st from "../st.module.sass";
import Task from "../components/task";
import api from "@/assets/lib/api";
import Loader from "@/components/loader";

export interface TaskProps {
    type: {
        code: string;
        name: string;
    };
    source: {
        type: string;
        label: string;
        color: string;
    };
    level: {
        code: string;
        label: string;
    };
    time: number;
    id: string;
    body: string;
}

const TrainerPageContent = ({ session }: { session: any }) => {

    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [solvedTasks, setSolvedTasks] = useState<string[]>([]);
    const [activeTaskIndex, setActiveTaskIndex] = useState(0);

    const fetchTasks = async (count = 1) => {
        try {
            const { data } = await api.put(`/sessions/${session.id}/add-tasks`, [{
                    type: session.trainSession.task,
                    count
                }]
            );
            setTasks(prev => [...prev, ...data]);
        } catch (error) {
            console.error("Ошибка при загрузке задач:", error);
        }
    };

    const handleTaskSuccess = (taskId: string) => {
        setSolvedTasks((prev) => {
            if (!prev.includes(taskId)) {
                setActiveTaskIndex((prevIndex) => prevIndex + 1);
                return [...prev, taskId];
            }
            return prev;
        });
    };

    useEffect(() => {
        if (activeTaskIndex >= tasks.length) {
            fetchTasks(1).then();
        }
    }, [activeTaskIndex]);

    return (
        <div className={st.container}>
            <div className={st.header}>
                <h1>
                    Тренировка: Решение заданий #1 из ОГЭ по
                    информатике
                </h1>
                <span>Без ограничения по времени. Бесконечный поток</span>
            </div>
            <div className={st.columns}>
                <div className={st.col}>
                    <h2>Решение заданий</h2>
                    <div className={st.tasks}>
                        {tasks.length === 0 ? (
                            <Loader text={"Загружаем задания"} />
                        ) : (
                            tasks.map((item, i) => (
                                <Task
                                    key={i}
                                    onSuccess={handleTaskSuccess}
                                    data={item}
                                    sessionId={session.id}
                                    number={i}
                                    isActive={i === activeTaskIndex}
                                />
                            ))
                        )}
                    </div>
                </div>
                <div className={st.col}>
                    <h2>Управление</h2>
                    <span>Сгенерировано заданий: {tasks.length}</span>
                    <span>Верных решений заданий: {solvedTasks.length}</span>
                </div>
            </div>
        </div>
    );
};

export default TrainerPageContent;
