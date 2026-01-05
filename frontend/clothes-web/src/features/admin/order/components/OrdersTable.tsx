/**
 * Component bảng hiển thị đơn hàng
 */

import React from "react";
import { Checkbox, Edit, Trash2 } from "lucide-react";
import type { Order } from "../types";

interface OrdersTableProps {
  orders: Order[];
  selectedOrders: string[];
  onToggleSelect: (orderId: string) => void;
  onSelectAll: () => void;
  onEdit: (order: Order) => void;
  onDelete: (order: Order) => void;
}

/**
 * Component OrdersTable - Bảng hiển thị danh sách đơn hàng
 */
export const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  selectedOrders,
  onToggleSelect,
  onSelectAll,
  onEdit,
  onDelete,
}) => {
  // Hàm lấy màu status
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      "ĐÃ HỦY": "bg-red-100 text-red-600 border border-red-200",
      "ĐÃ GIAO": "bg-green-100 text-green-600 border border-green-200",
      "ĐANG XỬ LÝ": "bg-purple-100 text-purple-600 border border-purple-200",
      "CHỜ LẤY HÀNG": "bg-cyan-100 text-cyan-600 border border-cyan-200",
      "TRẢ HÀNG": "bg-blue-100 text-blue-600 border border-blue-200",
    };
    return colors[status] || "bg-gray-100 text-gray-600 border border-gray-200";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1000px]">
        {/* Header */}
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 sm:px-6 py-3 text-left">
              <input
                type="checkbox"
                checked={
                  orders.length > 0 && selectedOrders.length === orders.length
                }
                onChange={onSelectAll}
                className="w-4 h-4 rounded border-gray-300 cursor-pointer"
              />
            </th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">
              Mã đơn hàng
            </th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">
              Khách hàng
            </th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">
              Sản phẩm
            </th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">
              Ngày
            </th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">
              Số tiền
            </th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">
              Thanh toán
            </th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">
              Trạng thái
            </th>
            <th className="px-4 sm:px-6 py-3 text-center text-xs sm:text-sm font-semibold text-gray-700">
              Hành động
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-gray-200 bg-white">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
              {/* Checkbox */}
              <td className="px-4 sm:px-6 py-3">
                <input
                  type="checkbox"
                  checked={selectedOrders.includes(order.id)}
                  onChange={() => onToggleSelect(order.id)}
                  className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                />
              </td>

              {/* Mã đơn hàng */}
              <td className="px-4 sm:px-6 py-3 text-sm font-medium text-gray-900">
                {order.id}
              </td>

              {/* Khách hàng */}
              <td className="px-4 sm:px-6 py-3">
                <div className="text-sm text-gray-900 font-medium">
                  {order.customer}
                </div>
              </td>

              {/* Sản phẩm */}
              <td className="px-4 sm:px-6 py-3 text-sm text-gray-600 max-w-xs truncate">
                {order.product}
              </td>

              {/* Ngày */}
              <td className="px-4 sm:px-6 py-3">
                <div className="text-sm text-gray-600">{order.date}</div>
                <div className="text-xs text-gray-400">{order.time}</div>
              </td>

              {/* Số tiền */}
              <td className="px-4 sm:px-6 py-3 text-sm font-semibold text-gray-900">
                {order.amount}
              </td>

              {/* Thanh toán */}
              <td className="px-4 sm:px-6 py-3 text-sm text-gray-600">
                {order.payment}
              </td>

              {/* Trạng thái */}
              <td className="px-4 sm:px-6 py-3">
                <span
                  className={`inline-block px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </td>

              {/* Hành động */}
              <td className="px-4 sm:px-6 py-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onEdit(order)}
                    className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Chỉnh sửa"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(order)}
                    className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Xóa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
