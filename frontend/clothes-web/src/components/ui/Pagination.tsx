"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

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
  const pages = useMemo(() => {
    if (totalPages <= 1) return [];

    const range: (number | "...")[] = [];
    const delta = 1; // số trang trước/sau currentPage

    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    range.push(1);

    if (left > 2) range.push("...");

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < totalPages - 1) range.push("...");

    if (totalPages > 1) range.push(totalPages);

    return range;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-12">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-12 h-12 rounded-full bg-gray-100 disabled:opacity-40"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Pages */}
      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={`dots-${index}`}
            className="w-12 h-12 flex items-center justify-center text-gray-400"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-12 h-12 rounded-full font-medium transition
              ${
                page === currentPage
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-12 h-12 rounded-full bg-gray-100 disabled:opacity-40"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
