import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi tim NusantaraTools untuk saran fitur, laporan bug, dan kolaborasi. Kami siap membantu kebutuhan alat digital Anda.",
  alternates: {
    canonical: "/kontak",
  },
  openGraph: {
    title: "Kontak NusantaraTools",
    description:
      "Sampaikan ide, laporan bug, atau pertanyaan Anda ke tim NusantaraTools.",
    url: "/kontak",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Kontak NusantaraTools",
    description:
      "Kirim pesan ke tim NusantaraTools untuk saran, dukungan, dan kolaborasi.",
  },
};

export default function KontakLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
