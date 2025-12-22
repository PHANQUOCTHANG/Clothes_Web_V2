"use client";

import { useState } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { Product, Color } from "../types";

interface AddToCartModalProps {
  product: Product | null;
  colors: Color[];
  onClose: () => void;
  onAddToCart?: (selectedSize: string, selectedColor: string) => void;
}

export const AddToCartModal = ({
  product,
  colors,
  onClose,
  onAddToCart,
}: AddToCartModalProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isClosing, setIsClosing] = useState(false);
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

  const availableColors = colors.filter((c) => product.colors.includes(c.hex));

  const handleAddToCart = () => {
    if (!selectedColor) {
      setMessage("Vui lòng chọn màu sắc!");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    if (!selectedSize) {
      setMessage("Vui lòng chọn kích cỡ!");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    // Thêm vào giỏ thành công
    setMessage("Sản phẩm đã được thêm vào giỏ hàng!");

    if (onAddToCart) {
      onAddToCart(selectedSize, selectedColor);
    }

    // Bắt đầu đóng modal
    setTimeout(() => {
      setIsClosing(true);

      // Sau khi modal đóng, bắt đầu flying product animation
      setTimeout(() => {
        // Tìm vị trí của giỏ hàng để tính animation
        const cartButton = document.querySelector('[aria-label="Giỏ hàng"]');

        if (cartButton) {
          // Sử dụng tọa độ từ phần tử để tạo hiệu ứng
          const cartRect = (cartButton as HTMLElement).getBoundingClientRect();

          // Thiết lập flying product animation từ giữa màn hình
          setFlyingProduct({
            show: true,
            startX: window.innerWidth / 2,
            startY: window.innerHeight / 2,
            endX: cartRect.left + cartRect.width / 2,
            endY: cartRect.top + cartRect.height / 2,
          });

          // Đóng modal sau flying product animation
          setTimeout(() => {
            setFlyingProduct((prev) => ({ ...prev, show: false }));
            onClose();
            setMessage("");
            setIsClosing(false);
          }, 800);
        } else {
          // Nếu không tìm được cart button, chỉ đóng modal
          onClose();
          setMessage("");
          setIsClosing(false);
        }
      }, 300);
    }, 500);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${
          isClosing ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div
          className={`bg-white rounded-lg max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto transition-all duration-300 ${
            isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
          >
            <X size={24} />
          </button>

          {/* Product Image */}
          <div className="mb-6 flex justify-center rounded-lg overflow-hidden bg-gray-100 h-48">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "https://placehold.co/320x400/f3f4f6/333?text=Anh+San+Pham";
              }}
            />
          </div>

          {/* Product Info */}
          <div className="mb-6 pr-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {product.name}
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Color Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Chọn Màu Sắc
            </label>
            <div className="flex flex-wrap gap-3">
              {availableColors.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => setSelectedColor(color.hex)}
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition ${
                    selectedColor === color.hex
                      ? "border-black scale-110"
                      : "border-gray-300 hover:border-gray-500"
                  }`}
                  title={color.name}
                  style={{ backgroundColor: color.hex }}
                >
                  {selectedColor === color.hex && (
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Chọn Kích Cỡ
            </label>
            <div className="grid grid-cols-4 gap-2">
              {product.availableSizes.map((size) => (
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
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-200"
          >
            Thêm vào giỏ
          </button>

          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="w-full py-2 mt-2 text-gray-600 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition duration-200"
          >
            Hủy
          </button>

          {/* Message Display */}
          {message && (
            <div
              className={`mt-4 flex items-center space-x-2 p-4 rounded-lg border ${
                message.includes("Sản phẩm đã được thêm")
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              {message.includes("Sản phẩm đã được thêm") ? (
                <CheckCircle size={20} className="text-green-600" />
              ) : (
                <AlertCircle size={20} className="text-red-600" />
              )}
              <span
                className={`text-sm font-medium ${
                  message.includes("Sản phẩm đã được thêm")
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                {message}
              </span>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
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

        .flying-product {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          animation: flyToCart 0.8s ease-in forwards;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      {flyingProduct.show && (
        <div
          className="flying-product"
          style={{
            left: `${flyingProduct.startX}px`,
            top: `${flyingProduct.startY}px`,
            width: "120px",
            height: "120px",
            backgroundImage: `url(${product.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
    </>
  );
};
