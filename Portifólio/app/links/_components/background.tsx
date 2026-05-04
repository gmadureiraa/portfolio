"use client";

export function AnimatedBackground() {
  return (
    <>
      <div className="bg-animated" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <div className="grid-overlay" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />
    </>
  );
}
