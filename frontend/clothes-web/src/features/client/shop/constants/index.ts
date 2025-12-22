import { Color, Category, Brand, SortOption, Product } from "../types";

// Display Limit Constants
export const CATEGORY_BRAND_LIMIT = 5;
export const COLOR_LIMIT = 10;
export const SIZE_LIMIT = 8;

// Pagination Constants
export const TOTAL_PRODUCTS = 30;
export const PRODUCTS_PER_PAGE = 10;
export const MIN_PRICE = 6;
export const MAX_PRICE = 126;

// Sample Description
export const SAMPLE_DESCRIPTION =
  "Đây là mô tả giả lập cho sản phẩm. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati...";

// Sample Image URL
export const SAMPLE_IMAGE_URL =
  "https://minimog.nextsky.co/minimog/media/catalog/product/cache/264f011371af053b04369f03ade3004b/p/r/product_megastore_09_1.jpg";

// Categories
export const CATEGORIES: Category[] = [
  { name: "Giày Thể Thao", count: 8 },
  { name: "Túi Da", count: 5 },
  { name: "Áo Khoác", count: 12 },
  { name: "Đầm Dự Tiệc", count: 3 },
  { name: "Phụ Kiện", count: 15 },
  { name: "Quần Jeans", count: 9 },
];

// Sizes
export const SIZES = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
];

// Colors
export const COLORS: Color[] = [
  { hex: "#A8B79B", name: "Xanh Xô Thơm" },
  { hex: "#EBE5C4", name: "Kem" },
  { hex: "#FFFFFF", name: "Trắng" },
  { hex: "#B2C4E0", name: "Xanh Da Trời" },
  { hex: "#5B799A", name: "Xanh Xám" },
  { hex: "#16314A", name: "Xanh Navy" },
  { hex: "#C8C5D3", name: "Oải Hương" },
  { hex: "#8C3D2B", name: "Đỏ Đậm" },
  { hex: "#E29759", name: "Cam" },
  { hex: "#9E9E9E", pattern: true, name: "Kẻ Sọc" },
  { hex: "#333333", name: "Đen" },
  { hex: "#D2D2D2", name: "Xám Nhạt" },
  { hex: "#F0E0D1", name: "Hồng Phấn" },
  { hex: "#87919C", name: "Xám Đá" },
  { hex: "#A1B1C7", name: "Xanh Mát" },
  { hex: "#E0C797", name: "Nâu Vàng" },
  { hex: "#B8B8B8", pattern: true, name: "Kẻ Ô" },
  { hex: "#634731", name: "Nâu" },
  { hex: "#FF0000", name: "Đỏ Tươi" },
];

// Brands
export const BRANDS: Brand[] = [
  { name: "Aby", count: 6 },
  { name: "Chanel", count: 7 },
  { name: "Gucci", count: 2 },
  { name: "Dior", count: 3 },
  { name: "Zara", count: 5 },
  { name: "Nike", count: 10 },
];

// Sort Options
export const SORT_OPTIONS: SortOption[] = [
  { key: "position", label: "Vị trí" },
  { key: "name", label: "Tên sản phẩm" },
  { key: "price", label: "Giá" },
  { key: "color", label: "Màu sắc" },
  { key: "brand", label: "Thương hiệu" },
  { key: "size", label: "Kích cỡ" },
];

// Sample Products
export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Đầm Maxi Dài Tay",
    price: 126.0,
    imageUrl: SAMPLE_IMAGE_URL,
    imageHoverUrl: SAMPLE_IMAGE_URL,
    colors: ["#A8B79B", "#EBE5C4"],
    description: SAMPLE_DESCRIPTION,
    modalImages: [
      SAMPLE_IMAGE_URL,
      "https://placehold.co/500x750/b0b7ab/fff?text=Mat+Sau+Vay",
      "https://placehold.co/500x750/a8b79b/000?text=Chi+Tiet+Vay",
    ],
    availableSizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Áo Vest Gân",
    price: 6.0,
    imageUrl: "https://placehold.co/400x600/EBE5C4/333?text=Ao+Vest+Gan",
    imageHoverUrl: SAMPLE_IMAGE_URL,
    colors: ["#EBE5C4", "#F5F5DC"],
    description: SAMPLE_DESCRIPTION,
    modalImages: [
      "https://placehold.co/500x750/EBE5C4/333?text=Mat+Truoc+Ao",
      "https://placehold.co/500x750/F5EFE1/333?text=Mat+Sau+Ao",
    ],
    availableSizes: ["S", "M", "L"],
  },
  {
    id: 3,
    name: "Mũ Bucket Cotton",
    price: 6.0,
    imageUrl: SAMPLE_IMAGE_URL,
    imageHoverUrl: SAMPLE_IMAGE_URL,
    colors: ["#C8C5D3", "#8C3D2B", "#EBE5C4"],
    discount: "-40%",
    description: SAMPLE_DESCRIPTION,
    modalImages: ["https://placehold.co/500x750/C8C5D3/333?text=Mu+Bucket"],
    availableSizes: ["37", "38", "39"],
  },
  {
    id: 4,
    name: "Quần Jean Cao Cổ",
    price: 102.0,
    imageUrl: SAMPLE_IMAGE_URL,
    imageHoverUrl: SAMPLE_IMAGE_URL,
    colors: ["#B2C4E0", "#16314A", "#EBE5C4"],
    description: SAMPLE_DESCRIPTION,
    modalImages: [
      "https://placehold.co/500x750/B2C4E0/333?text=Quan+Jean+Cao",
      "https://placehold.co/500x750/A2B4D0/333?text=Chi+Tiet+Jean",
    ],
    availableSizes: ["XS", "S", "M", "L", "XL"],
  },
];

// Generate Mock Product List
export const generateProductList = (): Product[] => {
  return Array.from({ length: TOTAL_PRODUCTS }, (_, i) => ({
    ...SAMPLE_PRODUCTS[i % SAMPLE_PRODUCTS.length],
    id: i + 1,
    name: SAMPLE_PRODUCTS[i % SAMPLE_PRODUCTS.length].name + ` #${i + 1}`,
    price: SAMPLE_PRODUCTS[i % SAMPLE_PRODUCTS.length].price + (i % 5),
    discount: i % 7 === 0 ? "-20%" : undefined,
  }));
};
