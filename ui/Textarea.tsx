import React, { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  labelClassName?: string;
}

export function Textarea({
  label,
  error,
  fullWidth = true,
  className,
  id,
  labelClassName,
  rows = 4,
  ...props
}: TextareaProps) {
  const generatedId =
    id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className={cn("flex flex-col gap-1.5", fullWidth ? "w-full" : "")}>
      {label && (
        <label
          htmlFor={generatedId}
          className={cn(
            "text-sm font-ui font-medium text-primary",
            labelClassName,
          )}
        >
          {label}
        </label>
      )}
      <textarea
        id={generatedId}
        rows={rows}
        {...props}
        className={cn(
          "w-full px-4 py-3 rounded-md border",
          "bg-white text-primary font-ui text-base",
          "focus:outline-none focus:ring-2 focus:ring-accent-1 focus:border-transparent",
          "transition-all duration-200 resize-none",
          error
            ? "border-accent-3 focus:ring-accent-3"
            : "border-[#E2E8F0] hover:border-secondary",
          className,
        )}
      />
      {error && (
        <span className="text-xs font-ui text-accent-3 mt-1">{error}</span>
      )}
    </div>
  );
}
