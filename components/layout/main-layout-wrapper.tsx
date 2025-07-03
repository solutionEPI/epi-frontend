"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";

export function MainLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.includes("/dashboard");

  return (
    <>
      {!isDashboardRoute && <Header />}
      <main className="flex-grow">{children}</main>
      {!isDashboardRoute && <Footer />}
    </>
  );
}