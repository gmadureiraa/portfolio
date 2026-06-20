import { cn } from "@/lib/utils";
import { CSSProperties, ReactNode } from "react";

type FadeTextProps = {
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  /** Mantido por compatibilidade de API — ignorado na versão CSS. */
  framerProps?: unknown;
  children: ReactNode;
};

/**
 * FadeIn — entrada com deslize+fade, 100% CSS (sem framer-motion).
 *
 * Direção define o offset inicial (translate). A keyframe vive em globals.css
 * (`bento-fade-slide`) e lê `--fade-from-x/--fade-from-y`. Respeita
 * `prefers-reduced-motion`. API preservada pros callers existentes.
 */
export function FadeIn({
  direction = "up",
  className,
  children,
}: FadeTextProps) {
  const offset = 20;
  const map: Record<string, { x: number; y: number }> = {
    up: { x: 0, y: offset },
    down: { x: 0, y: -offset },
    left: { x: -offset, y: 0 },
    right: { x: offset, y: 0 },
  };
  const { x, y } = map[direction];

  const style: CSSProperties & Record<string, string> = {
    "--fade-from-x": `${x}px`,
    "--fade-from-y": `${y}px`,
  };

  return (
    <div className="bento-fade-slide" style={style}>
      <span className={cn(className)}>{children}</span>
    </div>
  );
}
