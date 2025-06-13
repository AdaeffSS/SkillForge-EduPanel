import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";


export default function ChildrenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div style={{ display: 'flex', alignItems: 'center', padding: 16 } as React.CSSProperties}>
          <div style={{ width: '100%' } as React.CSSProperties }>
              {children}
          </div>
      </div>
      <Footer />
    </>
  );
}
