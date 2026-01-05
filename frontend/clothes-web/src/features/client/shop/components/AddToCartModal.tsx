"use client";

import { useState } from "react";
import Image from "next/image";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { Product } from "../types";
import { ProductDetailService } from "@/features/client/product-detail/services/productDetailService";

// Props cho modal thêm sản phẩm vào giỏ hàng
interface AddToCartModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart?: (selectedSize: string, selectedColor: string) => void;
}

export const AddToCartModal = ({
  product,
  onClose,
  onAddToCart,
}: AddToCartModalProps) => {
  // State quản lý kích cỡ và màu sắc được chọn
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  // State hiển thị thông báo thành công/lỗi
  const [message, setMessage] = useState("");
  // State kiểm soát animation đóng modal
  const [isClosing, setIsClosing] = useState(false);
  // State cho animation sản phẩm bay vào giỏ hàng
  const [flyingProduct, setFlyingProduct] = useState<{
    show: boolean;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  }>({
    show: false,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  });

  if (!product) return null;

  const mainImage = product.images?.[0] || "/placeholder.svg";
  // Tính toán giá cuối cùng sau giảm giá
  const finalPrice = ProductDetailService.calculateFinalPrice(
    product.price,
    product.discount
  );
  // Chuyển chuỗi size (cách nhau bởi dấu phẩy) thành mảng
  const sizeOptions = product.size
    ? product.size.split(",").map((s) => s.trim())
    : [];

  const handleAddToCart = () => {
    // Kiểm tra xem đã chọn màu sắc chưa
    if (!selectedColor) {
      setMessage("Please select a color!");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    // Kiểm tra xem đã chọn kích cỡ chưa
    if (!selectedSize) {
      setMessage("Please select a size!");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    // Hiển thị thông báo thành công
    setMessage("Product added to cart!");

    if (onAddToCart) {
      onAddToCart(selectedSize, selectedColor);
    }

    // Bắt đầu animation đóng modal
    setTimeout(() => {
      setIsClosing(true);

      // Sau khi modal đóng, bắt đầu animation sản phẩm bay vào giỏ hàng
      setTimeout(() => {
        // Tìm vị trí của nút giỏ hàng
        const cartButton = document.querySelector('[aria-label="Cart"]');

        if (cartButton) {
          // Lấy tọa độ của nút giỏ hàng
          const cartRect = (cartButton as HTMLElement).getBoundingClientRect();

          // Thiết lập animation sản phẩm bay từ giữa màn hình đến giỏ hàng
          setFlyingProduct({
            show: true,
            startX: window.innerWidth / 2,
            startY: window.innerHeight / 2,
            endX: cartRect.left + cartRect.width / 2,
            endY: cartRect.top + cartRect.height / 2,
          });

          // Đóng modal sau khi animation hoàn thành
          setTimeout(() => {
            setFlyingProduct((prev) => ({ ...prev, show: false }));
            onClose();
            setMessage("");
            setIsClosing(false);
          }, 800);
        } else {
          // Nếu không tìm thấy nút giỏ hàng, chỉ đóng modal
          onClose();
          setMessage("");
          setIsClosing(false);
        }
      }, 300);
    }, 500);
  };

  return (
    <>
      {/* Modal overlay - Nền mờ phía sau modal */}
      <div
        className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${
          isClosing ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Modal content - Nội dung modal */}
        <div
          className={`bg-white rounded-lg max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto transition-all duration-300 ${
            isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          {/* Nút đóng modal */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
          >
            <X size={24} />
          </button>

          {/* Hình ảnh sản phẩm */}
          <div className="mb-6 flex justify-center rounded-lg overflow-hidden bg-gray-100 h-48">
            <Image
              src={mainImage}
              alt={product.name}
              width={300}
              height={400}
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>

          {/* Thông tin sản phẩm */}
          <div className="mb-6 pr-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {product.name}
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              {finalPrice !== product.price && (
                <span className="line-through text-gray-400 mr-2">
                  {ProductDetailService.formatPrice(product.price)}
                </span>
              )}
              <span className="font-semibold text-gray-900">
                {ProductDetailService.formatPrice(finalPrice)}
              </span>
            </p>
          </div>

          {/* Chọn màu sắc */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Select Color
            </label>
            <div className="flex flex-wrap gap-3">
              {product.color && (
                <button
                  onClick={() => setSelectedColor(product.color.code)}
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition ${
                    selectedColor === product.color.code
                      ? "border-black scale-110"
                      : "border-gray-300 hover:border-gray-500"
                  }`}
                  title={product.color.name}
                  style={{ backgroundColor: product.color.code }}
                >
                  {selectedColor === product.color.code && (
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Chọn kích cỡ */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Select Size
            </label>
            <div className="grid grid-cols-4 gap-2">
              {sizeOptions.length > 0 ? (
                sizeOptions.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 text-sm font-medium rounded-lg border-2 transition ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 text-gray-800 hover:border-gray-500"
                    }`}
                  >
                    {size}
                  </button>
                ))
              ) : (
                <p className="text-sm text-gray-500 col-span-4">
                  No sizes available
                </p>
              )}
            </div>
          </div>

          {/* Nút thêm vào giỏ hàng */}
          <button
            onClick={handleAddToCart}
            disabled={!ProductDetailService.isInStock(product.stock)}
            className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>

          {/* Nút hủy */}
          <button
            onClick={onClose}
            className="w-full py-2 mt-2 text-gray-600 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition duration-200"
          >
            Cancel
          </button>

          {/* Hiển thị thông báo */}
          {message && (
            <div
              className={`mt-4 flex items-center space-x-2 p-4 rounded-lg border ${
                message.includes("added")
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              {message.includes("added") ? (
                <CheckCircle size={20} className="text-green-600" />
              ) : (
                <AlertCircle size={20} className="text-red-600" />
              )}
              <span
                className={`text-sm font-medium ${
                  message.includes("added") ? "text-green-700" : "text-red-700"
                }`}
              >
                {message}
              </span>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        // Animation sản phẩm bay từ modal vào giỏ hàng
        @keyframes flyToCart {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(
                calc(${flyingProduct.endX - flyingProduct.startX}px),
                calc(${flyingProduct.endY - flyingProduct.startY}px)
              )
              scale(0.1);
            opacity: 0;
          }
        }

        // Styling cho sản phẩm bay
        .flying-product {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          animation: flyToCart 0.8s ease-in forwards;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      {/* Element sản phẩm bay vào giỏ hàng */}
      {flyingProduct.show && (
        <div
          className="flying-product"
          style={{
            left: `${flyingProduct.startX}px`,
            top: `${flyingProduct.startY}px`,
            width: "120px",
            height: "120px",
            backgroundImage: `url(${mainImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
    </>
  );
};
