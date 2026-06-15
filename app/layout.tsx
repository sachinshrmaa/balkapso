import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import "./lib/firebase";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BALKAPSO Construction | Structural Design & Retrofitting Specialists, Sikkim",
  description: "Niche structural engineering consultancy based in Sikkim. Specialists in structural design, seismic retrofitting, rehabilitation of ageing buildings, and Non-Destructive Testing (NDT) compliant with Indian Standards.",
  keywords: ["structural design", "structural retrofitting", "seismic rehabilitation", "non-destructive testing", "NDT Sikkim", "earthquake resistant design", "Sikkim structural consultancy"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
