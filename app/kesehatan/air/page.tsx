'use client';

import React, { useState } from 'react';
import { Card } from '@/ui/Card';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { calculateWaterIntake, WaterResult, SystemType, GenderType, ActivityLevel, OutputUnitType, ClimateType, AltitudeType, WaterInput } from '@/features/air/utils';
import Image from 'next/image';
import {
  ArrowRight, ShieldAlert, Activity, Info, Venus, Mars, CheckCircle2, Droplets, GlassWater, Clock, Coffee, Wine, CloudSun, Mountain, ThermometerSun
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { RelatedHealthTools } from '../components/RelatedHealthTools';
import { Breadcrumbs } from '@/ui/Breadcrumbs';

const airSchema = z.object({
  weight: z.coerce.number().min(10, "Berat minimal 10 kg").max(500, "Berat maksimal 500 kg"),
  age: z.coerce.number().min(2, "Umur minimal 2 tahun").max(120, "Umur maksimal 120 tahun"),
  exerciseDuration: z.coerce.number().min(0).max(1000).optional().default(0),
});

export default function WaterIntakeCalculator() {
  const [system, setSystem] = useState<SystemType>('metric');
  const [gender, setGender] = useState<GenderType>('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [exerciseDuration, setExerciseDuration] = useState('');

  // Advanced state
  const [climate, setClimate] = useState<ClimateType>('normal');
  const [altitude, setAltitude] = useState<AltitudeType>('low');
  const [caffeine, setCaffeine] = useState(false);
  const [alcohol, setAlcohol] = useState(false);
  const [highProtein, setHighProtein] = useState(false);
  const [pregnant, setPregnant] = useState(false);
  const [sick, setSick] = useState(false);

  const [unit, setUnit] = useState<OutputUnitType>('liter');

  const [result, setResult] = useState<WaterResult | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const parsed = airSchema.parse({
        weight,
        age,
        exerciseDuration: exerciseDuration === '' ? 0 : exerciseDuration
      });

      const input: WaterInput = {
        system,
        gender,
        age: parsed.age,
        weight: parsed.weight,
        activityLevel,
        exerciseDuration: parsed.exerciseDuration,
        climate,
        altitude,
        caffeine,
        alcohol,
        highProtein,
        pregnant,
        sick,
        unit
      };

      const res = calculateWaterIntake(input);
      setResult(res);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0].message);
      } else {
        setError(err.message || 'Terjadi kesalahan saat menghitung asupan air.');
      }
      setResult(null);
    }
  };

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header Bar */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs items={[
          { label: 'Kesehatan', href: '/kesehatan' },
          { label: 'Kalkulator Kebutuhan Air' }
        ]} />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">Kalkulator Kebutuhan Air</h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">Estimasi Target Hidrasi Harian Optimal Anda</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        {/* Left Side: Input Form */}
        <Card variant="default" className="lg:col-span-6 flex flex-col gap-8 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full h-full">
          <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
              <Droplets className="w-6 h-6 text-[#4A7C59]" />
              Data Primer
            </h2>
            <p className="text-sm text-secondary font-body mt-2 leading-relaxed">Masukkan metrik dasar tubuh untuk asupan minimum cairan Anda.</p>
          </div>

          <form onSubmit={handleCalculate} className="flex flex-col gap-6 relative z-10 h-full">
            <div className="space-y-6">

              {/* System Toggle */}
              <div className="bg-surface p-1.5 rounded-xl flex items-center max-w-sm">
                <button
                  type="button"
                  onClick={() => setSystem('metric')}
                  className={cn(
                    "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
                    system === 'metric' ? "bg-white text-primary shadow-sm" : "text-secondary hover:text-primary"
                  )}
                >
                  Metrik (kg, cm)
                </button>
                <button
                  type="button"
                  onClick={() => setSystem('imperial')}
                  className={cn(
                    "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
                    system === 'imperial' ? "bg-white text-primary shadow-sm" : "text-secondary hover:text-primary"
                  )}
                >
                  Imperial (lb, ft)
                </button>
              </div>

              {/* Gender */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={cn(
                    "flex-1 flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all",
                    gender === 'male' ? "border-[#4A7C59] bg-[#4A7C59]/10 text-[#4A7C59]" : "border-muted bg-white text-secondary hover:border-secondary/30"
                  )}
                >
                  <Mars className="w-6 h-6 mb-1" />
                  <span className="font-bold font-ui text-xs">Pria</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={cn(
                    "flex-1 flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all",
                    gender === 'female' ? "border-[#4A7C59] bg-[#4A7C59]/10 text-[#4A7C59]" : "border-muted bg-white text-secondary hover:border-secondary/30"
                  )}
                >
                  <Venus className="w-6 h-6 mb-1" />
                  <span className="font-bold font-ui text-xs">Wanita</span>
                </button>
              </div>

              <div className="flex gap-4">
                <Input
                  id="age"
                  label="Usia"
                  type="number"
                  placeholder="25"
                  suffix="Thn"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="py-3 placeholder:opacity-40 rounded-xl"
                  required
                  min={2}
                  max={120}
                />
                <Input
                  id="weight"
                  label="Berat"
                  type="number"
                  placeholder={system === 'metric' ? "65" : "145"}
                  suffix={system === 'metric' ? "kg" : "lb"}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="py-3 placeholder:opacity-40 rounded-xl"
                  required
                  min={10}
                  max={500}
                />
              </div>

              {/* Activity Level */}
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-sm font-bold font-ui text-primary">Tingkat Aktivitas (Harian)</label>
                  <div className="relative">
                    <select
                      value={activityLevel}
                      onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                      className="w-full flex h-12 rounded-xl border bg-white px-4 text-[14px] transition-colors border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1 text-primary font-ui font-medium appearance-none shadow-sm"
                    >
                      <option value="low">Rendah (Sedentary)</option>
                      <option value="moderate">Sedang (Aktif)</option>
                      <option value="high">Tinggi (Fisik Berat)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <Activity className="h-4 w-4 text-secondary opacity-50" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                  <label className="text-sm font-bold font-ui text-primary truncate">Olahraga Hari Ini</label>
                  <div className="relative flex items-center border border-muted bg-white rounded-xl shadow-sm h-12 focus-within:ring-2 focus-within:ring-accent-1 overflow-hidden transition-colors">
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      value={exerciseDuration}
                      onChange={(e) => setExerciseDuration(e.target.value)}
                      className="w-full h-full bg-transparent px-3 text-[14px] font-medium text-primary outline-none"
                    />
                    <span className="pr-3 text-sm text-secondary font-bold select-none opacity-50">mnt</span>
                  </div>
                </div>
              </div>

              {/* Output Unit Selection */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold font-ui text-primary">Satuan Output</label>
                <div className="grid grid-cols-4 gap-2 bg-surface p-1.5 rounded-xl">
                  {['liter', 'ml', 'cups', 'oz'].map(u => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setUnit(u as OutputUnitType)}
                      className={cn(
                        "py-2 px-1 text-xs md:text-sm font-bold rounded-lg transition-all text-center uppercase",
                        unit === u ? "bg-white text-primary shadow-sm" : "text-secondary hover:text-primary"
                      )}
                    >
                      {u === 'cups' ? 'Gelas' : u}
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced Environmental / Lifestyle Form (Using details) */}
              <details className="group [&_summary::-webkit-details-marker]:hidden bg-surface rounded-2xl border border-muted/50 overflow-hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-primary font-bold hover:bg-white/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <ThermometerSun className="w-5 h-5 text-[#C17A3A]" />
                    <h3 className="text-sm font-medium">Faktor Lingkungan & Gaya Hidup</h3>
                  </div>
                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </summary>

                <div className="px-4 pb-5 space-y-5 border-t border-muted/30 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold font-ui text-secondary">Iklim & Cuaca</label>
                      <select
                        value={climate}
                        onChange={(e) => setClimate(e.target.value as ClimateType)}
                        className="w-full flex h-10 rounded-lg border bg-white px-3 text-sm transition-colors border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1 text-primary font-ui appearance-none"
                      >
                        <option value="normal">Normal / Sedang</option>
                        <option value="hot">Panas Terik</option>
                        <option value="humid">Sangat Lembap</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold font-ui text-secondary">Ketinggian Tempat</label>
                      <select
                        value={altitude}
                        onChange={(e) => setAltitude(e.target.value as AltitudeType)}
                        className="w-full flex h-10 rounded-lg border bg-white px-3 text-sm transition-colors border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1 text-primary font-ui appearance-none"
                      >
                        <option value="low">Rendah / Normal</option>
                        <option value="high">Dataran Tinggi</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold font-ui text-secondary block">Gaya Hidup & Diet</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-lg border border-muted/50 hover:border-[#C17A3A]/30 transition-all flex-1">
                        <input type="checkbox" checked={caffeine} onChange={e => setCaffeine(e.target.checked)} className="rounded text-[#C17A3A] focus:ring-[#C17A3A]" />
                        <span className="text-xs font-bold flex items-center gap-1"><Coffee className="w-3.5 h-3.5" />Kafein</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-lg border border-muted/50 hover:border-[#9C4A2A]/30 transition-all flex-1">
                        <input type="checkbox" checked={alcohol} onChange={e => setAlcohol(e.target.checked)} className="rounded text-[#9C4A2A] focus:ring-[#9C4A2A]" />
                        <span className="text-xs font-bold flex items-center gap-1"><Wine className="w-3.5 h-3.5" />Alkohol</span>
                      </label>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-lg border border-muted/50 hover:border-[#4A7C59]/30 transition-all">
                      <input type="checkbox" checked={highProtein} onChange={e => setHighProtein(e.target.checked)} className="rounded text-[#4A7C59] focus:ring-[#4A7C59]" />
                      <span className="text-xs font-bold">Diet Tinggi Protein</span>
                    </label>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold font-ui text-secondary block">Status Kesehatan / Khusus</label>
                    <div className="flex flex-col gap-2">
                      {gender === 'female' && (
                        <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-lg border border-muted/50 transition-all">
                          <input type="checkbox" checked={pregnant} onChange={e => setPregnant(e.target.checked)} className="rounded text-primary focus:ring-primary" />
                          <span className="text-xs font-bold">Sedang Hamil / Menyusui</span>
                        </label>
                      )}
                      <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-lg border border-muted/50 transition-all">
                        <input type="checkbox" checked={sick} onChange={e => setSick(e.target.checked)} className="rounded text-primary focus:ring-primary" />
                        <span className="text-xs font-bold">Sedang Sakit (Demam / Lainnya)</span>
                      </label>
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

            <Button type="submit" variant="primary" className="py-5 text-lg mt-auto shadow-lg hover:shadow-xl group rounded-2xl w-full !bg-[#4A7C59] hover:!bg-[#3a6346] text-white outline-none ring-0">
              Analisis Asupan Air
              <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1.5 transition-transform" />
            </Button>
          </form>
        </Card>

        {/* Right Side: Result Display */}
        <div className="lg:col-span-6 h-full">
          {result ? (
            <Card variant="default" className="flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl transition-all duration-700 h-full animate-in fade-in zoom-in-95 bg-[#2C1A0E] ring-4 ring-inset ring-[#4A7C59]/30 border-[#4A7C59]/30 text-[#E8F5E9]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A7C59]/20 via-transparent to-transparent pointer-events-none transition-colors" />

              <div className="relative z-10 flex flex-col items-center justify-between p-8 sm:p-10 h-full w-full">

                {/* Header & Main Target */}
                <div className="flex flex-col items-center w-full">
                  <div className="w-16 h-16 rounded-[1.25rem] bg-[#1A0E07] shadow-inner flex items-center justify-center mb-6 border border-[#4A7C59]/20">
                    <GlassWater className="w-8 h-8 text-[#4A7C59]" />
                  </div>

                  <h3 className="text-xs font-bold text-[#4A7C59] tracking-widest uppercase mb-1 opacity-90 text-center bg-[#4A7C59]/10 px-3 py-1 rounded-full">Target Asupan Dasar Air Minum</h3>
                  <div className="flex items-end justify-center gap-2 mt-4 mb-2">
                    <div className="text-[4rem] sm:text-[5rem] font-black font-heading tracking-tighter leading-none text-center drop-shadow-md text-[#F5EDE3]">
                      {result.convertedIntake}
                    </div>
                    <span className="text-lg sm:text-2xl font-bold pb-2 text-[#4A7C59] uppercase">{result.unitLabel}</span>
                  </div>
                  <p className="text-[#EDE0D0] text-sm opacity-80 text-center mb-8 font-body max-w-[280px]">Berdasarkan perhitungan berat badan, ini adalah minimal asupan dasar di hari yang normal tanpa aktivitas berat.</p>
                </div>

                {/* Qualitative / Conditional Information block */}
                <div className="w-full bg-[#1A0E07]/60 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-inner mb-6 space-y-3">
                  <h4 className="flex items-center gap-2 font-bold font-heading text-sm text-[#F5EDE3]">
                    <Info className="w-4 h-4 text-[#C17A3A]" />
                    Saran Modifikasi Personal
                  </h4>
                  <ul className="space-y-3 text-xs font-body text-[#EDE0D0] opacity-90 leading-relaxed max-h-40 overflow-y-auto custom-scrollbar pr-2">
                    {result.qualitativeTips.map((tip, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-[#4A7C59] shrink-0 mt-0.5">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hydration Schedule */}
                <div className="w-full mt-auto">
                  <h4 className="flex items-center gap-2 font-bold font-heading text-sm text-[#F5EDE3] mb-4">
                    <Clock className="w-4 h-4 text-[#4A7C59]" />
                    Jadwal Minum Harian
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {result.schedule.map((item, id) => (
                      <div key={id} className="bg-[#1A0E07] rounded-xl p-3 border border-white/5 shadow-inner hover:bg-[#4A7C59]/10 transition-colors group">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs font-bold text-[#E8F5E9] font-mono opacity-80">{item.time}</span>
                          <span className="text-[10px] bg-[#4A7C59]/20 text-[#4A7C59] px-1.5 rounded font-bold">{item.percentage}%</span>
                        </div>
                        <div className="text-sm font-black text-white font-heading mt-1">{item.amount} <span className="text-[10px] font-normal opacity-70 ml-0.5 uppercase">{result.unitLabel}</span></div>
                        <div className="text-[10px] text-[#EDE0D0] opacity-60 mt-0.5 line-clamp-1 group-hover:opacity-100 transition-opacity">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </Card>
          ) : (
            <Card variant="default" className="flex flex-col items-center justify-center text-center p-12 h-full min-h-[500px] border-dashed border-2 bg-[#2C1A0E] border-[#7A5C42]/40 rounded-[2.5rem] transition-all relative overflow-hidden shadow-2xl text-[#F5EDE3]">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none transition-opacity" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

              <div className="relative z-10 w-full flex justify-center mt-4">
                <div className="absolute inset-0 bg-[#4A7C59] blur-[80px] rounded-full opacity-15" />
                <Image src="/air.svg" alt="Water Intake Calculator" width={280} height={200} className="w-full max-w-[200px] h-auto object-contain relative z-10 select-none pointer-events-none drop-shadow-2xl opacity-90" priority onError={(e) => { e.currentTarget.style.display = 'none' }} />
                {/* Fallback */}
                <div className="w-32 h-32 rounded-full border-4 border-[#4A7C59]/20 flex items-center justify-center bg-[#4A7C59]/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
                  <Droplets className="w-12 h-12 text-[#4A7C59] opacity-60" />
                </div>
              </div>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-3 tracking-tight relative z-10 px-4">Kalkulator Siap Digunakan</h3>
              <p className="text-[#EDE0D0] font-body max-w-[280px] text-base leading-relaxed relative z-10 opacity-90 px-4">
                Lengkapi form parameter di samping untuk melihat perkiraan kebutuhan asupan air dan jadwal minum optimal Anda.
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Informational Content Section (Premium Dark Layout - matching BMI visually, content paraphrased specifically for this tool) */}
      <div className="mt-16 mb-24">
        <div className="relative">
          {/* Main Container - Dark Theme (Tanah Tua) */}
          <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30">

            {/* Background Decorators */}
            <div className="absolute inset-0 overflow-hidden rounded-[3rem] pointer-events-none">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4A7C59] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C17A3A] rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/3" />
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay transition-opacity" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
            </div>

            <div className="flex flex-col gap-16 lg:gap-24 relative z-10">

              {/* Header Section */}
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                <span className="text-[#4A7C59] font-bold tracking-widest uppercase text-xs mb-4 block">
                  Edukasi Kesehatan & Nutrisi
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                  Memahami Kebutuhan Air Tubuh Anda
                </h2>
                <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                  Konsistensi dalam menghidrasi tubuh adalah esensi dari metabolisme dan fungsi seluler yang optimal. Jumlah air yang Anda perlukan adalah parameter highly-individual yang menyesuaikan dengan adaptasi lingkungan dan aktivitas Anda.
                </p>

                {/* Pull Quote Box */}
                <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm mx-auto text-left shadow-inner">
                  <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#4A7C59] shrink-0" />
                  <div className="flex flex-col gap-3">
                    <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug">
                      Kalkulator Asupan Air kami membantu Anda memproyeksikan basis logis seberapa banyak air yang idealnya Anda minum berdasarkan berat badan dan elemen terkait lainnya.
                    </p>
                    <p className="text-sm text-[#EDE0D0] font-body">
                      Dengan indikator dasar kalkulasi dari bobot fisik yang disesuaikan secara dinamis, kalkulator ini memandu dan memberikan saran konseptual terbaik, menunjang pola hidup harian—hingga memastikan bahwa sistem tubuh bekerja secara kohesif, tanpa ada risiko yang ditimbulkan dari kelelahan dehidrasi berat.
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex flex-col gap-16 mx-auto w-full">

                {/* 1. Pengaruh dan Dampak */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#4A7C59] text-[#1A0E07] flex items-center justify-center font-bold">1</div>
                    <h3 className="text-2xl font-bold font-heading text-white">Spektrum Faktor Hidrasi</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-[#4A7C59]/10 border border-[#4A7C59]/30 transition-colors">
                      <h4 className="flex items-center gap-2 text-xl font-bold font-heading text-[#E8F5E9] mb-3"><Activity className="w-5 h-5 text-[#4A7C59]" /> Tingkat Aktivitas</h4>
                      <p className="text-[#E8F5E9]/80 font-body text-sm leading-relaxed">
                        Gerak badan dan olahraga ekstrem secara langsung mendesak sistem tubuh memproduksi rilis keringat, menghabiskan retensi air jauh lebih pesat.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 transition-colors">
                      <h4 className="flex items-center gap-2 text-xl font-bold font-heading text-white mb-3"><CloudSun className="w-5 h-5 text-[#C17A3A]" /> Iklim Alami</h4>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed opacity-80">
                        Eksposur pada ekuator panas dan curah kelembapan pekat mempercepat persentase pembuangan air kulit tanpa disadari oleh individu tersebut.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 transition-colors">
                      <h4 className="flex items-center gap-2 text-xl font-bold font-heading text-white mb-3"><Droplets className="w-5 h-5 text-[#9C4A2A]" /> Kondisi Fisiologis</h4>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed opacity-80">
                        Tahapan krusial medis seperti gestasi (kehamilan), masa pemulihan penyakit flu, serta sistem imun lemah mendorong limitasi rehidrasi yang tak bisa disepelekan.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 2. Sumber Rehidrasi Alternatif */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#4A7C59] text-[#1A0E07] flex items-center justify-center font-bold">2</div>
                    <h3 className="text-2xl font-bold font-heading text-white">Sumber Subtitusi Utama</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 items-center bg-[#1A0E07]/40 p-6 sm:p-10 rounded-[2.5rem] border border-[#7A5C42]/30 shadow-sm">
                    <div>
                      <h5 className="font-bold text-xl text-white mb-5">Diversitas Asupan Air</h5>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed mb-6 opacity-90">
                        Meskipun proyeksi basis kalkulator ini didominasi oleh asupan meminum air putih murni setiap hari, pastikan untuk merealisasikan bahwa kompenen tubuh secara konstan pula menerimanya melalui:
                      </p>
                      <ul className="space-y-4 font-body text-[#EDE0D0] text-sm">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#4A7C59] shrink-0 mt-0.5" />
                          <span><strong>Air Putih:</strong> Komposisi inti—katalis mutlak, terbaik, murni.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                          <span><strong>Sayur & Buah Segar:</strong> Kandungan elemen mikro semangka, jeruk nipis, dan bilberry memiliki saturasi fluida yang tajam dan segar.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#9C4A2A] shrink-0 mt-0.5" />
                          <span><strong>Nutrisi Cair Lainnya:</strong> Jus dan teh harian mampu melengkapi kuotanya (namun perihal kafein diuretik seperti kopi perlu dipertimbangkan matang-matang).</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-[#2C1A0E] p-5 rounded-2xl border border-white/10 shrink-0 shadow-inner">
                        <h5 className="font-bold text-sm text-[#4A7C59] uppercase tracking-widest mb-3">Tanda Hidrasi Memadai</h5>
                        <ul className="space-y-3 font-body text-[#F5EDE3] text-sm">
                          <li className="flex gap-2 items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#4A7C59]"></div> Urine tampak jernih hingga kuning terang.</li>
                          <li className="flex gap-2 items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#4A7C59]"></div> Pengosongan kandung kemih 4-10 interval teratur.</li>
                          <li className="flex gap-2 items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#4A7C59]"></div> Kulit terhidrasi membal dan saliva terasa pekat di kerongkongan.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* FAQ */}
                <section className="space-y-8 pt-8 border-t border-[#7A5C42]/30">
                  <div className="flex flex-col items-center text-center">
                    <h3 className="text-2xl font-bold font-heading text-white mb-3">Pertanyaan Umum (FAQ)</h3>
                    <p className="text-[#EDE0D0] font-body text-sm">Kredibilitas tambahan pada aspek asupan yang diatur secara sistem.</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full font-body">
                    <div className="space-y-6">
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#4A7C59] transition">Apakah kopi memblokir retensi asupan murni saya?</summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">Secara komprehensif, ya. Kafein bertindak mempercepat stimulasi ekskresi buang air, yang artinya mengurangi net jumlah saturasi rehidrasinya. Itulah karenanya kita merekomendasikan kompensasi volume jika konsumsinya tinggi.</p>
                      </details>
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#4A7C59] transition">Haruskah saya menambah proporsi cairan setiap ngegym?</summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">Pasti, transpirasi fisik membuat tubuh langsung mengalami defisit mendadak, menggantinya dengan meminum berulang sesuai target dapat me-restart performa kembali optimal.</p>
                      </details>
                    </div>
                    <div className="space-y-6">
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">Hubungan Kalkulator Air dengan Tools Lain</summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">Air memiliki signifikansi integral untuk semua kalkulator kami. Penggunaan pelacak <em>BMI</em>, misalnya, atau perhitungkan <em>Macro Diet & Kalori</em> bakal terbuang sia-sia apabila cairan untuk mengoptimasi sistem sekresi internal kekurangan daya dorong. Ini selaras layaknya sepasang sepatu fungsional.</p>
                      </details>
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">Apakah hasil di platform NusantaraTools mutlak?</summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">Segala output data pada modul interkomputerisasi kami sifatnya prediktif dan fundamental rujukan awal semata; ia tidak dapat menggantikan peran utama medikal profesional dari pakar spesialis Anda sendiri.</p>
                      </details>
                    </div>
                  </div>
                </section>

                <div className="bg-[#1A0E07]/60 p-6 sm:p-8 rounded-[2rem] border border-[#4A7C59]/40 text-center max-w-3xl mx-auto shadow-inner mt-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#4A7C59]/5 pointer-events-none" />
                  <h4 className="font-heading font-extrabold text-white text-xl mb-4 relative z-10">Maksimalkan Tujuan Kesehatan Fisik Penuh</h4>
                  <p className="text-[#EDE0D0] font-body text-sm leading-relaxed mb-6 block relative z-10">Mencapai target metrik kalori atau BMI takkan pernah berjalan mulus jika fondasi harian kita di bawah batas rekomendasi logis Air Putih. Rancang rutinitas sistematis sejak sekarang dan saksikan perubahan besar dari setiap tetesnya.</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedHealthTools currentPath="/kesehatan/air" />
    </div>
  );
}
