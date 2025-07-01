import { Roboto, Montserrat } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "@/components/ui/toaster";
import { dashboardConfig } from "@/lib/config";
import { Providers } from "@/components/providers";
import { DefaultFavicon } from "@/components/ui/default-favicon";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "../globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
});

export const metadata = {
  metadataBase: new URL("https://solution-epi.com"),
  title: {
    default: dashboardConfig.name,
    template: `%s | ${dashboardConfig.name}`,
  },
  description: dashboardConfig.description,
  keywords: [
    "EPI",
    "sécurité",
    "protection individuelle",
    "équipements",
    "Cameroun",
    "Solution EPI",
  ],
  authors: [
    {
      name: "Solution EPI",
      url: "https://solution-epi.com",
    },
  ],
  creator: "Solution EPI",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://solution-epi.com",
    title: dashboardConfig.name,
    description: dashboardConfig.description,
    siteName: dashboardConfig.name,
    images: [
      {
        url: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Solution EPI - Équipements de Protection Individuelle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: dashboardConfig.name,
    description: dashboardConfig.description,
    images: [
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
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
        className={`${roboto.variable} ${montserrat.variable} font-sans flex flex-col min-h-screen bg-background text-foreground`}>
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
