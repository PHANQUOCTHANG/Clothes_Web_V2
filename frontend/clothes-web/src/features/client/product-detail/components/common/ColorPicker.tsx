import { useState } from "react";
import { IColorOption } from "../../types";

interface ColorPickerProps {
  colors: IColorOption[];
  selectedColor: IColorOption | null;
  setSelectedColor: (color: IColorOption | null) => void;
}

export const ColorPicker = ({
  colors,
  selectedColor,
  setSelectedColor,
}: ColorPickerProps) => {
  const [hoveredColor, setHoveredColor] = useState<IColorOption | null>(null);

  return (
    <div className="mt-4">
      <p className="text-sm font-semibold mb-2">Màu sắc:</p>
      <div className="flex space-x-2">
        {colors.map((color) => (
          <div
            key={color.name}
            onClick={() => setSelectedColor(color.code === selectedColor?.code ? null : color)}
            onMouseEnter={() => setHoveredColor(color)}
            onMouseLeave={() => setHoveredColor(null)}
            className="relative"
          >
            {hoveredColor && hoveredColor.name === color.name && (
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10">
                <div className="px-3 py-1 text-xs font-semibold text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap">
                  {color.name}
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-t-8 border-t-gray-900 border-x-4 border-x-transparent"></div>
              </div>
            )}

            <div
              className={`
                w-6 h-6 rounded-full cursor-pointer transition-all duration-200 border-2
                ${
                  selectedColor && selectedColor.name === color.name
                    ? "ring-2 ring-offset-2 ring-gray-900 border-gray-900"
                    : "border-gray-300 hover:border-gray-900"
                }
              `}
              style={{ backgroundColor: color.code }}
              role="radio"
              aria-checked={
                selectedColor?.name === color.name ? "true" : "false"
              }
              title={color.name}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};
