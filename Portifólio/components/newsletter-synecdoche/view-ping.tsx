"use client";

import { useEffect } from "react";

/**
 * Dispara POST /api/newsletter/[slug]/view 1x por mount.
 * O endpoint dedupe por IP+slug em janelas de 30min via rate-limit.
 */
export function ViewPing({ slug }: { slug: string }) {
  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/newsletter/${encodeURIComponent(slug)}/view`, {
      method: "POST",
      signal: controller.signal,
    }).catch(() => {});
    return () => controller.abort();
  }, [slug]);
  return null;
}
