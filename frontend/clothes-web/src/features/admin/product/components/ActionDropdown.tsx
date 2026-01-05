/**
 * Component hiển thị dropdown hành động cho sản phẩm
 */

import React from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";
import { ProductAction } from "../../types";

interface ActionDropdownProps {
  productId: string;
  onActionClick?: (productId: string, action: ProductAction) => void;
}

/**
 * Component ActionDropdown - Hiển thị menu hành động (Xem, Sửa, Xóa)
 */
export const ActionDropdown: React.FC<ActionDropdownProps> = ({
  productId,
  onActionClick,
}) => {
  return (
    <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
      <div className="py-1">
        {/* Nút Xem sản phẩm */}
        <button
          onClick={() => onActionClick?.(productId, "view")}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Eye className="w-4 h-4 text-gray-500" />
          <span>Xem</span>
        </button>

        {/* Nút Sửa sản phẩm */}
        <button
          onClick={() => onActionClick?.(productId, "edit")}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Edit2 className="w-4 h-4 text-gray-500" />
          <span>Sửa</span>
        </button>

        {/* Nút Xóa sản phẩm */}
        <button
          onClick={() => onActionClick?.(productId, "delete")}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Xóa</span>
        </button>
      </div>
    </div>
  );
};
