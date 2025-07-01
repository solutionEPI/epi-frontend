import * as React from "react";
import { dashboardConfig } from "@/lib/config";
import Image from "next/image";

export const DefaultLogo = (
  props: React.HTMLAttributes<HTMLDivElement> & {
    height?: number;
    width?: number;
  }
) => {
  const { width = 40, height = 40, ...rest } = props;

  return (
    <div {...rest} className={`flex items-center ${props.className || ""}`}>
      <Image
        src={dashboardConfig.logoUrl}
        alt={dashboardConfig.name}
        width={width}
        height={height}
        priority
      />
    </div>
  );
};
