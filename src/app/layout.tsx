import type { Metadata } from "next";
import { Outfit, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mini.me - The Miniature URL Shortener",
  description:
    "Mini.me - Your quick and simple solution for creating and managing short URLs. Share links effortlessly and keep them organized.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-accent  ${poppins.className}`}>{children}</body>
    </html>
  );
}
