import { Raleway } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "@/components/ui/toaster";
import { dashboardConfig } from "@/lib/config";
import { Providers } from "@/components/providers";
import { DefaultFavicon } from "@/components/ui/default-favicon";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "../globals.css";

const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" });

export const metadata = {
  metadataBase: new URL("https://solution-epi.com"),
  title: {
    default: dashboardConfig.name,
    template: `%s | ${dashboardConfig.name}`,
  },
  description: dashboardConfig.description,
  keywords: [
    "bakery",
    "Douala",
    "Cameroon",
    "bread",
    "pastries",
    "Solution Epi",
  ],
  authors: [
    {
      name: "Solution Epi",
      url: "https://solution-epi.com",
    },
  ],
  creator: "Solution Epi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://solution-epi.com",
    title: dashboardConfig.name,
    description: dashboardConfig.description,
    siteName: dashboardConfig.name,
    images: [
      {
        url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Solution Epi - Artisanal Bakery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: dashboardConfig.name,
    description: dashboardConfig.description,
    images: [
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    ],
    creator: "@solutionepi",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
    other: {
      rel: "apple-touch-icon",
      url: "/favicon.svg",
    },
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <DefaultFavicon />
      </head>
      <body
        className={`${raleway.className} flex flex-col min-h-screen bg-background text-foreground`}>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
