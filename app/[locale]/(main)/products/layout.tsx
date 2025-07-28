"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import { api } from "@/lib/api";
import { CartProvider } from "@/components/cart-provider";

// Types
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("ProductsPage");
  const locale = useLocale();
  const [categories, setCategories] = useState<
    Array<{ name: string; label: string }>
  >([]);

  // Fetch product categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.getProductCategories(locale);
        const categoriesData = data.results || data.categories || [];
        // Map categories to expected format
        const formattedCategories = categoriesData.map((cat: any) => ({
          name:
            typeof cat === "string" ? cat : cat.name || cat.title || "Category",
          label:
            typeof cat === "string"
              ? cat
              : cat.name_en ||
                cat.title_en ||
                cat.name ||
                cat.title ||
                "Category",
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        // Fallback to default categories if API fails
        setCategories([
          { name: "Protection de la tête", label: "Head Protection" },
          { name: "Protection oculaire", label: "Eye Protection" },
          { name: "Protection auditive", label: "Hearing Protection" },
          { name: "Protection respiratoire", label: "Respiratory Protection" },
          { name: "Protection des mains", label: "Hand Protection" },
          { name: "Protection des pieds", label: "Foot Protection" },
        ]);
      }
    };
    fetchCategories();
  }, [locale]);

  return (
    <CartProvider>
      <div className="pt-20">
        {/* Category navigation bar */}
        <div className="bg-background border-b">
          <div className="container mx-auto px-4 py-2 overflow-x-auto">
            <div className="flex space-x-4 whitespace-nowrap">
              <Link
                href="/products"
                className="text-sm py-2 hover:text-primary transition-colors font-medium">
                All Products
              </Link>

              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="text-sm py-2 hover:text-primary transition-colors">
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="min-h-[60vh]">{children}</div>
      </div>
    </CartProvider>
  );
}
