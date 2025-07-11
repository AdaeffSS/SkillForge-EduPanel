"use client";

import {useSearchParams, notFound, useRouter} from "next/navigation";
import React, { useEffect, useState } from "react";
import st from "../st.module.sass";
import Task from "./task";
import api from "@/assets/lib/api";
import Loader from "@/components/loader";

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
  const router = useRouter();

  const [taskCount, setTaskCount] = useState(1);
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [solvedTasks, setSolvedTasks] = useState<string[]>([]);
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);

  const fetchTasks = async (count = 1) => {
    try {
      const res = await api.get(
        `/tasks?exam=${params.exam}&subject=${params.sub}&task=${params.t}&count=${count}`,
      );
      const newTasks = Array.isArray(res.data) ? res.data : [res.data];
      setTasks((prev) => [...prev, ...newTasks]);
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

  const handleTest = async () => {
    const link = await api.post('/sessions/create', {
      type: 'train'
    })
    router.push(link.data);
  }

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
            {tasks.length === 0 ? (
                <Loader text={"Загружаем задания"} />
            ) : (
                tasks.map((item, i) => (
                    <Task
                        key={i}
                        onSuccess={handleTaskSuccess}
                        data={item}
                        number={i}
                        isActive={i === activeTaskIndex}
                    />
                ))
            )}
          </div>
        </div>
        <div className={st.col}>
          <h2>Управление</h2>
          <div className={st.buttons}>
            <div className={st.cnt_btn__wrapper}>
              <label>
                Кол-во заданий:
                <input
                    className={st.input}
                  type="number"
                  min={1}
                  value={taskCount}
                  onChange={(e) => setTaskCount(Number(e.target.value))}
                />
              </label>
              <button
                className="btn primary"
                onClick={() => fetchTasks(taskCount)}
              >
                Добавить заданий: {taskCount}
              </button>
            </div>
            <button
                className="btn primary"
                onClick={() => handleTest()}
            >
              Сессия
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerPageContent;
