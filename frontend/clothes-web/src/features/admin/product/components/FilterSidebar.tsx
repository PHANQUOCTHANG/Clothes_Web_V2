/**
 * Component hiển thị thanh lọc cho trên desktop
 */

import React from "react";
import { Search, ChevronDown, ChevronUp, X } from "lucide-react";
import {
  Category,
  RatingOption,
  DiscountOption,
  ActiveFilter,
  ExpandedSections,
} from "../../types";

interface FilterSidebarProps {
  // Dữ liệu
  categories: Category[];
  allBrands: string[];
  discountOptions: DiscountOption[];
  ratingOptions: RatingOption[];
  activeFilters: ActiveFilter[];

  // Trạng thái lọc
  priceRange: [number, number];
  selectedBrands: string[];
  selectedCategory: string | null;
  selectedDiscount: string | null;
  selectedRating: number | null;
  searchBrand: string;
  expandedSections: ExpandedSections;

  // Hàm callback
  onPriceChange: (range: [number, number]) => void;
  onBrandToggle: (brand: string) => void;
  onCategorySelect: (category: string) => void;
  onDiscountSelect: (discount: string | null) => void;
  onRatingSelect: (rating: number | null) => void;
  onSearchBrand: (search: string) => void;
  onToggleSection: (section: keyof ExpandedSections) => void;
  onRemoveFilter: (value: string, type: string) => void;
  onClearAllFilters: () => void;
}

/**
 * Component FilterSidebar - Thanh lọc cho desktop
 */
export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  allBrands,
  discountOptions,
  ratingOptions,
  activeFilters,
  priceRange,
  selectedBrands,
  selectedCategory,
  selectedDiscount,
  selectedRating,
  searchBrand,
  expandedSections,
  onPriceChange,
  onBrandToggle,
  onCategorySelect,
  onDiscountSelect,
  onRatingSelect,
  onSearchBrand,
  onToggleSection,
  onRemoveFilter,
  onClearAllFilters,
}) => {
  const filteredBrands = allBrands.filter((brand) =>
    brand.toLowerCase().includes(searchBrand.toLowerCase())
  );

  return (
    <div className="hidden lg:block w-80 bg-white border-r min-h-screen p-6">
      {/* Bộ lọc hiện tại */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">Bộ lọc</h3>
          <button
            onClick={onClearAllFilters}
            className="text-sm text-blue-600 hover:underline"
          >
            Xóa tất cả
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded text-sm"
            >
              {filter.label}
              <button
                onClick={() => onRemoveFilter(filter.value, filter.type)}
                className="hover:bg-blue-600 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Danh mục sản phẩm */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3 text-xs tracking-wider">
          DANH MỤC SẢN PHẨM
        </h3>
        <div className="space-y-1">
          {categories.map((category, idx) => (
            <div
              key={idx}
              onClick={() => onCategorySelect(category.name)}
              className={`flex justify-between items-center py-2 cursor-pointer rounded px-2 ${
                selectedCategory === category.name
                  ? "bg-green-50 text-green-700"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <span>{category.name}</span>
              {category.count && (
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                  {category.count}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bộ lọc giá */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-4 text-xs tracking-wider">
          GIÁ
        </h3>
        <div className="relative px-2 py-3">
          <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-1 bg-gray-200 rounded-full"></div>
          <div
            className="absolute left-2 top-1/2 -translate-y-1/2 h-1 bg-green-500 rounded-full"
            style={{ width: `calc(${(priceRange[1] / 2000) * 100}% - 0.5rem)` }}
          ></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md cursor-pointer"
            style={{ left: `calc(${(priceRange[1] / 2000) * 100}% - 0.5rem)` }}
          ></div>
          <input
            type="range"
            min="0"
            max="2000"
            value={priceRange[1]}
            onChange={(e) => onPriceChange([0, parseInt(e.target.value)])}
            className="w-full h-4 opacity-0 cursor-pointer relative z-10"
          />
        </div>
        <div className="flex gap-3 mt-4">
          <div className="flex-1">
            <input
              type="text"
              value={`$ ${priceRange[0]}`}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <span className="text-gray-500 pt-2">đến</span>
          <div className="flex-1">
            <input
              type="text"
              value={`$ ${priceRange[1]}`}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Bộ lọc thương hiệu */}
      <div className="mb-6">
        <button
          onClick={() => onToggleSection("brands")}
          className="flex justify-between items-center w-full mb-3"
        >
          <h3 className="font-semibold text-gray-700 text-xs tracking-wider flex items-center gap-2">
            THƯƠNG HIỆU
            {selectedBrands.length > 0 && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                {selectedBrands.length}
              </span>
            )}
          </h3>
          {expandedSections.brands ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {expandedSections.brands && (
          <>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm thương hiệu..."
                value={searchBrand}
                onChange={(e) => onSearchBrand(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            </div>

            <div className="space-y-3">
              {filteredBrands.slice(0, 5).map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => onBrandToggle(brand)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Bộ lọc giảm giá */}
      <div className="mb-6">
        <button
          onClick={() => onToggleSection("discount")}
          className="flex justify-between items-center w-full mb-3"
        >
          <h3 className="font-semibold text-gray-700 text-xs tracking-wider flex items-center gap-2">
            GIẢM GIÁ
            {selectedDiscount && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                1
              </span>
            )}
          </h3>
          {expandedSections.discount ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {expandedSections.discount && (
          <div className="space-y-3">
            {discountOptions.map((option, idx) => (
              <label
                key={idx}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedDiscount === option.label}
                  onChange={() =>
                    onDiscountSelect(
                      selectedDiscount === option.label ? null : option.label
                    )
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Bộ lọc đánh giá */}
      <div className="mb-6">
        <button
          onClick={() => onToggleSection("rating")}
          className="flex justify-between items-center w-full mb-3"
        >
          <h3 className="font-semibold text-gray-700 text-xs tracking-wider flex items-center gap-2">
            ĐÁNH GIÁ
            {selectedRating && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                1
              </span>
            )}
          </h3>
          {expandedSections.rating ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {expandedSections.rating && (
          <div className="space-y-3">
            {ratingOptions.map((option, idx) => (
              <label
                key={idx}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedRating === option.stars}
                  onChange={() =>
                    onRatingSelect(
                      selectedRating === option.stars ? null : option.stars
                    )
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
