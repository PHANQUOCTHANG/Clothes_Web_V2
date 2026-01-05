import React from "react";
import { Printer, Trash2 } from "lucide-react";

interface SelectionBarProps {
  selectedCount: number;
  onPrint: () => void;
  onDeleteSelected: () => void;
}

export const SelectionBar: React.FC<SelectionBarProps> = ({
  selectedCount,
  onPrint,
  onDeleteSelected,
}) => {
  // Chỉ hiển thị khi có mục được chọn
  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 px-4 md:px-6 py-4">
      <div className="max-w-[1800px] mx-auto flex items-center justify-between gap-4">
        <div className="text-sm font-medium text-gray-700">
          Đã chọn{" "}
          <span className="font-semibold text-blue-600">{selectedCount}</span>{" "}
          khách hàng
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onPrint}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">In</span>
          </button>

          <button
            onClick={onDeleteSelected}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Xóa</span>
          </button>
        </div>
      </div>
    </div>
  );
};
