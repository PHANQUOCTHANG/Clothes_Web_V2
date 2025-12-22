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

  const range = max - min;
  const minPos = ((minPrice - min) / range) * 100;
  const maxPos = ((maxPrice - min) / range) * 100;

  useEffect(() => {
    setMinPrice(currentRange.min);
    setMaxPrice(currentRange.max);
  }, [currentRange]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newMin = parseInt(e.target.value);
    if (newMin <= maxPrice) {
      setMinPrice(newMin);
      onRangeChange({ min: newMin, max: maxPrice });
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newMax = parseInt(e.target.value);
    if (newMax >= minPrice) {
      setMaxPrice(newMax);
      onRangeChange({ min: minPrice, max: newMax });
    }
  };

  return (
    <div className="pt-6 border-t border-gray-200 space-y-3">
      <h3
        className="font-semibold text-lg text-gray-800 mb-4 flex justify-between items-center cursor-pointer"
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
        <>
          <div className="flex justify-between text-sm font-medium text-gray-800 mb-4">
            <span>${minPrice.toFixed(2)}</span>
            <span>${maxPrice.toFixed(2)}</span>
          </div>

          <div className="relative h-10">
            <div className="absolute w-full h-1 top-1/2 -translate-y-1/2 bg-gray-200 rounded-full"></div>

            <div
              className="absolute h-1 top-1/2 -translate-y-1/2 bg-black rounded-full"
              style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
            ></div>

            <div className="absolute w-full top-2 flex justify-between items-center text-xs text-gray-400">
              {[0, 25, 50, 75, 100].map((percent, index) => (
                <span key={index} className="relative block text-center mt-3">
                  <div className="absolute w-px h-1 bg-gray-300 -top-1 left-1/2 transform -translate-x-1/2"></div>
                </span>
              ))}
            </div>

            <input
              type="range"
              min={min}
              max={max}
              value={minPrice}
              onChange={handleMinChange}
              className="absolute w-full h-full top-0 cursor-pointer appearance-none bg-transparent z-50 pointer-events-auto"
              style={{ left: 0, padding: 0, margin: 0, opacity: 0.001 }}
              aria-label="Giá tối thiểu"
            />
            <input
              type="range"
              min={min}
              max={max}
              value={maxPrice}
              onChange={handleMaxChange}
              className="absolute w-full h-full top-0 cursor-pointer appearance-none bg-transparent z-50 pointer-events-auto"
              style={{ left: 0, padding: 0, margin: 0, opacity: 0.001 }}
              aria-label="Giá tối đa"
            />

            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full shadow-md z-30 pointer-events-none"
              style={{ left: `calc(${minPos}% - 8px)` }}
            ></div>
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full shadow-md z-30 pointer-events-none"
              style={{ left: `calc(${maxPos}% - 8px)` }}
            ></div>

            <div className="absolute w-full flex justify-between top-10 text-xs text-gray-500">
              <span>${min}</span>
              <span>${(min + range / 4).toFixed(0)}</span>
              <span>${(min + range / 2).toFixed(0)}</span>
              <span>${(min + (range * 3) / 4).toFixed(0)}</span>
              <span>${max}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
