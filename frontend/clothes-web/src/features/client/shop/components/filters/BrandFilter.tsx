"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { CATEGORY_BRAND_LIMIT } from "../../constants";
import { Brand } from "../../types";

interface BrandFilterProps {
  brands: Brand[];
  selectedBrands: string[];
  onSelectBrand: (brand: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const BrandFilter = ({
  brands,
  selectedBrands,
  onSelectBrand,
  isOpen,
  onToggle,
}: BrandFilterProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayedBrands = showAll
    ? brands
    : brands.slice(0, CATEGORY_BRAND_LIMIT);
  const hasMore = brands.length > CATEGORY_BRAND_LIMIT;

  return (
    <div className="pt-6 border-t border-gray-200 space-y-3">
      <h3
        className="font-semibold text-lg text-gray-800 mb-4 flex justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        Thương hiệu
        {isOpen ? (
          <Minus size={16} className="text-gray-500" />
        ) : (
          <Plus size={16} className="text-gray-500" />
        )}
      </h3>
      {isOpen && (
        <div className="space-y-3 text-sm">
          {displayedBrands.map((brand) => (
            <label
              key={brand.name}
              className="flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-black border-gray-300 rounded focus:ring-black transition duration-150"
                  checked={selectedBrands.includes(brand.name)}
                  onChange={() => onSelectBrand(brand.name)}
                  aria-label={`Chọn thương hiệu ${brand.name}`}
                />
                <span className="ml-3 text-gray-600 group-hover:text-black">
                  {brand.name}
                </span>
              </div>
              <span className="text-xs text-gray-500">({brand.count})</span>
            </label>
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
