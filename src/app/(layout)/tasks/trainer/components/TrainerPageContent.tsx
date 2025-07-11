// "use client";
//
// import { useSearchParams, notFound, useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import st from "../st.module.sass";
// import Task from "../../../sessions/[id]/components/task";
// import api from "@/assets/lib/api";
// import Loader from "@/components/loader";
//
// type SearchParams = {
//   t?: string;
//   exam?: string;
//   sub?: string;
// };
//
// export interface TaskProps {
//   type: {
//     code: string;
//     name: string;
//   };
//   source: {
//     type: string;
//     label: string;
//     color: string;
//   };
//   level: {
//     code: string;
//     label: string;
//   };
//   time: number;
//   id: string;
//   body: string;
// }
//
// const TrainerPageContent = ({ session }: { session: any }) => {
//   return (
//     <div className={st.container}>
//       <div className={st.header}>
//         <h1>
//           Тренировка: Решение заданий #{params.t.replace("t_", "")} из ОГЭ по
//           информатике
//         </h1>
//         <span>Без ограничения по времени. Бесконечный поток</span>
//       </div>
//       <div className={st.columns}>
//         <div className={st.col}>
//           <h2>Решение заданий</h2>
//           <div className={st.tasks}>
//             {tasks.length === 0 ? (
//               <Loader text={"Загружаем задания"} />
//             ) : (
//               tasks.map((item, i) => (
//                 <Task
//                   key={i}
//                   onSuccess={handleTaskSuccess}
//                   data={item}
//                   number={i}
//                   isActive={i === activeTaskIndex}
//                 />
//               ))
//             )}
//           </div>
//         </div>
//         <div className={st.col}>
//           <h2>Управление</h2>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default TrainerPageContent;
