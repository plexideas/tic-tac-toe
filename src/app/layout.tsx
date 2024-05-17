import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "@/styles/globals.css";
import { Providers } from "@/components/utils/providers";
import { ThemesSwitcher } from "@/components/utils/themes-switcher";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Tic Tac Toe",
  description: "A simple game of Tic Tac Toe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-hidden">
      <body className={roboto.className}>
        <Providers>
          <div className="absolute right-4 top-4">
            <ThemesSwitcher />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
