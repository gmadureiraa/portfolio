# AUDIT — Madureira Portfolio

- **URL produção:** https://madureira.xyz
- **Stack:** Next.js 16.2.2 (App Router + Turbopack) · React 19 · Tailwind 3.4 · shadcn/ui (Radix) · Framer Motion · Upstash Redis (newsletter) · PocketBase (stub) · Resend · Nodemailer · Umami analytics
- **Package manager:** Bun
- **Data audit:** 2026-04-21

---

## 1. Build

- `bun run build` → exit 0. Compilou em **2.9s**, 26 páginas em 253ms.
- `next.config.mjs` com `typescript.ignoreBuildErrors: true` — **build valida types mas passa mesmo com erros**. Bandeira vermelha: mascarando problemas.
- Rotas geradas (26 total):
  - 15 estáticas (`/`, `/projects`, `/projects/*` (11), `/sobre-mim`, `/technologies`, `/worldwide-reach`, `/deployments`, `/apple-icon.png`, `/icon.png`, `/robots.txt`, `/sitemap.xml`)
  - 8 API routes dynamic (`/api`, `/api/fetch-github-stars`, `/api/fetch-posts`, `/api/fetch-project-posts`, `/api/newsletter/subscribe`, `/api/posts/[slug]`, `/api/send-telegram-contact`, `/api/send-whatsapp-contact`)
  - 2 híbridas (`/newsletter`, `/posts/[slug]`)
- Zero warnings do Next. `Skipping validation of types` por causa do flag acima — **build rápido às custas de segurança**.
- Sem lint script configurado (`"lint"` não existe no `package.json`).

## 2. Deploy

- **Não linked ao Vercel CLI localmente** (`vercel env ls production` → "Your codebase isn't linked").
- `curl -I https://madureira.xyz` → HTTP/2 200, Vercel edge, `x-vercel-cache: HIT`, `age: 427963` (~5 dias sem rebuild), HSTS 2 anos.
- `vercel.json` com `regions: ["gru1"]` ✓ (edge em São Paulo, certo pra público BR).
- Content length: 104KB HTML — grande. Homepage tem Bento com muitas imagens/animações inline.

## 3. Integrações

- **Upstash Redis** para newsletter (aceita tanto `KV_REST_API_*` quanto `UPSTASH_REDIS_REST_*`).
- **GitHub API** via `/api/fetch-github-stars` + `/api/fetch-project-posts`.
- **Resend** (email marketing) + **Nodemailer** (SMTP) — duplicidade.
- **PocketBase** (`pocketbase@0.21.3`) — dependência incluída mas pasta `pb/` presente. Uso não verificado no scan rápido.
- **Telegram Bot** via `/api/send-telegram-contact` (usa `TELEGRAM_BOT_TOKEN`, `TELEGRAM_USER_ID`).
- **WhatsApp** via `/api/send-whatsapp-contact` (endpoint existe; integração não auditada).
- **Umami** analytics self-hosted (componente `<Umami />` no layout).
- **Framer Motion** + **react-icon-cloud** + **cobe** (globe 3D) + **react-spring** + **recharts** — bundle animations pesado.
- **MDX/Markdown** via `gray-matter` + `marked` para posts em `content/posts/` (5 posts hoje).
- **Zod** + **react-hook-form** + **@hookform/resolvers** para forms.
- **Joycostudio v0-setup** (`@joycostudio/v0-setup`) — dependência exótica, verificar necessidade.

## 4. Env Vars (production)

- Projeto **não linkado ao Vercel CLI**.
- `.env.example` documenta:
  - `NEXT_PUBLIC_BASE_URL`
  - `GITHUB_USERNAME=gmadureiraa`, `GITHUB_URL`, `AVATAR_URL`
  - `REPO_NAME`, `NEXT_PUBLIC_PORTFOLIO_URL`
  - `NEXT_PUBLIC_AVAILABLE_FOR_FREELANCE`, `NEXT_PUBLIC_DISCORD`
  - `TELEGRAM_BOT_TOKEN`, `TELEGRAM_USER_ID`
- **Não documentadas no `.env.example`** (mas referenciadas no código):
  - `KV_REST_API_URL` / `KV_REST_API_TOKEN` (ou `UPSTASH_REDIS_REST_URL` / `_TOKEN`)
  - `RESEND_API_KEY` (resend)
  - SMTP vars (nodemailer)
  - Umami URL/website ID

## 5. SEO

- Metadata forte em `layout.tsx`: title template, description, metadataBase `https://madureira.xyz`, OG completo (image `og-image.png` 1200x630 PNG ✓), Twitter summary_large_image com `creator: @madureira_eth`, robots index+follow.
- JSON-LD `Person` schema inline no `<head>` — excelente.
- `app/sitemap.ts` estático (7 URLs hard-coded, não inclui todos os `/projects/*` nem posts dinâmicos). **Gap**: os 11 projetos e 5 posts existem em `app/projects/*` mas só 3 estão listados no sitemap.
- `app/robots.ts` simples (userAgent * allow /). ✓
- `/icon.png` e `/apple-icon.png` servidos via rota Next. ✓
- `og-image.png` estático referenciado.

## 6. Performance

- 104KB HTML initial é **muito grande para homepage**. Bento component provavelmente inclui bastante SVG/embed inline.
- Framer Motion + react-spring + recharts + cobe + react-icon-cloud = bundle pesado de animações. Sem code splitting evidente (não auditado em detalhe).
- `images.remotePatterns` aceita `github.com`, `avatars.githubusercontent.com`, `images.unsplash.com`. ✓ (usa next/image)
- `gru1` region na Vercel ✓.
- HTTP/2 + HIT cache ✓ (`age: 427963`).
- Umami script injetado — overhead mínimo.
- `ignoreBuildErrors: true` = build rápido mas zero safety net.
- Fonts: Inter via `next/font` (sem `display: swap` explícito — inherit default "swap" do Next). ✓

## 7. Acessibilidade

- shadcn/ui + Radix = base a11y sólida (Dialog, Dropdown, Toast, Tooltip).
- `lang="pt-BR"`, `disableTransitionOnChange` no ThemeProvider ✓ (respeita reduce-motion implicitamente).
- `defaultTheme="dark"` + `enableSystem` ✓.
- Toaster presente ✓.
- Globe/orbit/cobe components podem ignorar `prefers-reduced-motion` — precisa audit.
- Contraste dark mode não auditado.
- `<Umami />` componente no layout pós-children ✓.

## 8. Segurança

- `typescript.ignoreBuildErrors: true` — **P1**: deployando com TS errors não detectados. Um dia um erro crítico vai passar.
- `.env.example` **não inclui** as secrets reais usadas (Upstash, Resend, SMTP, Telegram) — risco de dev novo não setar, quebrar silenciosamente ou expor defaults vazios.
- Newsletter endpoint `/api/newsletter/subscribe` usa fallback gracioso (`console.log` sem KV) — em prod isso **perde emails silenciosamente** se a Upstash cair.
- Armazenamento de email na Upstash: lista simples em key `newsletter:emails`. **Sem hash, sem índice** — a lista cresce linear, `emailList.includes(email)` O(n). 10k inscritos = request lento.
- **Sem rate limit** em `/api/newsletter/subscribe`, `/api/send-telegram-contact`, `/api/send-whatsapp-contact`. Qualquer um pode spammar Telegram/WhatsApp do Gabriel.
- Telegram tokens em env vars (ok), mas endpoint público sem auth.
- Sem CSP header.
- HSTS + Vercel defaults OK, mas `vercel.json` vazio (só `framework` + `regions`) — sem headers custom.
- Schema Zod em `newsletterSchema` — bom.

## 9. UX

- Homepage é um Bento grid — clean, moderno, informativo.
- 11 páginas de projects detalhadas — profundidade alta (bom pra SEO + storytelling).
- 5 MDX posts em `content/posts/` — base de blog ativa.
- Theme toggle presente (ThemeProvider + `theme-toggle.tsx`).
- Newsletter com toast feedback ✓.
- Contact via Telegram + WhatsApp — dois canais.
- AUDIT-COMPLETO-PORTFOLIO.md e AUDIT-PORTFOLIO.md já existem no repo — sinal que o projeto passou por audits internas.
- Tons de toast/message em PT-BR, copy no tom Madureira ("Valeu!", "Bem-vindo"). ✓

## 10. Docs

- `README.md` presente.
- Dois audits prévios na raiz: `AUDIT-COMPLETO-PORTFOLIO.md`, `AUDIT-PORTFOLIO.md` — **deveriam virar `docs/` ou archive**. Raiz poluída.
- Screenshot solto na raiz: `Captura de Tela 2025-05-24 às 22.48.41.png` — lixo.
- Pasta `pb/` (PocketBase data?) na raiz — estrutura confusa.
- Sem CHANGELOG.
- `.env.example` incompleto (faltam Upstash/Resend/SMTP).

---

## Prioridades

### P0 (bloqueante — fazer nas próximas 24h)
1. **Remover `typescript.ignoreBuildErrors: true`** do `next.config.mjs`. Fix os errors que aparecerem — estão sendo escondidos.
2. **Rate limiting em `/api/send-telegram-contact` e `/api/send-whatsapp-contact`.** Endpoints públicos sem throttle = vetor de spam pessoal direto no Telegram do Gabriel.

### P1 (alto — próximos 7 dias)
3. Atualizar `.env.example` com todas as envs reais (Upstash KV, Resend, SMTP, Umami).
4. Linkar o projeto ao Vercel CLI (`vercel link`).
5. Sitemap dinâmico — gerar entries dos 11 `/projects/*` e dos posts MDX automaticamente (ler filesystem ou usar `generateStaticParams`).
6. Rate limit em `/api/newsletter/subscribe` também.
7. Trocar storage de emails: `set` (`newsletter:email:<hash>`) em vez de lista única. Ou migrar para Supabase/Neon com tabela.
8. Limpar raiz: mover `AUDIT-*.md` pra `docs/audits/`, apagar screenshot solto.
9. Adicionar `"lint": "next lint"` ao package.json + rodar.

### P2 (médio — próximo mês)
10. CSP header no `vercel.json` + X-Frame-Options.
11. Avaliar dependências não usadas: `pocketbase`, `@joycostudio/v0-setup`, `path`, `url` (pacotes node stdlib duplicados como deps frontend são code smell). Remove o que não usar.
12. Consolidar Resend vs Nodemailer — duas libs pra envio de email, escolher uma.
13. Audit `prefers-reduced-motion` nos componentes cobe/orbit/globe.
14. Homepage 104KB é alta — code split Bento em partes lazy-loaded.
15. JSON-LD também por post individual (BlogPosting schema).

---

## Top 5 Recomendações

1. **Remover `ignoreBuildErrors`** — ponto cego crítico. Build passando não prova nada hoje.
2. **Rate limit nos endpoints Telegram/WhatsApp** — contato pessoal exposto ao mundo sem throttle é bomba-relógio.
3. **Sitemap dinâmico completo** — os 11 projetos detalhados estão invisíveis pro Google hoje (sitemap lista só 7 URLs de 26).
4. **Atualizar `.env.example` e linkar ao Vercel** — onboarding de agente/dev futuro vai falhar sem isso.
5. **Limpar dependências mortas** (pocketbase, @joycostudio/v0-setup, path, url) + raiz do repo (AUDIT antigos + screenshot solto). Projeto pessoal vira referência de processo; higiene importa.
