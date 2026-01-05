/**
 * Hook quản lý persistent giỏ hàng (localStorage)
 */
import { useEffect, useState, useCallback } from "react";

export interface ICartItem {
  id: string | number;
  name: string;
  price: string;
  quantity: number;
  image?: string;
  size?: string;
  color?: string;
}

interface UseCartPersistenceOptions {
  storageKey?: string;
  enableAutoSave?: boolean;
  enableAutoRestore?: boolean;
}

interface UseCartPersistenceReturn {
  isLoading: boolean;
  saveCart: (items: ICartItem[]) => void;
  loadCart: () => ICartItem[] | null;
  clearCartStorage: () => void;
  hasPersistedCart: boolean;
}

export const useCartPersistence = (
  cartItems: ICartItem[],
  options: UseCartPersistenceOptions = {}
): UseCartPersistenceReturn => {
  const {
    storageKey = "cart_items",
    enableAutoSave = true,
    enableAutoRestore = true,
  } = options;

  const [isLoading, setIsLoading] = useState(true);
  const [hasPersistedCart, setHasPersistedCart] = useState(false);

  // Save to localStorage
  const saveCart = useCallback(
    (items: ICartItem[]) => {
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          localStorage.setItem(storageKey, JSON.stringify(items));
        }
      } catch (error) {
        console.error("Failed to save cart:", error);
      }
    },
    [storageKey]
  );

  // Load from localStorage
  const loadCart = useCallback((): ICartItem[] | null => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : null;
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
    return null;
  }, [storageKey]);

  // Clear localStorage
  const clearCartStorage = useCallback(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.removeItem(storageKey);
        setHasPersistedCart(false);
      }
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  }, [storageKey]);

  // Auto-restore from localStorage on mount
  useEffect(() => {
    if (!enableAutoRestore) {
      setIsLoading(false);
      return;
    }

    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const saved = localStorage.getItem(storageKey);
        setHasPersistedCart(saved !== null);
      }
    } catch {
      setHasPersistedCart(false);
    } finally {
      setIsLoading(false);
    }
  }, [enableAutoRestore, storageKey]);

  // Auto-save to localStorage when cart changes
  useEffect(() => {
    if (!enableAutoSave || isLoading) return;

    if (cartItems.length > 0) {
      saveCart(cartItems);
    } else {
      clearCartStorage();
    }
  }, [cartItems, enableAutoSave, isLoading, saveCart, clearCartStorage]);

  return {
    isLoading,
    saveCart,
    loadCart,
    clearCartStorage,
    hasPersistedCart,
  };
};
