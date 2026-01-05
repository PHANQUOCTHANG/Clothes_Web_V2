/**
 * Component form chính
 */

import React from "react";
import { Upload } from "lucide-react";
import { FormInputField } from "./FormInputField";
import type { TabType, ProductFormData, FormErrors } from "../types";

interface AddProductFormProps {
  // Dữ liệu
  activeTab: TabType;
  formData: ProductFormData;
  errors: FormErrors;

  // Hàm callback
  onTabChange: (tab: TabType) => void;
  onInputChange: (field: keyof ProductFormData, value: string) => void;
  onValidateField: (field: keyof ProductFormData) => void;
  onSubmit: () => void;
}

/**
 * Component AddProductForm - Form chính thêm sản phẩm
 */
export const AddProductForm: React.FC<AddProductFormProps> = ({
  activeTab,
  formData,
  errors,
  onTabChange,
  onInputChange,
  onValidateField,
  onSubmit,
}) => {
  return (
    <div className="lg:col-span-2 space-y-4 sm:space-y-6">
      {/* Product Title */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <FormInputField
          label="Tiêu đề sản phẩm"
          placeholder="Nhập tiêu đề sản phẩm"
          value={formData.productTitle}
          error={errors.productTitle}
          errorMessage="Vui lòng nhập tiêu đề sản phẩm."
          onChange={(value) => onInputChange("productTitle", value)}
          onBlur={() => onValidateField("productTitle")}
        />
      </div>

      {/* Product Description */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
          Mô tả sản phẩm
        </label>

        {/* Toolbar */}
        <div className="border border-gray-300 rounded-t bg-white px-1 sm:px-2 py-1.5 flex items-center gap-0.5 sm:gap-1 flex-wrap overflow-x-auto">
          {/* Undo button */}
          <button className="p-1 sm:p-1.5 hover:bg-gray-100 rounded text-xs sm:text-sm">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              />
            </svg>
          </button>

          {/* Redo button */}
          <button className="p-1 sm:p-1.5 hover:bg-gray-100 rounded text-xs sm:text-sm">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6-6m6 6l-6 6"
              />
            </svg>
          </button>

          {/* Paragraph dropdown */}
          <select className="px-1 sm:px-2 py-1 border border-gray-300 rounded text-xs sm:text-sm text-gray-700 bg-white min-w-20">
            <option>Đoạn văn</option>
          </select>

          {/* Divider */}
          <div className="w-px h-4 sm:h-5 bg-gray-300 mx-0.5 sm:mx-1"></div>

          {/* Bold button */}
          <button className="p-1 sm:p-1.5 hover:bg-gray-100 rounded font-bold text-gray-700 text-xs sm:text-sm">
            B
          </button>

          {/* Italic button */}
          <button className="p-1 sm:p-1.5 hover:bg-gray-100 rounded italic text-gray-700 text-xs sm:text-sm">
            I
          </button>

          {/* Link button */}
          <button className="p-1 sm:p-1.5 hover:bg-gray-100 rounded text-xs sm:text-sm">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </button>

          {/* Image button */}
          <button className="p-1 sm:p-1.5 hover:bg-gray-100 rounded text-xs sm:text-sm">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>

          {/* Grid button */}
          <button className="p-1 sm:p-1.5 hover:bg-gray-100 rounded text-xs sm:text-sm">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
              />
            </svg>
          </button>
        </div>

        {/* Text Area */}
        <div className="border border-t-0 border-gray-300 rounded-b p-3 sm:p-4 bg-white min-h-[150px] sm:min-h-[200px] text-sm">
          <p className="text-gray-800 leading-relaxed mb-3 text-xs sm:text-sm">
            Áo hoodie kẻ sọc hồng nam Tommy Hilfiger. Được làm từ cotton. Thành
            phần vật liệu là 100% cotton hữu cơ. Đây là một trong những thương
            hiệu thiết kế phong cách sống hàng đầu thế giới và được công nhận
            quốc tế vì tôn vinh bản chất của phong cách cổ điển Mỹ mát mẻ.
          </p>
          <ul className="list-disc ml-4 sm:ml-5 text-gray-800 space-y-1 text-xs sm:text-sm">
            <li>Tay dài</li>
            <li>Chất liệu cotton</li>
            <li>Có đủ các kích cỡ</li>
            <li>4 màu khác nhau</li>
          </ul>
        </div>
      </div>

      {/* Product Gallery */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4 sm:mb-6">
          Thư viện sản phẩm
        </h2>

        {/* Product Image */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hình ảnh sản phẩm
          </label>
          <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
            Thêm hình ảnh chính của sản phẩm.
          </p>
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        {/* Product Gallery */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Thư viện hình ảnh
          </label>
          <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
            Thêm các hình ảnh vào thư viện sản phẩm.
          </p>
          <div className="border-2 border-dashed border-gray-300 rounded bg-gray-50 p-8 sm:p-12 md:p-16 text-center cursor-pointer hover:border-gray-400 transition-colors">
            <div className="flex flex-col items-center">
              <Upload className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400 mb-2" />
              <p className="text-gray-600 text-xs sm:text-sm">
                Kéo thả file vào đây hoặc nhấp để tải lên.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                PNG, JPG, GIF (max. 10MB)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* General Info / Meta Data Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200 overflow-x-auto">
          <div className="flex min-w-max">
            <button
              onClick={() => onTabChange("general")}
              className={`px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "general"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600 border-transparent hover:text-gray-800"
              }`}
            >
              Thông tin chung
            </button>
            <button
              onClick={() => onTabChange("meta")}
              className={`px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "meta"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600 border-transparent hover:text-gray-800"
              }`}
            >
              Meta Data
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6">
          {/* Manufacturer Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <FormInputField
              label="Tên nhà sản xuất"
              placeholder="Nhập tên nhà sản xuất"
              value={formData.manufacturerName}
              error={errors.manufacturerName}
              onChange={(value) => onInputChange("manufacturerName", value)}
              onBlur={() => onValidateField("manufacturerName")}
            />
            <FormInputField
              label="Thương hiệu nhà sản xuất"
              placeholder="Nhập thương hiệu nhà sản xuất"
              value={formData.manufacturerBrand}
              error={errors.manufacturerBrand}
              onChange={(value) => onInputChange("manufacturerBrand", value)}
              onBlur={() => onValidateField("manufacturerBrand")}
            />
          </div>

          {/* Stocks, Price, Discount, Orders */}
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <FormInputField
              label="Số lượng trong kho"
              placeholder="Số lượng"
              value={formData.stocks}
              error={errors.stocks}
              errorMessage="Vui lòng nhập số lượng sản phẩm."
              onChange={(value) => onInputChange("stocks", value)}
              onBlur={() => onValidateField("stocks")}
            />
            <FormInputField
              label="Giá"
              placeholder="Nhập giá"
              prefix="$"
              value={formData.price}
              error={errors.price}
              errorMessage="Vui lòng nhập giá sản phẩm."
              onChange={(value) => onInputChange("price", value)}
              onBlur={() => onValidateField("price")}
            />
            <FormInputField
              label="Giảm giá"
              placeholder="Nhập % giảm giá"
              prefix="%"
              value={formData.discount}
              onChange={(value) => onInputChange("discount", value)}
            />
            <FormInputField
              label="Đơn hàng"
              placeholder="Số đơn hàng"
              value={formData.orders}
              error={errors.orders}
              errorMessage="Vui lòng nhập số đơn hàng."
              onChange={(value) => onInputChange("orders", value)}
              onBlur={() => onValidateField("orders")}
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pb-4 sm:pb-6">
        <button
          onClick={onSubmit}
          className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-2.5 rounded text-sm font-medium transition-colors shadow-sm hover:shadow-md"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};
