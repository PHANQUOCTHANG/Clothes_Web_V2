/**
 * Component tabs cho loại đơn hàng
 */

import React from "react";
import { ShoppingBag, Package, Truck, RotateCcw, XCircle } from "lucide-react";
import type { OrderTab, Order } from "../types";

interface OrderTabsProps {
  activeTab: OrderTab;
  onTabChange: (tab: OrderTab) => void;
  filteredOrders: Order[];
}

/**
 * Component OrderTabs - Tab navigation cho các loại đơn hàng
 */
export const OrderTabs: React.FC<OrderTabsProps> = ({
  activeTab,
  onTabChange,
  filteredOrders,
}) => {
  // Tính số lượng theo mỗi tab
  const getOrderCounts = () => {
    const all = filteredOrders.length;
    const delivered = filteredOrders.filter(
      (o) => o.status === "ĐÃ GIAO"
    ).length;
    const pickups = filteredOrders.filter(
      (o) => o.status === "CHỜ LẤY HÀNG"
    ).length;
    const returns = filteredOrders.filter(
      (o) => o.status === "TRẢ HÀNG"
    ).length;
    const cancelled = filteredOrders.filter(
      (o) => o.status === "ĐÃ HỦY"
    ).length;

    return { all, delivered, pickups, returns, cancelled };
  };

  const counts = getOrderCounts();

  return (
    <div className="px-4 sm:px-6 border-b border-gray-200 overflow-x-auto">
      <div className="flex items-center gap-4 min-w-max">
        {/* Tất cả đơn hàng */}
        <button
          onClick={() => onTabChange("all")}
          className={`flex items-center gap-2 py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "all"
              ? "text-green-600 border-green-600"
              : "text-gray-600 border-transparent hover:text-gray-800"
          }`}
        >
          <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
          Tất cả đơn hàng
          <span className="bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded-full">
            {counts.all}
          </span>
        </button>

        {/* Đã giao */}
        <button
          onClick={() => onTabChange("delivered")}
          className={`flex items-center gap-2 py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "delivered"
              ? "text-green-600 border-green-600"
              : "text-gray-600 border-transparent hover:text-gray-800"
          }`}
        >
          <Package className="w-3 h-3 sm:w-4 sm:h-4" />
          Đã giao
          <span className="bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded-full">
            {counts.delivered}
          </span>
        </button>

        {/* Chờ lấy hàng */}
        <button
          onClick={() => onTabChange("pickups")}
          className={`flex items-center gap-2 py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "pickups"
              ? "text-green-600 border-green-600"
              : "text-gray-600 border-transparent hover:text-gray-800"
          }`}
        >
          <Truck className="w-3 h-3 sm:w-4 sm:h-4" />
          Chờ lấy hàng
          <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            {counts.pickups}
          </span>
        </button>

        {/* Trả hàng */}
        <button
          onClick={() => onTabChange("returns")}
          className={`flex items-center gap-2 py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "returns"
              ? "text-green-600 border-green-600"
              : "text-gray-600 border-transparent hover:text-gray-800"
          }`}
        >
          <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
          Trả hàng
          <span className="bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded-full">
            {counts.returns}
          </span>
        </button>

        {/* Đã hủy */}
        <button
          onClick={() => onTabChange("cancelled")}
          className={`flex items-center gap-2 py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "cancelled"
              ? "text-green-600 border-green-600"
              : "text-gray-600 border-transparent hover:text-gray-800"
          }`}
        >
          <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />
          Đã hủy
          <span className="bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded-full">
            {counts.cancelled}
          </span>
        </button>
      </div>
    </div>
  );
};
