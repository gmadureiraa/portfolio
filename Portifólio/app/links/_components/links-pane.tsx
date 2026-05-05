"use client";

import { LinkCard } from "./link-card";
import { links } from "../_lib/links";

export function LinksPane() {
  return (
    <div className="flex flex-col gap-3">
      {links.map((link, index) => (
        <LinkCard key={link.id} link={link} index={index} />
      ))}
    </div>
  );
}
