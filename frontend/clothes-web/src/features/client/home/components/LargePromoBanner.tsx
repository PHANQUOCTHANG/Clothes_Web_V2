"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import React from "react";

interface LargePromoBannerProps {
  /** Hàm tạo hiệu ứng sóng nước khi click vào button */
  createRipple: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LargePromoBanner: React.FC<LargePromoBannerProps> = ({
  createRipple,
}) => {
  // Sử dụng Hook để phát hiện khi người dùng cuộn đến banner này
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={sectionRef as any}
      className={`pt-12 px-4 sm:px-0 scroll-reveal ${
        isVisible ? "animate-reveal" : ""
      }`}
    >
      <div className="bg-gray-100 p-8 md:p-10 flex flex-col md:flex-row justify-between items-center rounded-lg relative overflow-hidden min-h-[300px]">
        {/* Cột trái: Nội dung văn bản */}
        <div className="z-10 text-center md:text-left py-4 md:py-0">
          <h3 className="text-3xl font-bold text-gray-900 mb-3">
            Ưu đãi hấp dẫn: 3 áo khoác
          </h3>
          <p className="text-gray-600 mb-6 max-w-sm mx-auto md:mx-0">
            Mua 2 đôi tất Psinfo tặng 1 đôi miễn phí!
          </p>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <span className="text-3xl font-bold text-red-600">$99.00</span>
            <span className="text-3xl font-normal text-gray-400 line-through">
              $188.00
            </span>
            <button
              onClick={createRipple}
              className="bg-white text-gray-900 border border-gray-300 px-8 py-4 text-sm font-semibold tracking-wider hover:bg-gray-200 transition duration-200 shadow-lg rounded-md w-full sm:w-auto ripple-button"
            >
              NHẬN ƯU ĐÃI
            </button>
          </div>
        </div>

        {/* Cột phải: Hình ảnh minh họa (Chỉ hiển thị trên Desktop) */}
        <div
          className="hidden md:block absolute right-0 top-0 bottom-0 w-1/3 h-full"
          style={{
            backgroundImage: `url(https://placehold.co/400x400/D4D4D4/333333/png?text=Áo+khoác)`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
          }}
        >
          {/* Lớp phủ gradient để hòa trộn ảnh vào nền xám */}
          <div className="absolute inset-0 bg-gradient-to-l from-gray-100 via-gray-100/50 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default LargePromoBanner;
