import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NusantaraTools",
  description: "Platform tools gratis berbasis web untuk warga Indonesia yang cepat dan akurat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${jakartaSans.variable} ${lora.variable}`}>
      <body className="font-sans antialiased text-primary selection:bg-accent-1 selection:text-white flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
