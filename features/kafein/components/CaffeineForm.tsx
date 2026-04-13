"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { Select } from "@/ui/Select";
import { SegmentedControl } from "@/ui/SegmentedControl";
import {
  Coffee,
  User,
  Trash2,
  Plus,
  ShieldAlert,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { CaffeineContextType, UserProfile } from "../types";
import { CAFFEINE_SOURCES, PROFILE_LABELS } from "../utils";
import { WEIGHT_UNIT } from "@/lib/constants";

export const CaffeineForm: React.FC<{ hook: CaffeineContextType }> = ({
  hook,
}) => {
  const {
    data,
    updateData,
    error,
    handleCalculate,
    handleReset,
    addEntry,
    removeEntry,
    updateEntry,
  } = hook;

  return (
    <Card
      variant="default"
      className="lg:col-span-6 flex flex-col gap-6 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
          <Coffee className="w-6 h-6 text-[#C17A3A]" />
          Sumber Kafein Hari Ini
        </h2>
        <p className="text-sm text-secondary font-body mt-2 leading-relaxed">
          Tambahkan semua minuman dan makanan berkafein yang Anda konsumsi hari
          ini.
        </p>
      </div>

      <form
        onSubmit={handleCalculate}
        className="flex flex-col gap-6 relative z-10"
      >
        {/* Profile */}
        <div className="flex flex-col gap-2">
          <SegmentedControl
            label="Profil Pengguna"
            options={[
              { value: "adult", label: "Dewasa" },
              { value: "pregnant", label: "Hamil/Menyusui" },
              { value: "teen", label: "Remaja" },
            ]}
            value={data.profile}
            onChange={(val) => updateData("profile", val as UserProfile)}
          />
          <p className="text-[11px] text-secondary opacity-70 font-body">
            Batas harian: {PROFILE_LABELS[data.profile]}
          </p>
        </div>

        {/* Caffeine Sources */}
        <div className="flex flex-col gap-3">
          {data.entries.map((entry, idx) => {
            const source = CAFFEINE_SOURCES.find(
              (s) => s.id === entry.sourceId,
            );
            return (
              <div
                key={entry.id}
                className="bg-surface rounded-2xl p-4 border border-muted/50 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                    Sumber #{idx + 1}
                  </span>
                  {data.entries.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEntry(entry.id)}
                      className="text-accent-3 hover:text-accent-3/80 transition p-1 rounded-lg hover:bg-accent-3/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Source dropdown */}
                <Select
                  value={entry.sourceId}
                  onChange={(val) =>
                    updateEntry(entry.id, {
                      sourceId: val,
                      customMg: undefined,
                    })
                  }
                  options={CAFFEINE_SOURCES.map((s) => ({
                    value: s.id,
                    label: `${s.name}${s.mgPerUnit > 0 ? ` (${s.mgPerUnit}mg)` : ""}`,
                  }))}
                  className="[&>label]:sr-only"
                  label={`Pilih sumber kafein ke-${idx + 1}`}
                  size="sm"
                />

                <div className="flex gap-3">
                  {/* Quantity */}
                  <div className="flex-1">
                    <div className="relative flex items-center border border-muted bg-white rounded-xl h-11 focus-within:ring-2 focus-within:ring-[#C17A3A]/40 overflow-hidden transition-colors shadow-sm">
                      <Input
                        type="number"
                        aria-label={`Jumlah konsumsi sumber kafein ke-${idx + 1}`}
                        placeholder="1"
                        min={0.5}
                        step="0.5"
                        value={entry.quantity}
                        onChange={(e) =>
                          updateEntry(entry.id, {
                            quantity: Number(e.target.value),
                          })
                        }
                        className="flex-1 h-full px-3 py-2 text-sm font-bold border-0 focus:ring-0"
                        required
                      />
                      <span className="pr-3 text-xs text-secondary font-bold select-none opacity-50">
                        {source?.unit ?? "sajian"}
                      </span>
                    </div>
                  </div>

                  {/* Custom mg */}
                  {entry.sourceId === "custom" && (
                    <div className="flex-1">
                      <div className="relative flex items-center border border-muted bg-white rounded-xl h-11 focus-within:ring-2 focus-within:ring-[#C17A3A]/40 overflow-hidden transition-colors shadow-sm">
                        <Input
                          type="number"
                          aria-label={`Kafein kustom dalam miligram untuk sumber ke-${idx + 1}`}
                          placeholder="Kafein (mg)"
                          min={1}
                          value={entry.customMg ?? ""}
                          onChange={(e) =>
                            updateEntry(entry.id, {
                              customMg: Number(e.target.value),
                            })
                          }
                          className="flex-1 h-full px-3 py-2 text-sm font-bold border-0 focus:ring-0"
                          required
                        />
                        <span className="pr-3 text-xs text-secondary font-bold select-none opacity-50">
                          mg
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Per-entry subtotal badge */}
                  {entry.sourceId !== "custom" && (
                    <div className="flex items-center justify-center bg-[#C17A3A]/10 border border-[#C17A3A]/20 rounded-xl px-3 min-w-[64px]">
                      <span className="text-sm font-black text-[#C17A3A] font-heading">
                        {Math.round((source?.mgPerUnit ?? 0) * entry.quantity)}
                      </span>
                      <span className="text-[10px] text-[#C17A3A] ml-1 opacity-70">
                        mg
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <button
            type="button"
            onClick={addEntry}
            className="flex items-center justify-center gap-2 p-3 rounded-2xl border-2 border-dashed border-muted hover:border-[#C17A3A]/40 hover:bg-[#C17A3A]/5 text-secondary hover:text-[#C17A3A] transition-all font-bold text-sm"
          >
            <Plus className="w-4 h-4" /> Tambah Sumber Kafein
          </button>
        </div>

        {/* Optional: Body Weight */}
        <details className="group [&_summary::-webkit-details-marker]:hidden bg-white rounded-2xl border border-muted/50 overflow-hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 font-bold hover:bg-white/50 transition-colors">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-[#C17A3A]" />
              <span className="text-sm font-medium text-primary">
                Berat Badan (Opsional)
              </span>
            </div>
            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-secondary opacity-50"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>
          <div className="px-4 pb-5 space-y-4 border-t border-muted/30 pt-4">
            <p className="text-xs text-secondary font-body opacity-70">
              Masukkan berat badan untuk mendapatkan analisis kafein per
              kilogram berat badan (batas aman: 6mg/kg).
            </p>
            <div className="">
              <SegmentedControl
                label="Satuan Berat"
                options={Object.values(WEIGHT_UNIT).map((u) => ({
                  value: u,
                  label: u.toUpperCase(),
                }))}
                value={data.bodyWeightUnit}
                onChange={(val) => updateData("bodyWeightUnit", val)}
              />
              <div className="mt-2 relative flex items-center border border-muted bg-white rounded-xl h-10 focus-within:ring-2 focus-within:ring-[#C17A3A]/40 overflow-hidden flex-1 transition-colors shadow-sm">
                <Input
                  type="number"
                  aria-label="Berat badan pengguna"
                  placeholder={data.bodyWeightUnit === "kg" ? "65" : "145"}
                  min={1}
                  value={data.bodyWeight}
                  onChange={(e) => updateData("bodyWeight", e.target.value)}
                  className="flex-1 h-full px-3 py-2 text-sm font-bold border-0 focus:ring-0"
                />
                <span className="pr-3 text-xs text-secondary font-bold select-none opacity-50">
                  {data.bodyWeightUnit}
                </span>
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

        <div className="flex gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            className="py-4 px-5 rounded-2xl border border-muted shrink-0"
          >
            <RefreshCw className="w-5 h-5" />
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="py-4 text-base flex-1 shadow-lg hover:shadow-xl group rounded-2xl !bg-[#C17A3A] hover:!bg-[#a4622a] text-white outline-none ring-0"
          >
            Hitung Kafein Saya
            <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1.5 transition-transform" />
          </Button>
        </div>
      </form>
    </Card>
  );
};
