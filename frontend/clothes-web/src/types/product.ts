/* eslint-disable @typescript-eslint/no-explicit-any */
// Color Interface
export interface IColor {
  name: string;
  code: string;
}

// Category Interface
export interface ICategory {
  id: string;
  name: string;
}

// Product Review Type
export interface IProductReview {
  _id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

// Product Interface - Main
export interface IProduct {
  id: string;
  name: string;
  nameNoAccent?: string;
  price: number;
  description?: string;
  images: string[];
  stock: number;
  status: "active" | "inactive" | "pending";
  category: ICategory | string;
  slug: string;
  rating: number;
  amountBuy: number;
  productNew: boolean;
  discount: number;
  color: IColor;
  size: string;
  deleted: boolean;
  deletedAt: Date | null;
  createdAt: string;
  updatedAt: string;
  reviews?: IProductReview[];
  relatedProducts?: IProduct[];
}

// API Query Params
export interface IProductListQuery {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
  category?: string;
  status?: "active" | "inactive" | "pending";
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  color?: string;
  size?: string;
}

// Create Product Payload
export interface IProductCreate {
  name: string;
  price: number;
  description?: string;
  images: string[];
  stock: number;
  category: string;
  color: IColor;
  size: string;
  discount?: number;
  status?: "active" | "inactive" | "pending";
  productNew?: boolean;
}

// Update Product Payload
export type IProductUpdate = Partial<IProductCreate>;

// API Response
export interface IProductResponse<T = IProduct> {
  success: boolean;
  data: T;
  message?: string;
}

export interface IProductListResponse {
  success: boolean;
  data: any;
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
  message?: string;
}

// Filter State
export interface IProductFilter {
  searchTerm?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  status?: "active" | "inactive" | "pending";
  color?: string;
  size?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

// UI Display Type
export interface IProductDisplay extends IProduct {
  displayPrice: number;
  originalPrice: number;
  discountPercentage: number;
  isNew: boolean;
  isInStock: boolean;
}
