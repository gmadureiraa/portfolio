import Image from "next/image";

/**
 * Halftone photo — efeito Artem-style aplicado por CSS sobre a foto real.
 *
 * Camadas (de baixo pra cima):
 *  1. <Image /> da foto em grayscale + contraste alto
 *  2. overlay emerald (mix-blend-screen) — pinta o branco da foto de verde
 *  3. dot pattern (mix-blend-multiply) — apaga em pontos pra simular halftone
 *  4. scanlines sutis pra textura
 *  5. vinheta radial pra escurecer bordas
 *
 * Tudo estático, zero animação.
 */
export default function HalftonePhoto() {
  return (
    <div className="relative aspect-[21/10] w-full overflow-hidden rounded-md border border-emerald-500/30 bg-black md:aspect-[21/9]">
      {/* 1. Foto base — grayscale + contraste */}
      <Image
        src="/avatar.png"
        alt="Gabriel Madureira"
        fill
        priority
        sizes="(min-width: 1024px) 1024px, 100vw"
        className="object-cover object-[center_25%] grayscale contrast-[1.5] brightness-[0.95]"
      />

      {/* 2. Tint emerald — pinta áreas claras de verde */}
      <div className="pointer-events-none absolute inset-0 bg-emerald-500 mix-blend-screen opacity-50" />

      {/* 3. Halftone dots — pattern de pontos pretos sobre toda a área */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.95) 0.6px, transparent 1.2px)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* 4. Scanlines horizontais */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 3px)",
        }}
      />

      {/* 5. Vinheta — escurece cantos pro texto ter contraste */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Badge top-left */}
      <div className="absolute left-3 top-3 z-10 sm:left-5 sm:top-5">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-black/70 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-emerald-400 backdrop-blur-sm sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          [ Operação com IA ]
        </span>
      </div>

      {/* Badge bottom-right */}
      <div className="absolute bottom-3 right-3 z-10 sm:bottom-5 sm:right-5">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-black/70 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-emerald-400 backdrop-blur-sm sm:text-xs">
          [ Founders // Operadores // Consultores ]
        </span>
      </div>
    </div>
  );
}
