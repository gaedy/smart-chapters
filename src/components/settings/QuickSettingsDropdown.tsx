"use client";

import Link from "next/link";
import {
  Check,
  Moon,
  Palette,
  Settings,
  SlidersHorizontal,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  accentOptions,
  defaultPreferences,
  fontOptions,
  fontSizeOptions,
  readPreferences,
  savePreferences,
  type SettingsPreferences,
} from "@/components/settings/settings-preferences";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function PreferenceButton({
  active,
  children,
  onClick,
  className = "",
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex h-9 items-center justify-center gap-2 rounded-full px-3 text-xs font-medium transition ${
        active
          ? " bg-theme-accent/80 text-accent"
          : " bg-foreground hover:bg-foreground-dark text-muted-foreground hover:text-primary"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function QuickSettingsDropdown() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [preferences, setPreferences] =
    useState<SettingsPreferences>(defaultPreferences);

  useEffect(() => {
    setMounted(true);
    setPreferences(readPreferences());
  }, []);

  function setPreference<T extends keyof SettingsPreferences>(
    key: T,
    value: SettingsPreferences[T],
  ) {
    setPreferences((current) => {
      const next = { ...current, [key]: value };
      savePreferences(next);
      return next;
    });
  }

  const isDark = mounted ? theme === "dark" : true;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Open quick settings"
          className="flex size-9  items-center justify-center rounded-full bg-foreground text-muted-foreground transition-all duration-200 hover:text-primary hover:shadow-sm active:scale-95 data-[state=open]:bg-theme-accent-soft data-[state=open]:text-accent-foreground"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-[min(22rem,calc(100vw-1.5rem))] rounded-3xl border-border bg-background p-3 text-primary shadow-xl shadow-primary/10"
      >
        <DropdownMenuLabel className="flex items-center gap-2 px-2 py-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-foreground text-muted-foreground">
            <Palette className="h-4 w-4" />
          </span>
          <span>
            <span className="block text-sm font-semibold">Quick settings</span>
            <span className="block text-xs font-normal text-muted-foreground">
              Appearance controls
            </span>
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-2" />

        <div className="grid gap-4 px-1 py-1">
          <div className="grid gap-2">
            <p className="px-1 text-xs font-medium text-muted-foreground">
              Theme
            </p>
            <div className="grid grid-cols-2 gap-2">
              <PreferenceButton
                active={!isDark}
                onClick={() => setTheme("light")}
              >
                <Sun className="h-4 w-4" />
                Light
              </PreferenceButton>
              <PreferenceButton
                active={isDark}
                onClick={() => setTheme("dark")}
              >
                <Moon className="h-4 w-4" />
                Dark
              </PreferenceButton>
            </div>
          </div>

          <div className="grid gap-2">
            <p className="px-1 text-xs font-medium text-muted-foreground">
              Accent
            </p>
            <div className="grid grid-cols-2 gap-2">
              {accentOptions.map((option) => {
                const active = preferences.accent === option.value;

                return (
                  <PreferenceButton
                    key={option.value}
                    active={active}
                    onClick={() => setPreference("accent", option.value)}
                  >
                    <span
                      className={`size-3.5 rounded-full ${option.swatch}`}
                    />
                    {option.label}
                    {active && <Check className="h-3.5 w-3.5" />}
                  </PreferenceButton>
                );
              })}
            </div>
          </div>

          <div className="grid gap-2">
            <p className="px-1 text-xs font-medium text-muted-foreground">
              Font family
            </p>
            <div className="grid grid-cols-3 gap-2">
              {fontOptions.map((option) => (
                <PreferenceButton
                  key={option.value}
                  active={preferences.font === option.value}
                  onClick={() => setPreference("font", option.value)}
                  className="px-2"
                >
                  {option.label}
                </PreferenceButton>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <p className="px-1 text-xs font-medium text-muted-foreground">
              Font size
            </p>
            <div className="grid grid-cols-3 gap-2">
              {fontSizeOptions.map((option) => (
                <PreferenceButton
                  key={option.value}
                  active={preferences.fontSize === option.value}
                  onClick={() => setPreference("fontSize", option.value)}
                  className="px-2"
                >
                  {option.label}
                </PreferenceButton>
              ))}
            </div>
          </div>
        </div>

        <DropdownMenuSeparator className="my-3" />

        <DropdownMenuItem
          asChild
          className="rounded-2xl p-0 focus:bg-transparent"
        >
          <Link
            href="/settings"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-2xl bg-foreground px-4 text-sm font-medium text-theme-accent transition "
          >
            <Settings className="h-4 w-4" />
            Open full settings
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
