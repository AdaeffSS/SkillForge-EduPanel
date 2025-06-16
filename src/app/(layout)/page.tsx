import Header from "@/components/header";
import Footer from "@/components/footer";
import Calendar from "@/components/calendar";
import LineStat from "@/components/stats/line";
import { Metadata } from "next";
import st from "./st.module.sass";
import StatBlock from "../../components/stats/mainStatBlock";

export const metadata: Metadata = {
  title: "Главная",
};

const testData = {
  "2025-01-01": ["math", "rus"],
  "2025-01-02": ["rus", "info"],
  "2025-01-03": ["math"],
  "2025-01-06": ["info", "rus"],
  "2025-01-07": ["math", "rus"],
  "2025-01-08": ["info", "math"],
  "2025-01-09": ["rus", "info"],
  "2025-01-10": ["info"],
  "2025-01-13": ["rus", "info"],
  "2025-01-14": ["math", "rus"],
  "2025-01-15": ["info", "math"],
  "2025-01-16": ["math"],
  "2025-01-17": ["rus", "info"],
  "2025-01-20": ["math", "rus", "info"],
  "2025-01-21": ["info", "rus"],
  "2025-01-22": ["math", "info"],
  "2025-01-23": ["rus"],
  "2025-01-24": ["math", "rus"],
  "2025-01-27": ["info", "math"],
  "2025-01-28": ["rus", "info"],
  "2025-01-29": ["math", "rus"],
  "2025-01-30": ["info"],
  "2025-01-31": ["math", "info"],
  "2025-02-03": ["rus", "math"],
  "2025-02-04": ["info", "rus"],
  "2025-02-05": ["math"],
  "2025-02-06": ["rus", "info"],
  "2025-02-07": ["math", "rus"],
  "2025-02-10": ["info", "math"],
  "2025-02-11": ["rus"],
  "2025-02-12": ["math", "info"],
  "2025-02-13": ["rus", "math"],
  "2025-02-14": ["info", "rus"],
  "2025-02-17": ["math", "rus", "info"],
  "2025-02-18": ["info", "math"],
  "2025-02-19": ["rus"],
  "2025-02-20": ["math", "info"],
  "2025-02-21": ["rus", "math"],
  "2025-02-24": ["info", "rus"],
  "2025-02-25": ["math"],
  "2025-02-26": ["rus", "info"],
  "2025-02-27": ["math", "rus"],
  "2025-02-28": ["info", "math"],
  "2025-03-03": ["rus", "info"],
  "2025-03-04": ["math"],
  "2025-03-05": ["info", "rus"],
  "2025-03-06": ["math", "rus"],
  "2025-03-07": ["info"],
  "2025-03-10": ["math", "info"],
  "2025-03-11": ["rus", "math"],
  "2025-03-12": ["info", "rus"],
  "2025-03-13": ["math", "rus", "info"],
  "2025-03-14": ["info"],
  "2025-03-17": ["rus", "math"],
  "2025-03-18": ["info", "rus"],
  "2025-03-19": ["math"],
  "2025-03-20": ["rus", "info"],
  "2025-03-21": ["math", "rus"],
  "2025-03-24": ["info", "math"],
  "2025-03-25": ["rus"],
  "2025-03-26": ["math", "info"],
  "2025-03-27": ["rus", "math"],
  "2025-03-28": ["info", "rus"],
  "2025-03-31": ["math", "rus"],
  "2025-04-01": ["info"],
  "2025-04-02": ["rus", "math"],
  "2025-04-03": ["info", "rus"],
  "2025-04-04": ["math"],
  "2025-04-07": ["rus", "info"],
  "2025-04-08": ["math", "rus"],
  "2025-04-09": ["info", "math"],
  "2025-04-10": ["rus"],
  "2025-04-11": ["math", "info"],
  "2025-04-14": ["rus", "math"],
  "2025-04-15": ["info", "rus"],
  "2025-04-16": ["math", "rus", "info"],
  "2025-04-17": ["info"],
  "2025-04-18": ["rus", "math"],
  "2025-04-21": ["info", "rus"],
  "2025-04-22": ["math"],
  "2025-04-23": ["rus", "info"],
  "2025-04-24": ["math", "rus"],
  "2025-04-25": ["info", "math"],
  "2025-04-28": ["rus"],
  "2025-04-29": ["math", "info"],
  "2025-04-30": ["rus", "math"],
  "2025-05-01": ["info", "rus"],
  "2025-05-02": ["math"],
  "2025-05-05": ["rus", "info"],
  "2025-05-06": ["math", "rus"],
  "2025-05-07": ["info", "math"],
  "2025-05-08": ["rus"],
  "2025-05-09": ["math", "info"],
  "2025-05-12": ["rus", "math"],
  "2025-05-13": ["info", "rus"],
  "2025-05-14": ["math", "rus", "info"],
  "2025-05-15": ["info"],
  "2025-05-16": ["rus", "math"],
  "2025-05-19": ["info", "rus"],
  "2025-05-20": ["math"],
  "2025-05-21": ["rus", "info"],
  "2025-05-22": ["math", "rus"],
  "2025-05-23": ["info", "math"],
  "2025-05-26": ["rus"],
  "2025-05-27": ["math", "info"],
  "2025-05-28": ["rus", "math"],
  "2025-05-29": ["info", "rus"],
  "2025-05-30": ["math"],
  "2025-06-02": ["rus", "info"],
  "2025-06-03": ["math", "rus"],
  "2025-06-04": ["info", "math"],
  "2025-06-05": ["rus"],
  "2025-06-06": ["math", "info"],
  "2025-06-09": ["rus", "math"],
  "2025-06-10": ["info", "rus"],
  "2025-06-11": ["math", "rus", "info"],
  "2025-06-12": ["info"],
  "2025-06-13": ["rus", "math"],
  "2025-06-16": ["info", "rus"],
  "2025-06-17": ["math"],
  "2025-06-18": ["rus", "info"],
  "2025-06-19": ["math", "rus"],
  "2025-06-20": ["info", "math"],
  "2025-06-23": ["rus"],
  "2025-06-24": ["math", "info"],
  "2025-06-25": ["rus", "math"],
  "2025-06-26": ["info", "rus"],
  "2025-06-27": ["math"],
  "2025-06-30": ["rus", "info"],
  "2025-07-01": ["math", "rus"],
  "2025-07-02": ["info", "math"],
  "2025-07-03": ["rus"],
  "2025-07-04": ["math", "info"],
  "2025-07-07": ["rus", "math"],
  "2025-07-08": ["info", "rus"],
  "2025-07-09": ["math", "rus", "info"],
  "2025-07-10": ["info"],
  "2025-07-11": ["rus", "math"],
  "2025-07-14": ["info", "rus"],
  "2025-07-15": ["math"],
  "2025-07-16": ["rus", "info"],
  "2025-07-17": ["math", "rus"],
  "2025-07-18": ["info", "math"],
  "2025-07-21": ["rus"],
  "2025-07-22": ["math", "info"],
  "2025-07-23": ["rus", "math"],
  "2025-07-24": ["info", "rus"],
  "2025-07-25": ["math"],
  "2025-07-28": ["rus", "info"],
  "2025-07-29": ["math", "rus"],
  "2025-07-30": ["info", "math"],
  "2025-07-31": ["rus"],
};

const testStat = [
  {
    subject: "all",
    type: "oge",
    stat: {
      goal: {
        target: 270,
        now: 235,
        percentage: (270 / 235) * 100,
      },
      preparedness: 14,
      materialCompleted: 4,
      tasksSolved: {
        count: 513,
        need: 876,
        percentage: (513 / 876) * 100,
      },
      testSolved: {
        count: 4,
        need: 12,
        percentage: (4 / 12) * 100,
      },
    },
  },
  {
    subject: "info",
    type: "oge",
    stat: {
      goal: {
        target: 85,
        now: 67,
        percentage: (67 / 85) * 100,
      },
      preparedness: 10,
      materialCompleted: 3,
      tasksSolved: {
        count: 123,
        need: 200,
        percentage: (123 / 200) * 100,
      },
      testSolved: {
        count: 2,
        need: 5,
        percentage: (2 / 5) * 100,
      },
    },
  },
  {
    subject: "rus",
    type: "oge",
    stat: {
      goal: {
        target: 100,
        now: 76,
        percentage: (76 / 100) * 100,
      },
      preparedness: 15,
      materialCompleted: 6,
      tasksSolved: {
        count: 345,
        need: 500,
        percentage: (345 / 500) * 100,
      },
      testSolved: {
        count: 3,
        need: 8,
        percentage: (3 / 8) * 100,
      },
    },
  },
  {
    subject: "math",
    type: "oge",
    stat: {
      goal: {
        target: 85,
        now: 52,
        percentage: (52 / 85) * 100,
      },
      preparedness: 12,
      materialCompleted: 4,
      tasksSolved: {
        count: 212,
        need: 400,
        percentage: (212 / 400) * 100,
      },
      testSolved: {
        count: 1,
        need: 6,
        percentage: (1 / 6) * 100,
      },
    },
  },
];

const page = () => {
  return (
    <div className={st.container}>
      <div className={`${st.column__stat} ${st.column}`}>
        <div className={`${st.stat} cont`}>
          <h1>Статистика</h1>
          <div className={st.stat__block}>
            <StatBlock data={testStat[1]} />
            <StatBlock data={testStat[2]} />
            <StatBlock data={testStat[3]} />
          </div>
        </div>
      </div>
      <div className={st.column}>
        <div className="cont">
          <h1>План на сегодня</h1>
        </div>
        <div className="cont">
          <h1>Расписание</h1>
          <div className={st.calendar}>
            <Calendar lessonsData={testData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
