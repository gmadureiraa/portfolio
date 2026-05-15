"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ListItem } from "@/components/issue-card";
import { SidebarSubscribe } from "@/components/sidebar-subscribe";
import { SubscribeModal } from "@/components/subscribe-modal";
import { issues } from "@/lib/constants";

export default function NewsletterIndex() {
  const [subscribeOpen, setSubscribeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ink-10 text-ink-95">
      <Header onSubscribe={() => setSubscribeOpen(true)} />

      <main>
        {/* Page header */}
        <section className="border-b border-ink-30">
          <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="flex items-center gap-2 mb-4">
              <span className="eyebrow">newsletter</span>
              <span className="accent-dot text-vermilion text-sm leading-none">·</span>
              <span className="eyebrow">arquivo completo</span>
            </div>
            <h1 className="h-display text-[40px] sm:text-[56px] md:text-[72px] text-ink-95 leading-[1.02] max-w-[18ch]">
              todas as edições.
            </h1>
            <p className="mt-5 text-md text-ink-85 max-w-[58ch] leading-relaxed">
              {issues.length} edições publicadas. Marketing, IA e bastidor de quem
              constrói. Uma por semana, zero spam.
            </p>
          </div>
        </section>

        {/* List + Sidebar */}
        <section>
          <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-8">
                <ul>
                  {issues.map((issue) => (
                    <li key={issue.slug}>
                      <ListItem issue={issue} />
                    </li>
                  ))}
                </ul>
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
