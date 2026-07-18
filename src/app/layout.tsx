import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sportizen Basketball Academy Delhi | Dilshad Garden",
  description: "Join Sportizen Basketball Academy at Arwachin International School, Dilshad Garden, Delhi. Elite youth basketball coaching and training classes for kids, juniors, and teens. Monday, Wednesday, Friday batches.",
  keywords: [
    "basketball academy in Dilshad Garden",
    "basketball coaching in Delhi",
    "basketball academy Delhi",
    "best basketball training East Delhi",
    "youth basketball classes Delhi",
    "Arwachin International School basketball",
    "basketball coaching near me Delhi",
    "kids basketball academy Delhi",
    "sportizen basketball academy Delhi",
    "basketball coaching classes Shahdara"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-[#F8F9FA] text-[#0E2240] font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
