import React from "react";
import type { Metadata } from "next";
import {noirPro} from '@/assets/fonts/noir-pro/font'

import '@/assets/styles/variables.sass'
import '@/assets/styles/global.sass'
import '@/assets/styles/scroll.sass'

export const metadata: Metadata = {
    title: "DashPanel | SpaceCourse",
    description: "Панель для сотрудников и управления платформой SpaceCourse",
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