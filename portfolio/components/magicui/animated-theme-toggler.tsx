"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

import { cn } from "@/lib/utils";

type ViewTransitionDoc = Document & {
  startViewTransition?: (cb: () => void) => { finished: Promise<void> };
};

interface AnimatedThemeTogglerProps {
  className?: string;
}

export function AnimatedThemeToggler({ className }: AnimatedThemeTogglerProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";
  const next = isDark ? "light" : "dark";

  const handleClick = useCallback(() => {
    if (!buttonRef.current) {
      setTheme(next);
      return;
    }

    const doc = document as ViewTransitionDoc;
    if (typeof doc.startViewTransition !== "function") {
      setTheme(next);
      return;
    }

    const rect = buttonRef.current.getBoundingClientRect();
    const x = `${((rect.left + rect.width / 2) / window.innerWidth) * 100}%`;
    const y = `${((rect.top + rect.height / 2) / window.innerHeight) * 100}%`;
    const root = document.documentElement;
    root.style.setProperty("--vt-x", x);
    root.style.setProperty("--vt-y", y);
    root.classList.add("vt-theme-toggling");

    const transition = doc.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });

    transition.finished.finally(() => {
      root.classList.remove("vt-theme-toggling");
    });
  }, [next, setTheme]);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      aria-label={`Trocar pra modo ${next}`}
      className={cn("theme-toggle-pill", className)}
      suppressHydrationWarning
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-4 w-4" strokeWidth={1.75} />
        ) : (
          <Moon className="h-4 w-4" strokeWidth={1.75} />
        )
      ) : (
        <span className="h-4 w-4" />
      )}
    </button>
  );
}
