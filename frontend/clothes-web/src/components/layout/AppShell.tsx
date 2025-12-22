"use client";

import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import LiveChatModal from "../common/LiveChatModal";
import FixedUtilities from "../common/FixedUtilities";
import ShoppingCartModal from "@/features/cart/components/ShoppingCartModal";
import { usePathname } from "next/navigation";
import { CSS_VARS } from "@/styles/animations";
import { SAMPLE_CART_ITEMS } from "@/data/sampleCartData";
import { ICartItem } from "@/features/cart/types";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentRoute = pathname.replace("/", "") || "home";

  const [currentView, setCurrentView] = useState(currentRoute);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName] = useState("John Doe");
  const [cartItems, setCartItems] = useState<ICartItem[]>(SAMPLE_CART_ITEMS);

  // Cập nhật số lượng sản phẩm trong giỏ
  const updateQuantity = (id: string | number, qty: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
      )
    );
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeItem = (id: string | number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Theo dõi sự kiện scroll để cập nhật trạng thái header
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 80);
      setIsScrollTopVisible(y > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      <style>{CSS_VARS}</style>

      {/* Thanh đầu trang: Logo, thanh tìm kiếm, giỏ hàng và tài khoản người dùng */}
      <Header
        isScrolled={isScrolled}
        currentView={currentView}
        setCurrentView={setCurrentView}
        toggleCart={() => setIsCartOpen(true)}
        isLoggedIn={isLoggedIn}
        toggleLoginState={setIsLoggedIn}
        userName={userName}
      />

      {/* Nội dung trang chính */}
      <main className="min-h-screen">{children}</main>

      {/* Chân trang */}
      <Footer />

      {/* Các nút tiện ích cố định: nút chat và nút lên đầu trang */}
      <FixedUtilities
        isScrollTopVisible={isScrollTopVisible}
        isChatOpen={isChatOpen}
        toggleChat={() => setIsChatOpen(!isChatOpen)}
      />

      {/* Modal hiển thị giỏ hàng */}
      <ShoppingCartModal
        isCartOpen={isCartOpen}
        toggleCart={() => setIsCartOpen(false)}
        cartItems={cartItems}
        setCurrentView={setCurrentView}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />

      {/* Modal chat trực tiếp với khách hàng */}
      <LiveChatModal
        isChatOpen={isChatOpen}
        toggleChat={() => setIsChatOpen(false)}
      />
    </div>
  );
}
