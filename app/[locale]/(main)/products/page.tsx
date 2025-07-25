"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Filter,
  ShoppingCart,
  ChevronDown,
  Star,
  StarHalf,
  CheckCircle2,
  AlertCircle,
  Heart,
  Eye,
  Plus,
  Minus,
  Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { useCart } from "./layout";
import { AnimatePresence } from "framer-motion";

// Product type definition
type ProductCategory = {
  id: number;
  name: string;
  slug: string;
};

type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  subCategory: string;
  price: number;
  rating: number;
  image: string;
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
  description: string;
  certifications: string[];
  colors?: string[];
  sizes?: string[];
};

// Mini Cart Component
const MiniCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } =
    useCart();
  const t = useTranslations("ProductsPage");

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}>
        <ShoppingCart className="h-5 w-5" />
        {cartCount > 0 && (
          <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 min-w-[18px] text-xs">
            {cartCount}
          </Badge>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, x: 300, y: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 300, y: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-background z-50 shadow-xl">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="font-bold text-xl">{t("yourCart")}</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="M18 6L6 18"></path>
                      <path d="M6 6l12 12"></path>
                    </svg>
                  </Button>
                </div>

                <div className="flex-grow overflow-y-auto p-4">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                      <p className="text-xl font-medium mb-2">
                        {t("cartEmpty")}
                      </p>
                      <p className="text-muted-foreground mb-6">
                        {t("addProductsToStartShopping")}
                      </p>
                      <Button onClick={() => setIsOpen(false)} asChild>
                        <Link href="/products">{t("viewOurProducts")}</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item, index) => (
                        <div
                          key={`${item.product.id}-${item.color}-${item.size}`}
                          className="flex gap-4 border-b pb-4">
                          <div className="w-20 h-20 bg-muted rounded relative overflow-hidden">
                            {/* Product image would go here */}
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                              {t("image")}
                            </div>
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <h4 className="font-medium">
                                {item.product.name}
                              </h4>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => removeFromCart(index)}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round">
                                  <path d="M18 6L6 18"></path>
                                  <path d="M6 6l12 12"></path>
                                </svg>
                              </Button>
                            </div>
                            {(item.color || item.size) && (
                              <div className="text-sm text-muted-foreground">
                                {item.color && `${t("color")}: ${item.color}`}
                                {item.color && item.size && " | "}
                                {item.size && `${t("size")}: ${item.size}`}
                              </div>
                            )}
                            <div className="flex justify-between items-center mt-2">
                              <div className="flex items-center border rounded">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-none"
                                  onClick={() =>
                                    updateQuantity(index, item.quantity - 1)
                                  }
                                  disabled={item.quantity <= 1}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path d="M5 12h14"></path>
                                  </svg>
                                </Button>
                                <span className="w-8 text-center">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-none"
                                  onClick={() =>
                                    updateQuantity(index, item.quantity + 1)
                                  }>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path d="M12 5v14"></path>
                                    <path d="M5 12h14"></path>
                                  </svg>
                                </Button>
                              </div>
                              <div className="font-bold">
                                {(
                                  Number(item.product.price) * item.quantity
                                ).toFixed(2)}{" "}
                                €
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="border-t p-4">
                    <div className="flex justify-between mb-4">
                      <span className="font-medium">{t("total")}</span>
                      <span className="font-bold">
                        {cartTotal.toFixed(2)} €
                      </span>
                    </div>
                    <div className="space-y-2">
                      <Button
                        className="w-full"
                        onClick={() => alert(t("placeOrder"))}>
                        {t("placeOrder")}
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/products">{t("continueShopping")}</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// Products Navigation Component
const ProductsNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("ProductsPage");
  const locale = useLocale();
  const [categories, setCategories] = useState<
    (string | { name?: string; title?: string })[]
  >([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.getProductCategories(locale);
        setCategories(data.results || data.categories || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, [locale]);

  return (
    <div className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <Link
              href="/products"
              className="font-medium hover:text-primary transition-colors">
              {t("allProducts")}
            </Link>

            {categories.slice(0, 5).map((category) => {
              const categoryName =
                typeof category === "string"
                  ? category
                  : category.name || category.title || "Category";
              return (
                <Link
                  key={categoryName}
                  href={`/products?category=${encodeURIComponent(
                    categoryName
                  )}`}
                  className="text-sm hover:text-primary transition-colors">
                  {categoryName}
                </Link>
              );
            })}

            {/* Dropdown for more categories */}
            {categories.length > 5 && (
              <div className="relative group">
                <button className="flex items-center text-sm group-hover:text-primary transition-colors">
                  {t("moreCategories")}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-60 bg-background rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="p-4 space-y-2">
                    {categories.slice(5).map((category) => {
                      const categoryName =
                        typeof category === "string"
                          ? category
                          : category.name || category.title || "Category";
                      return (
                        <Link
                          key={categoryName}
                          href={`/products?category=${encodeURIComponent(
                            categoryName
                          )}`}
                          className="block text-sm hover:text-primary transition-colors">
                          {categoryName}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <MiniCart />
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t overflow-hidden">
            <div className="p-4 space-y-2">
              <Link
                href="/products"
                className="block font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}>
                {t("allProducts")}
              </Link>

              {categories.map((category) => {
                const categoryName =
                  typeof category === "string"
                    ? category
                    : category.name || category.title || "Category";
                return (
                  <Link
                    key={categoryName}
                    href={`/products?category=${encodeURIComponent(
                      categoryName
                    )}`}
                    className="block hover:text-primary transition-colors py-2"
                    onClick={() => setIsOpen(false)}>
                    {categoryName}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ProductsPage() {
  const t = useTranslations("ProductsPage");
  const locale = useLocale();
  const { toast } = useToast();
  const { addToCart } = useCart();

  // State for products and filters
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [newOnly, setNewOnly] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Construct parameters based on filters
        const params: any = {};
        if (searchQuery) params.search = searchQuery;
        if (selectedCategory) params.category = selectedCategory;
        if (inStockOnly) params.inStock = true;
        if (newOnly) params.newOnly = true;
        params.sort = sortOption;

        const data = await api.getProducts(params, locale);
        setProducts(data.results || data.products || []);
        setFilteredProducts(data.results || data.products || []);
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          variant: "destructive",
          title: t("errorFetchingProducts"),
          description: t("pleaseTryAgainLater"),
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [
    searchQuery,
    selectedCategory,
    sortOption,
    inStockOnly,
    newOnly,
    locale,
    t,
    toast,
  ]);

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
    <>
      <div className="container mx-auto px-4 py-8 pt-32 pb-16">
        {/* Search and filter bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("searchProduct")}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("sortBy")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">
                  {t("featuredProducts")}
                </SelectItem>
                <SelectItem value="price-asc">{t("priceAscending")}</SelectItem>
                <SelectItem value="price-desc">
                  {t("priceDescending")}
                </SelectItem>
                <SelectItem value="name-asc">{t("nameAscending")}</SelectItem>
                <SelectItem value="rating">{t("topRated")}</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              {t("filters")}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </Button>

            <MiniCart />
          </div>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-card border rounded-lg p-4 mb-8 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium mb-3">{t("categories")}</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cat-all"
                      name="category"
                      checked={selectedCategory === null}
                      onChange={() => setSelectedCategory(null)}
                      className="mr-2"
                    />
                    <label htmlFor="cat-all">{t("allCategories")}</label>
                  </div>

                  {categories.map((category) => {
                    const catName =
                      typeof category === "string"
                        ? category
                        : category.name ||
                          category.slug ||
                          category.id ||
                          "Category";
                    return (
                      <div key={catName} className="flex items-center">
                        <input
                          type="radio"
                          id={`cat-${catName}`}
                          name="category"
                          checked={selectedCategory === catName}
                          onChange={() => setSelectedCategory(catName)}
                          className="mr-2"
                        />
                        <label htmlFor={`cat-${catName}`}>{catName}</label>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">{t("availability")}</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="in-stock"
                      checked={inStockOnly}
                      onChange={() => setInStockOnly(!inStockOnly)}
                      className="mr-2"
                    />
                    <label htmlFor="in-stock">{t("inStockOnly")}</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="new-only"
                      checked={newOnly}
                      onChange={() => setNewOnly(!newOnly)}
                      className="mr-2"
                    />
                    <label htmlFor="new-only">{t("newOnly")}</label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                    setSortOption("featured");
                    setInStockOnly(false);
                    setNewOnly(false);
                  }}>
                  {t("resetFilters")}
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Products count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {t("productsFound", { count: filteredProducts.length })}
          </p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Products grid */}
        {!isLoading && filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">{t("noProductsFound")}</h3>
            <p className="text-muted-foreground">{t("tryModifyingFilters")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}>
                <Card className="h-full flex flex-col overflow-hidden group">
                  <div className="relative h-64 overflow-hidden bg-muted">
                    <Image
                      src={product.image || "/placeholder-product.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
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
                    <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="secondary"
                              className="h-8 w-8 rounded-full">
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
                              asChild>
                              <Link href={`/products/${product.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t("quickView")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  <CardContent className="flex-grow flex flex-col p-4">
                    <div className="mb-1">
                      <span className="text-xs text-muted-foreground">
                        {product.category.name}
                      </span>
                    </div>

                    <Link
                      href={`/products/${product.id}`}
                      className="hover:underline">
                      <h3 className="font-medium mb-2">{product.name}</h3>
                    </Link>

                    <div className="flex items-center mb-3">
                      <div className="flex mr-2">
                        {renderStarRating(product.rating)}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({product.rating})
                      </span>
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-lg">
                          {Number(product.price).toFixed(2)} €
                        </span>
                        <div className="text-xs flex items-center">
                          {product.inStock ? (
                            <span className="text-green-600 flex items-center">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              {t("inStock")}
                            </span>
                          ) : (
                            <span className="text-red-500">
                              {t("outOfStock")}
                            </span>
                          )}
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        disabled={!product.inStock}
                        onClick={() => addToCart(product)}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {t("addToCart")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
