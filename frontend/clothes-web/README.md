"use client";

import { FeaturedProducts } from "@/app/(home)/FeaturedProducts";
import LargePromoBanner from "@/app/(home)/LargePromoBanner";
import ServiceInfo from "@/app/(home)/ServiceInfo";
import { TrendingCollection } from "@/app/(home)/TrendingCollection";
import { WeeklyTrending } from "@/app/(home)/WeeklyTrending";
import { POPULAR_CATEGORIES } from "@/constants/data";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import React from "react";
interface MainContentProps {
/\*_ Hàm tạo hiệu ứng sóng nước khi click _/
createRipple: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const MainContent: React.FC<MainContentProps> = ({ createRipple }) => {
// Hook để theo dõi hiệu ứng reveal cho phần Categories
const [catRef, catVisible] = useIntersectionObserver({ threshold: 0.1 });

return (
<div className="px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">

      {/* 1. Phần Danh mục phổ biến (Popular Categories) */}
      <section
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={catRef as any}
        className={`pt-16 pb-12 scroll-reveal ${catVisible ? "animate-reveal" : ""}`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Danh mục phổ biến
          </h2>
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
            Xem tất cả
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {POPULAR_CATEGORIES.map((cat, index) => (
            <div
              key={index}
              className="group flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-100"
            >
              <span className="text-4xl mb-3 transform group-hover:scale-125 transition-transform duration-300">
                {cat.icon}
              </span>
              <span className="text-xs font-bold text-gray-800 text-center uppercase tracking-tighter">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Bộ sưu tập đang thịnh hành */}
      <TrendingCollection />

      {/* 3. Xu hướng trong tuần */}
      <WeeklyTrending />

      {/* 4. Sản phẩm nổi bật (Featured Products) */}
      <FeaturedProducts />

      {/* 5. Banner quảng cáo lớn */}
      <LargePromoBanner createRipple={createRipple} />

      {/* 6. Thông tin dịch vụ (Vận chuyển, hỗ trợ...) */}
      <ServiceInfo />

    </div>

);
};

export default MainContent;

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Star, Heart, Share2, HelpCircle, Ruler, Minus, Plus, ChevronRight, Truck, DollarSign, Headset, CreditCard, Eye, ArrowRightLeft, Maximize, ChevronLeft, MessageCircle, ArrowUp, ImageIcon } from 'lucide-react';

// =====================================================================
// CSS VARS DEFINITION (Bao gồm hiệu ứng Scroll Reveal, Loader và Hiệu ứng mới)
// =====================================================================
const CSS_VARS = `
/_ Khung chứa SVG _/
.reveal-container {
width: 6rem;
height: 6rem;
margin: 0 auto;
}

    /* Các đường vẽ SVG */
    .logo-path {
        fill: none;
        stroke: #3f3f46; /* zinc-700 */
        stroke-width: 4px;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 200;
        stroke-dashoffset: 200;
        opacity: 0;
        transform-origin: 50% 50%;
        animation: draw-and-reveal 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }

    /* Áp dụng màu và delay cho từng phần của logo (QUAY LẠI MÀU ĐỎ/AMBER) */
    .logo-path:nth-child(1) { stroke: #f59e0b; animation-delay: 0s; } /* amber-500 */
    .logo-path:nth-child(2) { stroke: #3f3f46; animation-delay: 0.15s; } /* zinc-700 */
    .logo-path:nth-child(3) { stroke: #f59e0b; animation-delay: 0.3s; } /* amber-500 */

    /* Keyframes cho hiệu ứng vẽ và tiết lộ */
    @keyframes draw-and-reveal {
        /* 0% - 30%: Vẽ đường (Drawing) */
        0% { stroke-dashoffset: 200; opacity: 1; transform: none; }
        30% { stroke-dashoffset: 0; opacity: 1; transform: none; }

        /* 30% - 60%: Giữ nguyên (Holding) */
        60% { stroke-dashoffset: 0; opacity: 1; transform: none; }

        /* 60% - 80%: Tiết lộ (Shift and Fade out) */
        70% { transform: translateY(-5px) scale(1.05); opacity: 0.8; }
        80% { transform: translateY(10px) scale(0.0); opacity: 0; }

        /* 80% - 100%: Thiết lập lại (Resetting) */
        100% { stroke-dashoffset: 200; opacity: 0; transform: none; }
    }

    /* Keyframes cho hiệu ứng mờ dần */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
        animation: fadeIn 0.5s ease-out;
    }

    /* Keyframes cho hiệu ứng Scroll Reveal */
    @keyframes slide-up-fade-in {
        from { opacity: 0; transform: translateY(50px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .scroll-reveal {
        opacity: 0;
    }
    .animate-reveal {
        opacity: 0;
        animation: slide-up-fade-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }

    /* NEW: CSS cho Hero Slider Transition */
    .slide-content-transition {
        /* Dùng key trong React để trigger component change, kết hợp với Tailwind classes */
        opacity: 0;
        animation: slide-up-fade-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }

    /* NEW: CSS cho Button Ripple Effect */
    .ripple-button {
      position: relative;
      overflow: hidden;
      transform: translate3d(0, 0, 0); /* Force GPU acceleration */
    }
    .ripple {
      position: absolute;
      border-radius: 50%;
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      background-color: rgba(255, 255, 255, 0.7); /* White ripple on dark/blue backgrounds */
    }
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }

`;

const LoadingWardrobeReveal = ({ text = "Đang tải giỏ hàng..." }) => {
return (
<div className="flex flex-col items-center justify-center p-4">
{/_ Loader Component (SVG) _/}
<div className="reveal-container">
<svg viewBox="0 0 100 100" className="w-full h-full">
{/_ Path 1: Nửa trái (Màu Accent - ĐỎ) _/}
<path className="logo-path" d="M 50 10 L 10 90" />
{/_ Path 2: Nửa phải (Màu Primary - Xám) _/}
<path className="logo-path" d="M 50 10 L 90 90" />
{/_ Path 3: Chi tiết ngang (Màu Accent - ĐỎ) _/}
<path className="logo-path" d="M 30 50 H 70" />
</svg>
</div>

      {/* Thông báo Loading */}
      <p className="mt-4 text-sm font-semibold text-zinc-700">{text}</p>
    </div>

);
};

// --- Simplified Inline SVG Icons ---
const ArrowDownIcon = (props) => (
<svg
{...props}
xmlns="http://www.w3.org/2000/svg"
width="1em"
height="1em"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth="2"
strokeLinecap="round"
strokeLinejoin="round"

>

    <path d="M6 9l6 6 6-6" />

  </svg>
);
const FacebookIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const TwitterIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-17.7 11.3 2.3.1 4.7-.7 6.6-2.3 3.4-3.5-3.1-9-7.9-7.9.6-1.5 2.1-2.6 3.8-3.3 2.1-.9 4.1-.7 6.1.7 1.2-1.1 2.5-2.2 3.7-3.3z" />
  </svg>
);
const InstagramIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const YoutubeIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 17.5c0-1.7 1.3-3 3-3h15c1.7 0 3 1.3 3 3s-1.3 3-3 3h-15c-1.7 0-3-1.3-3-3z" />
    <path d="M10 11.5l6 3-6 3z" />
  </svg>
);
const UserIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const ShoppingCartIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 12.59a2 2 0 0 0 2 1.41h9.72a2 2 0 0 0 2-1.59L23 6H6" />
  </svg>
);
const SearchIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
const MenuIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);
const XIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
const ArrowRightIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const ArrowLeftIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);
const FreeShippingIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1.5em"
    height="1.5em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 18H3c-1.1 0-2 .9-2 2s.9 2 2 2h18c1.1 0 2-.9 2-2s-.9-2-2-2h-2" />
    <path d="M15 12L15 2 9 2 9 12" />
    <path d="M15 12L22 12 22 7" />
    <path d="M9 12L2 12 2 7" />
    <path d="M9 12L15 12" />
  </svg>
);
const MoneyIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1.5em"
    height="1.5em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M16 8h-4c-2.2 0-4 1.8-4 4s1.8 4 4 4h4c2.2 0 4-1.8 4-4s-1.8-4-4-4zm0 8V8" />
  </svg>
);
const HeadsetIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 18c0-4.5 3.5-8 8-8s8 3.5 8 8M3 12c0-4.5 3.5-8 8-8s8 3.5 8 8M12 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM12 22V2" />
  </svg>
); // Using HeadsetIcon for chat
const CreditCardIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1.5em"
    height="1.5em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <path d="M2 10h20" />
    <path d="M7 16h3" />
  </svg>
);
const MailIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);
const RightArrowIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
const ArrowUpIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 19V5" />
    <path d="m5 12 7-7 7 7" />
  </svg>
);
const ChatIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const EyeIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const ModalCartIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="80"
    height="80"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" x2="21" y1="6" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
    <path d="M10 17h4" />
  </svg>
);
const MapPinIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
    <path d="M12 21.75s-8.5-6.5-8.5-11.75A8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 8.5 8.5c0 5.25-8.5 11.75-8.5 11.75z" />
  </svg>
);
const PhoneIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-7.5-7.5 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.08 2h3a2 2 0 0 1 2 1.73l.41 4.41a2 2 0 0 1-.5 1.83l-1.39 1.43a15.86 15.86 0 0 0 7.33 7.33l1.43-1.39a2 2 0 0 1 1.83-.5l4.41.41a2 2 0 0 1 1.73 2z" />
  </svg>
);
const ClockIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

// =====================================================================
// Custom Hook for Scroll Reveal & Lazy Loading
// =====================================================================
const useIntersectionObserver = (options) => {
const [isVisible, setIsVisible] = useState(false);
const elementRef = useRef(null);

useEffect(() => {
// Cần cleanup function cho observer.
let observerRef = null;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Ngừng quan sát sau khi đã hiển thị
        if (elementRef.current) {
          observer.unobserve(entry.target);
        }
      }
    }, options);

    observerRef = observer;

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observerRef && elementRef.current) {
        observerRef.unobserve(elementRef.current);
      }
    };

}, [options]);

return [elementRef, isVisible];
};

// Global Placeholder for Lazy Loading
const LAZY_IMAGE_PLACEHOLDER =
"https://placehold.co/320x320/F3F4F6/9CA3AF?text=Đang+tải...";

// ----------------------------------------------------
// AUTH DROPDOOWN MENU
// ----------------------------------------------------
const AuthDropdownMenu = ({
isLoggedIn,
onLogout,
toggleLoginState,
userName,
setCurrentView,
}) => {
const [isOpen, setIsOpen] = useState(false);
const [statusMessage, setStatusMessage] = useState(null);

// Toggle menu và đóng khi click ra ngoài
useEffect(() => {
const handleOutsideClick = (event) => {
if (isOpen && event.target.closest(".auth-dropdown-container") === null) {
setIsOpen(false);
}
};
document.addEventListener("mousedown", handleOutsideClick);
return () => document.removeEventListener("mousedown", handleOutsideClick);
}, [isOpen]);

const handleAction = (action) => {
setIsOpen(false);
if (action === "logout") {
onLogout();
setStatusMessage("Đăng xuất thành công!");
} else if (action === "login" || action === "register") {
setStatusMessage(
`Đang chuyển đến trang ${
          action === "login" ? "Đăng nhập" : "Đăng ký"
        }... (Mô phỏng)`
);
setTimeout(() => {
// Toggles the login state, which updates the name/icon color
toggleLoginState(true);
setStatusMessage(
action === "login"
? "Đăng nhập thành công!"
: "Đăng ký thành công! Đã đăng nhập."
);
}, 500);
} else if (action === "profile") {
setStatusMessage("Đang chuyển đến hồ sơ người dùng...");
setTimeout(() => {
setCurrentView("profile");
}, 300);
}
setTimeout(() => setStatusMessage(null), 3000); // Clear message after 3 seconds
};

const options = isLoggedIn
? [
{ label: "Hồ sơ của tôi", action: "profile" },
{ label: "Đăng xuất", action: "logout", color: "text-red-500" },
]
: [
{ label: "Đăng nhập", action: "login" },
{ label: "Đăng ký", action: "register" },
];

return (
<div className="relative auth-dropdown-container">
{statusMessage && (
<div className="absolute top-full right-0 mt-2 bg-black text-white text-xs px-3 py-1 rounded-md shadow-lg z-50 whitespace-nowrap animate-fade-in">
{statusMessage}
</div>
)}

      {/* Combined button/display for name and icon */}
      <div
        className="flex items-center space-x-2 cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* User Name/Account Status (Only display name when logged in) */}
        {isLoggedIn && (
          <span className="hidden sm:block text-sm font-semibold transition text-gray-800 group-hover:text-red-600">
            {userName}
          </span>
        )}

        {/* User Icon (Color changes on login) */}
        <UserIcon
          className={`transition w-6 h-6 ${
            isLoggedIn ? "text-red-600" : "text-gray-500 hover:text-black"
          }`}
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-30 origin-top-right">
          <div className="py-1">
            {options.map((item) => (
              <a
                key={item.action}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleAction(item.action);
                }}
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                  item.color || ""
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>

);
};

// ----------------------------------------------------
// SHOPPING CART MODAL (OFF-CANVAS)
// ----------------------------------------------------

// Component mô phỏng sản phẩm trong giỏ hàng (Cart Item dùng cho cả Modal và Page)
const CartItem = ({ item, updateQuantity, removeItem, isFullPage = false }) => {
// Để giữ logic đơn giản trong mockup, chúng ta sử dụng state giả lập.
// Trong ứng dụng thật, updateQuantity/removeItem sẽ là các action dispatch.

const { id, name, price, image, quantity, color, size } = item;
const priceValue = parseFloat(price.replace("$", ""));
const totalPrice = (priceValue \* quantity).toFixed(2);
const placeholderImage =
"https://placehold.co/64x64/E5E7EB/333333/png?text=Sản+phẩm";

// Mock functions (sẽ được truyền từ App)
const handleUpdateQuantity = (newQty) => updateQuantity(id, newQty);
const handleRemoveItem = () => removeItem(id);

// Lớp CSS cho Cart Page
const containerClass = isFullPage
? "flex items-center border-b border-gray-200 hover:bg-gray-50 transition duration-150 p-4"
: "py-4 border-b border-gray-100 items-start";

const imageClass = isFullPage
? "w-20 h-20 flex-shrink-0"
: "w-16 h-16 flex-shrink-0";

// Logic hiển thị cho Modal View
if (!isFullPage) {
return (
<div className={`flex ${containerClass}`}>
<img
src={image}
alt={name}
className={`${imageClass} object-cover bg-gray-100 mr-4 rounded-md`}
onError={(e) => {
e.target.onerror = null;
e.target.src = placeholderImage;
}}
/>
<div className="flex-1">
<div className="flex justify-between items-start">
<h4 className="text-sm font-semibold text-gray-800 line-clamp-2">
{name}
</h4>
<button
              onClick={handleRemoveItem}
              className="text-gray-400 hover:text-blue-600 transition ml-4 w-5 h-5 flex items-center justify-center"
            >
<XIcon className="w-4 h-4" />
</button>
</div>
<p className="text-sm font-medium text-gray-700 mt-1">
${priceValue.toFixed(2)}
</p>

          <div className="text-xs text-gray-500 mt-1.5 space-y-0.5">
            <p className="font-medium">
              Màu: <span className="font-semibold text-gray-800">{color}</span>
            </p>
            <p className="font-medium">
              Size: <span className="font-semibold text-gray-800">{size}</span>
            </p>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center border border-gray-300 rounded-sm">
              <button
                onClick={() => handleUpdateQuantity(Math.max(1, quantity - 1))}
                className="px-2 py-1 text-gray-500 hover:bg-gray-100 transition duration-150"
              >
                -
              </button>
              <span className="px-3 text-sm font-medium border-l border-r border-gray-300">
                {quantity}
              </span>
              <button
                onClick={() => handleUpdateQuantity(quantity + 1)}
                className="px-2 py-1 text-gray-500 hover:bg-gray-100 transition duration-150"
              >
                +
              </button>
            </div>
            <p className="text-sm font-semibold text-gray-800">
              Tổng: ${totalPrice}
            </p>
          </div>
        </div>
      </div>
    );

}

// Logic hiển thị cho Full Page View (5 columns)
return (
<div className={`grid grid-cols-5 md:grid-cols-5 ${containerClass}`}>
{/_ Col 1 & 2: Product Info _/}
<div className="col-span-2 flex items-center space-x-4">
<img
src={image}
alt={name}
className={`${imageClass} object-cover bg-gray-100 rounded-md`}
onError={(e) => {
e.target.onerror = null;
e.target.src = placeholderImage;
}}
/>
<div className="flex flex-col space-y-1">
<h4 className="text-base font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition">
{name}
</h4>

          {/* Hiển thị Giá, Màu, Size mỗi thứ một hàng */}
          <p className="font-semibold text-sm text-gray-900">
            ${priceValue.toFixed(2)}
          </p>
          <div className="text-xs text-gray-600 space-y-0.5 mt-2">
            <p className="font-medium">
              Màu: <span className="font-semibold text-gray-800">{color}</span>
            </p>
            <p className="font-medium">
              Size: <span className="font-semibold text-gray-800">{size}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Col 3: Quantity */}
      <div className="col-span-1 flex items-center justify-center">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            onClick={() => handleUpdateQuantity(Math.max(1, quantity - 1))}
            className="px-2 py-1 text-gray-500 hover:bg-gray-100 transition duration-150 text-base"
          >
            -
          </button>
          <span className="px-3 text-sm font-medium border-l border-r border-gray-300">
            {quantity}
          </span>
          <button
            onClick={() => handleUpdateQuantity(quantity + 1)}
            className="px-2 py-1 text-gray-500 hover:bg-gray-100 transition duration-150 text-base"
          >
            +
          </button>
        </div>
      </div>

      {/* Col 4: Subtotal */}
      <div className="col-span-1 flex items-center justify-end font-bold text-gray-900">
        ${totalPrice}
      </div>

      {/* Col 5: Remove Button */}
      <div className="col-span-1 flex items-center justify-end">
        <button
          onClick={handleRemoveItem}
          className="text-gray-400 hover:text-blue-600 transition p-1"
          title="Xóa sản phẩm"
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>
    </div>

);
};

// Component chính của Giỏ hàng
const ShoppingCartModal = ({
isCartOpen,
toggleCart,
cartItems,
setView,
updateQuantity,
removeItem,
}) => {
const FREE_SHIPPING_THRESHOLD = 200.0;

// Tính toán tổng phụ
const cartSubtotal = cartItems.reduce(
(sum, item) =>
sum + parseFloat(item.price.replace("$", "")) \* item.quantity,
0
);
const remainingToFreeShipping = FREE_SHIPPING_THRESHOLD - cartSubtotal;
const isFreeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD;

const shippingProgress = Math.min(
100,
(cartSubtotal / FREE_SHIPPING_THRESHOLD) \* 100
);

return (
<div
className={`fixed inset-0 z-[110] transition-all duration-300 ${
        isCartOpen ? "visible" : "invisible"
      }`} >
{/_ Overlay (Nền mờ) _/}
<div
className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isCartOpen ? "opacity-50" : "opacity-0"
        }`}
onClick={toggleCart}
/>

      {/* Modal chính (Trượt từ phải sang) */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header Modal */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold">Giỏ hàng</h3>
          <button
            onClick={toggleCart}
            className="text-gray-400 hover:text-black transition"
            aria-label="Đóng giỏ hàng"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Nội dung Giỏ hàng */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            // TRẠẠNG THÁI 1: GIỎ HÀNG TRỐNG (Empty Cart)
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <ModalCartIcon className="text-gray-300 mb-6" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Giỏ hàng của bạn đang trống.
              </h4>
              <p className="text-sm text-gray-500 mb-8 max-w-xs">
                Hãy xem qua các sản phẩm có sẵn và mua sắm tại cửa hàng!
              </p>
              <button
                onClick={() => {
                  toggleCart();
                  setView("shop");
                }} // Navigate to shop
                className="bg-black text-white px-8 py-3 text-sm font-semibold hover:bg-gray-800 transition rounded-md"
              >
                Trở về cửa hàng
              </button>
            </div>
          ) : (
            // TRẠNG THÁI 2: GIỎ HÀNG CÓ SẢN PHẨM (Items in Cart)
            <>
              {/* Thanh tiến trình Free Shipping */}
              <div className="mb-6">
                <div className="text-xs font-semibold mb-2">
                  {isFreeShipping ? (
                    <span className="text-green-600">
                      🎉 MIỄN PHÍ VẬN CHUYỂN!
                    </span>
                  ) : (
                    <span className="text-blue-600">
                      Mua thêm ${remainingToFreeShipping.toFixed(2)} để được
                      MIỄN PHÍ VẬN CHUYỂN!
                    </span>
                  )}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      isFreeShipping ? "bg-green-500" : "bg-blue-500"
                    }`}
                    style={{ width: `${shippingProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Danh sách sản phẩm */}
              <div>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                    isFullPage={false} // Use modal view
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer Modal (Chỉ hiển thị khi có sản phẩm) */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-200 bg-white sticky bottom-0 z-10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-800">
                Tổng phụ Giỏ hàng:
              </span>
              <span className="text-xl font-bold text-gray-900">
                ${cartSubtotal.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => {
                toggleCart();
                setView("cart");
              }} // Navigate to Cart Page
              className="w-full bg-gray-200 text-gray-800 px-4 py-3 text-sm font-semibold hover:bg-gray-300 transition mb-2 rounded-md"
            >
              Xem Giỏ hàng
            </button>
            <button
              onClick={() => {
                toggleCart();
                setView("checkout");
              }} // Navigate to Checkout Page
              className="w-full bg-blue-600 text-white px-4 py-3 text-sm font-semibold hover:bg-blue-700 transition rounded-md"
            >
              Tiến hành Thanh toán
            </button>
          </div>
        )}
      </div>
    </div>

);
};

// Component SubMenu (Mega Menu khi hover)
const SubMenu = ({ category, topPosition }) => {
if (!category) return null;

const subMenuItems = {
"Thời trang Nam": [
"Áo Sơ mi",
"Áo Len",
"Áo Khoác",
"Quần Dài",
"Giày & Bốt",
],
"Thời trang Nữ": [
"Váy đầm",
"Chân váy",
"Áo Blouse",
"Áo Len",
"Phụ kiện",
"Túi xách",
],
"Giày & Phụ kiện": [
"Giày Sneaker",
"Dép/Sandal",
"Bốt",
"Mũ",
"Trang sức",
"Balo & Túi",
],
};

const links = subMenuItems[category] || [];

return (
<div
className="hidden lg:block absolute left-64 w-56 bg-white shadow-lg p-0 z-40 border border-gray-200 transition-all duration-150"
style={{
        top: `${topPosition}px`,
        height: `auto`,
      }} >
<ul className="py-2">
{links.map((link) => (
<li key={link}>
<a
              href="#"
              className="block px-6 py-2 text-sm font-semibold text-gray-900 hover:text-white hover:bg-black transition"
            >
{link}
</a>
</li>
))}
</ul>
</div>
);
};

// 1. Component TopBar
const TopBar = ({ isScrolled }) => {
if (isScrolled) return null;

return (
<div
className="bg-red-600 text-white text-sm py-1.5 px-4 sm:px-6 flex justify-between items-center w-full"
style={{
        transition: "opacity 0.3s ease-in-out",
        opacity: isScrolled ? 0 : 1,
        pointerEvents: isScrolled ? "none" : "auto",
      }} >
<div className="flex items-center space-x-3">
<span className="bg-white text-red-600 text-xs font-bold px-1.5 py-0.5 rounded-sm">
HOT
</span>
<span className="hidden sm:block">
Miễn phí vận chuyển nhanh cho đơn hàng trên $200!
</span>
<span className="block sm:hidden text-xs">Freeship {">"} $200!</span>
</div>

      <div className="flex items-center space-x-4">
        <span className="cursor-pointer flex items-center hover:text-gray-200 transition">
          USD <ArrowDownIcon className="ml-1 text-xs w-3 h-3" />
        </span>
        <div className="hidden sm:block h-4 w-px bg-white opacity-50"></div>
        <div className="hidden md:flex items-center space-x-3">
          <a href="#" aria-label="Facebook">
            <FacebookIcon className="opacity-75 hover:opacity-100 transition text-base w-4 h-4" />
          </a>
          <a href="#" aria-label="Twitter">
            <TwitterIcon className="opacity-75 hover:opacity-100 transition text-base w-4 h-4" />
          </a>
          <a href="#" aria-label="Instagram">
            <InstagramIcon className="opacity-75 hover:opacity-100 transition text-base w-4 h-4" />
          </a>
          <a href="#" aria-label="YouTube">
            <YoutubeIcon className="opacity-75 hover:opacity-100 transition text-base w-4 h-4" />
          </a>
        </div>
      </div>
    </div>

);
};

// 2. Component MiddleBar
const MiddleBar = ({
isScrolled,
toggleCart,
isLoggedIn,
toggleLoginState,
userName,
setCurrentView,
}) => {
const paddingClass = isScrolled ? "py-3" : "py-6";
const [cartStatusMessage, setCartStatusMessage] = useState(null);

const handleCartClick = () => {
if (!isLoggedIn) {
setCartStatusMessage("Bạn cần đăng nhập để xem giỏ hàng.");
setTimeout(() => setCartStatusMessage(null), 3000);
} else {
toggleCart();
}
};

return (
<div
className="flex items-center justify-between px-4 sm:px-6 max-w-7xl mx-auto"
style={{
        padding: isScrolled ? "12px 0" : "24px 0",
        transition: "padding 0.25s ease-out",
        willChange: "padding",
        backfaceVisibility: "hidden",
        WebkitFontSmoothing: "antialiased",
      }} >
{/_ Logo _/}
<div className="flex-shrink-0">
<h1 className="text-3xl font-extrabold tracking-tight">Megastore</h1>
</div>

      {/* Thanh tìm kiếm - Ẩn trên Mobile */}
      <div className="flex-1 max-w-2xl mx-6 hidden md:mx-12 lg:flex border border-gray-200 rounded-md overflow-hidden">
        <div className="relative flex items-center bg-gray-50 border-r border-gray-200">
          <select className="appearance-none bg-transparent px-4 py-3 text-sm text-gray-800 font-semibold cursor-pointer focus:outline-none pr-8">
            <option>Tất cả danh mục</option>
            <option>Thời trang Nam</option>
            <option>Thời trang Nữ</option>
            <option>Giày & Phụ kiện</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
            </svg>
          </div>
        </div>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="flex-1 p-3 text-sm focus:outline-none placeholder-gray-400"
        />
        <button className="bg-black text-white px-4 flex items-center justify-center hover:bg-red-600 transition duration-200">
          <SearchIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Icons tài khoản và giỏ hàng */}
      <div className="flex items-center space-x-4 sm:space-x-6 text-2xl">
        <AuthDropdownMenu
          isLoggedIn={isLoggedIn}
          onLogout={() => toggleLoginState(false)}
          toggleLoginState={toggleLoginState}
          userName={userName}
          setCurrentView={setCurrentView}
        />

        <div
          className="relative cursor-pointer hover:text-red-600 transition"
          onClick={handleCartClick} // Sử dụng hàm handleCartClick mới
        >
          {/* NEW: Thông báo khi chưa đăng nhập (Tooltip đẹp hơn) */}
          {cartStatusMessage && (
            <div className="absolute top-full right-0 mt-3 z-50 animate-fade-in pointer-events-none">
              <div className="bg-black text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-xl relative whitespace-nowrap">
                {cartStatusMessage}
                {/* Arrow/Pointer (upwards) */}
                <div className="absolute bottom-full right-4 transform translate-y-px w-3 h-3 bg-black rotate-45"></div>
              </div>
            </div>
          )}

          <ShoppingCartIcon className="w-6 h-6" />

          {/* Ẩn số lượng khi chưa đăng nhập */}
          {isLoggedIn && (
            <span className="absolute -top-3 -right-3 text-xs bg-red-600 text-white w-5 h-5 flex items-center justify-center rounded-full border-2 border-white font-semibold">
              {/* Giả định 3 sản phẩm, sử dụng length của cartItems trong App thật */}
              3
            </span>
          )}
        </div>
      </div>
    </div>

);
};

// 3. Component BottomBar (Menu điều hướng và Danh mục)
const BottomBar = ({ isScrolled, currentView, setView }) => {
const menuItems = [
{ name: "TRANG CHỦ", link: "#", view: "home", hasDropdown: false },
{ name: "CỬA HÀNG", link: "#", view: "shop", hasDropdown: false },
{ name: "BLOG", link: "#", view: "blog", hasDropdown: false },
{ name: "LIÊN HỆ", link: "#", view: "contact", hasDropdown: false },
];

const categoryButtonClass = isScrolled
? "bg-white text-gray-800 border-r border-gray-100 hover:bg-gray-100"
: "bg-black text-white hover:bg-red-700";

const iconColorClass = isScrolled ? "text-gray-800" : "text-white";

return (
<div
className="border-t border-gray-100 shadow-sm bg-white"
style={{
        transition: "background-color 0.25s ease-out",
        willChange: "background-color",
        backfaceVisibility: "hidden",
      }} >
<div className="max-w-7xl mx-auto flex items-center justify-between">
{/_ Nút Danh mục (Shop By Categories) - Chỉ hiển thị trên Desktop _/}
<div
className={`                        px-6 py-3 flex items-center w-64 cursor-pointer transition hidden lg:flex
                        ${categoryButtonClass}
                   `} >
<MenuIcon className={`h-5 w-5 mr-3 ${iconColorClass}`} />

          <span className="font-semibold text-sm tracking-wider">
            MUA SẮM THEO DANH MỤC
          </span>
        </div>

        {/* Menu Điều hướng Chính */}
        <nav className="flex-1 px-4 lg:px-0">
          <ul className="flex space-x-6 lg:space-x-8 text-sm font-semibold text-gray-800 justify-center lg:justify-start">
            {menuItems.map((item) => {
              const isActive = item.view === currentView;
              return (
                <li key={item.name} className="relative group">
                  <a
                    href={item.link}
                    onClick={(e) => {
                      e.preventDefault();
                      setView(item.view);
                    }}
                    className={`py-4 flex items-center uppercase transition duration-150 ${
                      isActive
                        ? "text-red-600" // Màu ĐỎ khi đang active
                        : "text-gray-800 hover:text-red-600" // Màu mặc định và hover
                    }`}
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
            {/* Thêm nút Menu cho mobile */}
            <li className="block lg:hidden relative group">
              <a
                href="#"
                className="py-4 flex items-center hover:text-red-600 transition uppercase"
              >
                Danh mục
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

);
};

// Component ProductCard (Thẻ sản phẩm dùng chung)
const ProductCard = ({
name,
price,
oldPrice,
image,
hoverImage,
isTrending,
smallText,
saleTag,
showAddToCart = true,
}) => {
// Lazy Loading Setup
const [cardRef, cardIsVisible] = useIntersectionObserver({ threshold: 0.1 });
// Tải placeholder ngay lập tức
const [currentImage, setCurrentImage] = useState(LAZY_IMAGE_PLACEHOLDER);
const [isEyeHovered, setIsEyeHovered] = useState(false);
const placeholderImage =
"https://placehold.co/320x320/E5E7EB/333333/png?text=Sản+phẩm";

// Set actual image when visible
useEffect(() => {
if (cardIsVisible) {
setCurrentImage(image);
}
}, [cardIsVisible, image]);

const handleMouseEnter = () => {
// Only trigger hover change if the card is visible (image is loaded)
if (cardIsVisible && hoverImage) {
setCurrentImage(hoverImage);
}
};

const handleMouseLeave = () => {
if (cardIsVisible) {
setCurrentImage(image);
}
};

return (
<div
ref={cardRef} // Apply ref for Intersection Observer
className={`                flex flex-col group transition duration-300 transform rounded-lg overflow-hidden
                ${
                  cardIsVisible
                    ? "hover:scale-[1.02] hover:shadow-2xl"
                    : "opacity-100"
                }
           `}
onMouseEnter={handleMouseEnter}
onMouseLeave={handleMouseLeave} >
<div className="relative overflow-hidden bg-gray-100">
<div
className="w-full h-80 bg-cover bg-center transition-all duration-500 ease-in-out"
style={{
            backgroundImage: `url(${currentImage})`,
            // Thêm hiệu ứng chuyển đổi opacity khi ảnh thật tải xong
            opacity: currentImage === LAZY_IMAGE_PLACEHOLDER ? 0.7 : 1,
            transition:
              "background-image 0.5s ease-in-out, opacity 0.5s ease-in-out",
          }}
onError={(e) => {
e.target.onerror = null;
e.target.style.backgroundImage = `url(${placeholderImage})`;
}} ></div>
{(isTrending || saleTag) && (
<div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
{isTrending ? "Xu hướng" : saleTag}
</div>
)}

        {/* Quick View Icon on hover */}
        <div
          className={`absolute top-3 right-3 transition-opacity duration-300 flex items-center ${
            cardIsVisible ? "opacity-0 group-hover:opacity-100" : "opacity-0"
          }`}
          onMouseEnter={() => setIsEyeHovered(true)}
          onMouseLeave={() => setIsEyeHovered(false)}
        >
          {/* Tooltip Quick View */}
          {isEyeHovered && (
            <div className="relative bg-black text-white px-3 py-1 text-xs font-semibold rounded-md mr-2 whitespace-nowrap opacity-100 transition duration-150">
              Xem nhanh
              <div className="absolute right-[-4px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-black"></div>
            </div>
          )}
          <button
            className="bg-white p-2 rounded-full text-gray-700 shadow-md transition hover:bg-black hover:text-white"
            aria-label="Xem nhanh"
          >
            <EyeIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="pt-4 pb-2 text-center bg-white">
        {smallText && <p className="text-xs text-gray-500">{smallText}</p>}
        <h3 className="text-base font-medium text-gray-900 group-hover:text-red-600 transition line-clamp-2 min-h-[2.5em]">
          {name}
        </h3>
        {price && (
          <p className="mt-1-sm font-semibold text-gray-900">
            {oldPrice && (
              <span className="text-gray-400 line-through mr-2 font-normal text-xs">
                {oldPrice}
              </span>
            )}
            {price}
          </p>
        )}

        {!price && (
          <a
            href="#"
            className="text-sm text-gray-500 mt-1 hover:text-red-600 flex items-center justify-center"
          >
            Mua ngay <span className="ml-1 text-xs">{">"}</span>
          </a>
        )}

        {showAddToCart && (
          <button className="w-full mt-2 text-sm text-gray-500 border border-gray-300 py-2 rounded-md hover:bg-black hover:text-white transition duration-150">
            Thêm vào Giỏ
          </button>
        )}
      </div>
    </div>

);
};

// Component TrendingCollection (Bộ sưu tập Xu hướng - Phần 4)
const TrendingCollection = () => {
// Sử dụng placeholder chung
const IMAGE_PLACEHOLDER =
"https://placehold.co/320x400/D4D4D4/333333/png?text=Bộ+sưu+tập";
const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

const products = [
{
name: "Áo len Alpaca Oversized",
image: IMAGE_PLACEHOLDER,
hoverImage: IMAGE_PLACEHOLDER,
price: null,
},
{
name: "Áo len cổ tròn Premium",
image: IMAGE_PLACEHOLDER,
hoverImage: IMAGE_PLACEHOLDER,
price: null,
},
{
name: "Bốt cao cổ Forever",
image: IMAGE_PLACEHOLDER,
hoverImage: IMAGE_PLACEHOLDER,
price: null,
},
];

return (
<section
ref={sectionRef}
className={`pt-12 px-4 sm:px-0 scroll-reveal ${
        isVisible ? "animate-reveal" : ""
      }`} >
<div className="mb-6 flex justify-between items-center border-b border-gray-100 pb-2">
<h2 className="text-2xl font-bold text-gray-800">
Bộ sưu tập Xu hướng
</h2>
<a
          href="#"
          className="text-sm text-gray-500 hover:text-red-600 flex items-center"
        >
Xem tất cả danh mục <span className="ml-1 text-xs">{">"}</span>
</a>
</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {products.map((product, index) => (
          // Các ProductCard sẽ tự động lazy load
          <ProductCard key={index} {...product} showAddToCart={false} />
        ))}
      </div>
    </section>

);
};

// Component WeeklyTrending (Sản phẩm Nổi bật Tuần này - Phần 5)
const WeeklyTrending = () => {
// Placeholder chung cho sản phẩm
const PRODUCT_IMAGE_PLACEHOLDER =
"https://placehold.co/320x400/E5E7EB/333333/png?text=Sản+phẩm";
const BANNER_IMAGE_PLACEHOLDER =
"https://placehold.co/400x600/D4D4D4/333333/png?text=Mẫu+người";
const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

const trendingProducts = [
{
name: "Bốt cao cổ đan ReKnit",
price: "$140.00",
image: PRODUCT_IMAGE_PLACEHOLDER,
hoverImage: PRODUCT_IMAGE_PLACEHOLDER,
},
{
name: "Áo len cáp Merino Felted",
price: "$98.00",
image: PRODUCT_IMAGE_PLACEHOLDER,
hoverImage: PRODUCT_IMAGE_PLACEHOLDER,
},
{
name: "Bốt Chukka da lộn cổ điển",
price: "$125.00",
image: PRODUCT_IMAGE_PLACEHOLDER,
hoverImage: PRODUCT_IMAGE_PLACEHOLDER,
},
{
name: "Mũ bóng chày Organic Kiwi",
price: "$40.00",
image: PRODUCT_IMAGE_PLACEHOLDER,
hoverImage: PRODUCT_IMAGE_PLACEHOLDER,
},
];

// Tách PricedProductCard ra khỏi WeeklyTrending và lazy load nó
const PricedProductCard = ({ name, price, image, hoverImage, index }) => {
const [cardRef, cardIsVisible] = useIntersectionObserver({
threshold: 0.1,
});
const [currentImage, setCurrentImage] = useState(LAZY_IMAGE_PLACEHOLDER);
const [isEyeHovered, setIsEyeHovered] = useState(false);
const placeholderImage =
"https://placehold.co/320x320/E5E7EB/333333/png?text=Sản+phẩm";

    // Set actual image when visible
    useEffect(() => {
      if (cardIsVisible) {
        setCurrentImage(image);
      }
    }, [cardIsVisible, image]);

    const handleMouseEnter = () => {
      if (cardIsVisible && hoverImage) {
        setCurrentImage(hoverImage);
      }
    };

    const handleMouseLeave = () => {
      if (cardIsVisible) {
        setCurrentImage(image);
      }
    };

    return (
      <div
        ref={cardRef} // Apply ref for intersection observer
        className="flex flex-col group transition duration-300 w-full flex-shrink-0"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative overflow-hidden bg-gray-100">
          <div
            className="w-full h-80 bg-cover bg-center transition-all duration-500 ease-in-out"
            style={{
              backgroundImage: `url(${currentImage})`,
              opacity: currentImage === LAZY_IMAGE_PLACEHOLDER ? 0.7 : 1,
              transition:
                "background-image 0.5s ease-in-out, opacity 0.5s ease-in-out",
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.backgroundImage = `url(${placeholderImage})`;
            }}
          ></div>
          {/* Quick View Icon on hover */}
          <div
            className={`absolute top-3 right-3 transition-opacity duration-300 flex items-center ${
              cardIsVisible ? "opacity-0 group-hover:opacity-100" : "opacity-0"
            }`}
            onMouseEnter={() => setIsEyeHovered(true)}
            onMouseLeave={() => setIsEyeHovered(false)}
          >
            {/* Tooltip Quick View */}
            {isEyeHovered && (
              <div className="relative bg-black text-white px-3 py-1 text-xs font-semibold rounded-md mr-2 whitespace-nowrap opacity-100 transition duration-150">
                Xem nhanh
                <div className="absolute right-[-4px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-black"></div>
              </div>
            )}
            <button
              className="bg-white p-2 rounded-full text-gray-700 shadow-md transition hover:bg-black hover:text-white"
              aria-label="Xem nhanh"
            >
              <EyeIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="pt-3 pb-0 text-center">
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-red-600 transition line-clamp-2 min-h-[2.5em]">
            {name}
          </h3>
          <p className="mt-0.5 text-sm font-semibold text-gray-800">{price}</p>
          <button className="w-full mt-2 text-sm text-gray-500 border border-gray-300 py-2 rounded-md hover:bg-black hover:text-white transition duration-150">
            Thêm vào Giỏ
          </button>
        </div>
      </div>
    );

};

return (
<section
ref={sectionRef}
className={`pt-12 px-4 sm:px-0 scroll-reveal ${
        isVisible ? "animate-reveal" : ""
      }`} >
<div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
{/_ Banner bên trái (What Trending This Week) _/}
<div className="w-full lg:w-1/4 bg-gray-100 p-8 flex flex-col justify-between relative overflow-hidden rounded-lg min-h-[400px]">
<div
className="absolute inset-0 bg-cover bg-center opacity-30"
style={{
              backgroundImage: `url(${BANNER_IMAGE_PLACEHOLDER})`,
            }} ></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Sản phẩm nổi bật tuần này
            </h2>
            <p className="text-sm text-gray-600 mb-6">100% da thủ công</p>
          </div>

          <div className="relative z-10">
            <button className="bg-white text-gray-900 border border-gray-300 px-8 py-3 text-sm font-semibold tracking-wider hover:bg-gray-200 transition duration-200 rounded-md shadow-md">
              MUA NGAY
            </button>
          </div>
        </div>

        {/* Danh sách sản phẩm nổi bật */}
        <div className="flex-1 relative flex items-center">
          {/* Điều hướng trái/phải chỉ hiển thị trên desktop */}
          <button
            className="hidden xl:flex absolute left-0 transform -translate-x-1/2 z-20 w-10 h-10 rounded-full items-center justify-center transition duration-200
                                 bg-white text-black border border-gray-300 shadow-md
                                 hover:bg-black hover:text-white hover:border-black"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
            {trendingProducts.map((product, index) => (
              <PricedProductCard key={index} {...product} />
            ))}
          </div>

          <button
            className="hidden xl:flex absolute right-0 transform translate-x-1/2 z-20 w-10 h-10 rounded-full items-center justify-center transition duration-200
                                 bg-white text-black border border-gray-300 shadow-md
                                 hover:bg-black hover:text-white hover:border-black"
          >
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>

);
};

// Component FeaturedProducts (Sản phẩm Nổi bật)
const FeaturedProducts = () => {
// Placeholder chung cho sản phẩm
const PRODUCT_IMAGE_PLACEHOLDER =
"https://placehold.co/320x400/E5E7EB/333333/png?text=Sản+phẩm";

const INITIAL_PRODUCTS_COUNT = 6; // Đã giảm xuống 6 để làm nổi bật Load More hơn trên màn hình nhỏ
const PRODUCTS_PER_LOAD = 6;
const [productsToShow, setProductsToShow] = useState(INITIAL_PRODUCTS_COUNT);
const [isLoading, setIsLoading] = useState(false);
const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

const products = [
{
name: "Bốt cao cổ đan ReKnit",
price: "$140.00",
oldPrice: null,
image: PRODUCT_IMAGE_PLACEHOLDER,
hoverImage: PRODUCT_IMAGE_PLACEHOLDER,
saleTag: null,
},
{
name: "Áo len cáp Merino Felted",
price: "$58.00",
oldPrice: null,
image: PRODUCT_IMAGE_PLACEHOLDER,
hoverImage: PRODUCT_IMAGE_PLACEHOLDER,
saleTag: null,
},
{
name: "Quần jean cotton hữu cơ Slim Fit",
price: "$108.00",
oldPrice: null,
image: PRODUCT_IMAGE_PLACEHOLDER,
hoverImage: PRODUCT_IMAGE_PLACEHOLDER,
saleTag: null,
},
{
name: "Bốt Chukka da lộn cổ điển",
price: "$125.00",
oldPrice: null,
image: PRODUCT_IMAGE_PLACEHOLDER,
hoverImage: PRODUCT_IMAGE_PLACEHOLDER,
saleTag: null,
},
{
name: "Mũ bóng chày Organic Kiwi",
price: "$40.00",
oldPrice: null,
image: PRODUCT_IMAGE_PLACEHOLDER,
hoverImage: PRODUCT_IMAGE_PLACEHOLDER,
saleTag: null,
},
{
name: "Áo Trench Drape xếp ly",
price: "$48.00",
oldPrice: null,
image: PRODUCT_IMAGE_PLACEHOLDER,
hoverImage: PRODUCT_IMAGE_PLACEHOLDER,
saleTag: null,
},

    {
      name: "Mũ len Chunky Cotton Hữu cơ",
      price: "$20.00",
      oldPrice: "$48.00",
      image: PRODUCT_IMAGE_PLACEHOLDER,
      hoverImage: PRODUCT_IMAGE_PLACEHOLDER,
      saleTag: "-58%",
    },
    {
      name: "Áo Smock cổ phễu",
      price: "$70.00",
      oldPrice: null,
      image: PRODUCT_IMAGE_PLACEHOLDER,
      hoverImage: PRODUCT_IMAGE_PLACEHOLDER,
      saleTag: null,
    },
    {
      name: "Áo len Alpaca Oversized",
      price: "$100.00",
      oldPrice: null,
      image: PRODUCT_IMAGE_PLACEHOLDER,
      hoverImage: PRODUCT_IMAGE_PLACEHOLDER,
      saleTag: null,
    },
    {
      name: "Áo len Merino khóa nửa cổ",
      price: "$145.00",
      oldPrice: null,
      image: PRODUCT_IMAGE_PLACEHOLDER,
      hoverImage: PRODUCT_IMAGE_PLACEHOLDER,
      saleTag: null,
    },
    {
      name: "Áo sơ mi Caro Flannel chải kỹ",
      price: "$48.00",
      oldPrice: "$50.00",
      image: PRODUCT_IMAGE_PLACEHOLDER,
      hoverImage: PRODUCT_IMAGE_PLACEHOLDER,
      saleTag: "-4%",
    },
    {
      name: "Áo khoác dài Merino Tái chế",
      price: "$79.00",
      oldPrice: null,
      image: PRODUCT_IMAGE_PLACEHOLDER,
      hoverImage: PRODUCT_IMAGE_PLACEHOLDER,
      saleTag: null,
    },

    {
      name: "Váy Polo Cotton",
      price: "$75.00",
      oldPrice: null,
      image: PRODUCT_IMAGE_PLACEHOLDER,
      hoverImage: PRODUCT_IMAGE_PLACEHOLDER,
      saleTag: null,
    },
    {
      name: "Áo len cổ chữ V Alpaca Oversized",
      price: "$120.00",
      oldPrice: null,
      image: PRODUCT_IMAGE_PLACEHOLDER,
      hoverImage: PRODUCT_IMAGE_PLACEHOLDER,
      saleTag: null,
    },
    {
      name: "Khăn Cashmere Tái chế",
      price: "$90.00",
      oldPrice: null,
      image: PRODUCT_IMAGE_PLACEHOLDER,
      hoverImage: PRODUCT_IMAGE_PLACEHOLDER,
      saleTag: null,
    },

];

const productsToDisplay = products.slice(0, productsToShow);
const hasMoreProducts = productsToShow < products.length;

const loadMore = () => {
setIsLoading(true);

    setTimeout(() => {
      setProductsToShow((prev) => prev + PRODUCTS_PER_LOAD);
      setIsLoading(false);
    }, 1000);

};

return (
<section
ref={sectionRef}
className={`pt-12 px-4 sm:px-0 scroll-reveal ${
        isVisible ? "animate-reveal" : ""
      }`} >
{/_ Tiêu đề _/}
<div className="mb-8 flex justify-between items-center pb-2">
<h2 className="text-2xl font-bold text-gray-800">Sản phẩm Nổi bật</h2>
<a
          href="#"
          className="text-sm text-gray-500 hover:text-red-600 flex items-center"
        >
Xem tất cả danh mục <span className="ml-1 text-xs">{">"}</span>
</a>
</div>

      {/* Danh sách sản phẩm - Đã sửa Responsive */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {productsToDisplay.map((product, index) => (
          // Các ProductCard sẽ tự động lazy load
          <ProductCard key={index} {...product} showAddToCart={true} />
        ))}
      </div>

      {/* Nút Load More - Chỉ hiển thị khi còn sản phẩm để tải */}
      {hasMoreProducts && (
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

// Component LargePromoBanner
const LargePromoBanner = ({ createRipple }) => {
// NEW: Nhận createRipple prop
const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

return (
<section
ref={sectionRef}
className={`pt-12 px-4 sm:px-0 scroll-reveal ${
        isVisible ? "animate-reveal" : ""
      }`} >
<div className="bg-gray-100 p-8 md:p-10 flex flex-col md:flex-row justify-between items-center rounded-lg relative overflow-hidden min-h-[300px]">
{/_ Cột trái: Nội dung Text _/}
<div className="z-10 text-center md:text-left py-4 md:py-0">
<h3 className="text-3xl font-bold text-gray-800 mb-3">
Ưu đãi hấp dẫn: 3 Áo khoác
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
onClick={createRipple} // Apply ripple
className="bg-white text-gray-900 border border-gray-300 px-8 py-4 text-sm font-semibold tracking-wider hover:bg-gray-200 transition duration-200 shadow-lg rounded-md w-full sm:w-auto ripple-button" >
NHẬN ƯU ĐÃI
</button>
</div>
</div>

        {/* Cột phải: Hình ảnh Placeholder (Chỉ hiển thị trên desktop) */}
        <div
          className="hidden md:block absolute right-0 top-0 bottom-0 w-1/3 h-full"
          style={{
            backgroundImage: `url(https://placehold.co/400x400/D4D4D4/333333/png?text=Áo+khoác)`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-gray-100 via-gray-100/50 to-transparent"></div>
        </div>
      </div>
    </section>

);
};

// Component ServiceInfo
const ServiceInfo = () => {
const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

const services = [
{
icon: FreeShippingIcon,
title: "Miễn phí vận chuyển",
description: "Trong vòng 30 ngày để đổi trả.",
},
{
icon: MoneyIcon,
title: "Đảm bảo hoàn tiền",
description: "Trong vòng 30 ngày để đổi trả.",
},
{
icon: HeadsetIcon,
title: "Hỗ trợ trực tuyến",
description: "24 giờ mỗi ngày, 7 ngày một tuần",
},
{
icon: CreditCardIcon,
title: "Thanh toán linh hoạt",
description: "Thanh toán bằng nhiều loại thẻ Tín dụng",
},
];

return (
<div className="max-w-7xl mx-auto border-t border-gray-200 mt-16 pt-8 pb-12">
<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
<div className="flex flex-col items-center">
<Truck size={30} className="text-gray-900 mb-2" />
<h5 className="text-sm font-semibold text-gray-800">
Miễn phí vận chuyển
</h5>
<p className="text-xs text-gray-500 mt-1">
Miễn phí vận chuyển cho đơn hàng trên £130
</p>
</div>
<div className="flex flex-col items-center">
<DollarSign size={30} className="text-gray-900 mb-2" />
<h5 className="text-sm font-semibold text-gray-800">
Đảm bảo hoàn tiền
</h5>
<p className="text-xs text-gray-500 mt-1">
Trong vòng 30 ngày để đổi trả.
</p>
</div>
<div className="flex flex-col items-center">
<Headset size={30} className="text-gray-900 mb-2" />
<h5 className="text-sm font-semibold text-gray-800">
Hỗ trợ trực tuyến
</h5>
<p className="text-xs text-gray-500 mt-1">
24 giờ mỗi ngày, 7 ngày mỗi tuần
</p>
</div>
<div className="flex flex-col items-center">
<CreditCard size={30} className="text-gray-900 mb-2" />
<h5 className="text-sm font-semibold text-gray-800">
Thanh toán linh hoạt
</h5>
<p className="text-xs text-gray-500 mt-1">
Thanh toán bằng nhiều loại thẻ tín dụng
</p>
</div>
</div>
</div>
);
};

// Component Footer (Chân trang)
const Footer = () => {
const quickLinks = [
"Về chúng tôi",
"Chính sách bảo mật",
"Điều khoản & Điều kiện",
"Phản hồi khách hàng",
"Tìm kiếm hàng đầu",
];
const customerCare = [
"Tài khoản của tôi",
"Đăng nhập",
"Giỏ hàng của tôi",
"Danh sách yêu thích",
"Thanh toán",
];
const otherBusiness = [
"Chương trình Đối tác",
"Chương trình Cộng tác viên",
"Bán sỉ Tất",
"Bán sỉ Tất Hài",
"Thông tin Giao hàng",
];

const FooterLinkColumn = ({ title, links }) => (
<div>
<h4 className="text-white font-bold text-sm mb-6 tracking-wider">
{title}
</h4>
<ul className="space-y-3">
{links.map((link) => (
<li key={link}>
<a
              href="#"
              className="text-gray-400 text-sm hover:text-white transition"
            >
{link}
</a>
</li>
))}
</ul>
</div>
);

return (
<footer className="bg-black text-white">
<div className="max-w-7xl mx-auto px-6 pt-16 pb-6">
{/_ Khu vực 4 cột chính - Đã sửa Responsive _/}
<div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-b border-gray-800 pb-8">
<FooterLinkColumn title="TÌM KIẾM NHANH" links={quickLinks} />
<FooterLinkColumn title="CHĂM SÓC KHÁCH HÀNG" links={customerCare} />
<div className="col-span-2 md:col-span-1">
<FooterLinkColumn title="KINH DOANH KHÁC" links={otherBusiness} />
</div>

          {/* Cột 4: NEWSLETTER */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-bold text-sm mb-6 tracking-wider">
              BẢN TIN (NEWSLETTER)
            </h4>
            <div className="flex mb-4 relative">
              <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="email"
                placeholder="Địa chỉ email của bạn"
                className="w-full pl-10 pr-10 py-3 text-sm text-gray-900 rounded-l-md focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              <button className="bg-white text-gray-900 px-3 py-3 rounded-r-md hover:bg-gray-200 transition">
                <RightArrowIcon className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mb-6">
              * Bằng cách đăng ký, tôi đồng ý nhận bản tin email của Megastore.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram">
                <InstagramIcon className="text-gray-400 hover:text-white transition w-5 h-5" />
              </a>
              <a href="#" aria-label="Facebook">
                <FacebookIcon className="opacity-75 hover:opacity-100 transition text-base w-4 h-4" />
              </a>
              <a href="#" aria-label="Twitter">
                <TwitterIcon className="opacity-75 hover:opacity-100 transition text-base w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Khu vực Bản quyền và Thanh toán */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 space-y-4 md:space-y-0">
          <p className="text-sm text-gray-400">
            &copy; 2025 Megastore. Bảo lưu mọi quyền.
          </p>

          {/* Payment Icons Placeholder */}
          <div className="flex space-x-1">
            <img
              src="https://placehold.co/40x25/FFFFFF/333333/png?text=Visa"
              alt="Visa"
              className="rounded"
            />
            <img
              src="https://placehold.co/40x25/FFFFFF/333333/png?text=Master"
              alt="Mastercard"
              className="rounded"
            />
            <img
              src="https://placehold.co/40x25/FFFFFF/333333/png?text=Amex"
              alt="Amex"
              className="rounded"
            />
            <img
              src="https://placehold.co/40x25/FFFFFF/333333/png?text=Pay"
              alt="Apple Pay"
              className="rounded"
            />
            <img
              src="https://placehold.co/40x25/FFFFFF/333333/png?text=GPay"
              alt="Google Pay"
              className="rounded"
            />
          </div>
        </div>
      </div>
    </footer>

);
};

// Component FixedUtilities
const FixedUtilities = ({ isScrollTopVisible, isChatOpen, toggleChat }) => {
const scrollToTop = () => {
window.scrollTo({
top: 0,
behavior: "smooth",
});
};

return (
<div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end space-y-3">
{/_ Nút Scroll to Top _/}
<button
onClick={scrollToTop}
className={`                    w-12 h-12 bg-black text-white rounded-full shadow-xl 
                    flex items-center justify-center transition-opacity duration-300
                    ${
                      isScrollTopVisible
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }
               `}
aria-label="Cuộn lên đầu trang" >
<ArrowUpIcon className="w-5 h-5" />
</button>

      {/* Nút Live Chat/Close Chat */}
      <button
        onClick={toggleChat}
        className={`w-14 h-14 text-white rounded-full shadow-2xl flex items-center justify-center transition duration-300 transform
                    ${
                      isChatOpen
                        ? "bg-red-600 hover:bg-red-700 rotate-90" // Màu đỏ khi chat mở
                        : "bg-blue-500 hover:bg-blue-600" // Màu xanh khi chat đóng
                    }`}
        aria-label={isChatOpen ? "Đóng chat" : "Trò chuyện trực tuyến"}
      >
        {isChatOpen ? (
          <XIcon className="w-7 h-7" />
        ) : (
          <ChatIcon className="w-7 h-7 fill-white stroke-white" />
        )}
      </button>
    </div>

);
};

// Component MainContent (Tổng hợp các phần nội dung của TRANG CHỦ)
const MainContent = ({ createRipple }) => {
// NEW: Nhận createRipple prop
const IMAGE_PLACEHOLDER =
"https://placehold.co/400x400/D4D4D4/333333/png?text=Quảng+cáo";
const [bannersRef, bannersVisible] = useIntersectionObserver({
threshold: 0.2,
});
const [categoriesRef, categoriesVisible] = useIntersectionObserver({
threshold: 0.1,
});

const adBanners = [
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

const popularCategories = [
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
{ name: "Quần Nữ", icon: "👖" },
{ name: "Áo Cardigan", icon: "👚" },
];

const AdBanner = ({ title, tag, image, index, isVisible }) => {
// Lazy loading banner image (using a simple placeholder here, no hover image to worry about)
const [bannerRef, bannerVisible] = useIntersectionObserver({
threshold: 0.5,
});
const finalImage = bannerVisible ? image : LAZY_IMAGE_PLACEHOLDER;

    return (
      <div
        ref={bannerRef}
        className={`flex-1 h-56 bg-white shadow-lg overflow-hidden relative group rounded-lg transition duration-300 transform hover:scale-[1.02] scroll-reveal`}
        style={{
          // Use finalImage from Lazy Loading
          backgroundImage: `url(${finalImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          // Apply reveal animation and stagger delay
          animation: isVisible
            ? `slide-up-fade-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards ${
                index * 0.15
              }s`
            : "none",
        }}
      >
        <div className="absolute inset-0 bg-gray-900 opacity-20"></div>

        <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
          <h3 className="text-xl font-bold max-w-xs">{title}</h3>

          <div className="bg-white text-gray-900 text-sm font-semibold px-4 py-2 w-max shadow-md transition duration-300 hover:bg-gray-200 cursor-pointer rounded-md">
            {tag}
          </div>
        </div>
      </div>
    );

};

// Component CategoryItem
const CategoryItem = ({ name, icon, index, isVisible }) => (
<div
className={`flex flex-col items-center justify-center p-6 text-center bg-white transition duration-300 group hover:bg-gray-50 cursor-pointer transform group-hover:scale-[1.05] z-10 relative scroll-reveal`}
style={{
        transition: "transform 0.3s ease-out",
        // Apply reveal animation and stagger delay
        animation: isVisible
          ? `slide-up-fade-in 0.6s ease-out forwards ${index * 0.05}s`
          : "none",
      }} >
<div className="w-16 h-16 mb-2 flex items-center justify-center text-4xl bg-gray-100 rounded-full group-hover:bg-red-50 transition">
{icon}
</div>
<p className="text-sm font-semibold text-gray-800">{name}</p>
</div>
);

return (
<section className="px-4 sm:px-6 max-w-7xl mx-auto">
{/_ 1. Khu vực 3 Banner Quảng cáo _/}
<div
        ref={bannersRef}
        className="pt-8 md:pt-12 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8"
      >
{adBanners.map((banner, index) => (
<AdBanner
key={index}
{...banner}
index={index}
isVisible={bannersVisible}
/>
))}
</div>
{/_ 2. Khu vực Danh mục Phổ biến _/}
<div className="pt-8">
<div
className={`mb-6 flex justify-between items-center border-b border-gray-100 pb-2 scroll-reveal ${
            categoriesVisible ? "animate-reveal" : ""
          }`} >
<h2 className="text-2xl font-bold text-gray-800">
Danh mục Phổ biến
</h2>
<a
            href="#"
            className="text-sm text-gray-500 hover:text-red-600 flex items-center"
          >
Xem tất cả danh mục <span className="ml-1 text-xs">{">"}</span>
</a>
</div>

        <div
          ref={categoriesRef}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 border border-gray-200 divide-x divide-y divide-gray-200"
        >
          {popularCategories.slice(0, 12).map((cat, index) => (
            <CategoryItem
              key={index}
              {...cat}
              index={index}
              isVisible={categoriesVisible}
            />
          ))}
        </div>
      </div>
      {/* 4. Thêm Trending Collection */}
      <TrendingCollection />
      {/* 5. Thêm Weekly Trending */}
      <WeeklyTrending />
      {/* 6. Thêm Featured Products */}
      <FeaturedProducts />
      {/* 7. Thêm Large Promo Banner */}
      <LargePromoBanner createRipple={createRipple} />{" "}
      {/* Truyền ripple prop */}
      {/* 8. Thêm Service Info */}
      <ServiceInfo />
    </section>

);
};

// ----------------------------------------------------
// BLOG COMPONENTS
// ----------------------------------------------------

const blogPosts = [
{
title: "Học hỏi ngay các mẫu tết tóc dạo phố dễ làm",
meta: "STYLE GUIDE, TIPS & ĐẸP PLUS",
summary:
"Tóc không chỉ là một kiểu tóc cổ điển mà còn là nghệ thuật biến tấu vô tận. Đặc biệt, các mẫu tết tóc sau đầu đang trở thành xu hướng được yêu thích vì khả năng mang lại vẻ ngoài lãng mạn, duyên dáng nhưng không kém phần cá tính...",
image: "https://placehold.co/400x300/F5F5F5/333333/png?text=Kiểu+Tóc+Mới",
large: true,
date: "15/06/2025",
},
{
title: "Các kiểu pose dáng trên bãi cỏ cực trendy đáng để học hỏi",
meta: "XU HƯỚNG THỜI TRANG, STYLE GUIDE, TIPS/PHỐI ĐỒ",
summary:
"Việc tận hưởng không gian xanh mát và khí trời trong lành ở công viên hay khu dã ngoại đã trở thành xu hướng được giới trẻ yêu thích. Dưới đây là các kiểu pose dáng cực trendy...",
image:
"https://placehold.co/400x300/D1D5DB/333333/png?text=Pose+Dáng+Trendy",
large: false,
date: "12/06/2025",
},
{
title: "Khám phá bùng nổ ưu đãi cuối năm lên đến 50%",
meta: "TIN TỨC THỜI TRANG",
summary:
"Khởi đầu mùa lễ hội theo cách thú vị nhất cùng Karl Lagerfeld! Những thiết kế đặc trưng với chất liệu cao cấp, giảm đến 50% từ 12-21/12/2025. Đừng bỏ lỡ!",
image:
"https://placehold.co/400x300/3B82F6/FFFFFF/png?text=SALE+50%25+Karl+Lagerfeld", // Blue banner (Giữ màu xanh ở đây)
large: false,
isBanner: true,
date: "12/12/2025",
},
{
title: "Điểm qua các kiểu áo họa tiết Polo Bear từ nhà Polo Ralph Lauren",
meta: "XU HƯỚNG THỜI TRANG, STYLE GUIDE, PHỐI ĐỒ",
summary:
"Bên cạnh logo ngựa Pony nổi tiếng, Polo Bear chính là một trong những biểu tượng đáng yêu và được săn đón nhất. Bài viết sẽ đi sâu vào lịch sử và cách phối đồ với áo Polo Bear.",
image:
"https://placehold.co/400x300/F3F4F6/333333/png?text=Polo+Bear+Style",
large: false,
date: "05/06/2025",
},
{
title: "Cách chọn đồ công sở phù hợp",
meta: "STYLE GUIDE",
summary:
"Tìm hiểu cách chọn trang phục công sở thoải mái mà vẫn chuyên nghiệp.",
image: "https://placehold.co/400x300/D4D4D4/333333/png?text=Công+Sở",
large: false,
date: "01/06/2025",
},
{
title: "Top 5 màu sắc cho mùa Xuân Hè 2025",
meta: "XU HƯỚNG THỜI TRANG",
summary:
"Các màu sắc nổi bật sẽ thống trị tủ quần áo của bạn trong mùa này.",
image: "https://placehold.co/400x300/D1D5DB/333333/png?text=Màu+Sắc",
large: false,
date: "28/05/2025",
},
{
title: "Lợi ích của chất liệu Organic Cotton",
meta: "MUA SẮM THÔNG MINH",
summary:
"Cotton hữu cơ không chỉ tốt cho môi trường mà còn mềm mại cho làn da.",
image: "https://placehold.co/400x300/E5E7EB/333333/png?text=Cotton",
large: false,
date: "20/05/2025",
},
];

const BlogFeaturedPost = ({ post, index }) => {
const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
const [imageLoaded, setImageLoaded] = useState(false);

return (
<article
ref={ref}
className={`flex flex-col md:flex-row mb-12 lg:mb-16 border border-gray-100 rounded-lg overflow-hidden shadow-lg scroll-reveal ${
        isVisible ? "animate-reveal" : ""
      }`} >
{/_ Image (40% width on desktop) _/}
<div className="md:w-5/12 w-full h-80 md:h-auto overflow-hidden flex-shrink-0">
<a href="#">
<img
src={isVisible ? post.image : LAZY_IMAGE_PLACEHOLDER}
alt={post.title}
className={`w-full h-full object-cover transition duration-500 ease-in-out transform hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-70"
            }`}
onLoad={() => setImageLoaded(true)}
onError={(e) => {
e.target.onerror = null;
e.target.src =
"https://placehold.co/400x300/E5E7EB/333333?text=Post+Lớn";
setImageLoaded(true);
}}
/>
</a>
</div>

      {/* Content (60% width on desktop) */}
      <div className="md:w-7/12 w-full p-6 md:p-8 flex flex-col justify-between bg-white">
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2 block">
            {post.meta}
          </span>
          <a href="#">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 hover:text-red-700 transition leading-snug">
              {post.title}
            </h2>
          </a>
          <p className="text-gray-600 text-base line-clamp-3 mb-4">
            {post.summary}
          </p>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <span className="text-sm text-gray-500">Đăng ngày: {post.date}</span>
          <a
            href="#"
            className="flex items-center text-sm font-semibold text-gray-800 hover:text-red-600 transition"
          >
            Xem thêm <ArrowRightIcon className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </article>

);
};

const BlogGridPost = ({ post, index }) => {
const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
const [imageLoaded, setImageLoaded] = useState(false);

// Banner style check
const isBanner = post.isBanner;

// Choose appropriate placeholder for banner or image post
const placeholder = isBanner
? "https://placehold.co/400x300/D4D4D4/333333/png?text=Banner+QC"
: "https://placehold.co/400x300/E5E7EB/333333/png?text=Post+Grid";

return (
<article
ref={ref}
className={`flex flex-col rounded-lg overflow-hidden shadow-md scroll-reveal ${
        isVisible ? "animate-reveal" : ""
      }`}
style={{ animationDelay: isVisible ? `${index * 0.1}s` : "0s" }} >
{/_ Image/Banner (3:2 aspect ratio) _/}
<div className={`w-full ${isBanner ? "h-56" : "h-64"} overflow-hidden`}>
<a href="#">
<img
src={isVisible ? post.image : LAZY_IMAGE_PLACEHOLDER}
alt={post.title}
className={`w-full h-full object-cover transition duration-300 ease-in-out transform ${
              !isBanner && "hover:scale-105"
            } ${imageLoaded ? "opacity-100" : "opacity-70"}`}
onLoad={() => setImageLoaded(true)}
onError={(e) => {
e.target.onerror = null;
e.target.src = placeholder;
setImageLoaded(true);
}}
/>
</a>
</div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-1 bg-white">
        <div>
          <span
            className={`text-xs font-bold uppercase tracking-wider mb-1 block ${
              isBanner
                ? "text-white bg-blue-600 px-2 py-1 inline-block rounded"
                : "text-gray-500"
            }`}
          >
            {post.meta}
          </span>
          <a href="#">
            <h3
              className={`text-lg font-bold text-gray-900 mb-2 hover:text-red-700 transition line-clamp-2 ${
                isBanner && "text-blue-600"
              }`}
            >
              {post.title}
            </h3>
          </a>
          <p
            className={`text-gray-600 text-sm line-clamp-2 ${
              isBanner && "text-blue-800 font-semibold"
            }`}
          >
            {post.summary}
          </p>
        </div>

        <div className="pt-3">
          <a
            href="#"
            className="flex items-center text-sm font-semibold text-gray-800 hover:text-red-600 transition"
          >
            Xem thêm <ArrowRightIcon className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </article>

);
};

const BlogPage = ({ setCurrentView }) => {
// Lấy bài viết nổi bật (large: true) và các bài viết khác
const featuredPost = blogPosts.find((post) => post.large);
const gridPosts = blogPosts.filter((post) => !post.large);

// Bài viết cho lưới 3 cột, nếu thiếu thì tự lặp lại các bài cơ bản.
const firstRowGrid = gridPosts.slice(0, 3);
const secondRowGrid = gridPosts.slice(3);

return (
<section className="px-4 sm:px-6 max-w-7xl mx-auto pt-6 pb-12">
{/_ Breadcrumbs _/}
<div className="mb-8 text-sm text-gray-500">
<a
href="#"
className="hover:text-red-600"
onClick={(e) => {
e.preventDefault();
setCurrentView("home");
}} >
Trang Chủ
</a>
<span className="mx-2 text-gray-400">/</span>
<span className="text-gray-900 font-semibold">Blog</span>
</div>

      {/* Banner Bài viết Nổi bật Lớn */}
      {featuredPost && <BlogFeaturedPost post={featuredPost} index={0} />}

      {/* Grid Bài viết (Dòng 1: 3 cột) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {firstRowGrid.map((post, index) => (
          <BlogGridPost key={index} post={post} index={index} />
        ))}
      </div>

      {/* Tiêu đề Bài viết mới */}
      <div className="mb-6 flex justify-between items-center border-b border-gray-100 pb-2">
        <h2 className="text-2xl font-bold text-gray-800">Bài viết Mới nhất</h2>
        <a
          href="#"
          className="text-sm text-gray-500 hover:text-red-600 flex items-center"
        >
          Xem tất cả <span className="ml-1 text-xs">{">"}</span>
        </a>
      </div>

      {/* Grid Bài viết (Dòng 2: 3 cột - nếu có) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {secondRowGrid.map((post, index) => (
          <BlogGridPost key={index} post={post} index={index} />
        ))}
      </div>
    </section>

);
};

// ----------------------------------------------------
// CONTACT PAGE COMPONENT
// ----------------------------------------------------

const ContactPage = ({ createRipple, setCurrentView }) => {
const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
const [statusMessage, setStatusMessage] = useState(null);

const handleSubmit = (e) => {
e.preventDefault();
createRipple(e); // Apply ripple to the submit button
setStatusMessage(
"Tin nhắn của bạn đã được gửi thành công! Chúng tôi sẽ phản hồi sớm."
);
setTimeout(() => setStatusMessage(null), 5000);
};

const contactInfo = [
{
icon: MapPinIcon,
title: "Địa chỉ cửa hàng",
detail: "216 Đại lộ Cách Mạng Tháng 8, Phường 10, Quận 3, TP.HCM",
},
{
icon: PhoneIcon,
title: "Điện thoại & Hỗ trợ",
detail: "+84 901 234 567",
},
{ icon: MailIcon, title: "Email liên hệ", detail: "support@megastore.vn" },
{
icon: ClockIcon,
title: "Giờ làm việc",
detail: "Thứ Hai - Thứ Sáu: 9:00 - 18:00",
},
];

return (
<section className="px-4 sm:px-6 max-w-7xl mx-auto pt-6 pb-12" ref={ref}>
{/_ Breadcrumbs _/}
<div className="mb-8 text-sm text-gray-500">
<a
href="#"
className="hover:text-red-600"
onClick={(e) => {
e.preventDefault();
setCurrentView("home");
}} >
Trang Chủ
</a>
<span className="mx-2 text-gray-400">/</span>
<span className="text-gray-900 font-semibold">Liên Hệ</span>
</div>

      <h1 className="text-4xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-3">
        Liên Hệ Với Chúng Tôi
      </h1>

      {/* Map Section */}
      <div className="mb-12 overflow-hidden rounded-lg shadow-xl scroll-reveal animate-reveal">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.390886299105!2d106.68728987508493!3d10.781878889360814!2m3!1f0!2f0!0f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f205c06497f%3A0x647e3a985f5e557b!2zQ2jhu6MgQuG6v24gVGhDoG5o!5e0!3m2!1svi!2sbd!4v1703673752119!5m2!1svi!2sbd"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Map Placeholder"
        ></iframe>
      </div>

      {/* Contact Form and Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Form (2/3 width on large screens) */}
        <div
          className="lg:col-span-2 p-6 bg-white border border-gray-100 rounded-lg shadow-lg scroll-reveal animate-reveal"
          style={{ animationDelay: "0.1s" }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Gửi tin nhắn cho chúng tôi
          </h2>

          {statusMessage && (
            <div className="mb-4 p-4 bg-green-500 text-white rounded-md text-sm font-semibold animate-fade-in">
              {statusMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Họ tên
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  placeholder="vidu@email.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Chủ đề
              </label>
              <input
                type="text"
                id="subject"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                placeholder="Vấn đề cần hỗ trợ"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nội dung tin nhắn
              </label>
              <textarea
                id="message"
                rows="4"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                placeholder="Nhập nội dung tin nhắn của bạn..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-red-600 text-white px-8 py-3 text-sm font-semibold hover:bg-red-700 transition rounded-md shadow-md ripple-button"
            >
              GỬI TIN NHẮN
            </button>
          </form>
        </div>

        {/* Contact Information (1/3 width on large screens) */}
        <div
          className="lg:col-span-1 space-y-6 scroll-reveal animate-reveal"
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Thông tin cửa hàng
          </h2>

          {contactInfo.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg shadow-sm"
              >
                <Icon className="text-red-600 w-6 h-6 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-semibold text-gray-800">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600">{item.detail}</p>
                </div>
              </div>
            );
          })}

          {/* Note về Chat Support */}
          <div className="p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700 rounded-lg">
            <p className="text-sm font-semibold">Hỗ trợ Trực tuyến (Chat)</p>
            <p className="text-xs">
              Sử dụng nút Chat màu xanh dương/đỏ ở góc dưới bên phải màn hình để
              được hỗ trợ 24/7.
            </p>
          </div>
        </div>
      </div>
    </section>

);
};

// ----------------------------------------------------
// LIVE CHAT MODAL (NEW)
// ----------------------------------------------------

const LiveChatModal = ({ isChatOpen, toggleChat }) => {
const [messages, setMessages] = useState([
{
id: 1,
text: "Chào mừng đến với Megastore! Tôi có thể giúp gì cho bạn hôm nay?",
sender: "bot",
time: "9:00 AM",
},
]);
const [newMessage, setNewMessage] = useState("");
const [isTyping, setIsTyping] = useState(false);
const messagesEndRef = useRef(null);

const scrollToBottom = () => {
messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
};

useEffect(scrollToBottom, [messages]);

// Auto-respond logic
useEffect(() => {
if (
messages.length > 1 &&
messages[messages.length - 1].sender === "user"
) {
setIsTyping(true);
setTimeout(() => {
const response = {
id: messages.length + 1,
text: "Cảm ơn bạn đã gửi tin nhắn. Hiện tại tôi đang kiểm tra thông tin. Xin vui lòng chờ trong giây lát. (Phản hồi tự động)",
sender: "bot",
time: new Date().toLocaleTimeString("vi-VN", {
hour: "2-digit",
minute: "2-digit",
}),
};
setMessages((prev) => [...prev, response]);
setIsTyping(false);
}, 1500);
}
}, [messages.length]);

const handleSend = (e) => {
e.preventDefault();
if (newMessage.trim() === "" || isTyping) return;

    const userMessage = {
      id: messages.length + 1,
      text: newMessage.trim(),
      sender: "user",
      time: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

};

// Individual Message Component
const ChatMessage = ({ text, sender, time }) => (
<div
className={`flex mb-4 ${
        sender === "user" ? "justify-end" : "justify-start"
      }`} >
<div
className={`max-w-xs lg:max-w-md ${
          sender === "user"
            ? "bg-red-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-tl-none"
        } p-3 rounded-xl shadow-sm relative`} >
<p className="text-sm">{text}</p>
<span
className={`text-xs block mt-1 ${
            sender === "user"
              ? "text-red-200 text-right"
              : "text-gray-500 text-left"
          }`} >
{time}
</span>
</div>
</div>
);

// Typing Indicator Component
const TypingIndicator = () => (
<div className="flex mb-4 justify-start">
<div className="bg-gray-200 text-gray-800 rounded-xl rounded-tl-none p-3 shadow-sm flex items-center space-x-1.5">
<div
className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"
style={{ animationDelay: "0s" }} ></div>
<div
className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"
style={{ animationDelay: "0.2s" }} ></div>
<div
className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"
style={{ animationDelay: "0.4s" }} ></div>
</div>
</div>
);

return (
<div
className={`fixed bottom-20 right-6 w-80 h-96 bg-white rounded-xl shadow-2xl flex flex-col z-[100] transition-transform duration-300 ease-in-out border border-gray-200 
                ${
                  isChatOpen
                    ? "scale-100 opacity-100 translate-y-0"
                    : "scale-75 opacity-0 translate-y-10 pointer-events-none"
                }`} >
{/_ Chat Header _/}
<div className="p-4 bg-red-600 text-white rounded-t-xl flex items-center justify-between shadow-md">
<div className="flex items-center">
<HeadsetIcon className="w-5 h-5 mr-2" />
<div>
<h3 className="text-sm font-bold">Hỗ trợ Megastore</h3>
<p className="text-xs text-red-100">
{isTyping ? "Đang trả lời..." : "Trực tuyến"}
</p>
</div>
</div>
<button
          onClick={toggleChat}
          className="p-1 hover:bg-red-700 rounded-full transition"
        >
<XIcon className="w-4 h-4" />
</button>
</div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} {...msg} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <form
        onSubmit={handleSend}
        className="p-3 border-t border-gray-200 bg-white flex"
      >
        <input
          type="text"
          className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-red-500 disabled:bg-gray-100"
          placeholder="Nhập tin nhắn..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={isTyping}
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 text-sm font-semibold rounded-r-md hover:bg-red-700 transition disabled:bg-gray-400"
          disabled={isTyping || newMessage.trim() === ""}
        >
          <RightArrowIcon className="w-5 h-5" />
        </button>
      </form>
    </div>

);
};

// ----------------------------------------------------
// CART PAGE COMPONENT (NEW)
// ----------------------------------------------------

const CartPage = ({
cartItems,
setCartItems,
updateQuantity,
removeItem,
createRipple,
setCurrentView,
}) => {
const FREE_SHIPPING_THRESHOLD = 200.0;

// Tính toán tổng phụ
const cartSubtotal = cartItems.reduce(
(sum, item) =>
sum + parseFloat(item.price.replace("$", "")) _ item.quantity,
0
);
const remainingToFreeShipping = FREE_SHIPPING_THRESHOLD - cartSubtotal;
const isFreeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD;
const shippingCost = isFreeShipping ? 0 : 15.0;
const estimatedTax = cartSubtotal _ 0.05;
const cartTotal = cartSubtotal + shippingCost + estimatedTax;

return (
<section className="px-4 sm:px-6 max-w-7xl mx-auto pt-6 pb-12">
{/_ Breadcrumbs _/}
<div className="mb-8 text-sm text-gray-500">
<a
href="#"
className="hover:text-red-600"
onClick={(e) => {
e.preventDefault();
setCurrentView("home");
}} >
Trang Chủ
</a>
<span className="mx-2 text-gray-400">/</span>
<span className="text-gray-900 font-semibold">Giỏ hàng</span>
</div>

      <h1 className="text-4xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-3">
        Giỏ hàng của bạn
      </h1>

      {cartItems.length === 0 ? (
        // EMPTY CART STATE
        <div className="flex flex-col items-center justify-center py-20">
          <ModalCartIcon className="text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Giỏ hàng của bạn đang trống
          </h2>
          <p className="text-gray-600 mb-8 text-center max-w-sm">
            Hãy xem qua các sản phẩm có sẵn và bắt đầu mua sắm ngay hôm nay!
          </p>
          <button className="bg-black text-white px-8 py-3 text-sm font-semibold hover:bg-gray-800 transition rounded-md">
            Tiếp tục Mua sắm
          </button>
        </div>
      ) : (
        // CART WITH ITEMS
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Cart Items (2/3 width) */}
          <div className="lg:col-span-2">
            {/* Cart Header */}
            <div className="grid grid-cols-5 md:grid-cols-5 gap-4 px-4 py-3 bg-gray-100 font-bold text-sm text-gray-800 rounded-lg mb-4 hidden md:grid">
              <span className="col-span-2">Sản phẩm</span>
              <span className="col-span-1 text-center">Số lượng</span>
              <span className="col-span-1 text-right">Subtotal</span>
              <span className="col-span-1 text-right">Hành động</span>
            </div>

            {/* Cart Items List */}
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
                isFullPage={true}
              />
            ))}

            {/* Free Shipping Progress Bar */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm font-semibold mb-2">
                {isFreeShipping ? (
                  <span className="text-green-600">
                    🎉 MIỄN PHÍ VẬN CHUYỂN!
                  </span>
                ) : (
                  <span className="text-blue-600">
                    Mua thêm ${remainingToFreeShipping.toFixed(2)} để được MIỄN
                    PHÍ VẬN CHUYỂN!
                  </span>
                )}
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    isFreeShipping ? "bg-green-500" : "bg-blue-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      100,
                      (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Order Summary (1/3 width) */}
          <div className="lg:col-span-1 p-6 bg-white border border-gray-200 rounded-xl shadow-lg h-min sticky top-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Tóm tắt đơn hàng
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Tổng phụ</span>
                <span className="font-semibold">
                  ${cartSubtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Vận chuyển</span>
                <span className="font-semibold">
                  {shippingCost === 0 ? (
                    <span className="text-green-600">Miễn phí</span>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-3 text-base">
                <span className="text-gray-600">Thuế (5%)</span>
                <span className="font-semibold">
                  ${estimatedTax.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between pt-3">
                <span className="text-xl font-bold text-gray-900">
                  TỔNG CỘNG
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={(e) => {
                createRipple(e);
                setCurrentView("checkout");
              }}
              className="w-full bg-blue-600 text-white px-4 py-3 text-sm font-semibold hover:bg-blue-700 transition mb-2 rounded-md ripple-button"
            >
              Tiến hành Thanh toán
            </button>
            <button
              onClick={() => setCurrentView("shop")}
              className="w-full text-gray-800 border border-gray-300 px-4 py-3 text-sm font-semibold hover:bg-gray-100 transition rounded-md"
            >
              Tiếp tục Mua sắm
            </button>
          </div>
        </div>
      )}
    </section>

);
};

// ----------------------------------------------------
// PROFILE PAGE COMPONENT (NEW)
// ----------------------------------------------------

const ProfilePage = ({ setCurrentView, toggleLoginState, userName }) => {
const [activeTab, setActiveTab] = useState("info");
const [isEditing, setIsEditing] = useState(false);
const [profileData, setProfileData] = useState({
name: userName || "John Doe",
email: "john.doe@example.com",
phone: "+84 901 234 567",
avatar: "https://placehold.co/150x150/E5E7EB/666666/png?text=" + (userName || "User")
});

const [orderHistory] = useState([
{ id: "ORD-001", date: "15/12/2025", total: "$225.00", status: "Đã giao", items: 3 },
{ id: "ORD-002", date: "10/12/2025", total: "$158.50", status: "Đang xử lý", items: 2 },
{ id: "ORD-003", date: "05/12/2025", total: "$340.00", status: "Đã giao", items: 4 },
]);

const [addresses] = useState([
{ id: 1, name: "Nhà riêng", address: "216 Đại lộ Cách Mạng Tháng 8, P.10, Q.3, TP.HCM", default: true },
{ id: 2, name: "Văn phòng", address: "123 Đường Nguyễn Huệ, P.Bến Nghé, Q.1, TP.HCM", default: false },
]);

const [favorites] = useState([
{ id: 1, name: "Áo len cáp Merino", price: "$58.00", image: "https://placehold.co/200x200/D4D4D4/333333/png?text=Product" },
{ id: 2, name: "Bốt cao cổ da", price: "$125.00", image: "https://placehold.co/200x200/D4D4D4/333333/png?text=Product" },
]);

const handleInputChange = (e) => {
const { name, value } = e.target;
setProfileData(prev => ({ ...prev, [name]: value }));
};

const handleSave = () => {
setIsEditing(false);
alert("Thông tin cá nhân đã được cập nhật!");
};

const handleLogout = () => {
toggleLoginState(false);
setCurrentView("home");
alert("Đã đăng xuất thành công!");
};

const TabButton = ({ tab, label, icon }) => (
<button
onClick={() => setActiveTab(tab)}
className={`px-6 py-3 text-sm font-semibold transition-all ${
        activeTab === tab
          ? "text-white bg-red-600 border-b-2 border-red-600"
          : "text-gray-700 bg-white hover:text-red-600"
      }`} >
{label}
</button>
);

return (
<section className="px-4 sm:px-6 max-w-7xl mx-auto pt-6 pb-12">

      {/* Breadcrumbs */}
      <div className="mb-8 text-sm text-gray-500">
        <a href="#" className="hover:text-red-600" onClick={(e) => { e.preventDefault(); setCurrentView("home"); }}>Trang Chủ</a>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900 font-semibold">Hồ sơ cá nhân</span>
      </div>

      {/* Header Profile */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 rounded-lg mb-8 shadow-lg">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 rounded-full bg-gray-300 border-4 border-white overflow-hidden flex-shrink-0">
            <img src={profileData.avatar} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{profileData.name}</h1>
            <p className="text-gray-300 text-lg">{profileData.email}</p>
            <p className="text-gray-400 text-sm mt-2">Thành viên từ: Tháng 6, 2023</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition font-semibold"
          >
            Đăng xuất
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6 flex space-x-1 overflow-x-auto bg-white rounded-t-lg shadow-sm">
        <TabButton tab="info" label="Thông tin cá nhân" />
        <TabButton tab="orders" label="Đơn hàng của tôi" />
        <TabButton tab="addresses" label="Địa chỉ giao hàng" />
        <TabButton tab="favorites" label="Yêu thích" />
        <TabButton tab="settings" label="Cài đặt" />
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-b-lg shadow-lg p-8">

        {/* TAB 1: Thông tin cá nhân */}
        {activeTab === "info" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông tin cá nhân</h2>
            {isEditing ? (
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition font-semibold"
                  >
                    Lưu thay đổi
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition font-semibold"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 font-medium">Họ tên</p>
                    <p className="text-lg text-gray-900 font-semibold mt-1">{profileData.name}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 font-medium">Email</p>
                    <p className="text-lg text-gray-900 font-semibold mt-1">{profileData.email}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 font-medium">Số điện thoại</p>
                    <p className="text-lg text-gray-900 font-semibold mt-1">{profileData.phone}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 font-medium">Trạng thái</p>
                    <p className="text-lg text-green-600 font-semibold mt-1">✓ Đã xác minh</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition font-semibold mt-4"
                >
                  Chỉnh sửa thông tin
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Đơn hàng */}
        {activeTab === "orders" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Lịch sử đơn hàng</h2>
            {orderHistory.length > 0 ? (
              <div className="space-y-3">
                {orderHistory.map((order) => (
                  <div key={order.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900">{order.id}</h3>
                        <p className="text-sm text-gray-600">Ngày đặt: {order.date}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === "Đã giao"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{order.items} sản phẩm</span>
                      <span className="text-lg font-bold text-gray-900">{order.total}</span>
                    </div>
                    <button className="mt-3 text-red-600 hover:text-red-700 font-semibold text-sm">
                      Xem chi tiết →
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
            )}
          </div>
        )}

        {/* TAB 3: Địa chỉ */}
        {activeTab === "addresses" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Địa chỉ giao hàng</h2>
            <div className="space-y-3 mb-6">
              {addresses.map((addr) => (
                <div key={addr.id} className="p-4 border-2 border-gray-200 rounded-lg" style={{ borderColor: addr.default ? '#dc2626' : '#d1d5db' }}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{addr.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">{addr.address}</p>
                    </div>
                    {addr.default && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 text-xs font-semibold rounded">Mặc định</span>
                    )}
                  </div>
                  <div className="flex space-x-3 mt-3">
                    <button className="text-red-600 hover:text-red-700 font-semibold text-sm">Chỉnh sửa</button>
                    <button className="text-gray-600 hover:text-gray-700 font-semibold text-sm">Xóa</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition font-semibold">
              + Thêm địa chỉ mới
            </button>
          </div>
        )}

        {/* TAB 4: Yêu thích */}
        {activeTab === "favorites" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sản phẩm yêu thích</h2>
            {favorites.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {favorites.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                    <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                    <div className="p-3">
                      <p className="font-semibold text-sm text-gray-900 line-clamp-2">{item.name}</p>
                      <p className="text-red-600 font-bold mt-1">{item.price}</p>
                      <button className="w-full bg-black text-white py-1 text-xs font-semibold rounded mt-2 hover:bg-red-600 transition">
                        Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Bạn chưa có sản phẩm yêu thích nào.</p>
            )}
          </div>
        )}

        {/* TAB 5: Cài đặt */}
        {activeTab === "settings" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cài đặt tài khoản</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">Nhận thông báo email</p>
                  <p className="text-sm text-gray-600 mt-1">Cập nhật về đơn hàng, ưu đãi và tin tức</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
              </div>
              <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">Nhận tin nhắn SMS</p>
                  <p className="text-sm text-gray-600 mt-1">Thông báo trạng thái đơn hàng qua SMS</p>
                </div>
                <input type="checkbox" className="w-5 h-5 cursor-pointer" />
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <button className="text-red-600 hover:text-red-700 font-semibold">
                  Thay đổi mật khẩu
                </button>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <button className="text-red-600 hover:text-red-700 font-semibold">
                  Xóa tài khoản
                </button>
                <p className="text-xs text-gray-600 mt-2">Hành động này không thể hoàn tác</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>

);
};

// ----------------------------------------------------
// CHECKOUT PAGE COMPONENT (NEW)
// ----------------------------------------------------

const CheckoutPage = ({ cartItems, createRipple, setCurrentView }) => {
const [step, setStep] = useState(1);
const [formData, setFormData] = useState({
fullName: "",
email: "",
phone: "",
address: "",
city: "",
shippingMethod: "standard",
paymentMethod: "card",
cardName: "",
cardNumber: "",
expiryDate: "",
cvv: "",
});

// Tính toán tổng phụ (giống CartPage)
const FREE_SHIPPING_THRESHOLD = 200.0;
const cartSubtotal = cartItems.reduce(
(sum, item) =>
sum + parseFloat(item.price.replace("$", "")) _ item.quantity,
0
);
const shippingCost = cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 15.0;
const estimatedTax = cartSubtotal _ 0.05;
const cartTotal = cartSubtotal + shippingCost + estimatedTax;

const handleInputChange = (e) => {
const { id, value } = e.target;
setFormData((prev) => ({ ...prev, [id]: value }));
};

const handleNextStep = (e) => {
e.preventDefault();
// Simple form validation for current step before moving next
if (
step === 1 &&
(!formData.fullName || !formData.address || !formData.city)
)
return;
if (
step === 2 &&
formData.paymentMethod === "card" &&
(!formData.cardNumber || !formData.expiryDate)
)
return;

    if (step < 3) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

};

const handlePlaceOrder = (e) => {
e.preventDefault();
createRipple(e);
// Simulate Order Submission
alert(
`Đơn hàng đã được đặt thành công! Tổng cộng: $${cartTotal.toFixed(2)}`
);
// In a real app, you would navigate to the success page and clear the cart.
// For this mock, we reload to reset state.
setTimeout(() => window.location.reload(), 100);
};

const StepIndicator = ({ current, target, label }) => (
<div
className={`flex items-center space-x-2 ${
        current >= target ? "text-blue-600" : "text-gray-400"
      }`} >
<div
className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white transition duration-300 ${
          current >= target ? "bg-blue-600" : "bg-gray-300"
        }`} >
{target}
</div>
<span className="hidden sm:inline font-semibold">{label}</span>
{target < 3 && (
<RightArrowIcon className="w-4 h-4 text-gray-400 ml-4 hidden sm:block" />
)}
</div>
);

const OrderSummary = () => (
<div className="lg:col-span-1 p-6 bg-white border border-gray-200 rounded-xl shadow-xl h-min sticky top-20">
<h2 className="text-2xl font-bold text-gray-800 mb-6">
Tóm tắt đơn hàng
</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Tổng phụ</span>
          <span className="font-semibold">${cartSubtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Vận chuyển</span>
          <span className="font-semibold">
            {shippingCost === 0 ? (
              <span className="text-green-600">Miễn phí</span>
            ) : (
              `$${shippingCost.toFixed(2)}`
            )}
          </span>
        </div>
        <div className="flex justify-between border-b border-gray-200 pb-3 text-base">
          <span className="text-gray-600">Thuế (5%)</span>
          <span className="font-semibold">${estimatedTax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pt-4">
          <span className="text-xl font-bold text-gray-900">TỔNG CỘNG</span>
          <span className="text-2xl font-bold text-blue-600">
            ${cartTotal.toFixed(2)}
          </span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-3 border-t border-gray-100 pt-4">
        Sản phẩm ({cartItems.length})
      </h3>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between text-sm text-gray-600"
          >
            <span className="truncate pr-1">
              {item.name} ({item.size})
            </span>
            <span className="font-medium text-gray-800">
              $
              {(
                parseFloat(item.price.replace("$", "")) * item.quantity
              ).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>

);

const ShippingForm = () => (
<form onSubmit={handleNextStep} className="space-y-6">
<h2 className="text-2xl font-bold text-gray-800 mb-4"> 1. Thông tin vận chuyển
</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<input
          type="text"
          id="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Họ Tên Đầy Đủ"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
        />
<input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
        />
<input
          type="text"
          id="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Số Điện Thoại"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
        />
<input
          type="text"
          id="city"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="Tỉnh/Thành phố"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
        />
</div>
<textarea
        id="address"
        value={formData.address}
        onChange={handleInputChange}
        placeholder="Địa chỉ chi tiết (Số nhà, đường...)"
        rows="2"
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
      />

      <button
        type="submit"
        className="bg-red-600 text-white px-8 py-3 font-semibold hover:bg-red-700 transition rounded-md ripple-button"
      >
        Tiếp tục đến Thanh toán{" "}
        <ArrowRightIcon className="w-4 h-4 ml-2 inline-block" />
      </button>
    </form>

);

const PaymentForm = () => (
<form onSubmit={handleNextStep} className="space-y-6">
<h2 className="text-2xl font-bold text-gray-800 mb-4"> 2. Phương thức Thanh toán
</h2>

      {/* Shipping Method */}
      <div className="border border-gray-200 p-4 rounded-md space-y-3">
        <h3 className="font-bold text-lg text-gray-700">
          Phương thức Vận chuyển
        </h3>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="radio"
            name="shipping"
            value="standard"
            id="shippingMethod"
            checked={formData.shippingMethod === "standard"}
            onChange={handleInputChange}
            className="form-radio text-blue-600"
          />
          <span>
            Vận chuyển tiêu chuẩn (3-5 ngày) -{" "}
            {shippingCost === 0 ? "Miễn phí" : `$${shippingCost.toFixed(2)}`}
          </span>
        </label>
      </div>

      {/* Payment Method */}
      <div className="border border-gray-200 p-4 rounded-md space-y-3">
        <h3 className="font-bold text-lg text-gray-700">Chọn Thanh toán</h3>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="card"
            id="paymentMethod"
            checked={formData.paymentMethod === "card"}
            onChange={handleInputChange}
            className="form-radio text-blue-600"
          />
          <span>Thanh toán bằng Thẻ Tín dụng/Ghi nợ</span>
        </label>
        {formData.paymentMethod === "card" && (
          <div className="p-3 bg-gray-50 border border-gray-200 rounded space-y-3">
            <input
              type="text"
              id="cardName"
              value={formData.cardName}
              onChange={handleInputChange}
              placeholder="Tên trên thẻ"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="text"
              id="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="Số thẻ (xxxx xxxx xxxx xxxx)"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                id="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
              />
              <input
                type="text"
                id="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="CVV"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>
        )}
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="cod"
            id="paymentMethod"
            checked={formData.paymentMethod === "cod"}
            onChange={handleInputChange}
            className="form-radio text-blue-600"
          />
          <span>Thanh toán khi nhận hàng (COD)</span>
        </label>
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="text-gray-600 hover:text-red-600 font-semibold flex items-center transition"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-1" /> Quay lại
        </button>
        <button
          type="submit"
          className="bg-red-600 text-white px-8 py-3 font-semibold hover:bg-red-700 transition rounded-md ripple-button"
        >
          Tiếp tục đến Xác nhận{" "}
          <ArrowRightIcon className="w-4 h-4 ml-2 inline-block" />
        </button>
      </div>
    </form>

);

const ReviewForm = () => (
<form onSubmit={handlePlaceOrder} className="space-y-6">
<h2 className="text-2xl font-bold text-gray-800 mb-4"> 3. Xác nhận Đơn hàng
</h2>

      {/* Shipping Review */}
      <div className="border border-gray-200 p-4 rounded-md space-y-2">
        <h3 className="font-bold text-lg text-gray-700">Giao hàng đến</h3>
        <p className="text-sm text-gray-600">**{formData.fullName}**</p>
        <p className="text-sm text-gray-600">
          {formData.phone}, {formData.email}
        </p>
        <p className="text-sm text-gray-600">
          {formData.address}, {formData.city}
        </p>
      </div>

      {/* Payment Review */}
      <div className="border border-gray-200 p-4 rounded-md space-y-2">
        <h3 className="font-bold text-lg text-gray-700">
          Thanh toán & Vận chuyển
        </h3>
        <p className="text-sm text-gray-600">
          Phương thức thanh toán: **
          {formData.paymentMethod === "card" ? "Thẻ Tín dụng" : "COD"}**
        </p>
        <p className="text-sm text-gray-600">
          Phương thức vận chuyển: **Tiêu chuẩn**
        </p>
        <p className="text-sm text-gray-600">
          Phí vận chuyển: **
          {shippingCost === 0 ? "Miễn phí" : `$${shippingCost.toFixed(2)}`}**
        </p>
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="text-gray-600 hover:text-red-600 font-semibold flex items-center transition"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-1" /> Quay lại
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 font-bold hover:bg-blue-700 transition rounded-md ripple-button"
        >
          ĐẶT HÀNG NGAY - ${cartTotal.toFixed(2)}
        </button>
      </div>
    </form>

);

return (
<section className="px-4 sm:px-6 max-w-7xl mx-auto pt-6 pb-12">
<div className="mb-8 text-sm text-gray-500">
<a
href="#"
className="hover:text-red-600"
onClick={(e) => {
e.preventDefault();
setCurrentView("home");
}} >
Trang Chủ
</a>
<span className="mx-2 text-gray-400">/</span>
<a
href="#"
className="hover:text-red-600"
onClick={(e) => {
e.preventDefault();
setCurrentView("cart");
}} >
Giỏ hàng
</a>
<span className="mx-2 text-gray-400">/</span>
<span className="text-gray-900 font-semibold">Thanh toán</span>
</div>

      <h1 className="text-4xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-3">
        Thanh toán
      </h1>

      {/* Step Indicators */}
      <div className="flex justify-center items-center mb-10 border-b border-gray-200 pb-6">
        <StepIndicator current={step} target={1} label="Vận chuyển" />
        <StepIndicator current={step} target={2} label="Thanh toán" />
        <StepIndicator current={step} target={3} label="Xác nhận" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Form Steps (2/3 width) */}
        <div className="lg:col-span-2">
          {step === 1 && <ShippingForm />}
          {step === 2 && <PaymentForm />}
          {step === 3 && <ReviewForm />}
        </div>

        {/* Right Column: Order Summary (1/3 width) */}
        <OrderSummary />
      </div>
    </section>

);
};

// ----------------------------------------------------
// APP MAIN COMPONENT
// ----------------------------------------------------

const App = () => {
const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);
const [isScrolled, setIsScrolled] = useState(false);
const [isCartOpen, setIsCartOpen] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(true); // Giả định đã đăng nhập để có giỏ hàng
const [userName, setUserName] = useState("John Doe");

// NEW STATE for routing
const [currentView, setCurrentView] = useState("home");

// State for Mega Menu category & Parallax & Chat
const [activeCategory, setActiveCategory] = useState(null);
const [parallaxOffset, setParallaxOffset] = useState(0);
const [isChatOpen, setIsChatOpen] = useState(false);

// URL Ảnh thống nhất (Placeholder)
const GLOBAL_PRODUCT_IMAGE =
"https://placehold.co/600x600/D4D4D4/333333/png?text=Mẫu+chính";

// Giỏ hàng mẫu (Đã thêm ID, Color, Size để hiển thị chi tiết)
const sampleCartItems = [
{
id: 1,
name: "Áo len cáp Merino Felted",
price: "$58.00",
image: GLOBAL_PRODUCT_IMAGE,
quantity: 1,
color: "Xám",
size: "M",
},
{
id: 2,
name: "Mũ len Chunky Cotton Hữu cơ",
price: "$20.00",
image: GLOBAL_PRODUCT_IMAGE,
quantity: 2,
color: "Đỏ Tía",
size: "Freesize",
},
{
id: 3,
name: "Bốt Chukka da lộn cổ điển (Cỡ 9)",
price: "$125.00",
image: GLOBAL_PRODUCT_IMAGE,
quantity: 1,
color: "Nâu",
size: "9",
},
];
const [cartItems, setCartItems] = useState(sampleCartItems); // Quản lý state giỏ hàng

const toggleCart = () => setIsCartOpen(!isCartOpen);
const toggleChat = () => setIsChatOpen(!isChatOpen);

const toggleLoginState = (state) => {
setIsLoggedIn(state);
// Update userName on login/logout simulation
setUserName(state ? "John Doe" : "Account");
setCartItems(state ? sampleCartItems : []);
};

// Functions to manage cart state (Passed to modal and page)
const updateQuantity = (id, newQty) => {
setCartItems((prevItems) =>
prevItems.map((item) =>
item.id === id ? { ...item, quantity: newQty } : item
)
);
};

const removeItem = (id) => {
setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
};

// Helper function for Ripple Effect
const createRipple = (event) => {
const button = event.currentTarget;
const circle = document.createElement("span");

    // Calculate size and position
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${
      event.clientX - (button.getBoundingClientRect().left + radius)
    }px`;
    circle.style.top = `${
      event.clientY - (button.getBoundingClientRect().top + radius)
    }px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);

};

// Dữ liệu cho các slide Banner chính
const heroSlides = [
{
title: "Áo Cardigan dệt kim Purl",
subtitle: "Đây là cơ hội để bạn nâng cấp tủ quần áo với nhiều lựa chọn.",
image: "https://placehold.co/1000x800/E5E7EB/333333/png?text=Cardigan",
},
{
title: "Hàng mới về: Denim Xuân",
subtitle:
"Khám phá bộ sưu tập quần jean và áo khoác cotton hữu cơ mới nhất của chúng tôi.",
image: "https://placehold.co/1000x800/D4D4D4/333333/png?text=Denim",
},
{
title: "Giảm tới 50% cho Áo khoác ngoài",
subtitle: "Ưu đãi có thời hạn cho áo trench, áo khoác và áo phao.",
image: "https://placehold.co/1000x800/F3F4F6/333333/png?text=Coat",
},
];

// Thêm state cho Carousel
const [currentSlide, setCurrentSlide] = useState(0);

// Logic cuộn header, scroll-to-top VÀ PARALLAX
useEffect(() => {
let ticking = false;
let lastScrollY = 0;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      lastScrollY = window.scrollY;

      // Scroll-to-top visibility
      if (lastScrollY > 300) {
        setIsScrollTopVisible(true);
      } else {
        setIsScrollTopVisible(false);
      }

      // Sticky Header visibility
      if (lastScrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // NEW: Parallax Logic
      const offset = lastScrollY * 0.2; // 20% scroll speed
      setParallaxOffset(Math.min(offset, 150)); // Cap the offset at 150px

      requestAnimationFrame(() => {
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

}, []);

// Logic tự động chuyển slide
useEffect(() => {
const slideInterval = setInterval(() => {
setCurrentSlide((prevSlide) => (prevSlide + 1) % heroSlides.length);
}, 5000);

    return () => clearInterval(slideInterval);

}, [heroSlides.length]);

// Hàm chuyển slide thủ công
const goToSlide = (index) => {
setCurrentSlide(index);
};

// Component Hero Section đã được chuyển thành Slider
const HeroSlider = ({
activeCategory,
setActiveCategory,
parallaxOffset,
createRipple,
}) => {
// NEW: Nhận parallaxOffset và createRipple
const slide = heroSlides[currentSlide];

    const menuItems = [
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

    const activeIndex = menuItems.findIndex(
      (item) => item.name === activeCategory
    );
    const itemHeight = 49;
    const subMenuTop = activeIndex >= 0 ? activeIndex * itemHeight : 0;

    return (
      <div className="flex relative min-h-[500px] lg:min-h-[600px] overflow-hidden">
        {/* Thanh menu Danh mục dọc - Ẩn trên Mobile */}
        <div
          className="hidden lg:block w-64 min-w-64 bg-gray-50 border-r border-gray-200 z-30"
          onMouseLeave={() => setActiveCategory(null)}
        >
          <ul className="text-sm font-semibold text-gray-900 divide-y divide-gray-200">
            {menuItems.map((item, index) => (
              <li
                key={item.name}
                className={`
                                    px-6 py-3 cursor-pointer transition flex justify-between items-center group
                                    ${
                                      item.name === activeCategory
                                        ? "bg-black text-white"
                                        : "hover:bg-black hover:text-white"
                                    }
                                `}
                onMouseEnter={() =>
                  setActiveCategory(item.hasSubMenu ? item.name : null)
                }
              >
                {item.name}
                {item.hasSubMenu && (
                  <ArrowRightIcon
                    className={`w-3 h-3 text-gray-500 transition ${
                      item.name === activeCategory
                        ? "text-white"
                        : "group-hover:text-white"
                    }`}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Mega Menu (SubMenu) */}
        {activeCategory && (
          <SubMenu category={activeCategory} topPosition={subMenuTop} />
        )}

        {/* Banner chính - Full width trên Mobile */}
        <div className="flex-1 p-8 md:p-12 bg-gray-100 flex items-center justify-center relative overflow-hidden transition-opacity duration-500 w-full">
          {/* Nội dung Banner (Text) - Dùng key để trigger Animation */}
          <div
            key={currentSlide} // Key change forces animation reset/re-run
            className="absolute left-1/2 lg:left-16 top-1/2 transform -translate-y-1/2 lg:translate-x-0 -translate-x-1/2 lg:w-auto w-full text-center lg:text-left z-10 p-4 lg:p-0 slide-content-transition"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter max-w-lg mb-4 leading-tight">
              {slide.title}
            </h2>
            <p className="text-gray-600 mb-8 max-w-sm mx-auto lg:mx-0">
              {slide.subtitle}
            </p>
            <button
              onClick={createRipple} // Apply ripple
              className="bg-white text-gray-900 border border-gray-300 px-8 py-3 text-sm font-semibold tracking-wider hover:bg-black hover:text-white transition duration-200 rounded-md shadow-md ripple-button"
            >
              MUA NGAY
            </button>
          </div>

          {/* Hình ảnh (Placeholder) - Apply Parallax Effect */}
          <div
            className="flex-1 h-full w-full absolute inset-0 lg:static bg-cover bg-center transition-transform duration-500"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center right",
              transform: `translateY(${parallaxOffset * 0.5}px)`, // Parallax factor 0.5
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-gray-100 via-gray-100/50 to-transparent opacity-80 lg:opacity-100"></div>
          </div>

          {/* Pagination Dots */}
          <div className="absolute bottom-6 right-1/2 translate-x-1/2 lg:right-16 lg:translate-x-0 z-20 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-black w-8" : "bg-gray-400"
                }`}
                aria-label="Chuyển đến slide ${index + 1}"
              />
            ))}
          </div>
        </div>
      </div>
    );

};

// Logic render view dựa trên currentView state
const renderContent = () => {
switch (currentView) {
case "blog":
return <BlogPage setCurrentView={setCurrentView} />;
case "contact":
return (
<ContactPage
            createRipple={createRipple}
            setCurrentView={setCurrentView}
          />
);
case "cart":
return (
<CartPage
            cartItems={cartItems}
            setCartItems={setCartItems}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            createRipple={createRipple}
            setCurrentView={setCurrentView}
          />
);
case "checkout":
return (
<CheckoutPage
            cartItems={cartItems}
            createRipple={createRipple}
            setCurrentView={setCurrentView}
          />
);
case "profile":
return (
<ProfilePage
            setCurrentView={setCurrentView}
            toggleLoginState={toggleLoginState}
            userName={userName}
          />
);
case "home":
case "shop": // Giả định Shop cũng dùng layout Home trừ Hero Slider
default:
return (
<>
<HeroSlider
activeCategory={activeCategory}
setActiveCategory={setActiveCategory}
parallaxOffset={parallaxOffset} // Truyền parallax offset
createRipple={createRipple} // Truyền ripple function
/>
<MainContent createRipple={createRipple} />{" "}
{/_ Truyền ripple function _/}
</>
);
}
};

return (
<div className="min-h-screen bg-white font-sans">
<style>{CSS_VARS}</style>

      {/* Header: Top Bar + Middle Bar + Bottom Bar */}
      <header
        className="sticky top-0 z-50 bg-white shadow-sm"
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitFontSmoothing: "antialiased",
          transform: "translateZ(0)",
        }}
      >
        <TopBar isScrolled={isScrolled} />
        <MiddleBar
          isScrolled={isScrolled}
          toggleCart={toggleCart}
          isLoggedIn={isLoggedIn}
          toggleLoginState={toggleLoginState}
          userName={userName}
          setCurrentView={setCurrentView}
        />
        <BottomBar
          isScrolled={isScrolled}
          currentView={currentView}
          setView={setCurrentView}
        />
      </header>

      {/* Nội dung chính */}
      <main className="max-w-7xl mx-auto mt-0">{renderContent()}</main>

      {/* Chân trang */}
      <Footer />

      {/* Các nút tiện ích cố định */}
      <FixedUtilities
        isScrollTopVisible={isScrollTopVisible}
        isChatOpen={isChatOpen}
        toggleChat={toggleChat}
      />

      {/* Component Modal Giỏ hàng */}
      <ShoppingCartModal
        isCartOpen={isCartOpen}
        toggleCart={toggleCart}
        setView={setCurrentView}
        cartItems={cartItems} // Sử dụng state cartItems
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />

      {/* Component Live Chat */}
      <LiveChatModal isChatOpen={isChatOpen} toggleChat={toggleChat} />
    </div>

);
};

export default App;


{/* PHẦN SẢN PHẨM LIÊN QUAN */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Sản phẩm liên quan</h2>
            
            {/* Nút điều hướng với logic mờ nhẹ khi disable */}
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
                <ChevronLeft size={20}/>
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
                <ChevronRight size={20}/>
              </button>
            </div>
          </div>
          
          <div 
            ref={relatedProductsRef}
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x scroll-smooth pb-4"
          >
            {ALL_PRODUCTS.map((product) => (
              <div key={product.id} className="min-w-[240px] sm:min-w-[300px] snap-start">
                <RelatedProductCard product={product} setCurrentProduct={setCurrentProduct} />
              </div>
            ))}
          </div>
        </div>