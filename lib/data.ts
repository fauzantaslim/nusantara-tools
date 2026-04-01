import { Activity, Wallet, Moon, Timer, Calculator } from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  path: string;
  desc: string;
  hot: boolean;
  keywords?: string[];
}

export const TOOLS: Tool[] = [
  // Kesehatan
  { 
    id: 'bmi', 
    name: 'Kalkulator BMI', 
    category: 'Kesehatan', 
    categoryId: 'kesehatan', 
    icon: Activity, 
    color: 'text-[#4A7C59]', 
    bg: 'bg-[#E8F5E9]', 
    path: '/kesehatan/bmi', 
    desc: 'Hitung tingkat ideal massa tubuh secara akurat berdasarkan standar metrik Asia-Pasifik.', 
    hot: true,
    keywords: ['BMI', 'Body Mass Index', 'Indeks Massa Tubuh', 'IMT', 'berat badan ideal', 'حاسبة مؤشر كتلة الجسم', 'Калькулятор ИМТ', 'BMI Calculator']
  },
  { 
    id: 'masa-subur', 
    name: 'Kalkulator Masa Subur', 
    category: 'Kesehatan', 
    categoryId: 'kesehatan', 
    icon: Activity, 
    color: 'text-[#4A7C59]', 
    bg: 'bg-[#E8F5E9]', 
    path: '/kesehatan/masa-subur', 
    desc: 'Kalkulasi siklus menstruasi dan prediksi jendela masa subur wanita.', 
    hot: true,
    keywords: ['ovulasi', 'menstruasi', 'haid', 'kesuburan', 'fertility', 'ovulation calculator', 'حاسبة الإباضة', 'Калькулятор овуляции']
  },
  { 
    id: 'kalori', 
    name: 'Kalkulator Kalori Harian', 
    category: 'Kesehatan', 
    categoryId: 'kesehatan', 
    icon: Activity, 
    color: 'text-[#4A7C59]', 
    bg: 'bg-[#E8F5E9]', 
    path: '/kesehatan/kalori', 
    desc: 'Hitung kebutuhan kalori harian (TDEE) untuk mencapai target berat badan.', 
    hot: false,
    keywords: ['TDEE', 'BMR', 'diet', 'energi', 'calorie calculator', 'حاسبة السعرات الحرارية', 'Калькулятор калорий']
  },
  { 
    id: 'air', 
    name: 'Kalkulator Kebutuhan Air', 
    category: 'Kesehatan', 
    categoryId: 'kesehatan', 
    icon: Activity, 
    color: 'text-[#4A7C59]', 
    bg: 'bg-[#E8F5E9]', 
    path: '/kesehatan/air', 
    desc: 'Estimasi asupan cairan yang wajib dipenuhi per hari berdasarkan level rutinitas.', 
    hot: false,
    keywords: ['hidrasi', 'minum', 'cairan', 'water intake calculator', 'حاسبة احتياجات الماء', 'Калькулятор воды']
  },
  { 
    id: 'sleep', 
    name: 'Sleep Cycle Calculator', 
    category: 'Kesehatan', 
    categoryId: 'kesehatan', 
    icon: Moon, 
    color: 'text-[#4A7C59]', 
    bg: 'bg-[#E8F5E9]', 
    path: '/kesehatan/tidur', 
    desc: 'Temukan jam tidur dan bangun ideal untuk menghindari rasa lelah.', 
    hot: true,
    keywords: ['tidur', 'bangun', 'istirahat', 'REM', 'sleep calculator', 'حاسبة النوم', 'Калькулятор сна']
  },
  { 
    id: '1rm', 
    name: 'Kalkulator 1RM', 
    category: 'Kesehatan', 
    categoryId: 'kesehatan', 
    icon: Activity, 
    color: 'text-[#4A7C59]', 
    bg: 'bg-[#E8F5E9]', 
    path: '/kesehatan/1rm', 
    desc: 'Hitung porsi beban maksimum untuk satu repetisi latihan angkat beban.', 
    hot: false,
    keywords: ['gym', 'fitness', 'angkat beban', 'one rep max', 'حاسبة 1RM', 'Калькулятор 1ПМ']
  },
  { 
    id: 'kafein', 
    name: 'Kalkulator Kafein Aman', 
    category: 'Kesehatan', 
    categoryId: 'kesehatan', 
    icon: Activity, 
    color: 'text-[#4A7C59]', 
    bg: 'bg-[#E8F5E9]', 
    path: '/kesehatan/kafein', 
    desc: 'Batas asupan kopi dan minuman berkafein harian sesuai kondisi tubuh.', 
    hot: false,
    keywords: ['kopi', 'teh', 'energi drink', 'caffeine calculator', 'حاسبة الكافيين', 'Калькулятор кофеина']
  },
  { 
    id: 'hpl', 
    name: 'Prediksi HPL', 
    category: 'Kesehatan', 
    categoryId: 'kesehatan', 
    icon: Activity, 
    color: 'text-[#4A7C59]', 
    bg: 'bg-[#E8F5E9]', 
    path: '/kesehatan/kehamilan', 
    desc: 'Kalkulator Hari Perkiraan Lahir untuk memantau kehamilan.', 
    hot: true,
    keywords: ['hamil', 'bayi', 'melahirkan', 'due date calculator', 'حاسبة تاريخ الولادة المتوقع', 'Калькулятор ПДР']
  },
  { 
    id: 'grafik-bayi', 
    name: 'Grafik Pertumbuhan Bayi', 
    category: 'Kesehatan', 
    categoryId: 'kesehatan', 
    icon: Activity, 
    color: 'text-[#4A7C59]', 
    bg: 'bg-[#E8F5E9]', 
    path: '/kesehatan/grafik-bayi', 
    desc: 'Pantau kurva pertumbuhan tinggi dan berat badan anak sesuai standar WHO.', 
    hot: false,
    keywords: ['anak', 'stunting', 'berat badan', 'tinggi badan', 'baby growth chart', 'جدول نمو الطفل', 'График роста ребенка']
  },
  { 
    id: 'tekanan-darah', 
    name: 'Kalkulator Tekanan Darah', 
    category: 'Kesehatan', 
    categoryId: 'kesehatan', 
    icon: Activity, 
    color: 'text-[#4A7C59]', 
    bg: 'bg-[#E8F5E9]', 
    path: '/kesehatan/tekanan-darah', 
    desc: 'Evaluasi hasil tensi darah dan pahami kategori kesehatannya.', 
    hot: false,
    keywords: ['hipertensi', 'tensi', 'darah tinggi', 'blood pressure calculator', 'حاسبة ضغط الدم', 'Калькулятор кровяного давления']
  },
  { 
    id: 'diabetes', 
    name: 'Risiko Diabetes', 
    category: 'Kesehatan', 
    categoryId: 'kesehatan', 
    icon: Activity, 
    color: 'text-[#4A7C59]', 
    bg: 'bg-[#E8F5E9]', 
    path: '/kesehatan/diabetes', 
    desc: 'Skrining awal tingkat risiko diabetes berdasarkan gaya hidup dan keturunan.', 
    hot: false,
    keywords: ['gula darah', 'glukosa', 'diabetes risk calculator', 'حاسبة مخاطر السكري', 'Калькулятор риска диабета']
  },

  // Religi
  { 
    id: 'sholat', 
    name: 'Kalkulator Sholat', 
    category: 'Religi', 
    categoryId: 'religi', 
    icon: Moon, 
    color: 'text-[#4A7C59]', 
    bg: 'bg-[#E8F5E9]', 
    path: '/religi/sholat', 
    desc: 'Kalkulasi waktu masuk ibadah tersinkronisasi lintang bujur otomatis.', 
    hot: true,
    keywords: ['adzan', 'waktu sholat', 'jadwal sholat', 'prayer times calculator', 'حاسبة مواقيت الصلاة', 'Калькулятор времени молитвы']
  },
  { 
    id: 'zakat', 
    name: 'Kalkulator Zakat', 
    category: 'Religi', 
    categoryId: 'religi', 
    icon: Calculator, 
    color: 'text-[#4A7C59]', 
    bg: 'bg-[#E8F5E9]', 
    path: '/religi/zakat', 
    desc: 'Simulasikan tercapainya batas minimum nisab harta maal & persentase penghasilan.', 
    hot: true,
    keywords: ['sedekah', 'infak', 'zakat mal', 'zakat profesi', 'zakat calculator', 'حاسبة الزكاة', 'Калькулятор закята']
  },
  { 
    id: 'hijriyah', 
    name: 'Konversi Hijriyah', 
    category: 'Religi', 
    categoryId: 'religi', 
    icon: Moon, 
    color: 'text-[#4A7C59]', 
    bg: 'bg-[#E8F5E9]', 
    path: '/religi/hijriyah', 
    desc: 'Konversi penanggalan kalender Masehi ke Hijriyah and sebaliknya.', 
    hot: false,
    keywords: ['kalender islam', 'tanggalan', 'masehi', 'hijri converter', 'محول التاريخ الهجري', 'Конвертер Хиджры']
  },
  
  // Finansial
  { 
    id: 'lembur', 
    name: 'Kalkulator Lembur', 
    category: 'Finansial', 
    categoryId: 'finansial', 
    icon: Wallet, 
    color: 'text-[#9C4A2A]', 
    bg: 'bg-[#FFF0EB]', 
    path: '#', 
    desc: 'Hitung upah jam lembur (overtime) sesuai regulasi Depnaker terbaru.', 
    hot: false,
    keywords: ['gaji', 'overtime', 'pekerjaan', 'upah', 'overtime calculator', 'حاسبة العمل الإضافي', 'Калькулятор сверхурочных']
  },
  { 
    id: 'pensiun-dini', 
    name: 'Kalkulator Pensiun Dini', 
    category: 'Finansial', 
    categoryId: 'finansial', 
    icon: Wallet, 
    color: 'text-[#9C4A2A]', 
    bg: 'bg-[#FFF0EB]', 
    path: '#', 
    desc: 'Simulasi target dana pensiun dan proyeksi pertumbuhan investasi.', 
    hot: false,
    keywords: ['FIRE', 'investasi', 'masa tua', 'early retirement calculator', 'حاسبة التقاعد المبكر', 'Калькулятор раннего выхода на пенсию']
  },
  { 
    id: 'splitbill', 
    name: 'Split Bill Nongkrong', 
    category: 'Finansial', 
    categoryId: 'finansial', 
    icon: Wallet, 
    color: 'text-[#9C4A2A]', 
    bg: 'bg-[#FFF0EB]', 
    path: '#', 
    desc: 'Sistem bagi tagihan nongkrong bareng otomatis dengan kalkulasi pajak & servis.', 
    hot: true,
    keywords: ['bayar bareng', 'patungan', 'tagihan', 'pajak', 'split bill', 'تقسيم الفاتورة', 'Разделение счета']
  },
  { 
    id: 'cicilan', 
    name: 'Kalkulator Cicilan', 
    category: 'Finansial', 
    categoryId: 'finansial', 
    icon: Calculator, 
    color: 'text-[#9C4A2A]', 
    bg: 'bg-[#FFF0EB]', 
    path: '#', 
    desc: 'Simulasi pinjaman ringan dengan porsi pokok dan bunga flat/efektif.', 
    hot: false,
    keywords: ['pinjaman', 'kredit', 'bunga', 'loan calculator', 'حاسبة القروض', 'Кредитный калькулятор']
  },
  { 
    id: 'nikah', 
    name: 'Anggaran Pernikahan', 
    category: 'Finansial', 
    categoryId: 'finansial', 
    icon: Wallet, 
    color: 'text-[#9C4A2A]', 
    bg: 'bg-[#FFF0EB]', 
    path: '#', 
    desc: 'Rencanakan budget resepsi impian dari vendor hingga ongkos tak terduga.', 
    hot: false,
    keywords: ['wedding', 'biaya nikah', 'resepsi', 'wedding budget', 'ميزانية الزفاف', 'Бюджет свадьбы']
  },
  { 
    id: 'emas', 
    name: 'Kalkulator Emas', 
    category: 'Finansial', 
    categoryId: 'finansial', 
    icon: Wallet, 
    color: 'text-[#9C4A2A]', 
    bg: 'bg-[#FFF0EB]', 
    path: '#', 
    desc: 'Analisis keuntungan dan performa investasi logam mulia (Antam/Pegadaian).', 
    hot: false,
    keywords: ['logam mulia', 'antam', 'investasi emas', 'gold calculator', 'حاسبة الذهب', 'Калькулятор золота']
  },
  { 
    id: 'darurat', 
    name: 'Dana Darurat', 
    category: 'Finansial', 
    categoryId: 'finansial', 
    icon: Wallet, 
    color: 'text-[#9C4A2A]', 
    bg: 'bg-[#FFF0EB]', 
    path: '#', 
    desc: 'Target minimal dana aman sesuai status pernikahan dan tanggungan.', 
    hot: false,
    keywords: ['emergency fund', 'tabungan', 'keamanan finansial', 'حاسبة صندوق الطوارئ', 'Калькулятор экстренного фонда']
  },
  { 
    id: 'kpr', 
    name: 'Simulasi KPR', 
    category: 'Finansial', 
    categoryId: 'finansial', 
    icon: Calculator, 
    color: 'text-[#9C4A2A]', 
    bg: 'bg-[#FFF0EB]', 
    path: '#', 
    desc: 'Proyeksi cicilan bulanan kredit kepemilikan rumah (KPR).', 
    hot: true,
    keywords: ['rumah', 'cicilan rumah', 'mortgage', 'حاسبة التمويل العقاري', 'Ипотечный калькулятор']
  },
  { 
    id: 'margin', 
    name: 'Harga Jual & Margin', 
    category: 'Finansial', 
    categoryId: 'finansial', 
    icon: Calculator, 
    color: 'text-[#9C4A2A]', 
    bg: 'bg-[#FFF0EB]', 
    path: '#', 
    desc: 'Tentukan harga jual produk e-commerce dengan margin dan markup yang tepat.', 
    hot: true,
    keywords: ['untung', 'markup', 'bisnis', 'e-commerce', 'profit margin calculator', 'حاسبة هامش الربح', 'Калькулятор маржи']
  },

  // Produktivitas
  { 
    id: 'cv', 
    name: 'Generator CV ATS', 
    category: 'Produktivitas', 
    categoryId: 'produktivitas', 
    icon: Activity, 
    color: 'text-[#C17A3A]', 
    bg: 'bg-[#FFF3E0]', 
    path: '#', 
    desc: 'Buat resume profesional anti-kick sistem Applicant Tracking System.', 
    hot: true,
    keywords: ['lamaran kerja', 'resume', 'curriculum vitae', 'ATS generator', 'منشئ السيرة الذاتية', 'Генератор резюме']
  },
  { 
    id: 'lamaran', 
    name: 'Generator Surat Lamaran', 
    category: 'Produktivitas', 
    categoryId: 'produktivitas', 
    icon: Activity, 
    color: 'text-[#C17A3A]', 
    bg: 'bg-[#FFF3E0]', 
    path: '#', 
    desc: 'Template cover letter instan terstruktur untuk berbagai bidang profesi.', 
    hot: false,
    keywords: ['lamaran', 'kerja', 'cover letter', 'منشئ رسالة غلاف', 'Генератор сопроводительных писем']
  },
  { 
    id: 'pomodoro', 
    name: 'Pomodoro Timer', 
    category: 'Produktivitas', 
    categoryId: 'produktivitas', 
    icon: Timer, 
    color: 'text-[#C17A3A]', 
    bg: 'bg-[#FFF3E0]', 
    path: '#', 
    desc: 'Tingkatkan retensi fokus kerja tanpa distraksi menggunakan interval waktu sains.', 
    hot: true,
    keywords: ['fokus', 'belajar', 'waktu', 'productivity', 'timer', 'مؤقت بومودورو', 'Таймер Помидора']
  },

  // Others
  { 
    id: 'url', 
    name: 'URL Shortener', 
    category: 'Lainnya', 
    categoryId: 'others', 
    icon: Activity, 
    color: 'text-[#7A5C42]', 
    bg: 'bg-[#EDE0D0]', 
    path: '#', 
    desc: 'Pendekkan tautan panjang menjadi link ringkas siap sebar.', 
    hot: true,
    keywords: ['link', 'tautan', 'singkat', 'URL shortener', 'مختصر روابط', 'Сокращатель ссылок']
  },
  { 
    id: 'qr', 
    name: 'QR Code Generator', 
    category: 'Lainnya', 
    categoryId: 'others', 
    icon: Activity, 
    color: 'text-[#7A5C42]', 
    bg: 'bg-[#EDE0D0]', 
    path: '#', 
    desc: 'Buat kode QR kustom untuk link, teks, atau kontak.', 
    hot: true,
    keywords: ['barcode', 'QR', 'scan', 'QR generator', 'منشئ كود QR', 'Генератор QR-кодов']
  },
  { 
    id: 'password', 
    name: 'Password Generator', 
    category: 'Lainnya', 
    categoryId: 'others', 
    icon: Activity, 
    color: 'text-[#7A5C42]', 
    bg: 'bg-[#EDE0D0]', 
    path: '#', 
    desc: 'Buat password yang kuat dan aman untuk berbagai keperluan.', 
    hot: true,
    keywords: ['keamanan', 'sandi', 'acak', 'password generator', 'مولد كلمة السر', 'Генератор паролей']
  },
];
