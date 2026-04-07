import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator Tekanan Darah | NusantaraTools",
  description:
    "Analisis pembacaan tekanan darah Anda berdasarkan standar medis AHA. Pantau tren sistolik & diastolik dari waktu ke waktu dan dapatkan rekomendasi kesehatan kardiovaskular yang tepat.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
