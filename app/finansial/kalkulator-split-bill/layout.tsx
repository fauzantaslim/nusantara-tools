import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator Split Bill (OCR)",
  description:
    "Hitung patungan secara cerdas dan otomatis dengan bukti struk (OCR) atau input manual. Bagikan total langsung ke teman-teman Anda.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
