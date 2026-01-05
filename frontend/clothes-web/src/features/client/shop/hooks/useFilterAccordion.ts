import { useState, useCallback } from "react";

// Quản lý trạng thái mở/đóng các accordion bộ lọc
export const useFilterAccordion = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);
  const [isColorOpen, setIsColorOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const [isWishListOpen, setIsWishListOpen] = useState(true);

  // Toggle từng bộ lọc
  const toggleCategory = useCallback(() => {
    setIsCategoryOpen((prev) => !prev);
  }, []);

  const toggleSize = useCallback(() => {
    setIsSizeOpen((prev) => !prev);
  }, []);

  const toggleColor = useCallback(() => {
    setIsColorOpen((prev) => !prev);
  }, []);

  const togglePrice = useCallback(() => {
    setIsPriceOpen((prev) => !prev);
  }, []);

  const toggleBrand = useCallback(() => {
    setIsBrandOpen((prev) => !prev);
  }, []);

  const toggleWishList = useCallback(() => {
    setIsWishListOpen((prev) => !prev);
  }, []);

  // Đóng tất cả bộ lọc
  const closeAll = useCallback(() => {
    setIsCategoryOpen(false);
    setIsSizeOpen(false);
    setIsColorOpen(false);
    setIsPriceOpen(false);
    setIsBrandOpen(false);
    setIsWishListOpen(false);
  }, []);

  // Mở tất cả bộ lọc
  const openAll = useCallback(() => {
    setIsCategoryOpen(true);
    setIsSizeOpen(true);
    setIsColorOpen(true);
    setIsPriceOpen(true);
    setIsBrandOpen(true);
    setIsWishListOpen(true);
  }, []);

  return {
    isCategoryOpen,
    isSizeOpen,
    isColorOpen,
    isPriceOpen,
    isBrandOpen,
    isWishListOpen,
    toggleCategory,
    toggleSize,
    toggleColor,
    togglePrice,
    toggleBrand,
    toggleWishList,
    closeAll,
    openAll,
  };
};
