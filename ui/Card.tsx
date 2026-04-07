import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "muted" | "dark";
}

export function Card({
  variant = "default",
  className,
  children,
  ...props
}: CardProps) {
  const baseClass = `card-${variant}`;

  return (
    <div className={cn(baseClass, className)} {...props}>
      {children}
    </div>
  );
}
