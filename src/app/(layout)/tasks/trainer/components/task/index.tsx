"use client";

import st from "./st.module.sass";
import { TaskProps } from "@/app/(layout)/tasks/trainer/page";
import React from "react";
import ReactMarkdown from "react-markdown";
import api from "@/assets/lib/api";
import remarkBreaks from "remark-breaks";
import Markdown from "@/components/markdown";

const handleSubmit = async (
  id: string,
  e: React.FormEvent<HTMLFormElement>,
) => {
  e.preventDefault();
  const answer = new FormData(e.currentTarget).get("answer");
  try {
      const res: any = await api.post("/tasks/", {
          task: id,
          answer,
      });
      alert(res.data.status);
  } catch (e: any) {
      console.log(e.response.data.message);
      }
};

const Task = ({ data, number }: { data: TaskProps; number: number }) => {
    console.log(data.body);

  return (
    <div className={st.task}>
      <div
        className={st.header}
        style={{ "--color": data?.source?.color || '324' } as React.CSSProperties}
      >
        <div className={st.left}>
          <span className={st.number}>{number + 1}</span>
          <span className={st.text}>
            <span className={st.type}>
              Тип {data?.type?.code.replace("t_", "").replace("_", ".") || '1.1'}:{" "}
              {data?.type?.name || 'Информационный объём сообщения'}.
            </span>{" "}
            Источник: {data?.source?.label || 'ФИПИ'}. Уровень: {data?.level?.label || 'средний'}. Время
            решения: {data?.time || 4} мин
          </span>
        </div>
        <small className={st.right}>ID: {data?.id}</small>
      </div>
      <div className={st.content}>
          <Markdown>
              {data.body}
          </Markdown>
      </div>
      <div className={st.bottom}>
        <form
          onSubmit={(e) => handleSubmit(data.id, e)}
          className={st.input__wrapper}
        >
          <span>Ответ:</span>
          <div className={st.input__container}>
            <button className={`btn secondary ${st.btn}`}>Ответить</button>
            <input name="answer" type="text" className={st.input} />
          </div>
        </form>
        <div className={st.buttons}>
          <button className={`btn secondary ${st.btn}`}>Подсказка</button>
          <button className={`btn primary ${st.btn}`}>Решение</button>
        </div>
      </div>
    </div>
  );
};

export default Task;
