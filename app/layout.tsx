import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Link from "next/link";
import "./globals.css";
import Script from "next/script";
import { WalletConnectionProvider } from "@/components/wallet-provider";

export const metadata: Metadata = {
  title: "ORGANIC",
  description: "A free range grass fed runner - Our cows are angels",
  generator: "v0.app",
  icons: {
    icon: "https://ipfs.io/ipfs/bafkreigrtyjr5wqar3r5ffmcjogl67eagrc22dub3rsakf2z3o3lybq664",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>

        <Script
          src="https://plugin.jup.ag/plugin-v1.js"
          strategy="beforeInteractive"
          data-preload
          defer
        />
      </head>
      <body>
        <WalletConnectionProvider>{children}</WalletConnectionProvider>
      </body>
    </html>
  );
}
