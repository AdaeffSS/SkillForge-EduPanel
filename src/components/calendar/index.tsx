"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles.module.sass";
import subjectsConfig from "@/config/subjects.json";
import { formatDateToString, generateWeeks, getAcademicYearRange } from "./utils/calendarUtils";

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const months = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];

interface Subject {
  type: string;
  letter: string;
  color: string;
}

interface LessonsData {
  [date: string]: string[];
}

interface DateRange {
  start: Date;
  end: Date;
}

interface ProcessedLessonsData {
  [date: string]: Subject[];
}

const typedSubjectsConfig: Subject[] = subjectsConfig;

const DayCell = React.memo<{ day: Date | null; processedLessons: ProcessedLessonsData }>(
    ({ day, processedLessons }) => {
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
    }
);

interface AcademicYearCalendarTableProps {
  lessonsData?: LessonsData;
}

const AcademicYearCalendarTable: React.FC<AcademicYearCalendarTableProps> = ({ lessonsData = {} }) => {
  const [dateRange] = useState<DateRange>(getAcademicYearRange());
  const [processedLessons, setProcessedLessons] = useState<ProcessedLessonsData>({});
  const tbodyRef = useRef<HTMLTableSectionElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (!lessonsData || !Object.keys(lessonsData).length) {
      setProcessedLessons({});
      return;
    }

    const result: ProcessedLessonsData = {};
    for (const date in lessonsData) {
      const types = lessonsData[date];
      result[date] = types
          .map((type) => typedSubjectsConfig.find((s) => s.type === type))
          .filter((subject): subject is Subject => Boolean(subject));
    }
    setProcessedLessons(result);
  }, [lessonsData]);

  const weeks = useMemo(() => generateWeeks(dateRange.start, dateRange.end), [dateRange]);

  useEffect(() => {
    if (!tbodyRef.current) return;
    const todayBox = tbodyRef.current.querySelector(`.${styles.box}.${styles.today}`) as HTMLElement;
    if (!todayBox) return;

    const tbody = tbodyRef.current;
    const tbodyTop = tbody.getBoundingClientRect().top;
    const todayTop = todayBox.getBoundingClientRect().top;
    const offset = todayTop - tbodyTop + tbody.scrollTop;

    tbody.scrollTo({ top: offset, behavior: "smooth" });
    setIsActive(true);
  }, [weeks]);

  return (
      <div className={styles.wrapper}>
        <table className={`${styles.table} ${isActive && styles.active}`}>
          <thead className={styles.thead}>
          <tr>{weekDays.map((day) => <th key={day}>{day}</th>)}</tr>
          </thead>
          <tbody className={styles.tbody} ref={tbodyRef}>
          {weeks.map((week, i) => (
              <tr key={i}>
                {week.map((day, idx) => <DayCell key={idx} day={day} processedLessons={processedLessons} />)}
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default AcademicYearCalendarTable;