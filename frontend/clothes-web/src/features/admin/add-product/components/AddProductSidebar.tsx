/**
 * Component sidebar chứa các tùy chọn xuất bản
 */

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { FormTextarea } from "./FormTextarea";
import { DatePicker } from "./DatePicker";
import type { ProductTag } from "../types";

interface AddProductSidebarProps {
  // Dữ liệu
  selectedDate: string;
  currentMonth: number;
  currentYear: number;
  showDatePicker: boolean;
  tags: ProductTag[];
  shortDescription: string;

  // Hàm callback
  onDateToggle: (show: boolean) => void;
  onDateSelect: (day: number) => void;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tagId: string) => void;
  onShortDescriptionChange: (value: string) => void;
  datePickerRef?: React.RefObject<HTMLDivElement | null>;
}

/**
 * Component AddProductSidebar - Sidebar với tùy chọn xuất bản
 */
export const AddProductSidebar: React.FC<AddProductSidebarProps> = ({
  selectedDate,
  currentMonth,
  currentYear,
  showDatePicker,
  tags,
  shortDescription,
  onDateToggle,
  onDateSelect,
  onMonthChange,
  onYearChange,
  onAddTag: _onAddTag,
  onRemoveTag,
  onShortDescriptionChange,
  datePickerRef,
}) => {
  // TODO: Implement tag adding functionality
  const handleAddTag = () => {
    // TODO: Show dialog to add new tag
    // For now, this is a placeholder for future implementation
  };
  // Xử lý click ra ngoài date picker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showDatePicker &&
        datePickerRef?.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        onDateToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDatePicker, onDateToggle, datePickerRef]);

  return (
    <div className="lg:col-span-1 space-y-4 sm:space-y-6">
      {/* Publish */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-3 sm:mb-4">
          Xuất bản
        </h2>

        <div className="space-y-3 sm:space-y-4">
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Trạng thái
            </label>
            <select className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors">
              <option>Đã xuất bản</option>
              <option>Bản nháp</option>
              <option>Đang chờ</option>
            </select>
          </div>

          {/* Visibility */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Hiển thị
            </label>
            <select className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors">
              <option>Công khai</option>
              <option>Riêng tư</option>
            </select>
          </div>
        </div>
      </div>

      {/* Publish Schedule */}
      <div
        className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6"
        ref={datePickerRef}
      >
        <h2 className="text-base font-semibold text-gray-800 mb-3 sm:mb-4">
          Lịch xuất bản
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            Ngày & Giờ xuất bản
          </label>
          <DatePicker
            selectedDate={selectedDate}
            currentMonth={currentMonth}
            currentYear={currentYear}
            isOpen={showDatePicker}
            onDateSelect={onDateSelect}
            onMonthChange={onMonthChange}
            onYearChange={onYearChange}
            onToggle={onDateToggle}
          />
        </div>
      </div>

      {/* Product Categories */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className="text-base font-semibold text-gray-800">
            Danh mục sản phẩm
          </h2>
          <button className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium transition-colors">
            Thêm mới
          </button>
        </div>

        <div>
          <label className="block text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
            Chọn danh mục sản phẩm
          </label>
          <select className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors">
            <option>Thiết bị gia dụng</option>
            <option>Điện tử</option>
            <option>Thời trang</option>
          </select>
        </div>
      </div>

      {/* Product Tags */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-3 sm:mb-4">
          Thẻ sản phẩm
        </h2>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center gap-1 bg-blue-500 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition-colors"
            >
              {tag.name}
              <button
                onClick={() => onRemoveTag(tag.id)}
                className="hover:bg-blue-600 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </span>
          ))}
          <button
            onClick={handleAddTag}
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs sm:text-sm"
          >
            + Thêm thẻ
          </button>
        </div>
      </div>

      {/* Product Short Description */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-3 sm:mb-4">
          Mô tả ngắn sản phẩm
        </h2>

        <FormTextarea
          label="Mô tả"
          placeholder="Phải nhập ít nhất 100 ký tự"
          value={shortDescription}
          minLength={100}
          onChange={onShortDescriptionChange}
        />
      </div>
    </div>
  );
};
