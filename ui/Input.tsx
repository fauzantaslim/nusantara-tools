import React, { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  suffix?: string;
  fullWidth?: boolean;
  max?: number;
  min?: number;
}

export function Input({
  label,
  error,
  suffix,
  fullWidth = true,
  className,
  max,
  min,
  id,
  ...props
}: InputProps) {
  const generatedId =
    id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className={cn("flex flex-col gap-1.5", fullWidth ? "w-full" : "")}>
      {label && (
        <label
          htmlFor={generatedId}
          className="text-sm font-ui font-medium text-primary"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={generatedId}
          max={max}
          min={min}
          className={cn(
            "w-full px-4 py-3 rounded-md border",
            "bg-white text-primary font-ui text-base",
            "focus:outline-none focus:ring-2 focus:ring-accent-1 focus:border-transparent",
            "transition-all duration-200",
            error
              ? "border-accent-3 focus:ring-accent-3"
              : "border-[#E2E8F0] hover:border-secondary",
            suffix && "pr-12",
            className,
          )}
          {...props}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-ui font-medium text-secondary">
            {suffix}
          </span>
        )}
      </div>
      {error && (
        <span className="text-xs font-ui text-accent-3 mt-1">{error}</span>
      )}
    </div>
  );
}
