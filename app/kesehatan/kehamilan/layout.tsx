import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kalkulator HPL | NusantaraTools',
  description: 'Hitung Hari Perkiraan Lahir (HPL).',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
