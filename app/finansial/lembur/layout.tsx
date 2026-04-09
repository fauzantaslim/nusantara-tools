import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator Lembur — Hitung Gaji Overtime | NusantaraTools",
  description:
    "Hitung gaji lembur dengan mudah berdasarkan tarif per jam, jam reguler, dan berbagai tier lembur (1.5×, 2×, 2.5×, 3×, kustom). Estimasi gaji kotor dan bersih setelah pajak.",
  keywords: [
    "kalkulator lembur",
    "hitung overtime",
    "gaji lembur",
    "overtime calculator",
    "upah lembur",
    "jam kerja",
    "perhitungan lembur indonesia",
  ],
};

export default function LemburLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
