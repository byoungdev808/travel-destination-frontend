import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import Link from "next/link";

const geistSans = localFont({
  src: "../pages/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../pages/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex flex-col">
      <nav className="bg-gray-800 text-white p-4 flex justify-between flex-shrink-0">
        <div className="text-lg font-bold">My App</div>
        <div className="flex space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/chat" className="hover:underline">
            Chat
          </Link>
        </div>
      </nav>
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex-1 bg-gray-100 p-4"`}
      >
        {children}
      </div>
    </div>
  );
}
