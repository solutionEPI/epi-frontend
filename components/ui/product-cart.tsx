"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Star,
  StarHalf,
  CheckCircle2,
  AlertCircle,
  Heart,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

// Product type
export type Product = {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  price: number;
  rating: number;
  image: string;
  inStock: boolean;
  isNew: boolean;
  isFeatured?: boolean;
  description: string;
  certifications?: string[];
  colors?: string[];
  sizes?: string[];
};

type ProductCartProps = {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  delay?: number;
};

export const ProductCart = ({
  product,
  onAddToCart,
  onQuickView,
  onAddToWishlist,
  delay = 0,
}: ProductCartProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations("ProductCart");

  // Render star rating
  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className="w-4 h-4 fill-amber-400 text-amber-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half-star"
          className="w-4 h-4 fill-amber-400 text-amber-400"
        />
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-star-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay * 0.1 }}
    >
      <Card 
        className="h-full flex flex-col overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-64 overflow-hidden bg-muted">
          <Image
            src={product.image || "/placeholder-product.jpg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />

          {/* Product badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-blue-500 hover:bg-blue-600">
                {t("new")}
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="destructive">{t("outOfStock")}</Badge>
            )}
          </div>

          {/* Quick actions */}
          <div 
            className={`absolute top-2 right-2 flex flex-col gap-2 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="h-8 w-8 rounded-full"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onAddToWishlist?.(product);
                    }}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("addToWishlist")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="h-8 w-8 rounded-full"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onQuickView?.(product);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("quickView")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Add to cart overlay on hover */}
          <div 
            className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button 
              className="bg-white text-black hover:bg-white/90"
              disabled={!product.inStock}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddToCart?.(product);
              }}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.inStock ? t("addToCart") : t("unavailable")}
            </Button>
          </div>
        </div>

        <Link href={`/products/${product.id}`}>
          <CardContent className="flex-grow flex flex-col p-4">
            <div className="mb-1">
              <span className="text-xs text-muted-foreground">{product.category}</span>
            </div>

            <h3 className="font-medium mb-2 hover:text-primary transition-colors">
              {product.name}
            </h3>

            <div className="flex items-center mb-3">
              <div className="flex mr-2">
                {renderStarRating(product.rating)}
              </div>
              <span className="text-xs text-muted-foreground">({product.rating})</span>
            </div>

            <div className="mt-auto">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-lg">{Number(product.price).toFixed(2)} €</span>
                <div className="text-xs flex items-center">
                  {product.inStock ? (
                    <span className="text-green-600 flex items-center">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      {t("inStock")}
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {t("rupture")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
}; 