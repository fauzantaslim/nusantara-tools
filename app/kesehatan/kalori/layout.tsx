import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator Kalori Harian (TDEE) | NusantaraTools",
  description:
    "Hitung kebutuhan kalori harian Anda berdasarkan Basal Metabolic Rate (BMR) dan tingkat aktivitas untuk mempertahankan, menurunkan, atau menambah berat badan.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
