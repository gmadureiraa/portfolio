"use client";

import posthog from "posthog-js";
import {
  PostHogProvider as PHProvider,
  usePostHog,
} from "posthog-js/react";
import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;
    posthog.init(key, {
      api_host: "/ingest",
      ui_host: "https://us.posthog.com",
      capture_pageview: false, // SPA: disparado manual no PostHogPageView
      capture_pageleave: true,
      autocapture: true,
      // DADOS DE ACESSO + CLIQUE (sem gravação de sessão — Gabriel não quer replay):
      // autocapture + heatmaps + dead clicks + exceptions + web vitals.
      capture_exceptions: true,
      capture_dead_clicks: true,
      capture_heatmaps: true,
      capture_performance: { web_vitals: true, network_timing: false },
      person_profiles: "always",
      disable_session_recording: true,
      disable_surveys: true,
      loaded: (ph) => {
        ph.register({
          site: "madureira",
        });
      },
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  );
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ph = usePostHog();

  useEffect(() => {
    if (!pathname || !ph) return;
    let url = window.location.origin + pathname;
    const search = searchParams?.toString();
    if (search) url += `?${search}`;
    ph.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams, ph]);

  return null;
}

function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
}
