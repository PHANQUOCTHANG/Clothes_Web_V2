import { useState } from "react";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string | null;
  setSelectedSize: (size: string | null) => void;
}

export const SizeSelector = ({
  sizes,
  selectedSize,
  setSelectedSize,
}: SizeSelectorProps) => {
  const [hoveredSize, setHoveredSize] = useState<string | null>(null);

  return (
    <div className="mt-6">
      <p className="text-sm font-semibold mb-2">Kích cỡ:</p>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <div
            key={size}
            className="relative"
            onMouseEnter={() => setHoveredSize(size)}
            onMouseLeave={() => setHoveredSize(null)}
          >
            {hoveredSize === size && (
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10">
                <div className="px-3 py-1 text-xs font-semibold text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap">
                  {size}
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-t-8 border-t-gray-900 border-x-4 border-x-transparent"></div>
              </div>
            )}
            <button
              onClick={() => setSelectedSize(size === selectedSize ? null : size)}
              className={`
                px-4 py-2 text-sm font-medium rounded-lg border transition-colors duration-200
                ${
                  selectedSize === size
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-900"
                }
              `}
            >
              {size}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
