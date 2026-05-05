"use client";

import { useCallback, useState } from "react";
import { Instrument_Serif } from "next/font/google";
import { AnimatedBackground } from "./background";
import { ProfileHeader } from "./profile-header";
import { Footer } from "./footer";
import { LinksPane } from "./links-pane";
import { TabsToggle, type TabId } from "./tabs-toggle";
import { Background as NewsletterBg } from "@/components/newsletter-synecdoche/background";
import { NewsletterHero } from "@/components/newsletter-synecdoche/hero";
import { NewsletterFooter as NewsletterPageFooter } from "@/components/newsletter-synecdoche/footer";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

const NEWSLETTER_BG_SRC =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alt-g7Cv2QzqL3k6ey3igjNYkM32d8Fld7.mp4";
const NEWSLETTER_BG_PLACEHOLDER = "/newsletter/alt-placeholder.png";

interface ViewTransitionDoc extends Document {
  startViewTransition?: (cb: () => void) => { finished: Promise<void> };
}

export function LinksSection() {
  const [tab, setTab] = useState<TabId>("links");

  const handleTabChange = useCallback(
    (next: TabId, originX: number, originY: number) => {
      const root = document.documentElement;
      const x = `${(originX / window.innerWidth) * 100}%`;
      const y = `${(originY / window.innerHeight) * 100}%`;
      root.style.setProperty("--vt-x", x);
      root.style.setProperty("--vt-y", y);

      const doc = document as ViewTransitionDoc;
      if (typeof doc.startViewTransition === "function") {
        doc.startViewTransition(() => {
          setTab(next);
        });
      } else {
        setTab(next);
      }
    },
    []
  );

  return (
    <div className={instrumentSerif.variable}>
      {/* Tabs floating at top center — sempre visível, fora do view-transition pra ficar estável */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100]">
        <TabsToggle value={tab} onChange={handleTabChange} />
      </div>

      {tab === "links" ? (
        <div className="links-tab-pane links-page">
          <AnimatedBackground />
          <main className="relative z-10 flex flex-col items-center min-h-screen px-4 pt-24 pb-12 sm:pt-28">
            <div className="w-full max-w-md mx-auto">
              <ProfileHeader />
              <div className="mt-8">
                <LinksPane />
              </div>
              <Footer />
            </div>
          </main>
        </div>
      ) : (
        <main className="links-tab-pane fixed inset-0 z-40 w-full bg-background">
          <section className="p-inset relative h-[100dvh] w-full">
            <div className="relative h-full w-full">
              <NewsletterBg
                src={NEWSLETTER_BG_SRC}
                placeholder={NEWSLETTER_BG_PLACEHOLDER}
              />
              <NewsletterHero />
              <NewsletterPageFooter />
            </div>
          </section>
        </main>
      )}
    </div>
  );
}
