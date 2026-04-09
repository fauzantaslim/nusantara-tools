import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { TOOLS } from "@/lib/data";
import { CategoryRelated } from "@/components/layout/CategoryRelated";

export const metadata = {
  title: "Tools Produktivitas Kerja | NusantaraTools",
  description:
    "Koleksi lengkap alat produktivitas: Generator CV ATS, Pomodoro Timer, dan lainnya.",
};

const PRODUKTIVITAS_TOOLS = TOOLS.filter(
  (t) => t.categoryId === "produktivitas",
);

export default function ProduktivitasIndex() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-12 w-full mt-4 pb-24 px-4">
      {/* Header Bar */}
      <div className="flex flex-col gap-6 pt-6 pb-4 border-b border-muted/50">
        <Breadcrumbs items={[{ label: "Produktivitas Kerja" }]} />
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-[#FFF3E0] text-[#C17A3A] text-xs font-bold rounded-full tracking-wider uppercase border border-[#C17A3A]/20">
              Kategori
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-primary font-heading tracking-tight">
            Produktivitas Kerja
          </h1>
          <p className="text-lg text-secondary font-body mt-3 max-w-2xl leading-relaxed">
            Optimalkan alur kerja dan karir Anda dengan rangkaian alat bantu
            digital yang dirancang untuk efisiensi dan hasil profesional.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
        {PRODUKTIVITAS_TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              href={tool.path}
              key={tool.id}
              className="group bg-white rounded-[1.5rem] border border-[#EDE0D0]/80 p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#C17A3A]/40 hover:shadow-xl hover:shadow-[#C17A3A]/5 hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C17A3A]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner",
                      tool.bg,
                    )}
                  >
                    <Icon className={cn("w-6 h-6", tool.color)} />
                  </div>
                  {tool.hot && (
                    <span className="bg-[#FFF0EB] text-[#9C4A2A] text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider border border-[#9C4A2A]/20">
                      Populer
                    </span>
                  )}
                </div>

                <div className="mb-2">
                  <h3 className="font-heading font-extrabold text-xl text-primary group-hover:text-[#C17A3A] transition-colors line-clamp-1">
                    {tool.name}
                  </h3>
                </div>

                <p className="text-secondary font-body text-sm leading-relaxed line-clamp-3 mb-6">
                  {tool.desc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-muted/50 mt-auto relative z-10">
                <span className="text-xs font-bold text-secondary uppercase tracking-widest group-hover:text-primary transition-colors">
                  Buka Tool
                </span>
                <div className="w-8 h-8 rounded-full bg-surface flex flex-col items-center justify-center transition-colors group-hover:bg-[#C17A3A]">
                  <ChevronRight className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Kategori Lainnya Section */}
      <CategoryRelated
        currentCategoryId="produktivitas"
        description="Jelajahi portofolio kalkulator kami untuk kebutuhan kesehatan hingga finansial."
      />
    </div>
  );
}
