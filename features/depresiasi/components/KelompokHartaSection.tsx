"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Package, Factory } from "lucide-react";
import { KELOMPOK_HARTA_DATA, AssetGroupData } from "../kelompok-harta-data";

function KelompokCard({ group }: { group: AssetGroupData }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#1A0E07]/40 transition-all">
      {/* Header — clickable toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 hover:bg-white/[0.03] transition-colors cursor-pointer text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 shrink-0 rounded-xl bg-[#9C4A2A]/20 flex items-center justify-center">
            <Package className="w-4.5 h-4.5 text-[#C17A3A]" />
          </div>
          <div className="min-w-0">
            <h5 className="text-base font-bold font-heading text-white">
              {group.title}
            </h5>
            <p className="text-xs text-[#EDE0D0]/60 font-ui mt-0.5">
              {group.subtitle}
            </p>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-[#C17A3A] shrink-0 transition-transform duration-300",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {/* Content — collapsible */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-3 border-t border-white/5 pt-4">
            {group.items.map((item) => (
              <div
                key={`${group.id}-${item.no}`}
                className="rounded-xl bg-white/[0.03] border border-white/5 p-4"
              >
                <div className="flex items-start gap-2.5 mb-2.5">
                  <span className="w-6 h-6 shrink-0 rounded-md bg-[#9C4A2A]/15 flex items-center justify-center text-[10px] font-black text-[#C17A3A] mt-0.5">
                    {item.no}
                  </span>
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Factory className="w-3.5 h-3.5 text-[#C17A3A]/60 shrink-0" />
                    <span className="text-xs font-bold font-heading text-[#C17A3A] uppercase tracking-wider">
                      {item.jenisUsaha}
                    </span>
                  </div>
                </div>
                <ul className="space-y-1.5 pl-8">
                  {item.jenisHarta.map((harta, idx) => (
                    <li
                      key={idx}
                      className="text-[#EDE0D0] font-body text-xs sm:text-sm leading-relaxed opacity-85 flex gap-2"
                    >
                      <span className="text-[#C17A3A]/50 mt-0.5 shrink-0">
                        •
                      </span>
                      <span>{harta}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <p className="text-[10px] text-[#EDE0D0]/40 font-ui pt-2 italic">
              Sumber: PMK No. 96/PMK.03/2009
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function KelompokHartaSection() {
  return (
    <div className="space-y-4">
      <p className="text-[#EDE0D0] font-body text-sm sm:text-base leading-relaxed opacity-90 mb-6">
        Berdasarkan Peraturan Menteri Keuangan Nomor 96/PMK.03/2009, berikut
        adalah jenis-jenis harta berwujud yang termasuk dalam masing-masing
        kelompok. Klik untuk melihat detail.
      </p>
      {KELOMPOK_HARTA_DATA.map((group) => (
        <KelompokCard key={group.id} group={group} />
      ))}
    </div>
  );
}
