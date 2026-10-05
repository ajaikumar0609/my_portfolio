import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ajai Kumar — AI Engineer & Backend Developer",
  description:
    "Ajai Kumar is an AI-focused software engineer building backend systems, intelligent applications, and real-world technology products.",
  keywords: [
    "AI Engineer",
    "Backend Developer",
    "Machine Learning",
    "Python Developer",
    "FastAPI",
    "Flutter",
    "Artificial Intelligence",
  ],
  authors: [{ name: "Ajai Kumar N" }],
  creator: "Ajai Kumar N",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Ajai Kumar — AI Engineer & Backend Developer",
    description:
      "Ajai Kumar is an AI-focused software engineer building backend systems, intelligent applications, and real-world technology products.",
    siteName: "Ajai Kumar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajai Kumar — AI Engineer & Backend Developer",
    description:
      "Ajai Kumar is an AI-focused software engineer building backend systems, intelligent applications, and real-world technology products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F7F5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg text-text-primary antialiased">{children}</body>
    </html>
  );
}
