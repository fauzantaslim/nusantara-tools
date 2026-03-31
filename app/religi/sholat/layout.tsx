import { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kalkulator Jadwal Sholat | NusantaraTools',
  description: 'Dapatkan jadwal waktu sholat otomatis berbasis lokasi secara akurat dengan dukungan metode MWL, ISNA, Egypt, dan konfigurasi Hanafi/Standard. Dilengkapi penunjuk Arah Kiblat.',
};

export default function SholatLayout({
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
