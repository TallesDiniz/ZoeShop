export interface Product {
  id: number;
  title: string;
  desc: string;
  price: number;
  cover: string;
}

export interface CartItem extends Product {
  qty: number;
}

export type Page = "home" | "cart";