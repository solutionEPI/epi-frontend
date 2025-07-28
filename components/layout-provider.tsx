"use client";

import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "@/components/ui/toaster";
import { MainLayoutWrapper } from "@/components/layout/main-layout-wrapper";
import { Providers } from "@/components/providers";
import { CartProvider } from "@/components/cart-provider";

export function LayoutProvider({
  children,
  messages,
  locale,
}: {
  children: React.ReactNode;
  messages: any;
  locale: string;
}) {
  return (
    <Providers>
      <CartProvider>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <MainLayoutWrapper>{children}</MainLayoutWrapper>
          <Toaster />
        </NextIntlClientProvider>
      </CartProvider>
    </Providers>
  );
}
