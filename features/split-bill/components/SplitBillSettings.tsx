"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { CurrencyInput } from "@/ui/CurrencyInput";
import { ReceiptUploader } from "./ReceiptUploader";
import { Person, SplitMode } from "../types";
import { cn } from "@/lib/utils";
import {
  Settings,
  Users,
  Camera,
  Edit3,
  Plus,
  Trash2,
  Percent,
} from "lucide-react";

interface SplitBillSettingsProps {
  mode: SplitMode;
  setMode: (m: SplitMode) => void;
  people: Person[];
  addPerson: (name: string) => void;
  removePerson: (id: string) => void;
  clearPeople: () => void;
  manualSubTotal: number;
  setManualSubTotal: (val: number) => void;
  taxPercent: number;
  setTaxPercent: (val: number) => void;
  servicePercent: number;
  setServicePercent: (val: number) => void;
  onFileSelect: (file: File) => void;
  isProcessingOcr: boolean;
  ocrProgress: number;
  ocrError: string | null;
}

export const SplitBillSettings: React.FC<SplitBillSettingsProps> = ({
  mode,
  setMode,
  people,
  addPerson,
  removePerson,
  clearPeople,
  manualSubTotal,
  setManualSubTotal,
  taxPercent,
  setTaxPercent,
  servicePercent,
  setServicePercent,
  onFileSelect,
  isProcessingOcr,
  ocrProgress,
  ocrError,
}) => {
  const handleAddPerson = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    if (name && name.trim().length > 0) {
      addPerson(name.trim());
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <Card
      variant="default"
      className="flex flex-col gap-8 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#C17A3A]" />
          Pengaturan Tagihan
        </h2>
        <p className="text-sm text-secondary font-body mt-2 leading-relaxed">
          Pilih mode perhitungan dan tentukan siapa saja yang ikut patungan.
        </p>
      </div>

      <div className="flex flex-col gap-8 relative z-10">
        {/* Mode Toggles */}
        <div className="grid grid-cols-2 gap-3 bg-surface p-1.5 rounded-2xl border border-muted/50">
          <button
            onClick={() => setMode("manual")}
            className={cn(
              "px-4 py-3 rounded-xl transition-all text-sm font-bold font-ui flex items-center justify-center gap-2",
              mode === "manual"
                ? "bg-white text-[#C17A3A] shadow-sm"
                : "text-secondary hover:text-primary",
            )}
            disabled={isProcessingOcr}
          >
            <Edit3 className="w-4 h-4" /> Input Manual
          </button>
          <button
            onClick={() => setMode("ocr")}
            className={cn(
              "px-4 py-3 rounded-xl transition-all text-sm font-bold font-ui flex items-center justify-center gap-2",
              mode === "ocr"
                ? "bg-[#C17A3A] text-white shadow-sm shadow-[#C17A3A]/20"
                : "text-secondary hover:text-primary",
            )}
            disabled={isProcessingOcr}
          >
            <Camera className="w-4 h-4 border-current" /> Scan Struk
          </button>
        </div>

        {/* Dynamic Section based on Mode */}
        {mode === "ocr" ? (
          <ReceiptUploader
            onFileSelect={onFileSelect}
            isProcessing={isProcessingOcr}
            progress={ocrProgress}
            error={ocrError}
          />
        ) : (
          <div className="flex flex-col gap-6 p-6 bg-surface/50 rounded-3xl border border-muted/50">
            <CurrencyInput
              label="Total Tagihan"
              value={manualSubTotal.toString()}
              onChange={(val) => setManualSubTotal(parseInt(val) || 0)}
              placeholder="150.000"
            />
          </div>
        )}

        {/* Global Taxes & Fees */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold font-ui text-secondary flex items-center gap-2">
              <Percent className="w-3 h-3 text-red-500" /> PB1 / Pajak (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={taxPercent}
              onChange={(e) => setTaxPercent(parseFloat(e.target.value) || 0)}
              className="w-full h-12 bg-white border border-muted rounded-xl px-4 text-sm font-bold text-primary focus:ring-2 focus:ring-red-500/20 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold font-ui text-secondary flex items-center gap-2">
              <Percent className="w-3 h-3 text-blue-500" /> Service Charge (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={servicePercent}
              onChange={(e) =>
                setServicePercent(parseFloat(e.target.value) || 0)
              }
              className="w-full h-12 bg-white border border-muted rounded-xl px-4 text-sm font-bold text-primary focus:ring-2 focus:ring-blue-500/20 outline-none"
            />
          </div>
        </div>

        {/* People Manager */}
        <div className="flex flex-col gap-4 pt-4 border-t border-muted/50">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold font-ui text-primary uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4" /> Teman Patungan ({people.length})
            </label>
            {people.length > 0 && (
              <button
                type="button"
                onClick={clearPeople}
                className="text-[10px] font-bold text-red-500 hover:text-red-600 transition-colors bg-red-50 hover:bg-red-100 px-3 py-1 rounded-full uppercase tracking-wider"
              >
                Clear All
              </button>
            )}
          </div>

          <form onSubmit={handleAddPerson} className="flex gap-2">
            <input
              type="text"
              name="name"
              placeholder="Nama Teman"
              className="flex-1 h-12 bg-white border border-muted rounded-xl px-4 text-sm focus:ring-2 focus:ring-[#C17A3A]/20 outline-none"
              autoComplete="off"
              disabled={people.length >= 50}
            />
            <button
              type="submit"
              disabled={people.length >= 50}
              className="h-12 w-12 flex items-center justify-center bg-primary text-white rounded-xl hover:bg-opacity-90 disabled:opacity-50 transition-all font-bold"
            >
              <Plus className="w-5 h-5" />
            </button>
          </form>

          <div className="flex flex-row flex-wrap gap-2 mt-2 max-h-48 overflow-y-auto">
            {people.map((p) => (
              <div
                key={p.id}
                className="bg-white border rounded-lg pl-3 pr-1 py-1.5 flex items-center gap-2 text-sm font-medium"
              >
                <span>{p.name}</span>
                <button
                  type="button"
                  onClick={() => removePerson(p.id)}
                  className="p-1 text-secondary hover:text-red-500 transition-colors rounded-md hover:bg-red-50"
                  aria-label={`Hapus ${p.name}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {people.length === 0 && (
              <p className="text-xs text-secondary italic">
                Belum ada orang. Tambahkan teman untuk mulai.
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
