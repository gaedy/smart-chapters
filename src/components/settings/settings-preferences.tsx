"use client";

import { useEffect } from "react";

const STORAGE_KEY = "smart-chapters:preferences";

export const accentOptions = [
  { label: "Walnut", value: "walnut", swatch: "bg-stone-900" },
  { label: "Sage", value: "sage", swatch: "bg-emerald-700" },
  { label: "Ink", value: "ink", swatch: "bg-sky-800" },
  { label: "Plum", value: "plum", swatch: "bg-fuchsia-800" },
] as const;

export const fontOptions = [
  { label: "Inter", value: "inter" },
  { label: "Merriweather", value: "merriweather" },
  { label: "System", value: "system" },
] as const;

export const fontSizeOptions = [
  { label: "Compact", value: "compact" },
  { label: "Comfortable", value: "comfortable" },
  { label: "Large", value: "large" },
] as const;

export type AccentPreference = (typeof accentOptions)[number]["value"];
export type FontPreference = (typeof fontOptions)[number]["value"];
export type FontSizePreference = (typeof fontSizeOptions)[number]["value"];

export type SettingsPreferences = {
  accent: AccentPreference;
  font: FontPreference;
  fontSize: FontSizePreference;
};

export const defaultPreferences: SettingsPreferences = {
  accent: "walnut",
  font: "inter",
  fontSize: "comfortable",
};

function isAccent(value: unknown): value is AccentPreference {
  return accentOptions.some((option) => option.value === value);
}

function isFont(value: unknown): value is FontPreference {
  return fontOptions.some((option) => option.value === value);
}

function isFontSize(value: unknown): value is FontSizePreference {
  return fontSizeOptions.some((option) => option.value === value);
}

export function readPreferences(): SettingsPreferences {
  if (typeof window === "undefined") {
    return defaultPreferences;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : {};

    return {
      accent: isAccent(parsed.accent) ? parsed.accent : defaultPreferences.accent,
      font: isFont(parsed.font) ? parsed.font : defaultPreferences.font,
      fontSize: isFontSize(parsed.fontSize)
        ? parsed.fontSize
        : defaultPreferences.fontSize,
    };
  } catch {
    return defaultPreferences;
  }
}

export function applyPreferences(preferences: SettingsPreferences) {
  const root = document.documentElement;

  root.dataset.accent = preferences.accent;
  root.dataset.font = preferences.font;
  root.dataset.fontSize = preferences.fontSize;

  if (document.body) {
    document.body.dataset.font = preferences.font;
  }
}

export function savePreferences(preferences: SettingsPreferences) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  applyPreferences(preferences);
}

export function SettingsPreferenceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    applyPreferences(readPreferences());
  }, []);

  return children;
}
