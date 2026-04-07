import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator BMI | NusantaraTools",
  description:
    "Hitung Body Mass Index (BMI) secara akurat berdasarkan standar Asia-Pasifik untuk mengetahui idealitas berat badan Anda.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
