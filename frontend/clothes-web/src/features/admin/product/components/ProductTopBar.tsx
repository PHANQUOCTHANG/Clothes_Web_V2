/**
 * Component topbar của bảng sản phẩm (thanh công cụ)
 */

import React from "react";
import { Plus, Search } from "lucide-react";

interface ProductTopBarProps {
  // Trạng thái
  activeTab: "all" | "published" | "draft";
  allCount: number;
  publishedCount: number;
  draftCount: number;
  searchProduct: string;

  // Hàm callback
  onTabChange: (tab: "all" | "published" | "draft") => void;
  onSearchChange: (search: string) => void;
}

/**
 * Component ProductTopBar - Thanh công cụ và tab sản phẩm
 */
export const ProductTopBar: React.FC<ProductTopBarProps> = ({
  activeTab,
  allCount,
  publishedCount,
  draftCount,
  searchProduct,
  onTabChange,
  onSearchChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border mb-6">
      <div className="p-4">
        {/* Nút thêm sản phẩm và thanh tìm kiếm */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-4">
          {/* Nút thêm sản phẩm */}
          <button className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full lg:w-auto">
            <Plus className="w-4 h-4" />
            Thêm sản phẩm
          </button>

          {/* Thanh tìm kiếm sản phẩm */}
          <div className="relative flex-1 lg:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchProduct}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
          </div>
        </div>

        {/* Các tab trạng thái */}
        <div className="flex gap-4 lg:gap-6 overflow-x-auto pb-2 border-b">
          {/* Tab tất cả */}
          <button
            onClick={() => onTabChange("all")}
            className={`pb-2 px-1 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
              activeTab === "all"
                ? "text-blue-600 border-blue-600"
                : "text-gray-600 border-transparent hover:text-gray-900"
            }`}
          >
            Tất cả ({allCount})
          </button>

          {/* Tab đã xuất bản */}
          <button
            onClick={() => onTabChange("published")}
            className={`pb-2 px-1 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
              activeTab === "published"
                ? "text-blue-600 border-blue-600"
                : "text-gray-600 border-transparent hover:text-gray-900"
            }`}
          >
            Đã xuất bản ({publishedCount})
          </button>

          {/* Tab nháp */}
          <button
            onClick={() => onTabChange("draft")}
            className={`pb-2 px-1 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
              activeTab === "draft"
                ? "text-blue-600 border-blue-600"
                : "text-gray-600 border-transparent hover:text-gray-900"
            }`}
          >
            Nháp ({draftCount})
          </button>
        </div>
      </div>
    </div>
  );
};
