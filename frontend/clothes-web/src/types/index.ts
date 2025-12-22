export type ViewType = "home" | "shop" | "blog" | "contact" | "cart" | "checkout" | "profile";

export interface Product {
  id: number;
  name: string;
  price: string;
  oldPrice?: string | null;
  image: string;
  hoverImage?: string;
  quantity: number;
  color?: string;
  size?: string;
  saleTag?: string | null;
  isTrending?: boolean;
}

export interface BlogPost {
  title: string;
  meta: string;
  summary: string;
  image: string;
  large: boolean;
  date: string;
  isBanner?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface ChatMessage {
  id: number;
  text: string;
  sender: "user" | "bot";
  time: string;
}