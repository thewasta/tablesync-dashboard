"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { SidebarProvider } from "@/components/ui/sidebar";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: 60 * 3000, // 3 minutes
            refetchInterval: 60 * 3000, // 3 minutes
            refetchOnWindowFocus: "always",
            refetchOnReconnect: true,
            refetchOnMount: false,
            refetchIntervalInBackground: false,
          },
        },
      }),
  );

  return (
    <HeroUIProvider navigate={router.push}>
      <ClerkProvider>
        <SidebarProvider>
          <NextThemesProvider {...themeProps}>
            <QueryClientProvider client={queryClient}>
              {children}
              {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
            </QueryClientProvider>
          </NextThemesProvider>
        </SidebarProvider>
      </ClerkProvider>
    </HeroUIProvider>
  );
}
