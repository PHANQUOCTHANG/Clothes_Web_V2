/**
 * Shop API Service
 * - Giao tiếp HTTP với backend
 * - Không có React, Hook hay logic
 */

import { api } from "@/lib/axios";
import { IProductListQuery, IProductListResponse } from "@/types/product";

export const shopApiService = {
  // Lấy tất cả sản phẩm với filter
  async getProducts(params?: IProductListQuery): Promise<IProductListResponse> {
    const response = await api.get("/products", {
      params: { page: 1, limit: 10, sort: "-createdAt", ...params },
    });
    return response.data;
  },

  // Lấy sản phẩm theo danh mục
  async getProductsByCategory(
    categoryId: string,
    params?: Partial<IProductListQuery>
  ): Promise<IProductListResponse> {
    const response = await api.get("/products", {
      params: { category: categoryId, page: 1, limit: 10, ...params },
    });
    return response.data;
  },

  // Tìm kiếm sản phẩm
  async searchProducts(
    keyword: string,
    params?: Partial<IProductListQuery>
  ): Promise<IProductListResponse> {
    const response = await api.get("/products/search", {
      params: { search: keyword, page: 1, limit: 10, ...params },
    });
    return response.data;
  },
};

export default shopApiService;
