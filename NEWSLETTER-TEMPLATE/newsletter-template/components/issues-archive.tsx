"use client";

import { useMemo, useState } from "react";
import { ListItem } from "@/components/issue-card";
import { newsletterCategories, type Issue } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Props = {
  issues: Issue[];
  /** Título do bloco. Default "Cartas do Madureira". */
  title?: string;
  /** Eyebrow mostrado à direita com contagem (ex: "8 cartas"). */
  showCount?: boolean;
};

export function IssuesArchive({
  issues,
  title = "Cartas do Madureira",
  showCount = true,
}: Props) {
  const [active, setActive] = useState<string>("Todas");

  const filtered = useMemo(() => {
    if (active === "Todas") return issues;
    return issues.filter((i) => i.category === active);
  }, [issues, active]);

  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="h-section text-xl text-ink-95">{title}</h2>
        {showCount && (
          <span className="eyebrow text-ink-50">
            {filtered.length} {filtered.length === 1 ? "carta" : "cartas"}
          </span>
        )}
      </div>

      {/* Filtros por categoria */}
      <ul
        role="tablist"
        aria-label="filtrar por categoria"
        className="-mx-1 mb-7 flex flex-wrap items-center gap-1.5 overflow-x-auto no-scrollbar"
      >
        {newsletterCategories.map((cat) => {
          const isActive = cat === active;
          return (
            <li key={cat}>
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(cat)}
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors whitespace-nowrap",
                  isActive
                    ? "bg-ink-95 text-ink-10 border-ink-95"
                    : "border-ink-30 text-ink-70 hover:border-ink-95 hover:text-ink-95"
                )}
              >
                {cat}
              </button>
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 ? (
        <p className="meta text-ink-70 py-12">
          Nenhuma carta nessa categoria ainda.
        </p>
      ) : (
        <ul>
          {filtered.map((issue) => (
            <li key={issue.slug}>
              <ListItem issue={issue} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
