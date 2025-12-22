/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Heart,
  Share2,
  HelpCircle,
  Ruler,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  INITIAL_PRODUCT_DATA,
  TABS,
  ALL_PRODUCTS,
} from "@/features/product-detail/constants";
import { useProductDetails } from "@/features/product-detail/hooks/useProductDetails";
import {
  Breadcrumbs,
  RatingStars,
} from "@/features/product-detail/components/common/Rating";
import { ColorPicker } from "@/features/product-detail/components/common/ColorPicker";
import { SizeSelector } from "@/features/product-detail/components/common/SizeSelector";
import { QuantityControl } from "@/features/product-detail/components/common/QuantityControl";
import { MessageComponent } from "@/features/product-detail/components/common/Utilities";
import { ProductCardSkeleton } from "@/features/product-detail/components/products/Skeletons";
import { RelatedProductCard } from "@/features/product-detail/components/products/RelatedProductCard";
import { renderTabContent } from "@/features/product-detail/components/TabContent";
import { QuickViewModal } from "@/components/common/QuickViewModal";

export default function ProductDetailPage() {
  const {
    currentProduct,
    currentImageIndex,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    quantity,
    setQuantity,
    message,
    messageType,
    activeTab,
    setActiveTab,
    relatedProductsRef,
    setCurrentProduct,
    setCurrentImageIndex,
    handleNextImage,
    handlePrevImage,
    handleAddToCart,
    handleBuyNow,
    handleScrollLeft,
    handleScrollRight,
    isProductLoading,
    isRelatedLoading,
    productError,
    canScrollLeft,
    canScrollRight,
    checkScrollStatus,
  } = useProductDetails(INITIAL_PRODUCT_DATA);

  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  // State: Flying product animation
  const [flyingProduct, setFlyingProduct] = useState<{
    show: boolean;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  }>({
    show: false,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  });

  // State: QuickView Modal
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
  const [showQuickView, setShowQuickView] = useState(false);

  // Handler: Hiệu ứng sản phẩm nhảy tới giỏ hàng
  const handleAddToCartWithAnimation = () => {
    const checkAdd = handleAddToCart();
    if (!checkAdd) return;
    const addButton = document.querySelector('[aria-label="Giỏ hàng"]');
    if (addButton) {
      const cartRect = addButton.getBoundingClientRect();
      const productImage = document.querySelector(
        '[alt="' + currentProduct.name + '"]'
      );

      if (productImage) {
        const imageRect = productImage.getBoundingClientRect();
        setFlyingProduct({
          show: true,
          startX: imageRect.left,
          startY: imageRect.top,
          endX: cartRect.left + cartRect.width / 2,
          endY: cartRect.top + cartRect.height / 2,
        });

        setTimeout(() => {
          setFlyingProduct((prev) => ({ ...prev, show: false }));
        }, 1000);
      }
    }
  };

  useEffect(() => {
    const activeThumbnail = thumbnailRefs.current[currentImageIndex];
    if (activeThumbnail) {
      activeThumbnail.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [currentImageIndex]);

  useEffect(() => {
    const scrollContainer = relatedProductsRef.current;
    if (scrollContainer) {
      const handleScroll = () => {
        if (typeof checkScrollStatus === "function") {
          checkScrollStatus();
        }
      };
      handleScroll();
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [relatedProductsRef, isRelatedLoading, checkScrollStatus]);

  const displayedImageUrl =
    currentProduct.images[currentImageIndex]?.url ||
    currentProduct.mainImageUrl;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 lg:p-12 font-[Inter] ml-12">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs home="Trang chủ" current={currentProduct.name} />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 bg-white p-6 rounded-xl shadow-lg">
          <div className="lg:w-1/2 lg:sticky lg:top-0 lg:self-start">
            <div className="flex flex-col sm:flex-row gap-4">
              <div
                ref={thumbnailContainerRef}
                className="flex flex-row sm:flex-col space-x-3 sm:space-x-0 sm:space-y-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[720px] hide-scrollbar"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {currentProduct.images.map((image, index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      if (el) thumbnailRefs.current[index] = el;
                    }}
                    className={`shrink-0 w-16 h-24 sm:w-20 sm:h-28 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
                      currentImageIndex === index
                        ? "border-gray-900 shadow-md scale-105"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* ẢNH CHÍNH - THÊM CLASS 'group' ĐỂ ĐIỀU KHIỂN HOVER NÚT */}
              <div className="group grow relative aspect-4/6 rounded-xl overflow-hidden max-w-[450px] mx-auto lg:mx-0">
                {isProductLoading ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
                    Đang tải ảnh...
                  </div>
                ) : productError ? (
                  <div className="w-full h-full flex items-center justify-center bg-red-100 text-red-700">
                    Lỗi tải dữ liệu
                  </div>
                ) : (
                  <img
                    src={displayedImageUrl}
                    alt={currentProduct.name}
                    className="w-full h-full object-cover transition-opacity duration-300"
                    loading={currentImageIndex === 0 ? "eager" : "lazy"}
                  />
                )}

                {/* NÚT PREV - Mặc định opacity-0, hiện lên khi group (ảnh cha) được hover */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-80 hover:opacity-100! transition-all duration-300 z-10"
                  aria-label="Ảnh trước"
                >
                  <ChevronLeft size={20} className="text-gray-700" />
                </button>

                {/* NÚT NEXT - Mặc định opacity-0, hiện lên khi group (ảnh cha) được hover */}
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-80 hover:opacity-100! transition-all duration-300 z-10"
                  aria-label="Ảnh sau"
                >
                  <ChevronRight size={20} className="text-gray-700" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {currentProduct.name}
            </h1>
            <div className="flex items-center justify-between mb-4">
              <p className="text-2xl font-bold text-gray-900">
                ${currentProduct.price.toFixed(2)}
              </p>
              <div className="flex items-center space-x-1">
                <RatingStars
                  rating={currentProduct.rating}
                  reviewCount={currentProduct.reviewCount}
                />
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-6 leading-relaxed">
              {currentProduct.description}
            </p>

            <ColorPicker
              colors={currentProduct.colors}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
            <SizeSelector
              sizes={currentProduct.sizes}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <div className="flex flex-row gap-3">
                <QuantityControl
                  quantity={quantity}
                  setQuantity={(q) =>
                    setQuantity(typeof q === "function" ? q(quantity) : q)
                  }
                />
                <button
                  onClick={handleAddToCartWithAnimation}
                  className="grow sm:grow-0 px-6 py-3 text-sm font-semibold rounded-lg border border-gray-900 text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
              <button
                onClick={handleBuyNow}
                className="grow px-6 py-3 text-sm font-semibold rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors duration-200 shadow-md"
              >
                Mua Ngay
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 border-b border-gray-200 pb-5">
              <a
                href="#"
                className="flex items-center space-x-1 hover:text-gray-900 transition-colors"
              >
                <Heart size={16} className="text-gray-500" />
                <span>Thêm vào yêu thích</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-1 hover:text-gray-900 transition-colors"
              >
                <Share2 size={16} className="text-gray-500" />
                <span>Chia sẻ</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-1 hover:text-gray-900 transition-colors"
              >
                <HelpCircle size={16} className="text-gray-500" />
                <span>Hỏi đáp</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-1 hover:text-gray-900 transition-colors"
              >
                <Ruler size={16} className="text-gray-500" />
                <span>Hướng dẫn chọn size</span>
              </a>
            </div>

            <div className="mt-5 space-y-2 text-sm">
              <p className="font-medium text-red-600">
                Chỉ còn {currentProduct.stock} chiếc
              </p>
              <p className="text-gray-700">
                <span className="font-medium mr-2">Mã sản phẩm (SKU):</span>{" "}
                {currentProduct.sku}
              </p>
              <p className="text-gray-700">
                <span className="font-medium mr-2">Danh mục:</span>{" "}
                {currentProduct.categories}
              </p>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-5 space-y-2 text-sm">
              <p className="text-gray-700">
                <span className="font-medium mr-2">Giao hàng dự kiến:</span>{" "}
                {currentProduct.deliveryDate}
              </p>
              <p className="text-gray-700">
                <span className="font-medium mr-2">
                  Miễn phí vận chuyển & Đổi trả:
                </span>{" "}
                Cho tất cả các đơn hàng trên $220
              </p>
            </div>

            <div className="mt-6">
              <div className="border border-gray-200 p-4 rounded-lg bg-gray-50 text-center">
                <div className="flex justify-center space-x-3 mb-2">
                  <img
                    src="https://img.icons8.com/color/48/000000/visa.png"
                    alt="Visa"
                    className="h-6 w-auto"
                  />
                  <img
                    src="https://img.icons8.com/color/48/000000/mastercard.png"
                    alt="Mastercard"
                    className="h-6 w-auto"
                  />
                  <img
                    src="https://img.icons8.com/color/48/000000/amex.png"
                    alt="Amex"
                    className="h-6 w-auto"
                  />
                  <img
                    src="https://img.icons8.com/color/48/000000/jcb.png"
                    alt="JCB"
                    className="h-6 w-auto"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Đảm bảo thanh toán an toàn & bảo mật
                </p>
              </div>
            </div>

            {message && (
              <MessageComponent message={message} type={messageType} />
            )}

            <div className="mt-8 pt-4 border-t border-gray-200 text-xs text-gray-400">
              <p>ID Người dùng: Mocked User</p>
            </div>
          </div>
        </div>

        {/* TABS SECTION */}
        <div className="mt-12 bg-white p-6 rounded-xl shadow-lg">
          <div className="flex space-x-8 border-b border-gray-200 overflow-x-auto whitespace-nowrap">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-3 text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab.key
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {renderTabContent(activeTab, currentProduct)}
        </div>

        {/* RELATED PRODUCTS */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Sản phẩm liên quan
            </h2>

            <div className="flex gap-3">
              <button
                onClick={handleScrollLeft}
                disabled={!canScrollLeft}
                className={`p-2.5 rounded-full border transition-all duration-300 ${
                  canScrollLeft
                    ? "border-gray-400 hover:bg-white hover:shadow-md text-black cursor-pointer"
                    : "border-gray-200 text-gray-400 cursor-not-allowed opacity-90"
                }`}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleScrollRight}
                disabled={!canScrollRight}
                className={`p-2.5 rounded-full border transition-all duration-300 ${
                  canScrollRight
                    ? "border-gray-400 hover:bg-white hover:shadow-md text-black cursor-pointer"
                    : "border-gray-200 text-gray-400 cursor-not-allowed opacity-90"
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div
            ref={relatedProductsRef}
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x scroll-smooth pb-4 hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {isRelatedLoading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => <ProductCardSkeleton key={i} />)
              : ALL_PRODUCTS.map((product) => (
                  <div
                    key={product.id}
                    className="min-w-60 sm:min-w-[300px] snap-start"
                  >
                    <RelatedProductCard
                      product={product}
                      setCurrentProduct={setCurrentProduct}
                      onQuickView={() => {
                        setQuickViewProduct(product);
                        setShowQuickView(true);
                      }}
                    />
                  </div>
                ))}
          </div>
        </div>

        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }

          @keyframes flyToCart {
            0% {
              transform: translate(0, 0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translate(
                  calc(${flyingProduct.endX - flyingProduct.startX}px),
                  calc(${flyingProduct.endY - flyingProduct.startY}px)
                )
                scale(0.1);
              opacity: 0;
            }
          }

          .flying-product {
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            animation: flyToCart 0.6s ease-in forwards;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          }
        `}</style>

        {flyingProduct.show && (
          <div
            className="flying-product"
            style={{
              left: `${flyingProduct.startX}px`,
              top: `${flyingProduct.startY}px`,
              width: "150px",
              height: "150px",
              backgroundImage: `url(${displayedImageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}

        {/* QuickView Modal */}
        {showQuickView && (
          <QuickViewModal
            product={quickViewProduct}
            colors={[]} // Truyền colors từ dữ liệu nếu có
            onClose={() => {
              setShowQuickView(false);
              setQuickViewProduct(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
