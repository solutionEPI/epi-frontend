/**
 * Solution EPI Configuration
 * Protection Equipment & Safety Solutions
 */

export interface NavigationItem {
  name: string;
  href: string;
  icon: string;
}

export interface DashboardConfig {
  name: string;
  description: string;
  keywords: string[];
  authorName: string;
  creator: string;
  openGraphAlt: string;
  twitterCreator: string;
  logoUrl: string;
  favicon: string;
  repositoryUrl: string;
  backendUrl: string;
  api: {
    baseUrl: string;
    debugMode: boolean;
  };
  blog: {
    enabled: boolean;
    name: string;
  };
  brand: {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      accent: string;
    };
    typography: {
      headingFont: string;
      bodyFont: string;
    };
  };
}

export const dashboardConfig: DashboardConfig = {
  name: "Solution EPI",
  description:
    "Équipements de Protection Individuelle pour la sécurité au travail",
  keywords: [
    "EPI",
    "sécurité",
    "protection individuelle",
    "équipements",
    "Cameroun",
    "Solution EPI",
  ],
  authorName: "Solution EPI",
  creator: "Solution EPI",
  openGraphAlt: "Solution EPI - Équipements de Protection Individuelle",
  twitterCreator: "@solutionepi",
  repositoryUrl: "https://github.com/asbilim/solution-epi.git",
  logoUrl: "/logo-solution.png",
  favicon: "/favicon.svg",
  backendUrl:
    process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.solution-epi.com",
  api: {
    baseUrl:
      process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.solution-epi.com",
    debugMode: process.env.NODE_ENV === "development",
  },
  blog: {
    enabled: true,
    name: "Blog Sécurité & EPI",
  },
  brand: {
    colors: {
      primary: "#FFD700", // Gold (Yellow)
      secondary: "#64748B", // Slate Gray
      background: "#FFFFFF", // White
      text: "#1E293B", // Dark Slate
      accent: "#CBD5E1", // Light Slate for accent
    },
    typography: {
      headingFont: "Montserrat, sans-serif",
      bodyFont: "Roboto, sans-serif",
    },
  },
};
