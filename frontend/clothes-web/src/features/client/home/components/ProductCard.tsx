"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { EyeIcon } from "lucide-react";
import React, { useState, useEffect } from "react";

interface ProductCardProps {
  name: string;
  price?: string | null;
  oldPrice?: string | null;
  image: string;
  hoverImage?: string;
  isTrending?: boolean;
  smallText?: string;
  saleTag?: string | null;
  showAddToCart?: boolean;
  onQuickView?: () => void;
  onAddToCart?: () => void;
}

const LAZY_IMAGE_PLACEHOLDER =
  "https://placehold.co/320x320/F3F4F6/9CA3AF?text=Đang+tải...";

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  oldPrice,
  image,
  hoverImage,
  isTrending,
  smallText,
  saleTag,
  showAddToCart = true,
  onQuickView,
  onAddToCart,
}) => {
  const [cardRef, cardIsVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [currentImage, setCurrentImage] = useState(LAZY_IMAGE_PLACEHOLDER);
  const [isEyeHovered, setIsEyeHovered] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (cardIsVisible) setCurrentImage(image);
  }, [cardIsVisible, image]);

  const handleMouseEnter = () => {
    if (cardIsVisible && hoverImage) setCurrentImage(hoverImage);
  };

  const handleMouseLeave = () => {
    if (cardIsVisible) setCurrentImage(image);
  };

  return (
    <div
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={cardRef as any}
      className={`flex flex-col group transition duration-300 transform rounded-lg overflow-hidden ${
        cardIsVisible ? "hover:scale-[1.02] hover:shadow-2xl" : "opacity-100"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden bg-gray-100">
        <div
          className="w-full h-80 bg-cover bg-center transition-all duration-500 ease-in-out"
          style={{
            backgroundImage: `url(${currentImage})`,
            opacity: currentImage === LAZY_IMAGE_PLACEHOLDER ? 0.7 : 1,
          }}
        ></div>
        {(isTrending || saleTag) && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
            {isTrending ? "Xu hướng" : saleTag}
          </div>
        )}
        <div
          className={`absolute top-3 right-3 transition-opacity duration-300 flex items-center ${
            cardIsVisible ? "opacity-0 group-hover:opacity-100" : "opacity-0"
          }`}
        >
          {isEyeHovered && (
            <div className="relative bg-black text-white px-3 py-1 text-xs font-semibold rounded-md mr-2 whitespace-nowrap">
              Xem nhanh
              <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-black"></div>
            </div>
          )}
          <button
            onMouseEnter={() => setIsEyeHovered(true)}
            onMouseLeave={() => setIsEyeHovered(false)}
            onClick={onQuickView}
            className="bg-white p-2 rounded-full text-gray-700 shadow-md hover:bg-black hover:text-white transition"
          >
            <EyeIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="pt-4 pb-2 text-center bg-white px-2">
        {smallText && <p className="text-xs text-gray-500">{smallText}</p>}
        <h3 className="text-base font-medium text-gray-900 group-hover:text-red-600 transition line-clamp-2 min-h-[2.5em]">
          {name}
        </h3>
        {price ? (
          <p className="mt-1 font-semibold text-gray-900">
            {oldPrice && (
              <span className="text-gray-400 line-through mr-2 font-normal text-xs">
                {oldPrice}
              </span>
            )}
            {price}
          </p>
        ) : (
          <a
            href="#"
            className="text-sm text-gray-500 mt-1 hover:text-red-600 flex items-center justify-center"
          >
            Mua ngay <span className="ml-1 text-xs">{">"}</span>
          </a>
        )}
        {showAddToCart && (
          <button
            onClick={onAddToCart}
            className="w-full mt-2 text-sm text-gray-500 border border-gray-300 py-2 rounded-md hover:bg-black hover:text-white transition"
          >
            Thêm vào Giỏ
          </button>
        )}
      </div>
    </div>
  );
};
