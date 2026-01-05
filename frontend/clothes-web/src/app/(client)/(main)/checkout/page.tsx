"use client";

import React, { useState, useMemo, ChangeEvent, FormEvent } from "react";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  MapPin,
  CreditCard,
} from "lucide-react";
import {
  CheckoutProps,
  ICheckoutFormData,
} from "@/features/client/checkout/types";
import { OrderSummary } from "@/features/client/checkout/components/OrderSummary";
import StepIndicator from "@/features/client/checkout/components/StepIndicator";
import createRipple from "@/utils/createRipple";

const CheckoutPage: React.FC<CheckoutProps> = ({
  cartItems,
  setCurrentView,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ICheckoutFormData>({
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

  // --- Logic tính toán ---
  const totals = useMemo(() => {
    const subtotal =
      cartItems?.reduce(
        (sum, item) =>
          sum + parseFloat(item.price.replace("$", "")) * item.quantity,
        0
      ) || 0;
    const shipping = subtotal >= 200 ? 0 : 15.0;
    const tax = subtotal * 0.05;
    return { subtotal, shipping, tax, total: subtotal + shipping + tax };
  }, [cartItems]);

  // --- Handlers ---
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleNextStep = (e: FormEvent) => {
    e.preventDefault();
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

    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    alert(`Đơn hàng thành công! Tổng cộng: $${totals.total.toFixed(2)}`);
    setTimeout(() => window.location.reload(), 500);
  };

  // --- Reusable UI Styles ---
  const inputStyle =
    "w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 outline-none";
  const btnPrimary =
    "bg-red-600 text-white px-8 py-3 text-sm font-semibold hover:bg-red-700 transition rounded-md flex items-center justify-center gap-2";

  return (
    <section className="px-4 sm:px-6 max-w-7xl mx-auto pt-6 pb-12">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-gray-500">
        <button
          onClick={() => setCurrentView("home")}
          className="hover:text-red-600"
        >
          Trang Chủ
        </button>
        <span className="mx-2 text-gray-400">/</span>
        <button
          onClick={() => setCurrentView("cart")}
          className="hover:text-red-600"
        >
          Giỏ hàng
        </button>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900 font-semibold">Thanh toán</span>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-3">
        Thanh toán
      </h1>

      {/* Step Progress */}
      <div className="flex justify-center items-center mb-10 border-b border-gray-200 pb-6">
        <StepIndicator currentStep={step} targetStep={1} label="Vận chuyển" />
        <StepIndicator currentStep={step} targetStep={2} label="Thanh toán" />
        <StepIndicator currentStep={step} targetStep={3} label="Xác nhận" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Form Steps */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <form
              onSubmit={handleNextStep}
              className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                1. Thông tin vận chuyển
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Họ Tên Đầy Đủ"
                  required
                  className={inputStyle}
                />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  className={inputStyle}
                />
                <input
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Số Điện Thoại"
                  required
                  className={inputStyle}
                />
                <input
                  id="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Tỉnh / Thành phố"
                  required
                  className={inputStyle}
                />
              </div>
              <textarea
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Địa chỉ chi tiết (Số nhà, đường...)"
                rows={2}
                required
                className={inputStyle}
              />
              <button type="submit" className={btnPrimary}>
                Tiếp tục thanh toán <ArrowRight size={18} />
              </button>
            </form>
          )}

          {step === 2 && (
            <form
              onSubmit={handleNextStep}
              className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                2. Phương thức Thanh toán
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
                    checked={formData.shippingMethod === "standard"}
                    onChange={handleInputChange}
                    className="form-radio text-blue-600"
                  />
                  <span>
                    Vận chuyển tiêu chuẩn (3-5 ngày) —{" "}
                    {totals.shipping === 0
                      ? "Miễn phí"
                      : `$${totals.shipping.toFixed(2)}`}
                  </span>
                </label>
              </div>

              {/* Payment Method */}
              <div className="border border-gray-200 p-4 rounded-md space-y-3">
                <h3 className="font-bold text-lg text-gray-700">
                  Chọn Thanh toán
                </h3>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
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
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleInputChange}
                    className="form-radio text-blue-600"
                  />
                  <span>Thanh toán khi nhận hàng (COD)</span>
                </label>
              </div>
              <div className="flex justify-between items-center pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-gray-600 hover:text-red-600 transition"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  className="bg-red-600 text-white px-8 py-3 text-sm font-semibold hover:bg-red-700 transition rounded-md"
                >
                  Tiếp tục
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                3. Xác nhận đơn hàng
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="text-base font-semibold text-gray-800 mb-3">
                    Giao hàng đến
                  </h4>
                  <p className="font-semibold text-gray-900">
                    {formData.fullName}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {formData.address}, {formData.city}
                  </p>
                  <p className="text-sm text-gray-600">{formData.phone}</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="text-base font-semibold text-gray-800 mb-3">
                    Phương thức thanh toán
                  </h4>
                  <p className="text-sm text-gray-600">
                    {formData.paymentMethod === "card"
                      ? "Thẻ tín dụng"
                      : "Thanh toán COD"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Vận chuyển: Tiêu chuẩn (
                    {totals.shipping === 0
                      ? "Miễn phí"
                      : `$${totals.shipping.toFixed(2)}`}
                    )
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-8">
                <button
                  onClick={() => setStep(2)}
                  className="text-gray-600 hover:text-red-600 transition"
                >
                  Quay lại
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="bg-blue-600 text-white px-10 py-3 text-sm font-semibold hover:bg-blue-700 transition rounded-md"
                >
                  Đặt hàng — ${totals.total.toFixed(2)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary */}
        <OrderSummary
          cartItems={cartItems}
          subtotal={totals.subtotal}
          shipping={totals.shipping}
          tax={totals.tax}
          total={totals.total}
        />
      </div>
    </section>
  );
};

export default CheckoutPage;
