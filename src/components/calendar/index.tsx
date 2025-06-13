"use client";

import React, {useEffect, useMemo, useRef, useState} from "react";
import styles from "./styles.module.sass";
import subjectsConfig from "@/config/subjects.json";
import {formatDateToString, getAcademicYearRange, generateWeeks} from "./utils/calendarUtils";

interface DateRange {
  start: Date;
  end: Date;
}
interface Subject {
  type: string;
  letter: string;
  color: string;
}
interface LessonsData {
  [date: string]: string[];
}
interface ProcessedLessonsData {
  [date: string]: Subject[];
}
interface AcademicYearCalendarTableProps {
  lessonsData?: LessonsData;
}

const typedSubjectsConfig: Subject[] = subjectsConfig;

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
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

const DayCell = React.memo<{
  day: Date | null;
  processedLessons: ProcessedLessonsData;
}>(({ day, processedLessons }) => {
  if (!day) return <td className={styles.td} />;

  const dateString = formatDateToString(day);
  const isToday = day.toDateString() === new Date().toDateString();

  return (
      <td className={styles.td}>
        <div className={`${styles.box} ${isToday ? styles.today : ""}`}>
          <div className={styles.date}>
            <span className={styles.dayNumber}>{day.getDate()}</span>
            <small className={styles.month}>{months[day.getMonth()]}</small>
          </div>
          <ul className={styles.subjects}>
            {(processedLessons[dateString] ?? []).map((lesson, idx) => (
                <li
                    className={styles.subject}
                    key={idx}
                    title={lesson.letter}
                    style={{ "--color": lesson.color } as React.CSSProperties}
                >
                  {lesson.letter}
                </li>
            ))}
          </ul>
        </div>
      </td>
  );
});

const AcademicYearCalendarTable: React.FC<AcademicYearCalendarTableProps> = ({
                                                                               lessonsData = {},
                                                                             }) => {
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [processedLessons, setProcessedLessons] = useState<ProcessedLessonsData>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    setDateRange(getAcademicYearRange());
  }, []);

  useEffect(() => {
    if (!lessonsData || !Object.keys(lessonsData).length) {
      setProcessedLessons({});
      return;
    }

    const result: ProcessedLessonsData = {};
    for (const date in lessonsData) {
      const types = lessonsData[date];
      result[date] = types
          .map((type) => {
            const subject = typedSubjectsConfig.find((s) => s.type === type);
            if (!subject) {
              console.warn(`Subject with type "${type}" not found in subjectsConfig for date ${date}`);
              return null;
            }
            return subject;
          })
          .filter((subject): subject is Subject => subject !== null);
    }

    setProcessedLessons(result);
  }, [lessonsData]);

  const weeks = useMemo(() => {
    if (!dateRange) return [];
    return generateWeeks(dateRange.start, dateRange.end);
  }, [dateRange]);

  useEffect(() => {
    if (!dateRange || !containerRef.current || !tableRef.current || !weeks.length) return;

    const scrollToCurrentWeek = () => {
      const todayBox = containerRef.current!.querySelector(`.${styles.box}.${styles.today}`);
      if (todayBox instanceof HTMLElement) {
        todayBox.scrollIntoView({ block: "start", behavior: "smooth" });
        tableRef.current!.classList.add(styles.active);
      }
    };

    scrollToCurrentWeek();
  }, [dateRange]);

  if (!dateRange) return <div className={styles.cont} ref={containerRef} />;

  return (
      <div className={styles.wrapper} ref={containerRef}>
        <table className={styles.table} ref={tableRef}>
          <thead className={styles.thead}>
          <tr>
            {weekDays.map((day) => (
                <th key={day}>{day}</th>
            ))}
          </tr>
          </thead>
          <tbody className={styles.tbody}>
          {weeks.map((week, i) => (
              <tr key={i}>
                {week.map((day, idx) => (
                    <DayCell key={idx} day={day} processedLessons={processedLessons} />
                ))}
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default AcademicYearCalendarTable;