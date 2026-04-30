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

function updatePreference<T extends keyof SettingsPreferences>(
  preferences: SettingsPreferences,
  key: T,
  value: SettingsPreferences[T]
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
    value: SettingsPreferences[T]
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
            Tune buttons, focus rings, progress, and selected navigation states.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {accentOptions.map((option) => {
            const active = preferences.accent === option.value;

            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={active}
                onClick={() =>
                  setPreference("accent", option.value as AccentPreference)
                }
                className={`flex h-10 items-center gap-2 rounded-full border px-3 text-sm transition ${
                  active
                    ? "border-primary bg-background text-primary"
                    : "border-transparent bg-background text-muted-foreground hover:text-primary"
                }`}
              >
                <span className={`size-4 rounded-full ${option.swatch}`} />
                {option.label}
                {active && <Check className="h-4 w-4" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-3 rounded-2xl bg-foreground p-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-sm font-medium">Font family</p>
          <p className="text-xs leading-5 text-muted-foreground">
            Choose the typography voice used across the app shell and reading text.
          </p>
        </div>
        <select
          value={preferences.font}
          onChange={(event) =>
            setPreference("font", event.target.value as FontPreference)
          }
          className="h-10 rounded-full border border-input bg-background px-4 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          {fontOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-3 rounded-2xl bg-foreground p-4">
        <div>
          <p className="text-sm font-medium">Font size</p>
          <p className="text-xs leading-5 text-muted-foreground">
            Adjust the app text scale without changing the page layout density.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {fontSizeOptions.map((option) => {
            const active = preferences.fontSize === option.value;

            return (
              <Button
                key={option.value}
                type="button"
                variant="ghost"
                onClick={() =>
                  setPreference("fontSize", option.value as FontSizePreference)
                }
                className={`rounded-full bg-background ${
                  active ? "text-primary" : "text-muted-foreground"
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
