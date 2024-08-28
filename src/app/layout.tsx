import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import QueryProvider from "./QueryProvider";
import NextAuthProvider from "./SessionProvider";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import { Toaster } from "react-hot-toast";

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
        <NextAuthProvider>
          <QueryProvider>
            {children}
            <Toaster position="top-right" />
          </QueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
