"use client";
import "./globals.css";
import "./fonts.css";
import { useTomoSDK } from "@/hooks";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useTomoSDK()
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden">
        {children}
      </body>
    </html>
  );
}
