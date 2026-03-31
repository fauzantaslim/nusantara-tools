'use client';

import React, { useState } from 'react';
import { Card } from '@/ui/Card';
import { Button } from '@/ui/Button';
import {
  calculateSleepCycles,
  SleepResult,
  CalculationMode,
  TimeFormat,
  SleepInput,
} from '@/features/tidur/utils';
import {
  Moon, Sun, ArrowRight, ShieldAlert, Info, Clock, RefreshCw,
  BrainCircuit, CheckCircle2, Zap, Bed, Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { RelatedHealthTools } from '../components/RelatedHealthTools';
import { Breadcrumbs } from '@/ui/Breadcrumbs';
import Image from 'next/image';

const tidurSchema = z.object({
  targetTime: z.string().min(1, 'Waktu tidak boleh kosong'),
  latencyMinutes: z.coerce.number().min(1, 'Minimal 1 menit').max(60, 'Maksimal 60 menit'),
  cycleLengthMinutes: z.coerce.number().min(70, 'Minimal 70 menit').max(120, 'Maksimal 120 menit'),
});

const QUALITY_CONFIG = {
  Buruk: { bg: 'bg-[#9C4A2A]/15', border: 'border-[#9C4A2A]/30', text: 'text-[#FF8A65]', badge: 'bg-[#9C4A2A]/30 text-[#FF8A65]' },
  'Kurang Optimal': { bg: 'bg-[#C17A3A]/15', border: 'border-[#C17A3A]/30', text: 'text-[#C17A3A]', badge: 'bg-[#C17A3A]/30 text-[#C17A3A]' },
  Baik: { bg: 'bg-blue-900/20', border: 'border-blue-500/30', text: 'text-blue-300', badge: 'bg-blue-900/40 text-blue-300' },
  Ideal: { bg: 'bg-[#4A7C59]/15', border: 'border-[#4A7C59]/30', text: 'text-[#4A7C59]', badge: 'bg-[#4A7C59]/30 text-[#4A7C59]' },
};

export default function SleepCycleCalculator() {
  const [mode, setMode] = useState<CalculationMode>('wake_at');
  const [targetTime, setTargetTime] = useState('07:00');
  const [latencyMinutes, setLatencyMinutes] = useState('15');
  const [cycleLengthMinutes, setCycleLengthMinutes] = useState('90');
  const [timeFormat, setTimeFormat] = useState<TimeFormat>('24h');

  const [result, setResult] = useState<SleepResult | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const parsed = tidurSchema.parse({ targetTime, latencyMinutes, cycleLengthMinutes });

      const input: SleepInput = {
        mode,
        targetTime: parsed.targetTime,
        latencyMinutes: parsed.latencyMinutes,
        cycleLengthMinutes: parsed.cycleLengthMinutes,
        maxCycles: 6,
        timeFormat,
      };

      const res = calculateSleepCycles(input);
      setResult(res);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0].message);
      } else {
        setError(err.message || 'Terjadi kesalahan saat menghitung siklus tidur.');
      }
      setResult(null);
    }
  };

  const handleReset = () => {
    setTargetTime('07:00');
    setLatencyMinutes('15');
    setCycleLengthMinutes('90');
    setResult(null);
    setError('');
  };

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs items={[
          { label: 'Kesehatan', href: '/kesehatan' },
          { label: 'Kalkulator Siklus Tidur' }
        ]} />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">Kalkulator Siklus Tidur</h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">Temukan Waktu Tidur & Bangun Paling Optimal</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        {/* Left Side: Input Form */}
        <Card variant="default" className="lg:col-span-5 flex flex-col gap-8 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full h-full">
          <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
              <Moon className="w-6 h-6 text-[#4A7C59]" />
              Parameter Tidur
            </h2>
            <p className="text-sm text-secondary font-body mt-2 leading-relaxed">Pilih mode kalkulasi dan masukkan waktu target Anda.</p>
          </div>

          <form onSubmit={handleCalculate} className="flex flex-col gap-6 relative z-10 h-full">
            <div className="space-y-6">

              {/* Mode Selection */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold font-ui text-primary">Mode Kalkulasi</label>
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => { setMode('wake_at'); setResult(null); }}
                    className={cn(
                      'flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left',
                      mode === 'wake_at'
                        ? 'border-[#4A7C59] bg-[#4A7C59]/8 text-[#4A7C59]'
                        : 'border-muted bg-white text-secondary hover:border-secondary/30'
                    )}
                  >
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', mode === 'wake_at' ? 'bg-[#4A7C59]/10' : 'bg-surface')}>
                      <Sun className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold font-ui text-sm block">Saya ingin bangun jam...</span>
                      <span className="text-xs opacity-70">Hitung waktu harus mulai tidur</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setMode('sleep_at'); setResult(null); }}
                    className={cn(
                      'flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left',
                      mode === 'sleep_at'
                        ? 'border-[#4A7C59] bg-[#4A7C59]/8 text-[#4A7C59]'
                        : 'border-muted bg-white text-secondary hover:border-secondary/30'
                    )}
                  >
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', mode === 'sleep_at' ? 'bg-[#4A7C59]/10' : 'bg-surface')}>
                      <Moon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold font-ui text-sm block">Saya berencana tidur jam...</span>
                      <span className="text-xs opacity-70">Hitung rekomendasi jam bangun</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Time Input */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold font-ui text-primary">
                  {mode === 'wake_at' ? 'Jam Bangun yang Diinginkan' : 'Jam Rencana Tidur'}
                </label>
                <div className="relative flex items-center border-2 border-muted bg-white rounded-2xl shadow-sm h-14 focus-within:border-[#4A7C59] focus-within:ring-2 focus-within:ring-[#4A7C59]/20 overflow-hidden transition-all">
                  <div className="pl-4 pr-2 flex items-center">
                    {mode === 'wake_at' ? <Sun className="w-5 h-5 text-[#C17A3A]" /> : <Moon className="w-5 h-5 text-[#4A7C59]" />}
                  </div>
                  <input
                    type="time"
                    value={targetTime}
                    onChange={(e) => setTargetTime(e.target.value)}
                    required
                    className="flex-1 h-full bg-transparent px-2 text-lg font-black text-primary outline-none font-heading tracking-tight"
                  />
                </div>
              </div>

              {/* Time Format Toggle */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold font-ui text-primary">Format Waktu Output</label>
                <div className="bg-surface p-1.5 rounded-xl flex items-center">
                  <button type="button" onClick={() => setTimeFormat('24h')} className={cn('flex-1 py-2 text-sm font-bold rounded-lg transition-all', timeFormat === '24h' ? 'bg-white text-primary shadow-sm' : 'text-secondary hover:text-primary')}>
                    24 Jam
                  </button>
                  <button type="button" onClick={() => setTimeFormat('12h')} className={cn('flex-1 py-2 text-sm font-bold rounded-lg transition-all', timeFormat === '12h' ? 'bg-white text-primary shadow-sm' : 'text-secondary hover:text-primary')}>
                    12 Jam (AM/PM)
                  </button>
                </div>
              </div>

              {/* Advanced Options */}
              <details className="group [&_summary::-webkit-details-marker]:hidden bg-surface rounded-2xl border border-muted/50 overflow-hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-primary font-bold hover:bg-white/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#C17A3A]" />
                    <span className="text-sm font-medium">Pengaturan Lanjutan (Opsional)</span>
                  </div>
                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </summary>
                <div className="px-4 pb-5 space-y-4 border-t border-muted/30 pt-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold font-ui text-secondary">Waktu Butuh Tertidur (menit)</label>
                    <div className="relative flex items-center border border-muted bg-white rounded-xl h-10 focus-within:ring-2 focus-within:ring-[#4A7C59]/40 overflow-hidden transition-colors shadow-sm">
                      <input type="number" min="1" max="60" value={latencyMinutes} onChange={(e) => setLatencyMinutes(e.target.value)} className="flex-1 h-full bg-transparent px-3 text-sm font-bold text-primary outline-none" />
                      <span className="pr-3 text-xs text-secondary font-bold select-none opacity-50">mnt (default: 15)</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold font-ui text-secondary">Durasi Satu Siklus (menit)</label>
                    <div className="relative flex items-center border border-muted bg-white rounded-xl h-10 focus-within:ring-2 focus-within:ring-[#4A7C59]/40 overflow-hidden transition-colors shadow-sm">
                      <input type="number" min="70" max="120" value={cycleLengthMinutes} onChange={(e) => setCycleLengthMinutes(e.target.value)} className="flex-1 h-full bg-transparent px-3 text-sm font-bold text-primary outline-none" />
                      <span className="pr-3 text-xs text-secondary font-bold select-none opacity-50">mnt (default: 90)</span>
                    </div>
                  </div>
                </div>
              </details>

              {error && (
                <div className="bg-accent-3-light text-accent-3 text-sm px-4 py-3 rounded-2xl border border-accent-3/20 font-bold flex items-center gap-2 shadow-sm animate-in fade-in">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-auto">
              <Button type="button" variant="secondary" onClick={handleReset} className="py-4 px-5 rounded-2xl border border-muted shrink-0 hover:border-secondary/30">
                <RefreshCw className="w-5 h-5" />
              </Button>
              <Button type="submit" variant="primary" className="py-4 text-base flex-1 shadow-lg hover:shadow-xl group rounded-2xl !bg-[#4A7C59] hover:!bg-[#3a6346] text-white outline-none ring-0">
                {mode === 'wake_at' ? 'Hitung Waktu Tidur' : 'Hitung Waktu Bangun'}
                <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1.5 transition-transform" />
              </Button>
            </div>
          </form>
        </Card>

        {/* Right Side: Result Display */}
        <div className="lg:col-span-7 h-full">
          {result ? (
            <Card variant="default" className="flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl transition-all duration-700 h-full animate-in fade-in zoom-in-95 bg-[#2C1A0E] ring-4 ring-inset ring-[#4A7C59]/30 border-[#4A7C59]/30 text-[#E8F5E9]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A7C59]/15 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

              <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col gap-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#4A7C59] tracking-widest uppercase opacity-80 block mb-1">
                      {result.mode === 'wake_at' ? 'Bangun jam' : 'Tidur jam'} {result.inputTime}
                    </span>
                    <h3 className="text-lg font-extrabold font-heading text-white">
                      {result.mode === 'wake_at' ? 'Rekomendasi Waktu Tidur' : 'Rekomendasi Waktu Bangun'}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-[#1A0E07] border border-[#4A7C59]/20 flex items-center justify-center shadow-inner">
                    {result.mode === 'wake_at' ? <Moon className="w-5 h-5 text-[#4A7C59]" /> : <Sun className="w-5 h-5 text-[#C17A3A]" />}
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-[#EDE0D0]/70 font-body leading-relaxed bg-white/5 rounded-xl px-3 py-2 border border-white/5">
                  {result.mode === 'wake_at'
                    ? `Jika ingin bangun jam ${result.inputTime}, berikut waktu terbaik untuk mulai tidur malam ini:`
                    : `Jika tidur jam ${result.inputTime}, berikut estimasi waktu bangun yang optimal:`}
                </p>

                {/* Cycle Results List */}
                <div className="flex flex-col gap-3 flex-1">
                  {result.results.map((item) => {
                    const qc = QUALITY_CONFIG[item.quality];
                    return (
                      <div
                        key={item.cycles}
                        className={cn(
                          'relative flex items-center gap-4 p-4 rounded-2xl border transition-all group',
                          qc.bg, qc.border,
                          item.isHighlighted && 'ring-1 ring-inset ring-[#4A7C59]/20'
                        )}
                      >
                        {item.isHighlighted && (
                          <div className="absolute top-2 right-3">
                            <Star className="w-3.5 h-3.5 text-[#4A7C59] fill-[#4A7C59]" />
                          </div>
                        )}

                        {/* Time Display */}
                        <div className="flex flex-col items-center justify-center w-20 shrink-0">
                          <span className="font-black font-heading text-xl text-white tracking-tight leading-none">
                            {item.displayTime}
                          </span>
                          <span className="text-[10px] text-[#EDE0D0] opacity-60 mt-0.5 font-mono">
                            {item.cycles === 1 ? '1 siklus' : `${item.cycles} siklus`}
                          </span>
                        </div>

                        {/* Divider */}
                        <div className="w-px h-10 bg-white/10 shrink-0" />

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={cn('text-[11px] font-bold px-2 py-0.5 rounded-full', qc.badge)}>
                              {item.quality}
                            </span>
                            <span className="text-xs text-[#EDE0D0] opacity-70 font-mono">
                              {item.totalHours} jam tidur
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="bg-[#1A0E07]/60 rounded-2xl px-4 py-3 border border-white/5 flex items-start gap-2 shadow-inner">
                  <Info className="w-4 h-4 text-[#C17A3A] shrink-0 mt-0.5" />
                  <p className="text-[11px] text-[#EDE0D0] font-body leading-relaxed opacity-90">
                    <span className="text-[#4A7C59] font-bold">★ Direkomendasikan:</span> 5–6 siklus (7,5–9 jam) adalah rentang tidur paling ideal. Bangun di akhir siklus membantu Anda merasa lebih segar dan terhindar dari <em>sleep inertia</em>.
                  </p>
                </div>
              </div>
            </Card>
          ) : (
            <Card variant="default" className="flex flex-col items-center justify-center text-center p-12 h-full min-h-[500px] border-dashed border-2 bg-[#2C1A0E] border-[#7A5C42]/40 rounded-[2.5rem] transition-all relative overflow-hidden shadow-2xl text-[#F5EDE3]">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

              <div className="relative z-10">
                <div className="absolute inset-0 bg-[#4A7C59] blur-[80px] rounded-full opacity-10" />
                <div className="relative z-10 w-full flex justify-center  mt-4">
                  <div className="absolute inset-0 bg-[#C17A3A] blur-[80px] rounded-full opacity-15" />
                  <Image src="/tidur.svg" alt="BMI Calculator Illustration" width={400} height={300} className="w-full max-w-[280px] sm:max-w-[340px] h-auto object-contain relative z-10 select-none pointer-events-none drop-shadow-2xl" priority />
                </div>
              </div>

              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-3 tracking-tight relative z-10 px-4">Siap Untuk Mulai?</h3>
              <p className="text-[#EDE0D0] font-body max-w-[280px] text-base leading-relaxed relative z-10 opacity-90 px-4">
                Pilih mode kalkulasi, masukkan waktu Anda, lalu lihat rekomendasinya di sini.
              </p>
              <div className="flex gap-3 mt-8 flex-wrap justify-center relative z-10">
                {['5 Siklus = 7.5 Jam', '6 Siklus = 9 Jam'].map(t => (
                  <span key={t} className="text-xs bg-[#4A7C59]/20 text-[#4A7C59] px-3 py-1.5 rounded-full font-bold border border-[#4A7C59]/20">{t}</span>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Informational Content Section */}
      <div className="mt-16 mb-24">
        <div className="relative">
          <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30">

            {/* Background Decorators */}
            <div className="absolute inset-0 overflow-hidden rounded-[3rem] pointer-events-none">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4A7C59] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C17A3A] rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/3" />
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
            </div>

            <div className="flex flex-col gap-16 lg:gap-24 relative z-10">

              {/* Header Section */}
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                <span className="text-[#4A7C59] font-bold tracking-widest uppercase text-xs mb-4 block">
                  Edukasi Kesehatan & Istirahat
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                  Memahami Siklus Tidur Anda
                </h2>
                <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                  Tidur bukan sekadar periode tanpa kesadaran—ia adalah proses kompleks yang terstruktur dalam siklus berulang, masing-masing berlangsung sekitar 90 menit, di mana otak dan tubuh Anda menjalani pemulihan mendalam yang tidak bisa digantikan.
                </p>

                {/* Pull Quote */}
                <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm mx-auto text-left shadow-inner">
                  <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#4A7C59] shrink-0" />
                  <div className="flex flex-col gap-3">
                    <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug">
                      Rahasia tidur yang menyegarkan bukan hanya tentang <em>berapa lama</em> Anda tidur, melainkan <em>kapan</em> Anda bangun dalam konteks siklus alami tubuh Anda.
                    </p>
                    <p className="text-sm text-[#EDE0D0] font-body opacity-80">
                      Kalkulator ini menggunakan prinsip siklus 90 menit ditambah jeda waktu tertidur (latency) standar 15 menit untuk memproyeksikan waktu bangun atau tidur yang paling optimal dari data yang Anda masukkan.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-16 mx-auto w-full">

                {/* 1. Tahap Siklus Tidur */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#4A7C59] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">1</div>
                    <h3 className="text-2xl font-bold font-heading text-white">Tahapan dalam Setiap Siklus Tidur</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold bg-white/10 text-[#EDE0D0] px-2.5 py-1 rounded-full font-mono">N1</span>
                        <h4 className="text-lg font-bold font-heading text-white">Tidur Ringan Awal</h4>
                      </div>
                      <p className="text-[#EDE0D0]/80 font-body text-sm leading-relaxed">
                        Fase transisi antara terjaga dan tidur. Ini adalah jendela paling tipis—stimulus kecil sekalipun dapat membangunkan Anda dengan mudah dari tahap ini.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold bg-white/10 text-[#EDE0D0] px-2.5 py-1 rounded-full font-mono">N2</span>
                        <h4 className="text-lg font-bold font-heading text-white">Tidur Ringan Dominan</h4>
                      </div>
                      <p className="text-[#EDE0D0]/80 font-body text-sm leading-relaxed">
                        Sekitar 50% dari total waktu tidur Anda dihabiskan di sini. Detak jantung melambat, suhu tubuh menurun, dan sistem saraf mulai mengkonsolidasi memori jangka pendek.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#4A7C59]/10 border border-[#4A7C59]/30 hover:border-[#4A7C59]/50 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold bg-[#4A7C59]/30 text-[#E8F5E9] px-2.5 py-1 rounded-full font-mono">N3</span>
                        <h4 className="text-lg font-bold font-heading text-[#E8F5E9]">Tidur Dalam (Delta)</h4>
                      </div>
                      <p className="text-[#E8F5E9]/80 font-body text-sm leading-relaxed">
                        Fase paling restoratif. Selama N3, jaringan otot diperbaiki, hormon pertumbuhan dilepaskan, dan sistem imun diperkuat. Membangunkan seseorang dari sini menyebabkan <em>sleep inertia</em> terparah.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#C17A3A]/10 border border-[#C17A3A]/30 hover:border-[#C17A3A]/50 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold bg-[#C17A3A]/30 text-[#FFF3E0] px-2.5 py-1 rounded-full font-mono">REM</span>
                        <h4 className="text-lg font-bold font-heading text-[#FFF3E0]">Tidur REM (Mimpi)</h4>
                      </div>
                      <p className="text-[#FFF3E0]/80 font-body text-sm leading-relaxed">
                        <em>Rapid Eye Movement</em>. Otak aktif hampir seperti saat terjaga; mimpi terjadi di sini. Ini adalah fase vital untuk konsolidasi memori jangka panjang, regulasi emosi, dan kapasitas belajar.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 2. Mengapa Siklus Tidur Penting */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#4A7C59] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">2</div>
                    <h3 className="text-2xl font-bold font-heading text-white">Fenomena Inersia Tidur & Cara Menghindarinya</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 items-center bg-[#1A0E07]/40 p-6 sm:p-10 rounded-[2.5rem] border border-[#7A5C42]/30 shadow-sm">
                    <div>
                      <h5 className="font-bold text-xl text-white mb-5">Apa itu Sleep Inertia?</h5>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed mb-6 opacity-90">
                        Pernahkah Anda bangun dalam keadaan sangat mengantuk, bahkan setelah tidur berjam-jam? Itulah <strong>sleep inertia</strong>—kondisi grogi, lelah mendalam, dan kesulitan berkonsentrasi yang disebabkan oleh bangun di tengah-tengah siklus tidur, terutama saat fase N3.
                      </p>
                      <ul className="space-y-4 font-body text-[#EDE0D0] text-sm">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#4A7C59] shrink-0 mt-0.5" />
                          <span>Bangun di <strong>akhir siklus</strong> (saat tidur ringan) meminimalkan perasaan ini secara signifikan.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#4A7C59] shrink-0 mt-0.5" />
                          <span><strong>5–6 siklus</strong> (7,5–9 jam) adalah rentang yang disarankan untuk orang dewasa sehat.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                          <span>Ingat bahwa <strong>durasi siklus bervariasi</strong> antar individu (70–120 menit). Kalkulator ini menggunakan estimasi rata-rata 90 menit.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-[#2C1A0E] p-5 rounded-2xl border border-white/10 shadow-inner">
                        <h5 className="font-bold text-sm text-[#4A7C59] uppercase tracking-widest mb-4">Cara Kalkulator Ini Bekerja</h5>
                        <div className="space-y-3 font-body text-sm">
                          <div className="flex gap-3 items-start">
                            <div className="w-6 h-6 rounded-full bg-[#4A7C59]/20 text-[#4A7C59] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
                            <span className="text-[#EDE0D0]">Ambil waktu tidur/bangun yang Anda masukkan.</span>
                          </div>
                          <div className="flex gap-3 items-start">
                            <div className="w-6 h-6 rounded-full bg-[#4A7C59]/20 text-[#4A7C59] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
                            <span className="text-[#EDE0D0]">Tambahkan waktu jeda tertidur (default 15 menit).</span>
                          </div>
                          <div className="flex gap-3 items-start">
                            <div className="w-6 h-6 rounded-full bg-[#4A7C59]/20 text-[#4A7C59] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
                            <span className="text-[#EDE0D0]">Hitung inkremen 90 menit per siklus secara berulang hingga 6 siklus.</span>
                          </div>
                          <div className="flex gap-3 items-start">
                            <div className="w-6 h-6 rounded-full bg-[#4A7C59]/20 text-[#4A7C59] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</div>
                            <span className="text-[#EDE0D0]">Tampilkan saran waktu yang paling selaras dengan siklus alami tidur Anda.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 3. Variasi Individu & Tips */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#4A7C59] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">3</div>
                    <h3 className="text-2xl font-bold font-heading text-white">Variasi Individual & Tips Tidur Berkualitas</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <BrainCircuit className="w-8 h-8 text-[#4A7C59] mb-4" />
                      <h4 className="font-bold text-white mb-2">Setiap Orang Berbeda</h4>
                      <p className="text-[#EDE0D0]/80 text-sm font-body leading-relaxed">Durasi siklus tidur bervariasi antara 70–120 menit tergantung usia, genetik, dan kondisi kesehatan. Gunakan hasil ini sebagai panduan awal, bukan patokan mutlak.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <Bed className="w-8 h-8 text-[#C17A3A] mb-4" />
                      <h4 className="font-bold text-white mb-2">Konsistensi Itu Kunci</h4>
                      <p className="text-[#EDE0D0]/80 text-sm font-body leading-relaxed">Tidur dan bangun pada jam yang sama setiap hari—bahkan di akhir pekan—membantu ritme sirkadian Anda berfungsi lebih efisien dan stabil.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <Zap className="w-8 h-8 text-[#9C4A2A] mb-4" />
                      <h4 className="font-bold text-white mb-2">Hindari Kafein & Layar</h4>
                      <p className="text-[#EDE0D0]/80 text-sm font-body leading-relaxed">Kafein dan paparan cahaya biru dari layar perangkat dapat memperlambat produksi melatonin, mendorong waktu tertidur jauh lebih lama dari 15 menit normal.</p>
                    </div>
                  </div>
                </section>

                {/* FAQ */}
                <section className="space-y-8 pt-8 border-t border-[#7A5C42]/30">
                  <div className="flex flex-col items-center text-center">
                    <h3 className="text-2xl font-bold font-heading text-white mb-3">Pertanyaan Umum (FAQ)</h3>
                    <p className="text-[#EDE0D0] font-body text-sm">Hal-hal yang sering ditanyakan tentang tidur dan siklus tidur.</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full font-body">
                    <div className="space-y-6">
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#4A7C59] transition">Berapa banyak siklus tidur yang ideal?</summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">Rata-rata orang dewasa membutuhkan 4–6 siklus tidur yang lengkap, setara dengan 6–9 jam istirahat. Rekomendasi terbaik ada di angka 5–6 siklus (7,5–9 jam) untuk bangun dalam kondisi segar dan bugar.</p>
                      </details>
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#4A7C59] transition">Kenapa kalkulator ini menambahkan 15 menit?</summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">Rata-rata orang membutuhkan waktu sekitar 10–20 menit untuk benar-benar tertidur setelah berbaring. Kalkulator menambahkan 15 menit (dapat disesuaikan) sebagai estimasi waktu jeda ini agar hasil lebih akurat.</p>
                      </details>
                    </div>
                    <div className="space-y-6">
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">Bisakah digunakan untuk tidur siang?</summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">Tentu! Sederhananya, masukkan jam mulai tidur siang. Untuk power nap, targetkan 1–2 siklus (90–180 menit). Tidur siang lebih dari 2 siklus berisiko membuat Anda merasa lebih lelah saat bangun dan mengganggu tidur malam.</p>
                      </details>
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">Apakah ini bisa menggantikan nasihat dokter?</summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">Tidak. Kalkulator ini adalah alat bantu estimasi berbasis pola rata-rata populasi. Jika Anda mengalami gangguan tidur kronik seperti insomnia atau sleep apnea, konsultasikan dengan tenaga medis profesional.</p>
                      </details>
                    </div>
                  </div>
                </section>

                {/* CTA Box */}
                <div className="bg-[#1A0E07]/60 p-6 sm:p-8 rounded-[2rem] border border-[#4A7C59]/40 text-center max-w-3xl mx-auto shadow-inner mt-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#4A7C59]/5 pointer-events-none" />
                  <h4 className="font-heading font-extrabold text-white text-xl mb-4 relative z-10">Tidur Lebih Baik, Hidup Lebih Baik</h4>
                  <p className="text-[#EDE0D0] font-body text-sm leading-relaxed mb-6 block relative z-10">
                    Kualitas tidur berkaitan langsung dengan kesehatan metabolik, emosional, dan fisik Anda. Gunakan kalkulator ini bersama alat kesehatan lainnya di NusantaraTools—seperti Kalkulator Kalori dan Kalkulator Air—untuk membangun rutinitas kesehatan harian yang menyeluruh.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedHealthTools currentPath="/kesehatan/tidur" />
    </div>
  );
}
