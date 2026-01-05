"use client";

import { MIN_PRICE, MAX_PRICE, COLORS } from "../../constants";
import { FilterState } from "../../types";

interface ActiveFiltersProps {
  filters: FilterState;
  onRemove: (type: string, value: string) => void;
  onClearAll: () => void;
}

export const ActiveFilters = ({
  filters,
  onRemove,
  onClearAll,
}: ActiveFiltersProps) => {
  // Helper function to get color name from code
  const getColorName = (code: string): string => {
    const color = COLORS.find((c) => c.code === code);
    return color ? color.name : code;
  };
  // Group filters by type
  const groupedFilters: Record<string, { label: string; values: string[] }> =
    {};

  // Add size filters
  if (filters.size.length > 0) {
    groupedFilters["size"] = {
      label: "Kích cỡ",
      values: filters.size,
    };
  }

  // Add color filters
  if (filters.color.length > 0) {
    const colorNames = filters.color.map((code) => getColorName(code));
    groupedFilters["color"] = {
      label: "Màu sắc",
      values: colorNames,
    };
  }

  // Add category filters
  if (filters.category.length > 0) {
    groupedFilters["category"] = {
      label: "Danh mục",
      values: filters.category,
    };
  }

  // Add price filter
  const isPriceFiltered =
    filters.price.min !== MIN_PRICE || filters.price.max !== MAX_PRICE;
  if (isPriceFiltered) {
    groupedFilters["price"] = {
      label: "Giá",
      values: [
        `$${filters.price.min.toFixed(2)} - $${filters.price.max.toFixed(2)}`,
      ],
    };
  }

  const allActiveFilters = Object.entries(groupedFilters);

  if (allActiveFilters.length === 0) return null;

  return (
    <div className="mb-6 pt-0 border-b border-gray-200 pb-4">
      <h2 className="text-2xl font-light tracking-wide mb-4">Đang lọc theo</h2>
      <div className="flex flex-wrap gap-3 mb-4">
        {allActiveFilters.map(([type, { label, values }]) => (
          <div
            key={type}
            className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-800"
          >
            <span className="font-light">
              {label}: {values.join(", ")}
            </span>
            <button
              onClick={() => {
                if (type === "price") {
                  onRemove(type, "reset");
                } else {
                  // Remove all values of this type
                  values.forEach((value) => onRemove(type, value));
                }
              }}
              className="text-gray-500 hover:text-black text-lg leading-none font-light"
              aria-label={`Xóa bộ lọc ${label}`}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      {allActiveFilters.length > 0 && (
        <button
          onClick={onClearAll}
          className="text-sm text-black hover:text-gray-700 transition font-medium"
        >
          Xóa tất cả
        </button>
      )}
    </div>
  );
};
