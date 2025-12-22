import { IProductData, ITab } from "../types";

export const NEW_MAIN_IMAGE_URL =
  "https://minimog.nextsky.co/minimog/media/catalog/product/cache/264f011371af053b04369f03ade3004b/p/r/product_megastore_09_1.jpg";

export const INITIAL_PRODUCT_DATA: IProductData = {
  id: "maxi-dress",
  name: "Đầm Maxi Tay Dài",
  price: 126.0,
  rating: 4.8,
  reviewCount: 5,
  description:
    "Áo vest eo co giãn và lụa sồi dios dignissimos qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati...",
  colors: [
    { name: "Xanh Lá", code: "#C4D4BF" },
    { name: "Màu Be", code: "#F0EFE3" },
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  stock: 5,
  sku: "FS_01",
  categories: "Cơ bản, Đầm, Cửa hàng",
  deliveryDate: "2 - 5 Tháng 12, 2025",
  images: [
    {
      url: "https://placehold.co/300x450/C4D4BF/242424?text=Xanh+La+1",
      alt: "Đầm Xanh Lá 1",
    },
    {
      url: "https://placehold.co/300x450/C4D4BF/242424?text=Xanh+La+2",
      alt: "Đầm Xanh Lá 2",
    },
    {
      url: "https://placehold.co/300x450/C4D4BF/242424?text=Xanh+La+3",
      alt: "Đầm Xanh Lá 3",
    },
    {
      url: "https://placehold.co/300x450/C4D4BF/242424?text=Xanh+La+4",
      alt: "Đầm Xanh Lá 4",
    },
    {
      url: "https://placehold.co/300x450/C4D4BF/242424?text=Xanh+La+5",
      alt: "Đầm Xanh Lá 5",
    },
    {
      url: "https://placehold.co/300x450/C4D4BF/242424?text=Xanh+La+6",
      alt: "Đầm Xanh Lá 6",
    },
    {
      url: "https://placehold.co/300x450/C4D4BF/242424?text=Xanh+La+7",
      alt: "Đầm Xanh Lá 7",
    },
  ],
  mainImageUrl: NEW_MAIN_IMAGE_URL,
};

export const ALL_PRODUCTS: IProductData[] = [
  INITIAL_PRODUCT_DATA,
  {
    id: "linen-blazer",
    name: "Áo Blazer Kẻ Lanh",
    price: 6.0,
    oldPrice: 39.99,
    discount: 76,
    rating: 4.5,
    reviewCount: 3,
    description: "Áo blazer kẻ caro vải lanh mềm mại, lý tưởng cho mùa hè.",
    colors: [
      { name: "Kẻ Caro", code: "#9DC08B" },
      { name: "Xanh Dương", code: "#ADD8E6" },
    ],
    sizes: ["S", "M", "L"],
    stock: 12,
    sku: "LB_02",
    categories: "Áo khoác, Vải lanh",
    deliveryDate: "1 - 3 Tháng 12, 2025",
    images: [
      {
        url: "https://placehold.co/300x400/C4D4BF/242424?text=Blazer+1",
        alt: "Blazer 1",
      },
      {
        url: "https://placehold.co/300x400/DDEEFF/242424?text=Blazer+2",
        alt: "Blazer 2",
      },
    ],
    mainImageUrl:
      "https://placehold.co/300x400/C4D4BF/242424?text=Blazer+Truoc",
  },
  {
    id: "wool-jacket",
    name: "Áo Khoác Dạ Len",
    price: 39.0,
    oldPrice: null,
    discount: null,
    rating: 4.7,
    reviewCount: 8,
    description: "Áo khoác dạ pha len ấm áp, phong cách quân đội.",
    colors: [{ name: "Màu Be", code: "#F0EFE3" }],
    sizes: ["S", "M", "L", "XL"],
    stock: 7,
    sku: "WJ_03",
    categories: "Áo khoác, Len",
    deliveryDate: "3 - 7 Tháng 12, 2025",
    images: [
      {
        url: "https://placehold.co/300x400/F0EFE3/242424?text=Jacket+1",
        alt: "Jacket 1",
      },
      {
        url: "https://placehold.co/300x400/DDEEFF/242424?text=Jacket+2",
        alt: "Jacket 2",
      },
    ],
    mainImageUrl:
      "https://placehold.co/300x400/F0EFE3/242424?text=Ao+Khoac+Truoc",
  },
  {
    id: "stripe-shirt",
    name: "Áo Sơ Mi Sọc Cotton",
    price: 6.0,
    oldPrice: 29.99,
    discount: 79,
    rating: 4.6,
    reviewCount: 12,
    description: "Áo sơ mi cotton kẻ sọc cổ điển, thoải mái.",
    colors: [{ name: "Sọc Xanh", code: "#DDEEFF" }],
    sizes: ["XS", "S", "M", "L"],
    stock: 20,
    sku: "SC_04",
    categories: "Áo, Cotton",
    deliveryDate: "2 - 5 Tháng 12, 2025",
    images: [
      {
        url: "https://placehold.co/300x400/DDEEFF/242424?text=Shirt+1",
        alt: "Shirt 1",
      },
      {
        url: "https://placehold.co/300x400/C4D4BF/242424?text=Shirt+2",
        alt: "Shirt 2",
      },
    ],
    mainImageUrl:
      "https://placehold.co/300x400/DDEEFF/242424?text=Ao+So+Mi+Truoc",
  },
  {
    id: "tshirt-dress",
    name: "Đầm T-Shirt Dây Rút",
    price: 14.0,
    oldPrice: null,
    discount: null,
    rating: 4.4,
    reviewCount: 6,
    description: "Đầm T-Shirt dây rút đơn giản, phong cách năng động.",
    colors: [{ name: "Đen", code: "#242424" }],
    sizes: ["M", "L", "XL"],
    stock: 9,
    sku: "TD_05",
    categories: "Đầm",
    deliveryDate: "2 - 5 Tháng 12, 2025",
    images: [
      {
        url: "https://placehold.co/300x400/242424/FFFFFF?text=Dam+Truoc",
        alt: "Dress 1",
      },
      {
        url: "https://placehold.co/300x400/F0EFE3/242424?text=Dam+Sau",
        alt: "Dress 2",
      },
    ],
    mainImageUrl: "https://placehold.co/300x400/242424/FFFFFF?text=Dam+Truoc",
  },
  {
    id: "tshirt-dressss",
    name: "Đầm T-Shirt Dây Rút",
    price: 14.0,
    oldPrice: null,
    discount: null,
    rating: 4.4,
    reviewCount: 6,
    description: "Đầm T-Shirt dây rút đơn giản, phong cách năng động.",
    colors: [{ name: "Đen", code: "#242424" }],
    sizes: ["M", "L", "XL"],
    stock: 9,
    sku: "TD_05",
    categories: "Đầm",
    deliveryDate: "2 - 5 Tháng 12, 2025",
    images: [
      {
        url: "https://placehold.co/300x400/242424/FFFFFF?text=Dam+Truoc",
        alt: "Dress 1",
      },
      {
        url: "https://placehold.co/300x400/F0EFE3/242424?text=Dam+Sau",
        alt: "Dress 2",
      },
    ],
    mainImageUrl: "https://placehold.co/300x400/242424/FFFFFF?text=Dam+Truoc",
  },
];

export const TABS: ITab[] = [
  { key: "details", label: "Chi Tiết" },
  { key: "moreInfo", label: "Thông Tin Thêm" },
  { key: "reviews", label: `Đánh Giá (${INITIAL_PRODUCT_DATA.reviewCount})` },
  { key: "aboutBrand", label: "Về Thương Hiệu" },
  { key: "shippingReturns", label: "Vận Chuyển & Đổi Trả" },
];

export const REVIEW_IMAGES = [
  "https://minimog.nextsky.co/minimog/media/catalog/product/cache/264f011371af053b04369f03ade3004b/p/r/product_megastore_09_1.jpg",
  "https://minimog.nextsky.co/minimog/media/catalog/product/cache/264f011371af053b04369f03ade3004b/p/r/product_megastore_09_2.jpg",
];
