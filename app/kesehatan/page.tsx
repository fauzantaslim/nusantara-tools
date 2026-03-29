import React from 'react';
import Link from 'next/link';
import { Activity, Moon, ChevronRight, Wallet, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Breadcrumbs } from '@/ui/Breadcrumbs';

export const metadata = {
  title: 'Tools Kesehatan & Kebugaran | NusantaraTools',
  description: 'Koleksi lengkap kalkulator kesehatan dan kebugaran: BMI, Kalori, Masa Subur, dan lainnya.',
};

const KESEHATAN_TOOLS = [
  { id: 'bmi', name: 'Kalkulator BMI', category: 'Kesehatan', icon: Activity, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '/kesehatan/bmi', desc: 'Hitung tingkat ideal massa tubuh secara akurat berdasarkan standar metrik Asia-Pasifik.', hot: true },
  { id: 'masa-subur', name: 'Kalkulator Masa Subur', category: 'Kesehatan', icon: Activity, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '#', desc: 'Kalkulasi siklus menstruasi dan prediksi jendela masa subur wanita.', hot: true },
  { id: 'kalori', name: 'Kalkulator Kalori Harian', category: 'Kesehatan', icon: Activity, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '#', desc: 'Hitung kebutuhan kalori harian (TDEE) untuk mencapai target berat badan.', hot: false },
  { id: 'air', name: 'Kalkulator Kebutuhan Air', category: 'Kesehatan', icon: Activity, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '#', desc: 'Estimasi asupan cairan yang wajib dipenuhi per hari berdasarkan level rutinitas.', hot: false },
  { id: 'sleep', name: 'Sleep Cycle Calculator', category: 'Kesehatan', icon: Moon, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '#', desc: 'Temukan jam tidur dan bangun ideal untuk menghindari rasa lelah.', hot: true },
  { id: 'ideal-weight', name: 'Cek Berat Badan Ideal', category: 'Kesehatan', icon: Activity, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '#', desc: 'Ketahui rentang berat badan ideal berdasarkan tinggi tubuh dan usia.', hot: false },
  { id: '1rm', name: 'Kalkulator 1RM', category: 'Kesehatan', icon: Activity, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '#', desc: 'Hitung porsi beban maksimum untuk satu repetisi latihan angkat beban.', hot: false },
  { id: 'kafein', name: 'Kalkulator Kafein Aman', category: 'Kesehatan', icon: Activity, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '#', desc: 'Batas asupan kopi dan minuman berkafein harian sesuai kondisi tubuh.', hot: false },
  { id: 'hpl', name: 'Prediksi HPL', category: 'Kesehatan', icon: Activity, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: 'kesehatan/kehamilan', desc: 'Kalkulator Hari Perkiraan Lahir untuk memantau kehamilan.', hot: true },
  { id: 'grafik-bayi', name: 'Grafik Pertumbuhan Bayi', category: 'Kesehatan', icon: Activity, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '#', desc: 'Pantau kurva pertumbuhan tinggi dan berat badan anak sesuai standar WHO.', hot: false },
  { id: 'tekanan-darah', name: 'Kalkulator Tekanan Darah', category: 'Kesehatan', icon: Activity, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '#', desc: 'Evaluasi hasil tensi darah dan pahami kategori kesehatannya.', hot: false },
  { id: 'diabetes', name: 'Risiko Diabetes', category: 'Kesehatan', icon: Activity, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '#', desc: 'Skrining awal tingkat risiko diabetes berdasarkan gaya hidup dan keturunan.', hot: false },
];

const OTHER_CATEGORIES = [
  { id: 'finansial', name: 'Finansial & Keuangan', icon: Wallet, color: 'text-[#9C4A2A]', bg: 'bg-[#FFF0EB]', path: '/finansial', desc: 'Kalkulator gaji, cicilan, tabungan, split bill, dan perencanaan dana.', hoverBorder: 'hover:border-[#9C4A2A]/40' },
  { id: 'produktivitas', name: 'Produktivitas Kerja', icon: CheckCircle2, color: 'text-[#C17A3A]', bg: 'bg-[#FFF3E0]', path: '/produktivitas', desc: 'Generator CV ATS, pomodoro timer, dan utilitas penunjang karir.', hoverBorder: 'hover:border-[#C17A3A]/40' },
  { id: 'religi', name: 'Religi & Ibadah', icon: Moon, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '/religi', desc: 'Jadwal sholat akurat, kompas arah kiblat, kalkulator zakat & warisan.', hoverBorder: 'hover:border-[#4A7C59]/40' },
  { id: 'utilitas', name: 'Utilitas Ekstra & Gambar', icon: Activity, color: 'text-[#7A5C42]', bg: 'bg-[#EDE0D0]/60', path: '/utilitas', desc: 'URL shortener, QR generator, serta alat konversi dan resize gambar massal.', hoverBorder: 'hover:border-[#7A5C42]/40' },
];

export default function KesehatanIndex() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-12 w-full mt-4 pb-24 px-4">
      {/* Header Bar */}
      <div className="flex flex-col gap-6 pt-6 pb-4 border-b border-muted/50">
        <Breadcrumbs items={[
          { label: 'Kesehatan & Kebugaran' }
        ]} />
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-[#E8F5E9] text-[#4A7C59] text-xs font-bold rounded-full tracking-wider uppercase border border-[#4A7C59]/20">Kategori</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-primary font-heading tracking-tight">Kesehatan & Kebugaran</h1>
          <p className="text-lg text-secondary font-body mt-3 max-w-2xl leading-relaxed">
            Kumpulan kalkulator medis dan kebugaran berbasis standar sains untuk memantau kualitas kesehatan harian Anda secara mandiri.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
        {KESEHATAN_TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link href={tool.path} key={tool.id} className="group bg-white rounded-[1.5rem] border border-[#EDE0D0]/80 p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#4A7C59]/40 hover:shadow-xl hover:shadow-[#4A7C59]/5 hover:-translate-y-1 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A7C59]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-5">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner", tool.bg)}>
                    <Icon className={cn("w-6 h-6", tool.color)} />
                  </div>
                  {tool.hot && (
                    <span className="bg-[#FFF0EB] text-[#9C4A2A] text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider border border-[#9C4A2A]/20">
                      Populer
                    </span>
                  )}
                </div>
                
                <div className="mb-2">
                  <h3 className="font-heading font-extrabold text-xl text-primary group-hover:text-[#4A7C59] transition-colors line-clamp-1">
                    {tool.name}
                  </h3>
                </div>
                
                <p className="text-secondary font-body text-sm leading-relaxed line-clamp-3 mb-6">
                  {tool.desc}
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-muted/50 mt-auto relative z-10">
                <span className="text-xs font-bold text-secondary uppercase tracking-widest group-hover:text-primary transition-colors">
                  Buka Tool
                </span>
                <div className="w-8 h-8 rounded-full bg-surface group-hover:bg-[#4A7C59] flex flex-col items-center justify-center transition-colors">
                   <ChevronRight className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Kategori Lainnya Section */}
      <div className="mt-20 pt-16 border-t border-muted/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-black text-primary font-heading tracking-tight">Kategori Terkait Lainnya</h2>
            <p className="text-secondary font-body mt-2">Jelajahi portofolio kalkulator kami untuk kebutuhan finansial hingga produktivitas.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {OTHER_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link href={cat.path} key={cat.id} className={cn("group bg-white rounded-3xl border border-[#EDE0D0]/80 p-6 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden", cat.hoverBorder)}>
                <div className="relative z-10 flex flex-col h-full">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner mb-5", cat.bg)}>
                    <Icon className={cn("w-6 h-6", cat.color)} />
                  </div>
                  
                  <h3 className="font-heading font-extrabold text-lg text-primary group-hover:text-primary transition-colors mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-secondary font-body text-sm leading-relaxed mb-6 flex-grow">
                    {cat.desc}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-muted/50 mt-auto">
                    <span className="text-[11px] font-bold text-secondary uppercase tracking-widest group-hover:text-primary transition-colors">
                      Eksplorasi
                    </span>
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-colors", cat.bg)}>
                       <ChevronRight className={cn("w-4 h-4", cat.color)} />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
}
