// Compose Hook - Tất cả state & logic cho product detail page
export {
  useProductDetailPage,
  type UseProductDetailPageReturn,
} from "./useProductDetailPage";

// Query Hooks - Fetch data từ API
export {
  useProductDetailBySlug,
  useProductDetailRelated,
  useProductDetailRecommended,
  useProductDetailReviews,
  type UseProductDetailReturn,
} from "./useProductDetailData";
