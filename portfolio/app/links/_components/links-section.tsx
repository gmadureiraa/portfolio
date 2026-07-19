"use client";

import { Instrument_Serif } from "next/font/google";
import { AnimatedBackground } from "./background";
import { ProfileHeader } from "./profile-header";
import { Footer } from "./footer";
import { LinksPane } from "./links-pane";
import type { LatestPost } from "../_lib/links";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

export function LinksSection({ posts = [] }: { posts?: LatestPost[] }) {
  return (
    <div className={instrumentSerif.variable}>
      <div className="links-tab-pane links-page">
        <AnimatedBackground />
        <main className="relative z-10 flex flex-col items-center min-h-screen px-4 pt-40 pb-12 sm:pt-44">
          <div className="w-full max-w-md mx-auto">
            <ProfileHeader />
            <div className="mt-8">
              <LinksPane posts={posts} />
            </div>
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
