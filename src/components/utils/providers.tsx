"use client";
import { ThemeProvider } from "next-themes";
import { FC, ReactNode } from "react";

export const Providers: FC<Readonly<{ children: ReactNode }>> = ({
  children,
}) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
};
