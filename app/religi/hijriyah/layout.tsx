import { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kalkulator Konversi Masehi ↔ Hijriyah | NusantaraTools',
  description: 'Ubah penanggalan kalender Masehi ke Hijriyah atau sebaliknya. Pantau hari libur nasional agama Islam dan hari besar keagamaan secara otomatis dan lebih presisi.',
};

export default function HijriyahLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-full">
      {children}
    </div>
  );
}
