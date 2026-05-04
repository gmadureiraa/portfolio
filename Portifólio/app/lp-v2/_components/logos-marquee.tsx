import Marquee from "@/components/magicui/marquee";

const logos = [
  "DEFIVERSO",
  "DSEC LABS",
  "NEOBANKLESS",
  "INVESTIDOR 4.20",
  "PARADIGMA EDU",
  "BUENAS IDEIAS",
  "HUGO",
  "LAYLA",
];

const products = [
  { name: "Sequência Viral", url: "viral.kaleidos.com.br" },
  { name: "Reels Viral", url: "reels.kaleidos.com.br" },
  { name: "Radar Viral", url: "radar.kaleidos.com.br" },
  { name: "Kaleidos Pay", url: "pay.kaleidos.com.br" },
  { name: "AutoBlogger", url: "autoblogger" },
  { name: "AdFlow", url: "adflow" },
];

export default function LogosMarquee() {
  return (
    <section className="relative border-b border-emerald-500/15 bg-black py-10">
      <div className="mx-auto mb-6 flex max-w-7xl items-center justify-center px-4 sm:px-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
          Times rodando IA com a Kaleidos · Produtos próprios em produção
        </span>
      </div>
      <Marquee className="[--duration:40s] [--gap:3rem]" pauseOnHover>
        {logos.map((logo) => (
          <span
            key={logo}
            className="font-mono text-base font-semibold uppercase tracking-[0.18em] text-neutral-400 transition-colors hover:text-emerald-400 sm:text-lg"
          >
            {logo}
          </span>
        ))}
        {products.map((p) => (
          <span
            key={p.name}
            className="font-mono text-base font-semibold uppercase tracking-[0.18em] text-emerald-500/70 sm:text-lg"
          >
            {p.name} ◆
          </span>
        ))}
      </Marquee>

      {/* Edge fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent"
      />
    </section>
  );
}
