"use client";

export function AnimatedBackground() {
  return (
    <>
      <div className="bg-animated" aria-hidden="true">
        <div className="aura aura-coral" />
        <div className="aura aura-blue" />
        <div className="aura aura-violet" />
      </div>
      <div className="noise-overlay" aria-hidden="true" />
    </>
  );
}
