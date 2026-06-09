/**
 * Newsletter DAL (data access layer).
 *
 * Tudo que toca `newsletters` e `newsletter_subscribers` passa por aqui.
 * Funções retornam `null`/array vazio quando o DB não está configurado, pra
 * deixar o caller decidir se trata como erro ou silencia.
 */

import { sql, isDbConfigured } from "./index";
import crypto from "node:crypto";

// ----------------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------------

export interface Newsletter {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content_md: string;
  hero_image_url: string | null;
  og_image_url: string | null;
  published_at: Date | null;
  sent_at: Date | null;
  author_name: string;
  reading_time_min: number | null;
  view_count: number;
  created_at: Date;
  updated_at: Date;
}

export type NewsletterListItem = Pick<
  Newsletter,
  | "id"
  | "slug"
  | "title"
  | "excerpt"
  | "hero_image_url"
  | "published_at"
  | "reading_time_min"
  | "view_count"
>;

export interface Subscriber {
  id: number;
  email: string;
  name: string | null;
  source: string | null;
  subscribed_at: Date;
  unsubscribed_at: Date | null;
  resend_contact_id: string | null;
  confirmed: boolean;
  confirmation_token: string | null;
  unsubscribe_token: string | null;
}

export interface NewsletterUpsertInput {
  slug: string;
  title: string;
  excerpt: string;
  content_md: string;
  hero_image_url?: string | null;
  og_image_url?: string | null;
  published_at?: Date | null;
  author_name?: string;
}

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

const WORDS_PER_MIN = 220;

export function calcReadingTimeMin(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MIN));
}

export function genToken(bytes = 24): string {
  return crypto.randomBytes(bytes).toString("base64url");
}

// ----------------------------------------------------------------------------
// Newsletters (posts)
// ----------------------------------------------------------------------------

export async function listPublishedNewsletters(): Promise<NewsletterListItem[]> {
  if (!sql) return [];
  return sql<NewsletterListItem[]>`
    SELECT id, slug, title, excerpt, hero_image_url, published_at,
           reading_time_min, view_count
    FROM newsletters
    WHERE published_at IS NOT NULL AND published_at <= now()
    ORDER BY published_at DESC
  `;
}

export async function listAllNewsletters(): Promise<Newsletter[]> {
  if (!sql) return [];
  return sql<Newsletter[]>`
    SELECT * FROM newsletters
    ORDER BY COALESCE(published_at, created_at) DESC
  `;
}

export async function getNewsletterBySlug(
  slug: string,
): Promise<Newsletter | null> {
  if (!sql) return null;
  const rows = await sql<Newsletter[]>`
    SELECT * FROM newsletters WHERE slug = ${slug} LIMIT 1
  `;
  return rows[0] || null;
}

export async function upsertNewsletter(
  input: NewsletterUpsertInput,
): Promise<Newsletter | null> {
  if (!sql) return null;

  const reading_time_min = calcReadingTimeMin(input.content_md);
  const author = input.author_name || "Gabriel Madureira";

  const rows = await sql<Newsletter[]>`
    INSERT INTO newsletters (
      slug, title, excerpt, content_md, hero_image_url, og_image_url,
      published_at, author_name, reading_time_min
    ) VALUES (
      ${input.slug},
      ${input.title},
      ${input.excerpt},
      ${input.content_md},
      ${input.hero_image_url ?? null},
      ${input.og_image_url ?? null},
      ${input.published_at ?? null},
      ${author},
      ${reading_time_min}
    )
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title,
      excerpt = EXCLUDED.excerpt,
      content_md = EXCLUDED.content_md,
      hero_image_url = EXCLUDED.hero_image_url,
      og_image_url = EXCLUDED.og_image_url,
      published_at = EXCLUDED.published_at,
      author_name = EXCLUDED.author_name,
      reading_time_min = EXCLUDED.reading_time_min
    RETURNING *
  `;

  return rows[0] || null;
}

export async function deleteNewsletter(slug: string): Promise<boolean> {
  if (!sql) return false;
  const rows = await sql`
    DELETE FROM newsletters WHERE slug = ${slug} RETURNING id
  `;
  return rows.length > 0;
}

export async function incrementViewCount(slug: string): Promise<void> {
  if (!sql) return;
  await sql`
    UPDATE newsletters SET view_count = view_count + 1
    WHERE slug = ${slug} AND published_at IS NOT NULL
  `;
}

export async function markNewsletterSent(slug: string): Promise<void> {
  if (!sql) return;
  await sql`
    UPDATE newsletters SET sent_at = NOW() WHERE slug = ${slug}
  `;
}

// ----------------------------------------------------------------------------
// Subscribers
// ----------------------------------------------------------------------------

export interface UpsertSubscriberInput {
  email: string;
  name?: string | null;
  source?: string | null;
}

export interface UpsertSubscriberResult {
  subscriber: Subscriber;
  isNew: boolean;
}

export async function upsertSubscriber(
  input: UpsertSubscriberInput,
): Promise<UpsertSubscriberResult | null> {
  if (!sql) return null;

  const confirmation_token = genToken();
  const unsubscribe_token = genToken();
  const email = input.email.toLowerCase().trim();

  const rows = await sql<(Subscriber & { is_new: boolean })[]>`
    INSERT INTO newsletter_subscribers (
      email, name, source, confirmation_token, unsubscribe_token
    ) VALUES (
      ${email},
      ${input.name ?? null},
      ${input.source ?? null},
      ${confirmation_token},
      ${unsubscribe_token}
    )
    ON CONFLICT (email) DO UPDATE SET
      unsubscribed_at = NULL,
      name = COALESCE(newsletter_subscribers.name, EXCLUDED.name),
      source = COALESCE(newsletter_subscribers.source, EXCLUDED.source),
      confirmation_token = COALESCE(
        newsletter_subscribers.confirmation_token, EXCLUDED.confirmation_token
      ),
      unsubscribe_token = COALESCE(
        newsletter_subscribers.unsubscribe_token, EXCLUDED.unsubscribe_token
      )
    RETURNING *, (xmax = 0) AS is_new
  `;

  const row = rows[0];
  if (!row) return null;
  const { is_new, ...subscriber } = row as Subscriber & { is_new: boolean };
  return { subscriber, isNew: is_new };
}

export async function confirmSubscriber(
  token: string,
): Promise<Subscriber | null> {
  if (!sql) return null;
  const rows = await sql<Subscriber[]>`
    UPDATE newsletter_subscribers
    SET confirmed = TRUE
    WHERE confirmation_token = ${token}
      AND unsubscribed_at IS NULL
    RETURNING *
  `;
  return rows[0] || null;
}

export async function unsubscribeByToken(
  token: string,
): Promise<Subscriber | null> {
  if (!sql) return null;
  const rows = await sql<Subscriber[]>`
    UPDATE newsletter_subscribers
    SET unsubscribed_at = NOW()
    WHERE unsubscribe_token = ${token}
      AND unsubscribed_at IS NULL
    RETURNING *
  `;
  return rows[0] || null;
}

export async function listConfirmedActiveSubscribers(): Promise<Subscriber[]> {
  if (!sql) return [];
  return sql<Subscriber[]>`
    SELECT * FROM newsletter_subscribers
    WHERE confirmed = TRUE
      AND unsubscribed_at IS NULL
    ORDER BY subscribed_at ASC
  `;
}

export async function countConfirmedActiveSubscribers(): Promise<number> {
  if (!sql) return 0;
  const rows = await sql<{ c: string }[]>`
    SELECT COUNT(*)::text AS c FROM newsletter_subscribers
    WHERE confirmed = TRUE AND unsubscribed_at IS NULL
  `;
  return Number(rows[0]?.c || 0);
}

// ----------------------------------------------------------------------------
// Events / Analytics
// ----------------------------------------------------------------------------

export interface RecordEventInput {
  slug: string;
  eventType?: string;
  ipHash?: string | null;
  referrer?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
}

export async function recordNewsletterEvent(
  input: RecordEventInput,
): Promise<void> {
  if (!sql) return;
  const clamp = (v: string | null | undefined, n = 512) =>
    typeof v === "string" && v.trim() ? v.trim().slice(0, n) : null;
  await sql`
    INSERT INTO newsletter_events (
      slug, event_type, ip_hash, referrer, utm_source, utm_medium, utm_campaign
    ) VALUES (
      ${input.slug},
      ${input.eventType || "view"},
      ${clamp(input.ipHash, 64)},
      ${clamp(input.referrer)},
      ${clamp(input.utmSource, 128)},
      ${clamp(input.utmMedium, 128)},
      ${clamp(input.utmCampaign, 128)}
    )
  `;
}

export interface PostViewStat {
  slug: string;
  title: string;
  published_at: Date | null;
  view_count: number;
  events_total: number;
  events_30d: number;
  events_7d: number;
}

export interface DailyPoint {
  day: string; // YYYY-MM-DD
  count: number;
}

export interface ReferrerStat {
  referrer: string;
  count: number;
}

export interface SourceStat {
  source: string;
  count: number;
}

export interface AnalyticsBundle {
  posts: PostViewStat[];
  daily30d: DailyPoint[];
  topReferrers: ReferrerStat[];
  subscriberSources: SourceStat[];
  totals: {
    views_all: number;
    views_30d: number;
    subscribers_confirmed: number;
    subscribers_pending: number;
  };
}

export async function getAnalyticsBundle(): Promise<AnalyticsBundle | null> {
  if (!sql) return null;

  const [posts, daily30d, topReferrers, subscriberSources, totalsRow] =
    await Promise.all([
      sql<PostViewStat[]>`
        SELECT
          n.slug,
          n.title,
          n.published_at,
          n.view_count,
          COALESCE(e.events_total, 0)::int AS events_total,
          COALESCE(e.events_30d, 0)::int   AS events_30d,
          COALESCE(e.events_7d, 0)::int    AS events_7d
        FROM newsletters n
        LEFT JOIN (
          SELECT
            slug,
            COUNT(*) AS events_total,
            COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '30 days') AS events_30d,
            COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days')  AS events_7d
          FROM newsletter_events
          WHERE event_type = 'view'
          GROUP BY slug
        ) e ON e.slug = n.slug
        ORDER BY COALESCE(n.published_at, n.created_at) DESC
      `,
      sql<DailyPoint[]>`
        SELECT
          to_char(d.day, 'YYYY-MM-DD') AS day,
          COALESCE(COUNT(ev.id), 0)::int AS count
        FROM generate_series(
          (CURRENT_DATE - INTERVAL '29 days'),
          CURRENT_DATE,
          INTERVAL '1 day'
        ) AS d(day)
        LEFT JOIN newsletter_events ev
          ON ev.event_type = 'view'
          AND ev.created_at::date = d.day
        GROUP BY d.day
        ORDER BY d.day ASC
      `,
      sql<ReferrerStat[]>`
        SELECT
          COALESCE(NULLIF(referrer, ''), 'direto') AS referrer,
          COUNT(*)::int AS count
        FROM newsletter_events
        WHERE event_type = 'view'
          AND created_at > NOW() - INTERVAL '30 days'
        GROUP BY 1
        ORDER BY count DESC
        LIMIT 10
      `,
      sql<SourceStat[]>`
        SELECT
          COALESCE(NULLIF(source, ''), 'desconhecido') AS source,
          COUNT(*)::int AS count
        FROM newsletter_subscribers
        WHERE unsubscribed_at IS NULL
        GROUP BY 1
        ORDER BY count DESC
      `,
      sql<
        {
          views_all: number;
          views_30d: number;
          subs_confirmed: number;
          subs_pending: number;
        }[]
      >`
        SELECT
          (SELECT COUNT(*) FROM newsletter_events WHERE event_type = 'view')::int AS views_all,
          (SELECT COUNT(*) FROM newsletter_events WHERE event_type = 'view'
             AND created_at > NOW() - INTERVAL '30 days')::int AS views_30d,
          (SELECT COUNT(*) FROM newsletter_subscribers
             WHERE confirmed = TRUE AND unsubscribed_at IS NULL)::int AS subs_confirmed,
          (SELECT COUNT(*) FROM newsletter_subscribers
             WHERE confirmed = FALSE AND unsubscribed_at IS NULL)::int AS subs_pending
      `,
    ]);

  const t = totalsRow[0];
  return {
    posts,
    daily30d,
    topReferrers,
    subscriberSources,
    totals: {
      views_all: t?.views_all ?? 0,
      views_30d: t?.views_30d ?? 0,
      subscribers_confirmed: t?.subs_confirmed ?? 0,
      subscribers_pending: t?.subs_pending ?? 0,
    },
  };
}

export { isDbConfigured };
