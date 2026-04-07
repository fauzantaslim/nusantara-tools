import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Generator | NusantaraTools",
  description:
    "Buat kata sandi yang kuat dan aman menggunakan kombinasi karakter atau passphrase.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
