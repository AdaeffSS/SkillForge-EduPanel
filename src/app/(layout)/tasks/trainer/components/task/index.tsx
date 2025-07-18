"use client";

import React, { useEffect, useRef, useState } from "react";
import st from "./st.module.sass";
import { TaskProps } from "@/app/(layout)/tasks/trainer/components/TrainerPageContent";
import api from "@/assets/lib/api";
import Markdown from "@/components/markdown";

const Task = ({
  data,
  number,
  onSuccess,
  isActive,
}: {
  data: TaskProps;
  number: number;
  onSuccess: (taskId: string, attempts: number) => void;
  isActive: boolean;
}) => {
  const [status, setStatus] = useState<"solved" | "incorrect" | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const [alreadySolved, setAlreadySolved] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setVisible(true);
  }, []);

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      if (rootRef.current) {
        rootRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [isActive]);

  const handleSubmit = async (
    id: string,
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    try {
      const res = await api.post<{
        status: "solved" | "incorrect";
        attempts: number;
      }>("/tasks/", {
        task: id,
        answer,
      });

      setStatus(res.data.status);
      setAttempts(res.data.attempts);

      if (res.data.status === "solved") {
        onSuccess(id, res.data.attempts);
      }
    } catch (e: any) {
      if (e?.response?.status === 409) {
        setAlreadySolved(true);
        setStatus(null);
      } else {
        console.error("Ошибка при отправке:", e);
      }
    }
  };

  return (
    <div
        ref={rootRef}
      className={`${visible ? st.visible : ""} ${st.task}`}
      style={
        {
          "--color":
            status == "solved"
              ? "157"
              : status == "incorrect"
                ? "340"
                : data?.source?.color || "324",
        } as React.CSSProperties
      }
    >
      <div className={st.header}>
        <div className={st.left}>
          <span className={st.number}>{number + 1}</span>
          <span className={st.text}>
            <span className={st.type}>
              Тип{" "}
              {data?.type?.code.replace("t_", "").replace("_", ".") || "1.1"}:{" "}
              {data?.type?.name || "Информационный объём сообщения"}.
            </span>{" "}
            Источник: {data?.source?.label || "ФИПИ"}. Уровень:{" "}
            {data?.level?.label || "средний"}. Время решения: {data?.time || 4}{" "}
            мин
          </span>
        </div>
        <small className={st.right}>ID: {data?.id}</small>
      </div>

      <div className={st.content}>
        <Markdown>{data.body}</Markdown>
      </div>

      <div className={st.bottom}>
        <form
          onSubmit={(e) => handleSubmit(data.id, e)}
          className={st.input__wrapper}
        >
          <span>Ответ:</span>
          <div
            className={`${status == "solved" ? st.active : status == "incorrect" ? st.incorrect : ""} ${st.input__container}`}
          >
            <button
              disabled={alreadySolved || status == "solved"}
              className={`btn secondary ${st.btn}`}
            >
              Ответить
            </button>
            <input
              ref={inputRef}
              disabled={alreadySolved || status == "solved"}
              name="answer"
              value={answer}
              type="text"
              placeholder={"Введите ответ"}
              className={st.input}
              onChange={(e) => {
                setAnswer(e.target.value);
                if (status) setStatus(null);
                if (alreadySolved) setAlreadySolved(false);
              }}
            />
          </div>
        </form>
        <div className={st.buttons}>
          <button
            disabled={alreadySolved || status == "solved"}
            className={`btn secondary ${st.btn}`}
          >
            Подсказка
          </button>
          <button
            disabled={alreadySolved || status == "solved"}
            className={`btn primary ${st.btn}`}
          >
            Решение
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
