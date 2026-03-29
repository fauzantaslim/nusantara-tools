'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Search, ChevronDown, X, Activity, Wallet, Moon, CheckCircle2, HeartPulse, Wrench, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TOOLS } from '@/lib/data';

const TOOL_CATEGORIES = [
  { 
    name: 'Kesehatan', 
    icon: HeartPulse, 
    href: '/kesehatan', 
    color: 'text-[#4A7C59]', // accent-2
    bg: 'bg-[#E8F5E9]' // accent-2-light
  },
  { 
    name: 'Religi', 
    icon: Moon, 
    href: '/religi', 
    color: 'text-[#4A7C59]', // accent-2
    bg: 'bg-[#E8F5E9]'
  },
  { 
    name: 'Finansial', 
    icon: Wallet, 
    href: '/finansial', 
    color: 'text-[#9C4A2A]', // accent-3
    bg: 'bg-[#FFF0EB]' // accent-3-light
  },
  { 
    name: 'Produktivitas', 
    icon: CheckCircle2, 
    href: '/produktivitas', 
    color: 'text-[#C17A3A]', // accent-1
    bg: 'bg-[#FFF3E0]' // accent-1-light
  },
  { 
    name: 'Utilitas', 
    icon: Wrench, 
    href: '/utilitas', 
    color: 'text-[#7A5C42]', // secondary
    bg: 'bg-[#EDE0D0]' // muted
  },
  { 
    name: 'Image Tools', 
    icon: ImageIcon, 
    href: '/image-tools', 
    color: 'text-[#7A5C42]', // neutral util style
    bg: 'bg-[#EDE0D0]'
  },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Efek shrink header saat di gulir (opsional elegan)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicking outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = TOOLS.filter(tool => 
    searchQuery && (tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || tool.desc.toLowerCase().includes(searchQuery.toLowerCase()))
  ).slice(0, 5); // limit to 5 results

  return (
    <>
      <header className={cn(
        "fixed top-0 inset-x-0 z-[100] transition-all duration-300 border-b",
        isScrolled ? "bg-white/95 backdrop-blur-xl border-[#EDE0D0]/80 shadow-sm h-16" : "bg-white/80 backdrop-blur-lg border-transparent h-20"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
          
          {/* 1. Logo */}
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center shrink-0 outline-none hover:opacity-90 transition-opacity">
            <Image 
              src="/nusantara-tools-logo-stacked.png" 
              alt="Nusantara Tools Logo" 
              width={180} 
              height={50} 
              className={cn("w-auto transition-all duration-300", isScrolled ? "h-6 sm:h-7" : "h-7 sm:h-8")}
              priority
            />
          </Link>
          
          {/* 2. Desktop Navigation (Center/Right aligned) */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-6 lg:gap-8">
            
            {/* Search Bar */}
            <div className="relative max-w-[14rem] lg:max-w-xs w-full ml-4 hidden md:block" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/50" />
                <input
                  type="text"
                  placeholder="Pencarian alat..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-full pl-9 pr-4 py-2 bg-surface border border-[#EDE0D0] rounded-full focus:outline-none focus:ring-2 focus:ring-[#4A7C59]/20 focus:border-[#4A7C59]/40 font-ui text-sm text-primary transition-all placeholder:text-secondary/50"
                />
              </div>

              {/* Search Dropdown */}
              {isSearchOpen && searchQuery.trim() !== '' && (
                <div className="absolute top-[calc(100%+0.5rem)] lg:right-0 w-[360px] lg:w-[400px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#EDE0D0] overflow-hidden z-50">
                  {searchResults.length > 0 ? (
                    <div className="py-2 flex flex-col max-h-[400px] overflow-y-auto scrollbar-hide">
                      <div className="px-4 py-2 text-xs font-black text-secondary uppercase tracking-widest border-b border-[#EDE0D0]/50 mb-1 bg-surface/30">
                        Hasil Pencarian
                      </div>
                      {searchResults.map((tool) => {
                        const Icon = tool.icon;
                        return (
                          <Link 
                            key={tool.id} 
                            href={tool.path}
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="flex items-start gap-4 px-4 py-3 hover:bg-surface transition-colors"
                          >
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-white/40", tool.bg)}>
                              <Icon className={cn("w-5 h-5", tool.color)} />
                            </div>
                            <div className="flex flex-col justify-center">
                              <span className="font-heading font-bold text-[15px] text-primary leading-tight">{tool.name}</span>
                              <span className="text-[12px] text-secondary line-clamp-1 mt-1">{tool.desc}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-6 text-center bg-white">
                      <Search className="w-8 h-8 text-secondary/30 mx-auto mb-2" />
                      <p className="text-sm font-bold text-primary">Tidak ada hasil ditemukan</p>
                      <p className="text-xs text-secondary mt-1">Coba kata kunci lain</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <nav className="flex items-center gap-6 font-ui font-semibold text-sm text-secondary">
              {/* Dropdown Daftar Tools */}
              <div className="relative group/dropdown h-full py-4 cursor-pointer">
                <div className="flex items-center gap-1 hover:text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent-1 rounded-md px-1">
                  Daftar Tools
                  <ChevronDown className="w-4 h-4 group-hover/dropdown:rotate-180 transition-transform duration-300" />
                </div>
                
                {/* Mega Menu Dropdown */}
                <div className="absolute top-[85%] right-0 lg:-left-12 w-[480px] pt-4 invisible opacity-0 translate-y-2 group-hover/dropdown:visible group-hover/dropdown:opacity-100 group-hover/dropdown:translate-y-0 transition-all duration-300 z-50">
                  <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-[#EDE0D0] p-4 grid grid-cols-2 gap-2 relative before:absolute before:-top-2 before:right-10 lg:before:left-24 before:w-4 before:h-4 before:bg-white before:border-l before:border-t before:border-[#EDE0D0] before:rotate-45">
                    {TOOL_CATEGORIES.map((cat, idx) => (
                      <Link href={cat.href} key={idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface transition-colors group/item relative z-10">
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-white/50", cat.bg)}>
                          <cat.icon className={cn("w-5 h-5", cat.color)} />
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-primary group-hover/item:text-accent-1 transition-colors text-sm">{cat.name}</h4>
                        </div>
                      </Link>
                    ))}

                  </div>
                </div>
              </div>

              <Link href="/tentang" className="hover:text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent-1 rounded-md px-1">Tentang</Link>
              <Link href="/kontak" className="hover:text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent-1 rounded-md px-1">Kontak</Link>
            </nav>
          </div>

          {/* 3. Mobile Menu Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <button className="w-9 h-9 flex items-center justify-center text-primary bg-surface border border-[#EDE0D0] rounded-full focus:outline-none" aria-label="Search">
              <Search className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center text-primary bg-white border border-[#EDE0D0] rounded-xl hover:bg-surface transition-colors focus:outline-none shadow-sm" 
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className={cn("fixed inset-0 z-40 bg-white md:hidden border-t border-[#EDE0D0] overflow-y-auto transition-all pt-2.5", isScrolled ? "top-[64px]" : "top-[80px]")}>
          <div className="p-4 flex flex-col gap-6">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary/50" />
              <input
                type="text"
                placeholder="Cari alat kebutuhan utama..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-surface border border-[#EDE0D0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A7C59]/20 font-ui text-sm text-primary shadow-inner"
              />
            </div>
            
            {searchQuery.trim() !== '' ? (
              <div className="flex flex-col gap-2 bg-white rounded-2xl border border-[#EDE0D0] overflow-hidden shadow-sm">
                <div className="px-4 py-3 text-xs font-black text-secondary uppercase tracking-widest border-b border-[#EDE0D0]/80 bg-surface/30">
                  Hasil Pencarian
                </div>
                {searchResults.length > 0 ? (
                  <div className="flex flex-col">
                    {searchResults.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <Link 
                          href={tool.path} 
                          key={tool.id} 
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setSearchQuery('');
                          }} 
                          className="flex items-start gap-4 p-4 hover:bg-surface border-b border-[#EDE0D0]/30 last:border-0 transition-colors"
                        >
                          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-white/40", tool.bg)}>
                            <Icon className={cn("w-5 h-5", tool.color)} />
                          </div>
                          <div className="flex flex-col justify-center">
                            <span className="font-heading font-bold text-[15px] text-primary leading-tight">{tool.name}</span>
                            <span className="text-xs text-secondary line-clamp-1 mt-1">{tool.desc}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-white">
                    <Search className="w-8 h-8 text-secondary/30 mx-auto mb-3" />
                    <p className="text-sm font-bold text-primary mb-1">Tidak ada alat ditemukan</p>
                    <p className="text-xs text-secondary">Coba gunakan kata kunci berbeda</p>
                  </div>
                )}
              </div>
            ) : (
              <nav className="flex flex-col gap-2 font-ui font-bold text-lg text-primary">
               <div className="pb-4 border-b border-[#EDE0D0]/80 mb-2">
                 <button 
                   onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                   className="w-full flex items-center justify-between pl-2 pr-3 py-2 mb-2 rounded-xl hover:bg-surface transition-colors focus:outline-none focus:ring-2 focus:ring-accent-1/20"
                 >
                   <span className="text-xs font-black text-secondary uppercase tracking-widest block">Direktori Kategori Utama</span>
                   <ChevronDown className={cn("w-4 h-4 text-secondary transition-transform duration-300", isMobileCategoriesOpen ? "rotate-180" : "")} />
                 </button>
                 
                 <div className={cn(
                   "grid grid-cols-1 gap-2 overflow-hidden transition-all duration-300 ease-in-out",
                   isMobileCategoriesOpen ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"
                 )}>
                   {TOOL_CATEGORIES.map((cat, idx) => (
                      <Link href={cat.href} key={idx} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface border border-transparent hover:border-[#EDE0D0] transition-colors">
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-white/40", cat.bg)}>
                          <cat.icon className={cn("w-5 h-5", cat.color)} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[15px] hover:text-accent-1 transition-colors">{cat.name}</span>
                        </div>
                      </Link>
                    ))}
                 </div>
               </div>
               
               <Link href="/tentang" onClick={() => setIsMobileMenuOpen(false)} className="p-3 hover:bg-surface rounded-xl transition-colors">Tentang</Link>
               <Link href="/kontak" onClick={() => setIsMobileMenuOpen(false)} className="p-3 hover:bg-surface rounded-xl transition-colors">Kontak</Link>
            </nav>
            )}
          </div>
        </div>
      )}
    </>
  );
}
