import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generator CV ATS-Friendly | NusantaraTools",
  description:
    "Buat curriculum vitae ATS-friendly yang akan lolos sistem rekrutmen otomatis. Format standar, struktur optimal, gratis tanpa login.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
