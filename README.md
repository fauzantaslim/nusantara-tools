# NusantaraTools

**Koleksi alat digital gratis untuk warga Indonesia** — cepat, akurat, dan lengkap.

Platform berbasis web yang menyediakan kalkulator dan tools sehari-hari mulai dari finansial, kesehatan, religi, hingga utilitas umum. Dibangun dengan Next.js 16, TypeScript, Tailwind CSS v4, dan Supabase.

🌐 **Live site:** [nusantaratools.my.id](https://nusantaratools.my.id)

---

## 📦 Kategori & Tools

### 💰 Finansial

| Tool                           | Deskripsi                            |
| ------------------------------ | ------------------------------------ |
| Kalkulator Split Bill          | Bagi tagihan secara adil antar teman |
| Kalkulator Lembur              | Hitung uang lembur berdasarkan gaji  |
| Kalkulator Dana Darurat        | Estimasi kebutuhan dana darurat      |
| Kalkulator Pensiun             | Perencanaan dana pensiun             |
| Kalkulator Cicilan Kendaraan   | Simulasi cicilan motor/mobil         |
| Kalkulator Harga Jual & Margin | Hitung margin keuntungan bisnis      |
| Kalkulator Depresiasi Aset     | Hitung penyusutan nilai aset         |
| Kalkulator Anggaran Pernikahan | Estimasi total biaya pernikahan      |

### 🏥 Kesehatan

| Tool                            | Deskripsi                              |
| ------------------------------- | -------------------------------------- |
| Kalkulator BMI                  | Indeks massa tubuh                     |
| Kalkulator Kalori Harian        | Kebutuhan kalori berdasarkan aktivitas |
| Kalkulator Kebutuhan Air        | Estimasi asupan air harian             |
| Kalkulator Kafein Aman          | Batas konsumsi kafein aman             |
| Kalkulator Siklus Tidur         | Waktu tidur optimal                    |
| Kalkulator Tekanan Darah        | Klasifikasi tekanan darah              |
| Kalkulator Masa Subur           | Prediksi masa subur wanita             |
| Kalkulator Hari Perkiraan Lahir | Estimasi HPL kehamilan                 |
| Kalkulator 1RM                  | One Rep Max untuk latihan beban        |
| Grafik Pertumbuhan Bayi         | Pantau tumbuh kembang bayi             |
| Risiko Diabetes                 | Skrining risiko diabetes tipe 2        |

### 🕌 Religi

| Tool                        | Deskripsi                         |
| --------------------------- | --------------------------------- |
| Jadwal Sholat               | Jadwal sholat berdasarkan lokasi  |
| Kalkulator Zakat Pendapatan | Hitung zakat penghasilan          |
| Konversi Hijriyah           | Konversi tanggal Masehi ↔ Hijriah |

### 🗂 Produktivitas

| Tool                          | Deskripsi                              |
| ----------------------------- | -------------------------------------- |
| Generator CV ATS              | Buat CV ramah ATS dalam hitungan menit |
| Generator Surat Lamaran Kerja | Template surat lamaran profesional     |
| Pomodoro Timer                | Timer fokus teknik Pomodoro            |

### 🔧 Utilitas

| Tool               | Deskripsi                           |
| ------------------ | ----------------------------------- |
| QR Generator       | Buat QR code dari teks/URL          |
| Password Generator | Buat password kuat secara acak      |
| URL Shortener      | Persingkat URL dengan analitik klik |

---

## 🛠 Tech Stack

| Kategori       | Teknologi                                            |
| -------------- | ---------------------------------------------------- |
| Framework      | [Next.js 16](https://nextjs.org) (App Router)        |
| Language       | TypeScript 5                                         |
| Styling        | Tailwind CSS v4                                      |
| Database       | PostgreSQL via [Supabase](https://supabase.com)      |
| ORM            | [Prisma 7](https://www.prisma.io)                    |
| Auth / Backend | Supabase SSR                                         |
| Icons          | [Lucide React](https://lucide.dev)                   |
| Charts         | [Recharts](https://recharts.org)                     |
| QR Code        | [qrcode.react](https://github.com/zpao/qrcode.react) |
| PDF Export     | jsPDF + html2canvas                                  |
| OCR            | Tesseract.js                                         |
| Fuzzy Search   | Fuse.js                                              |
| Prayer Times   | Adhan.js                                             |
| Hijri Calendar | hijri-converter                                      |
| Date Utilities | date-fns                                             |
| Validation     | Zod                                                  |
| Fonts          | Plus Jakarta Sans + Lora (via `next/font`)           |
| Unit Testing   | Jest + Testing Library                               |
| E2E Testing    | Playwright + Cucumber                                |
| Code Quality   | ESLint + Prettier + Husky                            |

---

## 📁 Project Structure

```
nusantara-tools/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (Navbar, Footer, metadata, fonts)
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global CSS & brand variables
│   ├── robots.ts               # robots.txt generation
│   ├── sitemap.ts              # sitemap.xml generation
│   ├── api/
│   │   └── short-links/        # REST API untuk URL shortener
│   ├── finansial/              # Halaman kategori & tool finansial
│   ├── kesehatan/              # Halaman kategori & tool kesehatan
│   ├── religi/                 # Halaman kategori & tool religi
│   ├── produktivitas/          # Halaman kategori & tool produktivitas
│   ├── utilitas/               # Halaman kategori & tool utilitas
│   ├── s/[code]/               # Redirect handler URL shortener
│   ├── tentang/                # Halaman Tentang Kami
│   ├── kontak/                 # Halaman Kontak
│   ├── kebijakan-privasi/      # Kebijakan Privasi
│   └── syarat-ketentuan/       # Syarat & Ketentuan
│
├── components/
│   ├── layout/                 # Navbar & Footer
│   └── home/                   # Komponen halaman utama
│
├── ui/                         # Shared UI primitives (Headless)
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   ├── Textarea.tsx
│   ├── Card.tsx
│   ├── CurrencyInput.tsx
│   ├── SegmentedControl.tsx
│   └── Breadcrumbs.tsx
│
├── features/                   # Business logic per fitur (28 features)
│   ├── bmi/
│   ├── kalori/
│   ├── sholat/
│   ├── url-shortener/
│   ├── qr-generator/
│   └── ... (dan lainnya)
│
├── lib/
│   ├── prisma.ts               # Prisma client singleton
│   ├── constants.ts            # Konstanta aplikasi
│   ├── data.ts                 # Data statis (tools catalog, dll)
│   ├── utils.ts                # Helper functions (cn, dll)
│   ├── sitemap-routes.ts       # Routes untuk sitemap
│   └── supabase/               # Supabase client (server & browser)
│
├── utils/
│   └── bmi.test.ts             # Unit test utilities
│
├── prisma/
│   ├── schema.prisma           # Database schema (ShortLink, LinkAnalytic)
│   └── migrations/             # Migration history
│
├── tests/
│   └── e2e/                    # Playwright E2E tests
│
├── docs/
│   └── brand-guidelines.md     # Panduan identitas visual NusantaraTools
│
├── public/                     # Static assets
│   └── ads.txt                 # Google AdSense verification
│
├── .env.example                # Template environment variables
├── .env.local.example          # Template env lokal
├── jest.config.ts              # Konfigurasi Jest
├── playwright.config.ts        # Konfigurasi Playwright
├── next.config.ts              # Konfigurasi Next.js
└── package.json
```

---

## 🚀 Memulai

### Prasyarat

- **Node.js** v18 atau lebih baru
- **npm**
- Akun [Supabase](https://supabase.com) (untuk fitur URL shortener)

### Instalasi

1. **Clone repositori**

   ```bash
   git clone https://github.com/fauzantaslim/nusantara-tools.git
   cd nusantara-tools
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Salin file environment**

   ```bash
   cp .env.example .env
   cp .env.local.example .env.local
   ```

4. **Isi variabel environment di `.env`**

   ```env
   # Supabase Postgres — Transaction pooler (runtime Next.js)
   DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

   # Supabase Postgres — Session pooler (untuk prisma migrate)
   DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres"
   ```

   > Salin connection string dari **Supabase Dashboard → Connect → Transaction pooler** dan **Session pooler**.

5. **Jalankan migrasi database**

   ```bash
   npm run db:migrate
   ```

6. **Jalankan development server**

   ```bash
   npm run dev
   ```

7. Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 📦 Scripts

| Script                  | Deskripsi                                     |
| ----------------------- | --------------------------------------------- |
| `npm run dev`           | Jalankan development server                   |
| `npm run build`         | Build production (termasuk `prisma generate`) |
| `npm run start`         | Jalankan production server                    |
| `npm run lint`          | Jalankan ESLint                               |
| `npm run format`        | Format kode dengan Prettier                   |
| `npm run check-types`   | Cek TypeScript tanpa emit                     |
| `npm run test`          | Jalankan unit tests (Jest)                    |
| `npm run test:watch`    | Jest watch mode                               |
| `npm run test:coverage` | Jest dengan coverage report                   |
| `npm run test:e2e`      | Jalankan E2E tests (Playwright)               |
| `npm run test:e2e:ui`   | Playwright dengan UI mode                     |
| `npm run db:generate`   | Generate Prisma client                        |
| `npm run db:migrate`    | Buat & jalankan migrasi baru                  |
| `npm run db:deploy`     | Deploy migrasi ke production                  |
| `npm run db:studio`     | Buka Prisma Studio (GUI database)             |

---

## 🗄 Database

Proyek ini menggunakan **PostgreSQL** yang di-host di [Supabase](https://supabase.com), diakses via **Prisma ORM**.

### Schema

```prisma
model ShortLink {
  id          String         @id @default(cuid())
  shortCode   String         @unique
  originalUrl String
  clickCount  Int            @default(0)
  ownerToken  String         @unique
  createdAt   DateTime       @default(now())
  analytics   LinkAnalytic[]
}

model LinkAnalytic {
  id          String    @id @default(cuid())
  shortLinkId String
  timestamp   DateTime  @default(now())
  country     String?
  city        String?
  referrer    String?
  browser     String?
  device      String?
  os          String?
}
```

> **Catatan koneksi Supabase:** Jika `prisma migrate` gagal dengan error `P1001` di Windows (IPv4-only), gunakan **Session pooler** (port 5432) untuk `DIRECT_URL`, bukan Direct connection.

---

## 🎨 Brand Guidelines

NusantaraTools menggunakan identitas visual **earth-tone** yang terinspirasi dari alam Indonesia. Selengkapnya ada di [`docs/brand-guidelines.md`](./docs/brand-guidelines.md).

**Warna utama:**

| Token              | Hex       | Nama        |
| ------------------ | --------- | ----------- |
| `--color-primary`  | `#2C1A0E` | Tanah Tua   |
| `--color-surface`  | `#F5EDE3` | Pasir Putih |
| `--color-accent-1` | `#C17A3A` | Kunyit Emas |
| `--color-accent-2` | `#4A7C59` | Hijau Hutan |
| `--color-accent-3` | `#9C4A2A` | Merah Bata  |

**Tipografi:** Plus Jakarta Sans (heading & UI) + Lora (body text)

---

## 🧪 Testing

### Unit Tests (Jest + Testing Library)

```bash
npm run test              # Jalankan semua unit tests
npm run test:watch        # Watch mode
npm run test:coverage     # Dengan coverage report
```

### E2E Tests (Playwright)

```bash
npm run test:e2e          # Headless
npm run test:e2e:ui       # Mode UI interaktif
```

---

## 🌍 Deployment

Proyek ini dioptimalkan untuk deployment di **Vercel**.

1. Push ke GitHub.
2. Import repo di [vercel.com/new](https://vercel.com/new).
3. Tambahkan environment variables di Vercel Dashboard:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `NEXT_PUBLIC_BASE_URL` (contoh: `https://nusantaratools.my.id`)
4. Deploy — Vercel akan otomatis menjalankan `prisma generate && next build`.

---

## 📄 Lisensi

Proyek ini bersifat open source dan tersedia di bawah [MIT License](LICENSE).
