import React from "react";
import type { Metadata } from "next";
import {noirPro} from '@/assets/fonts/noir-pro/font'

import '@/assets/styles/variables.sass'
import '@/assets/styles/global.sass'
import '@/assets/styles/scroll.sass'
import '@/assets/styles/buttons.sass'
import '@/assets/styles/containers.sass'

export const metadata: Metadata = {
    title: {
        default: 'SkillForge — Платформа онлайн-обучения',
        template: "%s — SkillForge | Платформа онлайн-обучения"
    },
    description: 'Платформа подготовки к государственным экзаменам'
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
      <html lang="ru">
      <head>
      </head>
        <body className={noirPro.className}>
          {children}
        </body>
      </html>
    );
}