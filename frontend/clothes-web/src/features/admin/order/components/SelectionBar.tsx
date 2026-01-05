/**
 * Component thanh hành động cho đơn hàng đã chọn
 */

import React from "react";
import { Printer, Trash2 } from "lucide-react";

interface SelectionBarProps {
  selectedCount: number;
  onPrint: () => void;
  onDeleteSelected: () => void;
}

/**
 * Component SelectionBar - Thanh hành động cho các đơn hàng đã chọn
 */
export const SelectionBar: React.FC<SelectionBarProps> = ({
  selectedCount,
  onPrint,
  onDeleteSelected,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-blue-50 border-b border-blue-100 px-4 sm:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm text-blue-700">
          Đã chọn <span className="font-semibold">{selectedCount}</span> đơn
          hàng
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onPrint}
          className="flex items-center gap-2 text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-1.5 hover:bg-blue-100 rounded transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span className="hidden sm:inline">In đơn hàng</span>
        </button>
        <button
          onClick={onDeleteSelected}
          className="flex items-center gap-2 text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium px-3 py-1.5 hover:bg-red-50 rounded transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Xóa đã chọn</span>
        </button>
      </div>
    </div>
  );
};
