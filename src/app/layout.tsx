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
  src: '../fonts/MyFont.ttf', // You'll need to add your font file here
  variable: '--font-custom-hand',
  display: 'swap',
});

// Handwritten fonts (original)
/* 
const indieFlower = Indie_Flower({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-indie-flower",
});

const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
});
*/

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
