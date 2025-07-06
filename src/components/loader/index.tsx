import React from "react";
import st from "./st.module.sass";

const Loader = ({ text }: { text: string }) => {
  return (
    <div className={st.loaderWrapper}>
      <div className={st.dotsWrapper}>
        <div className={st.dots}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <span className={st.text}>{text}</span>
    </div>
  );
};

export default Loader;
