"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { LinkItem } from "../_lib/links";
import { trackClick } from "../_lib/tracking";

interface LinkCardProps {
  link: LinkItem;
  index: number;
}

export function LinkCard({ link, index }: LinkCardProps) {
  const Icon = link.icon;

  const handleClick = () => {
    trackClick(link.id);
  };

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.1 + index * 0.06,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="group relative block w-full"
    >
      <div
        className={`
          relative overflow-hidden rounded-2xl border transition-all duration-300
          ${
            link.accent
              ? "border-[#EC6000]/20 bg-[#EC6000]/[0.04] hover:border-[#EC6000]/40 hover:bg-[#EC6000]/[0.08]"
              : "border-[#222] bg-[#141414] hover:border-[#333] hover:bg-[#1a1a1a]"
          }
        `}
      >
        {link.accent && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_80%,rgba(236,96,0,0.06),transparent_50%)]" />
          </div>
        )}

        <div className="relative flex items-center gap-4 px-5 py-4">
          <div
            className={`
              flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-colors duration-300
              ${
                link.accent
                  ? "bg-[#EC6000]/10 text-[#EC6000] group-hover:bg-[#EC6000]/20"
                  : "bg-white/5 text-[#888] group-hover:text-white group-hover:bg-white/10"
              }
            `}
          >
            <Icon className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0">
            <h3
              className={`
                font-semibold text-[15px] leading-tight transition-colors duration-300
                ${link.accent ? "text-white" : "text-white/90 group-hover:text-white"}
              `}
            >
              {link.title}
            </h3>
            <p className="text-[13px] text-[#888] mt-0.5 truncate">
              {link.description}
            </p>
          </div>

          <ArrowUpRight
            className={`
              w-4 h-4 shrink-0 transition-all duration-300 opacity-0 group-hover:opacity-100
              -translate-x-1 group-hover:translate-x-0
              ${link.accent ? "text-[#EC6000]" : "text-[#888]"}
            `}
          />
        </div>
      </div>
    </motion.a>
  );
}
