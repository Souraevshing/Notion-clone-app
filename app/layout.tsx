import type { Metadata } from "next";
import { Ubuntu_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";

import "./globals.css";

const inter = Ubuntu_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Notion",
  description: "Notion app by create next app",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme:light)",
        url: "icons/logo-light.svg",
        href: "icons/logo-light.svg",
      },
      {
        media: "(prefers-color-scheme:dark)",
        url: "icons/logo-dark.svg",
        href: "icons/logo-dark.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            storageKey="_themes"
          >
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
