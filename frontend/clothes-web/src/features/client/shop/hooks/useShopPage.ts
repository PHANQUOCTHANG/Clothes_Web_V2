// useShopPage - Compose Hook
// - Kết hợp tất cả hooks của shop
// - Xử lý data: filter, sort, pagination
// - Sync URL + state
// - Trả về data sạch cho page

import { useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { IProduct } from "@/types/product";
import { FilterState } from "@/features/client/shop/types";
import { useShopProducts } from "./useShopProducts";
import {
  useFilters,
  useModal,
  useViewMode,
  type ViewMode,
  useSorting,
  useFilterAccordion,
} from "./index";
import { usePagination } from "@/hooks/usePagination";
import { processProducts } from "../services/productService";
import { fromQueryString } from "../services/filterService";
import { PRODUCTS_PER_PAGE, MIN_PRICE, MAX_PRICE } from "../constants";

export interface UseShopPageReturn {
  // Dữ liệu sản phẩm
  products: IProduct[];
  displayedProducts: IProduct[];
  isLoading: boolean;
  error: Error | null;

  // Bộ lọc
  filters: FilterState;
  handleFilterChange: (type: string, value: unknown) => void;
  handleClearFilters: () => void;
  activeFilters: unknown;

  // Sắp xếp
  currentSort: string;
  sortDirection: "asc" | "desc";
  handleSortChange: (sort: string) => void;
  toggleSortDirection: () => void;

  // Phân trang
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  currentItemsStart: number;
  currentItemsEnd: number;

  // UI & Modal
  viewMode: ViewMode;
  changeViewMode: (mode: ViewMode) => void;
  gridColsClass: string;
  openAddToCartModal: (product: IProduct) => void;
  closeAddToCartModal: () => void;
  isAddToCartModalOpen: boolean;
  selectedProduct: IProduct | null;
  openQuickViewModal: (product: IProduct) => void;
  closeQuickViewModal: () => void;
  isQuickViewOpen: boolean;
  selectedProductForQuickView: IProduct | null;

  // Accordion filters
  filterAccordion: {
    isCategoryOpen: boolean;
    isSizeOpen: boolean;
    isColorOpen: boolean;
    isPriceOpen: boolean;
    isWishListOpen: boolean;
    toggleCategory: () => void;
    toggleSize: () => void;
    toggleColor: () => void;
    togglePrice: () => void;
    toggleWishList: () => void;
  };
}

// Main compose hook
export const useShopPage = (): UseShopPageReturn => {
  const searchParams = useSearchParams();

  // 1. Fetch sản phẩm
  const { products, isLoading, error } = useShopProducts();

  // 2. UI & Filter state
  const { filters, handleFilterChange, handleClearAll } = useFilters();
  const { activeView, changeView, getGridColsClass } = useViewMode(4);
  const { currentSort, sortDirection, handleSortChange, toggleSortDirection } =
    useSorting();
  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    currentItemsStart,
    currentItemsEnd,
    goToPage,
  } = usePagination(products.length, PRODUCTS_PER_PAGE);
  const {
    isAddToCartModalOpen,
    selectedProduct,
    openAddToCartModal,
    closeAddToCartModal,
    isQuickViewOpen,
    selectedProductForQuickView,
    openQuickViewModal,
    closeQuickViewModal,
  } = useModal();
  const {
    isCategoryOpen,
    isSizeOpen,
    isColorOpen,
    isPriceOpen,
    isWishListOpen,
    toggleCategory,
    toggleSize,
    toggleColor,
    togglePrice,
    toggleWishList,
  } = useFilterAccordion();

  // 3. Xử lý dữ liệu: filter + sort
  const processedProducts = useMemo(
    () => processProducts(products, filters, currentSort, sortDirection),
    [products, filters, currentSort, sortDirection]
  );

  // 4. Sản phẩm hiển thị theo trang
  const displayedProducts = useMemo(
    () => processedProducts.slice(startIndex, endIndex),
    [processedProducts, startIndex, endIndex]
  );

  // 5. Sync filter + sort + page vào URL
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.category.length > 0)
      params.append("category", filters.category.join(","));
    if (filters.size.length > 0) params.append("size", filters.size.join(","));
    if (filters.color.length > 0)
      params.append("color", filters.color.join(","));
    if (filters.price.min !== MIN_PRICE)
      params.append("minPrice", String(filters.price.min));
    if (filters.price.max !== MAX_PRICE)
      params.append("maxPrice", String(filters.price.max));
    if (currentSort !== "position") params.append("sort", currentSort);
    if (sortDirection !== "asc") params.append("direction", sortDirection);
    if (currentPage > 1) params.append("page", String(currentPage));

    const queryString = params.toString();
    const newUrl = queryString ? `/shop?${queryString}` : "/shop";
    window.history.replaceState(null, "", newUrl);
  }, [filters, currentSort, sortDirection, currentPage]);

  // 6. Restore filter từ URL khi load
  useEffect(() => {
    const queryString = searchParams.toString();
    if (!queryString) return;

    const urlFilters = fromQueryString(queryString, MIN_PRICE, MAX_PRICE);
    if (urlFilters.category.length > 0) {
      urlFilters.category.forEach((cat) => handleFilterChange("category", cat));
    }
    if (urlFilters.size.length > 0) {
      urlFilters.size.forEach((size) => handleFilterChange("size", size));
    }
    if (urlFilters.color.length > 0) {
      urlFilters.color.forEach((color) => handleFilterChange("color", color));
    }
    if (
      urlFilters.price.min !== MIN_PRICE ||
      urlFilters.price.max !== MAX_PRICE
    ) {
      handleFilterChange("price", urlFilters.price);
    }

    const urlSort = searchParams.get("sort");
    if (urlSort) handleSortChange(urlSort);

    const urlPage = searchParams.get("page");
    if (urlPage) goToPage(parseInt(urlPage));
  }, [searchParams, handleFilterChange, handleSortChange, goToPage]);

  return {
    products: processedProducts,
    displayedProducts,
    isLoading,
    error: error as Error | null,

    filters,
    handleFilterChange,
    handleClearFilters: handleClearAll,
    activeFilters: {
      category: filters.category,
      size: filters.size,
      color: filters.color,
      price: filters.price,
    },

    currentSort,
    sortDirection,
    handleSortChange,
    toggleSortDirection,

    currentPage,
    totalPages,
    goToPage,
    currentItemsStart,
    currentItemsEnd,

    viewMode: activeView,
    changeViewMode: changeView,
    gridColsClass: getGridColsClass(),
    openAddToCartModal,
    closeAddToCartModal,
    isAddToCartModalOpen,
    selectedProduct,
    openQuickViewModal,
    closeQuickViewModal,
    isQuickViewOpen,
    selectedProductForQuickView,

    filterAccordion: {
      isCategoryOpen,
      isSizeOpen,
      isColorOpen,
      isPriceOpen,
      isWishListOpen,
      toggleCategory,
      toggleSize,
      toggleColor,
      togglePrice,
      toggleWishList,
    },
  };
};
