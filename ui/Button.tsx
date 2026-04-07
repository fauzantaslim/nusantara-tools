import React, { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseClass = `btn-${variant}`;
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button className={cn(baseClass, widthClass, className)} {...props}>
      {children}
    </button>
  );
}
