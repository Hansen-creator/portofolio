import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";

const geistSans = Geist({
  variable: "--font-font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hansen Pratama | Portfolio",
  description: "Fullstack Developer & Machine Learning Engineer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-white font-sans relative overflow-x-hidden">
        {/* Navbar global */}
        <Navbar />
        
        {/* Tag main dibuat full-width tanpa pembatas agar komponen di dalamnya bisa meluap penuh */}
        <main className="flex-grow w-full flex flex-col relative">
          {children}
        </main>

        {/* Footer global */}
        <footer className="text-center py-6 text-sm text-zinc-600 border-t border-zinc-900 z-10 relative">
          © {new Date().getFullYear()} Hansen Pratama. All rights reserved.
        </footer>
      </body>
    </html>
  );
}