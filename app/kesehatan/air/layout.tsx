import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator Kebutuhan Air | NusantaraTools",
  description:
    "Gunakan kalkulator kebutuhan air kami untuk menghitung berapa banyak air minum yang Anda perlukan setiap hari berdasarkan berat badan, tingkat aktivitas, dan faktor lingkungan.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
