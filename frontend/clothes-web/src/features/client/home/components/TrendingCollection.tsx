"use client";

import { ProductCard } from "@/features/home/components/ProductCard";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import React from "react";

export const TrendingCollection: React.FC<{
  onQuickView?: () => void;
  onAddToCart?: () => void;
}> = ({ onQuickView, onAddToCart }) => {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const IMG = "https://placehold.co/320x400/D4D4D4/333333/png?text=Bộ+sưu+tập";

  const products = [
    { name: "Áo len Alpaca Oversized", image: IMG, hoverImage: IMG },
    { name: "Áo len cổ tròn Premium", image: IMG, hoverImage: IMG },
    { name: "Bốt cao cổ Forever", image: IMG, hoverImage: IMG },
  ];

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <section
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={sectionRef as any}
      className={`pt-12 px-4 sm:px-0 scroll-reveal ${
        isVisible ? "animate-reveal" : ""
      }`}
    >
      <div className="mb-6 flex justify-between items-center border-b border-gray-100 pb-2">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Bộ sưu tập Xu hướng
        </h2>
        <a
          href="#"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
        >
          Xem tất cả
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {products.map((p, i) => (
          <ProductCard
            key={i}
            {...p}
            showAddToCart={false}
            onQuickView={onQuickView}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
};
