"use client";

import { useMemo } from "react";
import { api } from "@/lib/api";
import { Category } from "@/types/blog";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

interface CategoryListProps {
  locale: string;
  selectedCategoryId: string | null;
  onSelectCategory: (id: number | null) => void;
}

export function CategoryList({
  locale,
  selectedCategoryId,
  onSelectCategory,
}: CategoryListProps) {
  const t = useTranslations("BlogPage");

  const {
    data: categoriesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogCategories", locale],
    queryFn: () => api.getBlogCategories(locale),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const categories = useMemo(() => {
    if (!categoriesData) return [];
    if (
      "success" in categoriesData &&
      Array.isArray((categoriesData as any).data)
    ) {
      return (categoriesData as any).data;
    }
    if (
      "results" in categoriesData &&
      Array.isArray((categoriesData as any).results)
    ) {
      return (categoriesData as any).results;
    }
    if (Array.isArray(categoriesData)) {
      return categoriesData;
    }
    return [];
  }, [categoriesData]);

  if (isLoading) {
    return <div>{t("loadingCategories")}</div>;
  }

  if (error) {
    return (
      <div className="text-destructive text-sm">
        {t("failedToLoadCategories")}
      </div>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-3">{t("categoriesTitle")}</h3>
      <div className="flex flex-wrap gap-2">
        <Badge
          onClick={() => onSelectCategory(null)}
          variant={!selectedCategoryId ? "default" : "secondary"}
          className="cursor-pointer">
          {t("allCategories")}
        </Badge>
        {categories.map((category: Category) => (
          <Badge
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            variant={
              selectedCategoryId === String(category.id)
                ? "default"
                : "secondary"
            }
            className="cursor-pointer">
            {category.name} ({category.post_count})
          </Badge>
        ))}
      </div>
    </div>
  );
}
