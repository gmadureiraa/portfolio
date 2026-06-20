import { cn } from "@/lib/utils";
import { CSSProperties, ReactNode } from "react";

interface BlurIntProps {
  children: ReactNode;
  className?: string;
  variant?: {
    hidden: { filter: string; opacity: number };
    visible: { filter: string; opacity: number };
  };
  duration?: number;
  /** Atraso em segundos — útil pra cascatear vários BlurIn. */
  delay?: number;
}

/**
 * BlurIn — entrada com blur+fade, agora 100% CSS (sem framer-motion).
 *
 * Era o principal motivo do framer-motion entrar no bundle crítico do home:
 * envolve todo BentoCard e o headline do hero (LCP). Trocado por uma keyframe
 * CSS (`bento-blur-in`, definida em globals.css) que produz o mesmo efeito,
 * respeita `prefers-reduced-motion` e tira ~106KB raw do caminho crítico.
 *
 * API preservada (children/className/variant/duration/delay) — nenhum caller
 * precisa mudar. `variant` customizado vira CSS vars pra honrar blur/opacity.
 */
const BlurIn = ({
  children,
  className,
  variant,
  duration = 0.33,
  delay = 0,
}: BlurIntProps) => {
  const style: CSSProperties & Record<string, string | number> = {
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
  };

  if (variant) {
    style["--blur-in-from-filter"] = variant.hidden.filter;
    style["--blur-in-from-opacity"] = variant.hidden.opacity;
    style["--blur-in-to-filter"] = variant.visible.filter;
    style["--blur-in-to-opacity"] = variant.visible.opacity;
  }

  return (
    <h1 className={cn("bento-blur-in", className)} style={style}>
      {children}
    </h1>
  );
};

export default BlurIn;
