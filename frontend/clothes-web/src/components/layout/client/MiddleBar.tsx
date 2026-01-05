"use client";

import React, { useState } from "react";
import AuthDropdownMenu from "@/components/common/AuthDropdownMenu";
import { SearchIcon, ShoppingCartIcon } from "@/components/common/Icons";
import { ChevronDownIcon, Heart } from "lucide-react";

interface MiddleBarProps {
  isScrolled: boolean;
  toggleCart: () => void;
  isLoggedIn: boolean;
  toggleLoginState: (state: boolean) => void;
  userName: string;
  setCurrentView: (view: string) => void;
  isCartOpen?: boolean;
  currentView?: string;
}

const MiddleBar: React.FC<MiddleBarProps> = ({
  isScrolled,
  toggleCart,
  isLoggedIn,
  toggleLoginState,
  userName,
  setCurrentView,
  isCartOpen = false,
  currentView = "",
}) => {
  const [cartStatusMessage, setCartStatusMessage] = useState<string | null>(
    null
  );

  // Kiểm tra xác thực trước khi mở giỏ hàng
  const handleCartClick = () => {
    if (!isLoggedIn) {
      setCartStatusMessage("Vui lòng đăng nhập để xem giỏ hàng");
      setTimeout(() => setCartStatusMessage(null), 3000);
      return;
    }
    toggleCart();
  };

  // Kiểm tra nếu đang ở trang giỏ hàng hoặc giỏ hàng đang mở
  const isCartActive = isCartOpen || currentView === "cart";

  return (
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between transition-all duration-300 ease-out ${
        isScrolled ? "py-3" : "py-6"
      }`}
    >
      <div
        className="shrink-0 cursor-pointer group"
        onClick={() => setCurrentView("home")}
      >
        {/* Logo thương hiệu */}
        <h1 className="text-3xl font-black tracking-tighter transition group-hover:text-red-600">
          MEGASTORE
        </h1>
      </div>

      {/* Thanh tìm kiếm sản phẩm (ẩn trên mobile) */}
      <div className="flex-1 max-w-2xl mx-6 hidden lg:flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:border-black transition-colors">
        <div className="relative shrink-0 border-r border-gray-200 bg-gray-50/50">
          <select className="appearance-none bg-transparent pl-4 pr-10 py-3 text-sm font-bold text-gray-700 focus:outline-none cursor-pointer">
            <option>Tất cả danh mục</option>
            <option>Thời trang Nam</option>
            <option>Thời trang Nữ</option>
            <option>Giày & Phụ kiện</option>
          </select>
          <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="flex-1 px-4 py-3 text-sm focus:outline-none placeholder-gray-400"
        />

        <button className="bg-black text-white px-6 py-3 hover:bg-red-600 transition-colors flex items-center justify-center">
          <SearchIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Menu tài khoản người dùng và giỏ hàng */}
      <div className="flex items-center gap-2 sm:gap-2">
        {/* Menu dropdown: Đăng nhập, đăng ký, thông tin tài khoản */}
        <AuthDropdownMenu
          isLoggedIn={isLoggedIn}
          onLogout={() => toggleLoginState(false)}
          toggleLoginState={toggleLoginState}
          userName={userName}
          setCurrentView={setCurrentView}
        />

        {/* Nút yêu thích sản phẩm */}
        <button
          onClick={() => setCurrentView("wishlist")}
          className="p-1 hover:text-red-600 transition-colors"
          aria-label="Danh sách yêu thích"
        >
          <Heart className="w-6 h-6" />
        </button>

        {/* Nút giỏ hàng với badge số lượng */}
        <div className="relative pt-1 ">
          <button
            onClick={handleCartClick}
            className={`p-1 transition-colors relative group ${
              isCartActive ? "text-red-600" : "hover:text-red-600"
            }`}
            aria-label="Giỏ hàng"
          >
            <ShoppingCartIcon className="w-6 h-6" />
            {isLoggedIn && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white ring-1 ring-red-600/10">
                3
              </span>
            )}
          </button>

          {cartStatusMessage && (
            <div className="absolute top-full right-0 mt-4 z-60 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="bg-black text-white text-[11px] font-bold py-2 px-4 rounded-md shadow-2xl relative whitespace-nowrap uppercase tracking-wider">
                {cartStatusMessage}
                <div className="absolute -top-1 right-3 w-2 h-2 bg-black rotate-45" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MiddleBar;
