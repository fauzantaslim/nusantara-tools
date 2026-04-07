import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator Depresiasi Aset | NusantaraTools",
  description:
    "Hitung penyusutan dan amortisasi aset pajak sesuai standar DJP Indonesia (PMK No.72/2023). Metode Garis Lurus dan Saldo Menurun.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
