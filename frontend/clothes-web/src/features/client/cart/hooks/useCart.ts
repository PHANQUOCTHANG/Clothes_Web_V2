/**
 * Hook quản lý giỏ hàng chính
 * Quản lý toàn bộ state của giỏ hàng
 */
import { useState, useCallback } from "react";

export interface ICartItem {
  id: string | number;
  name: string;
  price: string;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

interface UseCartReturn {
  cartItems: ICartItem[];
  isEmpty: boolean;
  totalItems: number;
  addItem: (item: ICartItem) => void;
  removeItem: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  clearCart: () => void;
  getItemById: (id: string | number) => ICartItem | undefined;
}

export const useCart = (initialItems: ICartItem[] = []): UseCartReturn => {
  const [cartItems, setCartItems] = useState<ICartItem[]>(initialItems);

  const addItem = useCallback((item: ICartItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((id: string | number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback(
    (id: string | number, quantity: number) => {
      if (quantity <= 0) {
        removeItem(id);
        return;
      }
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getItemById = useCallback(
    (id: string | number) => {
      return cartItems.find((item) => item.id === id);
    },
    [cartItems]
  );

  return {
    cartItems,
    isEmpty: cartItems.length === 0,
    totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemById,
  };
};
