/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IColorOption {
  name: string;
  code: string;
}

export interface IProductImage {
  url: string;
  alt: string;
}

export interface IProductData {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
  colors: IColorOption[];
  sizes: string[];
  stock: number;
  sku: string;
  categories: string;
  deliveryDate: string;
  images: IProductImage[];
  mainImageUrl: string;
  oldPrice?: number | null;
  discount?: number | null;
}

export interface ITab {
  key: string;
  label: string;
}

export interface IMessageProps {
  message: string;
  type: "success" | "error";
}

export interface IRelatedProductCardProps {
  product: IProductData;
  setCurrentProduct: (p: IProductData) => void;
}

export interface IUseQueryReturn<T> {
  data: T | undefined;
  isLoading: boolean;
  error: any;
}

export interface IUseProductDetailsReturn {
  currentProduct: IProductData;
  relatedProducts: IProductData[];
  currentImageIndex: number;
  selectedColor: IColorOption | null;
  selectedSize: string | null;
  quantity: number;
  message: string;
  messageType: "success" | "error";
  activeTab: string;
  relatedProductsRef: React.RefObject<HTMLDivElement>;
  isProductLoading: boolean;
  isRelatedLoading: boolean;
  productError: any;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  checkScrollStatus: any;
  setCurrentProduct: (p: IProductData) => void;
  setCurrentImageIndex: (index: number) => void;
  setSelectedColor: (color: IColorOption | null) => void;
  setSelectedSize: (size: string | null) => void;
  setQuantity: (quantity: number) => void;
  setActiveTab: (tab: string) => void;
  handleNextImage: () => void;
  handlePrevImage: () => void;
  handleAddToCart: () => boolean;
  handleBuyNow: () => void;
  handleScrollLeft: () => void;
  handleScrollRight: () => void;
}
