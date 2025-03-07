import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";

// Inter for body text
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Custom handwritten font
const customHand = localFont({
  src: '../../public/fonts/Myfont.ttf',
  variable: '--font-custom-hand',
  display: 'swap',
  preload: true,
  fallback: ['cursive']
});

export const metadata: Metadata = {
  title: "Hand-Drawn Portfolio",
  description: "A creative portfolio with hand-drawn aesthetics",
  keywords: ["portfolio", "creative", "hand-drawn", "design", "illustration"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${customHand.variable} light`}>
      <body className="antialiased bg-paper-light min-h-screen text-ink">
        {children}
      </body>
    </html>
  );
}
