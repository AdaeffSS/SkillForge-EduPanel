"use client";

import st from "./st.module.sass";
import React from "react";
import TaskCard from "@/app/(layout)/tasks/components/taskCard";

interface TemplateProps {
  name: string;
  hint?: string;
  code: string;
  color: string;
}

interface TaskProps {
  type: string;
  name: string;
  percentage: number;
  method: string;
  color: string;
  points: number;
  exam: string;
  subject: string;
}

const selectedTasks = [
  {
    type: {
      code: "1_1",
      name: "Определение информационного объёма сообщения",
    },
    level: {
      code: "easy",
      name: "Легкий",
      color: "#255e18",
    },
    count: 3,
    source: {
      code: "fipi",
      name: "ФИПИ",
      color: "#66294E",
    },
  },
  {
    type: {
      code: "1_1",
      name: "Определение информационного объёма сообщения",
    },
    level: {
      code: "easy",
      name: "Легкий",
      color: "#255e18",
    },
    count: 3,
    source: {
      code: "skf",
      name: "SkillForge",
      color: "#295D66",
    },
  },
];
const tasks: TaskProps[] = [
  {
    type: "t_1",
    name: "Информационный объем сообщения",
    percentage: 80,
    method: "python",
    color: "27",
    points: 1,
    exam: 'oge',
    subject: 'info',
  },
  {
    type: "t_2",
    name: "Информационный объем сообщения",
    percentage: 80,
    method: "python",
    color: "27",
    points: 1,
    exam: 'oge',
    subject: 'info',
  },
  {
    type: "t_3",
    name: "Информационный объем сообщения",
    percentage: 80,
    method: "python",
    color: "27",
    points: 1,
    exam: 'oge',
    subject: 'info',
  },
  {
    type: "t_4",
    name: "Информационный объем сообщения",
    percentage: 80,
    method: "python",
    color: "27",
    points: 1,
    exam: 'oge',
    subject: 'info',
  },
  {
    type: "t_5",
    name: "Информационный объем сообщения",
    percentage: 80,
    method: "python",
    color: "27",
    points: 1,
    exam: 'oge',
    subject: 'info',
  },
  {
    type: "t_6",
    name: "Информационный объем сообщения",
    percentage: 80,
    method: "python",
    color: "27",
    points: 1,
    exam: 'oge',
    subject: 'info',
  },
];
const templates: TemplateProps[] = [
  {
    name: "Экзамен",
    hint: "Тренировка экзамена. Время ограничено. Подсказки и ответы скрыты.",
    code: "exam",
    color: "#cd4f50",
  },
  {
    name: "Тестирование",
    code: "test",
    color: "#C074B3",
  },
];

const templateChoose = async (code: string) => {
  alert(`hi ${code}`);
};

const page = () => {
  return (
    <div className={st.wrapper}>
      {/*<div className={st.course}>*/}
      {/*  <h2>Курс</h2>*/}
      {/*  <select name="course" id="course">*/}
      {/*    <option value="oge-info">ОГЭ ИНФОРМАТИКА</option>*/}
      {/*  </select>*/}
      {/*</div>*/}
      <div className={`${st.lt} ${st.col}`}>
        <h2>Задания курса ОГЭ по информатике</h2>
        <div className={st.grid}>
          {tasks.map((item: TaskProps, i) => (
            <TaskCard key={i} data={item} />
          ))}
        </div>
      </div>
      <div className={`${st.rt} ${st.col}`}>
        <h2>Составить вариант</h2>
        <div className={`${st.templates__container} ${st.container}`}>
          <h3>Шаблоны вариантов</h3>
          <div className={st.templates}>
            {templates.map((item, i) => (
              <button
                className={st.template_button}
                key={i}
                style={{ "--color": item.color } as React.CSSProperties}
                data-exam-code={item.code}
                onClick={() => templateChoose(item.code)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
        <div className={`${st.manually} ${st.container}`}>
          <h3>Вручную</h3>
          <div className={`${st.settings} ${st.box}`}>
            <h4>Настройки варианта</h4>
          </div>
          <div className={st.box}>
            <h4>Список заданий</h4>
            <small className={st.info}>6 заданий, 2 типа</small>
            <div className={st.task__list}>
              {selectedTasks.map((item, i) => (
                <div
                  className={st.selected_task}
                  style={
                    { "--color": item.source.color } as React.CSSProperties
                  }
                  key={i}
                >
                  <span className={st.number}>{i + 1}</span>
                  <div>
                    <span>
                      Тип {item.type.code.replace("_", ".")} - {item.type.name}
                    </span>
                    <small>
                      Уровень: {item.level.name.toLowerCase()}, Количество:{" "}
                      {item.count}, Источник: {item.source.name}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={st.buttons}>
          <button className="btn secondary">Сбросить</button>
          <button className="btn primary">Создать вариант</button>
        </div>
      </div>
    </div>
  );
};

export default page;
