import { Product } from "@/features/client/shop/types";

// Sắp xếp danh sách sản phẩm theo tiêu chí khác nhau
export const sortProductsByKey = (
  products: Product[],
  sortKey: string,
  direction: "asc" | "desc" = "asc"
): Product[] => {
  const sorted = [...products].sort((a, b) => {
    switch (sortKey) {
      case "price":
        const priceA = a.price || 0;
        const priceB = b.price || 0;
        return direction === "asc" ? priceA - priceB : priceB - priceA;

      case "name":
        const compare = (a.name || "").localeCompare(b.name || "");
        return direction === "asc" ? compare : -compare;

      case "rating":
        const ratingA = a.rating || 0;
        const ratingB = b.rating || 0;
        return direction === "asc" ? ratingA - ratingB : ratingB - ratingA;

      case "newest":
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return direction === "asc" ? dateA - dateB : dateB - dateA;

      case "best-selling":
        const sellsA = a.amountBuy || 0;
        const sellsB = b.amountBuy || 0;
        return direction === "asc" ? sellsA - sellsB : sellsB - sellsA;

      case "discount":
        const discountA = a.discount || 0;
        const discountB = b.discount || 0;
        return direction === "asc"
          ? discountA - discountB
          : discountB - discountA;

      default:
        return 0;
    }
  });

  return sorted;
};

// Lấy nhãn hiển thị cho tùy chọn sắp xếp
export const getSortLabel = (
  sortKey: string,
  direction: "asc" | "desc"
): string => {
  const labels: Record<string, string> = {
    position: "Vị trí",
    price: "Giá",
    name: "Tên",
    rating: "Đánh giá",
    newest: "Mới nhất",
    "best-selling": "Bán chạy nhất",
    discount: "Giảm giá",
  };

  const baseLabel = labels[sortKey] || "Vị trí";
  const dirLabel = direction === "asc" ? "(tăng dần)" : "(giảm dần)";
  return `${baseLabel} ${dirLabel}`;
};

// Lấy ký hiệu mũi tên biểu thị chiều sắp xếp
export const getDirectionSymbol = (direction: "asc" | "desc"): string => {
  return direction === "asc" ? "↑" : "↓";
};
