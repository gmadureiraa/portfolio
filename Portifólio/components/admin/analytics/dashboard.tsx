"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Ga4Bundle } from "@/lib/analytics/ga4";
import type { PostHogBundle } from "@/lib/analytics/posthog";
import type { AnalyticsBundle } from "@/lib/db/newsletter";

const MONO = "font-mono text-[11px] uppercase tracking-[0.18em]";
const SERIF = "font-serif italic font-light";

interface Props {
  ga4: Ga4Bundle;
  posthog: PostHogBundle;
  nl: AnalyticsBundle | null;
  rangeDays: number;
  ga4Configured: boolean;
  posthogConfigured: boolean;
  dbConfigured: boolean;
}

export function AnalyticsDashboard({
  ga4,
  posthog,
  nl,
  rangeDays,
  ga4Configured,
  posthogConfigured,
  dbConfigured,
}: Props) {
  const router = useRouter();
  const params = useSearchParams();

  function setRange(days: number) {
    const next = new URLSearchParams(params.toString());
    next.set("range", String(days));
    router.push(`/admin/analytics?${next.toString()}`);
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Range selector */}
      <div className="flex items-center justify-between gap-2">
        <p className={`${MONO} text-muted-foreground`}>
          Período · últimos {rangeDays} dias
        </p>
        <div className="flex items-center gap-1.5">
          <RangePill active={rangeDays === 7} onClick={() => setRange(7)}>
            7d
          </RangePill>
          <RangePill active={rangeDays === 30} onClick={() => setRange(30)}>
            30d
          </RangePill>
          <RangePill active={rangeDays === 90} onClick={() => setRange(90)}>
            90d
          </RangePill>
          <RangePill active={rangeDays === 365} onClick={() => setRange(365)}>
            1ano
          </RangePill>
        </div>
      </div>

      {/* GA4 SECTION */}
      <section>
        <SectionHeader
          eyebrow="Google Analytics 4"
          title="Tráfego do site"
          subtitle={
            ga4Configured
              ? "Métricas do GA4 — madureira.xyz"
              : "GA4 ainda não configurado — veja instruções abaixo."
          }
        />

        {!ga4Configured ? (
          <Ga4SetupCard />
        ) : !ga4.totals ? (
          <div className="rounded-md border border-border bg-card p-6">
            <p className={`${SERIF} text-xl text-foreground`}>
              Sem dados ainda.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              GA4 está conectado mas não retornou linhas pro período. Pode ser
              que a service account não tenha acesso ou o GA4_PROPERTY_ID
              esteja errado. Confere os logs do Vercel.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
              <StatCard
                label="Usuários"
                value={fmtInt(ga4.totals.totalUsers)}
              />
              <StatCard
                label="Sessões"
                value={fmtInt(ga4.totals.sessions)}
              />
              <StatCard
                label="Pageviews"
                value={fmtInt(ga4.totals.screenPageViews)}
              />
              <StatCard
                label="Duração média"
                value={fmtDuration(ga4.totals.averageSessionDuration)}
              />
              <StatCard
                label="Bounce rate"
                value={fmtPercent(ga4.totals.bounceRate)}
              />
            </div>

            {/* Daily chart */}
            <div className="mt-6 rounded-md border border-border bg-card p-6">
              <p className={`${MONO} text-muted-foreground`}>
                Pageviews · {rangeDays} dias
              </p>
              <SparkArea
                data={ga4.daily.map((d) => ({ x: d.date, y: d.pageViews }))}
              />
            </div>

            {/* Top pages + sources */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <TopList
                title="Páginas mais lidas"
                items={ga4.topPages.map((p) => ({
                  primary: p.title || p.path,
                  secondary: p.path,
                  value: fmtInt(p.views),
                  href: p.path.startsWith("/") ? p.path : undefined,
                }))}
                empty="Sem páginas ainda."
              />
              <TopList
                title="Fontes de tráfego"
                items={ga4.sources.map((s) => ({
                  primary: s.source,
                  value: fmtInt(s.sessions),
                }))}
                empty="Sem fontes ainda."
              />
            </div>

            {/* Devices + Events */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <TopList
                title="Dispositivos"
                items={ga4.devices.map((d) => ({
                  primary: deviceLabel(d.category),
                  value: fmtInt(d.users),
                }))}
                empty="—"
              />
              <TopList
                title="Eventos"
                items={ga4.events.map((e) => ({
                  primary: e.eventName,
                  value: fmtInt(e.count),
                }))}
                empty="—"
                hint="Tip: dispara eventos GA4 em signups e cliques pra rastrear conversão."
              />
            </div>
          </>
        )}
      </section>

      {/* POSTHOG SECTION */}
      <section>
        <SectionHeader
          eyebrow="PostHog · Kaleidos Group"
          title="Comportamento + sessions"
          subtitle={
            posthogConfigured
              ? "Pageviews, eventos custom e top referrers — madureira.xyz no project unificado da Kaleidos."
              : "PostHog Personal API Key ainda não setada — instruções abaixo."
          }
        />

        {!posthogConfigured ? (
          <PostHogSetupCard />
        ) : !posthog.totals ? (
          <div className="rounded-md border border-border bg-card p-6">
            <p className={`${SERIF} text-xl text-foreground`}>
              Sem dados ainda.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              PostHog está conectado mas a query retornou vazio pro período.
              Confira se o token Personal API Key tem scope{" "}
              <code className="rounded bg-muted px-1 font-mono">
                query:read
              </code>{" "}
              e se o POSTHOG_PROJECT_ID está correto.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              <StatCard
                label="Pageviews"
                value={fmtInt(posthog.totals.pageviews)}
              />
              <StatCard
                label="Visitantes únicos"
                value={fmtInt(posthog.totals.uniqueVisitors)}
              />
              <StatCard
                label="Sessões"
                value={fmtInt(posthog.totals.sessions)}
              />
            </div>

            <div className="mt-6 rounded-md border border-border bg-card p-6">
              <p className={`${MONO} text-muted-foreground`}>
                Pageviews PostHog · {rangeDays} dias
              </p>
              <SparkArea
                data={posthog.daily.map((d) => ({
                  x: d.date,
                  y: d.pageviews,
                }))}
              />
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <TopList
                title="Páginas mais vistas"
                items={posthog.topPaths.map((p) => ({
                  primary: p.path,
                  value: fmtInt(p.views),
                  href: p.path.startsWith("/") ? p.path : undefined,
                }))}
                empty="Sem páginas ainda."
              />
              <TopList
                title="Referrers"
                items={posthog.topReferrers.map((r) => ({
                  primary: r.referrer,
                  value: fmtInt(r.visits),
                }))}
                empty="Sem referrers (todo tráfego direto)."
              />
            </div>

            <div className="mt-6">
              <TopList
                title="Eventos custom (top 10)"
                items={posthog.topEvents.map((e) => ({
                  primary: e.event,
                  value: fmtInt(e.count),
                }))}
                empty="Nenhum evento custom ainda. Dispare via posthog.capture()."
                hint="Eventos $pageview/$autocapture filtrados — só custom."
              />
            </div>
          </>
        )}
      </section>

      {/* NEWSLETTER INTERNAL */}
      <section>
        <SectionHeader
          eyebrow="Newsletter · Madureira®"
          title="A Carta"
          subtitle="Analytics interno — capturado direto no DB, sem depender de GA4."
        />

        {!dbConfigured ? (
          <div className="rounded-md border border-destructive/40 bg-card p-6">
            <p className={`${SERIF} text-xl text-foreground`}>
              DB não configurado.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Configure{" "}
              <code className="rounded bg-muted px-1 font-mono">
                DATABASE_URL
              </code>{" "}
              e rode{" "}
              <code className="rounded bg-muted px-1 font-mono">
                bun run scripts/migrate-newsletter.ts
              </code>
              .
            </p>
          </div>
        ) : !nl ? (
          <div className="rounded-md border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">
              Sem dados ainda. Quando os primeiros leitores chegarem aparece
              aqui.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                label="Subscribers confirmados"
                value={fmtInt(nl.totals.subscribers_confirmed)}
              />
              <StatCard
                label="Pendentes confirmar"
                value={fmtInt(nl.totals.subscribers_pending)}
              />
              <StatCard
                label="Views totais"
                value={fmtInt(nl.totals.views_all)}
              />
              <StatCard
                label="Views (30d)"
                value={fmtInt(nl.totals.views_30d)}
              />
            </div>

            <div className="mt-6 rounded-md border border-border bg-card p-6">
              <p className={`${MONO} text-muted-foreground`}>
                Views da newsletter · últimos 30 dias
              </p>
              <SparkArea
                data={nl.daily30d.map((d) => ({ x: d.day, y: d.count }))}
              />
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <TopList
                title="Edições mais lidas"
                items={nl.posts.slice(0, 10).map((p) => ({
                  primary: p.title,
                  secondary: `/newsletter/${p.slug}`,
                  value: fmtInt(p.view_count),
                  href: `/newsletter/${p.slug}`,
                }))}
                empty="Sem edições publicadas."
              />
              <TopList
                title="Referrers (30d)"
                items={nl.topReferrers.map((r) => ({
                  primary: r.referrer,
                  value: fmtInt(r.count),
                }))}
                empty="Sem referrers."
              />
            </div>

            <div className="mt-6">
              <TopList
                title="Fonte de captação dos leads"
                items={nl.subscriberSources.map((s) => ({
                  primary: s.source,
                  value: fmtInt(s.count),
                }))}
                empty="—"
                hint='Origem registrada no momento do signup (form, popup, lp).'
              />
            </div>
          </>
        )}
      </section>
    </div>
  );
}

// =========================================================================
// SUBCOMPONENTS
// =========================================================================

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-6 flex flex-col gap-1.5 border-b border-border pb-4">
      <p className={`${MONO} text-muted-foreground`}>● {eyebrow}</p>
      <h2 className={`${SERIF} text-3xl text-foreground`}>{title}</h2>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-card p-5">
      <p className={`${MONO} text-muted-foreground`}>{label}</p>
      <p className={`${SERIF} mt-2 text-4xl text-foreground`}>{value}</p>
    </div>
  );
}

function RangePill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`${MONO} h-9 rounded-md border px-3 transition-colors ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

interface ListItem {
  primary: string;
  secondary?: string;
  value: string;
  href?: string;
}

function TopList({
  title,
  items,
  empty,
  hint,
}: {
  title: string;
  items: ListItem[];
  empty: string;
  hint?: string;
}) {
  return (
    <div className="rounded-md border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className={`${MONO} text-muted-foreground`}>{title}</p>
      </div>
      {items.length === 0 ? (
        <p className="text-sm italic text-muted-foreground">{empty}</p>
      ) : (
        <ul className="divide-y divide-border">
          {items.map((it, i) => (
            <li
              key={`${it.primary}-${i}`}
              className="flex items-center justify-between gap-3 py-2.5"
            >
              <div className="min-w-0 flex-1">
                {it.href ? (
                  <a
                    href={it.href}
                    target="_blank"
                    rel="noopener"
                    className="block truncate text-sm text-foreground hover:underline"
                  >
                    {it.primary}
                  </a>
                ) : (
                  <p className="truncate text-sm text-foreground">
                    {it.primary}
                  </p>
                )}
                {it.secondary ? (
                  <p className="truncate font-mono text-[11px] text-muted-foreground">
                    {it.secondary}
                  </p>
                ) : null}
              </div>
              <span className={`${MONO} shrink-0 text-foreground`}>
                {it.value}
              </span>
            </li>
          ))}
        </ul>
      )}
      {hint ? (
        <p className="mt-3 text-xs italic text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

function Ga4SetupCard() {
  return (
    <div className="rounded-md border border-border bg-card p-6">
      <p className={`${SERIF} text-2xl text-foreground`}>
        GA4 não conectado.
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Os cards acima vão acender quando você configurar as env vars. Mesmo
        sem GA4, o analytics interno da newsletter já roda (rola pra baixo).
      </p>

      <div className="mt-5 space-y-3">
        <SetupStep
          n={1}
          title="Criar service account no Google Cloud"
          body={
            <>
              Acesse{" "}
              <a
                className="underline"
                href="https://console.cloud.google.com/iam-admin/serviceaccounts"
                target="_blank"
                rel="noopener"
              >
                IAM &rarr; Service Accounts
              </a>
              , cria uma conta nova (sem role) e gera uma chave JSON.
            </>
          }
        />
        <SetupStep
          n={2}
          title="Habilitar Google Analytics Data API"
          body={
            <>
              No mesmo projeto, ativa a{" "}
              <a
                className="underline"
                href="https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com"
                target="_blank"
                rel="noopener"
              >
                Google Analytics Data API
              </a>
              .
            </>
          }
        />
        <SetupStep
          n={3}
          title="Dar acesso de Viewer no GA4"
          body={
            <>
              GA4 Admin &rarr; Property Access Management &rarr; adicionar o
              email da service account (algo tipo{" "}
              <code className="rounded bg-muted px-1 font-mono text-[11px]">
                xxx@projeto.iam.gserviceaccount.com
              </code>
              ) com role <strong>Viewer</strong>.
            </>
          }
        />
        <SetupStep
          n={4}
          title="Setar env vars no Vercel"
          body={
            <ul className="ml-1 mt-1 space-y-1.5 text-sm">
              <li>
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]">
                  GOOGLE_APPLICATION_CREDENTIALS_JSON
                </code>{" "}
                — cola o JSON inteiro da chave (1 linha).
              </li>
              <li>
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]">
                  GA4_PROPERTY_ID
                </code>{" "}
                — só os números (GA4 Admin &rarr; Property Settings).
              </li>
            </ul>
          }
        />
        <SetupStep
          n={5}
          title="Redeploy"
          body="Refresh dessa página depois e os cards acendem."
        />
      </div>
    </div>
  );
}

function PostHogSetupCard() {
  return (
    <div className="rounded-md border border-border bg-card p-6">
      <p className={`${SERIF} text-2xl text-foreground`}>
        PostHog não conectado.
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        O SDK já está rodando em produção e capturando — falta só a Personal
        API Key pra puxar os dados pra cá via Query API (HogQL).
      </p>

      <div className="mt-5 space-y-3">
        <SetupStep
          n={1}
          title="Criar Personal API Key no PostHog"
          body={
            <>
              Acesse{" "}
              <a
                className="underline"
                href="https://us.posthog.com/settings/user-api-keys"
                target="_blank"
                rel="noopener"
              >
                Settings · Personal API Keys
              </a>{" "}
              e cria uma key com scopes <strong>query:read</strong>,{" "}
              <strong>event:read</strong>, <strong>insight:read</strong>,{" "}
              <strong>dashboard:read</strong>.
            </>
          }
        />
        <SetupStep
          n={2}
          title="Setar env vars no Vercel"
          body={
            <ul className="ml-1 mt-1 space-y-1.5 text-sm">
              <li>
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]">
                  POSTHOG_PERSONAL_API_KEY
                </code>{" "}
                — a key criada no passo 1 (começa com{" "}
                <code className="rounded bg-muted px-1 font-mono">phx_</code>).
              </li>
              <li>
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]">
                  POSTHOG_PROJECT_ID
                </code>{" "}
                = <code className="rounded bg-muted px-1 font-mono">387434</code>{" "}
                (Kaleidos Group).
              </li>
              <li>
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]">
                  POSTHOG_HOST
                </code>{" "}
                — opcional, default{" "}
                <code className="rounded bg-muted px-1 font-mono">
                  https://us.posthog.com
                </code>
                .
              </li>
            </ul>
          }
        />
        <SetupStep
          n={3}
          title="Redeploy"
          body="Refresh dessa página depois e os cards acendem."
        />
      </div>
    </div>
  );
}

function SetupStep({
  n,
  title,
  body,
}: {
  n: number;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span
        className={`${MONO} flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-foreground text-foreground`}
      >
        {n}
      </span>
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <div className="mt-0.5 text-sm text-muted-foreground">{body}</div>
      </div>
    </div>
  );
}

// =========================================================================
// CHART (inline SVG — sem deps novas)
// =========================================================================

function SparkArea({ data }: { data: Array<{ x: string; y: number }> }) {
  if (data.length === 0) {
    return (
      <p className="mt-3 text-sm italic text-muted-foreground">
        Sem dados no período.
      </p>
    );
  }

  const W = 800;
  const H = 200;
  const PAD_X = 8;
  const PAD_Y = 16;
  const innerW = W - PAD_X * 2;
  const innerH = H - PAD_Y * 2;

  const max = Math.max(...data.map((d) => d.y), 1);

  const pts = data.map((d, i) => {
    const x = PAD_X + (i / Math.max(1, data.length - 1)) * innerW;
    const y = PAD_Y + innerH - (d.y / max) * innerH;
    return { x, y, raw: d };
  });

  const pathD = pts.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(" ");
  const areaD = `${pathD} L${pts[pts.length - 1].x},${H - PAD_Y} L${pts[0].x},${H - PAD_Y} Z`;

  const total = data.reduce((acc, d) => acc + d.y, 0);
  const avg = Math.round(total / data.length);
  const peak = Math.max(...data.map((d) => d.y));

  return (
    <div className="mt-3">
      <div className="mb-3 flex gap-6">
        <ChartMetric label="Total" value={fmtInt(total)} />
        <ChartMetric label="Pico" value={fmtInt(peak)} />
        <ChartMetric label="Média/dia" value={fmtInt(avg)} />
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="h-44 w-full"
        role="img"
        aria-label="Gráfico de pageviews por dia"
      >
        <path
          d={areaD}
          fill="hsl(var(--foreground) / 0.08)"
          stroke="none"
        />
        <path
          d={pathD}
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth={1.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {pts.map((p, i) => {
          if (data.length > 14 && i !== 0 && i !== pts.length - 1 && p.raw.y !== peak)
            return null;
          return (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r={2.5}
                fill="hsl(var(--foreground))"
              />
            </g>
          );
        })}
      </svg>
      <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        <span>{shortDate(data[0]?.x)}</span>
        <span>{shortDate(data[data.length - 1]?.x)}</span>
      </div>
    </div>
  );
}

function ChartMetric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className={`${MONO} text-muted-foreground`}>{label}</p>
      <p className={`${SERIF} text-2xl text-foreground`}>{value}</p>
    </div>
  );
}

// =========================================================================
// FORMATTERS
// =========================================================================

function fmtInt(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 10000) return `${(n / 1000).toFixed(1)}k`;
  return n.toLocaleString("pt-BR");
}

function fmtDuration(s: number): string {
  const total = Math.max(0, Math.round(s));
  const m = Math.floor(total / 60);
  const sec = total % 60;
  return `${m}m ${sec.toString().padStart(2, "0")}s`;
}

function fmtPercent(p: number): string {
  return `${(p * 100).toFixed(1)}%`;
}

function deviceLabel(cat: string): string {
  if (cat === "desktop") return "Desktop";
  if (cat === "mobile") return "Mobile";
  if (cat === "tablet") return "Tablet";
  return cat;
}

function shortDate(d: string | undefined): string {
  if (!d) return "";
  // d = "YYYY-MM-DD"
  const parts = d.split("-");
  if (parts.length !== 3) return d;
  return `${parts[2]}/${parts[1]}`;
}
