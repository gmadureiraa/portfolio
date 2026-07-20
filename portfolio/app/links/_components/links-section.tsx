"use client";

import { Instrument_Serif } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { AnimatedBackground } from "./background";
import { ProfileHeader } from "./profile-header";
import { Footer } from "./footer";
import { LinksPane } from "./links-pane";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

export function LinksSection() {
  return (
    <MotionConfig reducedMotion="user">
      <div className={instrumentSerif.variable}>
        <div className="links-tab-pane links-page">
          <AnimatedBackground />
          <main className="relative z-10 flex flex-col items-center min-h-screen px-4 pt-[76px] pb-12 sm:pt-24">
            <div className="w-full max-w-md mx-auto">
              <ProfileHeader />
              <div className="mt-4">
                <LinksPane />
              </div>
              <Footer />
            </div>
          </main>
        </div>
      </div>
    </MotionConfig>
  );
}
