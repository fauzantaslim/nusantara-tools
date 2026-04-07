"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { Input } from "@/ui/Input";
import { Button } from "@/ui/Button";
import { QrType } from "../utils";
import { Link2, Type, Mail, Phone, RefreshCcw, Palette } from "lucide-react";

interface QrFormProps {
  activeTab: QrType;
  setActiveTab: (val: QrType) => void;
  inputData: any;
  updateInput: (k: any, v: string) => void;
  options: any;
  updateOptions: (k: any, v: string) => void;
  errors: Record<string, string>;
  resetForm: () => void;
}

const TABS: { id: QrType; label: string; icon: React.ReactNode }[] = [
  { id: "url", label: "URL", icon: <Link2 className="w-4 h-4" /> },
  { id: "text", label: "Teks", icon: <Type className="w-4 h-4" /> },
  { id: "email", label: "Email", icon: <Mail className="w-4 h-4" /> },
  { id: "phone", label: "Telepon", icon: <Phone className="w-4 h-4" /> },
];

export const QrForm: React.FC<QrFormProps> = ({
  activeTab,
  setActiveTab,
  inputData,
  updateInput,
  options,
  updateOptions,
  errors,
  resetForm,
}) => {
  return (
    <Card
      variant="default"
      className="flex flex-col gap-6 sm:gap-8 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* Tabs */}
      <div className="relative z-10 flex border-b border-muted overflow-x-auto custom-scrollbar pb-2 pt-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all font-bold font-ui text-sm whitespace-nowrap ${
              activeTab === tab.id
                ? "border-[#C17A3A] text-primary"
                : "border-transparent text-secondary hover:text-primary hover:border-muted"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Forms */}
      <div className="relative z-10 min-h-[220px]">
        {activeTab === "url" && (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <Input
              label="URL Panjang/Tautan"
              placeholder="https://contoh.com/halaman"
              value={inputData.url}
              onChange={(e) => updateInput("url", e.target.value)}
              error={errors.url}
            />
          </div>
        )}

        {activeTab === "text" && (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-sm font-ui font-medium text-primary">
                Teks Bebas
              </label>
              <textarea
                rows={4}
                placeholder="Ketik teks di sini..."
                value={inputData.text}
                onChange={(e) => updateInput("text", e.target.value)}
                className={`w-full px-4 py-3 rounded-md border bg-white text-primary font-ui text-base focus:outline-none focus:ring-2 focus:ring-accent-1 focus:border-transparent transition-all duration-200 resize-none ${errors.text ? "border-accent-3 focus:ring-accent-3" : "border-[#E2E8F0] hover:border-secondary"}`}
              />
              {errors.text && (
                <span className="text-xs font-ui text-accent-3 mt-1">
                  {errors.text}
                </span>
              )}
            </div>
          </div>
        )}

        {activeTab === "email" && (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <Input
              label="Alamat Email"
              type="email"
              placeholder="nama@email.com"
              value={inputData.email}
              onChange={(e) => updateInput("email", e.target.value)}
              error={errors.email}
            />
            <Input
              label="Subjek (Opsional)"
              placeholder="Menyapa..."
              value={inputData.subject}
              onChange={(e) => updateInput("subject", e.target.value)}
              error={errors.subject}
            />
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-sm font-ui font-medium text-primary">
                Pesan (Opsional)
              </label>
              <textarea
                rows={3}
                placeholder="Isi pesan email..."
                value={inputData.body}
                onChange={(e) => updateInput("body", e.target.value)}
                className={`w-full px-4 py-3 rounded-md border bg-white text-primary font-ui text-base focus:outline-none focus:ring-2 focus:ring-accent-1 focus:border-transparent transition-all duration-200 resize-none ${errors.body ? "border-accent-3 focus:ring-accent-3" : "border-[#E2E8F0] hover:border-secondary"}`}
              />
            </div>
          </div>
        )}

        {activeTab === "phone" && (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <Input
              label="Nomor Telepon"
              type="tel"
              placeholder="+62 812 3456 7890"
              value={inputData.phone}
              onChange={(e) => updateInput("phone", e.target.value)}
              error={errors.phone}
            />
          </div>
        )}
      </div>

      <div className="relative z-10 pt-6 border-t border-muted grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Colors */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold font-ui text-secondary flex items-center gap-1.5 uppercase tracking-wider">
            <Palette className="w-3.5 h-3.5" />
            Warna QR
          </label>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-surface/50 p-1.5 rounded-lg border border-muted">
              <input
                type="color"
                value={options.fgColor}
                onChange={(e) => updateOptions("fgColor", e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"
                title="Foreground Color"
              />
              <span className="text-xs font-body font-medium px-2 uppercase">
                {options.fgColor}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold font-ui text-secondary flex items-center gap-1.5 uppercase tracking-wider">
            <Palette className="w-3.5 h-3.5" />
            Warna Latar
          </label>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-surface/50 p-1.5 rounded-lg border border-muted">
              <input
                type="color"
                value={options.bgColor}
                onChange={(e) => updateOptions("bgColor", e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"
                title="Background Color"
              />
              <span className="text-xs font-body font-medium px-2 uppercase">
                {options.bgColor}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 pt-4 flex gap-3">
        <Button
          variant="secondary"
          onClick={resetForm}
          className="flex-1 h-12 bg-surface hover:bg-muted text-primary font-bold font-ui rounded-xl transition-all flex items-center justify-center gap-2 border border-muted"
        >
          <RefreshCcw className="w-4 h-4" />
          Reset Input
        </Button>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 4px;
        }
      `}</style>
    </Card>
  );
};
