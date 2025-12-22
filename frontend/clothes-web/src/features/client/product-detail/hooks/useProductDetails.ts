import { useState, useCallback, useRef } from "react";
import { IProductData, IColorOption, IUseProductDetailsReturn } from "../types";
import { fetchProductDetails, fetchRelatedProducts } from "../services/product";
import { useQuery } from "./useQuery";

export const useProductDetails = (
  initialData: IProductData
): IUseProductDetailsReturn => {
  const [currentProductId, setCurrentProductId] = useState<string>(
    initialData.id
  );

  const {
    data: productData,
    isLoading: isProductLoading,
    error: productError,
  } = useQuery<IProductData | null>(["product", currentProductId], () =>
    fetchProductDetails(currentProductId)
  );

  const { data: relatedProducts, isLoading: isRelatedLoading } = useQuery<
    IProductData[]
  >(["relatedProducts", currentProductId], () =>
    fetchRelatedProducts(currentProductId)
  );

  const currentProduct = productData || initialData;
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<IColorOption | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );
  const [activeTab, setActiveTab] = useState<string>("details");

  // Logic cuộn Related Products
  const relatedProductsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollStatus = useCallback(() => {
    const el = relatedProductsRef.current;
    if (el) {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      // Trừ hao 5px để tránh lỗi làm tròn pixel trên một số trình duyệt
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  }, []);

  // Reset state khi đổi sản phẩm
  if (currentProduct.id !== currentProductId) {
    setSelectedColor(null);
    setSelectedSize(null);
    setCurrentImageIndex(0);
    setActiveTab("details");
    setQuantity(1);
    setCurrentProductId(currentProduct.id);
  }

  const showMessage = useCallback((msg: string, type: "success" | "error") => {
    setMessageType(type);
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  }, []);

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % currentProduct.images.length);
  }, [currentProduct.images.length]);

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + currentProduct.images.length) % currentProduct.images.length
    );
  }, [currentProduct.images.length]);

  const handleAddToCart = useCallback(() => {
    if (!selectedColor || !selectedSize) {
      showMessage("Vui lòng chọn Màu sắc và Kích cỡ.", "error");
      return false;
    }
    showMessage(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`, "success");
    return true ;
  }, [selectedColor, selectedSize, quantity, showMessage]);

  const handleBuyNow = useCallback(() => {
    if (!selectedColor || !selectedSize) {
      showMessage("Vui lòng chọn Màu sắc và Kích cỡ.", "error");
      return;
    }
    showMessage("Đang chuyển hướng thanh toán...", "success");
  }, [selectedColor, selectedSize, showMessage]);

  // HÀM CUỘN ĐÚNG 1 THẺ SẢN PHẨM
  const handleScrollProducts = useCallback(
    (direction: "left" | "right") => {
      const container = relatedProductsRef.current;
      if (container) {
        const firstItem = container.firstElementChild as HTMLElement;
        if (firstItem) {
          // Chiều rộng 1 card + gap (gap-6 = 24px)
          const scrollAmount = firstItem.offsetWidth + 24;
          container.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
          });
          // Cập nhật trạng thái nút sau khi cuộn xong
          setTimeout(checkScrollStatus, 500);
        }
      }
    },
    [checkScrollStatus]
  );

  const setCurrentProductHandler = useCallback((productData: IProductData) => {
    setCurrentProductId(productData.id);
  }, []);

  return {
    currentProduct,
    relatedProducts: relatedProducts || [],
    currentImageIndex,
    selectedColor,
    selectedSize,
    quantity,
    message,
    messageType,
    activeTab,
    relatedProductsRef: relatedProductsRef as React.RefObject<HTMLDivElement>,
    isProductLoading,
    isRelatedLoading,
    productError,
    canScrollLeft,
    canScrollRight,
    checkScrollStatus,
    setCurrentProduct: setCurrentProductHandler,
    setCurrentImageIndex,
    setSelectedColor,
    setSelectedSize,
    setQuantity,
    setActiveTab,
    handleNextImage,
    handlePrevImage,
    handleAddToCart,
    handleBuyNow,
    handleScrollLeft: () => handleScrollProducts("left"),
    handleScrollRight: () => handleScrollProducts("right"),
  };
};
