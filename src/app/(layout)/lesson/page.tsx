import Player from "@/components/player";
import st from "./st.module.sass";
import { List } from "lucide-react";

const data = {
  video: {
    playlist: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    poster:
      "https://pic.rutubelist.ru/video/2024-12-03/be/7d/be7d3d890dba06f2004336cbf6668f0d.jpg",
    timecodes: [
      { label: "Начало", time: 10 },
      { label: "Почти середина", time: 20 },
      { label: "Почти 2 середины", time: 30 },
      { label: "Конец", time: 70 },
    ],
  },
  task: "oge-info-1",
  materials: [
    {
      type: "pdf",
      name: "Основные типы заданий и их решения",
      weight: "1.2КБ",
      link: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    },
    {
      type: "pdf",
      name: "Основные типы заданий и их решения",
      weight: "1.2КБ",
      link: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    },
    {
      type: "pdf",
      name: "Основные типы заданий и их решения",
      weight: "1.2КБ",
      link: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    },
  ],
  name: "Теория: Задание №1 (восстановление пропущенного слова)",
  course: "ОГЭ - Информатика",
  description:
    "Видео представляет собой подробный разбор задания 1 из ЕГЭ по информатике, предназначенный для школьников, готовящихся к экзамену, а также для преподавателей и репетиторов, желающих углубить понимание темы.\n" +
    "В ролике рассматриваются ключевые аспекты задания, связанного с анализом информационных моделей. \n" +
    "Объясняется, как правильно интерпретировать и работать с различными типами данных, представленных в виде таблиц, графиков, диаграмм, схем и других форматов, часто встречающихся в этом задании.\n" +
    "В видео разбираются типичные примеры задач, включая пошаговое решение с акцентом на логику и последовательность действий.\n" +
    "Особое внимание уделяется распространенным ошибкам, которые допускают учащиеся, и способам их избежания. Также даются практические советы по эффективному распределению времени на экзамене и подходам к анализу условий задачи. Материал подан простым и доступным языком, чтобы помочь даже тем, кто только начинает подготовку.\n" +
    "Видео подходит как для самостоятельного изучения, так и для использования в учебных группах, обеспечивая прочную базу для успешного выполнения задания 1 на ЕГЭ.",
};
const personal_data = {
  lesson_date: "08 июня 2025",
  like: false,
  dislike: false,
  passed: false,
  plan_practice: false,
  your_lessons: [
    {
      type: "theory",
      name: "Задание № 1 (сопоставление графических и табличных данных",
      time: 26,
      difficulty: 2,
      XP: 31,
    },
    {
      type: "practice",
      name: "Задание № 1 (сопоставление графических и табличных данных",
      time: 26,
      difficulty: 2,
      XP: 31,
    },
  ],
};

const page = () => {
  return (
    <>
      <div className={st.wrapper}>
        <div className={st.column}>
          <div className={`${st.cont} ${st.video__container}`}>
            <div className={st.player}>
              <Player src={data.video.playlist} points={data.video.timecodes} />
            </div>
            <h1>{data.name}</h1>
            <span>Урок курса {data.course}</span>
            <div className={st.lesson_table}>
              <div className={st.left}>
                Дата прохождения по плану: {personal_data.lesson_date}
              </div>
              <div className={st.right}>
                <div className={st.like_block}>
                  <button className="btn secondary">Лайк</button>
                  <button className="btn secondary">Дизлайк</button>
                </div>
                {!personal_data.passed ? (
                  <button className="btn primary">Отметить пройденным</button>
                ) : (
                  <button className="btn secondary">
                    Пройден {personal_data.passed}
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className={st.bottom}>
            <div className={`${st.cont} ${st.description}`}>
              <h2>Описание</h2>
              <p>{data.description}</p>
            </div>
            <div className={`${st.cont} ${st.timecodes}`}>
              <h2>Таймкоды</h2>
              <ul>
                {data.video.timecodes.map((item, i) => (
                  <li key={i}>
                    <span>{String(item.time)}</span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={st.column}>
          <div className={`${st.cont} ${st.materials}`}>
            <h2>Материалы к уроку</h2>
            <ul className={st.materials__block}>
              {data.materials.map((item, i) => (
                <li key={i}>
                  <List />
                  <div>
                    <span>{item.name}</span>
                    <small>{item.weight}</small>
                  </div>
                  <button className="btn secondary">Скачать</button>
                </li>
              ))}
            </ul>
          </div>
          <div className={`${st.cont} ${st.practice}`}>
            <h2>Практика</h2>
            <div className={st.message}>План?!?!?!</div>
            <div className={st.grid}>
              <button className="btn secondary">5 случайных</button>
              <button className="btn secondary">10 случайных</button>
              <button className="btn secondary">Все прототипы</button>
              <button className="btn secondary">Потоковое решение</button>
              <button className="btn primary">
                Переключиться в режим задач
              </button>
            </div>
          </div>
          <div className={`${st.cont} ${st.today}`}>
            <h2>Твои занятия на сегодня по информатике</h2>
            <ul className={st.list}>
              {personal_data.your_lessons.map((item, i) => (
                <li key={i}>
                  <div>
                    <span>
                      <span>{item.type}</span>
                      {item.name}
                    </span>
                    <div className={st.bottom}>
                      <span>
                        Время выполнения: <span>{String(item.time)}</span>
                      </span>
                      <span>
                        Сложность: <span>{String(item.difficulty)}</span>
                      </span>
                      <span>
                        XP: <span>{String(item.XP)}</span>
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
              <button className="btn primary">Далее</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
