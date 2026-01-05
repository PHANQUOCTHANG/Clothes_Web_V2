import { QueryClient } from "@tanstack/react-query";
import { isNetworkError, isUnauthorizedError } from "@/lib/axios";

// Tạo QueryClient với cấu hình tối ưu cho Axios + React Query
const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // Dữ liệu được coi là "tươi" trong 5 phút
        staleTime: 5 * 60 * 1000,
        // Cache lưu giữ trong 10 phút khi không có subscribers
        gcTime: 10 * 60 * 1000,
        // Retry 1 lần trước khi thất bại
        retry: 1,
        // Không refetch tự động trên mount/focus
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      },
      mutations: {
        // Retry 1 lần cho mutations
        retry: 1,
      },
    },
  });

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  // Client-side: dùng singleton instance
  if (typeof window !== "undefined") {
    if (!browserQueryClient) browserQueryClient = createQueryClient();
    return browserQueryClient;
  }

  // Server-side: tạo instance mới cho mỗi request (SSR)
  return createQueryClient();
}
