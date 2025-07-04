"use client";

import { useSearchParams, notFound } from "next/navigation";
import React, { useEffect, useState } from "react";
import st from "../st.module.sass";
import Task from "./task";
import api from "@/assets/lib/api";

type SearchParams = {
  t?: string;
  exam?: string;
  sub?: string;
};

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

const TrainerPageContent = () => {
  const searchParams = useSearchParams();
  const params: SearchParams = Object.fromEntries(searchParams.entries());
  if (typeof params.t !== "string") {
    notFound();
  }

  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [solvedTasks, setSolvedTasks] = useState<string[]>([]);

  const handleTaskSuccess = (taskId: string) => {
    setSolvedTasks(prev => {
      if (!prev.includes(taskId)) {
        return [...prev, taskId];
      }
      return prev;
    });
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get(
          `/tasks?exam=${params.exam}&subject=${params.sub}&task=${params.t}`,
        );
        setTasks((prev) => [...prev, res.data]);
      } catch (error) {
        console.error("Ошибка при загрузке задач:", error);
      }
    };
    fetchTasks().then(() => {});
  }, [solvedTasks]);

  return (
    <div className={st.container}>
      <div className={st.header}>
        <h1>
          Тренировка: Решение заданий #{params.t.replace("t_", "")} из ОГЭ по
          информатике
        </h1>
        <span>Без ограничения по времени. Бесконечный поток</span>
      </div>
      <div className={st.columns}>
        <div className={st.col}>
          <h2>Решение заданий</h2>
          <div className={st.tasks}>
            {tasks.length ? (
              tasks.map((item, i) => (
                <Task
                  key={i}
                  onSuccess={handleTaskSuccess}
                  data={item}
                  number={i}
                />
              ))
            ) : (
              <span style={{ color: "brown", fontSize: 24 }}>
                Вы пока-что не запросили ни одной задачи
              </span>
            )}
          </div>
        </div>
        <div className={st.col}>
          <h2>Управление</h2>
        </div>
      </div>
    </div>
  );
};

export default TrainerPageContent;
