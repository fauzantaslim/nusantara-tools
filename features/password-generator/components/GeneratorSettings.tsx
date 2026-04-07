"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { GeneratorMode, PasswordOptions, PassphraseOptions } from "../utils";
import { KeyRound, Type, ShieldAlert, Hash } from "lucide-react";
import { cn } from "@/lib/utils";

interface GeneratorSettingsProps {
  mode: GeneratorMode;
  setMode: (mode: GeneratorMode) => void;
  passwordOptions: PasswordOptions;
  setPasswordOptions: React.Dispatch<React.SetStateAction<PasswordOptions>>;
  passphraseOptions: PassphraseOptions;
  setPassphraseOptions: React.Dispatch<React.SetStateAction<PassphraseOptions>>;
}

export const GeneratorSettings: React.FC<GeneratorSettingsProps> = ({
  mode,
  setMode,
  passwordOptions,
  setPasswordOptions,
  passphraseOptions,
  setPassphraseOptions,
}) => {
  const togglePasswordOption = (key: keyof PasswordOptions) => {
    setPasswordOptions((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      // Prevent unchecking the last option
      if (
        !next.uppercase &&
        !next.lowercase &&
        !next.numbers &&
        !next.symbols
      ) {
        return prev;
      }
      return next;
    });
  };

  const togglePassphraseOption = (key: keyof PassphraseOptions) => {
    if (key === "wordCount" || key === "separator") return; // handled separately
    setPassphraseOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Card
      variant="default"
      className="flex flex-col gap-6 sm:gap-8 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* Mode Switcher */}
      <div className="flex bg-surface/50 p-1.5 rounded-2xl border border-muted relative z-10">
        <button
          onClick={() => setMode("password")}
          className={cn(
            "flex-1 flex justify-center items-center gap-2 py-3 px-4 rounded-xl font-bold font-ui text-sm transition-all duration-300",
            mode === "password"
              ? "bg-white shadow-sm text-primary"
              : "text-secondary hover:text-primary hover:bg-white/50",
          )}
        >
          <Hash className="w-4 h-4" /> Karakter Acak
        </button>
        <button
          onClick={() => setMode("passphrase")}
          className={cn(
            "flex-1 flex justify-center items-center gap-2 py-3 px-4 rounded-xl font-bold font-ui text-sm transition-all duration-300",
            mode === "passphrase"
              ? "bg-white shadow-sm text-primary"
              : "text-secondary hover:text-primary hover:bg-white/50",
          )}
        >
          <Type className="w-4 h-4" /> Passphrase
        </button>
      </div>

      {mode === "password" ? (
        <div className="flex flex-col gap-8 relative z-10 animate-in fade-in slide-in-from-right-4 duration-300">
          {/* Length Slider */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold font-ui text-primary flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#C17A3A]" />
                Panjang Sandi
              </label>
              <div className="px-3 py-1 bg-surface font-bold font-heading text-primary rounded-lg tabular-nums">
                {passwordOptions.length}
              </div>
            </div>
            <input
              type="range"
              min={4}
              max={64}
              value={passwordOptions.length}
              onChange={(e) =>
                setPasswordOptions({
                  ...passwordOptions,
                  length: parseInt(e.target.value),
                })
              }
              className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-[#C17A3A]"
            />
          </div>

          {/* Character Toggles */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold font-ui text-primary mb-1">
              Karakter Termasuk
            </label>
            {[
              { id: "uppercase", label: "Huruf Besar (A-Z)" },
              { id: "lowercase", label: "Huruf Kecil (a-z)" },
              { id: "numbers", label: "Angka (0-9)" },
              { id: "symbols", label: "Simbol (!@#$)" },
            ].map((opt) => (
              <label
                key={opt.id}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group hover:bg-surface/50",
                  passwordOptions[opt.id as keyof PasswordOptions]
                    ? "border-[#C17A3A]/30 bg-surface/30"
                    : "border-muted",
                )}
              >
                <span
                  className={cn(
                    "font-ui font-medium select-none transition-colors",
                    passwordOptions[opt.id as keyof PasswordOptions]
                      ? "text-primary"
                      : "text-secondary group-hover:text-primary",
                  )}
                >
                  {opt.label}
                </span>
                <div
                  className={cn(
                    "w-6 h-6 rounded-md flex items-center justify-center transition-all border",
                    passwordOptions[opt.id as keyof PasswordOptions]
                      ? "bg-[#C17A3A] border-[#C17A3A]"
                      : "bg-surface border-muted",
                  )}
                >
                  {passwordOptions[opt.id as keyof PasswordOptions] && (
                    <svg
                      viewBox="0 0 14 14"
                      fill="none"
                      className="w-4 h-4 text-white"
                    >
                      <path
                        d="M3.5 7L6 9.5L10.5 4.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                {/* Hidden Checkbox for A11y */}
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={
                    passwordOptions[opt.id as keyof PasswordOptions] as boolean
                  }
                  onChange={() =>
                    togglePasswordOption(opt.id as keyof PasswordOptions)
                  }
                />
              </label>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8 relative z-10 animate-in fade-in slide-in-from-left-4 duration-300">
          {/* Word Count Slider */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold font-ui text-primary flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#C17A3A]" />
                Jumlah Kata
              </label>
              <div className="px-3 py-1 bg-surface font-bold font-heading text-primary rounded-lg tabular-nums">
                {passphraseOptions.wordCount}
              </div>
            </div>
            <input
              type="range"
              min={3}
              max={15}
              value={passphraseOptions.wordCount}
              onChange={(e) =>
                setPassphraseOptions({
                  ...passphraseOptions,
                  wordCount: parseInt(e.target.value),
                })
              }
              className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-[#C17A3A]"
            />
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-sm font-bold font-ui text-primary mb-1">
              Gaya Pemisah
            </label>
            <div className="grid grid-cols-4 gap-2">
              {["-", "_", ".", " "].map((sep) => (
                <button
                  key={sep}
                  onClick={() =>
                    setPassphraseOptions((prev) => ({
                      ...prev,
                      separator: sep,
                    }))
                  }
                  className={cn(
                    "py-3 rounded-xl border font-bold font-heading text-lg transition-all",
                    passphraseOptions.separator === sep
                      ? "bg-[#C17A3A] text-white border-[#C17A3A] shadow-md shadow-[#C17A3A]/20"
                      : "bg-surface border-muted text-secondary hover:text-primary",
                  )}
                >
                  {sep === " " ? "Spasi" : sep}
                </button>
              ))}
            </div>
          </div>

          {/* Passphrase Toggles */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold font-ui text-primary mb-1">
              Modifier
            </label>
            {[
              { id: "capitalize", label: "Kapitalisasi Kata (Title Case)" },
              { id: "includeNumber", label: "Tambahkan Satu Angka Ekstra" },
            ].map((opt) => (
              <label
                key={opt.id}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group hover:bg-surface/50",
                  (passphraseOptions[
                    opt.id as keyof PassphraseOptions
                  ] as boolean)
                    ? "border-[#C17A3A]/30 bg-surface/30"
                    : "border-muted",
                )}
              >
                <span
                  className={cn(
                    "font-ui font-medium select-none transition-colors",
                    (passphraseOptions[
                      opt.id as keyof PassphraseOptions
                    ] as boolean)
                      ? "text-primary"
                      : "text-secondary group-hover:text-primary",
                  )}
                >
                  {opt.label}
                </span>
                <div
                  className={cn(
                    "w-6 h-6 rounded-md flex items-center justify-center transition-all border",
                    (passphraseOptions[
                      opt.id as keyof PassphraseOptions
                    ] as boolean)
                      ? "bg-[#C17A3A] border-[#C17A3A]"
                      : "bg-surface border-muted",
                  )}
                >
                  {(passphraseOptions[
                    opt.id as keyof PassphraseOptions
                  ] as boolean) && (
                    <svg
                      viewBox="0 0 14 14"
                      fill="none"
                      className="w-4 h-4 text-white"
                    >
                      <path
                        d="M3.5 7L6 9.5L10.5 4.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                {/* Hidden Checkbox for A11y */}
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={
                    passphraseOptions[
                      opt.id as keyof PassphraseOptions
                    ] as boolean
                  }
                  onChange={() =>
                    togglePassphraseOption(opt.id as keyof PassphraseOptions)
                  }
                />
              </label>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
