"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemesSwitcher = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  if (resolvedTheme === "dark") {
    return (
      <button onClick={() => setTheme("light")}>
        <Sun />
      </button>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <button onClick={() => setTheme("dark")}>
        <Moon />
      </button>
    );
  }
};
