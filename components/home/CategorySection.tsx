'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Activity, Wallet, Moon, Timer, ArrowRight, Search, ChevronRight, Calculator, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/ui/Input';
import { TOOLS } from '@/lib/data';



export function CategorySection() {
  const groupedTools = TOOLS.reduce((acc, tool) => {
    const categoryName = tool.category;
    if (!acc[categoryName]) acc[categoryName] = [];
    acc[categoryName].push(tool);
    return acc;
  }, {} as Record<string, typeof TOOLS>);

  const categoriesToRender = Object.entries(groupedTools);

  return (
    <section id="kategori" className="py-24 flex flex-col gap-10 relative z-20 border-t border-muted/50 max-w-7xl mx-auto w-full">
      {/* Header & Controls */}
      <div className="flex flex-col items-center text-center w-full max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-heading font-extrabold text-primary tracking-tight w-full">
          Eksplorasi <span className="text-accent-1 font-bold">Tools</span>
        </h2>
        <p className="text-secondary font-body mt-4 sm:mt-5 text-lg sm:text-xl leading-relaxed w-full px-4">
          Kumpulan perangkat digital pintar yang dirancang khusus untuk mempermudah aktivitas finansial, kesehatan, religi, hingga rutinitas harian Anda.
        </p>
      </div>
      
      {/* List Layout (Category Grids) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
        {categoriesToRender.map(([categoryName, tools]) => {
          // Limit showing too many tools to avoid extremely tall cards, only show 5
          const displayedTools = tools.slice(0, 5);
          const remainingCount = tools.length - 5;
          
          return (
            <div 
              key={categoryName} 
              className="bg-white rounded-[1.5rem] border border-[#EDE0D0] p-6 lg:p-8 flex flex-col h-full shadow-sm hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-400 group/card"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#EDE0D0]/50 relative after:absolute after:bottom-0 after:left-0 after:w-12 after:h-[2px] after:bg-accent-1/20 transition-all">
                <h3 className="font-heading font-extrabold text-2xl text-primary">{categoryName}</h3>
              </div>
              
              <div className="flex flex-col gap-2 flex-1 mb-8">
                {displayedTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link href={tool.path} key={tool.id} className="group flex items-start gap-4 p-3 -mx-3 rounded-[1rem] hover:bg-surface border border-transparent hover:border-[#EDE0D0]/60 transition-all outline-none focus-visible:ring-2 focus-visible:ring-accent-1/50">
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-white/60", tool.bg)}>
                        <Icon className={cn("w-5 h-5", tool.color)} />
                      </div>
                      <div className="flex flex-col flex-1 min-w-0 pt-0.5">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-heading font-bold text-[15px] text-primary group-hover:text-accent-1 transition-colors">
                            {tool.name}
                          </span>
                          {tool.hot && (
                            <span className="bg-accent-3-light text-accent-3 text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider border border-accent-3/20 shrink-0">
                              Populer
                            </span>
                          )}
                        </div>
                        <span className="text-[13px] text-secondary leading-relaxed">{tool.desc}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
              
              {remainingCount > 0 ? (
                <div className="mt-auto pt-5 border-t border-[#EDE0D0]/40">
                  <Link 
                    href={`/${tools[0].categoryId}`} 
                    className="inline-flex items-center text-[13px] font-bold text-accent-1 hover:text-primary transition-colors uppercase tracking-wide"
                  >
                    Lihat {remainingCount} Alat {categoryName} Lainnya
                  </Link>
                </div>
              ) : (
                 <div className="mt-auto pt-5 border-t border-[#EDE0D0]/40">
                   <Link 
                    href={`/${tools[0].categoryId}`} 
                    className="inline-flex items-center text-[13px] font-bold text-accent-1 group-hover/card:text-accent-1 hover:text-primary transition-colors uppercase tracking-wide"
                  >
                    Pergi ke halaman kategori {categoryName.toLowerCase()}
                  </Link>
                 </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  )
}
