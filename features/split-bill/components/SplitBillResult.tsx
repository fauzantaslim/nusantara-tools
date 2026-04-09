"use client";

import React, { useState } from "react";
import { Card } from "@/ui/Card";
import { CurrencyInput } from "@/ui/CurrencyInput";
import { ReceiptItem, Person, SplitMode, BillBreakdown } from "../types";
import { cn } from "@/lib/utils";
import {
  Calculator,
  Check,
  CheckSquare,
  Square,
  Pencil,
  Trash,
  Share2,
  Clipboard,
  Receipt,
} from "lucide-react";

interface SplitBillResultProps {
  mode: SplitMode;
  people: Person[];
  items: ReceiptItem[];
  addItem: (name: string, price: number) => void;
  updateItem: (id: string, updates: Partial<ReceiptItem>) => void;
  removeItem: (id: string) => void;
  toggleItemAssignment: (itemId: string, personId: string) => void;
  subTotal: number;
  taxAmount: number;
  serviceAmount: number;
  grandTotal: number;
  breakdown: BillBreakdown[];
  generateShareLink: () => string | null;
}

export const SplitBillResult: React.FC<SplitBillResultProps> = ({
  mode,
  people,
  items,
  addItem,
  updateItem,
  removeItem,
  toggleItemAssignment,
  subTotal,
  taxAmount,
  serviceAmount,
  grandTotal,
  breakdown,
  generateShareLink,
}) => {
  const formatIDR = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Math.round(val));

  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<string>("0");
  const [copiedLink, setCopiedLink] = useState(false);

  const startEditing = (item: ReceiptItem) => {
    setEditingItem(item.id);
    setEditPrice(item.price.toString());
  };

  const finishEditing = (id: string) => {
    updateItem(id, { price: parseInt(editPrice) || 0 });
    setEditingItem(null);
  };

  const handleShare = () => {
    const link = generateShareLink();
    if (link) {
      navigator.clipboard.writeText(link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <Card
      variant="default"
      className={cn(
        "flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl transition-all duration-700 h-full animate-in fade-in zoom-in-95 bg-[#2C1A0E] text-[#F5EDE3]",
        "ring-4 ring-inset ring-[#C17A3A]/30 border-[#C17A3A]/30",
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

      <div className="relative z-10 p-6 sm:p-10 h-full flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1A0E07] border border-white/10 flex items-center justify-center shadow-inner">
              <Calculator className="w-6 h-6 text-[#C17A3A]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-white">
                Hasil Patungan
              </h2>
              <p className="text-[#EDE0D0]/50 font-body text-xs mt-0.5">
                {mode === "manual"
                  ? "Berdasarkan Total Input"
                  : "Berdasarkan Rincian Item"}
              </p>
            </div>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-xl text-sm font-bold border border-white/10"
          >
            {copiedLink ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
            {copiedLink ? "Link Disalin!" : "Share Link"}
          </button>
        </div>

        {/* Dynamic Item Assignment (Only in OCR mode) */}
        {mode === "ocr" && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1 mb-2">
              <h3 className="text-lg font-bold font-heading text-[#C17A3A] flex items-center gap-2">
                <Receipt className="w-5 h-5" /> Daftar Menu
              </h3>
              <p className="text-xs text-[#EDE0D0]/60">
                Secara default semua orang ditambahkan. Hilangkan centang pada
                nama jika tidak ikut membagi item tersebut.
              </p>
            </div>

            <div className="flex flex-col gap-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#1A0E07]/60 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 transition-opacity"
                >
                  <div className="flex justify-between items-start gap-4">
                    {editingItem === item.id ? (
                      <div className="flex-1 flex flex-col gap-4">
                        <input
                          autoFocus
                          type="text"
                          defaultValue={item.name}
                          className="w-full px-4 py-3 bg-[#1A0E07] text-white border border-[#C17A3A]/30 rounded-xl text-base outline-none focus:border-[#C17A3A]"
                          onBlur={(e) => {
                            updateItem(item.id, { name: e.target.value });
                          }}
                        />
                        <div className="flex flex-col sm:flex-row items-end gap-3">
                          <CurrencyInput
                            label="Harga"
                            value={editPrice}
                            onChange={(val) => setEditPrice(val)}
                            className="flex-1"
                          />
                          <button
                            onClick={() => finishEditing(item.id)}
                            className="h-14 px-8 bg-[#C17A3A] text-white rounded-xl font-black text-lg hover:bg-[#A66832] transition-colors shadow-lg"
                          >
                            SIMPAN
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1">
                          <h4 className="font-bold text-white text-base leading-tight">
                            {item.name}
                          </h4>
                          <p className="font-medium text-[#C17A3A] text-sm mt-1">
                            {formatIDR(item.price)}
                          </p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => startEditing(item)}
                            className="p-2 bg-white/5 rounded-lg text-secondary hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 bg-red-500/10 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Assign to people UI */}
                  {people.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                      {people.map((p) => {
                        const isAssigned = item.assignedTo.includes(p.id);
                        return (
                          <button
                            key={p.id}
                            onClick={() => toggleItemAssignment(item.id, p.id)}
                            className={cn(
                              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border",
                              isAssigned
                                ? "bg-[#C17A3A] text-white border-[#C17A3A]"
                                : "bg-transparent text-[#EDE0D0]/60 border-white/10 hover:border-white/30 hover:text-white",
                            )}
                          >
                            {isAssigned ? (
                              <CheckSquare className="w-3.5 h-3.5" />
                            ) : (
                              <Square className="w-3.5 h-3.5" />
                            )}
                            {p.name}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {people.length === 0 && (
                    <span className="text-[10px] text-red-300 italic">
                      Tambahkan teman di setting untuk membagi item ini.
                    </span>
                  )}
                </div>
              ))}

              {items.length === 0 && (
                <div className="text-center py-8 text-[#EDE0D0]/50 border border-dashed border-white/10 rounded-2xl">
                  Belum ada item struk. Scan file atau tambah manual.
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={() => addItem("Item Baru", 0)}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-sm text-[#EDE0D0] transition-colors flex items-center justify-center gap-2"
                >
                  <Clipboard className="w-4 h-4" />
                  Tambah Item Manual
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Breakdown */}
        <div className="flex flex-col gap-6 mt-auto max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
          <div className="p-5 md:p-8 bg-[#1A0E07] rounded-3xl border border-[#C17A3A]/30">
            <h3 className="text-[#EDE0D0]/80 font-bold font-ui text-sm mb-4">
              RINCIAN TAGIHAN
            </h3>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between items-center text-white">
                <span>Subtotal Items</span>
                <span className="font-bold">{formatIDR(subTotal)}</span>
              </div>
              <div className="flex justify-between items-center text-[#EDE0D0]/80">
                <span>Pajak</span>
                <span>{formatIDR(taxAmount)}</span>
              </div>
              <div className="flex justify-between items-center text-[#EDE0D0]/80">
                <span>Service Charge</span>
                <span>{formatIDR(serviceAmount)}</span>
              </div>
              <div className="h-px bg-white/10 my-2" />
              <div className="flex justify-between items-center text-xl text-[#C17A3A] font-black font-heading">
                <span>TOTAL AKHIR</span>
                <span>{formatIDR(grandTotal)}</span>
              </div>
            </div>
          </div>

          {people.length > 0 ? (
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-bold font-heading text-white">
                Tanggungan Per Orang
              </h3>
              {breakdown.map((b) => (
                <div
                  key={b.personId}
                  className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col gap-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-base">
                      {b.personName}
                    </span>
                    <span className="font-black text-[#C17A3A] text-lg tabular-nums">
                      {formatIDR(b.totalAmount)}
                    </span>
                  </div>
                  {mode === "ocr" && (
                    <div className="text-[10px] text-[#EDE0D0]/60 flex gap-2">
                      <span>Total Item: {formatIDR(b.itemsCost)}</span>
                      <span>•</span>
                      <span>
                        Pajak+Servis: {formatIDR(b.taxAmount + b.serviceAmount)}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/5 p-4 rounded-xl border border-[#C17A3A]/30 text-center">
              <span className="text-[#EDE0D0] text-sm">
                Tagihan sebesar <strong>{formatIDR(grandTotal)}</strong> <br />{" "}
                (Tambahkan teman untuk membagi tagihan)
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
