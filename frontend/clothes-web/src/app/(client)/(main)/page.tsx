"use client";

import React, { useState, useEffect, useCallback } from "react";
import createRipple from "@/utils/createRipple";
import { QuickViewModal } from "@/components/common/QuickViewModal";
import HeroSlider from "@/features/client/home/components/HeroSlider";
import MainContent from "@/features/client/home/components/MainContent";
import { AddToCartModal } from "@/features/client/shop/components/AddToCartModal";
import { Product } from "@/features/client/shop/types";

// Dữ liệu Slide mẫu (Nên đặt ở một file constants riêng nếu dữ liệu lớn)
const HERO_SLIDES = [
  {
    title: "Áo Cardigan dệt kim Purl",
    subtitle:
      "Cơ hội nâng cấp tủ quần áo với những lựa chọn tinh tế nhất mùa này.",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1600",
  },
  {
    title: "BST Denim Xuân 2026",
    subtitle:
      "Khám phá các thiết kế denim cotton hữu cơ mới nhất từ chúng tôi.",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1600",
  },
  {
    title: "Giảm tới 50% Outwear",
    subtitle: "Ưu đãi có thời hạn cho tất cả các dòng áo khoác và áo măng tô.",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1600",
  },
];

// Sample product for QuickView
const SAMPLE_PRODUCT: Product = {
  id: "sample-1",
  name: "Sản phẩm Megastore Premium",
  nameNoAccent: "San pham Megastore Premium",
  slug: "san-pham-megastore-premium",
  price: 140,
  discount: 10,
  description:
    "Sản phẩm chất lượng cao được chế tác từ chất liệu tốt nhất. Hoàn hảo cho mọi dịp.",
  images: [
    "https://placehold.co/500x750/f3f4f6/333?text=Anh+San+Pham",
    "https://placehold.co/500x750/e5e7eb/333?text=Anh+Hover",
    "https://placehold.co/500x750/f3f4f6/333?text=Anh+San+Pham+1",
    "https://placehold.co/500x750/e5e7eb/333?text=Anh+San+Pham+2",
  ],
  color: { name: "Đen", code: "#000000" },
  size: "XS,S,M,L,XL,XXL",
  stock: 20,
  rating: 4.5,
  amountBuy: 150,
  productNew: true,
  category: "Áo Khoác",
  status: "active",
  deleted: false,
  deletedAt: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function HomePage() {
  // --- States cho HeroSlider ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // --- State cho QuickView ---
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // --- State cho AddToCart ---
  const [selectedProductForAddToCart, setSelectedProductForAddToCart] =
    useState<Product | null>(null);

  // --- Logic Parallax ---
  useEffect(() => {
    const handleScroll = () => {
      setParallaxOffset(Math.min(window.scrollY * 0.2, 150));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Logic Tự động chuyển Slide ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000); // 6 giây đổi slide 1 lần
    return () => clearInterval(timer);
  }, []);

  // --- Helper: Chuyển slide thủ công ---
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // --- Helper: Mở QuickView ---
  const handleQuickView = useCallback(() => {
    setSelectedProduct(SAMPLE_PRODUCT);
  }, []);

  // --- Helper: Đóng QuickView ---
  const handleCloseQuickView = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  // --- Helper: Mở AddToCart Modal ---
  const handleAddToCart = useCallback(() => {
    setSelectedProductForAddToCart(SAMPLE_PRODUCT);
  }, []);

  // --- Helper: Đóng AddToCart Modal ---
  const handleCloseAddToCart = useCallback(() => {
    setSelectedProductForAddToCart(null);
  }, []);

  return (
    <>
      <main className="animate-in fade-in duration-1000">
        <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-12 pb-12">
          {" "}
          <HeroSlider
            heroSlides={HERO_SLIDES}
            currentSlide={currentSlide}
            goToSlide={goToSlide}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            parallaxOffset={parallaxOffset}
            createRipple={createRipple}
          />
          <div className="relative z-20 bg-white">
            <MainContent
              createRipple={createRipple}
              onQuickView={handleQuickView}
              onAddToCart={handleAddToCart}
            />
          </div>
        </section>
      </main>

      {/* QuickView Modal */}
      <QuickViewModal
        product={selectedProduct}
        onClose={handleCloseQuickView}
      />

      {/* Add to Cart Modal */}
      <AddToCartModal
        product={selectedProductForAddToCart}
        onClose={handleCloseAddToCart}
      />
    </>
  );
}
