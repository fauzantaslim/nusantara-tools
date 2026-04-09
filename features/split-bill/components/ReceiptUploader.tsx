"use client";

import React, { useCallback, useRef } from "react";
import { Upload, Camera, Loader2, FileImage } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReceiptUploaderProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
  progress: number;
  error: string | null;
}

export const ReceiptUploader: React.FC<ReceiptUploaderProps> = ({
  onFileSelect,
  isProcessing,
  progress,
  error,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onFileSelect(file);
      }
    },
    [onFileSelect],
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-200">
            {error}
          </div>
        )}

        <div
          className={cn(
            "relative w-full aspect-video md:aspect-auto md:h-64 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center transition-all",
            isProcessing
              ? "bg-muted/50 border-muted"
              : "bg-surface hover:bg-surface/80 border-[#C17A3A]/30 hover:border-[#C17A3A]",
          )}
        >
          {isProcessing ? (
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Loader2 className="w-10 h-10 text-[#C17A3A] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-primary">
                  {Math.round(progress * 100)}%
                </div>
              </div>
              <p className="text-sm font-bold font-ui text-secondary animate-pulse">
                Membaca Struk...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="w-16 h-16 rounded-full bg-[#C17A3A]/10 flex items-center justify-center mb-2">
                <FileImage className="w-8 h-8 text-[#C17A3A]" />
              </div>
              <p className="text-sm font-bold font-ui text-primary">
                Upload atau foto struk makan
              </p>
              <p className="text-xs text-secondary mb-4">
                Mendukung format JPG, PNG. Pastikan foto terang.
              </p>
              <div className="flex gap-3 w-full max-w-xs">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 flex items-center justify-center gap-2 bg-white border border-muted py-2.5 rounded-xl font-bold font-ui text-sm hover:border-[#C17A3A]/30 transition-all text-primary"
                >
                  <Upload className="w-4 h-4" /> Pilih File
                </button>
                <button
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#C17A3A] text-white py-2.5 rounded-xl font-bold font-ui text-sm hover:bg-[#A3662F] transition-all"
                >
                  <Camera className="w-4 h-4" /> Kamera
                </button>
              </div>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/jpeg, image/png, image/webp"
            onChange={handleFileChange}
            disabled={isProcessing}
          />
          <input
            type="file"
            ref={cameraInputRef}
            className="hidden"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            disabled={isProcessing}
          />
        </div>
      </div>
      <p className="text-[10px] text-center text-secondary">
        Disclaimer: Hasil OCR mungkin tidak 100% akurat. Harap tinjau kembali
        sebelum konfirmasi.
      </p>
    </div>
  );
};
