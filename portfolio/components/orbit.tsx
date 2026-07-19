import OrbitingCircles from "@/components/magicui/orbiting-circles";
import { motion } from "framer-motion";
import Image from "next/image";

/**
 * Orbit do card "Kaleidos" no bento — logos de CLIENTES reais da agência
 * orbitando a logo da Kaleidos (o centro fica no bento.tsx).
 *
 * Logos copiadas de site-kaleidos/public/v2/partners/ (webp, brancas em fundo
 * transparente) pra public/images/clients/. Cada uma vive num chip escuro pra
 * continuar legível também no light mode.
 */

type ClientLogo = { name: string; src: string };

const INNER: ClientLogo[] = [
  { name: "Defiverso", src: "/images/clients/defiverso.webp" },
  { name: "Investidor 4.20", src: "/images/clients/investidor-420.webp" },
  { name: "Neobankless", src: "/images/clients/neobankless.webp" },
];

const MIDDLE: ClientLogo[] = [
  { name: "Ledger", src: "/images/clients/ledger.webp" },
  { name: "Parfin", src: "/images/clients/parfin.webp" },
  { name: "Paradigma", src: "/images/clients/paradigma.webp" },
];

const OUTER: ClientLogo[] = [
  { name: "Crypto.com", src: "/images/clients/crypto-com.webp" },
  { name: "Mercado Bitcoin", src: "/images/clients/mercado-bitcoin.webp" },
];

function LogoChip({ client }: { client: ClientLogo }) {
  return (
    <span className="flex h-full w-full items-center justify-center rounded-md bg-neutral-950/90 px-1.5 ring-1 ring-white/15 shadow-sm">
      <Image
        src={client.src}
        alt={client.name}
        title={client.name}
        width={56}
        height={24}
        className="h-full w-full object-contain"
        unoptimized
      />
    </span>
  );
}

export default function Orbit() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5 }}
      >
        {/* Anel interno */}
        {INNER.map((client, i) => (
          <OrbitingCircles
            key={client.name}
            className="h-[22px] w-[48px] border-none bg-transparent"
            duration={20}
            radius={55}
            delay={(20 / INNER.length) * i * 10}
            path={i === 0}
          >
            <LogoChip client={client} />
          </OrbitingCircles>
        ))}

        {/* Anel do meio (sentido inverso) */}
        {MIDDLE.map((client, i) => (
          <OrbitingCircles
            key={client.name}
            className="h-[26px] w-[58px] border-none bg-transparent"
            reverse
            duration={25}
            radius={105}
            delay={(25 / MIDDLE.length) * i * 10}
            path={i === 0}
          >
            <LogoChip client={client} />
          </OrbitingCircles>
        ))}

        {/* Anel externo */}
        {OUTER.map((client, i) => (
          <OrbitingCircles
            key={client.name}
            className="h-[30px] w-[68px] border-none bg-transparent"
            duration={40}
            radius={155}
            delay={(40 / OUTER.length) * i * 10}
            path={i === 0}
          >
            <LogoChip client={client} />
          </OrbitingCircles>
        ))}
      </motion.div>
    </div>
  );
}
