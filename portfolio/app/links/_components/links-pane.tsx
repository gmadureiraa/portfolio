"use client";

import { LinkCard } from "./link-card";
import { Sublabel } from "./sublabel";
import { PlaybookCard } from "./playbook-card";
import { LatestPosts } from "./latest-posts";
import { linkGroups, type LatestPost } from "../_lib/links";

/**
 * Pane principal — grupos com sublabel (estrutura do linktree Felipe M3D):
 * "Comece por aqui" (playbook destaque + links), "Kaleidos", "Últimos posts".
 */
export function LinksPane({ posts }: { posts: LatestPost[] }) {
  return (
    <div className="flex flex-col">
      {linkGroups.map((group, gi) => (
        <div key={group.id}>
          <Sublabel delay={0.05 + gi * 0.1}>{group.label}</Sublabel>
          <div className="flex flex-col gap-3">
            {group.id === "comece" && <PlaybookCard />}
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
        </div>
      )}
    </div>
  );
}
