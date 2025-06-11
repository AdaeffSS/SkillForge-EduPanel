import React from "react";
import type { Metadata } from "next";
import {noirPro} from '@/assets/fonts/noir-pro/font'

import '@/assets/styles/variables.sass'
import '@/assets/styles/global.sass'
import '@/assets/styles/scroll.sass'
import '@/assets/styles/buttons.sass'

export const metadata: Metadata = {
    title: "SkillForge | Платформа онлайн-обучения",
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