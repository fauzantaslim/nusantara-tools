'use client';

import React, { useState } from 'react';
import { Card } from '@/ui/Card';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import {
  calculateOneRM,
  OneRMResult,
  WeightUnit,
  FormulaType,
  OneRMInput,
} from '@/features/satu-rm/utils';
import {
  ArrowRight, ShieldAlert, Info, CheckCircle2, Dumbbell,
  RefreshCw, BarChart2, Target, Zap, Award, TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { RelatedHealthTools } from '../components/RelatedHealthTools';
import { Breadcrumbs } from '@/ui/Breadcrumbs';
import Image from 'next/image';

const oneRMSchema = z.object({
  weight: z.coerce.number().min(1, 'Berat harus lebih dari 0').max(1000, 'Berat terlalu besar'),
  reps: z.coerce.number().int().min(1, 'Minimal 1 repetisi').max(10, 'Maksimal 10 repetisi'),
});

const FORMULA_INFO: Record<FormulaType, { label: string; desc: string; best: string }> = {
  epley: {
    label: 'Epley',
    desc: 'Rumus paling populer dan serbaguna untuk sebagian besar pengguna.',
    best: 'Estimasi kekuatan umum',
  },
  brzycki: {
    label: 'Brzycki',
    desc: 'Dikenal akurat untuk set dengan repetisi rendah (1–6 reps).',
    best: 'Set repetisi rendah',
  },
  lombardi: {
    label: 'Lombardi',
    desc: 'Memperhitungkan set dengan repetisi lebih tinggi secara lebih proporsional.',
    best: 'Set repetisi tinggi',
  },
};

export default function OneRepMaxCalculator() {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [unit, setUnit] = useState<WeightUnit>('kg');
  const [outputUnit, setOutputUnit] = useState<WeightUnit>('kg');
  const [formula, setFormula] = useState<FormulaType>('epley');

  const [result, setResult] = useState<OneRMResult | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const parsed = oneRMSchema.parse({ weight, reps });

      const input: OneRMInput = {
        weight: parsed.weight,
        reps: parsed.reps,
        unit,
        outputUnit,
        formula,
      };

      setResult(calculateOneRM(input));
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0].message);
      } else {
        setError(err.message || 'Terjadi kesalahan saat menghitung 1RM.');
      }
      setResult(null);
    }
  };

  const handleReset = () => {
    setWeight('');
    setReps('');
    setResult(null);
    setError('');
  };

  // Re-calculate on formula change if result exists
  const handleFormulaChange = (f: FormulaType) => {
    setFormula(f);
    if (result && weight && reps) {
      try {
        const parsed = oneRMSchema.parse({ weight, reps });
        setResult(calculateOneRM({ weight: parsed.weight, reps: parsed.reps, unit, outputUnit, formula: f }));
      } catch {
        // silently ignore
      }
    }
  };

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs items={[
          { label: 'Kesehatan', href: '/kesehatan' },
          { label: 'Kalkulator 1RM' }
        ]} />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">Kalkulator One Rep Max (1RM)</h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">Estimasi Kekuatan Angkat Beban Maksimum Anda</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        {/* Left: Input Form */}
        <Card variant="default" className="lg:col-span-5 flex flex-col gap-8 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full h-full">
          <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
              <Dumbbell className="w-6 h-6 text-[#C17A3A]" />
              Data Latihan
            </h2>
            <p className="text-sm text-secondary font-body mt-2 leading-relaxed">Masukkan beban dan repetisi dari set terakhir Anda.</p>
          </div>

          <form onSubmit={handleCalculate} className="flex flex-col gap-6 relative z-10 h-full">
            <div className="space-y-6">

              {/* Input Unit Toggle */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold font-ui text-primary">Satuan Beban Input</label>
                <div className="bg-surface p-1.5 rounded-xl flex items-center">
                  {(['kg', 'lbs'] as WeightUnit[]).map(u => (
                    <button key={u} type="button" onClick={() => setUnit(u)} className={cn('flex-1 py-2 text-sm font-bold rounded-lg transition-all uppercase', unit === u ? 'bg-white text-primary shadow-sm' : 'text-secondary hover:text-primary')}>
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight & Reps */}
              <div className="flex gap-4">
                <Input
                  id="weight"
                  label="Berat Diangkat"
                  type="number"
                  placeholder="100"
                  suffix={unit}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="py-3 placeholder:opacity-40 rounded-xl"
                  required
                  min={1}
                />
                <Input
                  id="reps"
                  label="Repetisi"
                  type="number"
                  placeholder="5"
                  suffix="reps"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  className="py-3 placeholder:opacity-40 rounded-xl"
                  required
                  min={1}
                  max={10}
                />
              </div>

              {/* Output Unit Toggle */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold font-ui text-primary">Satuan Output Hasil</label>
                <div className="bg-surface p-1.5 rounded-xl flex items-center">
                  {(['kg', 'lbs'] as WeightUnit[]).map(u => (
                    <button key={u} type="button" onClick={() => setOutputUnit(u)} className={cn('flex-1 py-2 text-sm font-bold rounded-lg transition-all uppercase', outputUnit === u ? 'bg-white text-primary shadow-sm' : 'text-secondary hover:text-primary')}>
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              {/* Formula Selection */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold font-ui text-primary">Rumus Perhitungan</label>
                <div className="flex flex-col gap-2">
                  {(Object.keys(FORMULA_INFO) as FormulaType[]).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => handleFormulaChange(f)}
                      className={cn(
                        'flex items-center gap-4 p-3.5 rounded-xl border-2 text-left transition-all',
                        formula === f
                          ? 'border-[#C17A3A] bg-[#C17A3A]/8 text-[#C17A3A]'
                          : 'border-muted bg-white text-secondary hover:border-secondary/30'
                      )}
                    >
                      <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shrink-0 font-mono', formula === f ? 'bg-[#C17A3A]/15 text-[#C17A3A]' : 'bg-surface text-secondary')}>
                        {f === 'epley' ? 'E' : f === 'brzycki' ? 'B' : 'L'}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold font-ui text-primary truncate">{FORMULA_INFO[f].label}</div>
                        <div className="text-xs text-secondary opacity-80 truncate">{FORMULA_INFO[f].best}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-accent-3-light text-accent-3 text-sm px-4 py-3 rounded-2xl border border-accent-3/20 font-bold flex items-center gap-2 shadow-sm animate-in fade-in">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-auto">
              <Button type="button" variant="secondary" onClick={handleReset} className="py-4 px-5 rounded-2xl border border-muted shrink-0">
                <RefreshCw className="w-5 h-5" />
              </Button>
              <Button type="submit" variant="primary" className="py-4 text-base flex-1 shadow-lg hover:shadow-xl group rounded-2xl !bg-[#C17A3A] hover:!bg-[#a4622a] text-white outline-none ring-0">
                Hitung 1RM
                <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1.5 transition-transform" />
              </Button>
            </div>
          </form>
        </Card>

        {/* Right: Results */}
        <div className="lg:col-span-7 h-full">
          {result ? (
            <Card variant="default" className="flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl transition-all duration-700 h-full animate-in fade-in zoom-in-95 bg-[#2C1A0E] ring-4 ring-inset ring-[#C17A3A]/30 border-[#C17A3A]/30 text-[#FFF3E0]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C17A3A]/15 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

              <div className="relative z-10 p-6 sm:p-8 flex flex-col gap-6 h-full">

                {/* Main 1RM Result */}
                <div className="flex flex-col items-center text-center pt-2">
                  <div className="w-14 h-14 rounded-2xl bg-[#1A0E07] shadow-inner flex items-center justify-center mb-4 border border-[#C17A3A]/20">
                    <Award className="w-7 h-7 text-[#C17A3A]" />
                  </div>
                  <span className="text-xs font-bold text-[#C17A3A] tracking-widest uppercase mb-1 opacity-90 bg-[#C17A3A]/10 px-3 py-1 rounded-full">Estimasi One Rep Max · {result.formulaLabel}</span>
                  <div className="flex items-end justify-center gap-2 mt-4 mb-1">
                    <div className="text-[4.5rem] sm:text-[5.5rem] font-black font-heading tracking-tighter leading-none text-[#FFF3E0] drop-shadow-md">
                      {result.oneRM}
                    </div>
                    <span className="text-2xl font-bold pb-3 text-[#C17A3A] uppercase">{result.unit}</span>
                  </div>
                  <p className="text-xs text-[#EDE0D0] opacity-70 font-body">Perkiraan dihitung menggunakan rumus {result.formulaLabel}</p>
                </div>

                {/* Formula Comparison */}
                <div className="bg-[#1A0E07]/60 rounded-2xl border border-white/10 p-4 shadow-inner">
                  <h4 className="text-xs font-bold text-[#C17A3A] uppercase tracking-widest mb-3 flex items-center gap-2">
                    <BarChart2 className="w-4 h-4" /> Perbandingan Semua Rumus
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {result.comparisonResults.map((c) => (
                      <div key={c.formula} className={cn('flex flex-col items-center p-3 rounded-xl border transition-all', c.formula === result.formula ? 'bg-[#C17A3A]/20 border-[#C17A3A]/40' : 'bg-white/5 border-white/5')}>
                        <span className={cn('text-[10px] font-bold uppercase tracking-wider mb-1', c.formula === result.formula ? 'text-[#C17A3A]' : 'text-[#EDE0D0] opacity-60')}>{c.label}</span>
                        <span className="text-lg font-black text-white font-heading">{c.value}</span>
                        <span className="text-[10px] text-[#EDE0D0] opacity-50 uppercase">{result.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Percentage Table */}
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-[#C17A3A] uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" /> Tabel Persentase & Progam Latihan
                  </h4>
                  <div className="rounded-2xl overflow-hidden border border-white/10 shadow-inner">
                    <div className="grid grid-cols-3 bg-[#1A0E07]/80 px-4 py-2 border-b border-white/5">
                      <span className="text-[10px] font-bold text-[#C17A3A] uppercase tracking-wider">% 1RM</span>
                      <span className="text-[10px] font-bold text-[#EDE0D0] uppercase tracking-wider text-center">Repetisi</span>
                      <span className="text-[10px] font-bold text-[#EDE0D0] uppercase tracking-wider text-right">Beban ({result.unit})</span>
                    </div>
                    <div className="divide-y divide-white/5">
                      {result.percentageTable.map((row) => (
                        <div
                          key={row.percent}
                          className={cn('grid grid-cols-3 px-4 py-2.5 hover:bg-white/5 transition-colors', row.percent >= 85 && 'bg-[#C17A3A]/10')}
                        >
                          <span className={cn('text-sm font-bold font-mono', row.percent === 100 ? 'text-[#C17A3A]' : 'text-[#FFF3E0]')}>
                            {row.percent}%
                          </span>
                          <span className="text-sm text-[#EDE0D0] text-center opacity-80">{row.reps} rep{row.reps > 1 ? 's' : ''}</span>
                          <span className="text-sm font-bold text-white text-right">{row.weight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card variant="default" className="flex flex-col items-center justify-center text-center p-12 h-full min-h-[500px] border-dashed border-2 bg-[#2C1A0E] border-[#7A5C42]/40 rounded-[2.5rem] transition-all relative overflow-hidden shadow-2xl text-[#F5EDE3]">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

              <div className="relative z-10 w-full flex justify-center mt-4">
                <div className="absolute inset-0 bg-[#C17A3A] blur-[80px] rounded-full opacity-10" />
                <div className="relative z-10 w-full flex justify-center  mt-4">
                  <div className="absolute inset-0 bg-[#C17A3A] blur-[80px] rounded-full opacity-15" />
                  <Image src="/1rm.svg" alt="BMI Calculator Illustration" width={400} height={300} className="w-full max-w-[280px] sm:max-w-[340px] h-auto object-contain relative z-10 select-none pointer-events-none drop-shadow-2xl" priority />
                </div>
              </div>

              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-3 tracking-tight relative z-10 px-4">Kalkulator Siap Digunakan</h3>
              <p className="text-[#EDE0D0] font-body max-w-[280px] text-base leading-relaxed relative z-10 opacity-90 px-4">
                Masukkan beban dan repetisi dari set terakhir Anda untuk mendapatkan estimasi 1RM dan tabel rencana latihan.
              </p>
              <div className="flex gap-2 mt-8 flex-wrap justify-center relative z-10">
                {['Epley', 'Brzycki', 'Lombardi'].map(f => (
                  <span key={f} className="text-xs bg-[#C17A3A]/15 text-[#C17A3A] px-3 py-1.5 rounded-full font-bold border border-[#C17A3A]/20">{f}</span>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Informational Content Section */}
      <div className="mt-16 mb-24">
        <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30">

          {/* Background Decorators */}
          <div className="absolute inset-0 overflow-hidden rounded-[3rem] pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C17A3A] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4A7C59] rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/3" />
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
          </div>

          <div className="flex flex-col gap-16 lg:gap-24 relative z-10">

            {/* Header */}
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <span className="text-[#C17A3A] font-bold tracking-widest uppercase text-xs mb-4 block">
                Edukasi Kekuatan & Performa
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                Memahami One Rep Max (1RM)
              </h2>
              <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                One Rep Max adalah fondasi ilmiah dari semua program pelatihan kekuatan yang terstruktur. Dengan mengetahui 1RM Anda, setiap sesi latihan bisa diprogram secara presisi—bukan sekadar tebakan.
              </p>

              {/* Pull Quote */}
              <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm text-left shadow-inner">
                <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#C17A3A] shrink-0" />
                <div className="flex flex-col gap-3">
                  <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug">
                    Melakukan tes 1RM langsung bisa berisiko cedera, terutama tanpa spotter berpengalaman. Rumus estimasi matematis hadir sebagai solusi yang lebih aman dan dapat diandalkan.
                  </p>
                  <p className="text-sm text-[#EDE0D0] font-body opacity-80">
                    Kalkulator ini mendukung tiga rumus terpercaya—Epley, Brzycki, dan Lombardi—serta menyajikan tabel latihan persentase 1RM agar Anda bisa langsung merancang sesi pelatihan tanpa perlu menghitung manual.
                  </p>
                </div>
              </div>
            </div>

            {/* 1. Formula Breakdown */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">1</div>
                <h3 className="text-2xl font-bold font-heading text-white">Tiga Rumus yang Didukung</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Epley */}
                <div className="p-6 rounded-2xl bg-[#C17A3A]/10 border border-[#C17A3A]/30 hover:border-[#C17A3A]/50 transition-colors relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#C17A3A]/10 rounded-full blur-xl" />
                  <div className="relative mb-3">
                    <span className="text-xs font-bold text-[#FFF3E0] font-mono bg-[#C17A3A]/25 px-2.5 py-1 rounded-full">Epley</span>
                  </div>
                  <div className="bg-[#1A0E07]/60 rounded-xl px-3 py-2 mb-3 border border-[#C17A3A]/20">
                    <span className="font-mono text-sm text-[#FFF3E0] font-bold">1RM = W × (1 + r/30)</span>
                  </div>
                  <p className="text-[#FFF3E0]/80 text-sm font-body leading-relaxed">
                    Formula paling umum digunakan. Sangat serbaguna dan cocok sebagai referensi utama untuk berbagai jenis latihan dan level kemampuan.
                  </p>
                </div>

                {/* Brzycki */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors relative overflow-hidden">
                  <div className="relative mb-3">
                    <span className="text-xs font-bold text-[#EDE0D0] font-mono bg-white/10 px-2.5 py-1 rounded-full">Brzycki</span>
                  </div>
                  <div className="bg-[#1A0E07]/60 rounded-xl px-3 py-2 mb-3 border border-white/10">
                    <span className="font-mono text-sm text-[#F5EDE3] font-bold">1RM = W × 36/(37−r)</span>
                  </div>
                  <p className="text-[#EDE0D0]/80 text-sm font-body leading-relaxed">
                    Terbukti memberikan presisi lebih tinggi pada set dengan repetisi rendah (1–6). Ideal untuk powerlifter dan atlet kekuatan murni.
                  </p>
                </div>

                {/* Lombardi */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors relative overflow-hidden">
                  <div className="relative mb-3">
                    <span className="text-xs font-bold text-[#EDE0D0] font-mono bg-white/10 px-2.5 py-1 rounded-full">Lombardi</span>
                  </div>
                  <div className="bg-[#1A0E07]/60 rounded-xl px-3 py-2 mb-3 border border-white/10">
                    <span className="font-mono text-sm text-[#F5EDE3] font-bold">1RM = W × r^0.1</span>
                  </div>
                  <p className="text-[#EDE0D0]/80 text-sm font-body leading-relaxed">
                    Dirancang untuk memproyeksikan kekuatan pada set repetisi menengah hingga tinggi, di mana rumus lain cenderung over-estimasi.
                  </p>
                </div>
              </div>
            </section>

            {/* 2. Cara Menggunakan 1RM */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">2</div>
                <h3 className="text-2xl font-bold font-heading text-white">Cara Mengintegrasikan 1RM ke Program Latihan</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-start bg-[#1A0E07]/40 p-6 sm:p-10 rounded-[2.5rem] border border-[#7A5C42]/30 shadow-sm">
                <div>
                  <h5 className="font-bold text-xl text-white mb-5">Tabel Persentase sebagai Panduan</h5>
                  <p className="text-[#EDE0D0] font-body text-sm leading-relaxed mb-6 opacity-90">
                    Setelah Anda mengetahui estimasi 1RM, gunakan persentase berikut untuk merancang program yang terstruktur berdasarkan tujuan latihan Anda:
                  </p>
                  <ul className="space-y-4 font-body text-[#EDE0D0] text-sm">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                      <span><strong>85–100% 1RM (1–5 reps):</strong> Zona kekuatan murni. Melatih sistem saraf pusat dan rekrutmen motor unit.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                      <span><strong>70–85% 1RM (6–10 reps):</strong> Zona hipertrofi. Optimal untuk membangun volume dan massa otot.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#4A7C59] shrink-0 mt-0.5" />
                      <span><strong>60–70% 1RM (10–15 reps):</strong> Zona daya tahan otot. Tepat untuk mengembangkan kapasitas aerobik lokal.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#2C1A0E] p-5 rounded-2xl border border-white/10 shadow-inner">
                    <h5 className="font-bold text-sm text-[#C17A3A] uppercase tracking-widest mb-4">Tips Akurasi Hasil</h5>
                    <ul className="space-y-3 font-body text-[#F5EDE3] text-sm">
                      <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#C17A3A] mt-1.5 shrink-0"></div>Gunakan repetisi dalam rentang 1–10 untuk hasil paling akurat.</li>
                      <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#C17A3A] mt-1.5 shrink-0"></div>Pastikan teknik gerakan benar saat mengumpulkan data untuk kalkulator.</li>
                      <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#C17A3A] mt-1.5 shrink-0"></div>Pertimbangkan rata-rata dari beberapa rumus untuk estimasi yang lebih konservatif.</li>
                      <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#4A7C59] mt-1.5 shrink-0"></div>Akurasi formula menurun saat repetisi melebihi 10—hindari menginput data di atas batas itu.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Manfaat Melacak 1RM */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">3</div>
                <h3 className="text-2xl font-bold font-heading text-white">Mengapa Melacak 1RM Secara Berkala?</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <TrendingUp className="w-8 h-8 text-[#C17A3A] mb-4" />
                  <h4 className="font-bold text-white mb-2">Ukur Progres Nyata</h4>
                  <p className="text-[#EDE0D0]/80 text-sm font-body leading-relaxed">Perubahan 1RM dari waktu ke waktu adalah indikator terpercaya pertumbuhan kekuatan—lebih objektif dari perasaan atau tampilan fisik semata.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <Target className="w-8 h-8 text-[#4A7C59] mb-4" />
                  <h4 className="font-bold text-white mb-2">Program Lebih Terarah</h4>
                  <p className="text-[#EDE0D0]/80 text-sm font-body leading-relaxed">Tanpa data 1RM, pemilihan beban latihan cenderung subjektif. Dengan 1RM, setiap sesi bisa diprogramkan secara ilmiah berdasarkan persentase yang tepat.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <Zap className="w-8 h-8 text-[#9C4A2A] mb-4" />
                  <h4 className="font-bold text-white mb-2">Tetapkan Target Realistis</h4>
                  <p className="text-[#EDE0D0]/80 text-sm font-body leading-relaxed">Mengetahui baseline 1RM Anda saat ini memungkinkan penetapan target jangka pendek dan jangka panjang yang challengeable namun dapat dicapai.</p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="space-y-8 pt-8 border-t border-[#7A5C42]/30">
              <div className="flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold font-heading text-white mb-3">Pertanyaan Umum (FAQ)</h3>
                <p className="text-[#EDE0D0] font-body text-sm">Hal-hal yang sering ditanyakan tentang 1RM dan estimasinya.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full font-body">
                <div className="space-y-6">
                  <details className="group border-b border-[#7A5C42]/30 pb-4">
                    <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">Rumus mana yang paling akurat?</summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">Tidak ada rumus yang universal "terbaik" untuk semua orang. Epley cocok sebagai titik awal. Brzycki cenderung lebih presisi untuk repetisi rendah. Lombardi lebih stabil pada repetisi tinggi. Untuk hasil paling konservatif, bandingkan rata-rata ketiganya.</p>
                  </details>
                  <details className="group border-b border-[#7A5C42]/30 pb-4">
                    <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">Apakah 1RM sama untuk semua gerakan latihan?</summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">Tidak. 1RM bersifat spesifik per gerakan. 1RM bench press Anda akan sangat berbeda dari 1RM squat. Selalu hitung per latihan secara terpisah agar perencanaan program lebih akurat.</p>
                  </details>
                </div>
                <div className="space-y-6">
                  <details className="group border-b border-[#7A5C42]/30 pb-4">
                    <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">Seberapa sering saya harus mengukur 1RM?</summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">Untuk atlet natural, estimasi 1RM bisa di-update setiap 4–8 minggu—selaras dengan siklus deload atau akhir blok pelatihan. Jangan terlalu sering melakukan tes, karena overhead-nya tinggi bagi sistem saraf.</p>
                  </details>
                  <details className="group border-b border-[#7A5C42]/30 pb-4">
                    <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">Apakah hasil ini bisa menggantikan tes langsung?</summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">Kalkulator ini memberikan estimasi yang sangat berguna untuk perencanaan, namun bukan pengganti tes 1RM langsung. Hasil aktual Anda mungkin sedikit berbeda, tergantung faktor teknis, kondisi tubuh, dan pengalaman latihan.</p>
                  </details>
                </div>
              </div>
            </section>

            {/* CTA */}
            <div className="bg-[#1A0E07]/60 p-6 sm:p-8 rounded-[2rem] border border-[#C17A3A]/40 text-center max-w-3xl mx-auto shadow-inner mt-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#C17A3A]/5 pointer-events-none" />
              <h4 className="font-heading font-extrabold text-white text-xl mb-4 relative z-10">Bangun Program Latihan yang Lebih Cerdas</h4>
              <p className="text-[#EDE0D0] font-body text-sm leading-relaxed relative z-10">
                Kombinasikan data 1RM Anda dengan alat lainnya di NusantaraTools—Kalkulator Kalori untuk memastikan energi cukup, dan Kalkulator Air untuk pemulihan yang optimal. Kekuatan sejati dibangun di atas fondasi holistik.
              </p>
            </div>
          </div>
        </div>
      </div>

      <RelatedHealthTools currentPath="/kesehatan/1rm" />
    </div>
  );
}
