import { Roboto, Montserrat } from "next/font/google";
import { getMessages } from "next-intl/server";
import { dashboardConfig } from "@/lib/config";
import { DefaultFavicon } from "@/components/ui/default-favicon";
import { LayoutProvider } from "@/components/layout-provider";
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
  keywords: dashboardConfig.keywords,
  authors: [
    {
      name: dashboardConfig.authorName,
      url: "https://solution-epi.com",
    },
  ],
  creator: dashboardConfig.creator,
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
        alt: dashboardConfig.openGraphAlt,
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
    creator: dashboardConfig.twitterCreator,
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
        className={`${roboto.variable} ${montserrat.variable} font-sans flex flex-col min-h-screen bg-background text-foreground`}
        suppressHydrationWarning>
        <LayoutProvider messages={messages} locale={locale}>
          {children}
        </LayoutProvider>
      </body>
    </html>
  );
}
