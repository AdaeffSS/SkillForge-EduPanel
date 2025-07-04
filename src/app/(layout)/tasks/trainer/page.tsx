"use client";

import { notFound, useSearchParams } from "next/navigation";
import st from "./st.module.sass";
import Task from "./components/task";
import React, {useEffect} from "react";
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

const TrainerPage = () => {
  const searchParams = useSearchParams();
  const params: SearchParams = Object.fromEntries(searchParams.entries());
  if (typeof params.t !== "string") {
    notFound();
  }

  const [tasks, setTasks] = React.useState<TaskProps[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await api.get(`/tasks?exam=${params.exam}&subject=${params.sub}&task=${params.t}`)
                setTasks((prev) => [...prev, res.data]);
            } catch (error) {
                console.error("Ошибка при загрузке задач:", error);
            }
        };

        fetchTasks();
    }, []);


  return (
    <div className={st.container}>
      <div className={st.header}>
        <h1>
          Тренировка: Решение заданий #{params.t.replace("t_", "")} из ОГЭ
          по информатике
        </h1>
        <span>Без ограничения по времени. Бесконечный поток</span>
      </div>
      <div className={st.columns}>
        <div className={st.col}>
          <h2>Решение заданий</h2>
          <div className={st.tasks}>
            {tasks.length ? (
              tasks.map((item, i) => <Task key={i} data={item} number={i} />)
            ) : (
              <span style={{ color: "brown", fontSize: 24 } as React.CSSProperties}>Вы пока-что не запросили ни одной задачи</span>
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

export default TrainerPage;
