"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-7 w-12 rounded-full bg-muted" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border border-border bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Toggle dark mode"
    >
      <span
        className={`pointer-events-none flex h-5 w-5 items-center justify-center rounded-full bg-foreground shadow-sm transition-transform ${
          isDark ? "translate-x-5.5" : "translate-x-0.5"
        }`}
      >
        {isDark ? (
          <Moon className="h-3 w-3 text-background" />
        ) : (
          <Sun className="h-3 w-3 text-background" />
        )}
      </span>
    </button>
  );
}
