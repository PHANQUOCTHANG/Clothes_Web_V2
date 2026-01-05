import { IProduct, IColor } from "@/types/product";

/**
 * Admin Product Management Types
 * Aligned with MongoDB Schema
 */

// Category Type
export interface Category {
  _id: string;
  name: string;
  slug?: string;
  description?: string;
  image?: string;
}

// Color Option Type
export interface ColorOption extends IColor {
  count?: number;
}

// Discount Option Type
export interface DiscountOption {
  label: string;
  min?: number;
  max?: number;
}

// Rating Option Type
export interface RatingOption {
  stars: number;
  label: string;
  count?: number;
}

// Status Type
export type ProductStatus = "active" | "inactive" | "pending";

// Admin Product Type (extended from IProduct)
export interface AdminProduct extends IProduct {
  totalViews?: number;
  totalSales?: number;
  revenue?: number;
}

// Product Filter for Admin
export interface AdminProductFilter {
  status?: ProductStatus;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

// Active Filter Type
export interface ActiveFilter {
  label: string;
  value: string;
  type: "category" | "brand" | "discount" | "rating" | "status";
}

// Expanded Sections State
export interface ExpandedSections {
  categories: boolean;
  discount: boolean;
  rating: boolean;
  status: boolean;
}

// Product Action Type
export type ProductAction = "view" | "edit" | "delete" | "publish" | "draft";

// Bulk Action Type
export interface BulkAction {
  action: "update" | "delete" | "publish" | "draft";
  ids: string[];
  data?: Partial<IProduct>;
}

// Product Stats Type
export interface ProductStats {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  pendingProducts: number;
  averagePrice: number;
  averageRating: number;
  totalRevenue: number;
}
