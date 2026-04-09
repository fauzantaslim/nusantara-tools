"use client";

import React from "react";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { useLembur } from "@/features/lembur/hooks/useLembur";
import { LemburForm } from "@/features/lembur/components/LemburForm";
import { LemburResult } from "@/features/lembur/components/LemburResult";
import {
  Info,
  CheckCircle2,
  Scale,
  Calculator,
  BookOpen,
  Globe,
  ExternalLink,
} from "lucide-react";

export default function LemburPage() {
  const lemburData = useLembur();
  console.log("useLembur output:", lemburData);
  const {
    input,
    result,
    updateMode,
    setHourlyRate,
    setRegularHours,
    setHourUnit,
    setMonthlySalary,
    setFixedAllowance,
    setEnableFixedAllowance,
    setWorkSchedule,
    setDayType,
    setIndonesiaOvertimeHours,
    setBonus,
    setEnableBonus,
    setTaxRate,
    setEnableTax,
    addTier,
    removeTier,
    updateTierMultiplier,
    updateTierHours,
    updateTierCustomRate,
    resetForm,
  } = lemburData;

  const hasInput =
    input.mode === "global"
      ? input.hourlyRate > 0 || input.regularHours > 0
      : input.monthlySalary > 0;

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Finansial", href: "/finansial" },
            { label: "Kalkulator Lembur" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Kalkulator Lembur
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Hitung gaji overtime per tier lembur — termasuk mode khusus{" "}
            <span className="text-[#9C4A2A] font-bold">
              🇮🇩 PP No. 35 Tahun 2021
            </span>
            .
          </p>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <LemburForm
            input={input}
            onSelectMode={updateMode}
            onHourlyRateChange={setHourlyRate}
            onRegularHoursChange={setRegularHours}
            onHourUnitChange={setHourUnit}
            onMonthlySalaryChange={setMonthlySalary}
            onFixedAllowanceChange={setFixedAllowance}
            onEnableFixedAllowanceChange={setEnableFixedAllowance}
            onWorkScheduleChange={setWorkSchedule}
            onDayTypeChange={setDayType}
            onIndonesiaOvertimeHoursChange={setIndonesiaOvertimeHours}
            onBonusChange={setBonus}
            onEnableBonusChange={setEnableBonus}
            onTaxRateChange={setTaxRate}
            onEnableTaxChange={setEnableTax}
            onAddTier={addTier}
            onRemoveTier={removeTier}
            onUpdateTierMultiplier={updateTierMultiplier}
            onUpdateTierHours={updateTierHours}
            onUpdateTierCustomRate={updateTierCustomRate}
            onReset={resetForm}
          />
        </div>

        <div className="lg:col-span-7">
          <LemburResult result={result} hasInput={hasInput} />
        </div>
      </div>

      {/* ── Educational / Info Section ────────────────────────────────────── */}
      <div className="mt-16 mb-24">
        <div className="relative">
          <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30">
            <div className="absolute inset-0 overflow-hidden rounded-[3rem] pointer-events-none">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9C4A2A] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C17A3A] rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/3" />
            </div>

            <div className="flex flex-col gap-16 lg:gap-24 relative z-10">
              {/* Hero */}
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                <span className="text-[#C17A3A] font-bold tracking-widest uppercase text-xs mb-4 block">
                  Pahami Hak Lembur Anda
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                  Tentang Gaji Lembur
                </h2>
                <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                  Gaji lembur adalah premi yang dibayarkan kepada karyawan yang
                  bekerja melebihi jam kerja standar. Biasanya dihitung sebagai
                  kelipatan dari tarif per jam reguler — diatur secara ketat
                  oleh hukum ketenagakerjaan.
                </p>
                <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-start gap-4 sm:gap-6 backdrop-blur-sm mx-auto text-left shadow-inner">
                  <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#C17A3A] shrink-0 mt-1" />
                  <div className="flex flex-col gap-3">
                    <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug">
                      Aturan lembur bervariasi antar negara dan kontrak kerja.
                      Mode 🇮🇩 Indonesia mengikuti{" "}
                      <strong>PP No. 35 Tahun 2021</strong> secara akurat.
                    </p>
                    <a
                      href="https://peraturan.bpk.go.id/Details/161904/pp-no-35-tahun-2021"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#C17A3A] text-sm font-bold hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Baca PP No. 35 Tahun 2021 — BPK RI
                    </a>
                  </div>
                </div>
              </div>

              {/* Tarif lembur umum */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "1.5× — Waktu & Setengah",
                    desc: "Tarif paling umum; berlaku untuk jam kerja melebihi 40 jam seminggu. Di Indonesia: jam ke-1 pada hari kerja biasa.",
                  },
                  {
                    title: "2× — Dua Kali Lipat",
                    desc: "Untuk kerja malam, hari Minggu, atau hari libur nasional. Di Indonesia: jam 1–8 di hari libur.",
                  },
                  {
                    title: "3× — Tiga Kali",
                    desc: "Di Indonesia: jam ke-9 di hari libur (5-day week) atau jam ke-8 (6-day week). Juga untuk kondisi kontrak tertentu.",
                  },
                  {
                    title: "4× — Empat Kali",
                    desc: "Tarif tertinggi PP 35/2021: jam 10–12 di hari libur (5-day) atau jam 9–11 (6-day).",
                  },
                ].map((step, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#9C4A2A]/30 transition-all group"
                  >
                    <Calculator className="w-8 h-8 text-[#C17A3A] mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="text-base font-bold font-heading text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-[#EDE0D0]/70 font-body text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* PP 35/2021 detail table */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <h3 className="text-2xl font-bold font-heading text-white">
                    🇮🇩 Aturan PP No. 35 Tahun 2021
                  </h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Rumus Upah Per Jam",
                      rows: [
                        "Upah Per Jam = 1/173 × (Gaji Pokok + Tunjangan Tetap)",
                        "Angka 173 = rata-rata jam kerja per bulan (40 jam × 52 minggu / 12 bulan ≈ 173)",
                      ],
                    },
                    {
                      title: "Hari Kerja Biasa",
                      rows: [
                        "Jam ke-1: 1.5× upah per jam",
                        "Jam ke-2 dst: 2× upah per jam",
                      ],
                    },
                    {
                      title: "Hari Libur / Istirahat",
                      rows: [
                        "5 hari kerja: Jam 1–8 = 2×, Jam 9 = 3×, Jam 10–12 = 4×",
                        "6 hari kerja: Jam 1–7 = 2×, Jam 8 = 3×, Jam 9–11 = 4×",
                      ],
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="p-5 rounded-2xl bg-white/5 border border-white/10"
                    >
                      <p className="font-bold text-[#C17A3A] text-sm mb-3">
                        {card.title}
                      </p>
                      <ul className="space-y-2">
                        {card.rows.map((row) => (
                          <li
                            key={row}
                            className="flex items-start gap-2 text-[#EDE0D0]/70 text-xs"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#9C4A2A] shrink-0 mt-0.5" />
                            <span>{row}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-3 px-5 py-4 bg-[#9C4A2A]/10 border border-[#9C4A2A]/20 rounded-2xl">
                  <Scale className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                  <p className="text-[#EDE0D0]/70 text-xs font-body leading-relaxed">
                    <strong className="text-white">Batas Jam Lembur:</strong>{" "}
                    Maksimal <strong>4 jam per hari</strong> dan{" "}
                    <strong>18 jam per minggu</strong> sesuai PP No. 35 Tahun
                    2021 Pasal 30. Kalkulator akan memberi peringatan jika batas
                    ini terlampaui.
                  </p>
                </div>
              </section>

              {/* Rumus */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <h3 className="text-2xl font-bold font-heading text-white">
                    Rumus Perhitungan
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-8 bg-[#1A0E07]/40 p-6 sm:p-10 rounded-[2.5rem] border border-[#7A5C42]/30">
                  <div className="space-y-6">
                    <ul className="space-y-4 font-body text-[#EDE0D0] text-sm">
                      {[
                        {
                          label: "Upah/Jam (ID):",
                          formula: "1/173 × (Gaji Pokok + Tunjangan Tetap)",
                        },
                        {
                          label: "Gaji Reguler:",
                          formula: "Jam Reguler × Tarif Per Jam",
                        },
                        {
                          label: "Gaji Lembur:",
                          formula: "Jam Lembur × (Tarif × Pengali)",
                        },
                        {
                          label: "Gaji Kotor:",
                          formula: "Reguler + Lembur + Bonus",
                        },
                        {
                          label: "Gaji Bersih:",
                          formula: "Kotor − (Pajak% × Kotor)",
                        },
                      ].map((item) => (
                        <li key={item.label} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                          <span>
                            <strong>{item.label}</strong> {item.formula}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="relative w-full max-w-[280px] aspect-square">
                      <div className="absolute inset-0 bg-[#9C4A2A] blur-[60px] opacity-20 animate-pulse" />
                      <div className="relative z-10 w-full h-full border-4 border-[#9C4A2A]/20 rounded-full flex flex-col items-center justify-center p-8 text-center bg-[#1A0E07]/40 backdrop-blur-xl">
                        <span className="text-3xl font-black font-heading text-[#C17A3A]">
                          1/173
                        </span>
                        <span className="text-xs font-bold text-white tracking-widest uppercase mt-2">
                          Faktor Upah/Jam
                        </span>
                        <p className="text-[10px] text-[#EDE0D0] opacity-60 mt-4 leading-relaxed italic">
                          "40 jam × 52 minggu ÷ 12 bulan ≈ 173 jam/bulan — PP
                          35/2021 Pasal 31"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Regulasi internasional */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <Globe className="w-6 h-6 text-[#C17A3A]" />
                  <h3 className="text-2xl font-bold font-heading text-white">
                    Regulasi Internasional
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      country: "🇮🇩 Indonesia",
                      rule: "PP No. 35 Tahun 2021: upah per jam = 1/173 × gaji. Lembur maks. 4 jam/hari & 18 jam/minggu.",
                    },
                    {
                      country: "🇺🇸 Amerika Serikat",
                      rule: "FLSA mengharuskan 1.5× untuk jam > 40/minggu bagi karyawan non-exempt.",
                    },
                    {
                      country: "🇪🇺 Uni Eropa",
                      rule: "Arahan Waktu Kerja membatasi jam kerja 48 jam/minggu. Tarif lembur ditentukan negara masing-masing.",
                    },
                    {
                      country: "🇦🇺 Australia",
                      rule: "Umumnya 1.5× untuk beberapa jam pertama, kemudian 2× setelahnya sesuai Modern Awards.",
                    },
                  ].map((item) => (
                    <div
                      key={item.country}
                      className="p-5 rounded-2xl bg-white/5 border border-white/10"
                    >
                      <p className="font-bold text-base text-white mb-2">
                        {item.country}
                      </p>
                      <p className="text-[#EDE0D0]/70 text-sm font-body leading-relaxed">
                        {item.rule}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <BookOpen className="w-6 h-6 text-[#C17A3A]" />
                  <h3 className="text-2xl font-bold font-heading text-white">
                    Pertanyaan Umum
                  </h3>
                </div>
                <div className="flex flex-col gap-4">
                  {[
                    {
                      q: "Mengapa angka 1/173 digunakan?",
                      a: "Angka 173 adalah estimasi jam kerja per bulan: 40 jam/minggu × 52 minggu / 12 bulan ≈ 173 jam. Ini adalah standar yang ditetapkan PP No. 35 Tahun 2021.",
                    },
                    {
                      q: "Berapa batas jam lembur di Indonesia?",
                      a: "Menurut PP No. 35 Tahun 2021 Pasal 30: maksimal 4 jam per hari dan 18 jam per minggu. Kalkulator ini memberi peringatan otomatis jika batas ini terlampaui.",
                    },
                    {
                      q: "Apa perbedaan mode Global vs Indonesia?",
                      a: "Mode Global menggunakan tarif per jam dan pengali yang Anda tentukan sendiri. Mode Indonesia menghitung upah per jam otomatis dari gaji bulanan (1/173), lalu menerapkan aturan multiplier PP 35/2021.",
                    },
                    {
                      q: "Apakah tunjangan tetap masuk perhitungan?",
                      a: "Ya, di mode Indonesia Anda bisa mengaktifkan tunjangan tetap. Ini akan digabungkan dengan gaji pokok sebelum dikalikan 1/173, sesuai ketentuan PP No. 35 Tahun 2021.",
                    },
                  ].map((item) => (
                    <div
                      key={item.q}
                      className="p-5 rounded-2xl bg-white/5 border border-white/10"
                    >
                      <p className="font-bold text-white text-sm mb-2">
                        {item.q}
                      </p>
                      <p className="text-[#EDE0D0]/70 text-sm font-body leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Disclaimer */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#9C4A2A]/10 border border-[#9C4A2A]/20">
                <Scale className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                <p className="text-[#EDE0D0]/70 text-xs font-body leading-relaxed">
                  <strong className="text-white">Disclaimer:</strong> Kalkulator
                  ini memberikan estimasi berdasarkan PP No. 35 Tahun 2021.
                  Perjanjian kerja perusahaan (PKB) dan peraturan daerah dapat
                  memengaruhi hasil akhir penggajian. Konsultasikan dengan HRD
                  atau konsultan hukum ketenagakerjaan untuk kepastian hukum.{" "}
                  <a
                    href="https://peraturan.bpk.go.id/Details/161904/pp-no-35-tahun-2021"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C17A3A] hover:underline"
                  >
                    Baca teks lengkap PP No. 35 Tahun 2021 →
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
