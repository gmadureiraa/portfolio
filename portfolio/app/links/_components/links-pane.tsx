"use client";

import { LinkCard } from "./link-card";
import { Sublabel } from "./sublabel";
import { PlaybookCard } from "./playbook-card";
import { LatestPosts } from "./latest-posts";
import { KaleidosCard } from "./kaleidos-card";
import { InstagramKaleidos } from "./instagram-kaleidos";
import { linkGroups, type LatestPost } from "../_lib/links";
import { trackClick } from "../_lib/tracking";

/**
 * Pane principal — grupos com sublabel (estrutura do linktree Felipe M3D):
 * "Comece por aqui" (playbook destaque + links), "Kaleidos" (card com logo),
 * "Últimos posts" (carrossel lateral) e bloco do Instagram da Kaleidos.
 */
export function LinksPane({ posts }: { posts: LatestPost[] }) {
  return (
    <div className="flex flex-col">
      {linkGroups.map((group, gi) => (
        <div key={group.id}>
          <Sublabel delay={0.05 + gi * 0.1}>{group.label}</Sublabel>
          <div className="flex flex-col gap-3">
            {group.id === "comece" && <PlaybookCard />}
            {group.id === "kaleidos" && <KaleidosCard />}
            {group.items.map((link, index) => (
              <LinkCard key={link.id} link={link} index={index + gi * 2} />
            ))}
          </div>
        </div>
      ))}

      {posts.length > 0 && (
        <div>
          <Sublabel delay={0.3}>Últimos posts</Sublabel>
          <LatestPosts posts={posts} />
          <a
            href="/posts"
            onClick={() => trackClick("ver-todos-posts")}
            className="ds-mono links-see-all mt-3 inline-flex items-center gap-1.5 text-[9.5px]"
          >
            ver todos os posts
            <span aria-hidden>→</span>
          </a>
        </div>
      )}

      {/* Instagram da Kaleidos — abaixo dos últimos posts */}
      <div className="mt-8">
        <InstagramKaleidos />
      </div>
    </div>
  );
}
