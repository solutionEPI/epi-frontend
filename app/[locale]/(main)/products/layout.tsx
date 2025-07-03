"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

// Types
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type CartItem = {
  product: Product;
  quantity: number;
  color?: string;
  size?: string;
};

// Cart Context
type CartContextType = {
  cart: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    color?: string,
    size?: string
  ) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Load cart from localStorage on client side
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("shopping-cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      setInitialized(true);
    } catch (error) {
      console.error("Failed to load cart:", error);
      setInitialized(true);
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (initialized) {
      localStorage.setItem("shopping-cart", JSON.stringify(cart));
    }
  }, [cart, initialized]);

  const addToCart = (
    product: Product,
    quantity: number = 1,
    color?: string,
    size?: string
  ) => {
    setCart((prevCart) => {
      // Check if product is already in cart with same options
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.color === color &&
          item.size === size
      );

      if (existingIndex !== -1) {
        // Update existing item
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += quantity;

        toast({
          title: "Produit mis à jour",
          description: `${product.name} a été mis à jour dans votre panier.`,
        });

        return updatedCart;
      } else {
        // Add new item
        toast({
          title: "Produit ajouté",
          description: `${product.name} a été ajouté à votre panier.`,
        });

        return [...prevCart, { product, quantity, color, size }];
      }
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      const removedItem = newCart[index];
      newCart.splice(index, 1);

      toast({
        title: "Produit retiré",
        description: `${removedItem.product.name} a été retiré de votre panier.`,
      });

      return newCart;
    });
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity < 1) return;

    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart[index].quantity = quantity;
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    toast({
      title: "Panier vidé",
      description: "Tous les articles ont été retirés de votre panier.",
    });
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Mini Cart Component
const MiniCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } =
    useCart();

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
                  <h2 className="font-bold text-xl">Votre panier</h2>
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
                        Votre panier est vide
                      </p>
                      <p className="text-muted-foreground mb-6">
                        Ajoutez des produits pour commencer vos achats
                      </p>
                      <Button onClick={() => setIsOpen(false)} asChild>
                        <Link href="/products">Voir nos produits</Link>
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
                              Image
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
                                {item.color && `Couleur: ${item.color}`}
                                {item.color && item.size && " | "}
                                {item.size && `Taille: ${item.size}`}
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
                                {(item.product.price * item.quantity).toFixed(
                                  2
                                )}{" "}
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
                      <span className="font-medium">Total</span>
                      <span className="font-bold">
                        {cartTotal.toFixed(2)} €
                      </span>
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full">Passer la commande</Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/products">Continuer les achats</Link>
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

  const categories = [
    "Protection de la tête",
    "Protection oculaire",
    "Protection auditive",
    "Protection respiratoire",
    "Vêtements de protection",
    "Protection des mains",
    "Protection des pieds",
    "Protection antichute",
  ];

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
              Tous les produits
            </Link>

            {categories.slice(0, 5).map((category) => (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className="text-sm hover:text-primary transition-colors">
                {category}
              </Link>
            ))}

            {/* Dropdown for more categories */}
            <div className="relative group">
              <button className="flex items-center text-sm group-hover:text-primary transition-colors">
                Plus de catégories
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
                  {categories.slice(5).map((category) => (
                    <Link
                      key={category}
                      href={`/products?category=${encodeURIComponent(
                        category
                      )}`}
                      className="block text-sm hover:text-primary transition-colors">
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
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
                Tous les produits
              </Link>

              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/products?category=${encodeURIComponent(category)}`}
                  className="block hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}>
                  {category}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <ProductsNavigation />
      <div className="min-h-[60vh]">{children}</div>
    </CartProvider>
  );
}
