import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grafik Pertumbuhan Bayi (Standar WHO) | NusantaraTools',
  description:
    'Pantau pertumbuhan bayi Anda berdasarkan standar WHO. Hitung Z-score dan persentil berat badan, panjang badan, dan lingkar kepala untuk anak usia 0–5 tahun.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
