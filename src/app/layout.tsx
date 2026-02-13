import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PHORO – KI-Assistenten für Bildungsprofis",
  description:
    "Schweizer SaaS-Plattform mit spezialisierten KI-Assistenten für Lehrpersonen, Heilpädagog:innen und Schulleitungen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${lexend.variable} font-lexend antialiased`}>
        {children}
      </body>
    </html>
  );
}
