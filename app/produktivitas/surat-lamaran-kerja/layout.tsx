import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Surat Lamaran Kerja Generator | NusantaraTools",
  description:
    "Buat surat lamaran kerja profesional secara otomatis. Sesuaikan biodata, data perusahaan, dan format dokumen dengan mudah dan cepat.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
