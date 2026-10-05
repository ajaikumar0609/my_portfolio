import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
