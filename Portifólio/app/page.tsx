import Link from "next/link";
import { Bento } from "@/components/bento";

export default function Home() {
  return (
    <>
      {/* Nav fixo top-right — acesso rápido pra Newsletter e Links */}
      <nav
        className="fixed top-4 right-4 z-50 flex items-center gap-2 text-xs font-medium"
        aria-label="Acesso rápido"
      >
        <Link
          href="/newsletter"
          className="px-4 py-2 rounded-full border border-foreground/15 bg-background/70 backdrop-blur-md hover:border-foreground/40 transition-colors"
        >
          Newsletter
        </Link>
        <Link
          href="/links"
          className="px-4 py-2 rounded-full border border-foreground/15 bg-background/70 backdrop-blur-md hover:border-foreground/40 transition-colors"
        >
          Links
        </Link>
      </nav>

      <div className="w-full flex items-center justify-center max-w-5xl mx-auto">
        <div className="flex flex-col items-center overflow-hidden">
          <div className="w-full py-2  px-2 lg:py-10 lg:px-4">
            <Bento />
          </div>
        </div>
      </div>
    </>
  );
}
