/* eslint-disable @next/next/no-img-element */
"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";

import { TABS } from "@/features/client/product-detail/constants";
import { useProductDetailPage } from "@/features/client/product-detail/hooks/useProductDetailPage";
import {
  Breadcrumbs,
  RatingStars,
} from "@/features/client/product-detail/components/common/Rating";
import { ColorPicker } from "@/features/client/product-detail/components/common/ColorPicker";
import { SizeSelector } from "@/features/client/product-detail/components/common/SizeSelector";
import { QuantityControl } from "@/features/client/product-detail/components/common/QuantityControl";
import { MessageComponent } from "@/features/client/product-detail/components/common/Utilities";
import { renderTabContent } from "@/features/client/product-detail/components/TabContent";
import { RelatedProductCard } from "@/features/client/product-detail/components/products/RelatedProductCard";

/**
 * Product Detail Page
 * - Chỉ orchestration
 * - Gọi 1 compose hook duy nhất
 * - Render components với data từ hook
 */
export default function ProductDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : undefined;

  // Gọi compose hook - tất cả state từ đây
  const pageState = useProductDetailPage(slug);

  const {
    product: currentProduct,
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
    handleNextImage,
    handlePrevImage,
    handleAddToCart,
    handleBuyNow,
    handleScrollLeft,
    handleScrollRight,
    isProductLoading,
    relatedProducts,
    canScrollLeft,
    canScrollRight,
    displayedImageUrl,
    setCurrentImageIndex,
  } = pageState;

  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  // Sync thumbnail scroll khi image index thay đổi
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 lg:p-12 font-[Inter] ml-12">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <Breadcrumbs home="Trang chủ" current={currentProduct.name} />

        {/* Main Section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 bg-white p-6 rounded-xl shadow-lg">
          {/* Images */}
          <div className="lg:w-1/2 lg:sticky lg:top-0 lg:self-start">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Thumbnails */}
              <div
                ref={thumbnailContainerRef}
                className="flex flex-row sm:flex-col space-x-3 sm:space-x-0 sm:space-y-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[720px] hide-scrollbar"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {(currentProduct.images || []).map((image, index) => (
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
                      src={image}
                      alt={`${currentProduct.name} ${index}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div className="group grow relative aspect-4/6 rounded-xl overflow-hidden max-w-[450px] mx-auto lg:mx-0">
                {isProductLoading ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
                    Đang tải ảnh...
                  </div>
                ) : (
                  <img
                    src={displayedImageUrl}
                    alt={currentProduct.name}
                    className="w-full h-full object-cover transition-opacity duration-300"
                    loading={currentImageIndex === 0 ? "eager" : "lazy"}
                  />
                )}

                {/* Navigation Buttons */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-80 hover:opacity-100 transition-all duration-300 z-10"
                  aria-label="Ảnh trước"
                >
                  <ChevronLeft size={20} className="text-gray-700" />
                </button>

                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-80 hover:opacity-100 transition-all duration-300 z-10"
                  aria-label="Ảnh sau"
                >
                  <ChevronRight size={20} className="text-gray-700" />
                </button>
              </div>
            </div>
          </div>

          {/* Info & Actions */}
          <div className="lg:w-1/2">
            {/* Name & Price */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {currentProduct.name}
            </h1>
            <div className="flex items-center justify-between mb-4">
              <p className="text-2xl font-bold text-gray-900">
                ${currentProduct.price?.toFixed(2) || "0.00"}
              </p>
              <div className="flex items-center space-x-1">
                <RatingStars
                  rating={currentProduct.rating || 0}
                  reviewCount={0}
                />
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-700 mb-6 leading-relaxed">
              {currentProduct.description}
            </p>

            {/* Color & Size */}
            {currentProduct.color && (
              <ColorPicker
                colors={[currentProduct.color]}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
            )}
            {currentProduct.size && (
              <SizeSelector
                sizes={currentProduct.size.split(",").map((s) => s.trim())}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />
            )}

            {/* Quantity & Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <div className="flex flex-row gap-3">
                <QuantityControl
                  quantity={quantity}
                  setQuantity={(q) =>
                    setQuantity(typeof q === "function" ? q(quantity) : q)
                  }
                />
                <button
                  onClick={handleAddToCart}
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

            {/* Share & Wishlist */}
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
            </div>

            {/* Info */}
            <div className="mt-5 space-y-2 text-sm">
              <p className="font-medium text-red-600">
                Chỉ còn {currentProduct.stock} chiếc
              </p>
              <p className="text-gray-700">
                <span className="font-medium mr-2">Mã sản phẩm (SKU):</span>
                {currentProduct.slug}
              </p>
              <p className="text-gray-700">
                <span className="font-medium mr-2">Danh mục:</span>
                {typeof currentProduct.category === "string"
                  ? currentProduct.category
                  : currentProduct.category?.name}
              </p>
            </div>

            {/* Message */}
            {message && (
              <MessageComponent message={message} type={messageType} />
            )}
          </div>
        </div>

        {/* Tabs */}
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

        {/* Related Products */}

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

          {relatedProducts && relatedProducts.length > 0 && (
            <div
              ref={relatedProductsRef}
              className="flex gap-6 overflow-x-auto no-scrollbar snap-x scroll-smooth pb-4 hide-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {relatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="min-w-60 sm:min-w-[300px] snap-start"
                >
                  <RelatedProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>

        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  );
}
