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
      className="mt-10 pb-8 flex flex-col items-center gap-4"
    >
      <div className="flex items-center gap-3">
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              onClick={() => trackClick(`social-${social.id}`)}
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#222] bg-[#141414] text-[#666] hover:text-[#EC6000] hover:border-[#EC6000]/30 hover:bg-[#1a1a1a] transition-all duration-200"
            >
              <Icon className="w-[14px] h-[14px]" />
            </a>
          );
        })}
      </div>

      <p className="text-[11px] text-[#444] tracking-wide font-mono">
        madureira.xyz · 2026
      </p>
    </motion.footer>
  );
}
