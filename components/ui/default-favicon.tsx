"use client";

import React from "react";
import { dashboardConfig } from "@/lib/config";

export const DefaultFavicon = () => {
  return (
    <>
      <link
        rel="icon"
        href={dashboardConfig.favicon}
        type="image/svg+xml"
        sizes="any"
      />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
      <meta name="theme-color" content={dashboardConfig.brand.colors.primary} />
    </>
  );
};
