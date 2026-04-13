import { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Generator",
  description:
    "Buat kode QR khusus dari berbagai jenis data lalu unduh dengan cepat.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
