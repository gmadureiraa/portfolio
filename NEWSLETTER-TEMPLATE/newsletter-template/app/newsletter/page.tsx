"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { IssuesArchive } from "@/components/issues-archive";
import { SidebarSubscribe } from "@/components/sidebar-subscribe";
import { SubscribeModal } from "@/components/subscribe-modal";
import { issues } from "@/lib/constants";

export default function NewsletterIndex() {
  const [subscribeOpen, setSubscribeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ink-10 text-ink-95">
      <Header onSubscribe={() => setSubscribeOpen(true)} />

      <main>
        {/* Manifesto */}
        <section className="border-b border-ink-30">
          <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="mx-auto max-w-[640px] text-center">
              <div className="inline-flex items-center gap-2 mb-7">
                <span className="eyebrow text-ink-50">manifesto</span>
                <span className="accent-dot text-vermilion text-sm leading-none">·</span>
                <span className="eyebrow text-ink-50">newsletter</span>
              </div>
              <blockquote className="h-display italic font-light text-[40px] sm:text-[52px] md:text-[60px] leading-[1.05] text-ink-95">
                marketing direto.
                <br />
                <span className="text-ink-70">IA aplicada.</span>
                <br />
                bastidor real de
                <br />
                <span className="text-ink-70">quem constrói.</span>
              </blockquote>
              <div className="mt-8 flex items-center justify-center gap-2">
                <span className="meta text-ink-70">— uma por semana</span>
                <span className="accent-dot text-vermilion">·</span>
                <span className="meta text-ink-70">zero spam</span>
              </div>
            </div>
          </div>
        </section>

        {/* Cartas do Madureira + Sidebar */}
        <section>
          <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-8">
                <IssuesArchive issues={issues} />
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
