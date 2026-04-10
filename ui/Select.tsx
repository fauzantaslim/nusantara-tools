"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

interface SelectProps<T extends string = string> {
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
}

export function Select<T extends string = string>({
  options,
  value,
  onChange,
  label,
  placeholder = "Pilih...",
  icon,
  className,
  size = "md",
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const heightClass = size === "sm" ? "h-10" : "h-12";
  const textClass = size === "sm" ? "text-sm" : "text-[14px]";

  return (
    <div className={cn("flex flex-col gap-2", className)} ref={ref}>
      {label && (
        <label className="text-sm font-bold font-ui text-primary">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((o) => !o)}
          className={cn(
            "w-full flex items-center justify-between px-4 rounded-xl border bg-white transition-colors font-ui font-medium shadow-sm",
            "text-primary border-muted",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1",
            "hover:border-secondary/40",
            heightClass,
            textClass,
          )}
        >
          <span className="flex items-center gap-2 truncate">
            {icon && (
              <span className="text-secondary opacity-50 shrink-0">{icon}</span>
            )}
            <span className={selected ? "text-primary" : "text-secondary/50"}>
              {selected ? selected.label : placeholder}
            </span>
          </span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-secondary opacity-50 shrink-0 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </button>

        {/* Dropdown Panel */}
        {isOpen && (
          <div className="absolute top-[calc(100%+0.375rem)] left-0 w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.10)] border border-[#EDE0D0] overflow-hidden z-50 animate-in fade-in slide-in-from-top-1">
            <div className="py-1.5 max-h-48 overflow-y-auto custom-scrollbar">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-sm font-ui font-medium transition-colors",
                    option.value === value
                      ? "bg-surface text-primary font-bold"
                      : "text-secondary hover:bg-surface hover:text-primary",
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
