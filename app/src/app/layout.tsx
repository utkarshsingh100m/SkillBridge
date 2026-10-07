import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SkillBridge — AI Powered Matching for Student Projects, Teammates & Mentors",
  description:
    "SkillBridge is a campus platform that translates skills, interests and project needs into clear, explainable recommendations. Find teammates, mentors and projects for your next hackathon.",
  keywords: [
    "hackathon",
    "team building",
    "mentor matching",
    "student projects",
    "SkillBridge",
    "Build With Bharat",
  ],
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
