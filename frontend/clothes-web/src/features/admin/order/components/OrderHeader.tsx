/**
 * Component header cho trang quản lý đơn hàng
 */

import React from "react";
import { Menu, X } from "lucide-react";

interface OrderHeaderProps {
  onMenuToggle: (open: boolean) => void;
  isMobileMenuOpen: boolean;
}

/**
 * Component OrderHeader - Header trang quản lý đơn hàng
 */
export const OrderHeader: React.FC<OrderHeaderProps> = ({
  onMenuToggle,
  isMobileMenuOpen,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between max-w-[1800px] mx-auto gap-3 sm:gap-0">
        <div className="flex items-center justify-between">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-700 tracking-wide">
            QUẢN LÝ ĐƠN HÀNG
          </h1>
          <button
            onClick={() => onMenuToggle(!isMobileMenuOpen)}
            className="sm:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        <div
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } sm:flex items-center text-sm text-gray-500`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0">
            <span>Thương mại điện tử</span>
            <span className="hidden sm:inline mx-2">›</span>
            <span className="sm:mx-2 text-gray-400 sm:hidden">›</span>
            <span className="text-gray-700">Đơn hàng</span>
          </div>
        </div>
      </div>
    </div>
  );
};
