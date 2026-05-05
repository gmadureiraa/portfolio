"use client";

import { useCallback, useState } from "react";
import { AnimatedBackground } from "./background";
import { ProfileHeader } from "./profile-header";
import { Footer } from "./footer";
import { LinksPane } from "./links-pane";
import { NewsletterPane } from "./newsletter-pane";
import { TabsToggle, type TabId } from "./tabs-toggle";

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
    <div className="links-page">
      <AnimatedBackground />

      <main className="relative z-10 flex flex-col items-center min-h-screen px-4 py-12 sm:py-16">
        <div className="w-full max-w-md mx-auto">
          <ProfileHeader />

          <div className="mt-7 flex justify-center">
            <TabsToggle value={tab} onChange={handleTabChange} />
          </div>

          <div className="mt-6 links-tab-pane">
            {tab === "links" ? <LinksPane /> : <NewsletterPane />}
          </div>

          <Footer />
        </div>
      </main>
    </div>
  );
}
