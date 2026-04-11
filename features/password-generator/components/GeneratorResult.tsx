"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { getStrengthColor } from "../utils";
import { GeneratorResultProps } from "../types";
import {
  Eye,
  EyeOff,
  Copy,
  Check,
  RefreshCcw,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const GeneratorResult: React.FC<GeneratorResultProps> = ({
  value,
  entropy,
  strength,
  showPassword,
  setShowPassword,
  isCopied,
  copyToClipboard,
  generate,
}) => {
  const getStrengthPercentage = () => {
    // Max visual entropy at 100 for percentage scale
    const val = Math.min(Math.max((entropy / 100) * 100, 5), 100);
    return `${val}%`;
  };

  const getStrengthLabel = () => {
    switch (strength) {
      case "Weak":
        return "Lemah";
      case "Medium":
        return "Sedang";
      case "Strong":
        return "Kuat";
      case "Very Strong":
        return "Sangat Kuat";
    }
  };

  return (
    <Card
      variant="default"
      className={cn(
        "flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl transition-all duration-700 h-full p-6 sm:p-10",
        "bg-[#2C1A0E] ring-4 ring-inset ring-[#C17A3A]/30 border-[#C17A3A]/30 text-[#F5EDE3]",
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10 flex flex-col h-full gap-8">
        {/* Header & Status */}
        <div className="flex items-center justify-between pb-4 border-b border-[#C17A3A]/20">
          <div className="flex items-center gap-3">
            {strength === "Very Strong" || strength === "Strong" ? (
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            ) : (
              <ShieldAlert className="w-6 h-6 text-[#C17A3A]" />
            )}
            <h3 className="text-xl font-bold font-heading text-white">
              Hasil Sandi
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-ui text-[#EDE0D0]/60 uppercase tracking-widest hidden sm:inline-block">
              Kekuatan:
            </span>
            <div
              className={cn(
                "px-3 py-1 rounded-full text-xs font-bold font-ui text-[#1A0E07]",
                getStrengthColor(strength),
              )}
            >
              {getStrengthLabel()}
            </div>
          </div>
        </div>

        {/* Display Area */}
        <div className="flex flex-col gap-6">
          <div className="relative group">
            <div className="bg-[#1A0E07]/60 border-2 border-[#7A5C42]/50 p-6 rounded-3xl flex items-center justify-between min-h-[100px] break-all overflow-hidden relative transition-colors group-hover:border-[#C17A3A]/80">
              <div
                className={cn(
                  "font-mono text-2xl sm:text-3xl lg:text-4xl pr-12 transition-all select-all outline-none",
                  showPassword
                    ? "text-white blur-none"
                    : "text-[#EDE0D0] blur-[8px] select-none scale-95",
                )}
              >
                {showPassword ? value : "••••••••••••••••••••••••"}
              </div>

              {/* Actions inside box */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-2.5 rounded-xl bg-surface/10 hover:bg-surface/20 text-[#EDE0D0] transition-colors"
                  title={showPassword ? "Sembunyikan" : "Tampilkan"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => copyToClipboard()}
                  className={cn(
                    "p-2.5 rounded-xl transition-all",
                    isCopied
                      ? "bg-green-500/20 text-green-400"
                      : "bg-[#C17A3A]/20 text-[#C17A3A] hover:bg-[#C17A3A]/40 hover:text-white",
                  )}
                  title="Salin Sandi"
                >
                  {isCopied ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-xs font-ui text-[#EDE0D0]/80">
              <span>Metrik Entropi</span>
              <span className="tabular-nums font-bold text-white">
                {entropy} bits
              </span>
            </div>
            <div className="h-3 w-full bg-[#1A0E07] rounded-full overflow-hidden border border-[#7A5C42]/30 p-0.5">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-1000",
                  getStrengthColor(strength),
                )}
                style={{ width: getStrengthPercentage() }}
              />
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-2">
          <button
            onClick={generate}
            className="w-full h-16 bg-[#C17A3A] hover:bg-[#A96930] text-white flex items-center justify-center gap-3 font-black font-heading text-lg rounded-2xl shadow-lg shadow-[#C17A3A]/20 transition-all active:scale-[0.98]"
          >
            <RefreshCcw className="w-6 h-6" />
            Buat Sandi Baru
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(193, 122, 58, 0.4);
          border-radius: 4px;
        }
      `}</style>
    </Card>
  );
};
