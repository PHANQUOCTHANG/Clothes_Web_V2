/**
 * Component phân trang
 */

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  // Dữ liệu
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;

  // Hàm callback
  onPageChange: (page: number) => void;
}

/**
 * Component Pagination - Điều khiển phân trang
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="px-4 lg:px-6 py-4 border-t flex flex-col lg:flex-row justify-between items-center gap-4 bg-white">
      {/* Thông tin hiển thị */}
      <div className="text-sm text-gray-600 text-center lg:text-left">
        Hiển thị <span className="font-semibold">{startItem}</span> trong{" "}
        <span className="font-semibold">{totalItems}</span> kết quả
      </div>

      {/* Nút phân trang */}
      <div className="flex flex-wrap justify-center gap-2">
        {/* Nút trang trước */}
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Các nút trang */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Nút trang sau */}
        <button
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
