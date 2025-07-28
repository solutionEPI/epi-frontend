"use client";

import React from "react";
import { ShoppingCart, Plus, Minus, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface CartIconProps {
  variant?: "dropdown" | "sheet";
  className?: string;
}

export function CartIcon({ variant = "dropdown", className }: CartIconProps) {
  const {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();
  const t = useTranslations("Cart");

  const CartButton = () => (
    <Button variant="ghost" size="sm" className={`relative ${className}`}>
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
          {totalItems > 99 ? "99+" : totalItems}
        </Badge>
      )}
    </Button>
  );

  const CartItems = () => (
    <div className="space-y-4">
      {items.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">{t("emptyCart")}</p>
        </div>
      ) : (
        <>
          <ScrollArea className="h-[300px]">
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 p-3 rounded-lg border">
                  {item.image && (
                    <div className="relative h-12 w-12 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">
                      {item.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm w-8 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }>
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-destructive"
                      onClick={() => removeItem(item.id)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="space-y-3 pt-3 border-t">
            <div className="flex justify-between items-center font-semibold">
              <span>{t("total")}</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={clearCart} className="w-full">
                {t("clearCart")}
              </Button>
              <Button asChild className="w-full">
                <Link href="/checkout">{t("checkout")}</Link>
              </Button>
            </div>

            <Button variant="ghost" asChild className="w-full">
              <Link href="/cart">{t("viewCart")}</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );

  if (variant === "sheet") {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <CartButton />
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>{t("shoppingCart")}</SheetTitle>
            <SheetDescription>
              {totalItems > 0
                ? t("itemsInCart", { count: totalItems })
                : t("cartEmpty")}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <CartItems />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CartButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[400px]">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">{t("shoppingCart")}</h3>
            {totalItems > 0 && (
              <span className="text-sm text-muted-foreground">
                {t("itemsInCart", { count: totalItems })}
              </span>
            )}
          </div>
          <CartItems />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
