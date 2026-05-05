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
          relative overflow-hidden rounded-2xl transition-all duration-300
          ${link.accent ? "glass-card-accent" : "glass-card"}
        `}
      >
        {link.accent && (
          <>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_50%,rgba(255,122,74,0.18),transparent_55%)]" />
            </div>
            <div className="absolute -inset-px rounded-2xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500 [background:linear-gradient(135deg,rgba(255,122,74,0.45),transparent_45%,rgba(255,122,74,0.25))] [mask:linear-gradient(white,white)_content-box,linear-gradient(white,white)] [mask-composite:exclude] [-webkit-mask-composite:xor] p-px" />
          </>
        )}

        <div className="relative flex items-center gap-4 px-6 py-5 min-h-[80px]">
          <div
            className={`
              flex items-center justify-center w-12 h-12 rounded-xl shrink-0 transition-all duration-300
              ${
                link.accent
                  ? "bg-[#FF7A4A]/20 text-[#FFB089] group-hover:bg-[#FF7A4A]/30 group-hover:text-[#FFD0B0] shadow-[0_0_24px_rgba(255,122,74,0.25)]"
                  : "bg-white/5 text-white/60 group-hover:text-white group-hover:bg-white/10"
              }
            `}
          >
            <Icon className="w-[22px] h-[22px]" />
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
            <p
              className={`
                text-[13px] mt-1 truncate transition-colors duration-300
                ${link.accent ? "text-white/70" : "text-white/50"}
              `}
            >
              {link.description}
            </p>
          </div>

          <ArrowUpRight
            className={`
              w-4 h-4 shrink-0 transition-all duration-300 opacity-50 group-hover:opacity-100
              -translate-x-1 group-hover:translate-x-0
              ${link.accent ? "text-[#FFB089] group-hover:text-[#FFD0B0]" : "text-white/60"}
            `}
          />
        </div>
      </div>
    </motion.a>
  );
}
