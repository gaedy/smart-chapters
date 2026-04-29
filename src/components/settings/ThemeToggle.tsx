"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? theme === "dark" : true;

  return (
    <button
      type="button"
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-10 w-36 items-center rounded-full border border-input bg-background p-1 text-sm transition-colors"
    >
      <span
        className={`flex h-8 w-full items-center justify-center gap-1 rounded-full transition-all duration-200 ${
          !isDark
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground"
        }`}
      >
        <Sun className="h-4 w-4" />
        Light
      </span>
      <span
        className={`flex h-8 w-full items-center justify-center gap-1 rounded-full transition-all duration-200 ${
          isDark
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground"
        }`}
      >
        <Moon className="h-4 w-4" />
        Dark
      </span>
    </button>
  );
}
