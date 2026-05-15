import Link from "next/link";
import type { Issue } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

export function PopularCard({ issue }: { issue: Issue }) {
  return (
    <Link
      href={`/newsletter/${issue.slug}`}
      className="group block rounded-md p-4 -mx-4 transition-colors hover:bg-ink-15"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="eyebrow text-ink-50">#{issue.number}</span>
        <span className="accent-dot text-vermilion text-xs leading-none">·</span>
        <span className="eyebrow text-ink-70">{issue.category}</span>
      </div>
      <h3 className="h-section text-md text-ink-95 mb-3 leading-snug group-hover:text-ink-100 transition-colors">
        {issue.title}
      </h3>
      <div className="flex items-center gap-3 meta text-ink-50">
        <span>{formatDate(issue.date)}</span>
        <span aria-hidden>—</span>
        <span>{issue.readMinutes} min</span>
      </div>
    </Link>
  );
}

export function ListItem({ issue }: { issue: Issue }) {
  return (
    <Link
      href={`/newsletter/${issue.slug}`}
      className="group block py-6 border-b border-ink-20 transition-colors hover:bg-ink-15 -mx-4 px-4 first:border-t"
    >
      <div className="grid grid-cols-12 gap-4 md:gap-6 items-start">
        {/* Left: meta column */}
        <div className="col-span-12 md:col-span-2">
          <div className="flex md:flex-col gap-2 md:gap-0.5">
            <span className="font-mono text-xs text-ink-50">#{issue.number}</span>
            <span className="font-mono text-xs text-ink-70">{formatDate(issue.date)}</span>
          </div>
        </div>

        {/* Center: title + subtitle */}
        <div className="col-span-12 md:col-span-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="eyebrow text-ink-70">{issue.category}</span>
            <span className="accent-dot text-vermilion text-xs leading-none">·</span>
            <span className="eyebrow text-ink-50">{issue.readMinutes} min</span>
          </div>
          <h3 className="h-section text-lg md:text-xl text-ink-95 mb-2 leading-tight">
            {issue.title}
          </h3>
          <p className="text-base text-ink-70 max-w-[60ch] leading-relaxed">
            {issue.excerpt}
          </p>
        </div>

        {/* Right: arrow indicator */}
        <div className="hidden md:flex col-span-2 justify-end items-start pt-2">
          <span className="font-mono text-xs text-ink-50 group-hover:text-ink-95 transition-colors">
            ler →
          </span>
        </div>
      </div>
    </Link>
  );
}
