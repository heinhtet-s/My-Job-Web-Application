import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import QueryProvider from "./QueryProvider";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
export const metadata: Metadata = {
  title: "My Job",
  description: "MyJob",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
