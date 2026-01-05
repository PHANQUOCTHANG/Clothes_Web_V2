"use client";

/**
 * Trang quản lý sản phẩm - Admin
 * Tổ chức: Component + Hook + Type
 * Chức năng: Hiển thị, lọc, tìm kiếm sản phẩm
 */

import React, { useState, useRef, useEffect } from "react";
import type {
  Category,
  DiscountOption,
  RatingOption,
  Product,
  ProductAction,
} from "@/features/admin/product/types";
import { useProductFilters } from "@/features/admin/product/hooks/useProductFilters";
import { ProductHeader } from "@/features/admin/product/components/ProductHeader";
import { FilterSidebar } from "@/features/admin/product/components/FilterSidebar";
import { MobileFilters } from "@/features/admin/product/components/MobileFilters";
import { ProductTopBar } from "@/features/admin/product/components/ProductTopBar";
import { ProductsTable } from "@/features/admin/product/components/ProductsTable";
import { ActiveFiltersBar } from "@/features/admin/product/components/ActiveFiltersBar";
import { Pagination } from "@/features/admin/product/components/Pagination";

// ============= DỮ LIỆU TĨNH =============

/** Danh sách các danh mục sản phẩm */
const CATEGORIES: Category[] = [
  { name: "Thực phẩm", count: null },
  { name: "Thời trang", count: 5 },
  { name: "Đồng hồ", count: null },
  { name: "Điện tử", count: 5 },
  { name: "Nội thất", count: 6 },
  { name: "Phụ tùng ô tô", count: null },
  { name: "Thiết bị gia dụng", count: 7 },
  { name: "Đồ trẻ em", count: null },
];

/** Danh sách tất cả các thương hiệu */
const ALL_BRANDS: string[] = [
  "Boat",
  "OnePlus",
  "Realme",
  "Sony",
  "JBL",
  "Samsung",
  "Apple",
  "Xiaomi",
  "LG",
  "Panasonic",
];

/** Danh sách các mức giảm giá */
const DISCOUNT_OPTIONS: DiscountOption[] = [
  { label: "50% hoặc hơn" },
  { label: "40% hoặc hơn" },
  { label: "30% hoặc hơn" },
  { label: "20% hoặc hơn" },
  { label: "10% hoặc hơn" },
  { label: "Ít hơn 10%" },
];

/** Danh sách các mức đánh giá */
const RATING_OPTIONS: RatingOption[] = [
  { stars: 4, label: "4 sao trở lên" },
  { stars: 3, label: "3 sao trở lên" },
  { stars: 2, label: "2 sao trở lên" },
  { stars: 1, label: "1 sao" },
];

/** Danh sách sản phẩm mẫu */
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Áo thun cổ tròn tay ngắn",
    category: "Thời trang",
    image: "👕",
    stock: 12,
    price: 215.0,
    orders: 48,
    rating: 4.2,
    published: "12/10/2021",
    time: "10:05 AM",
    color: "bg-red-100",
    status: "published",
  },
  {
    id: 2,
    name: "Ghế Pashe Urban Ladder",
    category: "Nội thất",
    image: "🪑",
    stock: 6,
    price: 160.0,
    orders: 30,
    rating: 4.3,
    published: "06/01/2021",
    time: "01:31 PM",
    color: "bg-gray-100",
    status: "published",
  },
  {
    id: 3,
    name: "Hũ đựng thực phẩm thủy tinh 350ml",
    category: "Thực phẩm",
    image: "🫙",
    stock: 10,
    price: 125.0,
    orders: 48,
    rating: 4.5,
    published: "26/03/2021",
    time: "11:40 AM",
    color: "bg-orange-100",
    status: "published",
  },
  {
    id: 4,
    name: "Ghế phòng khách hai tông màu vải",
    category: "Nội thất",
    image: "🪑",
    stock: 15,
    price: 340.0,
    orders: 40,
    rating: 4.2,
    published: "19/04/2021",
    time: "02:51 PM",
    color: "bg-gray-100",
    status: "published",
  },
  {
    id: 5,
    name: "Mũ bảo hiểm Crux Motorsports",
    category: "Phụ tùng ô tô",
    image: "🪖",
    stock: 8,
    price: 175.0,
    orders: 55,
    rating: 4.4,
    published: "30/03/2021",
    time: "09:42 AM",
    color: "bg-green-100",
    status: "draft",
  },
  {
    id: 6,
    name: "Áo thun tay ngắn (Xanh dương)",
    category: "Thời trang",
    image: "👕",
    stock: 15,
    price: 225.0,
    orders: 48,
    rating: 4.2,
    published: "12/10/2021",
    time: "04:55 PM",
    color: "bg-blue-100",
    status: "published",
  },
  {
    id: 7,
    name: "Đồng hồ thông minh Noise Evolve",
    category: "Đồng hồ",
    image: "⌚",
    stock: 12,
    price: 105.0,
    orders: 45,
    rating: 4.3,
    published: "15/05/2021",
    time: "03:40 PM",
    color: "bg-purple-100",
    status: "draft",
  },
  {
    id: 8,
    name: "Áo khoác nỉ nam (Hồng)",
    category: "Thời trang",
    image: "🧥",
    stock: 20,
    price: 120.0,
    orders: 48,
    rating: 4.2,
    published: "21/06/2021",
    time: "12:18 PM",
    color: "bg-pink-100",
    status: "draft",
  },
  {
    id: 9,
    name: "Cốc cà phê tái sử dụng sinh thái",
    category: "Thực phẩm",
    image: "☕",
    stock: 14,
    price: 325.0,
    orders: 55,
    rating: 4.3,
    published: "15/01/2021",
    time: "10:29 PM",
    color: "bg-orange-50",
    status: "draft",
  },
  {
    id: 10,
    name: "Túi đeo chéo du lịch",
    category: "Đồ trẻ em",
    image: "🎒",
    stock: 20,
    price: 180.0,
    orders: 60,
    rating: 4.3,
    published: "15/06/2021",
    time: "03:51 PM",
    color: "bg-gray-800",
    status: "draft",
  },
];

const ITEMS_PER_PAGE = 10;

// ============= MAIN COMPONENT =============

/**
 * ProductsPage - Trang quản lý sản phẩm
 * Chứa logic chính, quản lý state và lắp ráp các component con
 */
const ProductsPage = () => {
  // ===== HOOK QUẢN LÝ BỘ LỌC =====
  const {
    priceRange,
    selectedBrands,
    selectedCategory,
    selectedDiscount,
    selectedRating,
    searchBrand,
    searchProduct,
    expandedSections,
    setPriceRange,
    setSelectedBrands,
    setSelectedCategory,
    setSelectedDiscount,
    setSelectedRating,
    setSearchBrand,
    setSearchProduct,
    toggleBrand,
    toggleSection,
    removeFilter,
    clearAllFilters,
    getActiveFilters,
  } = useProductFilters();

  // ===== STATE CỤC BỘ =====
  const [activeTab, setActiveTab] = useState<"all" | "published" | "draft">(
    "all"
  );
  const [openActionMenu, setOpenActionMenu] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // ===== REFS =====
  const mobileFiltersRef = useRef<HTMLDivElement>(null);

  // ===== EFFECTS =====

  /**
   * Đóng bộ lọc mobile khi thay đổi kích thước màn hình
   */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowMobileFilters(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * Đóng bộ lọc mobile khi click ra ngoài
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showMobileFilters &&
        mobileFiltersRef.current &&
        !mobileFiltersRef.current.contains(event.target as Node)
      ) {
        setShowMobileFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMobileFilters]);

  // ===== LOGIC LỌC SẢN PHẨM =====

  /**
   * Lọc sản phẩm dựa trên tìm kiếm và tab
   */
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchProduct.toLowerCase());
    const matchesTab = activeTab === "all" || product.status === activeTab;
    return matchesSearch && matchesTab;
  });

  /**
   * Tính số lượng sản phẩm theo trạng thái
   */
  const allCount = PRODUCTS.length;
  const publishedCount = PRODUCTS.filter(
    (p) => p.status === "published"
  ).length;
  const draftCount = PRODUCTS.filter((p) => p.status === "draft").length;

  /**
   * Tính số trang
   */
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  /**
   * Lấy sản phẩm cho trang hiện tại
   */
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // ===== HÀM XỬ LÝ HÀNH ĐỘNG =====

  /**
   * Xử lý hành động trên sản phẩm (Xem, Sửa, Xóa)
   */
  const handleActionClick = (productId: number, action: ProductAction) => {
    setOpenActionMenu(null);

    switch (action) {
      case "view":
        alert(`Xem sản phẩm #${productId}`);
        break;
      case "edit":
        alert(`Chỉnh sửa sản phẩm #${productId}`);
        break;
      case "delete":
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
          alert(`Đã xóa sản phẩm #${productId}`);
        }
        break;
    }
  };

  // ===== RENDER =====

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <ProductHeader onFilterClick={() => setShowMobileFilters(true)} />

      <div className="flex flex-col lg:flex-row">
        {/* Desktop Sidebar - Filters */}
        <FilterSidebar
          categories={CATEGORIES}
          allBrands={ALL_BRANDS}
          discountOptions={DISCOUNT_OPTIONS}
          ratingOptions={RATING_OPTIONS}
          activeFilters={getActiveFilters()}
          priceRange={priceRange}
          selectedBrands={selectedBrands}
          selectedCategory={selectedCategory}
          selectedDiscount={selectedDiscount}
          selectedRating={selectedRating}
          searchBrand={searchBrand}
          expandedSections={expandedSections}
          onPriceChange={setPriceRange}
          onBrandToggle={toggleBrand}
          onCategorySelect={setSelectedCategory}
          onDiscountSelect={setSelectedDiscount}
          onRatingSelect={setSelectedRating}
          onSearchBrand={setSearchBrand}
          onToggleSection={toggleSection}
          onRemoveFilter={removeFilter}
          onClearAllFilters={clearAllFilters}
        />

        {/* Mobile Filters */}
        <MobileFilters
          isOpen={showMobileFilters}
          categories={CATEGORIES}
          allBrands={ALL_BRANDS}
          discountOptions={DISCOUNT_OPTIONS}
          ratingOptions={RATING_OPTIONS}
          activeFilters={getActiveFilters()}
          priceRange={priceRange}
          selectedBrands={selectedBrands}
          selectedCategory={selectedCategory}
          selectedDiscount={selectedDiscount}
          selectedRating={selectedRating}
          searchBrand={searchBrand}
          expandedSections={expandedSections}
          onClose={() => setShowMobileFilters(false)}
          onPriceChange={setPriceRange}
          onBrandToggle={toggleBrand}
          onCategorySelect={setSelectedCategory}
          onDiscountSelect={setSelectedDiscount}
          onRatingSelect={setSelectedRating}
          onSearchBrand={setSearchBrand}
          onToggleSection={toggleSection}
          onRemoveFilter={removeFilter}
          onClearAllFilters={clearAllFilters}
          mobileFiltersRef={mobileFiltersRef}
        />

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6">
          {/* Top Bar */}
          <ProductTopBar
            activeTab={activeTab}
            allCount={allCount}
            publishedCount={publishedCount}
            draftCount={draftCount}
            searchProduct={searchProduct}
            onTabChange={setActiveTab}
            onSearchChange={setSearchProduct}
          />

          {/* Products Section */}
          <div className="bg-white rounded-lg shadow-sm border">
            {/* Active Filters Bar - Mobile */}
            <ActiveFiltersBar
              activeFilters={getActiveFilters()}
              onRemoveFilter={removeFilter}
            />

            {/* Products Table */}
            <ProductsTable
              products={paginatedProducts}
              openActionMenu={openActionMenu}
              onActionMenuToggle={setOpenActionMenu}
              onActionClick={handleActionClick}
            />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={ITEMS_PER_PAGE}
              totalItems={filteredProducts.length}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
