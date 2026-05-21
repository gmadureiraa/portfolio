import React from "react";
import IconCloud from "@/components/magicui/icon-cloud";

const slugs = [
  "bitcoin",
  "ethereum",
  "solana",
  "openai",
  "canva",
  "html5",
  "css3",
  "javascript",
  "react",
  "nextdotjs",
  "beehiiv",
  "medium",
  "substack",
  "notion",
  "googleanalytics",
  "obsidian",
  "linkedin",
  "x",
  "instagram",
  "youtube",
  "docker",
  "github",
  "gitlab",
  "mysql",
  "postgresql",
  "typescript",
  "tailwindcss",
  "vercel",
  "digitalocean",
  "amazonaws",
  "stripe",
  "svelte",
  "python",
  "django",
  "mongodb",
  "prisma",
  "huggingface",
  "tensorflow",
  "nodedotjs"
];

interface TechnologiesProps {
  liveLinks?: boolean;
  customSlugs?: string[];
}

export default function Technologies({ liveLinks = false, customSlugs }: TechnologiesProps) {
  return (
    <div className="">
      <IconCloud iconSlugs={customSlugs || slugs} liveLinks={liveLinks} />
    </div>
  );
}
