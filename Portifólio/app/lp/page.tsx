// LP principal de consultoria — re-export pra preservar URL `/lp` em links externos.
// Conteúdo canônico vive em `app/consultoria/page.tsx` (mesmo design system,
// metadata definida lá). Manter os dois caminhos válidos: `/lp` (legacy
// links externos) e `/consultoria` (canonical SEO).

export { default } from "../consultoria/page";
export { metadata } from "../consultoria/page";
