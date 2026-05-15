import type { Metadata } from "next";
import Link from "next/link";
import { isAdminFromCookies, getAdminSecret } from "@/lib/server/admin";
import { AdminLogin } from "@/components/admin/login";
import {
  getAnalyticsBundle,
  isDbConfigured,
  type AnalyticsBundle,
} from "@/lib/db/newsletter";
import { getGa4Bundle, isGa4Configured } from "@/lib/analytics/ga4";
import { AnalyticsDashboard } from "@/components/admin/analytics/dashboard";

export const metadata: Metadata = {
  title: "Admin · Métricas — Madureira®",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const adminSecretSet = Boolean(getAdminSecret());
  const isAdmin = await isAdminFromCookies();

  if (!adminSecretSet) {
    return (
      <main className="bg-background min-h-screen w-full px-6 py-24">
        <div className="mx-auto max-w-xl rounded-md border border-destructive/40 bg-card p-6">
          <h1 className="font-serif text-2xl italic text-foreground">
            ADMIN_SECRET não configurado
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Configure a env var{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono">
              ADMIN_SECRET
            </code>{" "}
            no Vercel e faça redeploy.
          </p>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="bg-background min-h-screen w-full px-6 py-24">
        <div className="mx-auto max-w-md">
          <h1 className="mb-6 font-serif text-3xl italic text-foreground">
            Admin
          </h1>
          <AdminLogin />
        </div>
      </main>
    );
  }

  const { range } = await searchParams;
  const rangeDays =
    range === "7" ? 7 : range === "90" ? 90 : range === "365" ? 365 : 30;

  // GA4 (com fallback gracioso se env não setada)
  const ga4 = await getGa4Bundle(rangeDays).catch((err) => {
    console.error("[admin/analytics] ga4 fetch failed:", err);
    return {
      configured: isGa4Configured(),
      rangeDays,
      totals: null,
      daily: [],
      topPages: [],
      sources: [],
      devices: [],
      events: [],
    };
  });

  // Newsletter internal analytics (sempre disponível se DB configurado)
  let nl: AnalyticsBundle | null = null;
  if (isDbConfigured) {
    nl = await getAnalyticsBundle().catch(() => null);
  }

  return (
    <main className="bg-background min-h-screen w-full px-6 py-12 md:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              ● Admin · Madureira®
            </p>
            <h1 className="mt-3 font-serif text-5xl font-light italic leading-none text-foreground">
              Métricas
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Tráfego do site (GA4) + analytics interno da newsletter.
            </p>
          </div>
          <Link
            href="/admin/newsletter"
            className="inline-flex h-9 items-center rounded-md border border-border bg-background px-3 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground hover:bg-muted"
          >
            ← Newsletter
          </Link>
        </header>

        <AnalyticsDashboard
          ga4={ga4}
          nl={nl}
          rangeDays={rangeDays}
          ga4Configured={ga4.configured}
          dbConfigured={isDbConfigured}
        />
      </div>
    </main>
  );
}
