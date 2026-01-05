"use client";

import { Calendar, Menu, Plus, TrendingUp } from "lucide-react";

export const WelcomeSection = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0 mb-6">
      <div className="min-w-0 flex-1">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 truncate">
          Chào buổi sáng, Anna!
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm mt-1 line-clamp-2">
          Đây là những gì đang xảy ra với cửa hàng của bạn hôm nay.
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <div className="hidden md:flex items-center gap-2 px-2 sm:px-4 py-2 border rounded-md text-xs sm:text-sm whitespace-nowrap">
          <Calendar className="w-3 sm:w-4 h-3 sm:h-4 text-gray-500 flex-shrink-0" />
          <span className="hidden lg:inline">
            01 Tháng 1, 2025 - 31 Tháng 1, 2025
          </span>
          <span className="lg:hidden">01 Tháng 1 - 31 Tháng 1</span>
        </div>
        <button className="p-2 border rounded-md hover:bg-gray-50 transition-colors">
          <Menu className="w-4 h-4 text-gray-600" />
        </button>
        <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-xs sm:text-sm whitespace-nowrap">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Thêm sản phẩm</span>
          <span className="sm:hidden">Thêm</span>
        </button>
        <button className="p-2 border rounded-md hover:bg-gray-50 transition-colors">
          <TrendingUp className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
};
