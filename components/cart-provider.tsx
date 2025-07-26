"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

// Types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
  sku?: string;
  maxQuantity?: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
}

export interface CartContextType extends CartState {
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

// Actions
type CartAction =
  | { type: 'ADD_ITEM'; payload: { item: Omit<CartItem, 'quantity'>; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'LOAD_CART'; payload: { items: CartItem[] } };

// Initial state
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isOpen: false,
};

// Helper functions
const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return { totalItems, totalPrice };
};

const saveToLocalStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem('cart', JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

const loadFromLocalStorage = (): CartItem[] => {
  try {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    return [];
  }
};

// Reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(cartItem => cartItem.id === item.id);
      
      let newItems: CartItem[];
      
      if (existingItemIndex > -1) {
        // Item exists, update quantity
        newItems = state.items.map((cartItem, index) => {
          if (index === existingItemIndex) {
            const newQuantity = cartItem.quantity + quantity;
            const maxQuantity = cartItem.maxQuantity || 999;
            return {
              ...cartItem,
              quantity: Math.min(newQuantity, maxQuantity)
            };
          }
          return cartItem;
        });
      } else {
        // New item, add to cart
        newItems = [...state.items, { ...item, quantity }];
      }
      
      const totals = calculateTotals(newItems);
      saveToLocalStorage(newItems);
      
      return {
        ...state,
        items: newItems,
        ...totals,
      };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload.id);
      const totals = calculateTotals(newItems);
      saveToLocalStorage(newItems);
      
      return {
        ...state,
        items: newItems,
        ...totals,
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        const newItems = state.items.filter(item => item.id !== id);
        const totals = calculateTotals(newItems);
        saveToLocalStorage(newItems);
        
        return {
          ...state,
          items: newItems,
          ...totals,
        };
      }
      
      const newItems = state.items.map(item => {
        if (item.id === id) {
          const maxQuantity = item.maxQuantity || 999;
          return {
            ...item,
            quantity: Math.min(quantity, maxQuantity)
          };
        }
        return item;
      });
      
      const totals = calculateTotals(newItems);
      saveToLocalStorage(newItems);
      
      return {
        ...state,
        items: newItems,
        ...totals,
      };
    }
    
    case 'CLEAR_CART': {
      saveToLocalStorage([]);
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0,
      };
    }
    
    case 'LOAD_CART': {
      const totals = calculateTotals(action.payload.items);
      return {
        ...state,
        items: action.payload.items,
        ...totals,
      };
    }
    
    case 'OPEN_CART':
      return { ...state, isOpen: true };
      
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
      
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    
    default:
      return state;
  }
};

// Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { toast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedItems = loadFromLocalStorage();
    if (savedItems.length > 0) {
      dispatch({ type: 'LOAD_CART', payload: { items: savedItems } });
    }
  }, []);

  const addItem = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { item, quantity } });
    
    // Show toast notification
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
      duration: 2000,
    });
  };

  const removeItem = (id: string) => {
    const item = state.items.find(item => item.id === id);
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    
    if (item) {
      toast({
        title: "Removed from cart",
        description: `${item.name} has been removed from your cart.`,
        duration: 2000,
      });
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
      duration: 2000,
    });
  };

  const openCart = () => dispatch({ type: 'OPEN_CART' });
  const closeCart = () => dispatch({ type: 'CLOSE_CART' });
  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' });

  const value: CartContextType = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}