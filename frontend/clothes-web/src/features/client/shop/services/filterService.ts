import { FilterState } from "@/features/client/shop/types";

// Kiểm tra có bộ lọc nào đang hoạt động hay không
export const hasActiveFilters = (
  filters: FilterState,
  minPrice: number,
  maxPrice: number
): boolean => {
  return (
    filters.size.length > 0 ||
    filters.color.length > 0 ||
    filters.price.min !== minPrice ||
    filters.price.max !== maxPrice
  );
};

// Đếm tổng số bộ lọc đang hoạt động
export const getActiveFilterCount = (filters: FilterState): number => {
  return (
    filters.size.length +
    filters.color.length +
    (filters.price.min || filters.price.max ? 1 : 0)
  );
};

// Format giá trị bộ lọc để hiển thị trên UI
export const formatFilterValue = (
  filterType: string,
  value: unknown
): string => {
  if (filterType === "price") {
    const { min, max } = value as { min: number; max: number };
    return `${min.toLocaleString()} - ${max.toLocaleString()}`;
  }
  return String(value);
};

// Chuyển đổi bộ lọc sang query string để lưu URL
export const toQueryString = (filters: FilterState): string => {
  const params = new URLSearchParams();

  if (filters.size.length > 0) params.append("sizes", filters.size.join(","));
  if (filters.color.length > 0)
    params.append("colors", filters.color.join(","));

  params.append("minPrice", String(filters.price.min));
  params.append("maxPrice", String(filters.price.max));

  return params.toString();
};

// Phân tích query string từ URL để khôi phục bộ lọc
export const fromQueryString = (
  queryString: string,
  defaultMinPrice: number,
  defaultMaxPrice: number
): FilterState => {
  const params = new URLSearchParams(queryString);

  return {
    size: params.get("sizes")?.split(",").filter(Boolean) || [],
    color: params.get("colors")?.split(",").filter(Boolean) || [],
    category: params.get("categories")?.split(",").filter(Boolean) || [],
    price: {
      min: parseInt(params.get("minPrice") || String(defaultMinPrice)),
      max: parseInt(params.get("maxPrice") || String(defaultMaxPrice)),
    },
  };
};

// So sánh hai bộ lọc có giống nhau hay không
export const isEqual = (
  filters1: FilterState,
  filters2: FilterState
): boolean => {
  return JSON.stringify(filters1) === JSON.stringify(filters2);
};

// Tạo bản sao bộ lọc để tránh thay đổi dữ liệu gốc
export const cloneFilters = (filters: FilterState): FilterState => {
  return {
    size: [...filters.size],
    color: [...filters.color],
    category: [...filters.category],
    price: { ...filters.price },
  };
};
