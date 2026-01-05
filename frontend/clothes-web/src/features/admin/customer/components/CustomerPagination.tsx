import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CustomerPaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export const CustomerPagination: React.FC<CustomerPaginationProps> = ({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  onPageChange,
}) => {
  // Tính toán các số trang sẽ hiển thị (tối đa 3 nút)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 3);
      } else if (currentPage >= totalPages - 1) {
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-4 md:px-6 py-4 border-t border-gray-200 bg-white gap-3">
      <div className="text-sm text-gray-500 text-center sm:text-left">
        Showing <span className="font-semibold">{startIndex + 1}</span>-
        <span className="font-semibold">{Math.min(endIndex, totalItems)}</span>{" "}
        of <span className="font-semibold">{totalItems}</span> results
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="px-2 text-gray-400">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`w-8 h-8 flex items-center justify-center text-sm rounded transition-all ${
                  currentPage === page
                    ? "bg-blue-500 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
