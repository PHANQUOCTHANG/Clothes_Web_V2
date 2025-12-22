"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const generatePages = (currentPage: number, totalPages: number): number[] => {
    const pages: number[] = [];
    if (totalPages <= 1) return [];

    let startPage: number;
    let endPage: number;

    if (totalPages <= 2) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage === totalPages) {
      startPage = totalPages - 1;
      endPage = totalPages;
    } else {
      startPage = currentPage;
      endPage = Math.min(totalPages, currentPage + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pagesToShow = generatePages(currentPage, totalPages);

  return (
    <div className="flex justify-center space-x-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-medium transition duration-200 shadow-sm
          ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        aria-label="Trang trước"
      >
        <ChevronLeft size={20} />
      </button>

      {pagesToShow.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-medium transition duration-200 shadow-sm
            ${
              page === currentPage
                ? "bg-black text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          aria-label={`Trang ${page}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-medium transition duration-200 shadow-sm
          ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        aria-label="Trang sau"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
