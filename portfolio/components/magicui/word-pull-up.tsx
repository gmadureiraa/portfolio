import { cn } from "../../lib/utils";
import { CSSProperties } from "react";

interface WordPullUpProps {
  words: string;
  delayMultiple?: number;
  /** Mantidos por compatibilidade de API — ignorados na versão CSS. */
  wrapperFramerProps?: unknown;
  framerProps?: unknown;
  className?: string;
  /**
   * Quando true, pinta direto no estado final (sem animação de entrada).
   * Usado no h1 do hero, que é o LCP — garante que o texto pinte no primeiro
   * frame, sem depender de JS/hidratação.
   */
  eager?: boolean;
}

/**
 * WordPullUp — entrada palavra-a-palavra, 100% CSS (sem framer-motion).
 *
 * No modo `eager` (hero/LCP) renderiza estático: zero animação, texto pintado
 * no HTML inicial. Sem `eager`, cada palavra sobe com stagger via
 * `animation-delay` incremental e a keyframe `bento-word-pull` (globals.css).
 * Respeita `prefers-reduced-motion`.
 */
export default function WordPullUp({
  words,
  delayMultiple = 0.12,
  className,
  eager = false,
}: WordPullUpProps) {
  return (
    <h1
      className={cn(
        "font-display text-center text-6xl md:text-7xl lg:text-8xl font-bold leading-[5rem] tracking-tighter drop-shadow-sm",
        className
      )}
    >
      {words.split(" ").map((word, i) => {
        const style: CSSProperties = {
          display: "inline-block",
          paddingRight: "1rem",
          ...(eager ? {} : { animationDelay: `${i * delayMultiple}s` }),
        };
        return (
          <span
            key={i}
            className={eager ? undefined : "bento-word-pull"}
            style={style}
          >
            {word === "" ? <span>&nbsp;</span> : word}
          </span>
        );
      })}
    </h1>
  );
}
