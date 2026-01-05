import { useState, useCallback } from "react";

/**
 * Hook quản lý phân trang
 * @param totalItems - Tổng số sản phẩm
 * @param itemsPerPage - Số sản phẩm trên một trang
 * @returns {Object} Đối tượng chứa thông tin phân trang và các hàm xử lý
 */
export const usePagination = (
  totalItems: number,
  itemsPerPage: number = 10
) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Tính toán
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItemsStart = startIndex + 1;
  const currentItemsEnd = Math.min(endIndex, totalItems);

  /**
   * Thay đổi trang
   * @param page - Số trang cần chuyển tới
   */
  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [totalPages]
  );

  /**
   * Trang tiếp theo
   */
  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  /**
   * Trang trước đó
   */
  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  /**
   * Kiểm tra có trang tiếp theo
   */
  const hasNextPage = currentPage < totalPages;

  /**
   * Kiểm tra có trang trước
   */
  const hasPrevPage = currentPage > 1;

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    currentItemsStart,
    currentItemsEnd,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
    resetPage: () => setCurrentPage(1),
  };
};
