/**
 * Component phân trang cho đơn hàng
 */

import React from "react";

interface OrderPaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

/**
 * Component OrderPagination - Phân trang
 */
export const OrderPagination: React.FC<OrderPaginationProps> = ({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  onPageChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 border-t border-gray-200 gap-4">
      <div className="text-xs sm:text-sm text-gray-600">
        Hiển thị {startIndex + 1}-{Math.min(endIndex, totalItems)} trên{" "}
        {totalItems} đơn hàng
      </div>
      <div className="flex items-center gap-1">
        {/* Nút Trước */}
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-2 text-xs sm:text-sm rounded-lg transition-colors ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          }`}
        >
          Trước
        </button>

        {/* Số trang */}
        {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 3) {
            pageNum = i + 1;
          } else if (currentPage <= 2) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 1) {
            pageNum = totalPages - 2 + i;
          } else {
            pageNum = currentPage - 1 + i;
          }

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-2 text-xs sm:text-sm rounded-lg transition-colors ${
                currentPage === pageNum
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Dấu ba chấm */}
        {totalPages > 3 && currentPage < totalPages - 1 && (
          <span className="px-3 py-2 text-gray-600">...</span>
        )}

        {/* Nút Sau */}
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 text-xs sm:text-sm rounded-lg transition-colors ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          }`}
        >
          Sau
        </button>
      </div>
    </div>
  );
};
