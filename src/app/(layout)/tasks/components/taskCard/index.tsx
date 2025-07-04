import st from "./st.module.sass";
import React from "react";
import Link from "next/link";

interface TaskCardProps {
    type: string,
    name: string,
    percentage: number,
    method: string,
    color: string,
    points: number,
    exam: string;
    subject: string;
}

type Props = {
    data: TaskCardProps
}

const Component = ({data}: Props) => {
    return (
      <Link href={`/tasks/trainer?t=t_1&exam=${data.exam}&sub=${data.subject}`}>
          {/*<Link href={`/tasks/trainer?t=${data.type}&exam=${data.exam}&sub=${data.subject}`}>*/}
        <div
          className={st.task}
          style={{ "--color": data.color } as React.CSSProperties}
        >
          <div className={st.raw}>
            <span>#{data.type.replace('t_', '')}</span>
            <div className={st.info}>
              <small className={st.points}>{data.points}</small>
              <small
                className={st.method}
              >{`${data.method.slice(0, 1).toUpperCase()}${data.method.slice(1).toLowerCase()}`}</small>
              <small className={st.percentage}>{data.percentage}%</small>
            </div>
          </div>
          <span className={st.name}>{data.name}</span>
        </div>
      </Link>
    );
}

export default Component
