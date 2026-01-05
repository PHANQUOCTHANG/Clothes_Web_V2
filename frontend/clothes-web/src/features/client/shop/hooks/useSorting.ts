import { useState, useCallback } from "react";

export type SortDirection = "asc" | "desc";

// Quản lý cách sắp xếp sản phẩm (khóa, chiều, trạng thái dropdown)
export const useSorting = (defaultSort: string = "position") => {
  const [currentSort, setCurrentSort] = useState(defaultSort);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  // Thay đổi khóa sắp xếp hoặc đảo chiều nếu cùng khóa
  const handleSortChange = useCallback(
    (key: string) => {
      if (currentSort === key) {
        setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setCurrentSort(key);
        setSortDirection("asc");
      }
      setIsSortDropdownOpen(false);
    },
    [currentSort]
  );

  // Đảo chiều sắp xếp (asc ↔ desc)
  const toggleSortDirection = useCallback(() => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  }, []);

  // Đóng dropdown sắp xếp
  const closeSortDropdown = useCallback(() => {
    setIsSortDropdownOpen(false);
  }, []);

  // Mở dropdown sắp xếp
  const openSortDropdown = useCallback(() => {
    setIsSortDropdownOpen(true);
  }, []);

  // Chuyển đổi trạng thái dropdown sắp xếp
  const toggleSortDropdown = useCallback(() => {
    setIsSortDropdownOpen((prev) => !prev);
  }, []);

  // Đặt lại về mặc định (position, asc, đóng dropdown)
  const resetSort = useCallback(() => {
    setCurrentSort(defaultSort);
    setSortDirection("asc");
    setIsSortDropdownOpen(false);
  }, [defaultSort]);

  return {
    currentSort,
    sortDirection,
    isSortDropdownOpen,
    handleSortChange,
    toggleSortDirection,
    closeSortDropdown,
    openSortDropdown,
    toggleSortDropdown,
    resetSort,
  };
};
