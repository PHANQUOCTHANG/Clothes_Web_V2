"use client";

import React, { useState, useEffect, useCallback } from "react";
import HeroSlider from "@/features/home/components/HeroSlider";
import MainContent from "@/features/home/components/MainContent";
import createRipple from "@/utils/createRipple";
import { QuickViewModal } from "@/components/common/QuickViewModal";
import { AddToCartModal } from "@/features/shop/components/AddToCartModal";
import { Product, Color } from "@/features/shop/types";
import { COLORS } from "@/features/shop/constants";

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
  id: 1,
  name: "Sản phẩm Megastore Premium",
  price: 140,
  imageUrl: "https://placehold.co/500x750/f3f4f6/333?text=Anh+San+Pham",
  imageHoverUrl: "https://placehold.co/500x750/e5e7eb/333?text=Anh+Hover",
  colors: ["#000000", "#FFFFFF", "#FF6B6B"],
  description:
    "Sản phẩm chất lượng cao được chế tác từ chất liệu tốt nhất. Hoàn hảo cho mọi dịp.",
  modalImages: [
    "https://placehold.co/500x750/f3f4f6/333?text=Anh+San+Pham+1",
    "https://placehold.co/500x750/e5e7eb/333?text=Anh+San+Pham+2",
  ],
  availableSizes: ["XS", "S", "M", "L", "XL", "XXL"],
  discount: "10%",
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
        colors={COLORS}
        onClose={handleCloseQuickView}
      />

      {/* Add to Cart Modal */}
      <AddToCartModal
        product={selectedProductForAddToCart}
        colors={COLORS}
        onClose={handleCloseAddToCart}
      />
    </>
  );
}
