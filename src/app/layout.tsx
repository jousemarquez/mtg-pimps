import type { Metadata } from "next";
import { Spectral, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
      className={`${spectral.variable} ${ibmPlexSerif.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col lg:flex-row bg-background text-foreground font-serif">
        <Sidebar />
        <main className="flex-1 min-h-screen overflow-y-auto p-4 md:p-8 lg:p-12 relative">
          <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/parchment.png')]" />
          <div className="max-w-7xl mx-auto relative z-10 pb-12">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
