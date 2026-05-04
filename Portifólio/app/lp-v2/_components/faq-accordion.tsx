"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

type FaqItem = { q: string; a: string };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIndex(isOpen ? null : i)}
            aria-expanded={isOpen}
            className={cn(
              "group flex flex-col items-start gap-3 border p-5 text-left transition-colors lg:p-6",
              isOpen
                ? "border-emerald-500/50 bg-emerald-500/[0.03]"
                : "border-emerald-500/15 hover:border-emerald-500/40",
            )}
          >
            <div className="flex w-full items-start justify-between gap-4">
              <h3 className="text-base font-semibold text-white">{item.q}</h3>
              <span
                aria-hidden
                className={cn(
                  "shrink-0 font-mono text-emerald-400 transition-transform",
                  isOpen && "rotate-45",
                )}
              >
                +
              </span>
            </div>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="font-mono text-[11px] leading-relaxed text-neutral-400 lg:text-xs">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}
