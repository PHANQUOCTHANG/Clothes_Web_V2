/**
 * useShopProducts - Query Hook
 * - Fetch sản phẩm từ API dùng React Query
 * - Quản lý cache, loading, error
 * - Chỉ gọi service, không API trực tiếp
 */

import { useQuery } from "@tanstack/react-query";
import { IProductListQuery, IProduct } from "@/types/product";
import shopApiService from "../services/shopApiService";

// Query keys cho caching
export const shopProductKeys = {
  all: ["shop_products"] as const,
  lists: () => [...shopProductKeys.all, "list"] as const,
  list: (filters?: IProductListQuery) =>
    [...shopProductKeys.lists(), filters] as const,
  byCategory: (categoryId: string) =>
    [...shopProductKeys.all, "category", categoryId] as const,
  search: (keyword: string) =>
    [...shopProductKeys.all, "search", keyword] as const,
};

export interface UseShopProductsReturn {
  products: IProduct[];
  isLoading: boolean;
  error: Error | null;
  isSuccess: boolean;
}

// Fetch sản phẩm với filter
export const useShopProducts = (
  filters?: IProductListQuery
): UseShopProductsReturn => {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: shopProductKeys.list(filters),
    queryFn: () => shopApiService.getProducts(filters),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    products: data?.data?.data || [],
    isLoading,
    error: error as Error | null,
    isSuccess,
  };
};

// Fetch sản phẩm theo danh mục
export const useShopProductsByCategory = (
  categoryId: string,
  filters?: Partial<IProductListQuery>
) => {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: shopProductKeys.byCategory(categoryId),
    queryFn: () => shopApiService.getProductsByCategory(categoryId, filters),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    products: data?.data || [],
    isLoading,
    error: error as Error | null,
    isSuccess,
  };
};

// Tìm kiếm sản phẩm
export const useShopSearchProducts = (
  keyword: string,
  filters?: Partial<IProductListQuery>
) => {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: shopProductKeys.search(keyword),
    queryFn: () => shopApiService.searchProducts(keyword, filters),
    enabled: !!keyword?.trim(),
    staleTime: 3 * 60 * 1000,
    gcTime: 8 * 60 * 1000,
  });

  return {
    products: data?.data || [],
    isLoading,
    error: error as Error | null,
    isSuccess,
  };
};
