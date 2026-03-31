import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kalkulator Siklus Tidur | NusantaraTools',
  description:
    'Temukan jam tidur atau jam bangun terbaik berdasarkan siklus tidur 90 menit. Hindari sleep inertia dan bangun lebih segar setiap hari dengan Kalkulator Siklus Tidur NusantaraTools.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
