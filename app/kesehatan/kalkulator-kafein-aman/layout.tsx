import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator Kafein | NusantaraTools",
  description:
    "Hitung total asupan kafein harian Anda dari kopi, teh, minuman energi, dan sumber lainnya. Bandingkan dengan batas aman berdasarkan profil kesehatan Anda.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
