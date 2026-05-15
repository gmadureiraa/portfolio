import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Issue } from "@/lib/constants";

export function Hero({ issue }: { issue: Issue }) {
  return (
    <section className="border-b border-ink-30 bg-ink-10">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12 items-center">
          {/* Left: copy */}
          <div className="md:col-span-7 lg:col-span-7">
            <div className="flex items-center gap-2 mb-6">
              <span className="eyebrow">edição {issue.number}</span>
              <span className="accent-dot text-vermilion text-sm leading-none">·</span>
              <span className="eyebrow">{issue.category}</span>
              <span className="accent-dot text-vermilion text-sm leading-none">·</span>
              <span className="eyebrow">{issue.readMinutes} min</span>
            </div>

            <h1 className="h-display text-[44px] leading-[1.02] sm:text-[60px] md:text-[68px] lg:text-[84px] text-ink-95 mb-6 max-w-[14ch]">
              {issue.title}
            </h1>

            <p className="text-md md:text-lg text-ink-85 leading-relaxed max-w-[58ch] mb-8">
              {issue.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link href={`/newsletter/${issue.slug}`} className="btn-cream">
                Ler última edição
                <ArrowUpRight className="size-4" />
              </Link>
              <Link href="/newsletter" className="btn-ghost">
                Ver todas
              </Link>
            </div>
          </div>

          {/* Right: editorial mark / quote */}
          <div className="md:col-span-5 lg:col-span-5">
            <div className="relative border-l border-ink-30 pl-6 md:pl-8 py-4">
              <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-ink-10 px-2 eyebrow text-ink-50">
                manifesto
              </span>
              <blockquote className="font-display italic font-light text-[28px] md:text-[34px] leading-[1.15] text-ink-95">
                marketing direto.
                <br />
                <span className="text-ink-70">IA aplicada.</span>
                <br />
                bastidor real de
                <br />
                <span className="text-ink-70">quem constrói.</span>
              </blockquote>
              <div className="mt-6 flex items-center gap-2">
                <span className="meta text-ink-70">— uma por semana</span>
                <span className="accent-dot text-vermilion">·</span>
                <span className="meta text-ink-70">zero spam</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
