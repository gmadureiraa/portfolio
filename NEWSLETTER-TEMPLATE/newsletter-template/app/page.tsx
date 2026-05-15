"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { PopularCard } from "@/components/issue-card";
import { IssuesArchive } from "@/components/issues-archive";
import { SidebarSubscribe } from "@/components/sidebar-subscribe";
import { SubscribeModal } from "@/components/subscribe-modal";
import { issues, popularSlugs } from "@/lib/constants";

export default function Home() {
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const featured = issues[0];
  const popular = issues.filter((i) => popularSlugs.includes(i.slug)).slice(0, 4);
  const latest = issues.slice(0, 8);

  return (
    <div className="min-h-screen bg-ink-10 text-ink-95">
      <Header onSubscribe={() => setSubscribeOpen(true)} />

      <main>
        <Hero issue={featured} />

        {/* Most Popular */}
        <section className="border-b border-ink-30">
          <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="h-section text-xl text-ink-95">Mais lidas</h2>
              <span className="eyebrow text-ink-50">top 4</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-6">
              {popular.map((issue) => (
                <PopularCard key={issue.slug} issue={issue} />
              ))}
            </div>
          </div>
        </section>

        {/* Cartas do Madureira + Sidebar */}
        <section>
          <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-8">
                <IssuesArchive issues={latest} />
              </div>

              <div className="lg:col-span-4">
                <SidebarSubscribe />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <SubscribeModal open={subscribeOpen} onClose={() => setSubscribeOpen(false)} />
    </div>
  );
}
