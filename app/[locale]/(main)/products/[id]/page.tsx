"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingCart,
  Star,
  StarHalf,
  CheckCircle2,
  AlertCircle,
  Heart,
  Share2,
  Shield,
  Truck,
  RotateCcw,
  Info,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  images?: string[];
  features?: string[];
  specifications?: Record<string, string>;
  documents?: { name: string; url: string }[];
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
      "Casque de sécurité robuste avec coque en ABS, réglable et ventilé pour un confort optimal. Conçu pour protéger contre les chutes d'objets et les impacts latéraux dans les environnements industriels et de construction.",
    certifications: ["EN 397", "ANSI Z89.1"],
    colors: ["Jaune", "Blanc", "Rouge", "Bleu"],
    images: [
      "https://images.unsplash.com/photo-1578091436046-7e8f4b3e5ede?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&q=80",
    ],
    features: [
      "Coque en ABS haute résistance",
      "Système de réglage à crémaillère",
      "Bandeau anti-transpiration",
      "Fentes de ventilation",
      "Compatible avec accessoires (visière, protection auditive)",
      "Durée de vie: 5 ans",
    ],
    specifications: {
      Matériau: "ABS haute résistance",
      Poids: "380g",
      Taille: "Ajustable (53-63cm)",
      "Température d'utilisation": "-30°C à +50°C",
      "Résistance électrique": "440 VAC",
      "Résistance à la déformation": "LD",
    },
    documents: [
      { name: "Fiche technique", url: "#" },
      { name: "Déclaration de conformité", url: "#" },
      { name: "Guide d'entretien", url: "#" },
    ],
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
];

export default async function ProductDetailPage({ params }: { params: any }) {
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined
  );
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // Fetch product data
  useEffect(() => {
    // Simulate API call
    const fetchProduct = () => {
      setIsLoading(true);

      setTimeout(() => {
        const foundProduct = PRODUCTS.find((p) => p.id === params.id);

        if (foundProduct) {
          setProduct(foundProduct);

          // Set default color and size if available
          if (foundProduct.colors && foundProduct.colors.length > 0) {
            setSelectedColor(foundProduct.colors[0]);
          }

          if (foundProduct.sizes && foundProduct.sizes.length > 0) {
            setSelectedSize(foundProduct.sizes[0]);
          }

          // Find related products (same category)
          const related = PRODUCTS.filter(
            (p) => p.id !== params.id && p.category === foundProduct.category
          ).slice(0, 4);
          setRelatedProducts(related);
        }

        setIsLoading(false);
      }, 500);
    };

    fetchProduct();
  }, [params.id]);

  // Handle quantity change
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
  };

  // Add to cart function
  const addToCart = () => {
    if (!product) return;

    // Validate selection
    if (product.colors && !selectedColor) {
      toast({
        title: "Sélection requise",
        description: "Veuillez sélectionner une couleur",
        variant: "destructive",
      });
      return;
    }

    if (product.sizes && !selectedSize) {
      toast({
        title: "Sélection requise",
        description: "Veuillez sélectionner une taille",
        variant: "destructive",
      });
      return;
    }

    // Add to cart logic would go here
    toast({
      title: "Produit ajouté au panier",
      description: `${quantity} x ${product.name} ajouté à votre panier.`,
    });
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Produit non trouvé</h2>
          <p className="text-muted-foreground mb-6">
            Le produit que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Button asChild>
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux produits
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm mb-8">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground">
            Accueil
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <Link
            href="/products"
            className="text-muted-foreground hover:text-foreground">
            Produits
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <Link
            href={`/products?category=${encodeURIComponent(product.category)}`}
            className="text-muted-foreground hover:text-foreground">
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <span className="font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted mb-4">
              <Image
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                fill
                className="object-cover"
              />

              {/* Product badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <Badge className="bg-blue-500 hover:bg-blue-600">
                    Nouveau
                  </Badge>
                )}
                {!product.inStock && (
                  <Badge variant="destructive">Rupture de stock</Badge>
                )}
              </div>
            </div>

            {/* Thumbnail gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-transparent hover:border-muted-foreground/30"
                    }`}
                    onClick={() => setSelectedImage(index)}>
                    <Image
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Category and name */}
            <div className="mb-4">
              <div className="text-sm text-muted-foreground mb-2">
                {product.category} / {product.subCategory}
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">{renderStarRating(product.rating)}</div>
                <span className="text-sm text-muted-foreground">
                  ({product.rating})
                </span>
              </div>
            </div>

            {/* Price and stock */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-3xl font-bold">
                {product.price.toFixed(2)} €
              </div>
              <div>
                {product.inStock ? (
                  <span className="text-green-600 flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    En stock
                  </span>
                ) : (
                  <span className="text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Rupture de stock
                  </span>
                )}
              </div>
            </div>

            {/* Short description */}
            <p className="text-muted-foreground mb-6">{product.description}</p>

            {/* Color selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Couleur:{" "}
                  {selectedColor && (
                    <span className="font-normal">{selectedColor}</span>
                  )}
                </label>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`px-4 py-2 rounded-md border transition-all ${
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
                  Taille:{" "}
                  {selectedSize && (
                    <span className="font-normal">{selectedSize}</span>
                  )}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`min-w-[3rem] px-3 py-2 rounded-md border transition-all ${
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

            {/* Quantity and add to cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none"
                  onClick={() => handleQuantityChange(quantity - 1)}>
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

              <Button
                className="flex-1"
                size="lg"
                disabled={!product.inStock}
                onClick={addToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Ajouter au panier
              </Button>

              <Button variant="outline" size="icon" className="h-12 w-12">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Certifications */}
            {product.certifications && product.certifications.length > 0 && (
              <div className="mb-6">
                <div className="text-sm font-medium mb-2">Certifications</div>
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

            {/* Shipping info */}
            <div className="border-t border-b py-4 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-muted-foreground" />
                <span>Livraison gratuite à partir de 100€ d'achat</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RotateCcw className="h-4 w-4 text-muted-foreground" />
                <span>Retours gratuits sous 30 jours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product details tabs */}
        <div className="mb-16">
          <Tabs defaultValue="details">
            <TabsList className="mb-8">
              <TabsTrigger value="details">Détails</TabsTrigger>
              <TabsTrigger value="specifications">Spécifications</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Caractéristiques</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-muted-foreground">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </TabsContent>

            <TabsContent value="specifications">
              {product.specifications ? (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(product.specifications).map(
                        ([key, value], index) => (
                          <tr
                            key={key}
                            className={index % 2 === 0 ? "bg-muted/50" : ""}>
                            <td className="px-4 py-3 font-medium border-r">
                              {key}
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">
                              {value}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Les spécifications détaillées ne sont pas disponibles pour
                    ce produit.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="documents">
              {product.documents && product.documents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {product.documents.map((doc, index) => (
                    <a
                      key={index}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Télécharger
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Aucun document n'est disponible pour ce produit.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="overflow-hidden group">
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Product badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-2">
                      {relatedProduct.isNew && (
                        <Badge className="bg-blue-500 hover:bg-blue-600">
                          Nouveau
                        </Badge>
                      )}
                      {!relatedProduct.inStock && (
                        <Badge variant="destructive">Rupture de stock</Badge>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <Link
                      href={`/products/${relatedProduct.id}`}
                      className="hover:underline">
                      <h3 className="font-medium mb-1">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {renderStarRating(relatedProduct.rating)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">
                        {relatedProduct.price.toFixed(2)} €
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={!relatedProduct.inStock}
                        onClick={(e) => {
                          e.preventDefault();
                          // Add to cart logic
                          toast({
                            title: "Produit ajouté au panier",
                            description: `${relatedProduct.name} a été ajouté à votre panier.`,
                          });
                        }}>
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
