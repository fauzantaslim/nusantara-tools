"use client";

import React, { useState } from "react";
import { Card } from "@/ui/Card";
import { Input } from "@/ui/Input";
import { Button } from "@/ui/Button";
import { Link2, Sparkles, AlertCircle } from "lucide-react";
import { ShortenedUrl } from "../types";
import { urlSchema } from "../utils";

interface UrlFormProps {
  onShorten: (url: string, alias?: string) => ShortenedUrl | null;
}

export const UrlForm: React.FC<UrlFormProps> = ({ onShorten }) => {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate
    const result = urlSchema.safeParse({ url, alias });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    const shortened = onShorten(url, alias ? alias : undefined);

    if (!shortened) {
      setError("Alias khusus sudah digunakan. Silakan pilih yang lain.");
      return;
    }

    setUrl("");
    setAlias("");
  };

  return (
    <Card
      variant="default"
      className="flex flex-col gap-8 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
          <Link2 className="w-6 h-6 text-[#C17A3A]" />
          Buat Link Pendek
        </h2>
        <p className="text-sm text-secondary font-body mt-2 leading-relaxed">
          Punya link panjang yang sulit diingat? Persingkat di sini dengan mudah
          dan cepat.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 relative z-10"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="long-url"
            className="text-xs font-bold font-ui text-secondary flex items-center gap-2"
          >
            URL Panjang <span className="text-red-500">*</span>
          </label>
          <Input
            id="long-url"
            type="text"
            placeholder="https://contoh.com/artikel-yang-sangat-panjang"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="custom-alias"
            className="text-xs font-bold font-ui text-secondary flex items-center gap-2"
          >
            Alias Khusus (Opsional)
          </label>
          <div className="relative w-full">
            <span className="absolute left-4 top-[50%] -translate-y-1/2 z-10 text-secondary/50 text-sm font-body select-none">
              /s/
            </span>
            <Input
              id="custom-alias"
              type="text"
              placeholder="nama-kamu"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="text-xs font-medium">{error}</span>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          fullWidth
          className="h-12 bg-[#C17A3A] hover:bg-[#A96930] text-white font-bold font-ui rounded-xl shadow-lg shadow-[#C17A3A]/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98] border-none"
        >
          <Sparkles className="w-4 h-4" />
          Singkatkan URL
        </Button>
      </form>
    </Card>
  );
};
