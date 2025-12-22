import { ICartItem } from "@/features/cart/types";

export const SAMPLE_CART_ITEMS: ICartItem[] = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: "$29.99",
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400",
    color: "White",
    size: "M",
  },
  {
    id: 2,
    name: "Blue Denim Jeans",
    price: "$79.99",
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=400",
    color: "Blue",
    size: "32",
  },
  {
    id: 3,
    name: "Black Casual Jacket",
    price: "$129.99",
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16ebc5?q=80&w=400",
    color: "Black",
    size: "L",
  },
  {
    id: 4,
    name: "Red Summer Dress",
    price: "$89.99",
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1612336307429-8a88e8d08dbb?q=80&w=400",
    color: "Red",
    size: "S",
  },
];
