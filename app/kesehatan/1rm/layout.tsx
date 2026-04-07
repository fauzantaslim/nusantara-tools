import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator One Rep Max (1RM) | NusantaraTools",
  description:
    "Estimasi kekuatan maksimum angkat beban Anda (1RM) secara aman menggunakan rumus Epley, Brzycki, dan Lombardi. Rencanakan program latihan beban yang lebih terarah dan terukur.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
