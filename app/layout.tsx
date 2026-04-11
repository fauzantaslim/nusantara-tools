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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://nusantaratools.my.id",
  ),
  title: {
    default: "NusantaraTools - Koleksi Alat Digital Gratis Indonesia",
    template: "%s | NusantaraTools",
  },
  description:
    "Platform tools gratis berbasis web untuk warga Indonesia yang cepat, akurat, dan lengkap mulai dari finansial, kesehatan, hingga religi.",
  keywords: [
    "NusantaraTools",
    "kalkulator gratis",
    "alat digital indonesia",
    "kalkulator finansial",
    "kalkulator kesehatan",
    "jadwal sholat",
    "zakat",
    "split bill",
  ],
  authors: [{ name: "NusantaraTools" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://nusantaratools.my.id",
    siteName: "NusantaraTools",
    title: "NusantaraTools - Koleksi Alat Digital Gratis Indonesia",
    description:
      "Platform tools gratis tercepat dan akurat untuk warga Indonesia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NusantaraTools - Koleksi Alat Digital Gratis Indonesia",
    description:
      "Platform tools gratis tercepat dan akurat untuk warga Indonesia.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${jakartaSans.variable} ${lora.variable}`}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-1737040212074612" />
      </head>
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
