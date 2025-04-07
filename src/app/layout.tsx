import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { inter } from "@/config/fonts";
import { SideNavBar } from "@/components/navbar/Sidebar";
import { Header } from "@/components/navbar/Header";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: "%s - Click2Eat",
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  robots: {
    follow: false,
    index: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background antialiased",
          inter.className,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <SideNavBar />
          <main className="w-full bg-sidebar">
            <Header />
            <div className="p-3">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
