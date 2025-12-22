/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { ProductCard } from "./ProductCard";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface FeaturedProductsProps {
  onQuickView?: () => void;
  onAddToCart?: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  onQuickView,
  onAddToCart,
}) => {
  const [productsToShow, setProductsToShow] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const IMG = "https://placehold.co/320x400/E5E7EB/333333/png?text=Sản+phẩm";

  const allProducts = Array(15).fill({
    name: "Sản phẩm Megastore Premium",
    price: "$140.00",
    image: IMG,
    hoverImage: IMG,
  });

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setProductsToShow((prev) => prev + 6);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section
      ref={sectionRef as any}
      className={`pt-12 px-4 sm:px-0 scroll-reveal ${
        isVisible ? "animate-reveal" : ""
      }`}
    >
      <div className="mb-8 flex justify-between items-center pb-2">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Sản phẩm nổi bật
        </h2>
        <a
          href="#"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
        >
          Xem tất cả
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {allProducts.slice(0, productsToShow).map((p, i) => (
          <ProductCard
            key={i}
            {...p}
            onQuickView={onQuickView}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
      {productsToShow < allProducts.length && (
        <div className="text-center mt-12">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className={`
                            border border-gray-300 text-gray-800 px-8 py-3 text-sm font-semibold tracking-wider rounded-md shadow-sm transition duration-200 
                            ${
                              isLoading
                                ? "bg-gray-100 cursor-not-allowed"
                                : "hover:bg-black hover:text-white"
                            }
                        `}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-black mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Tải thêm"
            )}
          </button>
        </div>
      )}
    </section>
  );
};
