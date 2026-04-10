import React from "react";
import { cn } from "@/lib/utils";

export interface SegmentedOption<T extends string = string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string = string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label?: string;
  className?: string;
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  label,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label className="text-sm font-bold font-ui text-primary">
          {label}
        </label>
      )}
      <div
        className="grid gap-1 bg-surface p-1.5 rounded-xl"
        style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "py-2 px-1 text-xs md:text-sm font-bold rounded-lg transition-all text-center",
              value === option.value
                ? "bg-white text-primary shadow-sm"
                : "text-secondary hover:text-primary",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
