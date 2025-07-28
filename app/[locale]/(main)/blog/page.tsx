"use client";

import { api } from "@/lib/api";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect, useMemo } from "react";
import { PostListItem } from "@/types/blog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { CategoryList } from "@/components/blog/CategoryList";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";

export default function BlogPage() {
  const locale = useLocale();
  const t = useTranslations("BlogPage");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const selectedCategoryId = searchParams.get("categoryId");

  const {
    data: postsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogPosts", locale, debouncedSearchTerm, selectedCategoryId],
    queryFn: () => {
      if (selectedCategoryId) {
        return api.getPostsByCategory(locale, selectedCategoryId);
      }
      return api.getBlogPosts(locale, { search: debouncedSearchTerm });
    },
    placeholderData: (prevData) => prevData,
  });

  const posts = useMemo(() => {
    if (!postsData) return [];
    if ("success" in postsData && Array.isArray((postsData as any).data)) {
      return (postsData as any).data;
    }
    if ("results" in postsData && Array.isArray((postsData as any).results)) {
      return (postsData as any).results;
    }
    if (Array.isArray(postsData)) {
      return postsData;
    }
    return [];
  }, [postsData]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearchTerm) {
      params.set("search", debouncedSearchTerm);
    } else {
      params.delete("search");
    }
    if (params.toString() !== searchParams.toString()) {
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [debouncedSearchTerm, pathname, router, searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    params.delete("categoryId");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSelectCategory = (categoryId: number | null) => {
    const params = new URLSearchParams();
    if (categoryId) {
      params.set("categoryId", String(categoryId));
    }
    setSearchTerm("");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      <h1 className="text-4xl font-bold mb-8">{t("title")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-8">
            <Input
              type="search"
              placeholder={t("searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            <Button type="submit" variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </form>
          <CategoryList
            locale={locale}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={handleSelectCategory}
          />
        </aside>
        <main className="md:col-span-3">
          {isLoading ? (
            <p>{t("loading")}</p>
          ) : error ? (
            <p className="text-destructive">
              {t("errorLoadingPosts", { error: (error as Error).message })}
            </p>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {posts.map((post: PostListItem) => (
                <div
                  key={post.id}
                  className="border rounded-lg overflow-hidden">
                  {post.featured_image && (
                    <Image
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                      width={500}
                      height={300}
                    />
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">
                      <a href={`/blog/${post.id}`}>{post.title}</a>
                    </h2>
                    <p className="text-muted-foreground mb-4 text-sm">
                      {post.excerpt}
                    </p>
                    <div className="text-sm text-muted-foreground">
                      <span>
                        {post.author.first_name} {post.author.last_name}
                      </span>
                      <span className="mx-2">&bull;</span>
                      <span>
                        {new Date(post.published_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>{t("noResults")}</p>
          )}
        </main>
      </div>
    </div>
  );
}
