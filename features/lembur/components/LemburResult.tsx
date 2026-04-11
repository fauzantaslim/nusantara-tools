"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { LemburResult as LemburResultType } from "../types";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  Clock,
  Gift,
  Wallet,
  ChevronRight,
  BadgePercent,
  Banknote,
  AlertTriangle,
  Printer,
  ExternalLink,
} from "lucide-react";

interface LemburResultProps {
  result: LemburResultType;
  hasInput: boolean;
}

const formatIDR = (val: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Math.round(val));

const StatRow: React.FC<{
  label: string;
  value: string;
  icon: React.ElementType;
  accent?: boolean;
  muted?: boolean;
  highlight?: boolean;
}> = ({ label, value, icon: Icon, accent, muted, highlight }) => (
  <div
    className={cn(
      "flex justify-between items-center py-3",
      muted ? "opacity-60" : "",
      highlight ? "bg-[#9C4A2A]/10 -mx-3 px-3 rounded-xl" : "",
    )}
  >
    <span className="flex items-center gap-2 font-body text-sm text-[#EDE0D0]/80">
      <Icon
        className={cn(
          "w-4 h-4 shrink-0",
          accent ? "text-[#C17A3A]" : "text-[#EDE0D0]/50",
        )}
      />
      {label}
    </span>
    <span
      className={cn(
        "font-bold tabular-nums",
        accent ? "text-[#C17A3A] text-base" : "text-white text-sm",
      )}
    >
      {value}
    </span>
  </div>
);

export const LemburResult: React.FC<LemburResultProps> = ({
  result,
  hasInput,
}) => {
  const {
    regularPay,
    totalOvertimePay,
    bonusAmount,
    grossPay,
    taxAmount,
    netPay,
    tierBreakdowns,
    overtimePremium,
    hasOvertime,
    hourlyWage,
    complianceWarnings,
    isIndonesiaMode,
  } = result;

  const overtimePercent =
    grossPay > 0 ? Math.round((totalOvertimePay / grossPay) * 100) : 0;
  const netFinal = taxAmount > 0 ? netPay : grossPay;

  const handlePrint = () => {
    const win = window.open("", "_blank");
    if (!win) {
      alert("Mohon izinkan popup untuk mencetak slip gaji.");
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html lang="id">
        <head>
          <meta charset="UTF-8">
          <title>Slip Gaji Lembur — NusantaraTools</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
            body { 
              font-family: 'Inter', -apple-system, sans-serif; 
              padding: 40px; 
              color: #2C1A0E; 
              max-width: 600px; 
              margin: 0 auto; 
              line-height: 1.5;
            }
            .header { border-bottom: 2px solid #9C4A2A; padding-bottom: 20px; margin-bottom: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; font-weight: 900; color: #9C4A2A; text-transform: uppercase; letter-spacing: 1px; }
            .header p { margin: 5px 0 0; font-size: 12px; color: #7A5C42; }
            .badge { 
              font-size: 10px; 
              font-weight: bold;
              color: #9C4A2A; 
              background: #FFF0EB; 
              padding: 4px 12px; 
              border-radius: 20px; 
              display: inline-block; 
              margin-bottom: 20px;
              border: 1px solid rgba(156, 74, 42, 0.2);
            }
            .section-title { font-size: 12px; font-weight: bold; color: #7A5C42; text-transform: uppercase; letter-spacing: 1px; margin: 20px 0 10px; border-bottom: 1px solid #EDE0D0; padding-bottom: 5px; }
            .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px dashed #EDE0D0; font-size: 14px; }
            .row:last-child { border-bottom: none; }
            .row.bold { font-weight: bold; }
            .total-box { 
              margin-top: 30px;
              padding: 20px;
              background: #F9F5F0;
              border-radius: 12px;
              border: 1px solid #EDE0D0;
            }
            .total-row { display: flex; justify-content: space-between; font-size: 20px; font-weight: 900; color: #9C4A2A; }
            .total-label { font-size: 12px; color: #7A5C42; text-transform: uppercase; }
            .warn { 
              color: #B91C1C; 
              font-size: 11px; 
              margin-top: 20px; 
              padding: 12px; 
              background: #FEF2F2; 
              border-radius: 8px; 
              border: 1px solid #FEE2E2;
              display: flex;
              gap: 8px;
            }
            .footer { font-size: 10px; color: #A1A1AA; margin-top: 50px; text-align: center; border-top: 1px solid #EDE0D0; padding-top: 20px; }
            .footer strong { color: #71717A; }
            @media print { 
              body { padding: 0; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Slip Gaji Lembur</h1>
            <p>Dihitung melalui NusantaraTools.id</p>
          </div>

          <div style="text-align: center;">
            ${isIndonesiaMode ? '<span class="badge">🇮🇩 SESUAI PP NO. 35 TAHUN 2021</span>' : '<span class="badge">MODE GLOBAL / UMUM</span>'}
          </div>

          <div class="section-title">Informasi Dasar</div>
          ${hourlyWage ? `<div class="row"><span>Upah Per Jam (1/173)</span><span class="bold">${formatIDR(hourlyWage)}</span></div>` : ""}
          <div class="row"><span>Gaji Pokok / Reguler</span><span class="bold">${formatIDR(regularPay)}</span></div>

          <div class="section-title">Detail Lembur</div>
          ${
            tierBreakdowns.length > 0
              ? tierBreakdowns
                  .map(
                    (t) =>
                      `<div class="row"><span>Lembur ${t.multiplierLabel} (${t.hours} jam)</span><span class="bold">${formatIDR(t.pay)}</span></div>`,
                  )
                  .join("")
              : '<div class="row" style="color: #A1A1AA;"><span>Tidak ada jam lembur</span><span>-</span></div>'
          }
          
          ${
            bonusAmount > 0
              ? `
          <div class="section-title">Tambahan</div>
          <div class="row"><span>Bonus / Tunjangan Lain</span><span class="bold">${formatIDR(bonusAmount)}</span></div>
          `
              : ""
          }

          <div class="total-box">
            <div class="total-label">${taxAmount > 0 ? "Gaji Bersih (Setelah Pajak)" : "Total Gaji Kotor"}</div>
            <div class="total-row">
              <span>ESTIMASI TOTAL</span>
              <span>${formatIDR(netFinal)}</span>
            </div>
            ${
              taxAmount > 0
                ? `
              <div class="row" style="border: none; padding-bottom: 0; margin-top: 10px; font-size: 12px; color: #7A5C42;">
                <span>Gaji Kotor: ${formatIDR(grossPay)}</span>
                <span>Pajak: -${formatIDR(taxAmount)}</span>
              </div>
            `
                : ""
            }
          </div>

          ${
            complianceWarnings.length > 0
              ? `
            <div class="warn">
              <span>⚠️</span>
              <div>
                <strong>Peringatan Kepatuhan:</strong>
                ${complianceWarnings.map((w) => `<div>• ${w.message}</div>`).join("")}
              </div>
            </div>
          `
              : ""
          }

          <div class="footer">
            <p><strong>PENTING:</strong> Dokumen ini adalah hasil simulasi dan bukan merupakan bukti pembayaran resmi. 
            Perhitungan didasarkan pada data yang dimasukkan oleh pengguna.</p>
            <p>Dicetak pada: ${new Date().toLocaleString("id-ID")}</p>
            <p>© ${new Date().getFullYear()} NusantaraTools.id — Peralatan Digital untuk Indonesia</p>
          </div>

          <script>
            window.onload = () => {
              window.print();
            };
          </script>
        </body>
      </html>
    `;

    win.document.write(html);
    win.document.close();
  };

  return (
    <Card
      variant="default"
      className={cn(
        "flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl transition-all duration-700 h-full animate-in fade-in zoom-in-95 bg-[#2C1A0E] text-[#F5EDE3]",
        isIndonesiaMode
          ? "ring-4 ring-inset ring-[#9C4A2A]/30 border-[#9C4A2A]/40"
          : "ring-4 ring-inset ring-[#9C4A2A]/20 border-[#9C4A2A]/30",
      )}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#9C4A2A] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="relative z-10 p-6 sm:p-10 h-full flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1A0E07] border border-white/10 flex items-center justify-center shadow-inner shrink-0">
              <Banknote className="w-6 h-6 text-[#9C4A2A]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-white">
                Hasil Kalkulasi
              </h2>
              {isIndonesiaMode ? (
                <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-[#C17A3A] bg-[#9C4A2A]/20 px-2 py-0.5 rounded-full">
                  🇮🇩 Compliant with Indonesian Regulation
                </span>
              ) : (
                <p className="text-[#EDE0D0]/50 font-body text-xs mt-0.5">
                  Estimasi penghasilan lembur mingguan
                </p>
              )}
            </div>
          </div>

          {hasInput && (
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-3 py-2 rounded-xl text-xs font-bold border border-white/10 shrink-0"
              title="Cetak slip gaji"
            >
              <Printer className="w-3.5 h-3.5" />
              Cetak
            </button>
          )}
        </div>

        {!hasInput ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-12">
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <TrendingUp className="w-10 h-10 text-[#9C4A2A]/40" />
            </div>
            <p className="text-[#EDE0D0]/40 font-body text-sm max-w-[200px]">
              Isi form di sebelah kiri untuk melihat hasil kalkulasi lembur
            </p>
          </div>
        ) : (
          <>
            {/* Compliance warnings */}
            {complianceWarnings.length > 0 && (
              <div className="flex flex-col gap-2">
                {complianceWarnings.map((w, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
                  >
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-red-300 text-xs font-medium leading-relaxed">
                      {w.message}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Hourly wage badge (Indonesia mode) */}
            {isIndonesiaMode && hourlyWage !== undefined && (
              <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
                <span className="text-[#EDE0D0]/60 text-xs font-bold">
                  Upah Per Jam (1/173)
                </span>
                <span className="text-white font-black text-base tabular-nums">
                  {formatIDR(hourlyWage)}
                </span>
              </div>
            )}

            {/* Overtime bonus highlight */}
            {hasOvertime && (
              <div className="bg-[#9C4A2A]/20 border border-[#9C4A2A]/30 rounded-2xl p-4 flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-[#C17A3A] shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm">
                    +{formatIDR(overtimePremium)} dari lembur
                  </p>
                  <p className="text-[#EDE0D0]/60 text-xs mt-0.5">
                    Lembur berkontribusi {overtimePercent}% dari total gaji
                    kotor
                  </p>
                </div>
              </div>
            )}

            {/* Tier breakdown */}
            {tierBreakdowns.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#EDE0D0]/50">
                  Rincian Jam Lembur
                </h3>
                <div className="flex flex-col gap-2">
                  {tierBreakdowns.map((t) => (
                    <div
                      key={t.tierId}
                      className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3 border border-white/5"
                    >
                      <div className="flex items-center gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-[#9C4A2A]" />
                        <span className="text-[#EDE0D0]/70 text-xs font-medium">
                          {t.multiplierLabel}
                        </span>
                        <span className="text-[#EDE0D0]/40 text-xs">
                          ({t.hours} jam)
                        </span>
                      </div>
                      <span className="font-bold text-white text-sm tabular-nums">
                        {formatIDR(t.pay)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Summary rows */}
            <div className="p-5 md:p-6 bg-[#1A0E07] rounded-3xl border border-[#9C4A2A]/30 flex flex-col">
              <h3 className="text-[#EDE0D0]/60 font-bold font-ui text-xs uppercase tracking-widest mb-3">
                Ringkasan Penghasilan
              </h3>
              <div className="divide-y divide-white/5">
                <StatRow
                  label={
                    isIndonesiaMode ? "Gaji Pokok + Tunjangan" : "Gaji Reguler"
                  }
                  value={formatIDR(regularPay)}
                  icon={Clock}
                />
                <StatRow
                  label="Total Lembur"
                  value={formatIDR(totalOvertimePay)}
                  icon={TrendingUp}
                  accent={hasOvertime}
                />
                {bonusAmount > 0 && (
                  <StatRow
                    label="Bonus"
                    value={formatIDR(bonusAmount)}
                    icon={Gift}
                  />
                )}
                <StatRow
                  label="Gaji Kotor"
                  value={formatIDR(grossPay)}
                  icon={Wallet}
                  accent
                  highlight
                />
                {taxAmount > 0 && (
                  <StatRow
                    label="Estimasi Pajak"
                    value={`-${formatIDR(taxAmount)}`}
                    icon={BadgePercent}
                    muted
                  />
                )}
              </div>

              {/* Big net pay number */}
              <div className="mt-4 pt-4 border-t border-white/10 text-center">
                <p className="text-[#EDE0D0]/50 text-xs uppercase tracking-widest mb-1">
                  {taxAmount > 0 ? "Gaji Bersih (Est.)" : "Gaji Kotor"}
                </p>
                <p className="text-4xl sm:text-5xl font-black font-heading text-[#C17A3A] tabular-nums leading-none">
                  {formatIDR(netFinal)}
                </p>
              </div>
            </div>

            {/* Regular vs Overtime bar */}
            {hasOvertime && (
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[10px] text-[#EDE0D0]/50 font-bold uppercase tracking-wider">
                  <span>Reguler ({100 - overtimePercent}%)</span>
                  <span>Lembur ({overtimePercent}%)</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden flex">
                  <div
                    className="bg-white/30 transition-all duration-700"
                    style={{ width: `${100 - overtimePercent}%` }}
                  />
                  <div
                    className="bg-[#9C4A2A] transition-all duration-700"
                    style={{ width: `${overtimePercent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Indonesia reference link */}
            {isIndonesiaMode && (
              <a
                href="https://peraturan.bpk.go.id/Details/161904/pp-no-35-tahun-2021"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[10px] text-[#EDE0D0]/40 hover:text-[#C17A3A] transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Referensi: PP No. 35 Tahun 2021 — BPK RI
              </a>
            )}
          </>
        )}

        {/* Disclaimer */}
        <p className="text-[10px] text-[#EDE0D0]/30 text-center mt-auto pt-4 border-t border-white/5 leading-relaxed">
          {isIndonesiaMode
            ? "* Estimasi berdasarkan PP No. 35 Tahun 2021. Perjanjian kerja perusahaan dapat memengaruhi hasil akhir."
            : "* Perhitungan ini adalah estimasi. Aturan lembur berbeda-beda sesuai kontrak kerja & peraturan daerah."}
        </p>
      </div>
    </Card>
  );
};
