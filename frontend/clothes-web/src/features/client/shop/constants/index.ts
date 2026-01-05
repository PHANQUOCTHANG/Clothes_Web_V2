import { ColorFilter, Category, SortOption, Product } from "../types";

// Display Limit Constants
export const CATEGORY_BRAND_LIMIT = 5;
export const COLOR_LIMIT = 10;
export const SIZE_LIMIT = 8;

// Pagination Constants
export const TOTAL_PRODUCTS = 30;
export const PRODUCTS_PER_PAGE = 10;
export const MIN_PRICE = 0;
export const MAX_PRICE = 10000000;
export const MIN_RATING = 0;
export const MAX_RATING = 5

// Sample Description
export const SAMPLE_DESCRIPTION =
  "Đây là mô tả giả lập cho sản phẩm. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati...";

// Sample Image URL
export const SAMPLE_IMAGE_URL =
  "";

// Categories
export const CATEGORIES: Category[] = [
  { _id: "1", name: "Giày Thể Thao" },
  { _id: "2", name: "Túi Da" },
  { _id: "3", name: "Áo Khoác" },
  { _id: "4", name: "Đầm Dự Tiệc" },
  { _id: "5", name: "Phụ Kiện" },
  { _id: "6", name: "Quần Jeans" },
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
export const COLORS: ColorFilter[] = [
  { name: "Xanh Xô Thơm", code: "#A8B79B", count: 10 },
  { name: "Kem", code: "#EBE5C4", count: 8 },
  { name: "Trắng", code: "#FFFFFF", count: 12 },
  { name: "Xanh Da Trời", code: "#B2C4E0", count: 9 },
  { name: "Xanh Xám", code: "#5B799A", count: 6 },
  { name: "Xanh Navy", code: "#16314A", count: 7 },
  { name: "Oải Hương", code: "#C8C5D3", count: 5 },
  { name: "Đỏ Đậm", code: "#8C3D2B", count: 4 },
  { name: "Cam", code: "#E29759", count: 8 },
  { name: "Đen", code: "#333333", count: 15 },
  { name: "Xám Nhạt", code: "#D2D2D2", count: 11 },
  { name: "Hồng Phấn", code: "#F0E0D1", count: 6 },
  { name: "Xám Đá", code: "#87919C", count: 7 },
  { name: "Xanh Mát", code: "#A1B1C7", count: 5 },
  { name: "Nâu Vàng", code: "#E0C797", count: 8 },
  { name: "Nâu", code: "#634731", count: 9 },
  { name: "Đỏ Tươi", code: "#FF0000", count: 4 },
];

// Brands (for reference only - not a defined type)
export const BRANDS_LIST = [
  { name: "Aby", count: 6 },
  { name: "Chanel", count: 7 },
  { name: "Gucci", count: 2 },
  { name: "Dior", count: 3 },
  { name: "Zara", count: 5 },
  { name: "Nike", count: 10 },
];

// Sort Options
export const SORT_OPTIONS: SortOption[] = [
  { key: "position", label: "Vị trí", value: "name", direction: "asc" },
  { key: "name", label: "Tên sản phẩm", value: "name", direction: "asc" },
  { key: "price", label: "Giá", value: "price", direction: "asc" },
  { key: "rating", label: "Đánh giá", value: "rating", direction: "desc" },
  { key: "sold", label: "Bán chạy", value: "amountBuy", direction: "desc" },
  { key: "new", label: "Mới nhất", value: "createdAt", direction: "desc" },
];

// Sample Products
export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Đầm Maxi Dài Tay",
    nameNoAccent: "Dam Maxi Dai Tay",
    slug: "dam-maxi-dai-tay",
    price: 126.0,
    discount: 0,
    description: SAMPLE_DESCRIPTION,
    images: [
      SAMPLE_IMAGE_URL,
      "https://placehold.co/500x750/b0b7ab/fff?text=Mat+Sau+Vay",
      "https://placehold.co/500x750/a8b79b/000?text=Chi+Tiet+Vay",
    ],
    color: { name: "Xanh Xô Thơm", code: "#A8B79B" },
    size: "XS,S,M,L,XL",
    stock: 15,
    rating: 4.5,
    amountBuy: 28,
    productNew: true,
    category: "Đầm Dự Tiệc",
    status: "active",
    deleted: false,
    deletedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Áo Vest Gân",
    nameNoAccent: "Ao Vest Gan",
    slug: "ao-vest-gan",
    price: 85.0,
    discount: 20,
    description: SAMPLE_DESCRIPTION,
    images: [
      "https://placehold.co/500x750/EBE5C4/333?text=Ao+Vest+Gan",
      "https://placehold.co/500x750/F5EFE1/333?text=Mat+Sau+Ao",
    ],
    color: { name: "Kem", code: "#EBE5C4" },
    size: "S,M,L,XL",
    stock: 20,
    rating: 4.8,
    amountBuy: 45,
    productNew: false,
    category: "Áo Khoác",
    status: "active",
    deleted: false,
    deletedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Mũ Bucket Cotton",
    nameNoAccent: "Mu Bucket Cotton",
    slug: "mu-bucket-cotton",
    price: 45.0,
    discount: 40,
    description: SAMPLE_DESCRIPTION,
    images: [
      "https://placehold.co/500x750/C8C5D3/333?text=Mu+Bucket",
      SAMPLE_IMAGE_URL,
    ],
    color: { name: "Oải Hương", code: "#C8C5D3" },
    size: "37,38,39,40,41",
    stock: 8,
    rating: 4.2,
    amountBuy: 12,
    productNew: true,
    category: "Phụ Kiện",
    status: "active",
    deleted: false,
    deletedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Quần Jean Cao Cổ",
    nameNoAccent: "Quan Jean Cao Co",
    slug: "quan-jean-cao-co",
    price: 102.0,
    discount: 15,
    description: SAMPLE_DESCRIPTION,
    images: [
      "https://placehold.co/500x750/B2C4E0/333?text=Quan+Jean+Cao",
      "https://placehold.co/500x750/A2B4D0/333?text=Chi+Tiet+Jean",
    ],
    color: { name: "Xanh Da Trời", code: "#B2C4E0" },
    size: "XS,S,M,L,XL",
    stock: 25,
    rating: 4.6,
    amountBuy: 38,
    productNew: false,
    category: "Quần Jeans",
    status: "active",
    deleted: false,
    deletedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Generate Mock Product List
export const generateProductList = (): Product[] => {
  const now = new Date().toISOString();
  return Array.from({ length: TOTAL_PRODUCTS }, (_, i) => ({
    ...SAMPLE_PRODUCTS[i % SAMPLE_PRODUCTS.length],
    _id: `${i + 1}`,
    name: SAMPLE_PRODUCTS[i % SAMPLE_PRODUCTS.length].name + ` #${i + 1}`,
    slug: SAMPLE_PRODUCTS[i % SAMPLE_PRODUCTS.length].slug + `-${i + 1}`,
    nameNoAccent:
      SAMPLE_PRODUCTS[i % SAMPLE_PRODUCTS.length].nameNoAccent + ` #${i + 1}`,
    price: Math.max(
      6,
      SAMPLE_PRODUCTS[i % SAMPLE_PRODUCTS.length].price + (i % 5) * 10
    ),
    discount: i % 7 === 0 ? 20 : i % 5 === 0 ? 15 : 0,
    stock: Math.max(5, 30 - (i % 10)),
    rating: Math.min(5, 3.5 + (i % 5) * 0.3),
    amountBuy: 10 + (i % 30),
    productNew: i % 3 === 0,
    createdAt: now,
    updatedAt: now,
    deleted: false,
    deletedAt: null,
  }));
};
