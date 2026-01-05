/**
 * Hook quản lý trạng thái UI của giỏ hàng
 */
import { useState, useCallback } from "react";

type CartView = "list" | "mini" | "modal";

interface UseCartUIReturn {
  isCartOpen: boolean;
  cartView: CartView;
  isLoading: boolean;
  error: string | null;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setCartView: (view: CartView) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useCartUI = (): UseCartUIReturn => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartView, setCartView] = useState<CartView>("mini");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const toggleCart = useCallback(() => {
    setIsCartOpen((prev) => !prev);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isCartOpen,
    cartView,
    isLoading,
    error,
    openCart,
    closeCart,
    toggleCart,
    setCartView,
    setIsLoading,
    setError,
    clearError,
  };
};
