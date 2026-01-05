import { IProduct, IColor, IProductReview } from "@/types/product";

/**
 * Product Detail Feature Types
 */

// Color Option Type
export interface IColorOption extends IColor {
  count?: number;
}

// Product Detail Type (extends base Product)
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IProductDetail extends IProduct {
  // All fields inherited from IProduct which now includes reviews and relatedProducts
}

// Tab Content Type
export interface ITab {
  key: string;
  label: string;
  content?: React.ReactNode;
}

// Message Type
export interface IMessage {
  message: string;
  type: "success" | "error" | "warning" | "info";
}

// Product Selection State
export interface IProductSelection {
  color: IColorOption | null;
  size: string | null;
  quantity: number;
  imageIndex: number;
}

// Hook Return Types
export interface IUseProductDetailsReturn {
  currentProduct: IProductDetail;
  relatedProducts: IProduct[];
  currentImageIndex: number;
  selectedColor: IColorOption | null;
  selectedSize: string | null;
  quantity: number;
  message: string;
  messageType: "success" | "error" | "warning" | "info";
  activeTab: string;
  relatedProductsRef: React.RefObject<HTMLDivElement>;
  isProductLoading: boolean;
  isRelatedLoading: boolean;
  productError: unknown;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  checkScrollStatus: () => void;
  setCurrentProduct: (product: IProductDetail) => void;
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

export interface IUseProductGalleryReturn {
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
  handleNextImage: () => void;
  handlePrevImage: () => void;
}

export interface IUseProductSelectionReturn extends IProductSelection {
  setColor: (color: IColorOption | null) => void;
  setSize: (size: string | null) => void;
  setQuantity: (quantity: number) => void;
  setImageIndex: (index: number) => void;
  resetSelection: () => void;
}

export interface IUseProductReviewsReturn {
  reviews: IProductReview[];
  isLoading: boolean;
  error: unknown;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<number, number>;
}

export interface IUseProductTabsReturn {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: ITab[];
}
