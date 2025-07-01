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
  repositoryUrl: "https://github.com/asbilim/solution-epi.git",
  logoUrl: "/solution-logo.svg",
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
      primary: "#FF6B00", // Safety Orange
      secondary: "#0055A4", // Blue
      background: "#FFFFFF", // White
      text: "#1A1A1A", // Almost Black
      accent: "#FFCC00", // Yellow for safety/warning
    },
    typography: {
      headingFont: "Montserrat, sans-serif",
      bodyFont: "Roboto, sans-serif",
    },
  },
};
