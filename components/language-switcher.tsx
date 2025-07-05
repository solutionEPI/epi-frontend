"use client";

import { usePathname, useRouter } from "@/i18n/routing/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Check, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const locales = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
] as const;

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const t = useTranslations("Languages");

  const handleLocaleChange = (locale: string) => {
    router.push(pathname, { locale });
  };

  // Find current locale information
  const currentLocaleInfo =
    locales.find((loc) => loc.code === currentLocale) || locales[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 h-9 px-2 md:px-3">
          <Globe className="h-4 w-4 mr-1" />
          <span className="hidden md:inline-flex">
            {currentLocaleInfo.flag} {t(currentLocaleInfo.code)}
          </span>
          <span className="inline-flex md:hidden">
            {currentLocaleInfo.flag}
          </span>
          <ChevronDown className="h-3.5 w-3.5 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            className={cn(
              "flex items-center justify-between cursor-pointer",
              currentLocale === locale.code && "bg-accent/50"
            )}
            onClick={() => handleLocaleChange(locale.code)}>
            <span className="flex items-center gap-2">
              <span className="text-base">{locale.flag}</span>
              <span>{t(locale.code)}</span>
            </span>
            {currentLocale === locale.code && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
