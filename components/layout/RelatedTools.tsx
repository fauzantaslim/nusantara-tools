"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { TOOLS, CATEGORIES } from "@/lib/data";
import { cn } from "@/lib/utils";

interface RelatedToolsProps {
  currentPath: string;
  categoryId: string;
  title?: string;
  subtitle?: string;
}

export function RelatedTools({
  currentPath,
  categoryId,
  title,
  subtitle,
}: RelatedToolsProps) {
  const category = CATEGORIES.find((c) => c.id === categoryId);

  // Ambil tools dari kategori yang sama, kecuali tool yang sedang dibuka
  const tools = TOOLS.filter(
    (t) => t.categoryId === categoryId && t.path !== currentPath,
  ).slice(0, 3);

  if (tools.length === 0) return null;

  const displayTitle = title || `Kalkulator ${category?.name || ""} Lainnya`;
  const displaySubtitle = subtitle || "Eksplorasi utilitas kami yang lain";

  return (
    <div className="w-full border-t border-[#EDE0D0] pt-12 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-primary">
            {displayTitle}
          </h2>
          <p className="text-secondary font-body mt-1 text-sm sm:text-base">
            {displaySubtitle}
          </p>
        </div>
        {category && (
          <Link
            href={category.path}
            className={cn(
              "text-sm font-bold flex items-center transition-colors px-4 py-2 rounded-xl",
              category.bg,
              category.color,
              "hover:brightness-95",
            )}
          >
            Lihat Semua <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              href={tool.path}
              key={tool.id}
              className={cn(
                "group bg-white rounded-3xl border border-[#EDE0D0]/80 p-6 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden",
                tool.id === "bmi"
                  ? "hover:border-[#4A7C59]/40"
                  : "hover:border-primary/20",
              )}
            >
              {/* Hover Glow */}
              <div
                className={cn(
                  "absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity",
                  tool.categoryId === "finansial"
                    ? "bg-[#9C4A2A]/5"
                    : "bg-[#4A7C59]/5",
                )}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner mb-5 border",
                    tool.bg,
                    tool.categoryId === "finansial"
                      ? "border-[#9C4A2A]/20"
                      : "border-[#4A7C59]/20",
                  )}
                >
                  <Icon className={cn("w-6 h-6", tool.color)} />
                </div>

                <h3
                  className={cn(
                    "font-heading font-extrabold text-lg text-primary transition-colors mb-2 group-hover:text-primary",
                    tool.color.replace("text-", "group-hover:text-"),
                  )}
                >
                  {tool.name}
                </h3>
                <p className="text-secondary font-body text-sm leading-relaxed mb-6 flex-grow">
                  {tool.desc}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-muted/50 mt-auto">
                  <span
                    className={cn(
                      "text-[11px] font-bold text-secondary uppercase tracking-widest transition-colors group-hover:text-primary",
                      tool.color.replace("text-", "group-hover:text-"),
                    )}
                  >
                    Buka Tool
                  </span>
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full bg-surface flex items-center justify-center transition-colors group-hover:text-white",
                      tool.color.replace("text-", "group-hover:bg-"),
                    )}
                  >
                    <ChevronRight className="w-4 h-4 text-primary transition-colors group-hover:text-white" />
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
