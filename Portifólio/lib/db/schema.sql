-- ============================================================================
-- Newsletter schema — Neon Postgres
-- ============================================================================
-- Aplicar com: bun run scripts/migrate-newsletter.ts
-- (idempotente — pode rodar várias vezes)
-- ============================================================================

CREATE TABLE IF NOT EXISTS newsletters (
  id              SERIAL PRIMARY KEY,
  slug            TEXT UNIQUE NOT NULL,
  title           TEXT NOT NULL,
  excerpt         TEXT NOT NULL,
  content_md      TEXT NOT NULL,
  hero_image_url  TEXT,
  og_image_url    TEXT,
  published_at    TIMESTAMPTZ,
  sent_at         TIMESTAMPTZ,
  author_name     TEXT NOT NULL DEFAULT 'Gabriel Madureira',
  reading_time_min INTEGER,
  view_count      INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_newsletters_published
  ON newsletters(published_at DESC)
  WHERE published_at IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_newsletters_slug
  ON newsletters(slug);

-- ============================================================================

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id                  SERIAL PRIMARY KEY,
  email               TEXT UNIQUE NOT NULL,
  name                TEXT,
  source              TEXT,
  subscribed_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  unsubscribed_at     TIMESTAMPTZ,
  resend_contact_id   TEXT,
  confirmed           BOOLEAN NOT NULL DEFAULT FALSE,
  confirmation_token  TEXT,
  unsubscribe_token   TEXT
);

CREATE INDEX IF NOT EXISTS idx_subs_active
  ON newsletter_subscribers(email)
  WHERE unsubscribed_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_subs_confirm_token
  ON newsletter_subscribers(confirmation_token)
  WHERE confirmation_token IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_subs_unsub_token
  ON newsletter_subscribers(unsubscribe_token)
  WHERE unsubscribe_token IS NOT NULL;

-- ============================================================================
-- Trigger pra updated_at automático em newsletters
-- ============================================================================

CREATE OR REPLACE FUNCTION newsletter_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_newsletters_updated_at ON newsletters;
CREATE TRIGGER trg_newsletters_updated_at
  BEFORE UPDATE ON newsletters
  FOR EACH ROW
  EXECUTE FUNCTION newsletter_set_updated_at();
