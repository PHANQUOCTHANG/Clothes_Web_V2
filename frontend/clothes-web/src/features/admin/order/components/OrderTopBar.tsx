/**
 * Component thanh tìm kiếm và action cho đơn hàng
 */

import React from "react";
import { Search, Plus, Download, SlidersHorizontal } from "lucide-react";

interface OrderTopBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onShowFiltersToggle: () => void;
  onAddOrder: () => void;
}

/**
 * Component OrderTopBar - Thanh tìm kiếm và hành động
 */
export const OrderTopBar: React.FC<OrderTopBarProps> = ({
  searchTerm,
  onSearchChange,
  onShowFiltersToggle,
  onAddOrder,
}) => {
  return (
    <div className="px-4 sm:px-6 py-4 border-b border-gray-200 space-y-3">
      {/* Title và Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-800">
          Lịch sử đơn hàng
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={onAddOrder}
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium transition-colors w-full sm:w-auto"
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Tạo đơn hàng</span>
            <span className="xs:hidden">Tạo mới</span>
          </button>
          <button className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium transition-colors w-full sm:w-auto">
            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Nhập file</span>
            <span className="xs:hidden">Nhập</span>
          </button>
        </div>
      </div>

      {/* Search và Filter Button */}
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm tên khách hàng..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        <button
          onClick={onShowFiltersToggle}
          className="lg:hidden flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
