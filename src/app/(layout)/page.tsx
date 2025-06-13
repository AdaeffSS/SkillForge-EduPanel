import Header from "@/components/header";
import Footer from "@/components/footer";
import Calendar from "@/components/calendar";
import LineStat from "@/components/stats/line";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Главная",
};

const page = () => {
  return (
    <>
      <h1>Page content</h1>
    </>
  );
};

export default page;
