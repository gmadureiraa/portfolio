"use client";

import { AnimatedBackground } from "./background";
import { ProfileHeader } from "./profile-header";
import { LinkCard } from "./link-card";
import { Footer } from "./footer";
import { links } from "../_lib/links";

export function LinksSection() {
  return (
    <div className="links-page">
      <AnimatedBackground />

      <main className="relative z-10 flex flex-col items-center min-h-screen px-4 py-12 sm:py-16">
        <div className="w-full max-w-md mx-auto">
          <ProfileHeader />

          <div className="mt-8 flex flex-col gap-3">
            {links.map((link, index) => (
              <LinkCard key={link.id} link={link} index={index} />
            ))}
          </div>

          <Footer />
        </div>
      </main>
    </div>
  );
}
