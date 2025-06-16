import st from "./st.module.sass";
import React, { JSX } from "react";
import subConf from "@/config/subjects.json";
import LineStat from "@/components/stats/line";
import Link from "next/link";

interface Props {
  data: {
    subject: string;
    type: string;
    stat: {
      goal: {
        target: number;
        now: number;
        percentage: number;
      };
      preparedness: number;
      materialCompleted: number;
      tasksSolved: {
        count: number;
        need: number;
        percentage: number;
      };
      testSolved: {
        count: number;
        need: number;
        percentage: number;
      };
    };
  };
}

interface Subject {
  type: string;
  color: string;
  letter: string;
  name: string;
}

export default function ({ data }: Props): JSX.Element {
  const subject: Subject = subConf.find(
    (item) => item.type === data.subject,
  ) || { type: "", color: "", letter: "", name: "" };
  return (
    <div className={st.container}>
      <div
        style={{ "--color": subject?.color } as React.CSSProperties}
        className={st.subject__container}
      >
        <span className={st.type}>{data.type === "oge" ? "ОГЭ" : "ЕГЭ"}</span>
        <span className={st.subject}>{subject?.name}</span>
      </div>
      <div className={st.lines__block}>
        <div className={st.block}>
          <span>Цель экзамена - <span style={{ color: subject.color}}>{data.stat.goal.target} баллов</span></span>
          <div className={st.line}>
            <LineStat
              color={subject.color}
              percentage={data.stat.goal.percentage}
            />
          </div>
        </div>
        <div className={st.block}>
          <span>Подготовленность к экзамену - <span style={{ color: subject.color}}>{data.stat.preparedness}%</span></span>
          <div className={st.line}>
            <LineStat
                color={subject.color}
                percentage={data.stat.preparedness}
            />
          </div>
        </div>
        <div className={st.block}>
          <span>Пройдено материала - <span style={{ color: subject.color}}>{data.stat.materialCompleted}%</span></span>
          <div className={st.line}>
            <LineStat
                color={subject.color}
                percentage={data.stat.materialCompleted}
            />
          </div>
        </div>
        <div className={st.block}>
          <span>Решено прототипов - <span style={{ color: subject.color}}>{data.stat.tasksSolved.count} / {data.stat.tasksSolved.need}</span></span>
          <div className={st.line}>
            <LineStat
                color={subject.color}
                percentage={data.stat.tasksSolved.percentage}
            />
          </div>
        </div>
        <div className={st.block}>
          <span>Пройдено материала - <span style={{ color: subject.color}}>{data.stat.materialCompleted}%</span></span>
          <div className={st.line}>
            <LineStat
                color={subject.color}
                percentage={data.stat.materialCompleted}
            />
          </div>
        </div>
      </div>
      <span className={st.total}>Поднажми! Если ты продолжишь в том же темпе, ты не успеешь пройти весь материал. Мы в тебя верим!</span>
      <Link href={'#'} className={'btn secondary'}>Полная статистика курса</Link>
    </div>
  );
}
