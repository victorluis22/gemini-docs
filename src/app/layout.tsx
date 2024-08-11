import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeminiResponseProvider } from "@/context/geminiResponseContext";
import { RepositoryProvider } from "@/context/repositoryContext";
import "./globals.css";

import Header from "./global/header";
import Footer from "./global/footer";
import Return from "./global/return";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gemini Docs",
  description: "Gemini Docs is a web application that leverages Google's Gemini AI to automatically generate comprehensive documentation for your code. Whether you're a seasoned programmer or someone just trying to understand a snippet of code, Gemini Docs simplifies the process by providing clear, accurate, and context-aware documentation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en-us">
      <body className={`flex flex-col ${inter.className} min-h-screen bg-neutral-100`}>
        <GeminiResponseProvider>
          <RepositoryProvider>
            <Header />
            <Return />
            <main className="flex grow flex-col items-center justify-center gap-5 p-5">
              { children }
            </main>
            <Footer />
          </RepositoryProvider>
        </GeminiResponseProvider>
      </body>
    </html>
  );
}
