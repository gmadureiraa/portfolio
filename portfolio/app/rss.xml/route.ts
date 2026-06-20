// Alias raiz do feed da newsletter — mesmo conteúdo de /newsletter/rss.xml.
// Muitos leitores de feed e o autodiscovery padrão procuram em /rss.xml.
export { GET } from "../newsletter/rss.xml/route";

// Revalida o feed a cada hora (ISR no route handler).
// Precisa ser declarado localmente — o Next não aceita reexport de route-segment config.
export const revalidate = 3600;
