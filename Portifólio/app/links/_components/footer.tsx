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
              className="glass-pill flex items-center justify-center w-10 h-10 rounded-xl text-white/55 hover:text-white"
            >
              <Icon className="w-[15px] h-[15px]" />
            </a>
          );
        })}
      </div>

      <p className="text-[10.5px] text-white/30 tracking-[0.15em] font-mono uppercase">
        madureira.xyz · 2026
      </p>
    </motion.footer>
  );
}
