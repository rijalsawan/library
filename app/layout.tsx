"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { useEffect, Suspense } from "react";
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

// Create a separate component for the loading bar logic
function LoadingBarController() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = React.useState(0);
  
  useEffect(() => {
    setProgress(40);
    const timer = setTimeout(() => setProgress(100), 500);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <LoadingBar 
      color="black" 
      progress={progress} 
      waitingTime={500} 
      onLoaderFinished={() => setProgress(0)}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<div></div>}>
          <LoadingBarController />
        </Suspense>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}