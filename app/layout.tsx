"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import LoadingBar from 'react-top-loading-bar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = React.useState(0);
  
  useEffect(() => {
    setProgress(40);
    const timer = setTimeout(() => setProgress(100), 500);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingBar color = "black" progress = {progress} waitingTime = {500} onLoaderFinished = {()=>setProgress(0)}/>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}