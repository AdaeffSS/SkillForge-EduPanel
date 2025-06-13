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
      <div style={{ padding: 16 } as React.CSSProperties}>{children}</div>
      <Footer />
    </>
  );
}
