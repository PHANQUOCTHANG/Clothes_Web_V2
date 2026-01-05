"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { ColorFilter as ColorFilterType } from "../../types";
import { COLOR_LIMIT } from "../../constants";

interface ColorFilterProps {
  colors: ColorFilterType[];
  selectedColors: string[];
  onSelectColor: (color: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const ColorFilter = ({
  colors,
  selectedColors,
  onSelectColor,
  isOpen,
  onToggle,
}: ColorFilterProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayedColors = showAll ? colors : colors.slice(0, COLOR_LIMIT);
  const hasMore = colors.length > COLOR_LIMIT;

  return (
    <div className="pt-6 border-t border-gray-200 space-y-3">
      <h3
        className="font-semibold text-lg text-gray-800 mb-4 flex justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        Màu sắc
        {isOpen ? (
          <Minus size={16} className="text-gray-500" />
        ) : (
          <Plus size={16} className="text-gray-500" />
        )}
      </h3>
      {isOpen && (
        <>
          <div className="grid grid-cols-5 gap-3">
            {displayedColors.map((color) => {
              const isSelected = selectedColors.includes(color.code);
              return (
                <div
                  key={color.code}
                  className={`w-7 h-7 rounded-full border-2 transition duration-150 cursor-pointer flex items-center justify-center relative group ${
                    isSelected
                      ? "border-gray-500"
                      : "border-transparent hover:border-gray-300"
                  }`}
                  onClick={() => onSelectColor(color.code)}
                  style={{
                    backgroundColor: color.code,
                    backgroundImage: "none",
                  }}
                  aria-label={`Chọn màu ${color.name}`}
                >
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                    {color.name}
                    <svg
                      className="absolute text-gray-800 h-2 w-full left-0 top-full"
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

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full border border-white"></div>
                  )}
                </div>
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
