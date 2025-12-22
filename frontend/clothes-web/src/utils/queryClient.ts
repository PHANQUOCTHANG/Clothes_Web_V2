import { QueryClient } from '@tanstack/react-query';

// Một hàm để tạo ra một instance của QueryClient mới cho mỗi request SSR
const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // Tắt tính năng refetch tự động khi component mount hoặc window focus
        // để tránh các cuộc gọi API không cần thiết. Bạn có thể bật lại nếu cần.
        staleTime: 60 * 1000, // Dữ liệu được coi là "tươi" trong 60 giây
      },
    },
  });

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  // Đối với môi trường Client-side (Browser)
  if (typeof window !== 'undefined') {
    if (!browserQueryClient) browserQueryClient = createQueryClient();
    return browserQueryClient;
  }
  
  // Đối với môi trường Server-side (SSR)
  // Luôn tạo một QueryClient mới cho mỗi request để tránh chia sẻ state
  return createQueryClient();
}