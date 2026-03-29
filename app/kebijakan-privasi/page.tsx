import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Kebijakan Privasi - NusantaraTools',
  description: 'Komitmen kami terhadap perlindungan data Anda. Semuanya diproses aman di sisi klien tanpa penyimpanan server yang melacak Anda.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#EDE0D0]/80 shadow-sm relative overflow-hidden">
        
        <div className="mb-12">
          <span className="px-3 py-1 bg-[#E8F5E9] text-[#4A7C59] text-xs font-bold rounded-full tracking-wider uppercase border border-[#4A7C59]/20 mb-4 inline-block">Keamanan Platform</span>
          <h1 className="text-4xl sm:text-5xl font-black text-primary font-heading tracking-tight mb-6">
            Data Anda adalah <span className="text-secondary/60">Hak Anda.</span>
          </h1>
        </div>

        <div className="prose prose-lg prose-headings:font-heading prose-headings:font-bold prose-headings:text-primary prose-p:font-body prose-p:text-secondary max-w-none prose-p:leading-relaxed prose-a:text-[#C17A3A] hover:prose-a:text-primary transition-colors">
          <p>
            Di NusantaraTools, kami sadar betul betapa risihnya menggunakan kalkulator daring yang ujung-ujungnya meminta akses data pribadi atau memaksa Anda membuat akun demi melihat sebuah hasil hitungan sederhana.
          </p>

          <p>
            Pendekatan kami berbeda. Kami merancang hampir seluruh alat kami agar <strong>bekerja secara lokal langsung dari perangkat Anda (Client-Side)</strong>.
          </p>

          <h2 className="text-2xl mt-10 mb-4">Pengumpulan & Penggunaan Data</h2>
          <p>
            Informasi krusial seperti rasio tubuh (BMI), gaji bersih bulanan Anda, catatan kehamilan, maupun dana darurat yang Anda ketik <strong>tidak pernah kami simpan</strong>, kirim ke server pusat, ataupun kami jual ke pihak ketiga periklanan mana pun. Saat Anda menutup tab peramban <em>browser</em> Anda, data hitungan tersebut juga lenyap seketika.
          </p>
          <p>
            Kami murni menumpang tenaga perangkat Anda sebatas alat bantu hitung matematika di layar depan semata.
          </p>

          <h2 className="text-2xl mt-10 mb-4">Lacak-Melacak Data Analitik</h2>
          <p>
            Satu-satunya data yang mungkin kami lirik sekilas hanyalah sebatas data agregat kolektif yang dikaburkan (seperti menghitung jumlah total keramaian web hari ini atau ukuran resolusi layar paling sering dipakai) demi menambal dan mengkalibrasi agar antarmuka halaman kami tidak berantakan dipakai di masa depan. Tidak ada secuil pun informasi pribadi yang bisa dikaitkan balik dengan nama Anda di sini.
          </p>

          <h2 className="text-2xl mt-10 mb-4">Fitur Berbagi Tautan Cepat</h2>
          <p>
            Jika Anda menemui utilitas yang menciptakan fitur membagikan tautan <em>(Share Link URL)</em>, sistem hanya mencangkok variabel angka sementara kepada akhir <em>link bar</em> peramban supaya Anda bisa berkirim skema biaya pada sahabat; dan tegas sekali lagi, tidak ada unggahan database rahasia dalam server kami di baliknya.
          </p>

          <div className="mt-16 pt-8 border-t border-[#EDE0D0] bg-[#FFF0EB]/50 p-6 rounded-2xl">
            <h3 className="font-heading font-bold text-primary m-0 text-lg mb-2">Masih Ada Pertanyaan Soal Keamanan?</h3>
            <p className="text-sm m-0 mb-4 opacity-80">Kami siap menjelaskan secara gamblang.</p>
            <Link href="/kontak" className="inline-flex items-center justify-center px-6 py-3 bg-[#9C4A2A] text-white font-ui font-bold text-sm tracking-wide rounded-xl shadow-md border-none hover:bg-primary transition-all duration-300 no-underline whitespace-nowrap">
              Tanyakan Kami
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
