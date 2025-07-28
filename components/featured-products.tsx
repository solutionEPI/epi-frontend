"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { api } from "@/lib/api";
import { Product } from "@/types/product";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/utils";

export function FeaturedProducts() {
  const t = useTranslations("HomePage.products");
  const locale = useLocale();
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await api.getProducts({ featuredOnly: true }, locale);
        setProducts(data.results || data.products || []);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [locale]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-64 w-full" />
            <CardContent className="p-6">
              <Skeleton className="h-4 w-1/3 mb-2" />
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-8 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        {t("noProductsFound")}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}>
          <Card className="h-full hover-lift overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={
                  product.image ||
                  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"
                }
                alt={product.name}
                fill
                className="object-cover"
              />
              <Badge
                variant={product.in_stock ? "default" : "secondary"}
                className="absolute top-2 right-2">
                {product.in_stock ? t("inStock") : t("outOfStock")}
              </Badge>
            </div>
            <CardContent className="p-6">
              <div className="space-y-2">
                <Badge variant="outline" className="text-xs">
                  {product.category?.name || "Uncategorized"}
                </Badge>
                <h3 className="font-semibold">{product.name}</h3>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating || 0)
                          ? "text-primary fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    ({product.rating || 0})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Button className="w-full" onClick={() => addItem(product)}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {t("addToCart")}
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/products/${product.slug}`}>
                    {t("viewDetails")}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
