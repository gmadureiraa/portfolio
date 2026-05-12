"use client";

import { motion } from "framer-motion";
import { socials } from "../_lib/links";
import { trackClick } from "../_lib/tracking";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="mt-12 pb-8 flex flex-col items-center gap-5"
    >
      <div className="flex items-center gap-3">
        {socials.map((social, i) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              onClick={() => trackClick(`social-${social.id}`)}
              whileHover={{
                y: -3,
                scale: 1.06,
                transition: { type: "spring", stiffness: 320, damping: 16 },
              }}
              whileTap={{ scale: 0.94 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 + i * 0.06 }}
              className="glass-pill social-pill flex items-center justify-center w-10 h-10 rounded-xl"
              style={{ color: "var(--links-fg-faint)" }}
            >
              <Icon className="w-[15px] h-[15px]" />
            </motion.a>
          );
        })}
      </div>

      <p
        className="text-[10.5px] tracking-[0.15em] font-mono uppercase"
        style={{ color: "var(--links-fg-dim)" }}
      >
        madureira.xyz · 2026
      </p>
    </motion.footer>
  );
}
