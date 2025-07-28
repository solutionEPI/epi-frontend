"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { api } from "@/lib/api";
import { PostListItem } from "@/types/blog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function LatestPosts() {
  const t = useTranslations("HomePage.blog");
  const locale = useLocale();
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const data = await api.getBlogPosts(locale, { page: 1 });
        // Flexible response handling
        const list =
          (data.results as PostListItem[] | undefined) ||
          (data as any).data ||
          [];
        setPosts(list.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch latest posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [locale]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardContent className="p-6">
              <Skeleton className="h-4 w-1/4 mb-2" />
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-10 w-full mb-4" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <p className="text-center text-muted-foreground">{t("noPostsFound")}</p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}>
          <Card className="h-full hover-lift overflow-hidden flex flex-col">
            <div className="relative aspect-video">
              <Image
                src={
                  post.featured_image ||
                  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop"
                }
                alt={post.title}
                fill
                className="object-cover"
                unoptimized
              />
              <Badge variant="secondary" className="absolute top-2 left-2">
                {post.categories?.[0]?.name || "Blog"}
              </Badge>
            </div>
            <CardContent className="p-6 flex-1 flex flex-col">
              <div className="space-y-3 flex-1">
                <h3 className="font-semibold line-clamp-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 mt-4 border-t">
                <div className="flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span>
                    {post.author?.first_name || post.author?.username || ""}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {new Date(post.published_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/blog/${post.slug}`}>{t("readMoreButton")}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
