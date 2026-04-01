export interface Product {
  id: number;
  name: string;
  category: string;
  desc: string;
  price: number;
  emoji: string;
  badge?: string | null;
}

export interface CartItem extends Product {
  qty: number;
}

export type Page = "home" | "cart";