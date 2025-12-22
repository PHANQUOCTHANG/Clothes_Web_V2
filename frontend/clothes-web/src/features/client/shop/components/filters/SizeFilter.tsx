"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { SIZE_LIMIT } from "../../constants";

interface SizeFilterProps {
  sizes: string[];
  selectedSizes: string[];
  onSelectSize: (size: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const SizeFilter = ({
  sizes,
  selectedSizes,
  onSelectSize,
  isOpen,
  onToggle,
}: SizeFilterProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayedSizes = showAll ? sizes : sizes.slice(0, SIZE_LIMIT);
  const hasMore = sizes.length > SIZE_LIMIT;

  return (
    <div className="pt-6 border-t border-gray-200 space-y-3">
      <h3
        className="font-semibold text-lg text-gray-800 mb-4 flex justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        Kích cỡ
        {isOpen ? (
          <Minus size={16} className="text-gray-500" />
        ) : (
          <Plus size={16} className="text-gray-500" />
        )}
      </h3>
      {isOpen && (
        <>
          <div className="flex flex-wrap gap-2">
            {displayedSizes.map((size) => {
              const isSelected = selectedSizes.includes(size);
              return (
                <button
                  key={size}
                  onClick={() => onSelectSize(size)}
                  aria-label={`Chọn kích cỡ ${size}`}
                  className={`px-3 py-1 text-sm rounded-lg border transition duration-150 relative group ${
                    isSelected
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-600 border-gray-300 hover:border-gray-500"
                  }`}
                >
                  {size}
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                    {size}
                    <svg
                      className="absolute text-black h-2 w-full left-0 top-full"
                      x="0px"
                      y="0px"
                      viewBox="0 0 255 255"
                    >
                      <polygon
                        className="fill-current"
                        points="0,0 127.5,127.5 255,0"
                      />
                    </svg>
                  </span>
                </button>
              );
            })}
          </div>
          {hasMore && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="pt-2 text-sm text-gray-500 hover:text-black cursor-pointer block font-medium"
            >
              {showAll ? "Ẩn" : "Xem thêm"}
            </button>
          )}
        </>
      )}
    </div>
  );
};
