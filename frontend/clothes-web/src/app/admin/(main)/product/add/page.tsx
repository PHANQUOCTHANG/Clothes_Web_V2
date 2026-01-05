"use client";

/**
 * Trang thêm sản phẩm
 * Sử dụng các component riêng biệt để quản lý state và UI một cách sạch và dễ bảo trì
 */

import React, { useRef } from "react";
import {
  AddProductHeader,
  AddProductForm,
  AddProductSidebar,
  MobileBottomNav,
} from "@/features/admin/add-product/components";
import { useProductForm } from "@/features/admin/add-product/hooks";

/**
 * Component trang thêm sản phẩm
 * Orchestration component kết hợp tất cả sub-components
 */
export default function AddProductPage() {
  // Sử dụng custom hook để quản lý toàn bộ form state
  const {
    // Form data
    formData,
    tags,

    // Validation
    errors,

    // UI state
    activeTab,
    showDatePicker,
    selectedDate,
    currentMonth,
    currentYear,
    isMobileMenuOpen,

    // Methods
    handleInputChange,
    handleTabChange,
    handleValidateField,
    handleSubmit,
    handleAddTag,
    handleRemoveTag,
    handleDateToggle,
    handleDateSelect,
    handleMonthChange,
    handleYearChange,
    handleMobileMenuToggle,
  } = useProductForm();

  const datePickerRef = useRef<HTMLDivElement>(null);

  // Xử lý submit form
  const handleFormSubmit = (status: "draft" | "published") => {
    if (handleSubmit()) {
      console.log("Form submitted with status:", status);
      console.log("Form data:", formData);
      // TODO: Gửi dữ liệu lên server
    }
  };

  // Cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AddProductHeader
        onMenuToggle={handleMobileMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-32 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2">
            <AddProductForm
              activeTab={activeTab}
              formData={formData}
              errors={errors}
              onTabChange={handleTabChange}
              onInputChange={handleInputChange}
              onValidateField={handleValidateField}
              onSubmit={() => handleFormSubmit("published")}
            />
          </div>

          {/* Right: Sidebar */}
          <AddProductSidebar
            selectedDate={selectedDate}
            currentMonth={currentMonth}
            currentYear={currentYear}
            showDatePicker={showDatePicker}
            tags={tags}
            shortDescription={formData.shortDescription}
            onDateToggle={handleDateToggle}
            onDateSelect={handleDateSelect}
            onMonthChange={handleMonthChange}
            onYearChange={handleYearChange}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
            onShortDescriptionChange={(value) =>
              handleInputChange("shortDescription", value)
            }
            datePickerRef={datePickerRef}
          />
        </div>
      </div>

      {/* Mobile bottom navigation */}
      <MobileBottomNav
        onSubmit={handleFormSubmit}
        onScrollToTop={scrollToTop}
      />

      {/* Desktop submit buttons */}
      <div className="hidden lg:flex gap-4 px-4 sm:px-6 py-4 border-t border-gray-200 bg-white justify-end">
        <button
          onClick={() => handleFormSubmit("draft")}
          className="px-6 py-2.5 text-gray-700 border border-gray-300 rounded font-medium hover:bg-gray-50 transition-colors"
        >
          Lưu nháp
        </button>
        <button
          onClick={() => handleFormSubmit("published")}
          className="px-6 py-2.5 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors"
        >
          Xuất bản sản phẩm
        </button>
      </div>
    </div>
  );
}
