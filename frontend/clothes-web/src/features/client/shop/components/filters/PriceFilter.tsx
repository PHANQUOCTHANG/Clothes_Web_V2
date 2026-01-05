"use client";

import { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import { MIN_PRICE, MAX_PRICE } from "../../constants";

interface PriceFilterProps {
  min?: number;
  max?: number;
  currentRange: { min: number; max: number };
  onRangeChange: (range: { min: number; max: number }) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const PriceFilter = ({
  min = MIN_PRICE,
  max = MAX_PRICE,
  currentRange,
  onRangeChange,
  isOpen,
  onToggle,
}: PriceFilterProps) => {
  const [minPrice, setMinPrice] = useState(currentRange.min);
  const [maxPrice, setMaxPrice] = useState(currentRange.max);

  useEffect(() => {
    setMinPrice(currentRange.min);
    setMaxPrice(currentRange.max);
  }, [currentRange]);

  // Xử lý thay đổi giá min
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value);
    if (newMin <= maxPrice) {
      setMinPrice(newMin);
      onRangeChange({ min: newMin, max: maxPrice });
    }
  };

  // Xử lý thay đổi giá max
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value);
    if (newMax >= minPrice) {
      setMaxPrice(newMax);
      onRangeChange({ min: minPrice, max: newMax });
    }
  };

  // Xử lý nhập giá tối thiểu
  const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || min;
    const newMin = Math.min(val, maxPrice);
    setMinPrice(newMin);
    onRangeChange({ min: newMin, max: maxPrice });
  };

  // Xử lý nhập giá tối đa
  const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || max;
    const newMax = Math.max(val, minPrice);
    setMaxPrice(newMax);
    onRangeChange({ min: minPrice, max: newMax });
  };

  const range = max - min;
  const minPercent = ((minPrice - min) / range) * 100;
  const maxPercent = ((maxPrice - min) / range) * 100;

  return (
    <div className="pt-6 border-t border-gray-200 space-y-4">
      <style>{`
        .price-slider {
          position: relative;
          height: 6px;
          background: #e5e7eb;
          border-radius: 3px;
          outline: none;
        }

        .price-slider input {
          position: absolute;
          width: 100%;
          height: 6px;
          top: 0;
          left: 0;
          pointer-events: none;
          appearance: none;
          -webkit-appearance: none;
          background: transparent;
          cursor: pointer;
        }

        .price-slider input::-webkit-slider-thumb {
          appearance: none;
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #000;
          cursor: pointer;
          pointer-events: auto;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          transition: all 0.2s ease;
        }

        .price-slider input::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
        }

        .price-slider input::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #000;
          cursor: pointer;
          pointer-events: auto;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          border: none;
          transition: all 0.2s ease;
        }

        .price-slider input::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
        }

        .price-input {
          border: 1px solid #d1d5db;
          padding: 6px 8px;
          border-radius: 4px;
          font-size: 13px;
          transition: border-color 0.2s;
        }

        .price-input:focus {
          outline: none;
          border-color: #000;
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
        }
      `}</style>

      {/* Header */}
      <h3
        className="font-semibold text-lg text-gray-800 flex justify-between items-center cursor-pointer hover:text-gray-600 transition"
        onClick={onToggle}
      >
        Giá
        {isOpen ? (
          <Minus size={16} className="text-gray-500" />
        ) : (
          <Plus size={16} className="text-gray-500" />
        )}
      </h3>

      {isOpen && (
        <div className="space-y-4">
          {/* Price Display */}
          <div className="flex gap-2 items-center">
            <input
              type="number"
              value={minPrice}
              onChange={handleMinInput}
              className="price-input w-20"
              placeholder="Min"
            />
            <span className="text-gray-400 text-sm">—</span>
            <input
              type="number"
              value={maxPrice}
              onChange={handleMaxInput}
              className="price-input w-20"
              placeholder="Max"
            />
          </div>

          {/* Slider Track */}
          <div className="price-slider">
            {/* Filled track */}
            <div
              className="absolute h-full bg-black rounded-3px"
              style={{
                left: `${minPercent}%`,
                right: `${100 - maxPercent}%`,
              }}
            />

            {/* Min Slider */}
            <input
              type="range"
              min={min}
              max={max}
              value={minPrice}
              onChange={handleMinChange}
              className="min-slider"
            />

            {/* Max Slider */}
            <input
              type="range"
              min={min}
              max={max}
              value={maxPrice}
              onChange={handleMaxChange}
              className="max-slider"
            />
          </div>

          {/* Price Range Labels */}
          <div className="flex justify-between text-xs text-gray-500 px-1">
            <span>${min.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
            <span>${max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
          </div>
        </div>
      )}
    </div>
  );
};
