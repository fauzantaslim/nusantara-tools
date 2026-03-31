import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kalkulator Masa Subur & Ovulasi | NusantaraTools',
  description: 'Prediksi masa subur, hari ovulasi, dan siklus menstruasi berikutnya dengan akurat menggunakan kalkulator canggih dari NusantaraTools.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
