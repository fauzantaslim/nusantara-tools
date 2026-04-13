import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator Harga Jual & Margin | NusantaraTools",
  description:
    "Hitung margin keuntungan, markup, harga jual, dan biaya produk Anda secara instan. Alat esensial untuk penetapan harga bisnis yang akurat.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
