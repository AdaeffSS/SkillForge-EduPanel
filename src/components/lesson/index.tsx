import React from "react";
import { CircleCheck } from "lucide-react";
import st from "./st.module.sass";

type LessonItemProps = {
  item: {
    type: "theory" | "practice" | string;
    name: string;
    time: number;
    difficulty: number;
    XP: number;
    lesson_id: number;
    isOver: boolean;
  };
  currentLessonId?: number;
  bcg?: string;
};

const LessonListItem: React.FC<LessonItemProps> = ({
  item,
  currentLessonId,
    bcg='#272727',
}) => {
  return (
    <div
      className={`${currentLessonId === item.lesson_id ? st.this : ""} ${st.item}`}
      style={{ '--color': bcg } as React.CSSProperties}
    >
      <div className={st.left} style={{ opacity: item.isOver ? 0.4 : 1} as React.CSSProperties}>
        <span className={st.name}>
          <span
            className={st.type}
            style={
              {
                color:
                  item.type === "theory"
                    ? "#00DDFF"
                    : item.type === "practice"
                      ? "#D400FF"
                      : "#fff",
              } as React.CSSProperties
            }
          >
            {item.type === "theory"
              ? "Теория"
              : item.type === "practice"
                ? "Практика"
                : "Занятие"}
            :
          </span>{" "}
          {item.name}
        </span>
        <div className={st.bottom}>
          <span>
            Время выполнения: <span>{String(item.time)} минут</span>
          </span>
          <span>
            Сложность: <span>{String(item.difficulty)}</span>
          </span>
          <span>
            XP: <span>{String(item.XP)}</span>
          </span>
        </div>
      </div>
      <CircleCheck
        size={32}
        color={item.isOver ? "#fff" : "rgba(255,255,255,0.4)"}
      />
    </div>
  );
};

export default LessonListItem;
