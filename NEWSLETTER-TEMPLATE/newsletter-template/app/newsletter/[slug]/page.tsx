"use client";

import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArticleHeader, ArticleBody, ArticleFooter } from "@/components/article";
import { SidebarSubscribe } from "@/components/sidebar-subscribe";
import { SubscribeModal } from "@/components/subscribe-modal";
import { ListItem } from "@/components/issue-card";
import { issues } from "@/lib/constants";

export default function ArticlePage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const issue = issues.find((i) => i.slug === slug);
  const [subscribeOpen, setSubscribeOpen] = useState(false);

  if (!issue) {
    notFound();
  }

  const others = issues.filter((i) => i.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-ink-10 text-ink-95">
      <Header onSubscribe={() => setSubscribeOpen(true)} />

      <main>
        <ArticleHeader issue={issue} />

        <section>
          <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-8">
                <ArticleBody body={issue.body} />
                <ArticleFooter issue={issue} />
              </div>
              <div className="lg:col-span-4">
                <SidebarSubscribe />
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="border-t border-ink-30">
          <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="h-section text-xl text-ink-95">Continue lendo</h2>
              <span className="eyebrow text-ink-50">próximas leituras</span>
            </div>
            <ul>
              {others.map((i) => (
                <li key={i.slug}>
                  <ListItem issue={i} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
      <SubscribeModal open={subscribeOpen} onClose={() => setSubscribeOpen(false)} />
    </div>
  );
}
