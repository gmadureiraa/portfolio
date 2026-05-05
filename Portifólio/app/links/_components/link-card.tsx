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
          <motion.div
            className={`
              relative flex items-center justify-center w-11 h-11 rounded-xl shrink-0
              ${
                link.accent
                  ? "bg-[#C5FF4A]/12 text-[#C5FF4A] ring-1 ring-[#C5FF4A]/25"
                  : "bg-white/6 text-white/70 ring-1 ring-white/10 group-hover:bg-white/10 group-hover:text-white"
              }
            `}
            animate={
              link.accent
                ? {
                    boxShadow: [
                      "0 0 0px rgba(197,255,74,0)",
                      "0 0 16px rgba(197,255,74,0.25)",
                      "0 0 0px rgba(197,255,74,0)",
                    ],
                  }
                : undefined
            }
            transition={
              link.accent
                ? {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.4,
                  }
                : undefined
            }
            whileHover={{
              scale: 1.08,
              rotate: link.accent ? 360 : -8,
              transition: { type: "spring", stiffness: 260, damping: 18 },
            }}
          >
            {/* aura suave por trás dos lime accent */}
            {link.accent && (
              <span className="pointer-events-none absolute inset-0 rounded-xl bg-[#C5FF4A]/20 blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
            )}
            <Icon className="relative w-[20px] h-[20px]" />
          </motion.div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[15px] leading-tight text-white tracking-tight">
              {link.title}
            </h3>
            <p className="text-[12.5px] mt-1 text-white/55 truncate font-light">
              {link.description}
            </p>
          </div>

          <motion.div
            className={`
              shrink-0 transition-opacity duration-300 opacity-40 group-hover:opacity-100
              ${link.accent ? "text-[#C5FF4A]" : "text-white/70"}
            `}
            initial={false}
            whileHover={{ x: 2, y: -2 }}
          >
            <ArrowUpRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.a>
  );
}
