import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator Pensiun — Perencanaan Finansial Masa Tua | NusantaraTools",
  description:
    "Hitung estimasi kebutuhan dana pensiun, proyeksi nilai tabungan Anda di masa depan dengan Return Investment & Inflasi, serta cari tahu kapan tabungan Anda akan habis memakai Kalkulator Pensiun.",
  keywords: [
    "kalkulator pensiun",
    "kalkulator FIRE",
    "kemerdekaan finansial",
    "financial freedom",
    "dana pensiun",
    "retirement calculator indonesia",
    "perencanaan keuangan",
  ],
};

export default function PensiunLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
