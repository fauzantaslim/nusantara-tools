import React from 'react';

export const metadata = {
  title: 'Syarat & Ketentuan - NusantaraTools',
  description: 'Ketentuan layanan dan penafian (disclaimer) untuk pengguna alat simulasi finansial dan medis NusantaraTools.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#EDE0D0]/80 shadow-sm relative overflow-hidden">
        
        <div className="mb-12">
          <span className="px-3 py-1 bg-[#F5EDE3] text-[#7A5C42] text-xs font-bold rounded-full tracking-wider uppercase border border-[#7A5C42]/20 mb-4 inline-block">Ketentuan Layanan</span>
          <h1 className="text-4xl sm:text-5xl font-black text-primary font-heading tracking-tight mb-6">
            Gunakan Sebagai <span className="text-secondary/60">Referensi Bebas.</span>
          </h1>
        </div>

        <div className="prose prose-lg prose-headings:font-heading prose-headings:font-bold prose-headings:text-primary prose-p:font-body prose-p:text-secondary max-w-none prose-p:leading-relaxed prose-a:text-[#C17A3A] hover:prose-a:text-primary transition-colors">
          <p>
            Dengan menggulir, mengeklik, dan memanfaatkan fitur kalkulator maupun peralatan konversi mutakhir bebas hambatan di dalam payung NusantaraTools, ini berarti Anda menyepakati batas ruang gerak hukum fungsional dari alat buatan kami yang ditujukan sekadar demi kemudahan referensial.
          </p>

          <h2 className="text-2xl mt-10 mb-4">Penafian Alat Kesehatan (Medis & Kebugaran)</h2>
          <p>
            Seluruh fitur turunan kesehatan (semisal kalkulasi kalori kalibrasi massa tubuh, rekam jejak ideal BMI, maupun penanda kehamilan) murni mengandalkan ketukan rumus rasio dasar umum di mata hitungan sains awam. Sistem penduga <em>Tools</em> tidaklah ditakdirkan menggantikan posisi krusial sebuah teguran klinis.
          </p>
          <ul className="list-disc pl-5 space-y-2 marker:text-[#7A5C42]">
            <li>Tidak ada angka keluar (*output*) di platform ini yang patut menuntun Anda mengambil jalan pintas keputusan operasi, diet radikal, alih-alih saran mutlak dari perawat dan paramedis klinik yang mengenal profil biologi Anda sedalam mungkin.</li>
            <li>Status setiap profil warga Nusantara sungguh spesifik terkalibrasi secara unik.</li>
          </ul>

          <h2 className="text-2xl mt-10 mb-4">Tinjauan Angka Keuangan & Finansial</h2>
          <p>
            Segmen keuangan kami terkomposisi dari simulasi porsi utang, potongan slip lembur hingga tebakan taksiran margin bisnis, bersifat <em>kalkulasi ilustratif kasar.</em>
          </p>
          <ul className="list-disc pl-5 space-y-2 marker:text-[#7A5C42]">
            <li>Patut diketahui fluktuasi indeks regulasi pajak pendapatan negara, administrasi suku bunga kreditur bank cicilan, maupun porsi komisi e-commerce sangat tidak terkendali setiap malamnya, kami barangkali luput melacak ketertinggalannya.</li>
            <li>Hasil rupiah hanyalah sekadar cermin kaca spion rancangan dompet kas Anda. Silakan cocokan berkali lipat di lapangan.</li>
          </ul>

          <h2 className="text-2xl mt-10 mb-4">Pembatasan Tanggung Jawab (As-Is Basis)</h2>
          <p>
            Meskipun komitmen teknis kami dirancang sepenuh tekad merampungkan beban kalkulasi meja Anda, semua alat murni berstempel penyajian "apa adanya". Keputusan akhir penarikan mutasi dana atau pola nutrisi esok hari dipangku dengan mantap oleh sadar pijakan diri Anda pribadi sehingga platform secara definitif terlepas utuh dari aduan salah persepsi. 
          </p>
          
        </div>
      </div>
    </main>
  );
}
