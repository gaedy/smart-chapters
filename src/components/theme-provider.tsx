"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SettingsPreferenceProvider } from "@/components/settings/settings-preferences";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      enableColorScheme
    >
      <SettingsPreferenceProvider>{children}</SettingsPreferenceProvider>
    </NextThemesProvider>
  );
}
