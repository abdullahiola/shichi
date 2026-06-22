import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "$SHICHI",
  description:
    "Shichi is the cutest meme coin on Solana. Community-driven, LP burned, fair launch. Dress Shichi in any AI costume with our built-in studio.",
  keywords: "shichi, meme coin, solana, cat token, crypto, AI costume generator",
  icons: {
    icon: "/shichi.jpeg",
    shortcut: "/shichi.jpeg",
    apple: "/shichi.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
