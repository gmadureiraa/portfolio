# Madureira Portfolio (madureira.xyz)

Portfolio pessoal de **Gabriel Madureira** — fundador da Kaleidos, criador de
produtos digitais em IA, marketing e cripto. Site público em
[madureira.xyz](https://madureira.xyz) com layout bento, lista de produtos,
landing de mentoria (`/eu`) e newsletter (`/newsletter`).

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS 3.4** + Magic UI / Shadcn
- **Framer Motion** + COBE (globe interativo)
- **Resend** pra newsletter / contato
- Hospedagem **Vercel** (região GRU1, São Paulo)

## Rotas principais

| Rota | Conteúdo |
|------|----------|
| `/` | Bento grid — hero, projetos, marketing+código, automação & IA, Kaleidos |
| `/projects` | Lista filtrável de produtos (grid/list, filtros por área e tipo) |
| `/projects/<slug>` | Pages internas dos produtos com case studies |
| `/eu` | Landing de mentoria 1:1 + consultoria + newsletter (em refator) |
| `/newsletter` | Página da newsletter (Resend, layout Synecdoche) |
| `/sobre-mim` | About page |
| `/posts/[slug]` | Posts vindos do PocketBase (legado) |

## Estrutura

```
Portifólio/
├── app/                # Next.js App Router (pages)
├── components/         # bento, hero, technologies, magic UI helpers
│   ├── magicui/        # bento-grid, marquee, particles, retro-grid, etc.
│   └── newsletter-synecdoche/  # módulo da página /newsletter
├── lib/
│   ├── constants.ts    # socialLinks, profile (handles, email, domínio)
│   ├── posts.ts        # fetcher PocketBase (posts/comments/projects)
│   ├── integrations/   # resend, telegram, whatsapp
│   └── server/         # rate-limit, auth helpers
├── public/             # OG image, favicon, /images/projects/*.png
└── docs/audits/        # AUDIT-COMPLETO-PORTFOLIO.md, AUDIT-PORTFOLIO.md
```

## Desenvolvimento

```bash
bun install
bun run dev        # http://localhost:3000
bun run typecheck
bun run build      # next build
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha. Mínimo pra dev:

- `NEXT_PUBLIC_AVAILABLE_FOR_FREELANCE=true|false` — bolinha verde/amarela no bento
- `RESEND_API_KEY` — pra `/api/newsletter/subscribe` e contato

Em produção (Vercel), as vars críticas estão configuradas no dashboard.

## Deploy

```bash
vercel --prod
```

Ou push pra `main` que dispara CI automático no Vercel.

## Convenções

- **Idioma**: português brasileiro em copy e UI.
- **Design**: dark theme default, cream secondary, accent verde/lime.
- **Tipografia**: Inter (sans), Instrument Serif (display nas pages legais e
  newsletter). Mono para badges/labels.
- **Tom**: informal, direto, exemplos concretos. Sem hashtags.
- **Twitter handle**: `@madureira0x` (em transição pra `@ogmadureira` —
  lib/constants.ts é a fonte da verdade).

## Páginas legais

- `/privacy` — Política de Privacidade (a criar)
- `/terms` — Termos de uso (a criar)

> Para os produtos do ecossistema (Sequência Viral, Reels Viral, DeFi Radar,
> KAI), as políticas legais ficam em cada subdomínio.

## Histórico

- `2026-04-23` Reorganização: separação `vault/` ↔ `code/` ↔ `media/`
- `2026-04-30` Fix icon cloud + URLs canônicas Kaleidos no bento
- `2026-05-01` Privacy/Terms publicados nos 4 produtos foco do ecossistema

Auditorias técnicas detalhadas estão em `docs/audits/`.
