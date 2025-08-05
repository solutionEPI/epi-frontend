"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LogOutIcon,
  ChevronRight,
  Menu,
  Settings,
  BrainCircuit,
  Layers,
  Sparkles,
  Rss,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useTranslations } from "next-intl";

import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DefaultLogo } from "@/components/ui/default-logo";
import Image from "next/image";

// Sidebar animation variants
const sidebarVariants: Variants = {
  expanded: {
    width: "240px",
    transition: { duration: 0.3, ease: "easeOut" },
  },
  collapsed: {
    width: "72px",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Sidebar item animation variants
const itemVariants: Variants = {
  expanded: {
    opacity: 1,
    x: 0,
    display: "block",
    transition: { duration: 0.2, delay: 0.1 },
  },
  collapsed: {
    opacity: 0,
    x: -10,
    transitionEnd: { display: "none" },
    transition: { duration: 0.2 },
  },
};

interface ModelInfo {
  app_label: string;
  model_name: string;
  verbose_name: string;
  verbose_name_plural: string;
  category: string;
  frontend_config: {
    icon?: string;
    color?: string;
    description?: string;
    include_in_dashboard?: boolean;
  };
  api_url: string;
}

interface AdminConfig {
  models: Record<string, ModelInfo>;
  categories: Record<string, string[]>;
  frontend_options: {
    site_name: string;
    logo_url: string;
    favicon: string;
  };
}

export interface UserProfile {
  first_name: string;
  email: string;
  avatar_url?: string;
  preferences: {
    theme?: string;
    sidebar_collapsed?: boolean;
  };
  is_2fa_enabled?: boolean;
  [key: string]: any;
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();
  const t = useTranslations("DashboardLayout");
  const { theme, setTheme } = useTheme();

  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const { data: adminConfig } = useQuery<AdminConfig>({
    queryKey: ["adminConfig"],
    queryFn: api.getAdminConfig,
    enabled: !!session,
    staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
    refetchOnWindowFocus: false, // Do not refetch when window regains focus
    refetchOnMount: false, // Do not refetch on component mount
  });

  const { data: userProfile } = useQuery<UserProfile>({
    queryKey: ["userProfile"],
    queryFn: api.getUserProfile,
    enabled: !!session,
    staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
    refetchOnWindowFocus: false, // Do not refetch when window regains focus
    refetchOnMount: false, // Do not refetch on component mount
  });

  const preferencesMutation = useMutation({
    mutationFn: (prefs: Partial<UserProfile["preferences"]>) =>
      api.updateUserProfile({ preferences: prefs }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: t("failedToUpdatePreferences"),
        description: error.message,
      });
    },
  });

  const siteName =
    adminConfig?.frontend_options?.site_name || t("defaultSiteName");
  const logoUrl = adminConfig?.frontend_options?.logo_url;

  // Sync theme once the user profile is loaded
  useEffect(() => {
    if (
      userProfile?.preferences?.theme &&
      theme !== userProfile.preferences.theme
    ) {
      setTheme(userProfile.preferences.theme);
    }
  }, [userProfile, theme, setTheme]);

  // Sync sidebar collapsed state without creating a dependency loop
  useEffect(() => {
    const collapsed = isMobile ?? userProfile?.preferences?.sidebar_collapsed;
    if (collapsed !== undefined && collapsed !== isSidebarCollapsed) {
      setSidebarCollapsed(collapsed);
    }
  }, [userProfile, isMobile]);

  // Removed automatic theme sync mutation to prevent rapid PATCH loops

  const toggleSidebar = useCallback(() => {
    const newCollapsedState = !isSidebarCollapsed;
    setSidebarCollapsed(newCollapsedState);
    if (
      !isMobile &&
      userProfile &&
      newCollapsedState !== userProfile.preferences?.sidebar_collapsed
    ) {
      preferencesMutation.mutate({ sidebar_collapsed: newCollapsedState });
    }
  }, [isSidebarCollapsed, isMobile, userProfile, preferencesMutation]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
    toast({
      title: t("signOutSuccessTitle"),
      description: t("signOutSuccessDescription"),
    });
  };

  const isActive = (path: string) => {
    const locale = pathname.split("/")[1];
    const dashboardPath = path === "/" ? "" : path; // root maps to /dashboard
    const pathWithLocale = `/${locale}/dashboard${dashboardPath}`;
    return (
      pathname === pathWithLocale ||
      (dashboardPath !== "" && pathname.startsWith(pathWithLocale))
    );
  };

  if (!session) return null;

  const SidebarHeader = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="h-16 flex items-center px-4 border-b border-sidebar-border w-full justify-between">
      <Link href="/" className="flex items-center overflow-hidden">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={siteName}
            width={32}
            height={32}
            className="h-8 w-8 flex-shrink-0"
          />
        ) : (
          <DefaultLogo className="h-8 w-8 text-sidebar-foreground flex-shrink-0" />
        )}
        <AnimatePresence>
          {(!isSidebarCollapsed || isMobile) && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="ml-3 font-semibold text-lg text-sidebar-foreground whitespace-nowrap">
              {siteName}
            </motion.span>
          )}
        </AnimatePresence>
      </Link>
      {!isMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-sidebar-foreground hover:bg-sidebar-accent -mr-2">
          <ChevronRight
            className={cn(
              "h-5 w-5 transition-transform",
              isSidebarCollapsed ? "" : "rotate-180"
            )}
          />
        </Button>
      )}
    </div>
  );

  const SidebarContent = () => (
    <>
      <ScrollArea className="flex-1 w-full">
        <nav className="px-2 py-4 space-y-1">
          <SidebarLink
            href="/"
            icon={<Layers className="h-5 w-5 flex-shrink-0" />}
            label={t("dashboard")}
            isCollapsed={isSidebarCollapsed && !isMobile}
            isActive={isActive("/")}
          />

          {adminConfig &&
            Object.entries(adminConfig.categories).map(
              ([category, modelKeys]) => (
                <div key={category} className="my-2">
                  <AnimatePresence>
                    {!isSidebarCollapsed || isMobile ? (
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="px-3 py-2 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">
                        {category}
                      </motion.h3>
                    ) : null}
                  </AnimatePresence>
                  {modelKeys.map((modelKey) => {
                    const model = adminConfig.models[modelKey];
                    if (!model) return null;
                    const href = `/models/${model.model_name}`;
                    return (
                      <SidebarLink
                        key={href}
                        href={href}
                        icon={
                          <DynamicIcon
                            name={model.frontend_config?.icon || "file-text"}
                            className="h-5 w-5 flex-shrink-0"
                          />
                        }
                        label={model.verbose_name_plural}
                        isCollapsed={isSidebarCollapsed && !isMobile}
                        isActive={isActive(href)}
                      />
                    );
                  })}
                </div>
              )
            )}

          <div className="my-2">
            <AnimatePresence>
              {!isSidebarCollapsed || isMobile ? (
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-3 py-2 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">
                  {t("tools")}
                </motion.h3>
              ) : null}
            </AnimatePresence>
            <SidebarLink
              href="/ai-tools"
              icon={<BrainCircuit className="h-5 w-5 flex-shrink-0" />}
              label={t("aiTools")}
              isCollapsed={isSidebarCollapsed && !isMobile}
              isActive={isActive("/ai-tools")}
            />
            <SidebarLink
              href="/blog"
              icon={<Rss className="h-4 w-4" />}
              label={t("blog")}
              isCollapsed={isSidebarCollapsed && !isMobile}
              isActive={isActive("/blog")}
            />
          </div>

          <div className="my-2">
            <AnimatePresence>
              {!isSidebarCollapsed || isMobile ? (
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-3 py-2 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">
                  {t("system")}
                </motion.h3>
              ) : null}
            </AnimatePresence>
            <SidebarLink
              href="/settings"
              icon={<Settings className="h-5 w-5 flex-shrink-0" />}
              label={t("settings")}
              isCollapsed={isSidebarCollapsed && !isMobile}
              isActive={isActive("/settings")}
            />
          </div>
        </nav>
      </ScrollArea>
      <div className="p-2 border-t border-sidebar-border w-full">
        <UserNav
          user={userProfile}
          onSignOut={handleSignOut}
          isCollapsed={isSidebarCollapsed && !isMobile}
        />
      </div>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <motion.aside
        variants={sidebarVariants}
        initial={false}
        animate={isSidebarCollapsed ? "collapsed" : "expanded"}
        className="bg-sidebar text-sidebar-foreground border-r border-sidebar-border hidden md:flex flex-col z-30">
        <SidebarHeader />
        <div className="flex-1 flex flex-col overflow-y-auto">
          <SidebarContent />
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden flex items-center justify-between h-16 px-4 border-b bg-background">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-sidebar flex flex-col">
              <SidebarHeader isMobile={true} />
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center">
            <span className="font-semibold text-lg">{siteName}</span>
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="container mx-auto max-w-7xl">
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function SidebarLink({
  href,
  icon,
  label,
  isCollapsed,
  isActive,
  useLocale = true,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  isActive: boolean;
  useLocale?: boolean;
}) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const basePath = href === "/" ? "" : href;
  const finalHref = useLocale ? `/${locale}${basePath}` : href;

  return (
    <Link
      href={finalHref}
      className={cn(
        "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent/50",
        isCollapsed ? "justify-center" : "justify-start"
      )}>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="flex items-center">
              {icon}
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{
                      opacity: 1,
                      width: "auto",
                      transition: { delay: 0.1 },
                    }}
                    exit={{ opacity: 0, width: 0 }}
                    className="ml-3">
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right">
              <p>{label}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </Link>
  );
}

function UserNav({
  user,
  onSignOut,
  isCollapsed,
}: {
  user: UserProfile | undefined;
  onSignOut: () => void;
  isCollapsed: boolean;
}) {
  const t = useTranslations("DashboardLayout");
  const tSettings = useTranslations("SettingsPage");
  const tHeader = useTranslations("Header");

  if (!user) {
    return (
      <div className="flex items-center gap-3 p-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        {!isCollapsed && <Skeleton className="h-4 w-20 flex-1" />}
      </div>
    );
  }

  const isSuperUser = user.is_superuser;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "flex h-auto w-full items-center gap-2 p-2",
            isCollapsed ? "justify-center px-0" : "justify-start"
          )}>
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.profile?.avatar} />
            <AvatarFallback>{getInitials(user.first_name)}</AvatarFallback>
          </Avatar>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
                exit={{ opacity: 0, x: -5 }}
                className="flex flex-col items-start flex-1 truncate">
                <span className="text-sm font-medium text-sidebar-foreground truncate">
                  {user.first_name}
                </span>
                <span className="text-xs text-sidebar-foreground/70 truncate">
                  {user.email}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.profile?.avatar} />
              <AvatarFallback>{getInitials(user.first_name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.first_name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-2 flex items-center justify-around">
          <LanguageSwitcher />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <Settings className="mr-2 h-4 w-4" />
              <span>{tSettings("title")}</span>
            </Link>
          </DropdownMenuItem>
          {isSuperUser && (
            <DropdownMenuItem asChild>
              <Link href="/admin" className="flex items-center">
                <ShieldCheck className="mr-2 h-4 w-4" />
                <span>{tHeader("adminDashboard")}</span>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignOut}>
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>{t("signOut")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
