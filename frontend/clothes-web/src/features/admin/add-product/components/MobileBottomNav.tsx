/**
 * Component thanh điều hướng dưới cùng cho mobile
 */

import React from "react";
import { ArrowUp } from "lucide-react";

interface MobileBottomNavProps {
  // Hàm callback
  onSubmit: (status: "draft" | "published") => void;
  onScrollToTop: () => void;
  isLoading?: boolean;
}

/**
 * Component MobileBottomNavigation - Thanh điều hướng dưới cho mobile
 * Hiển thị nút submit và scroll to top
 */
export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onSubmit,
  onScrollToTop,
  isLoading = false,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-200 p-4 flex gap-3 z-40">
      {/* Scroll to Top Button */}
      <button
        onClick={onScrollToTop}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-gray-700 border border-gray-300 rounded font-medium text-sm hover:bg-gray-50 transition-colors"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
        <span className="hidden xs:inline">Lên đầu</span>
      </button>

      {/* Submit Button */}
      <div className="flex-1 flex gap-2">
        <button
          onClick={() => onSubmit("draft")}
          disabled={isLoading}
          className="flex-1 px-4 py-2.5 text-gray-700 border border-gray-300 rounded font-medium text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span className="hidden xs:inline">Lưu</span>
          <span className="xs:hidden">Lưu</span>
        </button>

        <button
          onClick={() => onSubmit("published")}
          disabled={isLoading}
          className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded font-medium text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span className="hidden xs:inline">Xuất bản</span>
          <span className="xs:hidden">Xuất</span>
        </button>
      </div>
    </div>
  );
};
