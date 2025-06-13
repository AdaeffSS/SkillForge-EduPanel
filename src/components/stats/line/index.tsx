import st from "./st.module.sass";
import React from "react";

const LineStat = ({
  color,
  percentage,
}: {
  color: string;
  percentage: number;
}) => {
  return (
    <div className={st.line}>
      <span
        className={st.color}
        style={{ "--color": color, width: `${percentage}%` } as React.CSSProperties}
      />
    </div>
  );
};

export default LineStat;
