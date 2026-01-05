"use client";

import { CartItem } from "@/features/client/cart/components/CartItem";
import EmptyCartState from "@/features/client/cart/components/EmptyCartState";
import FreeShippingBar from "@/features/client/cart/components/FreeShippingBar";
import OrderSummary from "@/features/client/cart/components/OrderSummary";
import { CartPageProps } from "@/features/client/cart/types";
import React, { useEffect } from "react";
import { SAMPLE_CART_ITEMS } from "@/data/sampleCartData";
import createRipple from "@/utils/createRipple";
import {
  useCart,
  useCartCalculations,
  useCartPersistence,
  useCartUI,
} from "@/features/client/cart/hooks";
import {
  PricingService,
  PromocodeService,
  CartStorageService,
} from "@/features/client/cart/services";

// Ngưỡng giá trị để được miễn phí vận chuyển
const FREE_SHIPPING_THRESHOLD = 200.0;
// Tỷ lệ thuế suất
const TAX_RATE = 0.05;

// Component wrapper: Quản lý trạng thái giỏ hàng và logic xử lý
function CartPageWrapper() {
  // Hooks: quản lý giỏ hàng
  const {
    cartItems,
    isEmpty,
    totalItems,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart(SAMPLE_CART_ITEMS);

  // Hook: tính toán giá
  const pricing = useCartCalculations(cartItems, {
    taxRate: TAX_RATE,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    shippingCost: 15,
  });

  // Hook: lưu trữ giỏ hàng
  const { saveCart, loadCart, clearCartStorage, hasPersistedCart } =
    useCartPersistence(cartItems, {
      storageKey: "cart_items",
      enableAutoSave: true,
      enableAutoRestore: true,
    });

  // Hook: UI state
  const { isCartOpen, error, setError, clearError } = useCartUI();

  // Xử lý hiệu ứng ripple click
  const handleRipple = (e: React.MouseEvent<HTMLElement>) => {
    createRipple(e);
  };

  // Thay đổi trang hiện tại
  const handleSetView = (view: string) => {
    console.log("Navigate to:", view);
  };

  // Load cart từ localStorage khi component mount
  useEffect(() => {
    if (hasPersistedCart) {
      const saved = loadCart();
      if (saved && saved.length > 0) {
        saved.forEach((item) => addItem(item));
      }
    }
  }, [hasPersistedCart, loadCart, addItem]);

  return (
    <CartPage
      cartItems={cartItems}
      isEmpty={isEmpty}
      totalItems={totalItems}
      pricing={pricing}
      updateQuantity={updateQuantity}
      removeItem={removeItem}
      clearCart={clearCart}
      createRipple={handleRipple}
      setCurrentView={handleSetView}
    />
  );
}

interface CartPageInternalProps extends Omit<CartPageProps, "setCartItems"> {
  isEmpty: boolean;
  totalItems: number;
  pricing: ReturnType<typeof useCartCalculations>;
  clearCart: () => void;
}

const CartPage: React.FC<CartPageInternalProps> = ({
  cartItems,
  isEmpty,
  totalItems,
  pricing,
  updateQuantity,
  removeItem,
  clearCart,
  createRipple,
  setCurrentView,
}) => {
  const {
    subtotal,
    isFreeShipping,
    remainingForFreeShip,
    shipping,
    tax,
    total,
  } = pricing;

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8 pb-16">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-gray-600 flex items-center gap-2">
        <button
          onClick={() => setCurrentView("home")}
          className="hover:text-gray-900 transition-colors"
        >
          Trang chủ
        </button>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium">Giỏ hàng</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">Giỏ hàng</h1>

      {isEmpty ? (
        // Trạng thái giỏ trống
        <EmptyCartState onNavigate={() => setCurrentView("shop")} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cột trái: Danh sách sản phẩm */}
          <div className="lg:col-span-2">
            {/* Header danh sách */}
            <div className="hidden md:grid grid-cols-5 gap-4 px-2 py-3 border-b border-gray-200 mb-4 text-xs font-semibold text-gray-700">
              <span className="col-span-2">Sản phẩm</span>
              <span className="col-span-1 text-center">Số lượng</span>
              <span className="col-span-1 text-right">Giá</span>
              <span className="col-span-1 text-right">Hành động</span>
            </div>

            {/* Danh sách items */}
            <div>
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

            {/* Free shipping bar */}
            <FreeShippingBar
              isFreeShipping={isFreeShipping}
              remaining={remainingForFreeShip}
              progress={(subtotal / FREE_SHIPPING_THRESHOLD) * 100}
            />
          </div>

          {/* Cột phải: Order summary */}
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
