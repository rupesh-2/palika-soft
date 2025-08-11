import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Palika Municipal Web Application",
  description:
    "Municipal management system for local government bodies in Nepal",
  generator: "v0.dev",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#1F4E79",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Palika Municipal",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-gray-50">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
