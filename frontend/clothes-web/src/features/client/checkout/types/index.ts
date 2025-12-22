import { ICartItem } from "@/features/cart/types";

export interface ICheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  shippingMethod: "standard" | "express";
  paymentMethod: "card" | "cod";
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface CheckoutProps {
  cartItems: ICartItem[];
  createRipple: (e: React.MouseEvent<HTMLElement>) => void;
  setCurrentView: (view: string) => void;
}

export interface SummaryProps {
  cartItems: ICartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

