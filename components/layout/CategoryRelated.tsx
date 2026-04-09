"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/data";

interface CategoryRelatedProps {
  currentCategoryId: string;
  title?: string;
  description?: string;
}

export function CategoryRelated({
  currentCategoryId,
  title = "Kategori Terkait Lainnya",
  description = "Jelajahi portofolio kalkulator kami untuk berbagai kebutuhan Anda.",
}: CategoryRelatedProps) {
  const otherCategories = CATEGORIES.filter(
    (cat) => cat.id !== currentCategoryId,
  );

  return (
    <div className="mt-20 pt-16 border-t border-muted/50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-primary font-heading tracking-tight">
            {title}
          </h2>
          <p className="text-secondary font-body mt-2">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {otherCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              href={cat.path}
              key={cat.id}
              className={cn(
                "group bg-white rounded-3xl border border-[#EDE0D0]/80 p-6 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden",
                cat.hoverBorder,
              )}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner mb-5",
                    cat.bg,
                  )}
                >
                  <Icon className={cn("w-6 h-6", cat.color)} />
                </div>

                <h3 className="font-heading font-extrabold text-lg text-primary group-hover:text-primary transition-colors mb-2">
                  {cat.name}
                </h3>
                <p className="text-secondary font-body text-sm leading-relaxed mb-6 flex-grow">
                  {cat.desc}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-muted/50 mt-auto">
                  <span className="text-[11px] font-bold text-secondary uppercase tracking-widest group-hover:text-primary transition-colors">
                    Eksplorasi
                  </span>
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                      cat.bg,
                    )}
                  >
                    <ChevronRight className={cn("w-4 h-4", cat.color)} />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
