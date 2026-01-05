import { useState, useCallback } from "react";

export type ViewMode = 2 | 3 | 4 | 5;

// Quản lý chế độ xem sản phẩm (danh sách hoặc lưới cột)
export const useViewMode = (defaultView: ViewMode = 4) => {
  const [activeView, setActiveView] = useState<ViewMode>(defaultView);

  // Thay đổi chế độ xem
  const changeView = useCallback((view: ViewMode) => {
    setActiveView(view);
  }, []);

  const isListView = activeView === 2;
  const isGridView = activeView !== 2;

  // Lấy class Tailwind dựa trên số cột (2,3,4,5)
  const getGridColsClass = (): string => {
    if (activeView === 2) return "";
    if (activeView === 3) return "grid-cols-3";
    if (activeView === 5) return "grid-cols-5";
    return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  };

  return {
    activeView,
    changeView,
    isListView,
    isGridView,
    getGridColsClass,
  };
};
