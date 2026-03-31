import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kalkulator Zakat Pendapatan | NusantaraTools',
  description: 'Hitung kewajiban zakat penghasilan dan profesi secara akurat berdasarkan standar nisab BAZNAS 2026.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
