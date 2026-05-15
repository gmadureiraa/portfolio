"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const PAPER = "#f4f1ea";
const INK = "#0a0908";
const CORAL = "#e63a1f";
const MUTED = "rgba(244, 241, 234, 0.62)";
const FAINT = "rgba(244, 241, 234, 0.42)";
const HAIRLINE = "rgba(244, 241, 234, 0.10)";
const HAIRLINE_STRONG = "rgba(244, 241, 234, 0.18)";

const MONO = '"Geist Mono", "JetBrains Mono", ui-monospace, monospace';
const SERIF = 'var(--font-fraunces), "Fraunces", Georgia, serif';

const navTabs = [
  { label: "Início", href: "/" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Links", href: "/links" },
];

/**
 * Header global do site Madureira. Padrão validado no newsletter-template:
 * avatar à esquerda, wordmark "madureira" Fraunces italic centralizado,
 * CTA "Assinar" cream à direita. Nav inferior com 3 tabs mono uppercase.
 * Dark-first, paleta paper/ink/coral inline (não depende de globals.css).
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
    <header
      className="sticky top-0 z-40 w-full backdrop-blur-md"
      style={{
        background: "rgba(10, 9, 8, 0.92)",
        borderBottom: `1px solid ${HAIRLINE}`,
      }}
    >
      {/* Top row */}
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8 relative">
        {/* Left: avatar + handle */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span
              className="relative inline-block size-9 overflow-hidden rounded-full transition-colors"
              style={{ boxShadow: `0 0 0 1px ${HAIRLINE_STRONG}` }}
            >
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
              className="hidden sm:inline"
              style={{
                fontFamily: MONO,
                fontSize: 12,
                letterSpacing: "0.04em",
                color: PAPER,
              }}
            >
              @ogmadureira
            </span>
          </Link>
        </div>

        {/* Center: wordmark */}
        <Link
          href="/"
          aria-label="madureira home"
          className="absolute left-1/2 -translate-x-1/2 transition-opacity hover:opacity-90"
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 26,
            lineHeight: 1,
            letterSpacing: "-0.025em",
            color: PAPER,
          }}
        >
          madureira
        </Link>

        {/* Right: search (desktop) + Assinar + burger (mobile) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="buscar"
            className="hidden md:inline-flex size-9 items-center justify-center rounded-full transition-colors"
            style={{
              border: `1px solid ${HAIRLINE_STRONG}`,
              color: PAPER,
              background: "transparent",
            }}
          >
            <Search className="size-4" />
          </button>
          <Link
            href="/newsletter"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 18px",
              borderRadius: 999,
              background: PAPER,
              color: INK,
              fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              border: `1px solid ${PAPER}`,
              textDecoration: "none",
              transition: "transform 200ms cubic-bezier(.2,.7,.2,1)",
            }}
            className="hover:-translate-y-px"
          >
            Assinar
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="menu"
            className="md:hidden inline-flex size-9 items-center justify-center rounded-full"
            style={{ border: `1px solid ${HAIRLINE_STRONG}`, color: PAPER }}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Search bar (collapsible, desktop) */}
      {searchOpen && (
        <div style={{ borderTop: `1px solid ${HAIRLINE}`, background: INK }}>
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-3">
              <Search className="size-4" style={{ color: FAINT }} />
              <input
                autoFocus
                type="text"
                placeholder="buscar..."
                className="flex-1 bg-transparent border-0 outline-none"
                style={{
                  color: PAPER,
                  fontFamily: MONO,
                  fontSize: 13,
                  caretColor: CORAL,
                }}
              />
              <button
                onClick={() => setSearchOpen(false)}
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: MUTED,
                }}
                className="hover:opacity-80"
              >
                esc
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nav tabs (desktop + tablet) */}
      <nav style={{ borderTop: `1px solid ${HAIRLINE}` }} className="hidden sm:block">
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
        <div
          className="sm:hidden"
          style={{ borderTop: `1px solid ${HAIRLINE}`, background: INK }}
        >
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
                    style={{
                      display: "block",
                      padding: "10px 4px",
                      fontFamily: MONO,
                      fontSize: 12,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: isActive ? PAPER : MUTED,
                      textDecoration: "none",
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
        "relative inline-flex items-center whitespace-nowrap transition-colors",
      )}
      style={{
        padding: "12px 16px",
        fontFamily: MONO,
        fontSize: 11,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: active ? PAPER : MUTED,
        textDecoration: "none",
      }}
    >
      {children}
      {active && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: 16,
            right: 16,
            bottom: 0,
            height: 1,
            background: PAPER,
          }}
        />
      )}
    </Link>
  );
}

export default SiteHeader;
