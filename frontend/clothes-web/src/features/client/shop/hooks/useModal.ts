import { useState, useCallback } from "react";
import { Product } from "@/features/client/shop/types";

// Quản lý trạng thái AddToCart và QuickView modal
export const useModal = () => {
  // AddToCart Modal
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // QuickView Modal
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProductForQuickView, setSelectedProductForQuickView] =
    useState<Product | null>(null);

  // Mở/đóng AddToCart modal
  const openAddToCartModal = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsAddToCartModalOpen(true);
  }, []);

  const closeAddToCartModal = useCallback(() => {
    setIsAddToCartModalOpen(false);
    setSelectedProduct(null);
  }, []);

  // Mở/đóng QuickView modal
  const openQuickViewModal = useCallback((product: Product) => {
    setSelectedProductForQuickView(product);
    setIsQuickViewOpen(true);
  }, []);

  const closeQuickViewModal = useCallback(() => {
    setIsQuickViewOpen(false);
    setSelectedProductForQuickView(null);
  }, []);

  // Đóng tất cả modal
  const closeAllModals = useCallback(() => {
    closeAddToCartModal();
    closeQuickViewModal();
  }, [closeAddToCartModal, closeQuickViewModal]);

  return {
    // AddToCart Modal
    isAddToCartModalOpen,
    selectedProduct,
    openAddToCartModal,
    closeAddToCartModal,

    // QuickView Modal
    isQuickViewOpen,
    selectedProductForQuickView,
    openQuickViewModal,
    closeQuickViewModal,

    // Utilities
    closeAllModals,
  };
};
