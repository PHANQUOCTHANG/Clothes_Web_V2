import { useState, useCallback } from "react";
import { FilterState } from "@/features/client/shop/types";
import { MIN_PRICE, MAX_PRICE } from "@/features/client/shop/constants";

// Quản lý trạng thái bộ lọc (size, color, price, category)
export const useFilters = () => {
  const [filters, setFilters] = useState<FilterState>({
    size: [],
    price: { min: MIN_PRICE, max: MAX_PRICE },
    color: [],
    category: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  // Thêm/xóa bộ lọc hoặc cập nhật giá
  const handleFilterChange = useCallback((type: string, value: unknown) => {
    setIsLoading(true);

    setTimeout(() => {
      setFilters((prev) => {
        if (type === "price") {
          if (value === "reset") {
            return {
              ...prev,
              price: { min: MIN_PRICE, max: MAX_PRICE },
            };
          }
          return { ...prev, price: value as { min: number; max: number } };
        }

        const isSelected = (
          prev[type as keyof FilterState] as unknown[]
        ).includes(value as never);

        return {
          ...prev,
          [type]: isSelected
            ? (prev[type as keyof FilterState] as unknown[]).filter(
                (item) => item !== value
              )
            : [...(prev[type as keyof FilterState] as unknown[]), value],
        };
      });
      setIsLoading(false);
    }, 500);
  }, []);

  // Xóa tất cả bộ lọc về giá trị mặc định
  const handleClearAll = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setFilters({
        size: [],
        price: { min: MIN_PRICE, max: MAX_PRICE },
        color: [],
        category: [],
      });
      setIsLoading(false);
    }, 500);
  }, []);

  // Xóa một bộ lọc cụ thể
  const removeFilter = useCallback(
    (type: string, value: unknown) => {
      handleFilterChange(type, value);
    },
    [handleFilterChange]
  );

  // Kiểm tra có bộ lọc nào đang hoạt động không
  const hasActiveFilters = useCallback(() => {
    return (
      filters.size.length > 0 ||
      filters.color.length > 0 ||
      filters.category.length > 0 ||
      filters.price.min !== MIN_PRICE ||
      filters.price.max !== MAX_PRICE
    );
  }, [filters]);

  return {
    filters,
    isLoading,
    handleFilterChange,
    handleClearAll,
    removeFilter,
    hasActiveFilters,
  };
};
