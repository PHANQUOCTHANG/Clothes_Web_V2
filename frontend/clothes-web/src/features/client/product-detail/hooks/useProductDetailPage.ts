// useProductDetailPage - Compose Hook
// - Kết hợp tất cả hooks của product detail
// - Xử lý data: hình ảnh, variant, actions
// - Quản lý UI state
// - Trả về data sạch cho page

import { useState, useCallback, useRef, useMemo } from "react";
import { IProduct, IColor } from "@/types/product";
import {
  useProductDetailBySlug,
  useProductDetailRelated,
} from "./useProductDetailData";
import { INITIAL_PRODUCT_DATA } from "../constants";

export interface UseProductDetailPageReturn {
  // Dữ liệu sản phẩm
  product: IProduct;
  relatedProducts: IProduct[];
  isProductLoading: boolean;
  isRelatedLoading: boolean;
  productError: Error | null;

  // Thư viện hình ảnh
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
  handleNextImage: () => void;
  handlePrevImage: () => void;
  displayedImageUrl: string;

  // Chọn biến thể (màu, kích cỡ, số lượng)
  selectedColor: IColor | null;
  setSelectedColor: (color: IColor | null) => void;
  selectedSize: string | null;
  setSelectedSize: (size: string | null) => void;
  quantity: number;
  setQuantity: (quantity: number | ((prev: number) => number)) => void;

  // Trạng thái UI
  activeTab: string;
  setActiveTab: (tab: string) => void;
  message: string;
  messageType: "success" | "error";

  // Hành động
  handleAddToCart: () => boolean;
  handleBuyNow: () => void;

  // Cuộn sản phẩm liên quan
  relatedProductsRef: React.RefObject<HTMLDivElement>;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  handleScrollLeft: () => void;
  handleScrollRight: () => void;
}

const DEFAULT_PRODUCT: IProduct = INITIAL_PRODUCT_DATA;

// Compose hook chính
export const useProductDetailPage = (
  slug?: string
): UseProductDetailPageReturn => {
  // 1. Fetch dữ liệu sản phẩm
  const { product: fetchedProduct, isLoading: isProductLoading } =
    useProductDetailBySlug(slug);

  const product = fetchedProduct || DEFAULT_PRODUCT;

  // 2. Fetch sản phẩm liên quan
  const categoryId =
    typeof product?.category === "string"
      ? product.category
      : product?.category?.id;
  const { products: relatedProducts, isLoading: isRelatedLoading } =
    useProductDetailRelated(categoryId);

  // 3. State thư viện hình ảnh
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 4. State chọn biến thể
  const [selectedColor, setSelectedColor] = useState<IColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  // 5. State UI
  const [activeTab, setActiveTab] = useState("details");
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  // 6. State cuộn sản phẩm liên quan
  const relatedProductsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Reset khi sản phẩm thay đổi
  if (product && product !== DEFAULT_PRODUCT) {
    if (currentImageIndex >= (product.images?.length || 0)) {
      setCurrentImageIndex(0);
    }
  }

  // Lấy ảnh hiển thị hiện tại
  const displayedImageUrl = useMemo(() => {
    const images = product.images || [];
    return (
      images[currentImageIndex] || images[0] || "https://placehold.co/450x600"
    );
  }, [product.images, currentImageIndex]);

  // Handler thông báo
  const showMessage = useCallback((msg: string, type: "success" | "error") => {
    setMessageType(type);
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  }, []);

  // Điều hướng hình ảnh
  const handleNextImage = useCallback(() => {
    if (!product.images?.length) return;
    setCurrentImageIndex((prev) => (prev + 1) % product.images!.length);
  }, [product.images]);

  const handlePrevImage = useCallback(() => {
    if (!product.images?.length) return;
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images!.length) % product.images!.length
    );
  }, [product.images]);

  // Hành động giỏ hàng
  const handleAddToCart = useCallback((): boolean => {
    if (!selectedColor || !selectedSize) {
      showMessage("Vui lòng chọn Màu sắc và Kích cỡ", "error");
      return false;
    }
    showMessage(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`, "success");
    return true;
  }, [selectedColor, selectedSize, quantity, showMessage]);

  const handleBuyNow = useCallback(() => {
    if (!selectedColor || !selectedSize) {
      showMessage("Vui lòng chọn Màu sắc và Kích cỡ", "error");
      return;
    }
    showMessage("Đang chuyển hướng thanh toán...", "success");
  }, [selectedColor, selectedSize, showMessage]);

  // Cuộn sản phẩm liên quan
  const checkScrollStatus = useCallback(() => {
    const el = relatedProductsRef.current;
    if (el) {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  }, []);  

  const handleScrollProducts = useCallback(
    (direction: "left" | "right") => {
      const container = relatedProductsRef.current;
      if (container) {
        const firstItem = container.firstElementChild as HTMLElement;
        if (firstItem) {
          const scrollAmount = firstItem.offsetWidth + 24;
          container.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
          });
          setTimeout(checkScrollStatus, 500);
        }
      }
    },
    [checkScrollStatus]
  );

  return {
    // Dữ liệu sản phẩm
    product,
    relatedProducts,
    isProductLoading,
    isRelatedLoading,
    productError: null,

    // Thư viện hình ảnh
    currentImageIndex,
    setCurrentImageIndex,
    handleNextImage,
    handlePrevImage,
    displayedImageUrl,

    // Chọn biến thể
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    quantity,
    setQuantity,

    // Trạng thái UI
    activeTab,
    setActiveTab,
    message,
    messageType,

    // Hành động
    handleAddToCart,
    handleBuyNow,

    // Cuộn sản phẩm liên quan
    relatedProductsRef: relatedProductsRef as React.RefObject<HTMLDivElement>,
    canScrollLeft,
    canScrollRight,
    handleScrollLeft: () => handleScrollProducts("left"),
    handleScrollRight: () => handleScrollProducts("right"),
  };
};
