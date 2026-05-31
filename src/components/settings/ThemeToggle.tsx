"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? theme === "dark" : true;

  return (
    <Button
      type="button"
      variant="outline"
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="h-10 w-44 rounded-full bg-background p-1 text-sm"
    >
      <span
        className={`flex h-8 w-full items-center justify-center gap-1 rounded-full transition-all duration-200 ${
          !isDark
            ? "bg-theme-accent text-theme-accent-foreground"
            : "text-muted-foreground"
        }`}
      >
        <Sun className="h-4 w-4" />
        Light
      </span>
      <span
        className={`flex h-8 w-full items-center justify-center gap-1 rounded-full transition-all duration-200 ${
          isDark
            ? "bg-theme-accent text-theme-accent-foreground"
            : "text-muted-foreground"
        }`}
      >
        <Moon className="h-4 w-4" />
        Dark
      </span>
    </Button>
  );
}
