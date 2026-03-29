import { Button } from '@/ui/Button';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2, Wallet, Moon, Timer } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-6rem)] py-12 lg:py-0 overflow-visible flex flex-col lg:flex-row items-center gap-12 lg:gap-8 w-full">
      {/* Editorial Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[500px] h-[500px] bg-accent-1-light rounded-full blur-[100px] opacity-70 pointer-events-none" />
      
      {/* Text Content */}
      <div className="relative z-10 flex flex-col gap-6 lg:gap-8 lg:pr-8 w-full lg:w-1/2">
        <div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-heading font-extrabold text-primary leading-[1.05] tracking-tight w-full">
            Tools gratis untuk <span className="text-accent-1">semua</span> <br className="hidden sm:block" />
            kebutuhan kamu.
          </h1>
        </div>
        
        <p className="font-body text-lg sm:text-xl text-secondary w-full max-w-[500px] leading-relaxed">
          Platform esensial berisi kumpulan alat bantu harian gratis untuk pelajar, pekerja, hingga urusan islami dan finansial. Semuanya cepat, sederhana, dan dirancang khusus dengan metrik Indonesia.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
          <Link href="#kategori" className="w-full sm:w-auto">
             <Button variant="primary" className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 sm:py-5 text-lg shadow-md hover:shadow-lg">
               Mulai Eksplorasi
               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </Button>
          </Link>
          <Link href="#kategori" className="w-full sm:w-auto">
             <Button variant="secondary" className="w-full sm:w-auto px-8 py-4 sm:py-5 text-lg bg-surface/50 backdrop-blur-sm">
               Lihat Katalog Tools
             </Button>
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-6 mt-2 pt-6 border-t border-muted/60 w-full max-w-[400px]">
          <div className="flex items-center gap-2 text-sm font-ui text-secondary opacity-80">
            <CheckCircle2 className="w-4 h-4 text-accent-2" />
            <span>100% Gratis Selamanya</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-ui text-secondary opacity-80">
            <CheckCircle2 className="w-4 h-4 text-accent-2" />
            <span>Aman Tanpa Login</span>
          </div>
        </div>
      </div>

      {/* Visual / Abstract Composition Area */}
      <div className="w-full lg:w-1/2 relative z-10 flex justify-center lg:justify-end py-10">
        <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px]">
          {/* Aesthetic geometric shapes mimicking 'Nusantara' earthy vibes */}
          <div className="absolute inset-0 bg-accent-1-light rounded-[3rem] rotate-6 border border-white/50 shadow-sm transition-transform duration-700 hover:rotate-12" />
          <div className="absolute inset-0 bg-muted rounded-[3rem] -rotate-3 border border-white/50 shadow-sm transition-transform duration-700 hover:-rotate-6" />
          
          {/* Floating Composition instead of exactly 1 static card */}
          <div className="absolute inset-0 transition-transform duration-500 hover:scale-[1.02]">
            
            {/* Floating Card 1: Split Bill */}
            <div className="absolute top-4 sm:top-8 left-0 sm:left-4 bg-white p-4 sm:p-5 rounded-2xl shadow-lg border border-muted w-44 sm:w-52 hover:-translate-y-2 transition-transform duration-500 z-20">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-accent-3-light rounded-xl flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-accent-3" />
                </div>
                <span className="text-[10px] font-bold px-2 py-1 bg-surface text-secondary rounded-full uppercase">Finansial</span>
              </div>
              <div className="font-bold text-primary font-heading">Split Bill</div>
              <div className="text-xs text-secondary mt-1">Bagi tagihan adil.</div>
            </div>

            {/* Floating Card 2: Jadwal Sholat */}
            <div className="absolute bottom-4 sm:bottom-8 left-8 sm:left-12 bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-muted/50 w-48 sm:w-56 hover:-translate-y-2 transition-transform duration-500 z-30">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-accent-2-light rounded-xl flex items-center justify-center">
                  <Moon className="w-5 h-5 text-accent-2" />
                </div>
                <span className="text-[10px] font-bold px-2 py-1 bg-surface text-secondary rounded-full uppercase">Religi</span>
              </div>
              <div className="font-bold text-primary font-heading">Jadwal Sholat</div>
              <div className="text-xs text-secondary mt-1">Otomatis via GPS.</div>
              <div className="mt-4 flex gap-1.5 h-1.5 w-full bg-surface rounded-full overflow-hidden">
                <div className="h-full bg-accent-2 w-1/3 rounded-full" />
              </div>
            </div>

            {/* Floating Card 3: Pomodoro Timer */}
            <div className="absolute top-1/2 right-0 sm:-right-4 -translate-y-1/2 bg-white p-5 rounded-3xl shadow-2xl border border-muted w-52 sm:w-60 hover:-translate-y-2 transition-transform duration-500 z-40">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-accent-1-light rounded-xl flex items-center justify-center border border-white">
                  <Timer className="w-6 h-6 text-accent-1" />
                </div>
                <div>
                  <div className="font-bold text-primary font-heading leading-tight">Sesi Pomodoro</div>
                  <div className="text-[10px] font-bold text-accent-1 uppercase opacity-80 mt-0.5 tracking-wider">Fokus Kerja</div>
                </div>
              </div>
              <div className="text-4xl font-black text-primary font-heading tracking-tighter text-center py-3 bg-surface/50 rounded-xl border border-muted/50">
                25<span className="text-secondary/50 animate-pulse">:</span>00
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
