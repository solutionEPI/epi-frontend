"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("ProductsPage");
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
          title: t("productUpdated"),
          description: t("productUpdatedDescription", {
            productName: product.name,
          }),
        });

        return updatedCart;
      } else {
        // Add new item
        toast({
          title: t("productAdded"),
          description: t("productAddedDescription", {
            productName: product.name,
          }),
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
        title: t("productRemoved"),
        description: t("productRemovedDescription", {
          productName: removedItem.product.name,
        }),
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
      title: t("cartCleared"),
      description: t("cartClearedDescription"),
    });
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
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