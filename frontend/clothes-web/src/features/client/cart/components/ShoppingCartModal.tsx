"use client";

import React, { useMemo } from "react";
import { CartItem } from "./CartItem";
import { ModalCartIcon, XIcon } from "@/components/common/Icons";
import { ShoppingCartModalProps } from "@/features/cart/types";
import { useRouter } from "next/navigation";

const FREE_SHIPPING_THRESHOLD = 200.0;

const ShoppingCartModal: React.FC<ShoppingCartModalProps> = ({
  isCartOpen,
  toggleCart,
  cartItems,
  setCurrentView,
  updateQuantity,
  removeItem,
}) => {
  // 1. Memoize tất cả các giá trị tính toán
  const { subtotal, remaining, progress, isFreeShipping } = useMemo(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + (parseFloat(item.price.replace("$", "")) || 0) * item.quantity,
      0
    );
    return {
      subtotal: total.toFixed(2),
      remaining: Math.max(0, FREE_SHIPPING_THRESHOLD - total).toFixed(2),
      progress: Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100),
      isFreeShipping: total >= FREE_SHIPPING_THRESHOLD,
    };
  }, [cartItems]);

  const isEmpty = cartItems.length === 0;

  const router = useRouter();
  // 2. Handler điều hướng tập trung
  const handleNavigate = (view: string) => {
    toggleCart();
    router.push(`/${view}`);
    setCurrentView(view);
  };

  return (
    <div 
      className={`fixed inset-0 z-110 transition-all duration-300 ${
        isCartOpen ? "visible" : "invisible"
      }`}
      aria-hidden={!isCartOpen}
    >
      {/* Background Overlay */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={toggleCart}
      />

      {/* Cart Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <header className="flex justify-between items-center p-6 border-b border-gray-100 bg-white">
          <h3 className="text-xl font-bold uppercase tracking-tight text-gray-900">Giỏ hàng</h3>
          <button 
            onClick={toggleCart} 
            className="p-2 -mr-2 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Đóng giỏ hàng"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full py-10">
              <ModalCartIcon className="text-gray-200 w-24 h-24 mb-6" />
              <h4 className="text-lg font-medium text-gray-900">Giỏ hàng đang trống</h4>
              <p className="text-sm text-gray-500 mb-8 mt-2">Cùng khám phá hàng ngàn sản phẩm nhé!</p>
              <button
                onClick={() => handleNavigate("shop")}
                className="w-full bg-black text-white py-4 text-sm font-bold hover:bg-gray-800 transition rounded-sm"
              >
                MUA SẮM NGAY
              </button>
            </div>
          ) : (
            <>
              {/* Shipping Progress Card */}
              <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="text-[10px] font-black mb-3 flex justify-between items-center uppercase tracking-widest">
                  {isFreeShipping ? (
                    <span className="text-green-600">🎉 Tuyệt vời! Bạn đã được Freeship</span>
                  ) : (
                    <span className="text-blue-600">Mua thêm ${remaining} để FREE SHIP</span>
                  )}
                  <span className="text-gray-400">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 ease-out ${
                      isFreeShipping ? "bg-green-500" : "bg-blue-600"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                    isFullPage={false}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {!isEmpty && (
          <footer className="p-6 border-t border-gray-100 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-baseline mb-6">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Tổng phụ</span>
              <span className="text-2xl font-black text-gray-900">${subtotal}</span>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => handleNavigate("cart")}
                className="w-full bg-white text-gray-900 border border-gray-900 px-4 py-3.5 text-xs font-black hover:bg-gray-900 hover:text-white transition-all rounded-sm uppercase"
              >
                Xem Giỏ Hàng
              </button>
              <button
                onClick={() => handleNavigate("checkout")}
                className="w-full bg-blue-600 text-white px-4 py-4 text-xs font-black hover:bg-blue-700 transition-all rounded-sm shadow-xl shadow-blue-100 uppercase"
              >
                Thanh Toán Ngay
              </button>
            </div>
          </footer>
        )}
      </aside>
    </div>
  );
};

export default ShoppingCartModal;