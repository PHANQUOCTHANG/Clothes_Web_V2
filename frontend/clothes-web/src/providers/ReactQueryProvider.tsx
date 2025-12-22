"use client"; // Bắt buộc vì nó sử dụng hooks và state

import { useState } from "react";
import { QueryClientProvider, Hydrate } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "../utils/queryClient"; // Đường dẫn đến file client bạn đã tạo

// Chú ý: Vì App Router không dùng pageProps trực tiếp,
// việc hydrate data từ Server Component sẽ cần một cách tiếp cận khác (vd: HydrationBoundary)
// Tuy nhiên, đây là cách bọc cơ bản nhất.

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* Trong App Router, bạn có thể truyền children ở đây */}
      {children}

      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
