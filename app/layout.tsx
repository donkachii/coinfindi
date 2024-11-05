import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Confindi - Cryptocurrency Prices",
  description: "Track cryptocurrency prices with Confindi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
          {children}
          <footer className="mt-10">
            <div className="container mx-auto px-4 py-4 text-center text-gray-600">
              &copy; {new Date().getFullYear()} Confindi. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
