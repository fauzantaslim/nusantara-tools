import React, { TextareaHTMLAttributes, useId } from "react";
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
  const reactId = useId();
  const inputId = id || reactId;

  return (
    <div className={cn("flex flex-col gap-1.5", fullWidth ? "w-full" : "")}>
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            "text-sm font-ui font-medium text-primary",
            labelClassName,
          )}
        >
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        rows={rows}
        {...props}
        aria-label={props["aria-label"] || label || props.placeholder}
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
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />
      {error && (
        <span
          id={`${inputId}-error`}
          className="text-xs font-ui text-accent-3 mt-1"
        >
          {error}
        </span>
      )}
    </div>
  );
}
