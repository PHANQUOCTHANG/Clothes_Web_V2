"use client";

import {
  COLORS,
  SORT_OPTIONS,
  CATEGORIES,
  SIZES,
} from "@/features/client/shop/constants";
import { useShopPage } from "@/features/client/shop/hooks/useShopPage";

// Filters
import { CategoryFilter } from "@/features/client/shop/components/filters/CategoryFilter";
import { SizeFilter } from "@/features/client/shop/components/filters/SizeFilter";
import { ColorFilter } from "@/features/client/shop/components/filters/ColorFilter";
import { PriceFilter } from "@/features/client/shop/components/filters/PriceFilter";
import { WishList } from "@/features/client/shop/components/filters/WishList";
import { ActiveFilters } from "@/features/client/shop/components/filters/ActiveFilters";

// Products
import { ProductCard } from "@/features/client/shop/components/products/ProductCard";
import { ProductListViewItem } from "@/features/client/shop/components/products/ProductListViewItem";
import { AddToCartModal } from "@/features/client/shop/components/AddToCartModal";
import { QuickViewModal } from "@/components/common/QuickViewModal";
import { Pagination } from "@/components/ui/Pagination";

import {
  ChevronDown,
  List,
  LayoutGrid,
  Columns3,
  Columns4,
} from "lucide-react";

/**
 * Shop Page
 * - Chỉ orchestration
 * - Gọi 1 compose hook duy nhất
 * - Render components với data từ hook
 */
export default function ShopPage() {
  // Gọi compose hook - tất cả state đều từ đây
  const shopState = useShopPage();

  const {
    displayedProducts,
    isLoading,
    products: allProducts,
    filters,
    handleFilterChange,
    handleClearFilters,
    currentSort,
    sortDirection,
    handleSortChange,
    toggleSortDirection,
    currentPage,
    totalPages,
    goToPage,
    currentItemsStart,
    currentItemsEnd,
    gridColsClass,
    changeViewMode,
    viewMode: activeView,
    openAddToCartModal,
    closeAddToCartModal,
    isAddToCartModalOpen,
    selectedProduct,
    openQuickViewModal,
    closeQuickViewModal,
    isQuickViewOpen,
    selectedProductForQuickView,
    filterAccordion: {
      isCategoryOpen,
      isSizeOpen,
      isColorOpen,
      isPriceOpen,
      isWishListOpen,
      toggleCategory,
      toggleSize,
      toggleColor,
      togglePrice,
      toggleWishList,
    },
  } = shopState;

  console.log("TotalPages", totalPages);
  const currentSortLabel =
    SORT_OPTIONS.find((opt) => opt.key === currentSort)?.label || "Vị trí";

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Modal */}
      {isAddToCartModalOpen && (
        <AddToCartModal
          product={selectedProduct}
          onClose={closeAddToCartModal}
        />
      )}
      {isQuickViewOpen && (
        <QuickViewModal
          product={selectedProductForQuickView}
          onClose={closeQuickViewModal}
        />
      )}

      {/* Header */}
      <header className="py-10 border-b border-gray-100 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-light tracking-wide mb-2">Cửa hàng</h1>
            <p className="text-sm text-gray-500">
              <span className="hover:text-black cursor-pointer">Trang chủ</span>
              <span className="mx-2">&gt;</span>
              <span className="font-medium text-gray-800">Cửa hàng</span>
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="w-full lg:w-64 shrink-0">
            <ActiveFilters
              filters={filters}
              onRemove={handleFilterChange}
              onClearAll={handleClearFilters}
            />

            <h2 className="text-2xl font-light mb-8 pb-4 border-b border-gray-200">
              Bộ lọc
            </h2>
            <div className="space-y-6">
              <CategoryFilter
                categories={CATEGORIES}
                selectedCategories={filters.category}
                onSelectCategory={(category) =>
                  handleFilterChange("category", category)
                }
                isOpen={isCategoryOpen}
                onToggle={toggleCategory}
              />
              <SizeFilter
                sizes={SIZES}
                selectedSizes={filters.size}
                onSelectSize={(size) => handleFilterChange("size", size)}
                isOpen={isSizeOpen}
                onToggle={toggleSize}
              />
              <ColorFilter
                colors={COLORS}
                selectedColors={filters.color}
                onSelectColor={(color) => handleFilterChange("color", color)}
                isOpen={isColorOpen}
                onToggle={toggleColor}
              />
              <PriceFilter
                currentRange={filters.price}
                onRangeChange={(range) => handleFilterChange("price", range)}
                isOpen={isPriceOpen}
                onToggle={togglePrice}
              />
              <WishList isOpen={isWishListOpen} onToggle={toggleWishList} />
            </div>
          </div>

          {/* Products */}
          <div className="grow relative">
            {/* Loading */}
            {isLoading && (
              <div className="absolute inset-0 bg-white/70 z-40 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* Toolbar */}
            <div
              className={`flex justify-between items-center pb-6 border-b border-gray-200 mb-8 transition-opacity ${
                isLoading ? "opacity-50" : "opacity-100"
              }`}
            >
              {allProducts.length > 0 && (
                <p className="text-sm text-gray-600">
                  Hiển thị{" "}
                  {displayedProducts.length === 0 ? 0 : currentItemsStart}-
                  {currentItemsEnd} trong số {allProducts.length} sản phẩm
                </p>
              )}

              <div className="flex items-center space-x-6">
                {/* Sort */}
                <div className="relative inline-block text-left z-30">
                  <button
                    onClick={() => {}}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <span className="mr-2">{currentSortLabel}</span>
                    <ChevronDown size={16} />
                  </button>
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 z-30 hidden">
                    {SORT_OPTIONS.map((option) => (
                      <button
                        key={option.key}
                        onClick={() => handleSortChange(option.key)}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                          currentSort === option.key
                            ? "bg-blue-600 text-white font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direction */}
                <button
                  onClick={toggleSortDirection}
                  className={`text-gray-500 transition-transform ${
                    sortDirection === "asc" ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <ChevronDown size={16} />
                </button>

                {/* View */}
                <div className="flex items-center space-x-1 border border-gray-300 rounded-lg p-1">
                  <button
                    onClick={() => changeViewMode(2)}
                    className={`p-1.5 rounded-md transition ${
                      activeView === 2
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    title="Danh sách"
                    aria-label="List view"
                  >
                    <List size={18} />
                  </button>
                  <button
                    onClick={() => changeViewMode(4)}
                    className={`p-1.5 rounded-md transition ${
                      activeView === 4
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    title="Lưới 4 cột"
                    aria-label="4 columns grid"
                  >
                    <Columns4 size={18} />
                  </button>
                  <button
                    onClick={() => changeViewMode(3)}
                    className={`p-1.5 rounded-md transition ${
                      activeView === 3
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    title="Lưới 3 cột"
                    aria-label="3 columns grid"
                  >
                    <Columns3 size={18} />
                  </button>
                  <button
                    onClick={() => changeViewMode(5)}
                    className={`p-1.5 rounded-md transition ${
                      activeView === 5
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    title="Lưới 5 cột"
                    aria-label="5 columns grid"
                  >
                    <LayoutGrid size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div
              className={`transition-opacity ${
                isLoading ? "opacity-50" : "opacity-100"
              }`}
            >
              {displayedProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <h3 className="text-xl font-light text-gray-600 mb-2">
                    Không tìm thấy sản phẩm
                  </h3>
                  <p className="text-gray-500 text-center max-w-md mb-6">
                    Rất tiếc, không có sản phẩm nào phù hợp với bộ lọc của bạn.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    Xóa tất cả bộ lọc
                  </button>
                </div>
              ) : activeView === 2 ? (
                <div className="space-y-10">
                  {displayedProducts.map((product) => (
                    <ProductListViewItem
                      key={product.id}
                      product={product}
                      onAddToCart={openAddToCartModal}
                      onQuickView={openQuickViewModal}
                    />
                  ))}
                </div>
              ) : (
                <div className={`grid gap-x-6 gap-y-10 ${gridColsClass}`}>
                  {displayedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={openAddToCartModal}
                      onQuickView={openQuickViewModal}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {displayedProducts.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
