"use client";

import React from "react";
import { ProductCard } from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export const WeeklyTrending: React.FC<{
  onQuickView?: () => void;
  onAddToCart?: () => void;
}> = ({ onQuickView, onAddToCart }) => {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const IMG = "https://placehold.co/320x400/E5E7EB/333333/png?text=Sản+phẩm";
  const BANNER =
    "https://placehold.co/400x600/D4D4D4/333333/png?text=Mẫu+người";

  const trendingProducts = [
    {
      name: "Bốt cao cổ đan ReKnit",
      price: "$140.00",
      image: IMG,
      hoverImage: IMG,
    },
    {
      name: "Áo len cáp Merino Felted",
      price: "$98.00",
      image: IMG,
      hoverImage: IMG,
    },
    {
      name: "Bốt Chukka da lộn cổ điển",
      price: "$125.00",
      image: IMG,
      hoverImage: IMG,
    },
    {
      name: "Mũ bóng chày Organic Kiwi",
      price: "$40.00",
      image: IMG,
      hoverImage: IMG,
    },
  ];

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <section
      ref={sectionRef as any}
      className={`pt-12 px-4 sm:px-0 scroll-reveal ${
        isVisible ? "animate-reveal" : ""
      }`}
    >
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
        <div className="w-full lg:w-1/4 bg-gray-100 p-8 flex flex-col justify-between relative overflow-hidden rounded-lg min-h-[400px]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${BANNER})` }}
          ></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-4">
              Sản phẩm nổi bật tuần này
            </h2>
            <p className="text-sm text-gray-600 mb-6">100% da thủ công</p>
          </div>
          <button className="relative z-10 bg-white text-gray-900 px-8 py-3 text-sm font-semibold hover:bg-gray-200 transition rounded-md shadow-md">
            Mua ngay
          </button>
        </div>

        <div className="flex-1 relative flex items-center">
          <button className="hidden xl:flex absolute left-0 transform -translate-x-1/2 z-20 w-10 h-10 rounded-full items-center justify-center bg-white border border-gray-300 shadow-md hover:bg-black hover:text-white transition">
            <ChevronLeft size={20} />
          </button>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
            {trendingProducts.map((p, i) => (
              <ProductCard
                key={i}
                {...p}
                showAddToCart={true}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
          <button className="hidden xl:flex absolute right-0 transform translate-x-1/2 z-20 w-10 h-10 rounded-full items-center justify-center bg-white border border-gray-300 shadow-md hover:bg-black hover:text-white transition">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};
