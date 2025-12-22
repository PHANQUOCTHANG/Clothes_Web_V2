import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "@/components/common/Icons";
import { Product, BlogPost } from "../types";

// 1. Dữ liệu Slide Banner chính
export const HERO_SLIDES = [
  {
    title: "Áo Cardigan dệt kim Purl",
    subtitle: "Đây là cơ hội để bạn nâng cấp tủ quần áo với nhiều lựa chọn.",
    image: "https://placehold.co/1000x800/E5E7EB/333333/png?text=Cardigan",
  },
  {
    title: "Hàng mới về: Denim Xuân",
    subtitle: "Khám phá bộ sưu tập quần jean và áo khoác cotton hữu cơ mới nhất của chúng tôi.",
    image: "https://placehold.co/1000x800/D4D4D4/333333/png?text=Denim",
  },
  {
    title: "Giảm tới 50% cho Áo khoác ngoài",
    subtitle: "Ưu đãi có thời hạn cho áo trench, áo khoác và áo phao.",
    image: "https://placehold.co/1000x800/F3F4F6/333333/png?text=Coat",
  },
];

// 2. Danh mục phổ biến
export const POPULAR_CATEGORIES = [
  { name: "Bốt", icon: "👢" },
  { name: "Áo khoác Nam", icon: "🧥" },
  { name: "Tất", icon: "🧦" },
  { name: "Áo khoác ngoài", icon: "👚" },
  { name: "Giày Da", icon: "👞" },
  { name: "Balo", icon: "🎒" },
  { name: "Quà tặng cho Nam", icon: "🎁" },
  { name: "Phụ kiện", icon: "💍" },
  { name: "Túi Da", icon: "👜" },
  { name: "Denim", icon: "👖" },
  { name: "Áo len", icon: "🧶" },
  { name: "Giày Sneaker", icon: "👟" },
  { name: "Quần Nữ", icon: "👖" },
  { name: "Áo Cardigan", icon: "👚" },
];

// 3. Danh sách sản phẩm (Trending & Featured)
export const ALL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Bốt cao cổ đan ReKnit",
    price: "$140.00",
    image: "https://placehold.co/320x400/E5E7EB/333333/png?text=Product+1",
    hoverImage: "https://placehold.co/320x400/D1D5DB/333333/png?text=Hover+1",
    quantity: 1,
    color: "Đen",
    size: "40",
    isTrending: true,
  },
  {
    id: 2,
    name: "Áo len cáp Merino Felted",
    price: "$58.00",
    image: "https://placehold.co/320x400/E5E7EB/333333/png?text=Product+2",
    hoverImage: "https://placehold.co/320x400/D1D5DB/333333/png?text=Hover+2",
    quantity: 1,
    color: "Xám",
    size: "M",
  },
  {
    id: 3,
    name: "Quần jean cotton hữu cơ Slim Fit",
    price: "$108.00",
    image: "https://placehold.co/320x400/E5E7EB/333333/png?text=Product+3",
    quantity: 1,
    color: "Xanh Indigo",
    size: "32",
  },
  {
    id: 4,
    name: "Mũ len Chunky Cotton Hữu cơ",
    price: "$20.00",
    oldPrice: "$48.00",
    image: "https://placehold.co/320x400/E5E7EB/333333/png?text=Product+4",
    quantity: 1,
    saleTag: "-58%",
  },
  {
    id: 5,
    name: "Áo sơ mi Caro Flannel chải kỹ",
    price: "$48.00",
    oldPrice: "$50.00",
    image: "https://placehold.co/320x400/E5E7EB/333333/png?text=Product+5",
    quantity: 1,
    saleTag: "-4%",
  },
  {
    id: 6,
    name: "Váy Polo Cotton",
    price: "$75.00",
    image: "https://placehold.co/320x400/E5E7EB/333333/png?text=Product+6",
    quantity: 1,
    color: "Trắng",
    size: "S",
  }
];

// 4. Bài viết Blog
export const BLOG_POSTS: BlogPost[] = [
  {
    title: "Học hỏi ngay các mẫu tết tóc dạo phố dễ làm",
    meta: "STYLE GUIDE, TIPS & ĐẸP PLUS",
    summary: "Tóc không chỉ là một kiểu tóc cổ điển mà còn là nghệ thuật biến tấu vô tận. Đặc biệt, các mẫu tết tóc sau đầu đang trở thành xu hướng được yêu thích...",
    image: "https://placehold.co/800x600/F5F5F5/333333/png?text=Blog+1",
    large: true,
    date: "15/06/2025",
  },
  {
    title: "Các kiểu pose dáng trên bãi cỏ cực trendy",
    meta: "XU HƯỚNG THỜI TRANG, STYLE GUIDE",
    summary: "Việc tận hưởng không gian xanh mát và khí trời trong lành ở công viên đã trở thành xu hướng...",
    image: "https://placehold.co/400x300/D1D5DB/333333/png?text=Blog+2",
    large: false,
    date: "12/06/2025",
  },
  {
    title: "Khám phá bùng nổ ưu đãi cuối năm lên đến 50%",
    meta: "TIN TỨC THỜI TRANG",
    summary: "Khởi đầu mùa lễ hội theo cách thú vị nhất cùng Karl Lagerfeld! Giảm đến 50% từ 12-21/12/2025.",
    image: "https://placehold.co/400x300/3B82F6/FFFFFF/png?text=SALE+50%",
    large: false,
    isBanner: true,
    date: "12/12/2025",
  }
];

// 5. Menu Danh mục Header
export const HEADER_MENU_ITEMS = [
  { name: "Bán chạy nhất", hasSubMenu: false },
  { name: "Xu hướng tuần này", hasSubMenu: false },
  { name: "Đã nhập lại kho", hasSubMenu: false },
  { name: "Hàng mới về", hasSubMenu: false },
  { name: "Thời trang Nam", hasSubMenu: true },
  { name: "Thời trang Nữ", hasSubMenu: true },
  { name: "Giày & Phụ kiện", hasSubMenu: true },
  { name: "Trang phục dễ mặc", hasSubMenu: false },
  { name: "Trang phục đi làm", hasSubMenu: false },
  { name: "Cửa hàng Quà tặng", hasSubMenu: false },
  { name: "Xem thêm", hasSubMenu: false },
];

export const SUB_MENU_DATA: Record<string, string[]> = {
  "Thời trang Nam": ["Áo Sơ mi", "Áo Len", "Áo Khoác", "Quần Dài", "Giày & Bốt"],
  "Thời trang Nữ": ["Váy đầm", "Chân váy", "Áo Blouse", "Áo Len", "Phụ kiện", "Túi xách"],
  "Giày & Phụ kiện": ["Giày Sneaker", "Dép/Sandal", "Bốt", "Mũ", "Trang sức", "Balo & Túi"],
};

export const SOCIAL_CHANNELS = [
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "Twitter", href: "#", Icon: TwitterIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "YouTube", href: "#", Icon: YoutubeIcon },
] as const;