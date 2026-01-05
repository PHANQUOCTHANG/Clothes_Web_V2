"use client";

import React from "react";
import { ArrowRightIcon } from "@/components/common/Icons";
import { HeroSliderProps, MenuItemSlider } from "@/features/client/home/types";

const MENU_ITEMS: MenuItemSlider[] = [
  { name: "Bán chạy nhất", hasSubMenu: false },
  { name: "Xu hướng tuần này", hasSubMenu: false },
  { name: "Đã nhập lại kho", hasSubMenu: false },
  { name: "Hàng mới về", hasSubMenu: false },
  { name: "Thời trang Nam", hasSubMenu: true },
  { name: "Thời trang Nữ", hasSubMenu: true },
  { name: "Giày & Phụ kiện", hasSubMenu: true },
  { name: "Trang phục dễ mặc", hasSubMenu: false },
  { name: "Trang phục đi làm", hasSubMenu: false },
  { name: "Cửa hàng Quà tặng", hasSubMenu: false },
  { name: "Xem thêm", hasSubMenu: false },
];

const ITEM_HEIGHT = 49;

const HeroSlider: React.FC<HeroSliderProps> = ({
  activeCategory,
  setActiveCategory,
  parallaxOffset,
  createRipple,
  heroSlides,
  currentSlide,
  goToSlide,
}) => {
  const currentSlideData = heroSlides[currentSlide];

  // Tính toán vị trí Mega Menu dựa trên chỉ số của item đang hover
  const activeIndex = MENU_ITEMS.findIndex(
    (item) => item.name === activeCategory
  );
  const subMenuTop = activeIndex >= 0 ? activeIndex * ITEM_HEIGHT : 0;

  return (
    <div className="flex relative min-h-[500px] lg:min-h-[600px] overflow-hidden bg-white">
      {/* 1. Sidebar Category Menu (Desktop) */}
      <aside
        className="hidden lg:block w-64 min-w-[16rem] bg-gray-50 border-r border-gray-200 z-30"
        onMouseLeave={() => setActiveCategory(null)}
      >
        <ul className="text-sm font-semibold text-gray-900 divide-y divide-gray-200">
          {MENU_ITEMS.map((item) => {
            const isActive = item.name === activeCategory;
            return (
              <li
                key={item.name}
                onMouseEnter={() =>
                  setActiveCategory(item.hasSubMenu ? item.name : null)
                }
                className={`px-6 py-3 cursor-pointer transition-all flex justify-between items-center group
                  ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`}
              >
                {item.name}
                {item.hasSubMenu && (
                  <ArrowRightIcon
                    className={`w-3 h-3 transition-colors 
                      ${
                        isActive
                          ? "text-white"
                          : "text-gray-400 group-hover:text-white"
                      }`}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </aside>

      {/* 2. Mega Menu (SubMenu) */}
      {/* {activeCategory && (
        <SubMenu category={activeCategory} topPosition={subMenuTop} />
      )} */}

      {/* 3. Main Content Area */}
      <main className="flex-1 relative flex items-center justify-center bg-gray-100 overflow-hidden">
        {/* Banner Text - Staggered Animation with unique key */}
        <div
          key={currentSlide}
          className="absolute left-1/2 lg:left-16 top-1/2 transform -translate-y-1/2 lg:translate-x-0 -translate-x-1/2 z-20 w-full text-center lg:text-left p-4 lg:p-0 animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter max-w-lg mb-4 leading-tight">
            {currentSlideData.title}
          </h2>
          <p className="text-gray-600 mb-8 max-w-sm mx-auto lg:mx-0">
            {currentSlideData.subtitle}
          </p>
          <button
            onClick={createRipple}
            className="bg-white text-gray-900 border border-gray-300 px-8 py-3 text-sm font-semibold tracking-wider hover:bg-black hover:text-white transition duration-200 rounded-md shadow-md ripple-button"
          >
            MUA NGAY
          </button>
        </div>

        {/* Parallax Image Component */}
        <div
          className="absolute inset-0 z-10 transition-transform duration-1000 ease-out pointer-events-none"
          style={{
            backgroundImage: `url(${currentSlideData.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
            transform: `translateY(${parallaxOffset * 0.3}px) scale(1.1)`,
          }}
        >
          {/* Overlay Gradient for readability */}
          <div className="absolute inset-0 bg-linear-to-t lg:bg-linear-to-r from-gray-100 via-gray-100/40 to-transparent opacity-90 lg:opacity-100" />
        </div>

        {/* 4. Pagination Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:left-auto lg:right-16 lg:translate-x-0 z-30 flex items-center gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1 transition-all duration-500 rounded-full 
                ${
                  index === currentSlide
                    ? "bg-black w-10"
                    : "bg-gray-300 w-4 hover:bg-gray-400"
                }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HeroSlider;
