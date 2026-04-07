import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Tentang Kami - NusantaraTools",
  description:
    "Mengenal lebih dekat visi dan misi NusantaraTools sebagai platform alat esensial masyarakat digital Indonesia.",
};

export default function TentangPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#EDE0D0]/80 shadow-sm relative overflow-hidden">
        {/* Dekorasi halus */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C17A3A]/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4A7C59]/5 rounded-full blur-3xl -z-10" />

        <div className="mb-12">
          <span className="px-3 py-1 bg-[#FFF3E0] text-[#C17A3A] text-xs font-bold rounded-full tracking-wider uppercase border border-[#C17A3A]/20 mb-4 inline-block">
            Mengenal Platform Ini
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-primary font-heading tracking-tight mb-6">
            Menghadirkan Alat Sehari-hari yang{" "}
            <span className="text-secondary/60">Sederhana & Presisi.</span>
          </h1>
        </div>

        <div className="prose prose-lg prose-headings:font-heading prose-headings:font-bold prose-headings:text-primary prose-p:font-body prose-p:text-secondary max-w-none prose-p:leading-relaxed prose-a:text-[#C17A3A] hover:prose-a:text-primary transition-colors">
          <p>
            NusantaraTools berawal dari sebuah keresahan sederhana:{" "}
            <strong>
              mengapa sulit sekali menemukan kalkulator online yang bersih,
              cepat, dan bisa diandalkan?
            </strong>{" "}
            Sebagian besar alat yang ada dipenuhi dengan iklan yang mengganggu,
            berjalan sangat lambat, dan tidak dirancang untuk kebiasaan pengguna
            lokal.
          </p>

          <p>
            Oleh karena itu, kami membangun platform ini. Kami percaya bahwa
            menghitung <strong>biaya cicilan rumah</strong>, melacak{" "}
            <strong>perkembangan kehamilan</strong>, membagi{" "}
            <strong>tagihan makan bersama teman</strong>, hingga mengecek{" "}
            <strong>batas kalori</strong> seharusnya bisa dilakukan dalam
            hitungan detik tanpa hambatan teknis.
          </p>

          <h2 className="text-2xl mt-10 mb-4">Filosofi Desain Kami</h2>
          <p>
            Setiap alat yang kami kembangkan berpegang teguh pada tiga prinsip
            utama:
          </p>
          <ul className="list-disc pl-5 space-y-2 marker:text-[#C17A3A]">
            <li>
              <strong>Intuitif & Bersih:</strong> Antarmuka didesain sedemikian
              rupa agar siapa saja bisa langsung paham cara pakainya sejak
              pandangan pertama. Tidak ada kebingungan.
            </li>
            <li>
              <strong>Fokus pada Privasi:</strong> Data yang Anda ketik (seperti
              status kesehatan, keuangan bulanan, atau catatan rutinitas) hanya
              diproses di *browser* Anda sendiri. Anda mengatur data Anda, bukan
              kami.
            </li>
            <li>
              <strong>Relevansi Lokal:</strong> Kami berusaha menyesuaikan
              variabel perhitungan dengan kebiasaan dan metrik konvensi umum
              yang berlaku di Indonesia agar lebih riil.
            </li>
          </ul>

          <h2 className="text-2xl mt-10 mb-4">Berkembang Bersama Pengguna</h2>
          <p>
            NusantaraTools bukanlah aplikasi yang sekali jadi lalu ditinggalkan.
            Platform ini terus diujicobakan dan disempurnakan berdasarkan
            kebiasaan sehari-hari. Ekosistem kalkulator ini ditujukan sebagai
            utilitas harian yang senantiasa tumbuh menjawab tantangan
            produktivitas terkini.
          </p>

          <div className="mt-16 pt-8 border-t border-[#EDE0D0] flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#F5EDE3]/50 p-6 rounded-2xl">
            <div>
              <h3 className="font-heading font-bold text-primary m-0 text-lg">
                Punya ide kalkulator baru?
              </h3>
              <p className="text-sm m-0 mt-1 opacity-80">
                Beritahu kami kemudahan apa lagi yang Anda butuhkan.
              </p>
            </div>
            <Link
              href="/kontak"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#C17A3A] text-white font-ui font-bold text-sm tracking-wide rounded-xl shadow-md border-none hover:bg-primary transition-all duration-300 no-underline whitespace-nowrap"
            >
              Kirim Saran 🚀
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
