'use client'

import st from './styles.module.sass'
import Image from 'next/image'
import Link from "next/link";
import {GalleryVerticalEnd, House, Menu, TableProperties, X} from "lucide-react";
import React, {useEffect} from "react";

const nav = [
    {'label': 'Главная', 'href': '/', icon: <House className={st.icon} />, color: '#FF0099'},
    {'label': 'Урок', 'href': '/lesson', icon: <GalleryVerticalEnd className={st.icon} />, color: '#00FF99'},
    {'label': 'Решение задач', 'href': '/tasks', icon: <TableProperties className={st.icon} />, color: '#00BFFF'},
]

const user = {
    avatar: 'avatar.png',
    firstName: 'Стёпа',
    lastName: 'Адаев',
    level: {
        'type': 'Новичок',
        'level': '1',
        'color': '#5194C4'
    }
}

const Header = () => {

    const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

    return (
      <header className={st.header}>
        <Link href={"/"} className={st.logo}>
          <Image
            className={st.image}
            alt={"SkillForge"}
            src={"/images/logo-img.png"}
            width={256}
            height={256}
          />
          <div className={st.text}>
            <span className={st.skft}>SkillForge</span>
            <span>Панель обучения</span>
          </div>
        </Link>

        <nav className={st.nav}>
          <ul className={st.ul}>
            {nav.map((item, i) => (
              <li key={i}>
                <Link
                  style={{ "--color": item.color } as React.CSSProperties}
                  href={item.href}
                >
                  {item.icon} {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button className={st.user} onClick={() => {alert(JSON.stringify(user, null, 2))}}>
            <Image src={`/images/${user.avatar}`} width={128} height={128} className={st.avatar} alt={`Аватар ${user.firstName} ${user.lastName}`}/>
            <div className={st.text}>
                <span>{user.firstName} {user.lastName}</span>
                <small style={{ '--color': user.level.color } as React.CSSProperties}>{user.level.type} {user.level.level} ур.</small>
            </div>
        </button>
      </header>
    );
}

export default Header