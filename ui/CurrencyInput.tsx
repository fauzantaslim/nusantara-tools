import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface CurrencyInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  desc?: string;
  error?: string;
  className?: string;
  variant?: "default" | "mini";
}

export function CurrencyInput({
  label,
  value,
  onChange,
  placeholder = "0",
  desc,
  error,
  className,
  variant = "default",
}: CurrencyInputProps) {
  const generatedId = useId();
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numeric digits
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    onChange(rawValue);
  };

  // Format value for display with thousands separator
  const displayValue = value
    ? new Intl.NumberFormat("id-ID").format(Number(value))
    : "";

  const id = label?.toLowerCase().replace(/\s+/g, "-") || generatedId;

  if (variant === "mini") {
    return (
      <div
        className={cn(
          "relative flex items-center border rounded-xl overflow-hidden transition-all bg-white",
          error
            ? "border-red-500 ring-1 ring-red-500/20"
            : "border-muted focus-within:border-[#9C4A2A] focus-within:ring-2 focus-within:ring-[#9C4A2A]/20",
          className,
        )}
      >
        <span className="pl-2 pr-1 text-[10px] font-bold text-secondary opacity-60 pointer-events-none select-none">
          Rp
        </span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          placeholder={placeholder}
          value={displayValue}
          onChange={handleInput}
          autoComplete="off"
          className="flex-1 h-8 bg-transparent pr-2 text-xs font-bold text-primary text-right outline-none placeholder:opacity-20"
        />
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      {label && (
        <div className="flex items-baseline justify-between">
          <label
            htmlFor={id}
            className="text-xs font-bold font-ui text-secondary uppercase tracking-wider"
          >
            {label}
          </label>
        </div>
      )}

      <div
        className={cn(
          "relative flex items-center border-2 rounded-xl h-14 overflow-hidden transition-all shadow-sm bg-white",
          error
            ? "border-red-500 ring-2 ring-red-500/20"
            : "border-muted focus-within:border-[#C17A3A] focus-within:ring-2 focus-within:ring-[#C17A3A]/20",
        )}
      >
        <span className="pl-4 pr-2 text-sm font-bold text-secondary opacity-60 pointer-events-none select-none">
          Rp
        </span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          placeholder={placeholder}
          value={displayValue}
          onChange={handleInput}
          autoComplete="off"
          className="flex-1 h-full bg-transparent pr-4 text-xl sm:text-2xl font-black text-primary outline-none font-heading placeholder:opacity-20"
        />
      </div>

      {error ? (
        <span className="text-[11px] font-bold text-red-500 mt-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      ) : desc ? (
        <span className="text-[11px] font-body text-secondary mt-1 opacity-80">
          {desc}
        </span>
      ) : null}
    </div>
  );
}
