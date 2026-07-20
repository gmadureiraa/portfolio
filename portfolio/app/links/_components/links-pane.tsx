"use client";

import { LinkCard } from "./link-card";
import { Sublabel } from "./sublabel";
import { PlaybookCard } from "./playbook-card";
import { KaleidosCard } from "./kaleidos-card";
import { InstagramKaleidos } from "./instagram-kaleidos";
import { linkGroups } from "../_lib/links";

/**
 * Pane principal — grupos com sublabel (estrutura do linktree Felipe M3D):
 * "Comece por aqui" (playbook destaque + links), "Kaleidos" (card com logo)
 * e bloco do Instagram da Kaleidos.
 */
export function LinksPane() {
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

      {/* Instagram da Kaleidos */}
      <div className="mt-5">
        <InstagramKaleidos />
      </div>
    </div>
  );
}
