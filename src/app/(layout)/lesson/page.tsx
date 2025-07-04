"use client";

import Player from "@/components/player";
import st from "./st.module.sass";
import {CircleCheck, MessageSquareText} from "lucide-react";
import Like from "@/assets/images/like";
import ReactMarkdown from "react-markdown";
import "katex/dist/katex.min.css";
import PDF from "@/assets/images/pfd";
import React from "react";
import Lesson from "@/components/lesson";
import Markdown from "@/components/markdown";

const data = {
  lesson_id: 1,
  video: {
    playlist: "https://storage.yandexcloud.net/hls-test-adaeff/master.m3u8",
    poster:
      "https://pic.rutubelist.ru/video/2024-12-03/be/7d/be7d3d890dba06f2004336cbf6668f0d.jpg",
    timecodes: [
      { label: "Начало", time: 10 },
      { label: "Почти середина", time: 20 },
      { label: "Почти 2 середины", time: 30 },
      { label: "Конец", time: 70 },
    ],
  },
  task: "oge-info-1",
  materials: [
    {
      type: "pdf",
      name: "Основные типы заданий и их решения",
      weight: "1.2КБ",
      link: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    },
    {
      type: "pdf",
      name: "Все типы заданий и их решения",
      weight: "1.2КБ",
      link: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    },
    {
      type: "pdf",
      name: "Алгоритм решения задания",
      weight: "1.2КБ",
      link: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    },
  ],
  name: "Теория: Задание №1 (восстановление пропущенного слова)",
  course: "ОГЭ - Информатика",
  description:
    "**Задание 1 ЕГЭ по информатике**\n" +
    "\n" +
    "**Описание задания**  \n" +
    "Задание 1 проверяет умение анализировать информацию, представленную в виде таблиц, диаграмм или текстов, и выполнять простые вычисления или логические выводы. Обычно это задание связано с основами логики, системами счисления или анализом данных.\n" +
    "\n" +
    "**Пример задания**  \n" +
    "Дана таблица истинности для логического выражения. Определите, какому выражению она соответствует:  \n" +
    "| A | B | C | F |\n" +
    "|---|---|---|-------|\n" +
    "| 0 | 0 | 0 |   0   |\n" +
    "| 0 | 0 | 1 |   1   |\n" +
    "| 0 | 1 | 0 |   0   |\n" +
    "| 0 | 1 | 1 |   1   |\n" +
    "| 1 | 0 | 0 |   0   |\n" +
    "| 1 | 0 | 1 |   1   |\n" +
    "| 1 | 1 | 0 |   0   |\n" +
    "| 1 | 1 | 1 |   1   |\n" +
    "\n" +
    "**Варианты ответа**:  \n" +
    "1. \\( A \\land B \\land C \\)  \n" +
    "2. \\( A \\lor B \\lor C \\)  \n" +
    "3. \\( (A \\land B) \\lor C \\)  \n" +
    "4. \\( A \\lor (B \\land C) \\)\n" +
    "\n" +
    "**Решение**  \n" +
    "Анализируя таблицу, видим, что \\( F = 1 \\), когда \\( C = 1 \\). Это указывает на то, что результат зависит от \\( C \\). Проверяем варианты: выражение \\( A \\lor (B \\land C) \\) соответствует таблице, так как \\( F = 1 \\), если \\( A = 1 \\) или \\( B \\land C = 1 \\).  \n" +
    "**Ответ**: 4.\n" +
    "\n" +
    "**Советы по выполнению**  \n" +
    "- Внимательно читайте условие и анализируйте данные.  \n" +
    "- Проверяйте каждый вариант ответа, подставляя значения из таблицы.  \n" +
    "- Используйте логические законы для упрощения выражений.",
};
const personal_data = {
  lesson_date: "08 июня 2025",
  like: false,
  dislike: false,
  passed: false,
  plan_practice: false,
  your_lessons: [
    {
      type: "theory",
      name: "Задание № 1 (сопоставление графических и табличных данных)",
      time: 26,
      difficulty: 2,
      XP: 31,
      lesson_id: 0,
      isOver: true,
    },
    {
      type: "theory",
      name: "Задание № 1 (сопоставление графических и табличных данных)",
      time: 26,
      difficulty: 2,
      XP: 31,
      lesson_id: 1,
      isOver: false,
    },
    {
      type: "practice",
      name: "Задание № 1 (сопоставление графических и табличных данных)",
      time: 26,
      difficulty: 2,
      XP: 31,
      lesson_id: 2,
      isOver: false,
    },
  ],
};

const secondsToTime = (s: number) =>
  `${Math.floor(s / 3600)
    .toString()
    .padStart(2, "0")}:${Math.floor((s % 3600) / 60)
    .toString()
    .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

const page = () => {
  return (
    <>
      <div className={st.wrapper}>
        <div className={`${st.left_col} ${st.column}`}>
          <div className={`${st.cont} ${st.player__container}`}>
            <div className={st.player}>
              <Player src={data.video.playlist} poster={data.video.poster} points={data.video.timecodes} />
            </div>
            <h1>{data.name}</h1>
            <small className={st.lesson_text}>Урок курса {data.course}</small>
            <div className={st.lesson_table}>
              <div className={st.left}>
                Дата по плану: {personal_data.lesson_date}
              </div>
              <div className={st.right}>
                <div className={st.like_block}>
                  <button className={st.like}>
                    Нравится
                    <Like height={24} width={27} />
                  </button>
                  <button className={st.dislike}>
                    <Like style={{ scale: "1 -1" }} height={24} width={27} />
                  </button>
                </div>
                {!personal_data.passed ? (
                  <button className={`${st.btn} btn primary`}>Отметить пройденным</button>
                ) : (
                  <button  className={`${st.btn} btn secondary`}>
                    Пройден {personal_data.passed}
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className={st.bottom}>
            <div className={`${st.cont} ${st.description}`}>
              <h2 style={{ margin: "0 0 12px" }}>Описание</h2>
              <Markdown>{data.description}</Markdown>
            </div>
            <div className={`${st.cont} ${st.timecodes}`}>
              <h2>Таймкоды</h2>
              <ul className={st.timecodes__block}>
                {data.video.timecodes.map((item, i) => (
                  <li key={i}>
                    <button className={st.timecode_btn}>
                      <span>{secondsToTime(item.time)}</span>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={st.column}>
          <div className={`${st.cont} ${st.materials}`}>
            <h2>Материалы к уроку</h2>
            <ul className={st.materials__block}>
              {data.materials.map((item, i) => (
                <li
                  onClick={() =>
                    alert(`Загрузка файла "${item.name}" началась.`)
                  }
                  className={st.materials__item}
                  key={i}
                >
                  <PDF className={st.icon} />
                  <div>
                    <span>{item.name}</span>
                    <small>
                      {item.type.toUpperCase()}, {item.weight}
                    </small>
                  </div>
                  <button className={`${st.btn} btn secondary`}>Скачать</button>
                </li>
              ))}
            </ul>
          </div>
          <div className={`${st.cont} ${st.practice}`}>
            <h2>Практика</h2>
            {personal_data.plan_practice ? (
              <div className={`${st.ok} ${st.message}`}><MessageSquareText size={54} className={st.icon} />Твой план подготовки совпадает с практикой! Ты можешь приступить к практике сам, или по плану. Удачи!</div>
            ) : (
                <div className={`${st.no} ${st.message}`}><MessageSquareText size={54} className={st.icon} />Обрати внимание! Твой план расходится с практикой. Мы рекомендуем проходить курс по индивидуальному маршруту, построенному конкретно под тебя. Удачи!</div>
            )}

            <div className={st.grid}>
              <button className="btn secondary">5 случайных</button>
              <button className="btn secondary">10 случайных</button>
              <button className="btn secondary">Все прототипы</button>
              <button className="btn secondary">Потоковое решение</button>
              <button className="btn primary">
                Переключиться в режим задач
              </button>
            </div>
          </div>
          <div className={`${st.cont} ${st.today}`}>
            <h2>Твои занятия на сегодня по информатике</h2>
            <ul className={st.list}>
              {personal_data.your_lessons.map((item, i) => (
                <li key={i}><Lesson bcg={'#303030'} item={item} currentLessonId={data.lesson_id}/></li>
              ))}
            </ul>
            <button className="btn primary">Далее</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
