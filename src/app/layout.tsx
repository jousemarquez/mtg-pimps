import type { Metadata } from "next";
import { Cinzel, EB_Garamond } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MTG Pimp Collection Manager | Old Frame",
  description: "A tribute to the golden era of Magic: The Gathering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${ebGaramond.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex bg-background text-foreground font-serif">
        <Sidebar />
        <main className="flex-1 min-h-screen overflow-y-auto p-8 lg:p-12 relative">
          <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/parchment.png')]" />
          <div className="max-w-7xl mx-auto relative z-10">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
