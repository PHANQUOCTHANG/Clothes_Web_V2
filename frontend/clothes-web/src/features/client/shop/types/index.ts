import { IProduct } from "@/types/product";

/**
 * Shop Feature Types
 * Aligned with Product Schema
 */

// Product Display Type (with calculated fields)
export interface Product extends IProduct {
  displayPrice?: number;
  originalPrice?: number;
  discountPercentage?: number;
  isInStock?: boolean;
}

// Category Type
export interface Category {
  _id: string;
  name: string;
  slug?: string;
  description?: string;
  image?: string;
}

// Color Filter Type
export interface ColorFilter {
  name: string;
  code: string;
  count: number;
}

// Size Filter Type
export interface SizeFilter {
  size: string;
  count: number;
}

// Price Range Type
export interface PriceRange {
  min: number;
  max: number;
}

// Filter State Type
export interface FilterState {
  size: string[];
  price: PriceRange;
  color: string[];
  category: string[];
  status?: "active" | "inactive" | "pending";
  minRating?: number;
}

// Sort Option Type
export interface SortOption {
  key: string;
  label: string;
  value: "name" | "price" | "rating" | "createdAt" | "amountBuy";
  direction: "asc" | "desc";
}

// Active Filter Type
export interface ActiveFilter {
  type: "size" | "color" | "price" | "rating" | "status";
  value: string;
  label: string;
}

// Pagination Type
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// Shop State Type
export interface ShopState {
  products: Product[];
  categories: Category[];
  filters: FilterState;
  sort: SortOption;
  pagination: Pagination;
  isLoading: boolean;
  error: string | null;
  search: string;
}
