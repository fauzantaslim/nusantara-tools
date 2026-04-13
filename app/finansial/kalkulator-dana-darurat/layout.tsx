import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator Dana Darurat - NusantaraTools",
  description:
    "Hitung ekspektasi dan target dana darurat khusus untuk profil finansial Anda dengan parameter terukur, inflasi, dan investasi.",
};

export default function DanaDaruratLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
