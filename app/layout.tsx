import type { Metadata } from "next";
import {
  Inter,
  Crimson_Pro,
  Manrope,
  Space_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-secondary",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CodeZest Admin",
  description: "Admin dashboard for CodeZest Learning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`
      ${inter.variable} 
      ${crimsonPro.variable} 
      ${manrope.variable} 
      ${spaceGrotesk.variable} 
      ${jetbrainsMono.variable}
    `}
    >
      <body
        suppressHydrationWarning
        className="font-primary antialiased bg-neutral-50 text-neutral-900 min-h-screen"
      >
        {children}
      </body>
    </html>
  );
}
