import type { Metadata } from "next";
import { Geist, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import BottomNav from "@/components/layout/BottomNav";
import { PaletteProvider } from "@/components/providers/PaletteProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beatrix // Probabilités",
  description: "L'outil décisionnel de prédictions sportives",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans ${geistSans.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased bg-[#0A0A0A] text-white`}>
        <PaletteProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 transition-all duration-300 pl-0 md:pl-16 pb-20 md:pb-0 min-h-screen overflow-x-hidden">
              {children}
            </main>
            <BottomNav />
          </div>
        </PaletteProvider>
      </body>
    </html>
  );
}
