import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator Cicilan Motor & Mobil | NusantaraTools",
  description:
    "Hitung estimasi cicilan bulanan kredit kendaraan bermotor dengan mudah. Simulasikan DP, suku bunga, dan tenor serta lihat jadwal angsuran lengkap per bulan.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
