import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
declare global {
  interface Window {
    initMap: () => void;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Script src="https://polyfill.io/v3/polyfill.min.js?features=default"></Script>
      <Script
        src="https://kit.fontawesome.com/de6730f8c3.js"
        crossOrigin="anonymous"></Script>
    </html>
  );
}
