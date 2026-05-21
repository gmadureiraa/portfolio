"use client";

import { useEffect } from "react";

/**
 * Dispara POST /api/newsletter/[slug]/view 1x por mount, mandando referrer +
 * UTM params da URL. O endpoint dedupe por IP+slug em janelas de 30min via
 * rate-limit (incremento de view_count) mas registra o evento bruto sempre,
 * pra analytics de origem do tráfego.
 */
export function ViewPing({ slug }: { slug: string }) {
  useEffect(() => {
    const controller = new AbortController();

    let referrer = "";
    let utm_source = "";
    let utm_medium = "";
    let utm_campaign = "";
    try {
      referrer = document.referrer || "";
      const params = new URLSearchParams(window.location.search);
      utm_source = params.get("utm_source") || "";
      utm_medium = params.get("utm_medium") || "";
      utm_campaign = params.get("utm_campaign") || "";
    } catch {
      /* noop */
    }

    fetch(`/api/newsletter/${encodeURIComponent(slug)}/view`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        referrer,
        utm_source,
        utm_medium,
        utm_campaign,
      }),
      signal: controller.signal,
    }).catch(() => {});

    return () => controller.abort();
  }, [slug]);

  return null;
}
