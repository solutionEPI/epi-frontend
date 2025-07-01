/**
 * Solution Epi Configuration
 * Artisanal Bakery in Douala, Cameroon
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
  name: "Solution Epi",
  description:
    "Artisanal bakery offering authentic breads and pastries in Douala, Cameroon",
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
    name: "Bread & Pastry Journal",
  },
  brand: {
    colors: {
      primary: "#E63946", // Red
      secondary: "#1D3557", // Dark blue
      background: "#F8F1E3", // Light cream
      text: "#293241", // Dark navy
      accent: "#F4A261", // Orange/wheat
    },
    typography: {
      headingFont: "Playfair Display, serif",
      bodyFont: "Raleway, sans-serif",
    },
  },
};
