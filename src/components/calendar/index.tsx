"use client";

import React, { useEffect, useRef, useState } from "react";
import getAcademicYearRange from "./utils/academicYearRange";
import st from "./styles.module.sass";
import subjectsConfig from "@/config/subjects.json";

const week_days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const months = [
  "янв",
  "фев",
  "мар",
  "апр",
  "май",
  "июн",
  "июл",
  "авг",
  "сен",
  "окт",
  "ноя",
  "дек",
];

function getDayOfWeek(date: Date) {
  const jsDay = date.getDay();
  return jsDay === 0 ? 7 : jsDay;
}

function toLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

type LessonsData = {
  [date: string]: string[];
};

type Props = {
  lessonsData?: LessonsData;
};

type Subject = {
  type: string;
  letter: string;
  color: string;
};

type ProcessedLessonsData = {
  [date: string]: Subject[];
};

export default function AcademicYearCalendarTable({ lessonsData = {} }: Props) {
  const [range, setRange] = useState<{ start: Date; end: Date } | null>(null);
  const [processedLessons, setProcessedLessons] =
    useState<ProcessedLessonsData>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    setRange(getAcademicYearRange());
  }, []);

  // Преобразуем lessonsData с учетом subjectsConfig
  useEffect(() => {
    if (!lessonsData) return;

    const result: ProcessedLessonsData = {};

    for (const date in lessonsData) {
      const types = lessonsData[date];
      const lessonsForDate = types
        .map((type) => subjectsConfig.find((subject) => subject.type === type))
        .filter(Boolean) as Subject[];

      result[date] = lessonsForDate;
    }

    setProcessedLessons(result);
  }, [lessonsData]);

  const days: Date[] = [];
  let weeks: (Date | null)[][] = [];

  if (range) {
    const { start, end } = range;
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }

    const firstDayWeek = getDayOfWeek(start);
    const emptyCellsCount = firstDayWeek - 1;
    const cells = [...Array(emptyCellsCount).fill(null), ...days];

    for (let i = 0; i < cells.length; i += 7) {
      weeks.push(cells.slice(i, i + 7));
    }
  }

  useEffect(() => {
    if (!range || !containerRef.current || !weeks.length || !tableRef.current)
      return;

    const scrollToCurrentWeek = () => {
      const todayBox = containerRef.current!.querySelector(
        `.${st.box}.${st.today}`,
      );

      if (todayBox instanceof HTMLElement) {
        todayBox.scrollIntoView({ block: "start" });
        tableRef.current!.classList.add(st.active);
      }
    };

    scrollToCurrentWeek();
  }, [range, weeks.length]);

  if (!range) return <div className={st.cont} ref={containerRef} />;

  return (
    <div className={st.wrapper} ref={containerRef}>
      <table className={st.table} ref={tableRef}>
        <thead className={st.thead}>
          <tr>
            {week_days.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody className={st.tbody}>
          {weeks.map((week, i) => (
            <tr key={i}>
              {week.map((day, idx) => (
                <td key={idx} className={st.td}>
                  {day && (
                    <div
                      className={
                        st.box +
                        (day.toDateString() === new Date().toDateString()
                          ? ` ${st.today}`
                          : "")
                      }
                    >
                      <div className={st.date}>
                        <span className={st.dayNumber}>{day.getDate()}</span>
                        <small className={st.month}>
                          {months[day.getMonth()]}
                        </small>
                      </div>
                      <ul className={st.lessons}>
                        {(processedLessons[toLocalDateString(day)] ?? []).map(
                          (lesson, idx) => (
                            <li
                                className={st.subject}
                              key={idx}
                              title={lesson.letter}
                              style={
                                {
                                  "--color": lesson.color,
                                } as React.CSSProperties
                              }
                            >
                              {lesson.letter}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
