// Product Detail API Service
// - Giao tiếp HTTP với backend
// - Không có React, Hook hay logic

import { api } from "@/lib/axios";
import {
  IProductResponse,
  IProduct,
  IProductListResponse,
} from "@/types/product";

export const productDetailApiService = {
  // Lấy sản phẩm theo slug
  async getProductBySlug(slug: string): Promise<IProduct> {
    const response = await api.get<IProductResponse>(`/products/${slug}`);
    return response.data.data;
  },

  // Lấy sản phẩm theo ID
  async getProductById(id: string): Promise<IProduct> {
    const response = await api.get<IProductResponse>(`/products/${id}`);
    return response.data.data;
  },

  // Lấy sản phẩm liên quan theo danh mục
  async getRelatedProductsByCategory(
    categoryId: string,
    limit: number = 8
  ): Promise<IProduct[]> {
    const response = await api.get<IProductListResponse>("/products", {
      params: { category: categoryId, limit },
    });
    return response.data.data;
  },

  // Lấy sản phẩm được đề xuất/mới
  async getRecommendedProducts(limit: number = 8): Promise<IProduct[]> {
    const response = await api.get<IProductListResponse>("/products", {
      params: { productNew: true, limit },
    });
    return response.data.data;
  },

  // Lấy đánh giá sản phẩm
  async getProductReviews(productId: string) {
    try {
      const response = await api.get(`/products/${productId}/reviews`);
      return response.data.data || [];
    } catch {
      return [];
    }
  },
};

export default productDetailApiService;
