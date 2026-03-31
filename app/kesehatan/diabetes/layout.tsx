import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kalkulator Risiko Diabetes Tipe 2 | NusantaraTools',
  description:
    'Estimasi risiko Anda mengembangkan diabetes tipe 2 menggunakan model berbasis FINDRISC. Analisis 8 faktor risiko klinis termasuk BMI, gula darah puasa, tekanan darah, dan riwayat keluarga.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
