import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="h-full flex flex-col w-screen">
        <NavBar />
        <div className="w-full h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
