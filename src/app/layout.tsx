import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeminiResponseProvider } from "@/context/geminiResponseContext";
import { RepositoryProvider } from "@/context/repositoryContext";
import "./globals.css";

import Header from "./global/header";
import Footer from "./global/footer";
import Return from "./global/return";
import Head from "next/head";
import Script from "next/script";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gemini Docs",
  description: "Generated by create next app",
  
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en-us">
      <body className={`flex flex-col ${inter.className} min-h-screen bg-neutral-100`}>
        <GeminiResponseProvider>
          <RepositoryProvider>
            <Header />
            <Return />
            {children}
            <Footer />
          </RepositoryProvider>
        </GeminiResponseProvider>
      </body>
    </html>
  );
}
