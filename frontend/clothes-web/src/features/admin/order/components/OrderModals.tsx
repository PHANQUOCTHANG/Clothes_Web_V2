/**
 * Component modal để tạo/chỉnh sửa/xóa đơn hàng
 */

import React from "react";
import { X, Trash2 } from "lucide-react";
import type { Order } from "../types";

// ===== ADD/EDIT MODAL =====

interface OrderModalProps {
  isOpen: boolean;
  isEdit: boolean;
  selectedOrder?: Order | null;
  onClose: () => void;
  onSubmit: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  isEdit,
  selectedOrder,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
          <h3 className="text-lg font-semibold text-gray-800">
            {isEdit ? "Chỉnh sửa đơn hàng" : "Tạo đơn hàng mới"}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 sm:px-6 py-5 space-y-4">
          {/* Mã đơn (chỉ edit) */}
          {isEdit && selectedOrder && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mã đơn hàng
              </label>
              <input
                type="text"
                value={selectedOrder.id}
                readOnly
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>
          )}

          {/* Khách hàng */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên khách hàng
            </label>
            <input
              type="text"
              placeholder="Nhập tên khách hàng"
              defaultValue={
                isEdit && selectedOrder ? selectedOrder.customer : ""
              }
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Sản phẩm */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sản phẩm
            </label>
            <select className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
              <option>Chọn sản phẩm...</option>
              <option>Đồng hồ thông minh Noise Evolve</option>
              <option>Áo thun tay ngắn (Xanh)</option>
              <option>Áo sơ mi tay ngắn cổ điển</option>
              <option>Apple iPhone 12</option>
              <option>Galaxy Watch4</option>
            </select>
          </div>

          {/* Ngày đặt hàng */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngày đặt hàng
            </label>
            <input
              type="text"
              placeholder="Chọn ngày"
              defaultValue={isEdit && selectedOrder ? selectedOrder.date : ""}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Số tiền & Phương thức thanh toán */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số tiền
              </label>
              <input
                type="text"
                placeholder="$0.00"
                defaultValue={
                  isEdit && selectedOrder ? selectedOrder.amount : ""
                }
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phương thức thanh toán
              </label>
              <select className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                <option>Visa</option>
                <option>Mastercard</option>
                <option>Paypal</option>
                <option>COD</option>
              </select>
            </div>
          </div>

          {/* Trạng thái giao hàng */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trạng thái giao hàng
            </label>
            <select className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
              <option>ĐÃ HỦY</option>
              <option>ĐÃ GIAO</option>
              <option>ĐANG XỬ LÝ</option>
              <option>CHỜ LẤY HÀNG</option>
              <option>TRẢ HÀNG</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-4 sm:px-6 py-4 border-t border-gray-200 sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Đóng
          </button>
          <button
            onClick={onSubmit}
            className="px-5 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
          >
            {isEdit ? "Cập nhật" : "Tạo đơn hàng"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ===== DELETE MODAL =====

interface DeleteModalProps {
  isOpen: boolean;
  selectedOrder: Order | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  selectedOrder,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Body */}
        <div className="px-4 sm:px-6 py-6 sm:py-8 text-center">
          {/* Icon */}
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6">
            <div className="w-full h-full flex items-center justify-center text-red-500">
              <Trash2 className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={1.5} />
            </div>
          </div>

          {/* Text */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
            Xóa đơn hàng
          </h3>
          <p className="text-gray-600 text-sm mb-4 sm:mb-6">
            Bạn có chắc chắn muốn xóa{" "}
            {selectedOrder
              ? `đơn hàng ${selectedOrder.id}`
              : "đơn hàng đã chọn"}
            ?
            <br />
            Hành động này không thể hoàn tác.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              onClick={onConfirm}
              className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
            >
              Xóa đơn hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
