import type { Metadata } from "next";
import { Outfit, Poppins } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/contexts/SessionProvider";
import { getServerSession } from "next-auth";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mini.me - The Miniature URL Shortener",
  description:
    "Mini.me - Your quick and simple solution for creating and managing short URLs. Share links effortlessly and keep them organized.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={`bg-accent  ${poppins.className}`}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
