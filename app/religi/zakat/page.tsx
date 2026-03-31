'use client';

import React, { useState } from 'react';
import { Card } from '@/ui/Card';
import { Button } from '@/ui/Button';
import {
  calculateZakat, ZakatInput, ZakatResult,
  CalculationMode, NISAB_MONTH, NISAB_YEAR
} from '@/features/zakat/utils';
import {
  ArrowRight, ShieldAlert, Info, RefreshCw, Calculator,
  Wallet, CheckCircle2, AlertTriangle, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Breadcrumbs } from '@/ui/Breadcrumbs';
import { RelatedReligiTools } from '../components/RelatedReligiTools';

// Helper Format Rupiah
function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// Komponen Input Mata Uang
function CurrencyInput({
  label, value, onChange, placeholder, desc
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; desc?: string;
}) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Hanya ambil angka
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    onChange(rawValue);
  };

  const displayValue = value ? new Intl.NumberFormat('id-ID').format(Number(value)) : '';

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <label className="text-xs font-bold font-ui text-secondary uppercase tracking-wider">{label}</label>
      </div>
      <div className="relative flex items-center border-2 border-muted rounded-xl h-14 focus-within:border-[#C17A3A] focus-within:ring-2 focus-within:ring-[#C17A3A]/20 overflow-hidden transition-all shadow-sm bg-white">
        <span className="pl-4 pr-2 text-sm font-bold text-secondary opacity-60">Rp</span>
        <input
          type="text"
          inputMode="numeric"
          placeholder={placeholder}
          value={displayValue}
          onChange={handleInput}
          className="flex-1 h-full bg-transparent pr-4 text-xl sm:text-2xl font-black text-primary outline-none font-heading"
        />
      </div>
      {desc && <span className="text-[11px] font-body text-secondary mt-1">{desc}</span>}
    </div>
  );
}

export default function KalkulatorZakat() {
  const [mode, setMode] = useState<CalculationMode>('monthly');
  const [income, setIncome] = useState('');
  const [additional, setAdditional] = useState('');
  const [result, setResult] = useState<ZakatResult | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const numIncome = Number(income) || 0;
    const numAdditional = Number(additional) || 0;

    if (numIncome === 0 && numAdditional === 0) {
      return setError('Masukkan nilai pendapatan Anda terlebih dahulu.');
    }

    const input: ZakatInput = {
      income: numIncome,
      additional: numAdditional,
      mode
    };

    setResult(calculateZakat(input));
  };

  const handleReset = () => {
    setIncome('');
    setAdditional('');
    setResult(null);
    setError('');
  };

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs items={[{ label: 'Religi', href: '#' }, { label: 'Kalkulator Zakat Pendapatan' }]} />
        <div className="mt-2 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">Kalkulator Zakat Pendapatan</h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-2 max-w-2xl">Hitung kewajiban zakat penghasilan atau profesi sesuai standar nisab BAZNAS 2026 secara akurat.</p>
        </div>
      </div>

      {/* Kalkulator Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">

        {/* Kiri: Form Input */}
        <Card variant="default" className="lg:col-span-5 flex flex-col gap-6 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-[#4A7C59]/[0.02] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full h-full">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#E8F5E9] rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
              <Calculator className="w-6 h-6 text-[#4A7C59]" /> Form Perhitungan
            </h2>
            <p className="text-sm text-secondary font-body mt-2">Masukkan perkiraan penghasilan bruto (kotor) Anda tanpa dikurangi rincian pengeluaran pokok.</p>
          </div>

          <form onSubmit={handleCalculate} className="flex flex-col gap-6 relative z-10 h-full mt-2">

            {/* Mode Pemilihan */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold font-ui text-secondary uppercase tracking-wider">Periode Perhitungan</label>
              <div className="flex gap-2">
                {[
                  { value: 'monthly', label: 'Bulanan' },
                  { value: 'yearly', label: 'Tahunan' }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setMode(opt.value as CalculationMode)}
                    className={cn(
                      'flex-1 py-3 text-sm font-bold rounded-xl border-2 transition-all font-ui',
                      mode === opt.value
                        ? 'border-[#C17A3A] bg-[#FFF3E0] text-[#9C4A2A] shadow-sm'
                        : 'border-muted bg-white text-secondary hover:border-[#7A5C42]/40'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-muted/60 w-full my-1" />

            {/* Input Nilai */}
            <CurrencyInput
              label={mode === 'monthly' ? 'Gaji & Penghasilan Rutin / Bulan' : 'Gaji & Penghasilan Rutin / Tahun'}
              placeholder="0"
              value={income}
              onChange={setIncome}
              desc="Gaji, honorarium, upah, jasa, dan pendapatan rutin lainnya."
            />

            <CurrencyInput
              label={mode === 'monthly' ? 'Penghasilan Tambahan (Bulan Ini)' : 'Penghasilan Tambahan (Tahun Ini)'}
              placeholder="0"
              value={additional}
              onChange={setAdditional}
              desc="Opsional. Bonus bulanan/tahunan, THR, bagi hasil, atau tunjangan lainnya."
            />

            {error && (
              <div className="bg-[#FFF0EB] text-[#9C4A2A] text-sm px-4 py-3 rounded-2xl border border-[#9C4A2A]/20 font-bold flex items-center gap-2 animate-in fade-in">
                <ShieldAlert className="w-4 h-4 shrink-0" />{error}
              </div>
            )}

            <div className="flex gap-3 mt-auto pt-4">
              <Button type="button" variant="secondary" onClick={handleReset} className="py-4 px-5 rounded-2xl border border-muted shrink-0 shadow-sm border-b-4 hover:translate-y-[2px] hover:border-b-2 active:border-b-0 active:translate-y-[4px] transition-all">
                <RefreshCw className="w-5 h-5 text-secondary" />
              </Button>
              <Button type="submit" variant="primary" className="py-4 text-base flex-1 rounded-2xl !bg-[#C17A3A] hover:!bg-[#9C4A2A] text-[#FFF8F0] outline-none ring-0 border-b-4 border-[#7A5C42] hover:translate-y-[2px] hover:border-b-2 active:border-b-0 active:translate-y-[4px] shadow-sm transition-all group font-ui">
                Hitung Zakat<ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1.5 transition-transform" />
              </Button>
            </div>
          </form>
        </Card>

        {/* Kanan: Result Panel */}
        <div className="lg:col-span-7 h-full">
          {result ? (
            <Card variant="default" className={cn(
              'flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl animate-in fade-in zoom-in-95 bg-[#2C1A0E] text-[#F5EDE3] h-full ring-4 ring-inset',
              result.isWajib ? 'border-[#4A7C59]/60 ring-[#4A7C59]/20' : 'border-[#EDE0D0] ring-transparent'
            )}>
              <div className={cn(
                'absolute inset-0 bg-gradient-to-br pointer-events-none opacity-60',
                result.isWajib ? 'from-[#4A7C59]/10 via-transparent to-transparent' : 'from-surface/5 via-transparent to-transparent'
              )} />
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

              <div className="relative z-10 p-6 sm:p-10 flex flex-col h-full">
                {/* Header Status */}
                <div className="flex flex-col items-center text-center">
                  <div className={cn('px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider mb-6 flex items-center gap-2',
                    result.isWajib ? 'bg-[#4A7C59]/20 border-[#4A7C59]/40 text-[#4A7C59]' : 'bg-[#1A0E07]/60 border-white/20 text-[#EDE0D0]'
                  )}>
                    {result.isWajib ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Info className="w-3.5 h-3.5" />}
                    {result.isWajib ? 'Wajib Zakat (Mencapai Nisab)' : 'Belum Wajib Zakat'}
                  </div>

                  <span className="text-[#EDE0D0] opacity-80 font-body text-sm mb-2">{result.isWajib ? 'Kewajiban Zakat (2,5%) :' : 'Pendapatan belum mencapai batas nisab'}</span>
                  <div className="text-[3rem] sm:text-[4rem] font-black font-heading tracking-tight leading-none text-white overflow-x-auto w-full mb-8">
                    {formatRupiah(result.zakatAmount)}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-auto">
                  <div className="bg-[#1A0E07]/60 rounded-2xl p-5 border border-white/10 flex flex-col gap-2">
                    <span className="text-xs font-bold text-[#EDE0D0] opacity-60 uppercase tracking-widest flex items-center gap-1.5"><Wallet className="w-3.5 h-3.5" /> Total Pendapatan</span>
                    <span className="font-heading font-extrabold text-xl text-white">{formatRupiah(result.totalIncome)}</span>
                    <span className="text-[10px] text-[#EDE0D0] opacity-50 font-body uppercase">{mode === 'monthly' ? 'Per Bulan' : 'Per Tahun'}</span>
                  </div>
                  <div className="bg-[#1A0E07]/60 rounded-2xl p-5 border border-white/10 flex flex-col gap-2">
                    <span className="text-xs font-bold text-[#EDE0D0] opacity-60 uppercase tracking-widest flex items-center gap-1.5"><Info className="w-3.5 h-3.5" /> Batas Nisab BAZNAS</span>
                    <span className="font-heading font-extrabold text-xl text-white">{formatRupiah(result.nisab)}</span>
                    <span className="text-[10px] text-[#EDE0D0] opacity-50 font-body uppercase">{mode === 'monthly' ? 'Per Bulan' : 'Per Tahun (2026)'}</span>
                  </div>
                </div>

                {/* Insight Note */}
                <div className={cn("mt-6 rounded-2xl p-4 border text-sm font-body leading-relaxed flex gap-3",
                  result.isWajib ? 'bg-[#C17A3A]/15 border-[#C17A3A]/30 text-[#F5EDE3]' : 'bg-surface/5 border-white/10 text-[#EDE0D0] opacity-80'
                )}>
                  <Info className="w-5 h-5 shrink-0 mt-0.5 opacity-80" />
                  <p>
                    {result.isWajib
                      ? `Penghasilan bruto Anda telah melebihi ambang batas nisab saat ini sebesar ${formatRupiah(result.nisab)}. Anda diwajibkan menyisihkan 2,5% hak mustahik dari penghasilan yang diperoleh.`
                      : `Karena penghasilan total Anda (${formatRupiah(result.totalIncome)}) masih di bawah ambang nisab BAZNAS (${formatRupiah(result.nisab)}), Anda tidak diwajibkan untuk menunaikan zakat profesi/penghasilan, namun sangat dianjurkan untuk memperbanyak infak/sedekah.`}
                  </p>
                </div>
              </div>
            </Card>
          ) : (
            <Card variant="default" className="flex flex-col items-center justify-center text-center p-12 h-full min-h-[500px] border-dashed border-2 bg-[#2C1A0E] border-[#7A5C42]/40 rounded-[2.5rem] relative overflow-hidden shadow-2xl text-[#F5EDE3]">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative w-32 h-32 flex items-center justify-center mb-6 mt-4">
                  <div className="absolute inset-0 rounded-full border-2 border-[#C17A3A]/25 animate-pulse" />
                  <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" viewBox="0 0 400 500" >
                    <rect width="100%" height="100%" fill="#F5EDE3" />

                    <path d="M50 80 Q200 10 350 80 V480 Q200 450 50 480 Z" fill="#EDE0D0" opacity="0.3" />

                    <rect x="25" y="60" width="350" height="420" rx="15" fill="#EDE0D0" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />

                    <text x="200" y="40" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="20" fill="#2C1A0E">KALKULATOR ZAKAT MAL</text>

                    <g transform="translate(45, 100)">

                      <g transform="translate(0, 50)">
                        <path d="M10 20 H70 A10 10 0 0 1 80 30 V70 A10 10 0 0 1 70 80 H10 A10 10 0 0 1 0 70 V30 A10 10 0 0 1 10 20 Z" fill="#7A5C42" />
                        <rect x="15" y="30" width="50" height="40" rx="5" fill="#2C1A0E" opacity="0.1" />
                        <circle cx="25" cy="40" r="3" fill="#C17A3A" />
                        <circle cx="35" cy="40" r="3" fill="#C17A3A" />
                        <circle cx="45" cy="40" r="3" fill="#C17A3A" />

                        <text x="40" y="100" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="12" fill="#2C1A0E">TOTAL HARTA</text>

                        <path d="M75 25 Q80 15 85 25 Q80 35 75 25 Z" fill="#4A7C59" transform="rotate(-15 80 25)" />
                      </g>

                      <g transform="translate(85, 50)">
                        <path d="M0 50 Q80 0 145 35" fill="none" stroke="#C17A3A" stroke-width="3" stroke-dasharray="5,5" />
                        <polygon points="145 35 138 30 142 41" fill="#C17A3A" />
                      </g>

                      <g transform="translate(230, 50)">
                        <circle cx="0" cy="50" r="45" fill="#F5EDE3" stroke="#EDE0D0" stroke-width="2" />

                        <text x="0" y="45" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#2C1A0E">JUMLAH ZAKAT</text>

                        <text x="0" y="65" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="18" fill="#2C1A0E">Rp 2.500.000</text>

                        <path d="M30 30 A10 10 0 0 0 40 40 Q35 35 30 30 Z" fill="#2C1A0E" opacity="0.1" />
                      </g>

                      <g transform="translate(275, 50)">
                        <path d="M0 35 Q60 60 145 50" fill="none" stroke="#C17A3A" stroke-width="3" stroke-dasharray="5,5" />
                        <polygon points="145 50 138 56 142 45" fill="#C17A3A" />
                      </g>

                      <g transform="translate(420, 50)">
                        <path d="M0 30 V70 Q0 80 10 80 H60 Q70 80 70 70 V30 Z" fill="#4A7C59" />
                        <rect x="15" y="20" width="40" height="10" rx="2" fill="#2C1A0E" opacity="0.1" />

                        <circle cx="35" cy="50" r="10" fill="#C17A3A" stroke="#2C1A0E" stroke-width="1" />
                        <circle cx="35" cy="50" r="6" fill="#EDE0D0" />
                        <text x="35" y="53" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="8" fill="#2C1A0E">Z</text>

                        <text x="35" y="100" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="12" fill="#4A7C59">ZAKAT ANDA</text>

                        <path d="M10 40 Q15 35 20 40 T30 40 Q25 45 20 40 T10 40 Z" fill="#EDE0D0" opacity="0.3" />
                      </g>

                    </g>

                    <g transform="translate(200, 420)">
                      <rect x="-100" y="-20" width="200" height="40" rx="20" fill="#4A7C59" />
                      <text x="0" y="5" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="14" fill="#F5EDE3">HITUNG ZAKAT</text>
                    </g>

                    <circle cx="50" cy="420" r="4" fill="#C17A3A" opacity="0.6" />
                    <circle cx="350" cy="120" r="4" fill="#7A5C42" opacity="0.6" />
                    <path d="M200 450 L205 455 L200 460 Z" fill="#9C4A2A" opacity="0.5" />
                  </svg>
                </div>
                <h3 className="font-heading font-extrabold text-2xl text-white mb-3 tracking-tight">Menunggu Data</h3>
                <p className="text-[#EDE0D0] font-body max-w-[280px] text-base leading-relaxed opacity-90">
                  Isi formulir nilai penghasilan di samping untuk mengetahui besaran wajib zakat Anda sesuai BAZNAS.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Edukasi BAZNAS */}
      <div className="mt-8 mb-24">
        <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4A7C59] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C17A3A] rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/3" />
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
          </div>

          <div className="flex flex-col gap-16 relative z-10 w-full">
            {/* Header Edu */}
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <span className="text-[#C17A3A] font-bold tracking-widest uppercase text-xs mb-4 block">Edukasi & Referensi Resmi</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">Pedoman Zakat Pendapatan</h2>
              <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-8 opacity-90 max-w-3xl">
                Berdasarkan Keputusan Pimpinan Pusat BAZNAS (Badan Amil Zakat Nasional) RI Nomor 15 Tahun 2026 yang mengatur penyesuaian nilai nisab menggunakan standarisasi emas murni.
              </p>
              <a href="https://drive.google.com/file/d/1WIrLaVEfqIokuDBf5g7NIdsXUGpuAz6F/view" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mb-10 px-5 py-3 rounded-xl border border-[#4A7C59]/40 text-[#4A7C59] font-bold text-sm bg-[#4A7C59]/10 hover:bg-[#4A7C59]/20 transition-all shadow-sm group font-ui w-fit">
                Baca PDF Resmi SK BAZNAS No. 15 Tahun 2026 <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </a>

              <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col items-start gap-4 backdrop-blur-sm text-left shadow-inner w-full">
                <div className="flex items-center gap-3 w-full border-b border-[#7A5C42]/30 pb-4 mb-2">
                  <div className="bg-[#4A7C59]/20 p-2 rounded-lg"><Info className="w-6 h-6 text-[#4A7C59] shrink-0" /></div>
                  <h3 className="font-heading font-bold text-xl text-white">Rincian Keputusan BAZNAS 2026</h3>
                </div>
                <ul className="text-[#EDE0D0] font-body text-sm sm:text-base leading-relaxed space-y-4 w-full">
                  <li className="flex gap-3"><span className="text-[#C17A3A] font-black mt-0.5">•</span> <div><strong>Standar Harga Emas:</strong> Nilai nisab tetap berdasarkan kepada 85 gram emas (kadar 14 karat atau 58,33%-62,49%), menggunakan rata-rata harga pasar tahun sebelumnya (2025).</div></li>
                  <li className="flex gap-3"><span className="text-[#C17A3A] font-black mt-0.5">•</span> <div><strong>Nilai Konversi Nisab:</strong> Ditetapkan batas wajib nisab setara <strong>Rp 91.681.728,- per tahun</strong> atau <strong>Rp 7.640.144,- per bulan</strong>.</div></li>
                  <li className="flex gap-3"><span className="text-[#C17A3A] font-black mt-0.5">•</span> <div><strong>Kadar Potongan Zakat:</strong> Sebesar <strong>2,5% (dua koma lima persen)</strong> khusus untuk zakat dari komoditas pendapatan dan jasa.</div></li>
                  <li className="flex gap-3"><span className="text-[#C17A3A] font-black mt-0.5">•</span> <div><strong>Obyek Zakat (Bruto):</strong> Zakat dikeluarkan secara matematis dari <strong>total penghasilan kotor (bruto)</strong>. Penunaiannya dilakukan seketika pendapatan tersebut diterima.</div></li>
                </ul>
              </div>
            </div>

            {/* Main Content Sections */}
            <div className="flex flex-col gap-16 mx-auto w-full border-t border-[#7A5C42]/30 pt-16">

              {/* 1. Tentang Zakat & Konsep Utama */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">1</div>
                  <h3 className="text-2xl font-bold font-heading text-white">Tentang Zakat & Konsep Utama</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center">
                    <h4 className="text-xl font-bold font-heading text-white mb-3">Apa Itu Zakat?</h4>
                    <p className="text-[#EDE0D0] font-body text-sm sm:text-base leading-relaxed opacity-90">
                      Zakat adalah salah satu dari lima rukun Islam dan merujuk pada kewajiban bagi umat Muslim untuk memberikan sebagian dari kekayaan mereka kepada yang membutuhkan. Ini adalah bentuk ibadah wajib yang bertujuan untuk membersihkan harta, membantu yang kurang beruntung, dan berkontribusi pada kesejahteraan masyarakat luas.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="p-5 rounded-2xl bg-[#4A7C59]/10 border border-[#4A7C59]/30">
                      <h4 className="font-heading font-bold text-white mb-1 tracking-wide">Nisab</h4>
                      <p className="text-[#EDE0D0] text-sm opacity-90 leading-relaxed">Jumlah minimum kekayaan yang wajib dimiliki selama setahun (biasanya setara 87,48 gram emas atau 612,36 gram perak).</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-[#C17A3A]/10 border border-[#C17A3A]/30">
                      <h4 className="font-heading font-bold text-white mb-1 tracking-wide">Hawl & Tingkat Pembayaran</h4>
                      <p className="text-[#EDE0D0] text-sm opacity-90 leading-relaxed">Hawl adalah kepemilikan aset selama satu tahun lunar penuh. Tingkat standar wajib Zakat umumnya adalah menggunakan rumus: <strong>Jumlah Zakat × 2.5%</strong>.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. Aset */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">2</div>
                  <h3 className="text-2xl font-bold font-heading text-white">Kriteria Aset & Pengecualian</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Aset Wajib */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#4A7C59]/30">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-[#4A7C59]/20 flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-[#4A7C59]" /></div>
                      <h4 className="text-xl font-bold font-heading text-white">Aset Terkena Zakat</h4>
                    </div>
                    <ul className="space-y-3 text-[#EDE0D0] font-body text-sm opacity-90">
                      <li className="flex gap-3 items-start"><span className="text-[#4A7C59] font-black mt-0.5">•</span> Emas dan perak (termasuk perhiasan investasi)</li>
                      <li className="flex gap-3 items-start"><span className="text-[#4A7C59] font-black mt-0.5">•</span> Uang tunai, dan saldo tabungan</li>
                      <li className="flex gap-3 items-start"><span className="text-[#4A7C59] font-black mt-0.5">•</span> Saham, obligasi, dan portofolio investasi</li>
                      <li className="flex gap-3 items-start"><span className="text-[#4A7C59] font-black mt-0.5">•</span> Inventaris barang dagangan bisnis untuk dijual</li>
                      <li className="flex gap-3 items-start"><span className="text-[#4A7C59] font-black mt-0.5">•</span> Pendapatan sewa (setelah disisihkan biaya pengeluaran)</li>
                      <li className="flex gap-3 items-start"><span className="text-[#4A7C59] font-black mt-0.5">•</span> Produksi pertanian dan ternak (berlaku tingkat ketentuan khusus)</li>
                    </ul>
                  </div>

                  {/* Aset Bebas */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-white/20 relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><ShieldAlert className="w-5 h-5 text-white/70" /></div>
                      <h4 className="text-xl font-bold font-heading text-white">Dikecualikan Dari Zakat</h4>
                    </div>
                    <ul className="space-y-3 text-[#EDE0D0] font-body text-sm opacity-90">
                      <li className="flex gap-3 items-start"><span className="text-white/50 font-black mt-0.5">•</span> Barang pribadi yang digunakan sehari-hari (rumah tinggal, mobil, pakaian)</li>
                      <li className="flex gap-3 items-start"><span className="text-white/50 font-black mt-0.5">•</span> Alat dan peralatan berat yang digunakan untuk mencari nafkah</li>
                      <li className="flex gap-3 items-start"><span className="text-white/50 font-black mt-0.5">•</span> Hutang jatuh tempo dan pengeluaran primer wajib yang diperlukan</li>
                      <li className="flex gap-3 items-start"><span className="text-white/50 font-black mt-0.5">•</span> Aset atau barang simpanan yang total nilainya di bawah ambang nisab</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 3. Golongan Penerima */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">3</div>
                  <h3 className="text-2xl font-bold font-heading text-white">Delapan Golongan Penerima Zakat</h3>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 text-[#EDE0D0]">
                  <p className="mb-6 text-sm sm:text-base leading-relaxed opacity-90">Berdasarkan ketetapan Q.S. At-Taubah (ayat 60), Zakat didistribusikan kepada delapan kategori pihak yang berhak menerima (Asnaf):</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {['Orang miskin (Al-Fuqara)', 'Orang membutuhkan (Al-Masakin)', 'Pengelola Zakat (Amil)', 'Hatinya didamaikan (Muallaf)', 'Terikat budak tawanan (Riqab)', 'Yang terlilit utang (Gharimin)', 'Di jalan Allah (Fisabilillah)', 'Musafir terdampar (Ibnu Sabil)'].map((col, idx) => (
                      <div key={idx} className="bg-white/5 rounded-xl px-4 py-3 text-sm font-bold font-heading border border-white/5">
                        {idx + 1}. {col}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* 4. Fitur & FAQ */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">4</div>
                  <h3 className="text-2xl font-bold font-heading text-white">Pertanyaan Umum (FAQ) & Manfaat Kalkulator</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Kalkulator */}
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-[#C17A3A]/10 border border-[#C17A3A]/20">
                      <h4 className="font-heading font-bold text-white mb-2 text-lg">Bagaimana Cara Kerja Kalkulator</h4>
                      <ul className="space-y-3 text-[#EDE0D0] font-body text-sm opacity-90 mt-4">
                        <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0" /> <div><strong>Input Disesuaikan:</strong> Memasukkan nilai aset dan otomatis menghilangkan kebutuhan komputasi manual.</div></li>
                        <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0" /> <div><strong>Pemotongan Dinamis:</strong> Hasil akurat menggunakan tarif standar 2,5% dan disajikan melalui wawasan visual yang nyaman dibaca.</div></li>
                      </ul>
                    </div>
                    <div className="p-6 rounded-2xl bg-[#4A7C59]/10 border border-[#4A7C59]/20">
                      <h4 className="font-heading font-bold text-white mb-2 text-lg">Manfaat Membayar Zakat</h4>
                      <ul className="space-y-3 text-[#EDE0D0] font-body text-sm opacity-90 mt-4">
                        <li className="flex gap-2"><span>1.</span> <strong>Pemurnian Spiritual:</strong> Membersihkan kekayaan dan memurnikan hati dari sifat keserakahan.</li>
                        <li className="flex gap-2"><span>2.</span> <strong>Kesejahteraan Sosial:</strong> Mendukung kelompok tak beruntung dan mengurangi ketidaksetaraan ekonomi.</li>
                        <li className="flex gap-2"><span>3.</span> <strong>Pertumbuhan Komunitas:</strong> Merajut ikatan bermasyarakat yang lebih kuat dan ikhlas berbagi.</li>
                      </ul>
                    </div>
                  </div>

                  {/* FAQ */}
                  <div className="flex flex-col gap-4">
                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors">
                      <h4 className="font-bold text-white mb-1">Kapan Saya Harus Membayar Zakat?</h4>
                      <p className="text-sm text-[#EDE0D0] opacity-80 leading-relaxed">Zakat jatuh tempo setiap tahun dan harus dibayar seketika setelah kekayaan Anda melebihi ambang batas Nisab dan mutlak dimiliki selama satu tahun lunar penuh.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors">
                      <h4 className="font-bold text-white mb-1">Apa Saja Pengurangan yang Valid?</h4>
                      <p className="text-sm text-[#EDE0D0] opacity-80 leading-relaxed">Kewajiban seperti utang darurat dan pengeluaran primer wajib yang sangat diperlukan dapat dikonversikan sebagai faktor pengurang sebelum menghitung target Zakat.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors">
                      <h4 className="font-bold text-white mb-1">Apa yang Terjadi Jika Di Bawah Nisab?</h4>
                      <p className="text-sm text-[#EDE0D0] opacity-80 leading-relaxed">Jika total kekayaan Anda ternyata berada secara mutlak di bawah Nisab, Anda tidak diwajibkan syariah untuk mengeluarkan Zakat pendapatan tersebut.</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Disclaimer */}
            <div className="bg-[#1A0E07]/60 p-6 sm:p-8 rounded-[2rem] border border-[#9C4A2A]/40 text-center max-w-3xl mx-auto shadow-inner relative overflow-hidden mt-4">
              <AlertTriangle className="w-6 h-6 text-[#9C4A2A] mx-auto mb-3" />
              <h4 className="font-heading font-extrabold text-[#FFF0EB] text-lg mb-3">Disclaimer & Keterbatasan Kalkulasi</h4>
              <p className="text-[#EDE0D0] font-body text-sm leading-relaxed">
                NusantaraTools Kalkulator Zakat memfasilitasi rumus simulasi perhitungan murni sesuai angka keputusan BAZNAS dan tidak melayani transaksi resmi (bukan amil). Nilai rupiah nisab ini dapat berubah/dievaluasi oleh institusi berwenang pada kalender Hijriyah tahun berikutnya. Kami merekomendasikan Anda membayarkannya kepada lembaga amil zakat seperti LAZ/BAZNAS.
              </p>
            </div>
          </div>
        </div>
      </div>

      <RelatedReligiTools currentPath="/religi/zakat" />
    </div>
  );
}
