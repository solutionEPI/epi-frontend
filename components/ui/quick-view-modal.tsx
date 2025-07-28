"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  X,
  Star,
  StarHalf,
  CheckCircle2,
  AlertCircle,
  Shield,
  Plus,
  Minus,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useTranslations } from "next-intl";

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
  images?: string[];
};

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    quantity: number,
    color?: string,
    size?: string
  ) => void;
}

export function QuickViewModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: QuickViewModalProps) {
  const t = useTranslations("QuickViewModal");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined
  );

  // Handle quantity change
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
  };

  // Add to cart and close
  const handleAddToCart = () => {
    if (!product) return;
    onAddToCart(product, quantity, selectedColor, selectedSize);
    onClose();
  };

  // Reset state when modal opens/closes or product changes
  React.useEffect(() => {
    if (isOpen && product) {
      setQuantity(1);
      setSelectedColor(product.colors?.[0]);
      setSelectedSize(product.sizes?.[0]);
    }
  }, [isOpen, product]);

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

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex items-center justify-between">
          <DialogTitle className="text-2xl font-bold">
            {t("quickView")}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">{t("close")}</span>
          </Button>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
            <Image
              src={product.image || "/placeholder-product.jpg"}
              alt={product.name}
              fill
              className="object-cover"
              unoptimized
            />

            {/* Product badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <Badge className="bg-blue-500 hover:bg-blue-600">
                  {t("new")}
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="destructive">{t("outOfStock")}</Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-1">
              <span className="text-sm text-muted-foreground">
                {product.category}
              </span>
            </div>

            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">{renderStarRating(product.rating)}</div>
              <span className="text-sm text-muted-foreground">
                ({product.rating})
              </span>
            </div>

            <div className="text-2xl font-bold mb-4">
              {Number(product.price).toFixed(2)} €
            </div>

            <div className="mb-4 line-clamp-3 text-muted-foreground">
              {product.description}
            </div>

            <div className="mb-4">
              {product.inStock ? (
                <span className="text-green-600 flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  {t("inStock")}
                </span>
              ) : (
                <span className="text-red-500 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {t("rupture")}
                </span>
              )}
            </div>

            {/* Color selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {t("color")}:{" "}
                  {selectedColor && (
                    <span className="font-normal">{selectedColor}</span>
                  )}
                </label>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`px-3 py-1 text-sm rounded-md border transition-all ${
                        selectedColor === color
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedColor(color)}>
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  {t("size")}:{" "}
                  {selectedSize && (
                    <span className="font-normal">{selectedSize}</span>
                  )}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`min-w-[3rem] px-2 py-1 text-sm rounded-md border transition-all ${
                        selectedSize === size
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedSize(size)}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {product.certifications && product.certifications.length > 0 && (
              <div className="mb-6">
                <div className="text-sm font-medium mb-2">
                  {t("certifications")}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert) => (
                    <Badge
                      key={cert}
                      variant="outline"
                      className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and add to cart */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none"
                  onClick={() => handleQuantityChange(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex gap-2 w-full">
                <Button
                  className="flex-1"
                  size="lg"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {t("addToCart")}
                </Button>

                <Button variant="outline" size="lg" asChild>
                  <Link href={`/products/${product.id}`}>
                    {t("viewDetails")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
