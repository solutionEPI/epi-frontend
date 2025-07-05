"use client";

import * as React from "react";
import { Moon, Sun, Palette, HardHat, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ThemeOption {
  value: string;
  labelKey: keyof IntlMessages["ThemeSwitcher"];
  descriptionKey: keyof IntlMessages["ThemeSwitcher"];
  icon: React.ReactNode;
  colors: string[];
}

const themeOptions: ThemeOption[] = [
  {
    value: "system",
    labelKey: "system",
    descriptionKey: "systemDescription",
    icon: <Monitor className="h-4 w-4" />,
    colors: ["#ffffff", "#1e293b", "#f59e0b"],
  },
  {
    value: "light",
    labelKey: "light",
    descriptionKey: "lightDescription",
    icon: <Sun className="h-4 w-4" />,
    colors: ["#ffffff", "#f8fafc", "#f59e0b"],
  },
  {
    value: "dark",
    labelKey: "dark",
    descriptionKey: "darkDescription",
    icon: <Moon className="h-4 w-4" />,
    colors: ["#1e293b", "#0f172a", "#f59e0b"],
  },
  {
    value: "professional",
    labelKey: "safety",
    descriptionKey: "safetyDescription",
    icon: <HardHat className="h-4 w-4" />,
    colors: ["#ffffff", "#f59e0b", "#fbbf24"],
  },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("ThemeSwitcher");
  const [isMounted, setIsMounted] = React.useState(false);

  // Handle hydration
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentTheme =
    themeOptions.find((t) => t.value === theme) || themeOptions[0];

  if (!isMounted) {
    return (
      <Button variant="ghost" size="sm" className="w-9 px-0">
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">{t("toggleTheme")}</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="w-9 px-0">
          {currentTheme.icon}
          <span className="sr-only">{t("toggleTheme")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
          {t("selectTheme")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themeOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className={cn(
              "flex items-center gap-4 cursor-pointer py-2",
              theme === option.value && "bg-accent/50"
            )}
            onClick={() => setTheme(option.value)}>
            <div className="flex items-center gap-2 flex-1">
              <div className="p-1 rounded-sm bg-background flex items-center justify-center">
                {option.icon}
              </div>
              <div>
                <div className="text-sm font-medium">{t(option.labelKey)}</div>
                <div className="text-xs text-muted-foreground">
                  {t(option.descriptionKey)}
                </div>
              </div>
            </div>
            <div className="flex">
              {option.colors.map((color, i) => (
                <div
                  key={i}
                  className="h-4 w-4 rounded-full border border-border"
                  style={{
                    backgroundColor: color,
                    marginLeft: i > 0 ? "-4px" : "0",
                    zIndex: option.colors.length - i,
                  }}
                />
              ))}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
