"use client";

import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

export type TabId = "links" | "newsletter";

interface TabsToggleProps {
  value: TabId;
  onChange: (next: TabId, originX: number, originY: number) => void;
}

const TABS: Array<{ id: TabId; label: string }> = [
  { id: "links", label: "Links" },
  { id: "newsletter", label: "Newsletter" },
];

export function TabsToggle({ value, onChange }: TabsToggleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<Record<TabId, HTMLButtonElement | null>>({
    links: null,
    newsletter: null,
  });
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(
    null
  );

  useLayoutEffect(() => {
    const btn = buttonsRef.current[value];
    const container = containerRef.current;
    if (!btn || !container) return;
    const cRect = container.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();
    setIndicator({ x: bRect.left - cRect.left, w: bRect.width });
  }, [value]);

  const handleClick = (tab: TabId, e: React.MouseEvent) => {
    if (tab === value) return;
    onChange(tab, e.clientX, e.clientY);
  };

  return (
    <div ref={containerRef} className="tab-segment" role="tablist">
      {indicator && (
        <motion.span
          className="tab-segment-indicator"
          initial={false}
          animate={{ x: indicator.x, width: indicator.w }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          aria-hidden="true"
        />
      )}
      {TABS.map((tab) => (
        <button
          key={tab.id}
          ref={(el) => {
            buttonsRef.current[tab.id] = el;
          }}
          type="button"
          role="tab"
          aria-selected={value === tab.id}
          data-active={value === tab.id}
          className="tab-segment-button"
          onClick={(e) => handleClick(tab.id, e)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
