"use client";

import { MIN_PRICE, MAX_PRICE } from "../../constants";
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
  const activeArrayFilters = ["size", "brand", "color"].flatMap(
    (type: string) =>
      filters[type as "size" | "brand" | "color"].map((value) => ({
        type,
        value,
        label: `${
          type === "size"
            ? "Kích cỡ"
            : type === "brand"
            ? "Thương hiệu"
            : "Màu sắc"
        }: ${value}`,
      }))
  );

  const isPriceFiltered =
    filters.price.min !== MIN_PRICE || filters.price.max !== MAX_PRICE;
  const activePrice = isPriceFiltered
    ? [
        {
          type: "price",
          value: "reset",
          label: `Giá: $${filters.price.min.toFixed(
            2
          )} - $${filters.price.max.toFixed(2)}`,
        },
      ]
    : [];

  const allActiveFilters = [...activeArrayFilters, ...activePrice];

  if (allActiveFilters.length === 0) return null;

  return (
    <div className="mb-6 pt-0 border-b border-gray-200 pb-4">
      <h2 className="text-2xl font-light tracking-wide mb-4">Đang lọc theo</h2>
      <div className="space-y-1 text-base">
        {allActiveFilters.map((filter, index) => (
          <div key={index} className="flex items-center text-gray-800">
            <button
              onClick={() =>
                onRemove(
                  filter.type,
                  filter.value === "reset" ? "reset" : filter.value
                )
              }
              className="text-gray-500 hover:text-black mr-2 text-xl leading-none font-light"
              style={{ width: "1rem", height: "1rem" }}
              aria-label={`Xóa bộ lọc ${filter.label}`}
            >
              &times;
            </button>
            <span className="font-light">{filter.label}</span>
          </div>
        ))}
        <button
          onClick={onClearAll}
          className="pt-4 text-sm text-black hover:text-gray-700 transition block font-medium"
        >
          Xóa tất cả
        </button>
      </div>
    </div>
  );
};
