"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type NavProps = {
  scheduleUrl: string;
  ctaLabel: string;
};

export default function Nav({ scheduleUrl, ctaLabel }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-emerald-500/20 bg-black/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-6 w-6 place-items-center bg-emerald-500 font-mono text-xs font-bold text-black">
            M
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-300 sm:inline">
            Madureira / IA Consulting
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#ofertas"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400 transition-colors hover:text-emerald-400"
          >
            Ofertas
          </a>
          <a
            href="#processo"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400 transition-colors hover:text-emerald-400"
          >
            Processo
          </a>
          <a
            href="#prova"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400 transition-colors hover:text-emerald-400"
          >
            Produtos
          </a>
          <a
            href="#faq"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400 transition-colors hover:text-emerald-400"
          >
            FAQ
          </a>
        </nav>

        <a
          href={scheduleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-emerald-500 px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-emerald-400"
        >
          {ctaLabel}
          <span aria-hidden>↗</span>
        </a>
      </div>
    </header>
  );
}
