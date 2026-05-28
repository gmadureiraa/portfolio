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

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => {
      mq.removeEventListener?.("change", apply);
    };
  }, []);

  if (reducedMotion) {
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
