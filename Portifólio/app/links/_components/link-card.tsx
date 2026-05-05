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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.1 + index * 0.06,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      className="group relative block w-full"
    >
      <div className="glass-card relative overflow-hidden rounded-2xl">
        <div className="relative flex items-center gap-4 px-5 py-5 min-h-[84px]">
          <div
            className={`
              flex items-center justify-center w-11 h-11 rounded-xl shrink-0 transition-all duration-300
              ${
                link.accent
                  ? "bg-[#C5FF4A]/12 text-[#C5FF4A] ring-1 ring-[#C5FF4A]/25 group-hover:bg-[#C5FF4A]/20 group-hover:ring-[#C5FF4A]/40"
                  : "bg-white/6 text-white/70 ring-1 ring-white/10 group-hover:bg-white/10 group-hover:text-white"
              }
            `}
          >
            <Icon className="w-[20px] h-[20px]" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[15px] leading-tight text-white tracking-tight">
              {link.title}
            </h3>
            <p className="text-[12.5px] mt-1 text-white/55 truncate font-light">
              {link.description}
            </p>
          </div>

          <ArrowUpRight
            className={`
              w-4 h-4 shrink-0 transition-all duration-300 opacity-40 group-hover:opacity-100
              -translate-x-1 group-hover:translate-x-0 -translate-y-0 group-hover:-translate-y-0.5
              ${link.accent ? "text-[#C5FF4A]" : "text-white/70"}
            `}
          />
        </div>
      </div>
    </motion.a>
  );
}
