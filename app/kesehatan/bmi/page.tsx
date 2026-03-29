'use client';

import React, { useState } from 'react';
import { Card } from '@/ui/Card';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { calculateBMI, BMIResult, SystemType, GenderType, ActivityLevel, BMIInput } from '@/features/bmi/utils';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, Scale, ArrowRight, HeartPulse, ShieldAlert,
  Activity, Info, Venus, Mars, Ruler, User, CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { RelatedHealthTools } from '../components/RelatedHealthTools';
import { Breadcrumbs } from '@/ui/Breadcrumbs';

const bmiSchema = z.object({
  weight: z.coerce.number().min(2, "Berat minimal 2 kg").max(500, "Berat maksimal 500 kg"),
  heightRaw1: z.coerce.number().min(20, "Tinggi minimal 20 cm").max(300, "Tinggi maksimal 300 cm"),
  heightRaw2: z.coerce.number().optional().default(0),
  age: z.coerce.number().min(2, "Umur minimal 2 tahun").max(120, "Umur maksimal 120 tahun"),
});

export default function BMICalculator() {
  const [system, setSystem] = useState<SystemType>('metric');
  const [gender, setGender] = useState<GenderType>('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [heightRaw1, setHeightRaw1] = useState('');
  const [heightRaw2, setHeightRaw2] = useState('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');

  const [result, setResult] = useState<BMIResult | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const parsed = bmiSchema.parse({
        weight,
        heightRaw1,
        heightRaw2: system === 'imperial' && heightRaw2 ? heightRaw2 : 0,
        age
      });
      
      const input: BMIInput = {
        system,
        weight: parsed.weight,
        heightRaw1: parsed.heightRaw1,
        heightRaw2: parsed.heightRaw2,
        gender,
        age: parsed.age,
        activityLevel
      };
      
      const res = calculateBMI(input);
      setResult(res);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0].message);
      } else {
        setError(err.message || 'Terjadi kesalahan saat menghitung BMI');
      }
      setResult(null);
    }
  };

  const getCategoryTheme = (category: string) => {
    switch(category) {
      case 'Normal': return {
        cardBg: 'bg-[#2C1A0E]',
        ring: 'ring-[#4A7C59]/30',
        text: 'text-[#E8F5E9]',
        accentText: 'text-[#4A7C59]',
        border: 'border-[#4A7C59]/30',
        icon: HeartPulse,
        gradient: 'from-[#4A7C59]/20 via-transparent to-transparent'
      };
      case 'Kurus': return {
        cardBg: 'bg-[#2C1A0E]',
        ring: 'ring-[#EDE0D0]/20',
        text: 'text-[#F5EDE3]',
        accentText: 'text-[#EDE0D0]',
        border: 'border-white/10',
        icon: Scale,
        gradient: 'from-white/5 via-transparent to-transparent'
      };
      case 'Overweight': return {
        cardBg: 'bg-[#2C1A0E]',
        ring: 'ring-[#C17A3A]/30',
        text: 'text-[#FFF3E0]',
        accentText: 'text-[#C17A3A]',
        border: 'border-[#C17A3A]/30',
        icon: ShieldAlert,
        gradient: 'from-[#C17A3A]/20 via-transparent to-transparent'
      };
      case 'Obesitas': return {
        cardBg: 'bg-[#2C1A0E]',
        ring: 'ring-[#9C4A2A]/30',
        text: 'text-[#FFF0EB]',
        accentText: 'text-[#9C4A2A]',
        border: 'border-[#9C4A2A]/30',
        icon: ShieldAlert,
        gradient: 'from-[#9C4A2A]/20 via-transparent to-transparent'
      };
      default: return {
        cardBg: 'bg-[#2C1A0E]',
        ring: 'ring-[#EDE0D0]/20',
        text: 'text-[#F5EDE3]',
        accentText: 'text-[#EDE0D0]',
        border: 'border-white/10',
        icon: Scale,
        gradient: 'from-white/5 via-transparent to-transparent'
      };
    }
  };

  const theme = result ? getCategoryTheme(result.category) : null;
  const IconResult = theme ? theme.icon : Scale;

  const renderBMIScale = (score: number) => {
    const min = 16;
    const max = 40;
    const clamped = Math.max(min, Math.min(score, max));
    const percent = ((clamped - min) / (max - min)) * 100;

    return (
      <div className="w-full mt-4 mb-4 bg-[#1A0E07]/60 p-5 rounded-[2rem] border border-white/5 shadow-inner backdrop-blur-md  ">
        <h4 className="text-left font-bold text-white font-heading mb-6 flex items-center gap-2 ">
          <Activity className="w-5 h-5 text-[#C17A3A]" />
          Skala BMI
        </h4>
        <div className="relative w-full pt-4 pb-2 ">
          {/* Marker */}
          <div 
            className="absolute top-0 w-1 bg-white z-20 transition-all duration-1000 ease-out h-[calc(100%-8px)] shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            style={{ left: `calc(${percent}% - 2px)` }}
          >
            <div className="absolute top-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[#2C1A0E] bg-white shadow-md" />
          </div>

          {/* The Bar */}
          <div className="h-10 rounded-xl flex overflow-hidden w-full relative z-10 shadow-inner opacity-90 ring-1 ring-inset ring-white/10">
            <div className="h-full bg-white/20 flex items-center justify-center border-r border-[#2C1A0E]/40 transition-all" style={{ width: '10.4%' }}>
               <span className="text-[10px] font-bold text-white px-1 leading-tight text-center hidden sm:block truncate opacity-80">Kurus</span>
            </div>
            <div className="h-full bg-[#4A7C59] flex items-center justify-center border-r border-[#2C1A0E]/40 transition-all" style={{ width: '27.1%' }}>
               <span className="text-[10px] sm:text-xs font-bold text-white px-1">Normal</span>
            </div>
            <div className="h-full bg-[#C17A3A] flex items-center justify-center border-r border-[#2C1A0E]/40 transition-all" style={{ width: '20.8%' }}>
               <span className="text-[10px] font-bold text-white px-1 leading-tight text-center hidden sm:block">Berlebih</span>
            </div>
            <div className="h-full bg-[#9C4A2A] flex items-center justify-center transition-all" style={{ width: '41.7%' }}>
               <span className="text-[10px] sm:text-xs font-bold text-white px-1">Obesitas</span>
            </div>
          </div>

          {/* Labels below */}
          <div className="relative w-full h-6 mt-3 text-[11px] font-bold text-[#EDE0D0] font-mono opacity-60">
            <span className="absolute left-0 -translate-x-1/2">16</span>
            <span className="absolute left-[10.4%] -translate-x-1/2">18.5</span>
            <span className="absolute left-[37.5%] -translate-x-1/2">25</span>
            <span className="absolute left-[58.3%] -translate-x-1/2">30</span>
            <span className="absolute right-0 translate-x-1/2">40</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header Bar */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs items={[
          { label: 'Kesehatan', href: '/kesehatan' },
          { label: 'Kalkulator BMI' }
        ]} />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">Kalkulator BMI Ideal</h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">Asesmen tubuh komprehensif</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        {/* Left Side: Input Form */}
        <Card variant="default" className="lg:col-span-5 flex flex-col gap-8 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full h-full">
           <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
           
          <div className="relative z-10">
            <h2 className="text-2xl font-bold font-heading text-primary">Data Personal</h2>
            <p className="text-sm text-secondary font-body mt-2 leading-relaxed">Kami memproses data secara lokal di perangkat Anda.</p>
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

              {/* Gender Select */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={cn(
                    "flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all",
                    gender === 'male' ? "border-accent-1 bg-accent-1/5 text-accent-1" : "border-muted bg-white text-secondary hover:border-secondary/30"
                  )}
                >
                  <Mars className="w-8 h-8 mb-2" />
                  <span className="font-bold font-ui text-sm">Pria</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={cn(
                    "flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all",
                    gender === 'female' ? "border-accent-1 bg-accent-1/5 text-accent-1" : "border-muted bg-white text-secondary hover:border-secondary/30"
                  )}
                >
                  <Venus className="w-8 h-8 mb-2" />
                  <span className="font-bold font-ui text-sm">Wanita</span>
                </button>
              </div>

              <Input 
                id="age"
                label="Usia"
                type="number"
                placeholder="Misal: 25"
                suffix="Tahun"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="text-lg py-4 placeholder:opacity-40 rounded-xl"
                required
                min={2}
                max={120}
              />

              <Input 
                id="weight"
                label="Berat Badan"
                type="number"
                placeholder={system === 'metric' ? "Misal: 65" : "Misal: 145"}
                suffix={system === 'metric' ? "kg" : "lb"}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="text-lg py-4 placeholder:opacity-40 rounded-xl"
                required
                min={2}
                max={500}
              />
              
              {system === 'metric' ? (
                <Input 
                  id="height1"
                  label="Tinggi Badan"
                  type="number"
                  placeholder="Misal: 170"
                  suffix="cm"
                  value={heightRaw1}
                  onChange={(e) => setHeightRaw1(e.target.value)}
                  className="text-lg py-4 placeholder:opacity-40 rounded-xl"
                  required
                  min={2}
                  max={300}
                />
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    id="height1"
                    label="Tinggi (Kaki)"
                    type="number"
                    placeholder="Misal: 5"
                    suffix="ft"
                    value={heightRaw1}
                    onChange={(e) => setHeightRaw1(e.target.value)}
                    className="text-lg py-4 placeholder:opacity-40 rounded-xl"
                    required
                    min={2}
                    max={300}
                  />
                  <Input 
                    id="height2"
                    label="Tinggi (Inci)"
                    type="number"
                    placeholder="Misal: 7"
                    suffix="in"
                    value={heightRaw2}
                    onChange={(e) => setHeightRaw2(e.target.value)}
                    className="text-lg py-4 placeholder:opacity-40 rounded-xl"
                    required
                    min={0}
                    max={11}
                  />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold font-ui text-primary">Tingkat Aktivitas</label>
                <div className="relative">
                  <select
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                    className="w-full flex h-14 rounded-xl border bg-white px-4 py-3 text-[15px] transition-colors border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1 text-primary font-ui font-medium appearance-none"
                  >
                    <option value="sedentary">Jarang Berolahraga (Sedentary)</option>
                    <option value="light">Aktivitas Ringan (1-3 hari/minggu)</option>
                    <option value="moderate">Aktivitas Sedang (3-5 hari/minggu)</option>
                    <option value="active">Aktivitas Tinggi (6-7 hari/minggu)</option>
                    <option value="very_active">Aktivitas Sangat Tinggi (Atlet)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                    <svg className="h-4 w-4 text-secondary opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-accent-3-light text-accent-3 text-sm px-4 py-3 rounded-2xl border border-accent-3/20 font-bold flex items-center gap-2 shadow-sm">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}
            </div>

            <Button type="submit" variant="primary" className="py-5 text-lg mt-auto shadow-lg hover:shadow-xl group rounded-2xl w-full">
              Analisis Indeks
              <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1.5 transition-transform" />
            </Button>
          </form>
        </Card>

        {/* Right Side: Result Display */}
        <div className="lg:col-span-7 h-full">
          {result && theme ? (
            <Card variant="default" className={cn(
               "flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl transition-all duration-700 h-full animate-in fade-in zoom-in-95",
               theme.cardBg,
               theme.border,
               "ring-4 ring-inset", theme.ring
            )}>
              <div className={cn("absolute inset-0 bg-gradient-to-br pointer-events-none transition-colors", theme.gradient)} />
              
              <div className="relative z-10 flex flex-col items-center p-8 sm:p-14 h-full">
                 <div className="w-20 h-20 rounded-[1.5rem] bg-[#1A0E07] shadow-inner flex items-center justify-center mb-6 border border-white/10">
                   <IconResult className={cn("w-10 h-10", theme.accentText)} />
                 </div>
                 
                 <h3 className="text-sm font-bold text-[#EDE0D0] tracking-widest uppercase mb-2 opacity-80 text-center">Skor Indeks Massa Tubuh</h3>
                 <div className={cn("text-[5rem] sm:text-[7rem] font-black font-heading tracking-tighter leading-none mb-6 text-center drop-shadow-md", theme.text)}>
                   {result.score}
                 </div>
  
                 <div className={cn("px-6 py-2 rounded-full font-bold text-sm border shadow-sm mb-6 tracking-widest text-center bg-[#1A0E07]", theme.border, theme.accentText)}>
                   {result.category.toUpperCase()}
                 </div>
                 
                 <div className="bg-[#1A0E07]/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-inner text-center w-full relative mb-4">
                   <p className="text-base text-[#F5EDE3] font-body leading-relaxed">
                     {result.insight}
                   </p>
                 </div>

                 {renderBMIScale(result.score)}

                 {/* Additional Metrics Grid */}
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-auto">
                    <div className="bg-[#1A0E07]/40 border border-white/5 p-5 rounded-2xl flex flex-col items-center text-center shadow-inner hover:bg-[#1A0E07]/60 transition-colors">
                      <Scale className="w-6 h-6 text-[#C17A3A] mb-3 opacity-80" />
                      <span className="text-[11px] font-bold text-[#EDE0D0] uppercase tracking-wider mb-1 opacity-70">Berat Ideal</span>
                      <span className="text-base lg:text-lg font-black text-white font-heading tracking-tight">{result.idealWeightRange}</span>
                    </div>
                    <div className="bg-[#1A0E07]/40 border border-white/5 p-5 rounded-2xl flex flex-col items-center text-center shadow-inner hover:bg-[#1A0E07]/60 transition-colors">
                      <User className="w-6 h-6 text-[#4A7C59] mb-3 opacity-80" />
                      <span className="text-[11px] font-bold text-[#EDE0D0] uppercase tracking-wider mb-1 opacity-70">Lemak Tubuh</span>
                      <span className="text-base lg:text-lg font-black text-white font-heading tracking-tight">{result.bodyFatPercentage}%</span>
                    </div>
                    <div className="bg-[#1A0E07]/40 border border-white/5 p-5 rounded-2xl flex flex-col items-center text-center shadow-inner hover:bg-[#1A0E07]/60 transition-colors">
                      <Activity className="w-6 h-6 text-[#9C4A2A] mb-3 opacity-80" />
                      <span className="text-[11px] font-bold text-[#EDE0D0] uppercase tracking-wider mb-1 opacity-70">Kalori Harian</span>
                      <span className="text-base lg:text-lg font-black text-white font-heading tracking-tight">{result.dailyCalories} kcal</span>
                    </div>
                 </div>
              </div>
            </Card>
          ) : (
            <Card variant="default" className="flex flex-col items-center justify-center text-center p-12 h-full min-h-[400px] border-dashed border-2 bg-[#2C1A0E] border-[#7A5C42]/40 rounded-[2.5rem] transition-all relative overflow-hidden shadow-2xl text-[#F5EDE3]">
               {/* Grain Overlay */}
               <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none transition-opacity" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
               
               <div className="relative z-10 w-full flex justify-center mb-10 mt-4">
                 <div className="absolute inset-0 bg-[#C17A3A] blur-[80px] rounded-full opacity-15" />
                 <Image src="/bmi.svg" alt="BMI Calculator Illustration" width={400} height={300} className="w-full max-w-[280px] sm:max-w-[340px] h-auto object-contain relative z-10 select-none pointer-events-none drop-shadow-2xl" priority />
               </div>
               <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-3 tracking-tight relative z-10 px-4">Kalkulator Siap Digunakan</h3>
               <p className="text-[#EDE0D0] font-body max-w-sm text-base sm:text-lg leading-relaxed relative z-10 opacity-90 px-4">
                 Lengkapi data diri Anda pada formulir untuk memperoleh analisis medis standar akurat.
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
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C17A3A] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4A7C59] rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/3" />

              {/* Grain Overlay */}
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay transition-opacity" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
            </div>

            <div className="flex flex-col gap-16 lg:gap-24 relative z-10">
              
              {/* Header Section */}
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                <span className="text-[#C17A3A] font-bold tracking-widest uppercase text-xs mb-4 block">
                  Edukasi Kesehatan
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                  Memahami Indeks Massa Tubuh
                </h2>
                <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                  Hasil kalkulator BMI bukanlah vonis akhir, melainkan titik awal untuk mengenali kondisi tubuh Anda dan menentukan target kesehatan yang lebih baik.
                </p>
                
                {/* Pull Quote Box */}
                <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm max-w-2xl mx-auto text-left shadow-inner">
                  <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#C17A3A] shrink-0" />
                  <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug text-center sm:text-left">
                    "Menjaga berat badan ideal adalah bentuk investasi jangka panjang untuk kualitas hidup Anda."
                  </p>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex flex-col gap-16 mx-auto w-full">
                
                {/* 1. Cara Membaca Hasil */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">1</div>
                    <h3 className="text-2xl font-bold font-heading text-white">Kategori BMI</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Kurus */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors flex flex-col justify-between">
                      <div className="mb-4">
                        <span className="text-sm font-bold text-[#EDE0D0] font-mono bg-white/10 px-3 py-1 rounded-full">&lt; 18.5</span>
                      </div>
                      <h4 className="text-xl font-bold font-heading text-white mb-2">Kekurangan</h4>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed opacity-80">
                        Berat badan di bawah normal. Pertimbangkan untuk meningkatkan asupan kalori bernutrisi.
                      </p>
                    </div>

                    {/* Normal */}
                    <div className="p-6 rounded-2xl bg-[#4A7C59]/10 border border-[#4A7C59]/30 hover:border-[#4A7C59]/50 transition-colors flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A7C59]/20 rounded-full blur-xl" />
                      <div className="relative mb-4">
                        <span className="text-sm font-bold text-[#E8F5E9] font-mono bg-[#4A7C59]/30 px-3 py-1 rounded-full shadow-sm border border-[#4A7C59]/20">18.5 – 24.9</span>
                      </div>
                      <h4 className="relative text-xl font-bold font-heading text-[#E8F5E9] mb-2">Normal Ideal</h4>
                      <p className="relative text-[#E8F5E9]/80 font-body text-sm leading-relaxed">
                        Rentang optimal. Pertahankan pola makan seimbang dan aktivitas fisik.
                      </p>
                    </div>

                    {/* Berlebih */}
                    <div className="p-6 rounded-2xl bg-[#C17A3A]/10 border border-[#C17A3A]/30 hover:border-[#C17A3A]/50 transition-colors flex flex-col justify-between relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-[#C17A3A]/20 rounded-full blur-xl" />
                      <div className="relative mb-4">
                        <span className="text-sm font-bold text-[#FFF3E0] font-mono bg-[#C17A3A]/30 px-3 py-1 rounded-full shadow-sm border border-[#C17A3A]/20">25 – 29.9</span>
                      </div>
                      <h4 className="relative text-xl font-bold font-heading text-[#FFF3E0] mb-2">Berlebih</h4>
                      <p className="relative text-[#FFF3E0]/80 font-body text-sm leading-relaxed">
                        Beresiko bagi kesehatan. Mulai kurangi kalori harian dan tingkatkan olahraga.
                      </p>
                    </div>

                    {/* Obesitas */}
                    <div className="p-6 rounded-2xl bg-[#9C4A2A]/10 border border-[#9C4A2A]/30 hover:border-[#9C4A2A]/50 transition-colors flex flex-col justify-between relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-[#9C4A2A]/20 rounded-full blur-xl" />
                      <div className="relative mb-4">
                        <span className="text-sm font-bold text-[#FFF0EB] font-mono bg-[#9C4A2A]/30 px-3 py-1 rounded-full shadow-sm border border-[#9C4A2A]/20">≥ 30</span>
                      </div>
                      <h4 className="relative text-xl font-bold font-heading text-[#FFF0EB] mb-2">Obesitas</h4>
                      <p className="relative text-[#FFF0EB]/80 font-body text-sm leading-relaxed">
                        Berada di level bahaya. Sangat disarankan untuk berkonsultasi dengan ahli medis profesional.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 2. Rumus & Metode */}
                <section className="space-y-8">
                   <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">2</div>
                    <h3 className="text-2xl font-bold font-heading text-white">Metodologi</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div>
                      <p className="text-[#EDE0D0] font-body leading-relaxed text-lg mb-4 opacity-90">
                        Kalkulator ini menggunakan formula standar WHO yang diakui secara global, dikalibrasi ulang untuk standar BMI metrik Asia-Pasifik.
                      </p>
                      <ul className="space-y-3 font-body text-[#EDE0D0]">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                          <span>Mendukung sistem <strong>Metrik (kg/cm)</strong>.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                          <span>Mendukung sistem <strong>Imperial (lb/ft)</strong>.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#1A0E07] p-6 rounded-2xl border border-[#7A5C42]/30 shadow-sm relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                      <h5 className="font-bold text-sm text-surface uppercase tracking-widest mb-4 relative z-10">Formula Kalkulasi</h5>
                      <div className="bg-[#2C1A0E] p-4 rounded-xl flex items-center justify-center mb-3 border border-[#7A5C42]/40 relative z-10 shadow-inner">
                        <span className="font-mono font-bold text-lg text-[#F5EDE3] tracking-wide">
                          BMI = kg / m²
                        </span>
                      </div>
                      <p className="text-xs text-surface font-body text-center mt-2 relative z-10">
                        (Atau `(lb × 703) / inch²` untuk sistem imperial)
                      </p>
                    </div>
                  </div>
                </section>

                {/* 3. Limitations */}
                <section className="space-y-8">
                   <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">3</div>
                    <h3 className="text-2xl font-bold font-heading text-white">Batasan Akurasi</h3>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-6 lg:p-8 rounded-[2rem] space-y-6 backdrop-blur-sm">
                    <p className="text-lg font-body text-[#F5EDE3] leading-relaxed">
                      Meskipun luas digunakan, <strong>BMI bukanlah ukuran yang sempurna</strong>. Metode ini tidak secara langsung mengukur persentase lemak tubuh dan bisa jadi kurang akurat untuk:
                    </p>
                    
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-[#1A0E07]/60 border border-white/5 focus-within:ring-2 transition-all">
                        <h6 className="font-bold text-white mb-1 border-l-2 border-[#C17A3A] pl-3">Atlet</h6>
                        <p className="text-sm font-body text-[#EDE0D0] opacity-80 pl-3">Massa otot yang berat dapat menghasilkan BMI yang tinggi.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#1A0E07]/60 border border-white/5 transition-all">
                        <h6 className="font-bold text-white mb-1 border-l-2 border-[#4A7C59] pl-3">Lansia</h6>
                        <p className="text-sm font-body text-[#EDE0D0] opacity-80 pl-3">Cenderung kehilangan massa otot seiring bertambahnya usia.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#1A0E07]/60 border border-white/5 transition-all">
                        <h6 className="font-bold text-white mb-1 border-l-2 border-[#9C4A2A] pl-3">Anak-anak</h6>
                        <p className="text-sm font-body text-[#EDE0D0] opacity-80 pl-3">Harus menggunakan persentil umur dan jenis kelamin khusus.</p>
                      </div>
                    </div>
                  </div>
                </section>

              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedHealthTools currentPath="/kesehatan/bmi" />
    </div>
  );
}
