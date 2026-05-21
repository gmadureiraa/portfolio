import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { profile, socialLinks } from "@/lib/constants";

const footerLinks = {
  produtos: [
    { label: "KAI", href: "https://kai.kaleidos.com.br" },
    { label: "Sequência Viral", href: "https://viral.kaleidos.com.br" },
    { label: "Reels Viral", href: "https://reels.kaleidos.com.br" },
    { label: "Kaleidos Pay", href: "https://pay.kaleidos.com.br" },
  ],
  consultoria: [
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Gargalos comuns", href: "#gargalos" },
    { label: "Planos", href: "#planos" },
    { label: "Diagnóstico", href: "#contato" },
  ],
  legal: [
    { label: "Site principal", href: "/" },
    { label: "Sobre mim", href: "/sobre-mim" },
    { label: "Posts", href: "/posts" },
    { label: "LP v1", href: "/lp" },
  ],
};

export function FooterSection() {
  return (
    <footer className="px-6 py-16 border-t border-zinc-900 bg-zinc-950">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-lg font-semibold text-zinc-100 tracking-tight"
            >
              <span className="grid h-6 w-6 place-items-center bg-emerald-500 font-mono text-[11px] font-bold text-black rounded-sm">
                M
              </span>
              <span>Madureira</span>
            </Link>
            <p className="mt-4 text-sm text-zinc-500 max-w-xs leading-relaxed">
              Consultoria de IA pra qualquer profissional que perde tempo no dia a
              dia.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-100 mb-4 font-mono uppercase tracking-[0.18em] text-[11px] text-emerald-400">
              Produtos
            </h4>
            <ul className="space-y-3">
              {footerLinks.produtos.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-400 hover:text-emerald-300 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-100 mb-4 font-mono uppercase tracking-[0.18em] text-[11px] text-emerald-400">
              Consultoria
            </h4>
            <ul className="space-y-3">
              {footerLinks.consultoria.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-emerald-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-100 mb-4 font-mono uppercase tracking-[0.18em] text-[11px] text-emerald-400">
              Sobre
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-emerald-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-600">
            © {new Date().getFullYear()} {profile.name} · Construído com
            Claude Code, Gemini e muito café.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-emerald-300 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.x}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-emerald-300 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-emerald-300 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-emerald-300 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
