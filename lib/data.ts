import { Activity, Wallet, Moon, Timer, Calculator, CheckCircle2 } from 'lucide-react';

export const TOOLS = [
  // Kesehatan
  { id: 'bmi', name: 'Kalkulator BMI', category: 'Kesehatan', categoryId: 'kesehatan', icon: Activity, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '/kesehatan/bmi', desc: 'Hitung tingkat ideal massa tubuh secara akurat berdasarkan standar metrik Asia-Pasifik.', hot: true },
  { id: 'masa-subur', name: 'Kalkulator Masa Subur', category: 'Kesehatan', categoryId: 'kesehatan', icon: Activity, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '/kesehatan/masa-subur', desc: 'Kalkulasi siklus menstruasi dan prediksi jendela masa subur wanita.', hot: true },
  { id: 'kalori', name: 'Kalkulator Kalori Harian', category: 'Kesehatan', categoryId: 'kesehatan', icon: Activity, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '/kesehatan/kalori', desc: 'Hitung kebutuhan kalori harian (TDEE) untuk mencapai target berat badan.', hot: false },
  { id: 'air', name: 'Kalkulator Kebutuhan Air', category: 'Kesehatan', categoryId: 'kesehatan', icon: Activity, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '/kesehatan/air', desc: 'Estimasi asupan cairan yang wajib dipenuhi per hari berdasarkan level rutinitas.', hot: false },
  { id: 'sleep', name: 'Sleep Cycle Calculator', category: 'Kesehatan', categoryId: 'kesehatan', icon: Moon, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '/kesehatan/tidur', desc: 'Temukan jam tidur dan bangun ideal untuk menghindari rasa lelah.', hot: true },
  { id: '1rm', name: 'Kalkulator 1RM', category: 'Kesehatan', categoryId: 'kesehatan', icon: Activity, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '/kesehatan/1rm', desc: 'Hitung porsi beban maksimum untuk satu repetisi latihan angkat beban.', hot: false },
  { id: 'kafein', name: 'Kalkulator Kafein Aman', category: 'Kesehatan', categoryId: 'kesehatan', icon: Activity, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '/kesehatan/kafein', desc: 'Batas asupan kopi dan minuman berkafein harian sesuai kondisi tubuh.', hot: false },
  { id: 'hpl', name: 'Prediksi HPL', category: 'Kesehatan', categoryId: 'kesehatan', icon: Activity, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '/kesehatan/kehamilan', desc: 'Kalkulator Hari Perkiraan Lahir untuk memantau kehamilan.', hot: true },
  { id: 'grafik-bayi', name: 'Grafik Pertumbuhan Bayi', category: 'Kesehatan', categoryId: 'kesehatan', icon: Activity, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '/kesehatan/grafik-bayi', desc: 'Pantau kurva pertumbuhan tinggi dan berat badan anak sesuai standar WHO.', hot: false },
  { id: 'tekanan-darah', name: 'Kalkulator Tekanan Darah', category: 'Kesehatan', categoryId: 'kesehatan', icon: Activity, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '/kesehatan/tekanan-darah', desc: 'Evaluasi hasil tensi darah dan pahami kategori kesehatannya.', hot: false },
  { id: 'diabetes', name: 'Risiko Diabetes', category: 'Kesehatan', categoryId: 'kesehatan', icon: Activity, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '/kesehatan/diabetes', desc: 'Skrining awal tingkat risiko diabetes berdasarkan gaya hidup dan keturunan.', hot: false },

  // Religi
  { id: 'sholat', name: 'Jadwal Sholat', category: 'Religi', categoryId: 'religi', icon: Moon, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '#', desc: 'Kalkulasi waktu masuk ibadah tersinkronisasi lintang bujur otomatis.', hot: true },
  { id: 'zakat', name: 'Kalkulator Zakat', category: 'Religi', categoryId: 'religi', icon: Calculator, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '#', desc: 'Simulasikan tercapainya batas minimum nisab harta maal & persentase penghasilan.', hot: true },
  { id: 'kiblat', name: 'Arah Kiblat', category: 'Religi', categoryId: 'religi', icon: Moon, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '#', desc: 'Kompas digital penunjuk arah Kakbah real-time sesuai lokasi.', hot: false },
  { id: 'hijriyah', name: 'Konversi Hijriyah', category: 'Religi', categoryId: 'religi', icon: Moon, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '#', desc: 'Konversi penanggalan kalender Masehi ke Hijriyah dan sebaliknya.', hot: false },
  { id: 'warisan', name: 'Kalkulator Warisan', category: 'Religi', categoryId: 'religi', icon: Calculator, color: 'text-[#4A7C59]', bg: 'bg-[#E8F5E9]', path: '#', desc: 'Perhitungan harta waris (Faraidh) berdasarkan syariat Islam.', hot: false },

  // Finansial
  { id: 'gajibersih', name: 'Kalkulator Gaji Bersih', category: 'Finansial', categoryId: 'finansial', icon: Wallet, color: 'text-[#9C4A2A]', bg: 'bg-[#FFF0EB]', path: '#', desc: 'Kalkulator proyeksi slip gaji usai pemotongan BPJS, JHT, dan PPh 21.', hot: true },
  { id: 'lembur', name: 'Kalkulator Lembur', category: 'Finansial', categoryId: 'finansial', icon: Wallet, color: 'text-[#9C4A2A]', bg: 'bg-[#FFF0EB]', path: '#', desc: 'Hitung upah jam lembur (overtime) sesuai regulasi Depnaker terbaru.', hot: false },
  { id: 'splitbill', name: 'Split Bill Nongkrong', category: 'Finansial', categoryId: 'finansial', icon: Wallet, color: 'text-[#9C4A2A]', bg: 'bg-[#FFF0EB]', path: '#', desc: 'Sistem bagi tagihan nongkrong bareng otomatis dengan kalkulasi pajak & servis.', hot: true },
  { id: 'tabungan', name: 'Simulasi Tabungan', category: 'Finansial', categoryId: 'finansial', icon: Wallet, color: 'text-[#9C4A2A]', bg: 'bg-[#FFF0EB]', path: '#', desc: 'Proyeksi pertumbuhan dana tabungan dengan perhitungan bunga majemuk.', hot: false },
  { id: 'cicilan', name: 'Kalkulator Cicilan', category: 'Finansial', categoryId: 'finansial', icon: Calculator, color: 'text-[#9C4A2A]', bg: 'bg-[#FFF0EB]', path: '#', desc: 'Simulasi pinjaman ringan dengan porsi pokok dan bunga flat/efektif.', hot: false },
  { id: 'budget', name: 'Budget Bulanan', category: 'Finansial', categoryId: 'finansial', icon: Wallet, color: 'text-[#9C4A2A]', bg: 'bg-[#FFF0EB]', path: '#', desc: 'Template pembagian alokasi gaji dengan metode 50/30/20.', hot: false },
  { id: 'nikah', name: 'Anggaran Pernikahan', category: 'Finansial', categoryId: 'finansial', icon: Wallet, color: 'text-[#9C4A2A]', bg: 'bg-[#FFF0EB]', path: '#', desc: 'Rencanakan budget resepsi impian dari vendor hingga ongkos tak terduga.', hot: false },
  { id: 'emas', name: 'Kalkulator Emas', category: 'Finansial', categoryId: 'finansial', icon: Wallet, color: 'text-[#9C4A2A]', bg: 'bg-[#FFF0EB]', path: '#', desc: 'Analisis keuntungan dan performa investasi logam mulia (Antam/Pegadaian).', hot: false },
  { id: 'darurat', name: 'Dana Darurat', category: 'Finansial', categoryId: 'finansial', icon: Wallet, color: 'text-[#9C4A2A]', bg: 'bg-[#FFF0EB]', path: '#', desc: 'Target minimal dana aman sesuai status pernikahan dan tanggungan.', hot: false },
  { id: 'kpr', name: 'Simulasi KPR', category: 'Finansial', categoryId: 'finansial', icon: Calculator, color: 'text-[#9C4A2A]', bg: 'bg-[#FFF0EB]', path: '#', desc: 'Proyeksi cicilan bulanan kredit kepemilikan rumah (KPR).', hot: true },
  { id: 'kredit-motor', name: 'Cicilan Kendaraan', category: 'Finansial', categoryId: 'finansial', icon: Calculator, color: 'text-[#9C4A2A]', bg: 'bg-[#FFF0EB]', path: '#', desc: 'Estimasikan angsuran bulanan (EMI) kredit motor atau mobil.', hot: false },
  { id: 'margin', name: 'Harga Jual & Margin', category: 'Finansial', categoryId: 'finansial', icon: Calculator, color: 'text-[#9C4A2A]', bg: 'bg-[#FFF0EB]', path: '#', desc: 'Tentukan harga jual produk e-commerce dengan margin dan markup yang tepat.', hot: true },

  // Produktivitas
  { id: 'cv', name: 'Generator CV ATS', category: 'Produktivitas', categoryId: 'produktivitas', icon: Activity, color: 'text-[#C17A3A]', bg: 'bg-[#FFF3E0]', path: '#', desc: 'Buat resume profesional anti-kick sistem Applicant Tracking System.', hot: true },
  { id: 'lamaran', name: 'Generator Surat Lamaran', category: 'Produktivitas', categoryId: 'produktivitas', icon: Activity, color: 'text-[#C17A3A]', bg: 'bg-[#FFF3E0]', path: '#', desc: 'Template cover letter instan terstruktur untuk berbagai bidang profesi.', hot: false },
  { id: 'pomodoro', name: 'Pomodoro Timer', category: 'Produktivitas', categoryId: 'produktivitas', icon: Timer, color: 'text-[#C17A3A]', bg: 'bg-[#FFF3E0]', path: '#', desc: 'Tingkatkan retensi fokus kerja tanpa distraksi menggunakan interval waktu sains.', hot: true },

  // Others
  { id: 'url', name: 'URL Shortener', category: 'Lainnya', categoryId: 'others', icon: Activity, color: 'text-[#7A5C42]', bg: 'bg-[#EDE0D0]', path: '#', desc: 'Pendekkan tautan panjang menjadi link ringkas siap sebar.', hot: true },
  { id: 'qr', name: 'QR Code Generator', category: 'Lainnya', categoryId: 'others', icon: Activity, color: 'text-[#7A5C42]', bg: 'bg-[#EDE0D0]', path: '#', desc: 'Buat kode QR kustom untuk link, teks, atau kontak.', hot: true },
  { id: 'password', name: 'Password Generator', category: 'Lainnya', categoryId: 'others', icon: Activity, color: 'text-[#7A5C42]', bg: 'bg-[#EDE0D0]', path: '#', desc: 'Buat password yang kuat dan aman untuk berbagai keperluan.', hot: true },

  // Image Tool
  { id: 'image-resizer', name: 'Image Resizer', category: 'Image Tool', categoryId: 'image-tool', icon: Activity, color: 'text-[#7A5C42]', bg: 'bg-[#EDE0D0]', path: '#', desc: 'Ubah ukuran dimensi foto secara massal tanpa watermark.', hot: false },
];
