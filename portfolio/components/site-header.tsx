"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";

const CORAL = "#e63a1f";

const MONO = '"Geist Mono", "JetBrains Mono", ui-monospace, monospace';
const SERIF = 'var(--font-fraunces), "Fraunces", Georgia, serif';

const navTabs = [
  { label: "Início", href: "/" },
  { label: "Links", href: "/links" },
];

/**
 * Header global do site Madureira: avatar à esquerda, wordmark "madureira"
 * Fraunces italic centralizado, theme toggle + busca à direita. Nav inferior
 * com tabs mono uppercase (Início, Links).
 * Theme-aware: usa CSS vars do design system (bg-background/foreground/border)
 * pra responder ao toggle Sun/Moon (mesma cor da página).
 */
// Rotas onde o header global NÃO deve aparecer.
// /lp = landing de consultoria (tem ConsultoriaNavbar próprio)
// /admin = painel restrito
const HIDDEN_PREFIXES = ["/lp", "/admin"];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  const hidden = HIDDEN_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  if (hidden) return null;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/85 border-b border-border">
      {/* Top row */}
      <div className="mx-auto flex h-14 sm:h-16 max-w-[1280px] items-center justify-between px-3 sm:px-6 lg:px-8 relative">
        {/* Left: avatar + handle (handle só >= sm) */}
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <span className="relative inline-block size-8 sm:size-9 overflow-hidden rounded-full ring-1 ring-border transition-colors">
              <Image
                src="/avatar.png"
                alt="Madureira"
                fill
                sizes="36px"
                className="object-cover"
                priority
              />
            </span>
            <span
              className="hidden sm:inline text-foreground"
              style={{
                fontFamily: MONO,
                fontSize: 12,
                letterSpacing: "0.04em",
              }}
            >
              @ogmadureira
            </span>
          </Link>
        </div>

        {/* Center: wordmark — tamanho reduzido no mobile pra não bater nos lados */}
        <Link
          href="/"
          aria-label="madureira home"
          className="absolute left-1/2 -translate-x-1/2 transition-opacity hover:opacity-90 text-foreground pointer-events-auto"
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(18px, 5.6vw, 26px)",
            lineHeight: 1,
            letterSpacing: "-0.025em",
          }}
        >
          madureira
        </Link>

        {/* Right: theme toggle + search (desktop) + Assinar + burger (mobile) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <AnimatedThemeToggler />
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="buscar"
            className="hidden md:inline-flex size-9 items-center justify-center rounded-full border border-border text-foreground bg-transparent transition-colors hover:bg-accent"
          >
            <Search className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "fechar menu" : "abrir menu"}
            aria-expanded={open}
            className="sm:hidden inline-flex size-9 items-center justify-center rounded-full border border-border text-foreground"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Search bar (collapsible, desktop) */}
      {searchOpen && (
        <div className="border-t border-border bg-background">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-3">
              <Search className="size-4 text-muted-foreground" />
              <input
                autoFocus
                type="text"
                placeholder="buscar..."
                className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground"
                style={{
                  fontFamily: MONO,
                  fontSize: 13,
                  caretColor: CORAL,
                }}
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-muted-foreground hover:opacity-80"
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                esc
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nav tabs (desktop + tablet) */}
      <nav className="hidden sm:block border-t border-border">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-center gap-1 overflow-x-auto">
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
        <div className="sm:hidden border-t border-border bg-background">
          <ul className="px-4 py-3 space-y-1">
            {navTabs.map((t) => {
              const isActive =
                t.href === "/"
                  ? pathname === "/"
                  : pathname === t.href || pathname.startsWith(`${t.href}/`);
              return (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block no-underline min-h-[44px] flex items-center",
                      isActive ? "text-foreground" : "text-muted-foreground",
                    )}
                    style={{
                      padding: "10px 4px",
                      fontFamily: MONO,
                      fontSize: 13,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {t.label}
                  </Link>
                </li>
              );
            })}
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
        "relative inline-flex items-center whitespace-nowrap no-underline transition-colors",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
      style={{
        padding: "12px 16px",
        fontFamily: MONO,
        fontSize: 11,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      {children}
      {active && (
        <span
          aria-hidden
          className="absolute left-4 right-4 bottom-0 h-px bg-foreground"
        />
      )}
    </Link>
  );
}

export default SiteHeader;
