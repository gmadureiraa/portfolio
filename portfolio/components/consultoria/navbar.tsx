"use client";

import Link from "next/link";

const navLinks = [
  { href: "#gargalos", label: "Gargalos" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#planos", label: "Planos" },
];

export function ConsultoriaNavbar({ ctaHref }: { ctaHref: string }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-4">
      <nav className="max-w-5xl mx-auto flex items-center justify-between h-12 px-4 sm:px-6 rounded-full bg-zinc-900/70 border border-zinc-800/50 backdrop-blur-md">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-zinc-100 tracking-tight"
        >
          <span className="grid h-6 w-6 place-items-center bg-emerald-500 font-mono text-[11px] font-bold text-black rounded-sm">
            M
          </span>
          <span className="hidden sm:inline">Madureira</span>
        </Link>
        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden md:inline px-4 py-1.5 text-sm rounded-full transition-colors text-zinc-400 hover:text-zinc-100"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-4 py-1.5 text-sm rounded-full bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition-colors"
          >
            Diagnóstico
          </a>
        </div>
      </nav>
    </header>
  );
}
