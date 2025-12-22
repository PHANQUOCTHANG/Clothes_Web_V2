"use client";

import React from "react";
import TopBar from "./TopBar";
import MiddleBar from "./MiddleBar";
import BottomBar from "./BottomBar";

interface HeaderProps {
  isScrolled: boolean;
  currentView: string;
  setCurrentView: (view: string) => void;
  toggleCart: () => void;
  isLoggedIn: boolean;
  toggleLoginState: (state: boolean) => void;
  userName: string;
  isCartOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  isScrolled,
  currentView,
  setCurrentView,
  toggleCart,
  isLoggedIn,
  toggleLoginState,
  userName,
  isCartOpen = false,
}) => {
  return (
    <header
      className="sticky top-0 z-50 bg-white shadow-sm"
      style={{
        willChange: "transform",
        backfaceVisibility: "hidden",
        WebkitFontSmoothing: "antialiased",
        transform: "translateZ(0)",
      }}
    >
      {/* Thanh trên cùng: Thông báo khuyến mãi, lựa chọn tiền tệ và liên kết mạng xã hội */}
      <TopBar isScrolled={isScrolled} />

      {/* Thanh giữa: Logo, thanh tìm kiếm, menu tài khoản và giỏ hàng */}
      <MiddleBar
        isScrolled={isScrolled}
        toggleCart={toggleCart}
        isLoggedIn={isLoggedIn}
        toggleLoginState={toggleLoginState}
        userName={userName}
        setCurrentView={setCurrentView}
        isCartOpen={isCartOpen}
        currentView={currentView}
      />

      {/* Thanh dưới cùng: Menu điều hướng chính */}
      <BottomBar
        isScrolled={isScrolled}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
    </header>
  );
};

export default Header;
