import type { Metadata } from "next";
import { Inter, Caveat, Indie_Flower } from "next/font/google";
import "./globals.css";

// Inter for body text
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Handwritten fonts
const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
});

const indieFlower = Indie_Flower({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-indie-flower",
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
    <html lang="en" className={`${inter.variable} ${caveat.variable} ${indieFlower.variable} light`}>
      <body className="antialiased bg-paper-light min-h-screen text-ink">
        {children}
      </body>
    </html>
  );
}
