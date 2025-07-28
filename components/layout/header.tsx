"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LanguageSwitcher } from "@/components/language-switcher";
import { CartIcon } from "@/components/ui/cart-icon";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { LogOutIcon, Menu, X, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useLocale } from "next-intl";

export function Header() {
  const t = useTranslations("Header");
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const locale = useLocale();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const routes = [
    { name: t("home"), path: "/" },
    { name: t("blog"), path: "/blog" },
    { name: t("products"), path: "/products" },
    { name: t("contact"), path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === `/${locale}`;
    return pathname.startsWith(`/${locale}${path}`);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const isSuperUser = session?.user?.is_superuser;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || mobileMenuOpen
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 relative mr-3">
                <Image
                  src="/logo-solution.png"
                  alt="Solution EPI SARL"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold hidden sm:inline-block text-foreground">
                Solution EPI SARL
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive(route.path) ? "text-primary" : "text-foreground"
                )}>
                {route.name}
              </Link>
            ))}
          </nav>

          {/* Right Nav Section */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <CartIcon variant="dropdown" />

            {/* Auth Buttons */}
            {status === "loading" ? (
              <div className="w-20 h-9 bg-muted animate-pulse rounded-md"></div>
            ) : session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      {session.user.image ? (
                        <AvatarImage
                          src={session.user.image}
                          alt={session.user.name || t("user")}
                        />
                      ) : (
                        <AvatarFallback>
                          {getInitials(session.user.name || t("user"))}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {session.user.name && (
                        <p className="font-medium">{session.user.name}</p>
                      )}
                      {session.user.email && (
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {session.user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      {t("dashboard")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="cursor-pointer">
                      {t("settings")}
                    </Link>
                  </DropdownMenuItem>
                  {isSuperUser && (
                    <DropdownMenuItem asChild>
                      <Link
                        href="/admin"
                        className="cursor-pointer flex items-center">
                        <ShieldCheck className="h-4 w-4 mr-2" />
                        {t("adminDashboard")}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer flex items-center"
                    onSelect={handleSignOut}>
                    <LogOutIcon className="h-4 w-4 mr-2" />
                    {t("signOut")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link href="/login">{t("signIn")}</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeSwitcher />
            <CartIcon variant="sheet" />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="container px-4 pt-2 pb-4 space-y-4">
            <nav className="flex flex-col space-y-2">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-base font-medium",
                    isActive(route.path)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted/80"
                  )}
                  onClick={() => setMobileMenuOpen(false)}>
                  {route.name}
                </Link>
              ))}
            </nav>

            <div className="pt-2 flex items-center justify-between border-t">
              <LanguageSwitcher />

              {status !== "loading" && !session && (
                <Button asChild>
                  <Link href="/login">{t("signIn")}</Link>
                </Button>
              )}

              {session?.user && (
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-medium">{session.user.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {session.user.email}
                    </div>
                  </div>
                  <Avatar className="h-9 w-9">
                    {session.user.image ? (
                      <AvatarImage
                        src={session.user.image}
                        alt={session.user.name || "User"}
                      />
                    ) : (
                      <AvatarFallback>
                        {getInitials(session.user.name || "User")}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </div>
              )}
            </div>

            {session?.user && (
              <div className="pt-2 space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild>
                  <Link href="/dashboard">{t("dashboard")}</Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild>
                  <Link href="/dashboard/settings">{t("settings")}</Link>
                </Button>
                {isSuperUser && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild>
                    <Link href="/admin" className="flex items-center">
                      <ShieldCheck className="h-4 w-4 mr-2" />
                      {t("adminDashboard")}
                    </Link>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={handleSignOut}>
                  <LogOutIcon className="h-4 w-4 mr-2" />
                  {t("signOut")}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
