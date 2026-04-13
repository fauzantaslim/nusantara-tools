import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator Anggaran Pernikahan | NusantaraTools",
  description:
    "Rencanakan dan alokasikan anggaran pernikahan Anda ke berbagai kategori seperti venue, katering, foto, busana, dan lainnya. Kelola keuangan pernikahan dengan lebih cerdas.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
