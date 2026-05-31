"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import {
  accentOptions,
  defaultPreferences,
  fontOptions,
  fontSizeOptions,
  readPreferences,
  savePreferences,
  type AccentPreference,
  type FontPreference,
  type FontSizePreference,
  type SettingsPreferences,
} from "@/components/settings/settings-preferences";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function updatePreference<T extends keyof SettingsPreferences>(
  preferences: SettingsPreferences,
  key: T,
  value: SettingsPreferences[T],
) {
  return { ...preferences, [key]: value };
}

export function AppearanceSettings() {
  const [preferences, setPreferences] =
    useState<SettingsPreferences>(defaultPreferences);

  useEffect(() => {
    setPreferences(readPreferences());
  }, []);

  function setPreference<T extends keyof SettingsPreferences>(
    key: T,
    value: SettingsPreferences[T],
  ) {
    setPreferences((current) => {
      const next = updatePreference(current, key, value);
      savePreferences(next);
      return next;
    });
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 rounded-2xl bg-foreground p-4">
        <div>
          <p className="text-sm font-medium">Accent color</p>
          <p className="text-xs leading-5 text-muted-foreground">
            Applies to buttons, focus rings, progress, and active states
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {accentOptions.map((option) => {
            const active = preferences.accent === option.value;

            return (
              <Button
                key={option.value}
                type="button"
                variant={active ? "default" : "outline"}
                aria-pressed={active}
                onClick={() =>
                  setPreference("accent", option.value as AccentPreference)
                }
                className={`h-10 rounded-full px-3 ${
                  active ? "" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <span className={`size-4 rounded-full ${option.swatch}`} />
                {option.label}
                {active && <Check className="h-4 w-4" />}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-3 rounded-2xl bg-foreground p-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-sm font-medium">Font family</p>
          <p className="text-xs leading-5 text-muted-foreground">
            Choose your font style
          </p>
        </div>
        <Select
          value={preferences.font}
          onValueChange={(value) =>
            setPreference("font", value as FontPreference)
          }
        >
          <SelectTrigger className="h-10 rounded-full px-4">
            <SelectValue placeholder="Select a font" />
          </SelectTrigger>

          <SelectContent>
            {fontOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-3 rounded-2xl bg-foreground p-4">
        <div>
          <p className="text-sm font-medium">Font size</p>
          <p className="text-xs leading-5 text-muted-foreground">
            Adjust text size without affecting layout
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {fontSizeOptions.map((option) => {
            const active = preferences.fontSize === option.value;

            return (
              <Button
                key={option.value}
                type="button"
                variant={active ? "default" : "outline"}
                onClick={() =>
                  setPreference("fontSize", option.value as FontSizePreference)
                }
                className={`rounded-full bg-theme-accent ${
                  active ? "" : "text-muted-foreground"
                }`}
              >
                {option.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
