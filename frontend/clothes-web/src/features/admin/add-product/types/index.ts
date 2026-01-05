/**
 * Các kiểu dữ liệu cho module thêm/chỉnh sửa sản phẩm
 */

// Dữ liệu form chính
export interface ProductFormData {
  productTitle: string;
  manufacturerName: string;
  manufacturerBrand: string;
  stocks: string;
  price: string;
  discount: string;
  orders: string;
  shortDescription: string;
}

// Các lỗi validation
export interface FormErrors {
  [key: string]: boolean;
}

// Trạng thái form
export type FormStatus = "idle" | "publishing" | "draft" | "pending";

// Tùy chọn publish
export interface PublishOptions {
  status: FormStatus;
  visibility: "public" | "private";
  publishDate: string;
}

// Tags sản phẩm
export interface ProductTag {
  id: string;
  name: string;
}

// Danh sách tab
export type TabType = "general" | "meta";
