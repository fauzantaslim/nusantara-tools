'use client';

import React, { useState } from 'react';
import { Card } from '@/ui/Card';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import Link from 'next/link';
import {
  ArrowLeft, Calendar, CalendarHeart, ShieldAlert,
  Activity, Info, Baby, Stethoscope, CheckCircle2, Clock, HeartPulse
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PregnancyInput, PregnancyResult, PregnancyMethod, calculatePregnancy } from '@/features/kehamilan/utils';
import { RelatedHealthTools } from '../components/RelatedHealthTools';
import { Breadcrumbs } from '@/ui/Breadcrumbs';
import Image from 'next/image';

export default function PregnancyCalculator() {
  const [method, setMethod] = useState<PregnancyMethod>('LMP');
  const [dateStr, setDateStr] = useState('');
  const [cycleLength, setCycleLength] = useState('28');
  const [embryoAge, setEmbryoAge] = useState('3');
  const [ultrasoundWeeks, setUltrasoundWeeks] = useState('');
  const [ultrasoundDays, setUltrasoundDays] = useState('0');

  const [result, setResult] = useState<PregnancyResult | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!dateStr) {
      setError('Silakan pilih tanggal terlebih dahulu.');
      return;
    }

    try {
      const input: PregnancyInput = {
        method,
        dateStr,
        cycleLength: method === 'LMP' ? parseInt(cycleLength, 10) : undefined,
        embryoAge: method === 'IVF' ? parseInt(embryoAge, 10) : undefined,
        ultrasoundWeeks: method === 'ULTRASOUND' ? parseInt(ultrasoundWeeks, 10) : undefined,
        ultrasoundDays: method === 'ULTRASOUND' ? parseInt(ultrasoundDays, 10) : undefined,
      };

      const res = calculatePregnancy(input);
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat menghitung kehamilan');
      setResult(null);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const renderProgressBar = (progressSegment: number) => {
    return (
      <div className="w-full mt-6 mb-4 bg-[#1A0E07]/60 p-5 rounded-[2rem] border border-white/5 shadow-inner backdrop-blur-md">
        <h4 className="text-left font-bold text-white font-heading mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#C17A3A]" />
          Progres Kehamilan
        </h4>
        <div className="relative w-full pt-4 pb-2">
          {/* Marker */}
          <div
            className="absolute top-0 w-1 bg-white z-20 transition-all duration-1000 ease-out h-[calc(100%-8px)] shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            style={{ left: `calc(${progressSegment}% - 2px)` }}
          >
            <div className="absolute top-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[#2C1A0E] bg-white shadow-md flex items-center justify-center">
              <Baby className="w-2.5 h-2.5 text-[#2C1A0E]" />
            </div>
          </div>

          {/* The Bar */}
          <div className="h-10 rounded-xl flex overflow-hidden w-full relative z-10 shadow-inner opacity-90 ring-1 ring-inset ring-white/10">
            <div className="h-full bg-white/20 flex items-center justify-center border-r border-[#2C1A0E]/40 transition-all" style={{ width: '33.3%' }}>
              <span className="text-[10px] font-bold text-white px-1 leading-tight text-center hidden sm:block opacity-80">Trimester 1</span>
            </div>
            <div className="h-full bg-[#4A7C59]/80 flex items-center justify-center border-r border-[#2C1A0E]/40 transition-all" style={{ width: '33.3%' }}>
              <span className="text-[10px] sm:text-xs font-bold text-white px-1">Trimester 2</span>
            </div>
            <div className="h-full bg-[#C17A3A]/80 flex items-center justify-center transition-all" style={{ width: '33.4%' }}>
              <span className="text-[10px] font-bold text-white px-1 leading-tight text-center hidden sm:block">Trimester 3</span>
            </div>
          </div>

          {/* Labels below */}
          <div className="relative w-full h-6 mt-3 text-[11px] font-bold text-[#EDE0D0] font-mono opacity-60">
            <span className="absolute left-0 -translate-x-1/2">0</span>
            <span className="absolute left-[33.3%] -translate-x-1/2">Tri 1</span>
            <span className="absolute left-[66.6%] -translate-x-1/2">Tri 2</span>
            <span className="absolute right-0 translate-x-1/2">EDD</span>
          </div>
        </div>
      </div>
    );
  };

  const getMethodLabel = (m: PregnancyMethod) => {
    switch (m) {
      case 'LMP': return 'Hari Pertama Haid Terakhir';
      case 'CONCEPTION': return 'Tanggal Konsepsi';
      case 'IVF': return 'Transfer IVF';
      case 'DUEDATE': return 'Tanggal Jatuh Tempo';
      case 'ULTRASOUND': return 'Tanggal USG';
    }
  };

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header Bar */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs items={[
          { label: 'Kesehatan', href: '/kesehatan' },
          { label: 'Kalkulator Kehamilan' }
        ]} />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">Kalkulator Kehamilan</h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">Estimasi milestones dan tanggal perkiraan lahir bayi Anda</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        {/* Left Side: Input Form */}
        <Card variant="default" className="lg:col-span-5 flex flex-col gap-8 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full h-full">
          <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-2xl font-bold font-heading text-primary">Data Kehamilan</h2>
            <p className="text-sm text-secondary font-body mt-2 leading-relaxed">Pilih metode perhitungan yang paling sesuai untuk Anda.</p>
          </div>

          <form onSubmit={handleCalculate} className="flex flex-col gap-6 relative z-10 h-full">
            <div className="space-y-6">

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold font-ui text-primary">Metode Perhitungan</label>
                <div className="relative">
                  <select
                    value={method}
                    onChange={(e) => {
                      setMethod(e.target.value as PregnancyMethod);
                      setDateStr('');
                      setError('');
                    }}
                    className="w-full flex h-14 rounded-xl border bg-white px-4 py-3 text-[15px] transition-colors border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1 text-primary font-ui font-medium appearance-none"
                  >
                    <option value="LMP">Hari Pertama Haid Terakhir (HPHT)</option>
                    <option value="CONCEPTION">Tanggal Konsepsi</option>
                    <option value="IVF">Tanggal Transfer IVF</option>
                    <option value="ULTRASOUND">Tanggal USG</option>
                    <option value="DUEDATE">Tanggal Jatuh Tempo (EDD)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                    <svg className="h-4 w-4 text-secondary opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Date Input */}
              <Input
                id="date"
                label={getMethodLabel(method)}
                type="date"
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
                className="text-lg py-4 rounded-xl"
                required
              />

              {/* Conditional Inputs based on Method */}
              {method === 'LMP' && (
                <Input
                  id="cycleLength"
                  label="Rata-rata Panjang Siklus"
                  type="number"
                  placeholder="Misal: 28"
                  suffix="Hari"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(e.target.value)}
                  className="text-lg py-4 placeholder:opacity-40 rounded-xl"
                  required
                  min={20}
                  max={45}
                />
              )}

              {method === 'IVF' && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold font-ui text-primary">Usia Embrio</label>
                  <div className="relative">
                    <select
                      value={embryoAge}
                      onChange={(e) => setEmbryoAge(e.target.value)}
                      className="w-full flex h-14 rounded-xl border bg-white px-4 py-3 text-[15px] transition-colors border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1 text-primary font-ui font-medium appearance-none"
                    >
                      <option value="3">3 Hari</option>
                      <option value="5">5 Hari</option>
                      <option value="6">6 Hari</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                      <svg className="h-4 w-4 text-secondary opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {method === 'ULTRASOUND' && (
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    id="ultrasoundWeeks"
                    label="Usia (Minggu)"
                    type="number"
                    placeholder="Minggu"
                    value={ultrasoundWeeks}
                    onChange={(e) => setUltrasoundWeeks(e.target.value)}
                    className="text-lg py-4 placeholder:opacity-40 rounded-xl"
                    required
                    min={0}
                    max={42}
                  />
                  <Input
                    id="ultrasoundDays"
                    label="Usia (Hari)"
                    type="number"
                    placeholder="Hari"
                    value={ultrasoundDays}
                    onChange={(e) => setUltrasoundDays(e.target.value)}
                    className="text-lg py-4 placeholder:opacity-40 rounded-xl"
                    required
                    min={0}
                    max={6}
                  />
                </div>
              )}

              {error && (
                <div className="bg-accent-3-light text-accent-3 text-sm px-4 py-3 rounded-2xl border border-accent-3/20 font-bold flex items-center gap-2 shadow-sm">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}
            </div>

            <Button type="submit" variant="primary" className="py-5 text-lg mt-auto shadow-lg hover:shadow-xl group rounded-2xl w-full">
              Hitung Kehamilan
              <ArrowLeft className="w-5 h-5 inline-block ml-2 group-hover:-translate-x-1.5 transition-transform rotate-180" />
            </Button>
          </form>
        </Card>

        {/* Right Side: Result Display */}
        <div className="lg:col-span-7 h-full">
          {result ? (
            <Card variant="default" className="flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl transition-all duration-700 h-full animate-in fade-in zoom-in-95 bg-[#2C1A0E] border-[#4A7C59]/30 ring-4 ring-inset ring-[#4A7C59]/30">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A7C59]/20 via-transparent to-transparent pointer-events-none transition-colors" />

              <div className="relative z-10 flex flex-col p-8 sm:p-12 h-full">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] bg-[#1A0E07] shadow-inner flex items-center justify-center mb-6 border border-white/10 self-center">
                  <Baby className="w-8 h-8 sm:w-10 sm:h-10 text-[#4A7C59]" />
                </div>

                <h3 className="text-sm font-bold text-[#EDE0D0] tracking-widest uppercase mb-2 opacity-80 text-center">Tanggal Perkiraan Lahir (EDD)</h3>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tighter leading-none mb-4 text-center drop-shadow-md text-[#E8F5E9]">
                  {formatDate(result.edd)}
                </div>

                <div className="px-6 py-2 rounded-full font-bold text-sm border shadow-sm mb-6 tracking-widest text-center self-center bg-[#1A0E07] border-[#4A7C59]/30 text-[#4A7C59]">
                  {result.trimester === 1 ? 'Trimester Pertama' : result.trimester === 2 ? 'Trimester Kedua' : 'Trimester Ketiga'}
                </div>

                <div className="grid grid-cols-2 gap-4 w-full mb-2">
                  <div className="bg-[#1A0E07]/40 border border-white/5 p-4 rounded-2xl flex flex-col items-center text-center shadow-inner hover:bg-[#1A0E07]/60 transition-colors">
                    <Clock className="w-5 h-5 text-[#C17A3A] mb-2 opacity-80" />
                    <span className="text-[11px] font-bold text-[#EDE0D0] uppercase tracking-wider mb-1 opacity-70">Minggu Saat Ini</span>
                    <span className="text-sm sm:text-base font-black text-white font-heading tracking-tight">{result.currentWeeks} minggu, {result.currentDays} hari</span>
                  </div>
                  <div className="bg-[#1A0E07]/40 border border-white/5 p-4 rounded-2xl flex flex-col items-center text-center shadow-inner hover:bg-[#1A0E07]/60 transition-colors">
                    <CalendarHeart className="w-5 h-5 text-[#4A7C59] mb-2 opacity-80" />
                    <span className="text-[11px] font-bold text-[#EDE0D0] uppercase tracking-wider mb-1 opacity-70">Tanggal Konsepsi</span>
                    <span className="text-sm sm:text-base font-black text-white font-heading tracking-tight">{formatDate(result.conceptionDate)}</span>
                  </div>
                </div>

                {renderProgressBar(result.progressPercent)}

                {/* Milestones */}
                <div className="mt-4 pt-6 border-t border-white/10 w-full flex-grow">
                  <h4 className="text-xl font-bold font-heading text-white mb-6">Tanggal Penting & Tonggak Sejarah</h4>
                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">

                    <div className="flex flex-col gap-1 border-l-2 border-[#4A7C59] pl-3 py-1">
                      <span className="text-xs text-[#EDE0D0] font-bold uppercase tracking-wider opacity-80">Trimester Pertama</span>
                      <span className="text-sm text-white font-medium">{formatDate(result.milestones.tri1Start)} - {formatDate(result.milestones.tri1End)}</span>
                    </div>
                    <div className="flex flex-col gap-1 border-l-2 border-[#4A7C59] pl-3 py-1">
                      <span className="text-xs text-[#EDE0D0] font-bold uppercase tracking-wider opacity-80">Trimester Kedua</span>
                      <span className="text-sm text-white font-medium">{formatDate(result.milestones.tri2Start)} - {formatDate(result.milestones.tri2End)}</span>
                    </div>
                    <div className="flex flex-col gap-1 border-l-2 border-[#4A7C59] pl-3 py-1">
                      <span className="text-xs text-[#EDE0D0] font-bold uppercase tracking-wider opacity-80">Trimester Ketiga</span>
                      <span className="text-sm text-white font-medium">{formatDate(result.milestones.tri3Start)} - {formatDate(result.milestones.tri3End)}</span>
                    </div>
                    <div className="flex flex-col gap-1 border-l-2 border-[#C17A3A] pl-3 py-1">
                      <span className="text-xs text-[#EDE0D0] font-bold uppercase tracking-wider opacity-80">Tanggal Viabilitas</span>
                      <span className="text-sm text-white font-medium">{formatDate(result.milestones.viability)}</span>
                    </div>
                    <div className="flex flex-col gap-1 border-l-2 border-[#7A5C42] pl-3 py-1">
                      <span className="text-xs text-[#EDE0D0] font-bold uppercase tracking-wider opacity-80">USG Pertama (8-12 minggu)</span>
                      <span className="text-sm text-white font-medium">{formatDate(result.milestones.firstUltrasoundStart)} - {formatDate(result.milestones.firstUltrasoundEnd)}</span>
                    </div>
                    <div className="flex flex-col gap-1 border-l-2 border-[#7A5C42] pl-3 py-1">
                      <span className="text-xs text-[#EDE0D0] font-bold uppercase tracking-wider opacity-80">Pindai Anatomi (18-22 mgg)</span>
                      <span className="text-sm text-white font-medium">{formatDate(result.milestones.anatomyScanStart)} - {formatDate(result.milestones.anatomyScanEnd)}</span>
                    </div>
                    <div className="flex flex-col gap-1 border-l-2 border-[#7A5C42] pl-3 py-1">
                      <span className="text-xs text-[#EDE0D0] font-bold uppercase tracking-wider opacity-80">Tes Glukosa (24-28 minggu)</span>
                      <span className="text-sm text-white font-medium">{formatDate(result.milestones.glucoseTestStart)} - {formatDate(result.milestones.glucoseTestEnd)}</span>
                    </div>
                    <div className="flex flex-col gap-1 border-l-2 border-[#9C4A2A] pl-3 py-1">
                      <span className="text-xs text-[#EDE0D0] font-bold uppercase tracking-wider opacity-80">Kehamilan Penuh (37 minggu)</span>
                      <span className="text-sm text-white font-medium">{formatDate(result.milestones.fullTerm)}</span>
                    </div>

                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card variant="default" className="flex flex-col items-center justify-center text-center p-12 h-full min-h-[400px] border-dashed border-2 bg-[#2C1A0E] border-[#7A5C42]/40 rounded-[2.5rem] transition-all relative overflow-hidden shadow-2xl text-[#F5EDE3]">
              {/* Grain Overlay */}
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none transition-opacity" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

              <div className="relative z-10">
                <div className="absolute inset-0 bg-[#4A7C59] blur-[80px] rounded-full opacity-10" />
                <div className="relative z-10 w-full flex justify-center mb-10 mt-4">
                  <div className="absolute inset-0 bg-[#C17A3A] blur-[80px] rounded-full opacity-15" />
                  <Image src="/hpl.svg" alt="BMI Calculator Illustration" width={400} height={300} className="w-full max-w-[280px] sm:max-w-[340px] h-auto object-contain relative z-10 select-none pointer-events-none drop-shadow-2xl" priority />
                </div>
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-white mb-3 tracking-tight relative z-10">Kalkulator Siap Digunakan</h3>
              <p className="text-[#EDE0D0] font-body max-w-sm text-lg leading-relaxed relative z-10 opacity-90">
                Lengkapi tanggal pada formulir untuk memperkirakan hari kelahiran dan melihat tonggak penting kehamilan Anda.
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Informational Content Section (Premium Dark Layout) */}
      <div className="mt-16 mb-24">
        <div className="relative">

          {/* Main Container - Dark Theme (Tanah Tua) */}
          <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30">
            {/* Background Effects Wrapper (handles overflow) */}
            <div className="absolute inset-0 overflow-hidden rounded-[3rem] pointer-events-none">
              {/* Background Glow Effects */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4A7C59] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C17A3A] rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/3" />

              {/* Grain Overlay */}
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay transition-opacity" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
            </div>

            <div className="flex flex-col gap-16 lg:gap-24 relative z-10">

              {/* Header Section */}
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                <span className="text-[#4A7C59] font-bold tracking-widest uppercase text-xs mb-4 block">
                  Edukasi Kesehatan
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                  Memahami Garis Waktu Kehamilan
                </h2>
                <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                  Data serta estimasi dari kalkulator kehamilan ini ditujukan untuk melengkapi proses perencanaan Anda, menyederhanakan pelacakan tahap perkembangan janin, dan membantu persiapan jadwal konsultasi prenatal periodik.
                </p>

                {/* Pull Quote Box */}
                <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm max-w-2xl mx-auto text-left shadow-inner">
                  <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#4A7C59] shrink-0" />
                  <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug text-center sm:text-left">
                    "Setiap perjalanan kehamilan memiliki dinamika yang unik. Jadikan informasi ini sebagai panduan praktis, bukan pengganti diagnosis maupun instruksi ahli tenaga medis profesional."
                  </p>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex flex-col gap-16 mx-auto w-full">

                {/* 1. Kategori Metode */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#4A7C59] text-[#1A0E07] flex items-center justify-center font-bold">1</div>
                    <h3 className="text-2xl font-bold font-heading text-white">Variasi Metode Perhitungan</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* HPHT */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors flex flex-col justify-between">
                      <div className="mb-4">
                        <span className="text-sm font-bold text-[#EDE0D0] font-mono bg-white/10 px-3 py-1 rounded-full">Siklus Menstruasi</span>
                      </div>
                      <h4 className="text-xl font-bold font-heading text-white mb-2">HPHT</h4>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed opacity-80 mb-4">
                        Memanfaatkan Hari Pertama Haid Terakhir. Kalkulasi disesuaikan jika panjang rata-rata siklus Anda berada di luar 28 hari.
                      </p>
                      <div className="mt-auto">
                        <div className="font-mono text-[11px] text-[#EDE0D0] bg-[#1A0E07]/60 p-2.5 rounded-lg border border-white/10 shadow-inner leading-relaxed">
                          <span className="font-bold text-white block mb-1">Aturan Naegele:</span>
                          HPHT + 1 tahun − 3 bln + 7 hari<br />
                          <span className="font-bold text-white block mt-2 mb-1">Disesuaikan untuk Pasca Siklus:</span>
                          LMP + 280 hari + (Siklus − 28 hari)
                        </div>
                      </div>
                    </div>

                    {/* Konsepsi */}
                    <div className="p-6 rounded-2xl bg-[#4A7C59]/10 border border-[#4A7C59]/30 hover:border-[#4A7C59]/50 transition-colors flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A7C59]/20 rounded-full blur-xl" />
                      <div className="relative mb-4">
                        <span className="text-sm font-bold text-[#E8F5E9] font-mono bg-[#4A7C59]/30 px-3 py-1 rounded-full shadow-sm border border-[#4A7C59]/20">Tepat Waktu</span>
                      </div>
                      <h4 className="relative text-xl font-bold font-heading text-[#E8F5E9] mb-2">Tanggal Konsepsi</h4>
                      <p className="relative text-[#E8F5E9]/80 font-body text-sm leading-relaxed mb-4">
                        Jika Anda mengetahui secara logis kapan persisnya konsepsi tersebut terjadi, maka ditambahkan tepat 266 hari.
                      </p>
                      <div className="relative mt-auto">
                        <div className="font-mono text-[11px] text-[#81C784] bg-[#1A0E07]/60 p-2.5 rounded-lg border border-[#4A7C59]/20 shadow-inner">
                          <span className="font-bold text-[#E8F5E9] block mb-1">Rumus:</span>
                          Konsepsi + 266 hari
                        </div>
                      </div>
                    </div>

                    {/* IVF */}
                    <div className="p-6 rounded-2xl bg-[#C17A3A]/10 border border-[#C17A3A]/30 hover:border-[#C17A3A]/50 transition-colors flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#C17A3A]/20 rounded-full blur-xl" />
                      <div className="relative mb-4">
                        <span className="text-sm font-bold text-[#FFF3E0] font-mono bg-[#C17A3A]/30 px-3 py-1 rounded-full shadow-sm border border-[#C17A3A]/20">Prosedur Medis</span>
                      </div>
                      <h4 className="relative text-xl font-bold font-heading text-[#FFF3E0] mb-2">Transfer Bayi Tabung</h4>
                      <p className="relative text-[#FFF3E0]/80 font-body text-sm leading-relaxed mb-4">
                        Mengintegrasikan tanggal penanaman embrio ke rahim serta mengompensasinya berdasarkan usia pertumbuhan spesifik embrio tesebut.
                      </p>
                      <div className="relative mt-auto">
                        <div className="font-mono text-[11px] text-[#FFB74D] bg-[#1A0E07]/60 p-2.5 rounded-lg border border-[#C17A3A]/20 shadow-inner">
                          <span className="font-bold text-[#FFF3E0] block mb-1">Rumus:</span>
                          Transfer + (267 − Usia Embrio dalam Hari)
                        </div>
                      </div>
                    </div>

                    {/* USG */}
                    <div className="p-6 rounded-2xl bg-[#9C4A2A]/10 border border-[#9C4A2A]/30 hover:border-[#9C4A2A]/50 transition-colors flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#9C4A2A]/20 rounded-full blur-xl" />
                      <div className="relative mb-4">
                        <span className="text-sm font-bold text-[#FFF0EB] font-mono bg-[#9C4A2A]/30 px-3 py-1 rounded-full shadow-sm border border-[#9C4A2A]/20">Evaluasi Klinis</span>
                      </div>
                      <h4 className="relative text-xl font-bold font-heading text-[#FFF0EB] mb-2">Pemindaian USG</h4>
                      <p className="relative text-[#FFF0EB]/80 font-body text-sm leading-relaxed mb-4">
                        Berbasis pada pembacaan usia gestasi mesin pemindai ultrasonik untuk akurasi pelacakan lanjutan terbaik.
                      </p>
                      <div className="relative mt-auto">
                        <div className="font-mono text-[11px] text-[#E57373] bg-[#1A0E07]/60 p-2.5 rounded-lg border border-[#9C4A2A]/20 shadow-inner">
                          <span className="font-bold text-[#FFF0EB] block mb-1">Rumus:</span>
                          280 hari mutlak dari HPHT terestimasi
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 2. Rumus & Metode */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#4A7C59] text-[#1A0E07] flex items-center justify-center font-bold">2</div>
                    <h3 className="text-2xl font-bold font-heading text-white">Prinsip Observasi Medikal</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div>
                      <p className="text-[#EDE0D0] font-body leading-relaxed text-lg mb-4 opacity-90">
                        Secara klinis, siklus prapengeluaran bayi mamalia homo sapiens adalah berkisar antara durasi kurang lebih 280 hari operasional.
                      </p>
                      <ul className="space-y-3 font-body text-[#EDE0D0]">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#4A7C59] shrink-0 mt-0.5" />
                          <span>Hanya <strong>5 persen</strong> dari populasi global direkam menetas mutlak pada pas Hari Perkiraan Lahir (EDD).</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#4A7C59] shrink-0 mt-0.5" />
                          <span>Memaksimalkan metode observasi obstetri klasik berupa <strong>Hukum Naegele</strong> yang masih menjadi acuan dunia kedokteran hari ini.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-[#1A0E07] p-6 rounded-2xl border border-[#7A5C42]/30 shadow-sm relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                      <h5 className="font-bold text-sm text-surface uppercase tracking-widest mb-4 relative z-10">Algoritma Hukum Naegele</h5>
                      <div className="bg-[#2C1A0E] p-4 rounded-xl flex items-center justify-center mb-3 border border-[#7A5C42]/40 relative z-10 shadow-inner">
                        <span className="font-mono font-bold text-lg text-[#F5EDE3] tracking-wide text-center">
                          HPHT + 1 Thun - 3 Bln + 7 Hri
                        </span>
                      </div>
                      <p className="text-xs text-surface font-body text-center mt-2 relative z-10">
                        (Dikalibrasi dinamis dengan durasi riwayat siklus masing-masing pengguna)
                      </p>
                    </div>
                  </div>
                </section>

                {/* 3. Manfaat */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#4A7C59] text-[#1A0E07] flex items-center justify-center font-bold">3</div>
                    <h3 className="text-2xl font-bold font-heading text-white">Manfaat Pelacakan Rutin</h3>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-6 lg:p-8 rounded-[2rem] space-y-6 backdrop-blur-sm">
                    <p className="text-lg font-body text-[#F5EDE3] leading-relaxed">
                      Sinergi peranti lunak prediktif mutakhir dengan perencanaan kesehatan proaktif memberikan <strong>3 parameter utama bagi orangtua</strong>:
                    </p>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-[#1A0E07]/60 border border-white/5 focus-within:ring-2 transition-all">
                        <h6 className="font-bold text-white mb-1 border-l-2 border-[#C17A3A] pl-3">Identifikasi HPL</h6>
                        <p className="text-sm font-body text-[#EDE0D0] opacity-80 pl-3">Fokus penuh penanda estimasi persalinan bayi.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#1A0E07]/60 border border-white/5 transition-all">
                        <h6 className="font-bold text-white mb-1 border-l-2 border-[#4A7C59] pl-3">Pengawalan Usia Janin</h6>
                        <p className="text-sm font-body text-[#EDE0D0] opacity-80 pl-3">Pemahaman komprehensif atas konversi usia dalam satuan minggu plus pembagian trimesternya.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#1A0E07]/60 border border-white/5 transition-all">
                        <h6 className="font-bold text-white mb-1 border-l-2 border-[#9C4A2A] pl-3">Milestone Perawatan</h6>
                        <p className="text-sm font-body text-[#EDE0D0] opacity-80 pl-3">Kalender pengingat pemeriksaan vital layaknya pindaian anatomis dan tes lab.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* FAQ */}
                <section className="space-y-6 pt-4">
                  <h3 className="text-2xl font-bold font-heading text-white text-center mb-8">Pertanyaan yang Sering Terjadi (FAQ)</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-[#1A0E07]/40 p-6 rounded-2xl border border-[#7A5C42]/20 shadow-inner">
                      <h4 className="font-bold text-[#4A7C59] mb-2 font-heading text-lg">Sejauh mana presisi output hari kelahiran?</h4>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed">Secara klinis output ini adalah proyeksi. Periode standar berpusar pada angka 40 minggu, namun kelahirannya fluktuatif maju mundur dari hari terprediksi secara biologis alami.</p>
                    </div>
                    <div className="bg-[#1A0E07]/40 p-6 rounded-2xl border border-[#7A5C42]/20 shadow-inner">
                      <h4 className="font-bold text-[#4A7C59] mb-2 font-heading text-lg">Apakah reliabel jika saya adalah partisipan fertilisasi in vitro (IVF)?</h4>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed">Tentu saja. Tersedia variabel opsi "Transfer IVF" khusus untuk mengamankan data proyeksi via parameter masa hidup pascatransfer awal.</p>
                    </div>
                    <div className="bg-[#1A0E07]/40 p-6 rounded-2xl border border-[#7A5C42]/20 shadow-inner">
                      <h4 className="font-bold text-[#4A7C59] mb-2 font-heading text-lg">Bagaimana solusinya apabila siklus HPHT kelupaan?</h4>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed">Sistem dilengkapi cadangan alternatif melalui pendekatan "Tanggal USG" maupun "Tanggal Konsepsi" dimana sistem re-kalkulasi akan berjalan merefleksikan tanggal alternatif tsb.</p>
                    </div>
                    <div className="bg-[#1A0E07]/40 p-6 rounded-2xl border border-[#7A5C42]/20 shadow-inner">
                      <h4 className="font-bold text-[#4A7C59] mb-2 font-heading text-lg">Rekomendasi repetisi kalkulasi ini?</h4>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed">Bisa digunakan seperlunya misal ketika jadwal periksa rutin, guna mencocokkan sinkronisasi usia gestasi di hasil kalkulator dengan status aktual dari rekam medis dokter.</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedHealthTools currentPath="/kesehatan/kehamilan" />
    </div>
  );
}
