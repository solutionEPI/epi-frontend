"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
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

// Product type definition
type Product = {
  id: string;
  name: string;
  category: string;
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

// Mock product data
const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Casque de sécurité Premium",
    category: "Protection de la tête",
    subCategory: "Casques",
    price: 24.99,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1578091436046-7e8f4b3e5ede?auto=format&fit=crop&q=80",
    inStock: true,
    isNew: true,
    isFeatured: true,
    description:
      "Casque de sécurité robuste avec coque en ABS, réglable et ventilé pour un confort optimal.",
    certifications: ["EN 397", "ANSI Z89.1"],
    colors: ["Jaune", "Blanc", "Rouge", "Bleu"],
  },
  {
    id: "p2",
    name: "Lunettes de protection anti-UV",
    category: "Protection oculaire",
    subCategory: "Lunettes",
    price: 12.5,
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80",
    inStock: true,
    isNew: false,
    isFeatured: false,
    description:
      "Lunettes de protection légères avec protection anti-UV et anti-rayures.",
    certifications: ["EN 166", "ANSI Z87.1"],
    colors: ["Transparent", "Teinté"],
  },
  {
    id: "p3",
    name: "Gants anti-coupure niveau 5",
    category: "Protection des mains",
    subCategory: "Gants",
    price: 18.75,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1583624729922-1db8a8a9ce56?auto=format&fit=crop&q=80",
    inStock: true,
    isNew: false,
    isFeatured: true,
    description:
      "Gants résistants aux coupures de niveau 5, avec revêtement en polyuréthane pour une excellente préhension.",
    certifications: ["EN 388", "ISO 13997"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "p4",
    name: "Chaussures de sécurité S3",
    category: "Protection des pieds",
    subCategory: "Chaussures",
    price: 89.99,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80",
    inStock: true,
    isNew: true,
    isFeatured: true,
    description:
      "Chaussures de sécurité S3 avec embout en composite et semelle anti-perforation.",
    certifications: ["EN ISO 20345", "S3 SRC"],
    sizes: ["39", "40", "41", "42", "43", "44", "45", "46"],
  },
  {
    id: "p5",
    name: "Veste haute visibilité classe 3",
    category: "Vêtements de protection",
    subCategory: "Vêtements haute visibilité",
    price: 45.5,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?auto=format&fit=crop&q=80",
    inStock: false,
    isNew: false,
    isFeatured: false,
    description:
      "Veste haute visibilité classe 3 avec bandes réfléchissantes, imperméable et respirante.",
    certifications: ["EN ISO 20471", "EN 343"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Jaune fluo", "Orange fluo"],
  },
  {
    id: "p6",
    name: "Masque respiratoire FFP3",
    category: "Protection respiratoire",
    subCategory: "Masques",
    price: 8.99,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80",
    inStock: true,
    isNew: false,
    isFeatured: true,
    description:
      "Masque respiratoire FFP3 avec valve d'expiration pour un confort optimal.",
    certifications: ["EN 149", "FFP3 NR D"],
  },
  {
    id: "p7",
    name: "Harnais de sécurité complet",
    category: "Protection antichute",
    subCategory: "Harnais",
    price: 129.99,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1618090584176-7132b9911657?auto=format&fit=crop&q=80",
    inStock: true,
    isNew: true,
    isFeatured: false,
    description:
      "Harnais de sécurité complet avec points d'ancrage dorsal et sternal.",
    certifications: ["EN 361", "ANSI Z359.11"],
    sizes: ["S/M", "L/XL"],
  },
  {
    id: "p8",
    name: "Casque antibruit 32dB",
    category: "Protection auditive",
    subCategory: "Casques antibruit",
    price: 32.5,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1590935217281-8f102120d683?auto=format&fit=crop&q=80",
    inStock: true,
    isNew: false,
    isFeatured: false,
    description:
      "Casque antibruit avec atténuation de 32dB, léger et confortable pour un port prolongé.",
    certifications: ["EN 352-1"],
    colors: ["Noir/Rouge", "Noir/Jaune"],
  },
];

// Cart item type
type CartItem = {
  product: Product;
  quantity: number;
  color?: string;
  size?: string;
};

export default function ProductsPage() {
  const t = useTranslations("ProductsPage");
  const { toast } = useToast();

  // State for products and filters
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [newOnly, setNewOnly] = useState(false);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Get unique categories
  const categories = [...new Set(PRODUCTS.map((product) => product.category))];

  // Apply filters
  useEffect(() => {
    let result = [...PRODUCTS];

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // In stock filter
    if (inStockOnly) {
      result = result.filter((product) => product.inStock);
    }

    // New only filter
    if (newOnly) {
      result = result.filter((product) => product.isNew);
    }

    // Sorting
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, sortOption, inStockOnly, newOnly]);

  // Add to cart function
  const addToCart = (
    product: Product,
    quantity: number = 1,
    color?: string,
    size?: string
  ) => {
    // Check if product is already in cart
    const existingItemIndex = cart.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.color === (color || undefined) &&
        item.size === (size || undefined)
    );

    if (existingItemIndex !== -1) {
      // Update quantity if product already in cart
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      // Add new item to cart
      setCart([...cart, { product, quantity, color, size }]);
    }

    toast({
      title: t("productAdded"),
      description: t("productAddedDescription", { productName: product.name }),
    });
  };

  // Remove from cart function
  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);

    toast({
      title: t("productRemoved"),
      description: t("productRemovedDescription"),
    });
  };

  // Update cart item quantity
  const updateCartItemQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const newCart = [...cart];
    newCart[index].quantity = newQuantity;
    setCart(newCart);
  };

  // Calculate cart total
  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

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
    <div className="min-h-screen bg-background pt-24 pb-16">
      

      <div className="container mx-auto px-4 py-8">
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
                <SelectItem value="featured">{t("featuredProducts")}</SelectItem>
                <SelectItem value="price-asc">{t("priceAscending")}</SelectItem>
                <SelectItem value="price-desc">{t("priceDescending")}</SelectItem>
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

            <Button
              variant="outline"
              className="relative"
              onClick={() => setIsCartOpen(!isCartOpen)}>
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cart.length}
                </span>
              )}
            </Button>
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

                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        type="radio"
                        id={`cat-${category}`}
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="mr-2"
                      />
                      <label htmlFor={`cat-${category}`}>{category}</label>
                    </div>
                  ))}
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

        {/* Shopping cart panel */}
        {isCartOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-card border rounded-lg p-4 mb-8 overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{t("yourCart")}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCartOpen(false)}>
                {t("close")}
              </Button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {t("cartEmpty")}
              </div>
            ) : (
              <>
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16 rounded overflow-hidden">
                          {/* Product image would go here */}
                          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                            {t("image")}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium">{item.product.name}</h4>
                          <div className="text-sm text-muted-foreground">
                            {item.color && <span>{t("color")}: {item.color} </span>}
                            {item.size && <span>{t("size")}: {item.size}</span>}
                          </div>
                          <div className="text-sm font-medium">
                            {item.product.price.toFixed(2)} €
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center border rounded">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() =>
                              updateCartItemQuantity(index, item.quantity - 1)
                            }>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() =>
                              updateCartItemQuantity(index, item.quantity + 1)
                            }>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
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
                    </div>
                  ))}
                </div>

                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">{t("total")}</span>
                    <span className="font-bold">
                      {cartTotal.toFixed(2)} €
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="w-full"
                      onClick={() =>
                        alert(t("placeOrder"))
                      }>
                      {t("placeOrder")}
                    </Button>
                    <Button variant="outline" onClick={() => setCart([])}>
                      {t("cartCleared")}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* Products count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {t("productsFound", { count: filteredProducts.length })}
          </p>
        </div>

        {/* Products grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">{t("noProductsFound")}</h3>
            <p className="text-muted-foreground">
              {t("tryModifyingFilters")}
            </p>
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
                      src={product.image}
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
                              className="h-8 w-8 rounded-full">
                              <Eye className="h-4 w-4" />
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
                        {product.category}
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
                          {product.price.toFixed(2)} €
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
    </div>
  );
}
