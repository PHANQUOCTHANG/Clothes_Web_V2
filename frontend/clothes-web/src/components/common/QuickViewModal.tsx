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
import { Product } from "@/features/client/shop/types";
import { ProductDetailService } from "@/features/client/product-detail/services/productDetailService";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal = ({ product, onClose }: QuickViewModalProps) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.color?.code || null
  );
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

  const isCarousel = product.images && product.images.length > 1;
  const sizeOptions = product.size
    ? product.size.split(",").map((s) => s.trim())
    : [];
  const finalPrice = ProductDetailService.calculateFinalPrice(
    product.price,
    product.discount
  );
  const isInStock = ProductDetailService.isInStock(product.stock);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  const handleAddToCartWithAnimation = () => {
    // Check if color selected
    if (!selectedColor) {
      setMessage("Please select a color!");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    // Check if size selected
    if (!selectedSize) {
      setMessage("Please select a size!");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    // Show message
    setMessage("Product added to cart!");

    // Find cart button position for animation
    const cartButton = document.querySelector('[aria-label="Cart"]');

    // Find main image element from modal
    const mainImage = document.querySelector(
      '.w-full.lg\\:w-1\\/2.bg-gray-100 img, [alt*="' + product.name + '"]'
    ) as HTMLImageElement;

    if (cartButton && mainImage && isInStock) {
      const cartRect = (cartButton as HTMLElement).getBoundingClientRect();
      const imageRect = mainImage.getBoundingClientRect();

      // Set flying product animation
      setFlyingProduct({
        show: true,
        startX: imageRect.left + imageRect.width / 2,
        startY: imageRect.top + imageRect.height / 2,
        endX: cartRect.left + cartRect.width / 2,
        endY: cartRect.top + cartRect.height / 2,
      });

      // Close modal and reset message after animation
      setTimeout(() => {
        setFlyingProduct((prev) => ({ ...prev, show: false }));
        onClose();
        setMessage("");
      }, 800);
    } else {
      // If cart button or image not found, close after message
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
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 bg-gray-100 flex items-center justify-center p-8 rounded-t-lg lg:rounded-l-lg lg:rounded-t-none relative group/image">
            <img
              src={
                isCarousel
                  ? product.images[currentImageIndex]
                  : product.images[0]
              }
              alt={product.name}
              className="object-contain max-h-[70vh] w-full rounded-lg transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "/images/placeholder.png";
              }}
            />

            {isCarousel && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 text-black p-3 rounded-full shadow-md hover:bg-white transition opacity-0 group-hover/image:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 text-black p-3 rounded-full shadow-md hover:bg-white transition opacity-0 group-hover/image:opacity-100"
                  aria-label="Next image"
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
                {finalPrice !== product.price && (
                  <span className="line-through text-gray-400 mr-2">
                    {ProductDetailService.formatPrice(product.price)}
                  </span>
                )}
                <span className="font-semibold text-gray-900">
                  {ProductDetailService.formatPrice(finalPrice)}
                </span>
              </p>
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({product.rating.toFixed(1)} - {product.amountBuy} sold)
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed border-b pb-6">
              {product.description}
            </p>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-800">Color:</p>
              <div className="flex space-x-2">
                {product.color && (
                  <div
                    onClick={() =>
                      setSelectedColor(
                        product.color.code === selectedColor
                          ? null
                          : product.color.code
                      )
                    }
                    className={`w-8 h-8 rounded-full border-2 transition cursor-pointer flex items-center justify-center relative group ${
                      selectedColor === product.color.code
                        ? "border-black"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                    style={{ backgroundColor: product.color.code }}
                    aria-label={`Select color ${product.color.name}`}
                  >
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                      {product.color.name}
                    </span>
                    {selectedColor === product.color.code && (
                      <div className="w-4 h-4 rounded-full border border-white"></div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-800">Size:</p>
              <div className="flex flex-wrap gap-2">
                {sizeOptions.length > 0 ? (
                  sizeOptions.map((size) => {
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
                        aria-label={`Select size ${size}`}
                      >
                        {size}
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                          {size}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-500">No sizes available</p>
                )}
              </div>
            </div>

            <div className="pt-4 flex items-center space-x-4 border-b pb-6">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={decreaseQuantity}
                  disabled={!isInStock}
                  className="p-3 text-gray-600 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="p-3 font-medium text-gray-800 w-10 text-center">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  disabled={!isInStock}
                  className="p-3 text-gray-600 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCartWithAnimation}
                disabled={!isInStock}
                className="grow py-3 bg-white text-black border-2 border-black font-medium rounded-lg hover:bg-black hover:text-white transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isInStock ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <Truck size={18} className="text-gray-500" />
                <span>Estimated delivery: 3 - 6 days</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <RefreshCcw size={18} className="text-gray-500" />
                <span>Free shipping & returns</span>
              </div>
            </div>

            <div className="pt-4 text-center">
              <p className="text-xs text-gray-500 mb-2">
                <span className="font-semibold text-gray-700">
                  Secure and safe payment guaranteed!
                </span>
              </p>
              <img
                src="https://placehold.co/300x30/fff/333?text=VISA+MASTERCARD+AMEX+DISCOVER+PAYPAL"
                alt="Payment methods"
                className="w-full max-w-xs mx-auto opacity-70"
              />
            </div>

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
                    message.includes("added")
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
              isCarousel ? product.images[currentImageIndex] : product.images[0]
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
    </div>
  );
};
