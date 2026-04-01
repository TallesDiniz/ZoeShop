import { createContext } from "react";
import { type CartItem, type Product } from "../types";

export interface CartContextType {
  cart: Record<number, CartItem>;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  changeQty: (id: number, delta: number) => void;
  cartCount: number;
  cartTotal: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);