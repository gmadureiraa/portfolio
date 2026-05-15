"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { navTabs, siteMeta } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Header({ onSubscribe }: { onSubscribe?: () => void }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-ink-30 bg-ink-10/95 backdrop-blur-md">
      {/* Top row */}
      <div className="mx-auto flex h-16 max-w-page items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: avatar + handle */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="relative inline-block size-9 overflow-hidden rounded-full ring-1 ring-ink-30 group-hover:ring-ink-50 transition-colors">
              <Image
                src="/avatar-madureira.jpg"
                alt="Madureira"
                fill
                sizes="36px"
                className="object-cover"
                priority
              />
            </span>
            <span className="hidden sm:inline meta text-ink-95">{siteMeta.handle}</span>
          </Link>
        </div>

        {/* Center: wordmark */}
        <Link
          href="/"
          aria-label="madureira home"
          className="absolute left-1/2 -translate-x-1/2 font-display italic font-light text-[26px] text-ink-95 leading-none tracking-tight hover:opacity-90 transition-opacity"
        >
          madureira
        </Link>

        {/* Right: search + subscribe */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="buscar"
            className="hidden md:inline-flex size-9 items-center justify-center rounded-full border border-ink-30 hover:border-ink-50 hover:bg-ink-15 transition-colors text-ink-85"
          >
            <Search className="size-4" />
          </button>
          <button
            type="button"
            onClick={onSubscribe}
            className="btn-cream"
          >
            Assinar
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="menu"
            className="md:hidden inline-flex size-9 items-center justify-center rounded-full border border-ink-30 text-ink-95"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Search bar (collapsible) */}
      {searchOpen && (
        <div className="border-t border-ink-20 bg-ink-10">
          <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-3">
              <Search className="size-4 text-ink-50" />
              <input
                autoFocus
                type="text"
                placeholder="buscar edições..."
                className="flex-1 bg-transparent border-0 outline-none text-ink-95 placeholder:text-ink-50 caret-vermilion font-mono text-sm"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="meta text-ink-70 hover:text-ink-95 transition-colors"
              >
                esc
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nav tabs */}
      <nav className="border-t border-ink-20">
        <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-center gap-1 overflow-x-auto no-scrollbar -mx-2 md:mx-0">
            {navTabs.map((tab) => {
              const isActive =
                tab.href === "/"
                  ? pathname === "/"
                  : pathname === tab.href || pathname.startsWith(`${tab.href}/`);
              return (
                <li key={tab.href}>
                  <NavLink href={tab.href} active={isActive}>
                    {tab.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-ink-20 bg-ink-10">
          <ul className="px-4 py-3 space-y-1">
            {navTabs.map((t) => (
              <li key={t.href}>
                <Link
                  href={t.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-ink-85 hover:text-ink-95"
                >
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative inline-flex items-center px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors whitespace-nowrap",
        active
          ? "text-ink-95"
          : "text-ink-70 hover:text-ink-95"
      )}
    >
      {children}
      {active && (
        <span className="absolute left-4 right-4 bottom-0 h-px bg-ink-95" />
      )}
    </Link>
  );
}
