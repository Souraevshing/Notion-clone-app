import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";

import "./globals.css";
import { Spinner } from "@/components/spinner";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "600"],
});

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
            <Toaster
              position="top-right"
              closeButton={true}
              loadingIcon={<Spinner />}
              duration={5000}
            />
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
