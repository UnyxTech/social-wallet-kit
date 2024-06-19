"use client";
import "./globals.css";
import "./fonts.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useTomoSDK } from "@/hooks";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  const tomoSDK = useTomoSDK()
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden">
        {
          tomoSDK &&
          <GoogleOAuthProvider clientId={tomoSDK?.getGoogleAuthId() || ''}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </GoogleOAuthProvider>
        }
      </body>
    </html>
  );
}
