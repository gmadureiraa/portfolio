"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CtaButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "ghost";
}

export function CtaButton({
  children,
  href,
  className,
  variant = "primary",
}: CtaButtonProps) {
  const Tag: any = href ? "a" : "button";
  const props = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  if (variant === "ghost") {
    return (
      <Tag
        {...props}
        className={cn(
          "group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors",
          className,
        )}
      >
        <span>{children}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
      </Tag>
    );
  }

  return (
    <Tag
      {...props}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_-10px_rgba(16,185,129,0.6)]",
        className,
      )}
    >
      <span>{children}</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
    </Tag>
  );
}
