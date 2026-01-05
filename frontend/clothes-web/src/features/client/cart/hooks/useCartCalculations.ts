/**
 * Hook quản lý tính toán giá trong giỏ hàng
 * Tính subtotal, tax, shipping, total
 */
import { useMemo } from "react";

export interface ICartItem {
  id: string | number;
  price: string;
  quantity: number;
}

interface PricingState {
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  isFreeShipping: boolean;
  remainingForFreeShip: number;
}

interface UseCartCalculationsOptions {
  taxRate?: number;
  freeShippingThreshold?: number;
  shippingCost?: number;
}

export  interface UseCartCalculationsReturn extends PricingState {
  updatePrice: (field: keyof PricingState, value: number) => void;
}

export const useCartCalculations = (
  cartItems: ICartItem[],
  options: UseCartCalculationsOptions = {}
): PricingState => {
  const {
    taxRate = 0.05,
    freeShippingThreshold = 200,
    shippingCost = 15,
  } = options;

  return useMemo(() => {
    // Tính subtotal từ giỏ hàng
    const subtotal = cartItems.reduce((sum, item) => {
      const itemPrice = parseFloat(item.price.replace("$", "") || "0");
      return sum + itemPrice * item.quantity;
    }, 0);

    // Kiểm tra miễn phí vận chuyển
    const isFreeShipping = subtotal >= freeShippingThreshold;
    const remainingForFreeShip = Math.max(0, freeShippingThreshold - subtotal);

    // Tính shipping
    const shipping = isFreeShipping ? 0 : shippingCost;

    // Tính tax
    const tax = subtotal * taxRate;

    // Tính total
    const total = subtotal + shipping + tax;

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      shipping: Math.round(shipping * 100) / 100,
      discount: 0,
      total: Math.round(total * 100) / 100,
      isFreeShipping,
      remainingForFreeShip: Math.round(remainingForFreeShip * 100) / 100,
    };
  }, [cartItems, taxRate, freeShippingThreshold, shippingCost]);
};
