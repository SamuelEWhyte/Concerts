"use client";

import { THEMES } from "@/lib/constants";
import { useTheme } from "./ThemeProvider";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <select
      className="select select-bordered select-sm w-full max-w-xs capitalize"
      value={theme}
      onChange={(e) => setTheme(e.target.value as (typeof THEMES)[number])}
      aria-label="Choose app theme"
    >
      {THEMES.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
  );
}
