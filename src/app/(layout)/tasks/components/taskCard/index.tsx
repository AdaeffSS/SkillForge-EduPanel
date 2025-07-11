import st from "./st.module.sass";
import React from "react";
import api from "@/assets/lib/api";
import { useRouter } from "next/navigation"

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
    const router = useRouter();

    const handleClick = async (data: TaskCardProps) => {
        const createSession = await api.post('/sessions/create', {
            type: 'train',
            code: `${data.exam}.${data.subject}`,
            task: data.type
        })
        router.push(createSession.data)
    }

    return (
        <div
            onClick={() => handleClick(data)}
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
    );
}

export default Component
