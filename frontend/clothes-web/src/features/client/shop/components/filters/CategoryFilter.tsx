"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { CATEGORY_BRAND_LIMIT } from "../../constants";
import { Category } from "../../types";

interface CategoryFilterProps {
  categories: Category[];
  isOpen: boolean;
  onToggle: () => void;
}

export const CategoryFilter = ({
  categories,
  isOpen,
  onToggle,
}: CategoryFilterProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayedCategories = showAll
    ? categories
    : categories.slice(0, CATEGORY_BRAND_LIMIT);
  const hasMore = categories.length > CATEGORY_BRAND_LIMIT;

  return (
    <div className="space-y-3">
      <h3
        className="font-semibold text-lg text-gray-800 mb-4 flex justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        Danh mục
        {isOpen ? (
          <Minus size={16} className="text-gray-500" />
        ) : (
          <Plus size={16} className="text-gray-500" />
        )}
      </h3>
      {isOpen && (
        <div className="space-y-2 text-sm">
          {displayedCategories.map((cat) => (
            <div
              key={cat.name}
              className="flex justify-between items-center cursor-pointer text-gray-600 hover:text-black transition"
            >
              <span
                className={
                  cat.name === "Giày Thể Thao" ? "font-medium text-black" : ""
                }
              >
                {cat.name}
              </span>
              <span className="text-xs text-gray-500">({cat.count})</span>
            </div>
          ))}
          {hasMore && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="pt-2 text-sm text-gray-500 hover:text-black cursor-pointer block font-medium"
            >
              {showAll ? "Ẩn" : "Xem thêm"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
