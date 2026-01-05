// useProductDetailData - Query Hook
// - Fetch dữ liệu sản phẩm từ API dùng React Query
// - Quản lý cache, loading, error
// - Chỉ gọi service, không API trực tiếp

import { useQuery } from "@tanstack/react-query";
import { IProduct } from "@/types/product";
import productDetailApiService from "../services/productDetailApiService";

// Query keys cho caching
export const productDetailKeys = {
  all: ["product_detail"] as const,
  bySlug: (slug?: string) => [...productDetailKeys.all, "slug", slug] as const,
  byId: (id?: string) => [...productDetailKeys.all, "id", id] as const,
  related: (categoryId?: string) =>
    [...productDetailKeys.all, "related", categoryId] as const,
  recommended: () => [...productDetailKeys.all, "recommended"] as const,
  reviews: (productId?: string) =>
    [...productDetailKeys.all, "reviews", productId] as const,
};

export interface UseProductDetailReturn {
  product: IProduct | null;
  isLoading: boolean;
  error: Error | null;
  isSuccess: boolean;
}

// Fetch sản phẩm theo slug
export const useProductDetailBySlug = (
  slug?: string
): UseProductDetailReturn => {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: productDetailKeys.bySlug(slug),
    queryFn: () => productDetailApiService.getProductBySlug(slug!),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });

  return {
    product: data || null,
    isLoading,
    error: error as Error | null,
    isSuccess,
  };
};

// Fetch sản phẩm liên quan
export const useProductDetailRelated = (categoryId?: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: productDetailKeys.related(categoryId),
    queryFn: () =>
      productDetailApiService.getRelatedProductsByCategory(categoryId!, 8),
    enabled: !!categoryId,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });

  return {
    products: data || [],
    isLoading,
    error: error as Error | null,
  };
};

// Fetch sản phẩm được đề xuất
export const useProductDetailRecommended = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: productDetailKeys.recommended(),
    queryFn: () => productDetailApiService.getRecommendedProducts(8),
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });

  return {
    products: data || [],
    isLoading,
    error: error as Error | null,
  };
};

// Fetch đánh giá sản phẩm
export const useProductDetailReviews = (productId?: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: productDetailKeys.reviews(productId),
    queryFn: () => productDetailApiService.getProductReviews(productId!),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    reviews: data || [],
    isLoading,
    error: error as Error | null,
  };
};
