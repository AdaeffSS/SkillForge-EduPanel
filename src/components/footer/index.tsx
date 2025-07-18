import st from "./styles.module.sass";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={st.footer}>
      <div className={st.lt}>
        <Link href={"#"} className={st.link}>
          Политика конфиденциальности
        </Link>
        <Link href={"#"} className={st.link}>
          Условия пользования
        </Link>
        {/*<Link href={"#"} className={st.link}>*/}
        {/*  Договор присоединения*/}
        {/*</Link>*/}
        {/*<Link href={"#"} className={st.link}>*/}
        {/*  Юридическая информация*/}
        {/*</Link>*/}
        {/*<Link href={"#"} className={st.link}>*/}
        {/*  Сведения об образовательной организации*/}
        {/*</Link>*/}
      </div>
      <div className={st.c}>
        <Image
          className={st.logo}
          src={"/images/logo-hor-white.png"}
          width={1104}
          height={432}
          alt={"SkillForge"}
        />
        {/*<p>*/}
        {/*  Copyright 2025 ООО “СПЕЙСКУРС”*/}
        {/*  <br />*/}
        {/*  Все права защищены. Копирование, модификация и распространение*/}
        {/*  контента запрещено без письменного разрешения правообладателя*/}
        {/*</p>*/}
        <p>
          Copyright 2025 Адаев С.С.
          <br />
          Все права защищены. Копирование, модификация и распространение
          контента запрещено без письменного разрешения правообладателя
        </p>
      </div>
      <div className={st.rt}>
        {/*<Link href={"https://sk.ru"}>*/}
        {/*  <Image*/}
        {/*    alt={"Участник Сколково"}*/}
        {/*    src={"/images/sk-logo.png"}*/}
        {/*    className={st.sk}*/}
        {/*    width={600}*/}
        {/*    height={136}*/}
        {/*  />*/}
        {/*</Link>*/}
        {/*<span>Реализуется участником проекта «Сколково»<br/>при грантовой поддержке проекта "Сколково"</span>*/}
        <Link href={"#"}>
          <Image
            alt={"Итмо старс"}
            src={"https://stars.itmo.ru/api/files/images/components/library/default/logos/logoWhite.svg"}
            className={st.sk}
            width={600}
            height={136}
          />
        </Link>
        <span>Проект выполнил Адаев С.С.<br/>для участия в IТМО Stars</span>
      </div>
    </footer>
  );
};
export default Footer;
