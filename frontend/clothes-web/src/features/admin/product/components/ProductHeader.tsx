/**
 * Component header của trang quản lý sản phẩm
 */

import React from "react";
import { Filter } from "lucide-react";

interface ProductHeaderProps {
  // Hàm callback
  onFilterClick: () => void;
}

/**
 * Component ProductHeader - Header trang sản phẩm
 */
export const ProductHeader: React.FC<ProductHeaderProps> = ({
  onFilterClick,
}) => {
  return (
    <div className="bg-white border-b px-4 lg:px-6 py-4">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">SẢN PHẨM</h1>
          {/* Nút bộ lọc cho mobile */}
          <button
            onClick={onFilterClick}
            className="lg:hidden flex items-center gap-2 p-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500">
          <span className="text-gray-400">Thương mại điện tử</span>
          <span className="mx-2">›</span>
          <span className="text-gray-700">Sản phẩm</span>
        </div>
      </div>
    </div>
  );
};
