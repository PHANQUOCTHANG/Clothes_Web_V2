/**
 * Hook tùy chỉnh cho quản lý bộ lọc sản phẩm
 */

import { useState, useCallback } from "react";
import { ExpandedSections, ActiveFilter } from "../types";

interface UseProductFiltersReturn {
  priceRange: [number, number];
  selectedBrands: string[];
  selectedCategory: string | null;
  selectedDiscount: string | null;
  selectedRating: number | null;
  searchBrand: string;
  searchProduct: string;
  expandedSections: ExpandedSections;

  setPriceRange: (range: [number, number]) => void;
  setSelectedBrands: (brands: string[]) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedDiscount: (discount: string | null) => void;
  setSelectedRating: (rating: number | null) => void;
  setSearchBrand: (search: string) => void;
  setSearchProduct: (search: string) => void;
  toggleBrand: (brand: string) => void;
  toggleSection: (section: keyof ExpandedSections) => void;
  removeFilter: (value: string, type: string) => void;
  clearAllFilters: () => void;
  getActiveFilters: () => ActiveFilter[];
}

/**
 * Hook quản lý trạng thái bộ lọc sản phẩm
 */
export const useProductFilters = (): UseProductFiltersReturn => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([
    "Boat",
    "JBL",
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDiscount, setSelectedDiscount] = useState<string | null>(
    "20% hoặc hơn"
  );
  const [selectedRating, setSelectedRating] = useState<number | null>(4);
  const [searchBrand, setSearchBrand] = useState<string>("");
  const [searchProduct, setSearchProduct] = useState<string>("");
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    brands: true,
    discount: false,
    rating: false,
  });

  // Thêm/xóa thương hiệu từ bộ lọc
  const toggleBrand = useCallback((brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  }, []);

  // Bật/tắt các phần mở rộng bộ lọc
  const toggleSection = useCallback((section: keyof ExpandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }, []);

  // Xóa từng bộ lọc
  const removeFilter = useCallback((value: string, type: string) => {
    switch (type) {
      case "brand":
        setSelectedBrands((prev) =>
          prev.filter((b) => b.toLowerCase() !== value)
        );
        break;
      case "discount":
        setSelectedDiscount(null);
        break;
      case "rating":
        setSelectedRating(null);
        break;
      case "category":
        setSelectedCategory(null);
        break;
    }
  }, []);

  // Xóa tất cả các bộ lọc
  const clearAllFilters = useCallback(() => {
    setSelectedBrands([]);
    setSelectedDiscount(null);
    setSelectedRating(null);
    setSelectedCategory(null);
  }, []);

  // Lấy danh sách bộ lọc hiện hoạt
  const getActiveFilters = useCallback((): ActiveFilter[] => {
    const filters: ActiveFilter[] = [];

    if (selectedCategory) {
      filters.push({
        label: selectedCategory,
        value: selectedCategory.toLowerCase(),
        type: "category",
      });
    }

    selectedBrands.forEach((brand) => {
      filters.push({
        label: brand,
        value: brand.toLowerCase(),
        type: "brand",
      });
    });

    if (selectedDiscount) {
      filters.push({
        label: selectedDiscount,
        value: "20-more",
        type: "discount",
      });
    }

    if (selectedRating) {
      filters.push({
        label: `${selectedRating} sao trở lên`,
        value: "4-star",
        type: "rating",
      });
    }

    return filters;
  }, [selectedBrands, selectedCategory, selectedDiscount, selectedRating]);

  return {
    priceRange,
    selectedBrands,
    selectedCategory,
    selectedDiscount,
    selectedRating,
    searchBrand,
    searchProduct,
    expandedSections,
    setPriceRange,
    setSelectedBrands,
    setSelectedCategory,
    setSelectedDiscount,
    setSelectedRating,
    setSearchBrand,
    setSearchProduct,
    toggleBrand,
    toggleSection,
    removeFilter,
    clearAllFilters,
    getActiveFilters,
  };
};
