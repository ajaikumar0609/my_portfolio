import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Chrome from "@/components/Chrome";

const sans = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-ibm-plex-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Ajai Kumar — AI Engineer & Backend Developer",
  description: "Ajai Kumar is an AI-focused software engineer building backend systems, intelligent applications, and real-world technology products.",
  keywords: ["AI Engineer", "Backend Developer", "Machine Learning", "Python Developer", "FastAPI", "Flutter"],
  authors: [{ name: "Ajai Kumar N" }],
  openGraph: {
    title: "Ajai Kumar — AI Engineer & Backend Developer",
    description: "Backend systems, intelligent applications, and real-world technology products.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajai Kumar — AI Engineer & Backend Developer",
    description: "Backend systems, intelligent applications, and real-world technology products.",
  },
  other: {
    "theme-color": "#050505",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans">
        <Chrome />
        {children}
      </body>
    </html>
  );
}
