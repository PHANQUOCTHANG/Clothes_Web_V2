"use client";

import React from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"; // Giả định hook này đã có types
import {
  BannerItem,
  CategoryItemData,
  MainContentProps,
} from "@/features/home/types";
import { TrendingCollection } from "@/features/home/components/TrendingCollection";
import { WeeklyTrending } from "@/features/home/components/WeeklyTrending";
import { FeaturedProducts } from "@/features/home/components/FeaturedProducts";
import LargePromoBanner from "@/features/home/components/LargePromoBanner";
import ServiceInfo from "@/features/home/components/ServiceInfo";

// --- CONSTANTS ---
const IMAGE_PLACEHOLDER =
  "https://placehold.co/400x400/D4D4D4/333333/png?text=Quảng+cáo";

const AD_BANNERS: BannerItem[] = [
  {
    title: "Áo sơ mi dáng rộng Relaxed fit",
    tag: "GIẢM GIÁ 20%",
    image: IMAGE_PLACEHOLDER,
  },
  {
    title: "Giảm 20% Tất cả sản phẩm",
    tag: "100% da thủ công",
    image: IMAGE_PLACEHOLDER,
  },
  {
    title: "Giảm 20% khi mua trên APP",
    tag: "TẢI ỨNG DỤNG NGAY",
    image: IMAGE_PLACEHOLDER,
  },
];

const POPULAR_CATEGORIES: CategoryItemData[] = [
  { name: "Bốt", icon: "👢" },
  { name: "Áo khoác Nam", icon: "🧥" },
  { name: "Tất", icon: "🧦" },
  { name: "Áo khoác ngoài", icon: "👚" },
  { name: "Giày Da", icon: "👞" },
  { name: "Balo", icon: "🎒" },
  { name: "Quà tặng cho Nam", icon: "🎁" },
  { name: "Phụ kiện", icon: "💍" },
  { name: "Túi Da", icon: "👜" },
  { name: "Denim", icon: "👖" },
  { name: "Áo len", icon: "🧶" },
  { name: "Giày Sneaker", icon: "👟" },
];

// --- SUB-COMPONENTS ---

const AdBanner: React.FC<
  BannerItem & { index: number; isVisible: boolean }
> = ({ title, tag, image, index, isVisible }) => {
  return (
    <div
      className={`flex-1 h-56 bg-white shadow-lg overflow-hidden relative group rounded-lg transition duration-500 transform hover:scale-[1.02] ${
        isVisible ? "animate-slide-up-fade-in" : "opacity-0"
      }`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        animationDelay: `${index * 0.15}s`,
        animationFillMode: "forwards",
      }}
    >
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
      <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
        <h3 className="text-xl font-bold max-w-[200px] leading-tight drop-shadow-md">
          {title}
        </h3>
        <button className="bg-white text-gray-900 text-xs font-bold px-4 py-2 w-max shadow-md hover:bg-red-600 hover:text-white transition-colors rounded-md uppercase tracking-widest">
          {tag}
        </button>
      </div>
    </div>
  );
};

const CategoryCard: React.FC<
  CategoryItemData & { index: number; isVisible: boolean }
> = ({ name, icon, index, isVisible }) => (
  <div
    className={`flex flex-col items-center justify-center p-6 text-center bg-white border border-gray-100 transition-all duration-300 group hover:bg-gray-50 cursor-pointer ${
      isVisible ? "animate-slide-up-fade-in" : "opacity-0"
    }`}
    style={{
      animationDelay: `${index * 0.05}s`,
      animationFillMode: "forwards",
    }}
  >
    <div className="w-16 h-16 mb-3 flex items-center justify-center text-3xl bg-gray-50 rounded-full group-hover:bg-red-50 group-hover:rotate-6 transition-all duration-300 shadow-sm">
      {icon}
    </div>
    <p className="text-xs font-bold text-gray-800 text-center uppercase tracking-tighter">
      {name}
    </p>
  </div>
);

// --- MAIN COMPONENT ---

const MainContent: React.FC<
  MainContentProps & { onQuickView?: () => void; onAddToCart?: () => void }
> = ({ createRipple, onQuickView, onAddToCart }) => {
  const [bannersRef, bannersVisible] = useIntersectionObserver({
    threshold: 0.1,
  });
  const [categoriesRef, categoriesVisible] = useIntersectionObserver({
    threshold: 0.1,
  });

  return (
    <>
      {/* 1. Promo Banners Grid */}
      <div
        ref={bannersRef}
        className="pt-8 md:pt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {AD_BANNERS.map((banner, index) => (
          <AdBanner
            key={banner.title}
            {...banner}
            index={index}
            isVisible={bannersVisible}
          />
        ))}
      </div>

      {/* 2. Popular Categories */}
      <div className="pt-8">
        <header className="mb-8 flex justify-between items-center border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Danh mục phổ biến
            </h2>
          </div>
          <a
            href="#"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
          >
            Xem tất cả
          </a>
        </header>

        <div
          ref={categoriesRef}
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 border border-gray-200"
        >
          {POPULAR_CATEGORIES.map((cat, index) => (
            <CategoryCard
              key={cat.name}
              {...cat}
              index={index}
              isVisible={categoriesVisible}
            />
          ))}
        </div>
      </div>

      {/* Placeholder cho các phần tiếp theo - Nên tách thành các component riêng lẻ tương tự */}
      <TrendingCollection onQuickView={onQuickView} onAddToCart={onAddToCart} />
      <WeeklyTrending onQuickView={onQuickView} onAddToCart={onAddToCart} />
      <FeaturedProducts onQuickView={onQuickView} onAddToCart={onAddToCart} />
      <LargePromoBanner createRipple={createRipple} />
      <ServiceInfo />
    </>
    // </section>
  );
};

export default MainContent;
