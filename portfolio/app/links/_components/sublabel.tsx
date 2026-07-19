"use client";

import { motion } from "framer-motion";

/**
 * Divisória de grupo — mono uppercase com linha, estrutura vinda do linktree
 * do Felipe M3D (`.sublabel`), redesenhada no DS Madureira.
 */
export function Sublabel({ children, delay = 0 }: { children: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-center gap-3 mt-9 mb-4 first:mt-0"
    >
      <span
        className="ds-mono text-[10px] whitespace-nowrap"
        style={{ color: "var(--links-fg-faint)" }}
      >
        {children}
      </span>
      <span
        aria-hidden
        className="h-px flex-1"
        style={{
          background:
            "linear-gradient(90deg, var(--links-fg-divider) 0%, transparent 100%)",
        }}
      />
    </motion.div>
  );
}
