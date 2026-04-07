"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { Button } from "@/ui/Button";
import { cn } from "@/lib/utils";
import { Download, Copy, Check, QrCode, ScanLine } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface QrPreviewProps {
  payload: string;
  options: { fgColor: string; bgColor: string };
  onDownload: (format: "png" | "svg") => void;
}

export const QrPreview: React.FC<QrPreviewProps> = ({
  payload,
  options,
  onDownload,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (!payload) return;
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy", e);
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
        <div className="flex items-center justify-between pb-4 border-b border-[#C17A3A]/20">
          <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#C17A3A]" />
            Pratinjau QR
          </h3>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          {/* QR Code Canvas/SVG Wrapper - The Scan Simulation UX */}
          <div className="relative group">
            {/* Scan Line Animation Wrapper */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl">
              <div className="w-full h-1 bg-[#C17A3A] opacity-70 shadow-[0_0_15px_#C17A3A] absolute top-0 -translate-y-full animate-[scan_3s_ease-in-out_infinite]" />
            </div>

            {/* Box frame corners */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-4 border-l-4 border-[#C17A3A] rounded-tl-lg scale-75 opacity-50 transition-all group-hover:scale-100 group-hover:opacity-100" />
            <div className="absolute -top-4 -right-4 w-8 h-8 border-t-4 border-r-4 border-[#C17A3A] rounded-tr-lg scale-75 opacity-50 transition-all group-hover:scale-100 group-hover:opacity-100" />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-4 border-l-4 border-[#C17A3A] rounded-bl-lg scale-75 opacity-50 transition-all group-hover:scale-100 group-hover:opacity-100" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-4 border-r-4 border-[#C17A3A] rounded-br-lg scale-75 opacity-50 transition-all group-hover:scale-100 group-hover:opacity-100" />

            <div
              className="bg-white p-4 rounded-2xl shadow-2xl relative transition-transform duration-500 group-hover:scale-[1.02]"
              style={{ backgroundColor: options.bgColor }}
            >
              {payload ? (
                <QRCodeSVG
                  id="qr-preview-svg"
                  value={payload}
                  size={220}
                  fgColor={options.fgColor}
                  bgColor={options.bgColor}
                  level="H"
                  includeMargin={false}
                />
              ) : (
                <div className="w-[220px] h-[220px] flex items-center justify-center border-2 border-dashed border-muted rounded-xl bg-surface/50 text-secondary">
                  <ScanLine className="w-12 h-12 opacity-20" />
                </div>
              )}
            </div>
          </div>

          {/* Data encoded preview */}
          {payload && (
            <div className="w-full max-w-sm flex items-center gap-2 bg-[#1A0E07]/60 border border-[#7A5C42]/30 p-3 rounded-xl animate-in fade-in slide-in-from-bottom-4">
              <div className="flex-1 truncate text-center font-body text-sm text-[#EDE0D0]/80">
                {payload}
              </div>
              <button
                onClick={handleCopy}
                className="p-1.5 shrink-0 hover:bg-[#7A5C42]/30 rounded-md transition-colors text-[#C17A3A] hover:text-[#EDE0D0]"
                title="Salin data"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Download Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-auto pt-4 border-t border-[#C17A3A]/20">
          <Button
            className="bg-[#C17A3A]/10 hover:bg-[#C17A3A]/20 text-[#C17A3A] border border-[#C17A3A]/30 flex items-center justify-center gap-2 font-bold font-ui rounded-xl h-12 transition-all disabled:opacity-50"
            onClick={() => onDownload("svg")}
            disabled={!payload}
          >
            SVG <Download className="w-4 h-4" />
          </Button>
          <Button
            className="bg-[#C17A3A] hover:bg-[#A96930] text-white flex items-center justify-center gap-2 font-bold font-ui rounded-xl h-12 shadow-lg shadow-[#C17A3A]/20 transition-all disabled:opacity-50"
            onClick={() => onDownload("png")}
            disabled={!payload}
          >
            PNG <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            top: -10%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 110%;
            opacity: 0;
          }
        }
      `}</style>
    </Card>
  );
};
