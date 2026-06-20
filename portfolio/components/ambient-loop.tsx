"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AmbientLoop — vídeo loop atmosférico, monocromático.
 *
 * Gerado via Higgsfield Kling 3.0 (5s, 1280x720, no audio).
 *
 * Regras:
 *  - Respeita `prefers-reduced-motion`: se usuário pediu menos motion, mostra
 *    poster estático e nunca chama play() no <video>.
 *  - Default opacity baixa (12%) para virar textura, não competir com texto.
 *  - `autoPlay muted playsInline loop` — atende safari iOS sem promp.
 */
export function AmbientLoop({
  className = "",
  style,
  opacity = 0.12,
  ariaLabel = "",
}: {
  className?: string;
  style?: React.CSSProperties;
  opacity?: number;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  // Mobile: nunca carrega o vídeo (178KB webm / 364KB mp4). Ele é textura a 18%
  // de opacidade — invisível na prática no mobile e custa banda + decode no
  // exato momento crítico do LCP do hero. Mostra só o poster estático (33KB).
  // `true` por padrão (mobile-first SSR) até o efeito medir o viewport.
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const widthMq = window.matchMedia("(min-width: 768px)");
    const apply = () => {
      setReducedMotion(motionMq.matches);
      setIsMobile(!widthMq.matches);
    };
    apply();
    motionMq.addEventListener?.("change", apply);
    widthMq.addEventListener?.("change", apply);
    return () => {
      motionMq.removeEventListener?.("change", apply);
      widthMq.removeEventListener?.("change", apply);
    };
  }, []);

  if (reducedMotion || isMobile) {
    return (
      <div
        aria-hidden="true"
        className={className}
        style={{
          opacity,
          backgroundImage:
            "url(/assets/generated/hero-loop-poster.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          ...style,
        }}
      />
    );
  }

  return (
    <video
      ref={ref}
      aria-hidden={ariaLabel ? undefined : "true"}
      aria-label={ariaLabel || undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/assets/generated/hero-loop-poster.jpg"
      className={className}
      style={{
        opacity,
        objectFit: "cover",
        ...style,
      }}
    >
      <source src="/assets/generated/hero-loop.webm" type="video/webm" />
      <source src="/assets/generated/hero-loop.mp4" type="video/mp4" />
    </video>
  );
}

export default AmbientLoop;
