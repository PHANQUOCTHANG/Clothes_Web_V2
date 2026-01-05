/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product, FilterState } from "@/features/client/shop/types";
import { IProduct } from "@/types/product";

// Lọc sản phẩm theo các tiêu chí (kích cỡ, màu, giá, danh mục, rating)
export const filterProducts = (
  products: Product[],
  filters: FilterState
): Product[] => {
  return products.filter((product) => {
    if (filters.size.length > 0 && !filters.size.includes(product.size))
      return false;

    if (filters.color.length > 0 && !filters.color.includes(product.color.code))
      return false;

    if (filters.category.length > 0) {
      const categoryName =
        typeof product.category === "string"
          ? product.category
          : product.category.name;
      if (!filters.category.includes(categoryName)) return false;
    }

    const price = product.price || 0;
    if (price < filters.price.min || price > filters.price.max) return false;

    if (filters.minRating && product.rating < filters.minRating) return false;

    if (filters.status && product.status !== filters.status) return false;

    return true;
  });
};

// Sắp xếp sản phẩm theo trường được chỉ định (giá, tên, rating, ngày tạo)
export const sortProducts = (
  products: Product[],
  sortKey: string,
  direction: "asc" | "desc" = "asc"
): Product[] => {
  const sorted = [...products].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortKey) {
      case "price":
        aValue = a.price || 0;
        bValue = b.price || 0;
        break;
      case "rating":
        aValue = a.rating || 0;
        bValue = b.rating || 0;
        break;
      case "name":
        aValue = a.name?.toLowerCase() || "";
        bValue = b.name?.toLowerCase() || "";
        break;
      case "amountBuy":
        aValue = a.amountBuy || 0;
        bValue = b.amountBuy || 0;
        break;
      case "createdAt":
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
        break;
      default:
        aValue = a[sortKey as keyof Product] || 0;
        bValue = b[sortKey as keyof Product] || 0;
    }

    aValue ??= 0;
    bValue ??= 0;

    if (aValue < bValue) return direction === "asc" ? -1 : 1;
    if (aValue > bValue) return direction === "asc" ? 1 : -1;
    return 0;
  });

  return sorted;
};

// Tìm kiếm sản phẩm theo tên hoặc mô tả
export const searchProducts = (
  products: Product[],
  query: string
): Product[] => {
  if (!query?.trim()) return products;

  const lowerQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.nameNoAccent?.toLowerCase().includes(lowerQuery) ||
      product.description?.toLowerCase().includes(lowerQuery)
  );
};

// Xử lý toàn bộ: tìm kiếm → lọc → sắp xếp
export const processProducts = (
  products: Product[],
  filters: FilterState,
  sortKey: string = "createdAt",
  sortDirection: "asc" | "desc" = "desc",
  searchQuery: string = ""
): Product[] => {
  let result = [...products];
  if (searchQuery) result = searchProducts(result, searchQuery);
  result = filterProducts(result, filters);
  result = sortProducts(result, sortKey, sortDirection);
  return result;
};

// Tính toán thống kê sản phẩm (tổng số, giá trung bình, rating trung bình)
export const getProductStats = (products: Product[]) => {
  if (products.length === 0) {
    return {
      totalProducts: 0,
      averagePrice: 0,
      minPrice: 0,
      maxPrice: 0,
      averageRating: 0,
      highestRated: null,
    };
  }

  const prices = products.map((p) => p.price || 0);
  const ratings = products.map((p) => p.rating || 0);

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const averagePrice = Math.round(
    prices.reduce((a, b) => a + b, 0) / prices.length
  );
  const averageRating = Number(
    (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
  );
  const highestRated = products.reduce((prev, current) =>
    (current.rating || 0) > (prev.rating || 0) ? current : prev
  );

  return {
    totalProducts: products.length,
    averagePrice,
    minPrice,
    maxPrice,
    averageRating,
    highestRated,
  };
};

// Nhóm sản phẩm theo danh mục
export const groupByCategory = (
  products: Product[]
): Record<string, Product[]> => {
  return products.reduce((acc, product) => {
    const categoryKey =
      typeof product.category === "string"
        ? product.category
        : product.category?.id || "unknown";

    if (!acc[categoryKey]) acc[categoryKey] = [];
    acc[categoryKey].push(product);
    return acc;
  }, {} as Record<string, Product[]>);
};

// Lấy danh sách màu sắc độc nhất có số lượng sản phẩm
export const getUniqueColors = (
  products: Product[]
): Array<{ name: string; code: string; count: number }> => {
  const colorMap = new Map<string, number>();

  products.forEach((product) => {
    const colorKey = product.color.code || product.color.name;
    colorMap.set(colorKey, (colorMap.get(colorKey) || 0) + 1);
  });

  return Array.from(colorMap.entries()).map(([key, count]) => {
    const product = products.find(
      (p) => (p.color.code || p.color.name) === key
    );
    return {
      name: product?.color.name || key,
      code: product?.color.code || key,
      count,
    };
  });
};

// Lấy danh sách kích cỡ độc nhất có số lượng sản phẩm
export const getUniqueSizes = (
  products: Product[]
): Array<{ size: string; count: number }> => {
  const sizeMap = new Map<string, number>();

  products.forEach((product) => {
    sizeMap.set(product.size, (sizeMap.get(product.size) || 0) + 1);
  });

  return Array.from(sizeMap.entries())
    .map(([size, count]) => ({ size, count }))
    .sort((a, b) => a.size.localeCompare(b.size));
};

// Lấy khoảng giá min-max từ danh sách sản phẩm
export const getPriceRange = (
  products: Product[]
): { min: number; max: number } => {
  if (products.length === 0) return { min: 0, max: 0 };
  const prices = products.map((p) => p.price || 0);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};

// Kiểm tra sản phẩm có phù hợp với bộ lọc hay không
export const matchesFilters = (
  product: Product,
  filters: FilterState
): boolean => {
  return filterProducts([product], filters).length > 0;
};

// Định dạng sản phẩm từ IProduct sang Product để hiển thị
export const formatProduct = (product: IProduct): Product => {
  const displayPrice = product.discount
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;

  return {
    ...product,
    displayPrice,
    originalPrice: product.price,
    discountPercentage: product.discount || 0,
    isInStock: product.stock > 0,
  } as Product;
};
