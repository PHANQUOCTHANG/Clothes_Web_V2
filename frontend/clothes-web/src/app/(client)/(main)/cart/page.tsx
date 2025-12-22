"use client";

import { CartItem } from "@/features/cart/components/CartItem";
import EmptyCartState from "@/features/cart/components/EmptyCartState";
import FreeShippingBar from "@/features/cart/components/FreeShippingBar";
import OrderSummary from "@/features/cart/components/OrderSummary";
import { CartPageProps, ICartItem } from "@/features/cart/types";
import React, { useMemo, useState } from "react";
import { SAMPLE_CART_ITEMS } from "@/data/sampleCartData";
import createRipple from "@/utils/createRipple";

// Ngưỡng giá trị để được miễn phí vận chuyển
const FREE_SHIPPING_THRESHOLD = 200.0;
// Tỷ lệ thuế suất
const TAX_RATE = 0.05;

// Component wrapper: Quản lý trạng thái giỏ hàng và logic xử lý
function CartPageWrapper() {
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

  // Xử lý hiệu ứng ripple click
  const handleRipple = (e: React.MouseEvent<HTMLElement>) => {
    createRipple(e);
  };

  // Thay đổi trang hiện tại
  const handleSetView = (view: string) => {
    console.log("Navigate to:", view);
  };

  return (
    <CartPage
      cartItems={cartItems}
      setCartItems={setCartItems}
      updateQuantity={updateQuantity}
      removeItem={removeItem}
      createRipple={handleRipple}
      setCurrentView={handleSetView}
    />
  );
}

const CartPage: React.FC<CartPageProps> = ({
  cartItems,
  updateQuantity,
  removeItem,
  createRipple,
  setCurrentView,
}) => {
  // Tính toán: tổng tiền, vận chuyển, thuế và tổng cộng
  const { subtotal, isFreeShipping, remaining, shipping, tax, total } =
    useMemo(() => {
      const sum = cartItems?.reduce(
        (acc, item) =>
          acc + parseFloat(item.price.replace("$", "")) * item.quantity,
        0
      );
      const free = sum >= FREE_SHIPPING_THRESHOLD;
      const shippingCost = free ? 0 : 15.0;
      const estimatedTax = sum * TAX_RATE;

      return {
        subtotal: sum,
        isFreeShipping: free,
        remaining: Math.max(0, FREE_SHIPPING_THRESHOLD - sum),
        shipping: shippingCost,
        tax: estimatedTax,
        total: sum + shippingCost + estimatedTax,
      };
    }, [cartItems]);

  const isEmpty = cartItems?.length === 0;

  return (
    <section className="px-4 sm:px-6 max-w-7xl mx-auto pt-6 pb-12">
      {/* Đường dẫn điều hướng (Breadcrumb) */}
      <div className="mb-8 text-sm text-gray-500">
        <button
          onClick={() => setCurrentView("home")}
          className="hover:text-red-600"
        >
          Trang Chủ
        </button>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900 font-semibold">Giỏ hàng</span>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-3">
        Giỏ hàng của bạn
      </h1>

      {isEmpty ? (
        // Hiển thị trạng thái giỏ hàng trống
        <EmptyCartState onNavigate={() => setCurrentView("shop")} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cột trái: Danh sách sản phẩm trong giỏ */}
          <div className="lg:col-span-2">
            <div className="hidden md:grid grid-cols-5 gap-4 px-4 py-3 bg-gray-100 font-bold text-sm text-gray-800 rounded-lg mb-4">
              <span className="col-span-2">Sản phẩm</span>
              <span className="col-span-1 text-center">Số lượng</span>
              <span className="col-span-1 text-right">Subtotal</span>
              <span className="col-span-1 text-right">Hành động</span>
            </div>

            {/* Danh sách các mục trong giỏ */}
            <div className="divide-y divide-gray-100">
              {cartItems?.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                  isFullPage
                />
              ))}
            </div>

            {/* Thanh thông báo miễn phí vận chuyển */}
            <FreeShippingBar
              isFreeShipping={isFreeShipping}
              remaining={remaining}
              progress={(subtotal / FREE_SHIPPING_THRESHOLD) * 100}
            />
          </div>

          {/* Cột phải: Tóm tắt đơn hàng (giá, thuế, tổng cộng) */}
          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
            onCheckout={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
              createRipple(e);
              setCurrentView("checkout");
            }}
            onContinue={() => setCurrentView("shop")}
          />
        </div>
      )}
    </section>
  );
};

export default CartPageWrapper;
