/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  Truck,
  RefreshCcw,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Product, Color } from "../../features/shop/types";

interface QuickViewModalProps {
  product: Product | null;
  colors: Color[];
  onClose: () => void;
}

export const QuickViewModal = ({
  product,
  colors,
  onClose,
}: QuickViewModalProps) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
   const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [message, setMessage] = useState("");
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

  const availableColors = colors.filter((c) => product.colors.includes(c.hex));
  const isCarousel = product.modalImages && product.modalImages.length > 1;

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.modalImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + product.modalImages.length) % product.modalImages.length
    );
  };

  const handleAddToCartWithAnimation = () => {
    // Kiểm tra xem đã chọn màu sắc chưa
    if (!selectedColor) {
      setMessage("Vui lòng chọn màu sắc!");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    // Kiểm tra xem đã chọn kích cỡ chưa
    if (!selectedSize) {
      setMessage("Vui lòng chọn kích cỡ!");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    // Hiển thị thông báo
    setMessage("Sản phẩm đã được thêm vào giỏ hàng!");

    // Tìm vị trí của giỏ hàng để tính animation
    const cartButton = document.querySelector('[aria-label="Giỏ hàng"]');

    // Tìm main image element từ modal
    const mainImage = document.querySelector(
      '.w-full.lg\\:w-1\\/2.bg-gray-100 img, [alt*="' + product.name + '"]'
    ) as HTMLImageElement;

    if (cartButton && mainImage) {
      const cartRect = (cartButton as HTMLElement).getBoundingClientRect();
      const imageRect = mainImage.getBoundingClientRect();

      // Thiết lập flying product animation
      setFlyingProduct({
        show: true,
        startX: imageRect.left + imageRect.width / 2,
        startY: imageRect.top + imageRect.height / 2,
        endX: cartRect.left + cartRect.width / 2,
        endY: cartRect.top + cartRect.height / 2,
      });

      // Đóng modal và reset message sau animation
      setTimeout(() => {
        setFlyingProduct((prev) => ({ ...prev, show: false }));
        onClose();
        setMessage("");
      }, 800);
    } else {
      // Nếu không tìm được cart button hoặc ảnh, đóng sau thông báo
      setTimeout(() => {
        onClose();
        setMessage("");
      }, 1500);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-1000 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-black p-2 rounded-full bg-white z-10 shadow-md"
          aria-label="Đóng"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 bg-gray-100 flex items-center justify-center p-8 rounded-t-lg lg:rounded-l-lg lg:rounded-t-none relative group/image">
            <img
              src={
                isCarousel
                  ? product.modalImages[currentImageIndex]
                  : product.imageUrl
              }
              alt={product.name}
              className="object-contain max-h-[70vh] w-full rounded-lg transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src =
                  "https://placehold.co/500x750/f3f4f6/333?text=Anh+San+Pham";
              }}
            />

            {isCarousel && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 text-black p-3 rounded-full shadow-md hover:bg-white transition opacity-0 group-hover/image:opacity-100"
                  aria-label="Ảnh trước"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 text-black p-3 rounded-full shadow-md hover:bg-white transition opacity-0 group-hover/image:opacity-100"
                  aria-label="Ảnh tiếp theo"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          <div className="w-full lg:w-1/2 p-10 space-y-6">
            <h1 className="text-3xl font-light text-gray-900">
              {product.name}
            </h1>

            <div className="flex items-center justify-between pb-4">
              <p className="text-2xl font-medium text-gray-700">
                ${product.price.toFixed(2)}
              </p>
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed border-b pb-6">
              {product.description}
            </p>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-800">Màu sắc:</p>
              <div className="flex space-x-2">
                {availableColors.map((color) => {
                  const isCurrentlySelected = selectedColor === color.hex;
                  const colorInfo = colors.find((c) => c.hex === color.hex);
                  return (
                    <div
                      key={color.hex}
                      onClick={() =>
                        setSelectedColor(
                          color.hex === selectedColor ? null : color.hex
                        )
                      }
                      className={`w-6 h-6 rounded-full border-2 transition cursor-pointer flex items-center justify-center relative group ${
                        isCurrentlySelected
                          ? "border-black"
                          : "border-gray-300 hover:border-gray-500"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={`Chọn màu ${colorInfo?.name}`}
                    >
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                        {colorInfo?.name}
                        <svg
                          className="absolute text-gray-800 h-2 w-full left-0 top-full"
                          x="0px"
                          y="0px"
                          viewBox="0 0 255 255"
                        >
                          <polygon
                            className="fill-current"
                            points="0,0 127.5,127.5 255,0"
                          />
                        </svg>
                      </span>
                      {isCurrentlySelected && (
                        <div className="w-4 h-4 rounded-full border border-white"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-800">Kích cỡ:</p>
              <div className="flex flex-wrap gap-2">
                {product.availableSizes?.map((size) => {
                  const isCurrentlySelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() =>
                        setSelectedSize(size === selectedSize ? null : size)
                      }
                      className={`px-4 py-2 text-sm rounded-lg border transition duration-150 relative group ${
                        isCurrentlySelected
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-600 border-gray-300 hover:border-gray-500"
                      }`}
                      aria-label={`Chọn kích cỡ ${size}`}
                    >
                      {size}
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                        {size}
                        <svg
                          className="absolute text-black h-2 w-full left-0 top-full"
                          x="0px"
                          y="0px"
                          viewBox="0 0 255 255"
                        >
                          <polygon
                            className="fill-current"
                            points="0,0 127.5,127.5 255,0"
                          />
                        </svg>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 flex items-center space-x-4 border-b pb-6">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={decreaseQuantity}
                  className="p-3 text-gray-600 hover:bg-gray-100 transition"
                  aria-label="Giảm số lượng"
                >
                  -
                </button>
                <span className="p-3 font-medium text-gray-800 w-10 text-center">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  className="p-3 text-gray-600 hover:bg-gray-100 transition"
                  aria-label="Tăng số lượng"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCartWithAnimation}
                className="grow py-3 bg-white text-black border-2 border-black font-medium rounded-lg hover:bg-black hover:text-white transition text-sm"
              >
                Thêm vào giỏ
              </button>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <Truck size={18} className="text-gray-500" />
                <span>Giao hàng dự kiến: 3 - 6 Tháng 12, 2025</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <RefreshCcw size={18} className="text-gray-500" />
                <span>Miễn phí vận chuyển & đổi trả</span>
              </div>
            </div>

            <div className="pt-4 text-center">
              <p className="text-xs text-gray-500 mb-2">
                <span className="font-semibold text-gray-700">
                  Đảm bảo thanh toán an toàn và bảo mật!
                </span>
              </p>
              <img
                src="https://placehold.co/300x30/fff/333?text=VISA+MASTERCARD+AMEX+DISCOVER+PAYPAL"
                alt="Phương thức thanh toán"
                className="w-full max-w-xs mx-auto opacity-70"
              />
            </div>

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
            backgroundImage: `url(${
              isCarousel
                ? product.modalImages[currentImageIndex]
                : product.imageUrl
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
    </div>
  );
};
