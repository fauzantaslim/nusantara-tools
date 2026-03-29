import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn("flex flex-wrap items-center gap-2 text-sm text-secondary font-ui font-medium", className)}>
      <Link href="/" className="hover:text-primary transition-colors flex items-center opacity-80 hover:opacity-100">
        <Home className="w-4 h-4 mr-1.5 mb-[1px]" />
        Beranda
      </Link>
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-4 h-4 opacity-40 shrink-0" />
            {isLast || !item.href ? (
              <span className="text-primary font-bold cursor-default tracking-wide">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-primary transition-colors opacity-80 hover:opacity-100">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
