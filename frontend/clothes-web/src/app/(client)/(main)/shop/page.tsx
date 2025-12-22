"use client";

import { useState } from "react";
import { ChevronDown, List } from "lucide-react";

// Hằng số và các kiểu dữ liệu
import {
  CATEGORIES,
  SIZES,
  COLORS,
  BRANDS,
  SORT_OPTIONS,
  generateProductList,
  PRODUCTS_PER_PAGE,
  MIN_PRICE,
  MAX_PRICE,
} from "@/features/shop/constants";
import { FilterState, Product } from "@/features/shop/types";

// Components: Các bộ lọc
import { CategoryFilter } from "@/features/shop/components/filters/CategoryFilter";
import { SizeFilter } from "@/features/shop/components/filters/SizeFilter";
import { ColorFilter } from "@/features/shop/components/filters/ColorFilter";
import { PriceFilter } from "@/features/shop/components/filters/PriceFilter";
import { BrandFilter } from "@/features/shop/components/filters/BrandFilter";
import { WishList } from "@/features/shop/components/filters/WishList";
import { ActiveFilters } from "@/features/shop/components/filters/ActiveFilters";

// Components: Danh sách sản phẩm
import { ProductCard } from "@/features/shop/components/products/ProductCard";
import { ProductListViewItem } from "@/features/shop/components/products/ProductListViewItem";
import { AddToCartModal } from "@/features/shop/components/AddToCartModal";
import { QuickViewModal } from "@/components/common/QuickViewModal";

// Components: Tiện ích
import { Pagination } from "@/features/shop/components/Pagination";

const productList = generateProductList();

export default function ShopPage() {
  // State: Chế độ hiển thị (2: danh sách, 3/4/5: lưới cột)
  const [activeView, setActiveView] = useState(4);
  // State: Trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);
  // State: Trạng thái loading khi lọc
  const [isLoading, setIsLoading] = useState(false);

  // State: Modal thêm vào giỏ
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // State: Modal xem nhanh
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProductForQuickView, setSelectedProductForQuickView] =
    useState<Product | null>(null);

  // State: Trạng thái các bộ lọc (mở/đóng)
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);
  const [isColorOpen, setIsColorOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const [isWishListOpen, setIsWishListOpen] = useState(true);

  // State: Giá trị bộ lọc
  const [filters, setFilters] = useState<FilterState>({
    size: [],
    price: { min: MIN_PRICE, max: MAX_PRICE },
    brand: [],
    color: [],
  });

  // Tính toán: Phân trang
  const totalPages = Math.ceil(productList.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = productList.slice(startIndex, endIndex);
  const currentItemsStart = startIndex + 1;
  const currentItemsEnd = Math.min(endIndex, productList.length);

  // Handler: Mở modal thêm vào giỏ
  const openAddToCartModal = (product: Product) => {
    setSelectedProduct(product);
    setIsAddToCartModalOpen(true);
  };

  // Handler: Đóng modal thêm vào giỏ
  const closeAddToCartModal = () => {
    setIsAddToCartModalOpen(false);
    setSelectedProduct(null);
  };

  // Handler: Mở modal xem nhanh
  const handleQuickView = (product: Product) => {
    setSelectedProductForQuickView(product);
    setIsQuickViewOpen(true);
  };

  // Handler: Đóng modal xem nhanh
  const closeQuickViewModal = () => {
    setIsQuickViewOpen(false);
    setSelectedProductForQuickView(null);
  };

  // Handler: Thay đổi bộ lọc
  const handleFilterChange = (type: string, value: unknown) => {
    setIsLoading(true);

    setTimeout(() => {
      setFilters((prev) => {
        if (type === "price") {
          if (value === "reset") {
            return {
              ...prev,
              price: { min: MIN_PRICE, max: MAX_PRICE },
            };
          }
          return { ...prev, price: value as { min: number; max: number } };
        }

        const isSelected = (
          prev[type as keyof FilterState] as unknown[]
        ).includes(value as never);
        return {
          ...prev,
          [type]: isSelected
            ? (prev[type as keyof FilterState] as unknown[]).filter(
                (item) => item !== value
              )
            : [...(prev[type as keyof FilterState] as unknown[]), value],
        };
      });
      setIsLoading(false);
    }, 500);
  };

  // Handler: Xóa tất cả bộ lọc
  const handleClearAll = () => {
    setIsLoading(true);
    setTimeout(() => {
      setFilters({
        size: [],
        price: { min: MIN_PRICE, max: MAX_PRICE },
        brand: [],
        color: [],
      });
      setIsLoading(false);
    }, 500);
  };

  // State: Sắp xếp sản phẩm
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState("position");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Handler: Thay đổi cách sắp xếp
  const handleSortChange = (key: string) => {
    if (currentSort === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setCurrentSort(key);
      setSortDirection("asc");
    }
    setIsSortDropdownOpen(false);
  };

  // Handler: Đảo chiều sắp xếp
  const toggleSortDirection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const currentSortLabel =
    SORT_OPTIONS.find((opt) => opt.key === currentSort)?.label || "Vị trí";

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Modal thêm vào giỏ */}
      {isAddToCartModalOpen && (
        <AddToCartModal
          product={selectedProduct}
          colors={COLORS}
          onClose={closeAddToCartModal}
        />
      )}

      {/* Modal xem nhanh */}
      {isQuickViewOpen && (
        <QuickViewModal
          product={selectedProductForQuickView}
          colors={COLORS}
          onClose={closeQuickViewModal}
        />
      )}

      {/* Phần đầu trang: Tiêu đề "Cửa hàng" */}
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

      {/* Nội dung chính */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cột trái: Sidebar bộ lọc */}
          <div className="w-full lg:w-64 shrink-0">
            <ActiveFilters
              filters={filters}
              onRemove={handleFilterChange}
              onClearAll={handleClearAll}
            />

            <h2 className="text-2xl font-light mb-8 pb-4 border-b border-gray-200">
              Bộ lọc
            </h2>
            <div className="space-y-6">
              {/* Bộ lọc danh mục */}
              <CategoryFilter
                categories={CATEGORIES}
                isOpen={isCategoryOpen}
                onToggle={() => setIsCategoryOpen(!isCategoryOpen)}
              />
              {/* Bộ lọc kích cỡ */}
              <SizeFilter
                sizes={SIZES}
                selectedSizes={filters.size}
                onSelectSize={(size) => handleFilterChange("size", size)}
                isOpen={isSizeOpen}
                onToggle={() => setIsSizeOpen(!isSizeOpen)}
              />
              {/* Bộ lọc màu sắc */}
              <ColorFilter
                colors={COLORS}
                selectedColors={filters.color}
                onSelectColor={(color) => handleFilterChange("color", color)}
                isOpen={isColorOpen}
                onToggle={() => setIsColorOpen(!isColorOpen)}
              />
              {/* Bộ lọc giá */}
              <PriceFilter
                currentRange={filters.price}
                onRangeChange={(range) => handleFilterChange("price", range)}
                isOpen={isPriceOpen}
                onToggle={() => setIsPriceOpen(!isPriceOpen)}
              />
              {/* Bộ lọc thương hiệu */}
              <BrandFilter
                brands={BRANDS}
                selectedBrands={filters.brand}
                onSelectBrand={(brand) => handleFilterChange("brand", brand)}
                isOpen={isBrandOpen}
                onToggle={() => setIsBrandOpen(!isBrandOpen)}
              />
              {/* Danh sách yêu thích */}
              <WishList
                isOpen={isWishListOpen}
                onToggle={() => setIsWishListOpen(!isWishListOpen)}
              />
            </div>
          </div>

          {/* Cột phải: Khu vực sản phẩm */}
          <div className="grow relative">
            {/* Overlay loading */}
            {isLoading && (
              <div className="absolute inset-0 bg-white/70 z-40 flex items-center justify-center transition-opacity duration-300 opacity-100">
                <div className="w-12 h-12 border-4 border-black border-t-transparent border-solid rounded-full animate-spin"></div>
              </div>
            )}

            {/* Thanh điều khiển: Sắp xếp, chế độ xem */}
            <div
              className={`flex justify-between items-center pb-6 border-b border-gray-200 mb-8 transition-opacity duration-500 ${
                isLoading ? "opacity-50" : "opacity-100"
              }`}
            >
              <p className="text-sm text-gray-600">
                Hiển thị {currentItemsStart}-{currentItemsEnd} trong số{" "}
                {productList.length} sản phẩm
              </p>

              <div className="flex items-center space-x-6">
                {/* Dropdown sắp xếp */}
                <div className="flex items-center space-x-0">
                  <div className="relative inline-block text-left z-30">
                    <button
                      onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                      className="flex items-center text-sm text-gray-600 focus:outline-none"
                    >
                      <span className="mr-2">{currentSortLabel}</span>
                      <ChevronDown
                        size={16}
                        className={`text-gray-500 transition-transform ${
                          isSortDropdownOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>
                    {isSortDropdownOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 z-30">
                        <div className="py-1">
                          {SORT_OPTIONS.map((option) => (
                            <button
                              key={option.key}
                              onClick={() => handleSortChange(option.key)}
                              className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
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
                    )}
                  </div>

                  {/* Nút đảo chiều sắp xếp */}
                  <button
                    onClick={toggleSortDirection}
                    className={`text-gray-500 transition-transform ${
                      sortDirection === "asc" ? "rotate-180" : "rotate-0"
                    }`}
                    aria-label={`Sắp xếp ${
                      sortDirection === "asc" ? "Giảm dần" : "Tăng dần"
                    }`}
                  >
                    <ChevronDown size={16} />
                  </button>
                </div>

                {/* Nút chọn chế độ xem (danh sách, lưới 3/4/5 cột) */}
                <div className="flex items-center space-x-1 border border-gray-300 rounded-lg p-1">
                  {/* Chế độ xem danh sách */}
                  <button
                    onClick={() => setActiveView(2)}
                    className={`p-1 rounded-md transition duration-150 ${
                      activeView === 2
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    aria-label="Xem dạng danh sách"
                  >
                    <List size={20} />
                  </button>
                  {/* Chế độ xem lưới 3 cột */}
                  <button
                    onClick={() => setActiveView(3)}
                    className={`p-1 rounded-md transition duration-150 ${
                      activeView === 3
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    aria-label="Xem dạng lưới 3 cột"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="6" height="18" />
                      <rect x="9" y="3" width="6" height="18" />
                      <rect x="15" y="3" width="6" height="18" />
                    </svg>
                  </button>
                  {/* Chế độ xem lưới 4 cột */}
                  <button
                    onClick={() => setActiveView(4)}
                    className={`p-1 rounded-md transition duration-150 ${
                      activeView === 4
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    aria-label="Xem dạng lưới 4 cột"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="5" height="18" />
                      <rect x="8" y="3" width="5" height="18" />
                      <rect x="13" y="3" width="5" height="18" />
                      <rect x="18" y="3" width="3" height="18" />
                    </svg>
                  </button>
                  {/* Chế độ xem lưới 5 cột */}
                  <button
                    onClick={() => setActiveView(5)}
                    className={`p-1 rounded-md transition duration-150 ${
                      activeView === 5
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    aria-label="Xem dạng lưới 5 cột"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="3" height="18" />
                      <rect x="6" y="3" width="3" height="18" />
                      <rect x="9" y="3" width="3" height="18" />
                      <rect x="12" y="3" width="3" height="18" />
                      <rect x="15" y="3" width="6" height="18" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Lưới/Danh sách sản phẩm */}
            <div
              className={`transition-opacity duration-500 ${
                isLoading ? "opacity-50" : "opacity-100"
              }`}
            >
              {activeView === 2 ? (
                // Hiển thị dạng danh sách
                <div className="space-y-10">
                  {currentProducts.map((product) => (
                    <ProductListViewItem
                      key={product.id}
                      product={product}
                      onAddToCart={openAddToCartModal}
                      onQuickView={handleQuickView}
                    />
                  ))}
                </div>
              ) : (
                // Hiển thị dạng lưới
                <div
                  className={`grid gap-x-6 gap-y-10 ${
                    activeView === 3
                      ? "grid-cols-3"
                      : activeView === 5
                      ? "grid-cols-5"
                      : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  }`}
                >
                  {currentProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={openAddToCartModal}
                      onQuickView={handleQuickView}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Phân trang */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
