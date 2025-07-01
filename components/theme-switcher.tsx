"use client";

import * as React from "react";
import { Moon, Sun, Palette, HardHat, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
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
  label: string;
  icon: React.ReactNode;
  description: string;
  colors: string[];
}

const themeOptions: ThemeOption[] = [
  {
    value: "system",
    label: "System",
    icon: <Monitor className="h-4 w-4" />,
    description: "Follow system preferences",
    colors: ["#ffffff", "#1e293b", "#f59e0b"],
  },
  {
    value: "light",
    label: "Light",
    icon: <Sun className="h-4 w-4" />,
    description: "Light mode",
    colors: ["#ffffff", "#f8fafc", "#f59e0b"],
  },
  {
    value: "dark",
    label: "Dark",
    icon: <Moon className="h-4 w-4" />,
    description: "Dark mode",
    colors: ["#1e293b", "#0f172a", "#f59e0b"],
  },
  {
    value: "professional",
    label: "Safety",
    icon: <HardHat className="h-4 w-4" />,
    description: "Safety equipment theme",
    colors: ["#ffffff", "#f59e0b", "#fbbf24"],
  },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
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
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="w-9 px-0">
          {currentTheme.icon}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
          Select a theme
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
                <div className="text-sm font-medium">{option.label}</div>
                <div className="text-xs text-muted-foreground">
                  {option.description}
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
