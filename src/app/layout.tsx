import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "YouTube Thumbnail Downloader",
    template: "%s | YT Thumbnail Downloader",
  },
  description:
    "Baixe thumbnails do YouTube em alta resolução gratuitamente. Suporte a HD (1280×720), SD, HQ, MQ e mais.",
  metadataBase: new URL("https://youtube-grabber.vercel.app"),
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
