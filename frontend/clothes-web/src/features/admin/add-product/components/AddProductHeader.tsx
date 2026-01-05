/**
 * Component đầu trang form
 */

import React from "react";
import { Menu } from "lucide-react";

interface AddProductHeaderProps {
  // Hàm callback
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

/**
 * Component AddProductHeader - Header trang thêm sản phẩm
 */
export const AddProductHeader: React.FC<AddProductHeaderProps> = ({
  onMenuToggle,
  isMobileMenuOpen,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between max-w-[1600px] mx-auto gap-3 sm:gap-0">
        {/* Title and Mobile Menu Button */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-700 tracking-wide">
            TẠO SẢN PHẨM
          </h1>
          <button
            onClick={onMenuToggle}
            className="sm:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Breadcrumb */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } sm:flex items-center text-sm text-gray-500`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0">
            <span>Thương mại điện tử</span>
            <span className="hidden sm:inline mx-2">›</span>
            <span className="sm:mx-2 text-gray-400 sm:hidden">›</span>
            <span className="text-gray-700">Tạo sản phẩm</span>
          </div>
        </div>
      </div>
    </div>
  );
};
