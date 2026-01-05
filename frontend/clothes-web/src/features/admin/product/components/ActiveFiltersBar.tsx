/**
 * Component thanh bộ lọc hiện tại (mobile)
 */

import React from "react";
import { X } from "lucide-react";
import { ActiveFilter } from "../../types";

interface ActiveFiltersBarProps {
  // Dữ liệu
  activeFilters: ActiveFilter[];

  // Hàm callback
  onRemoveFilter: (value: string, type: string) => void;
}

/**
 * Component ActiveFiltersBar - Hiển thị bộ lọc hiện tại trên mobile
 */
export const ActiveFiltersBar: React.FC<ActiveFiltersBarProps> = ({
  activeFilters,
  onRemoveFilter,
}) => {
  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="lg:hidden px-4 py-3 border-t border-b bg-gray-50">
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
  );
};
