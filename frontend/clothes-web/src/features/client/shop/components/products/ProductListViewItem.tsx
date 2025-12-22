"use client";

import { Star, ArrowRightLeft, Eye } from "lucide-react";
import { COLORS } from "../../constants";
import { Product } from "../../types";

interface ProductListViewItemProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductListViewItem = ({
  product,
  onAddToCart,
  onQuickView,
}: ProductListViewItemProps) => (
  <div className="flex flex-col sm:flex-row border-b border-gray-100 pb-10">
    <div className="relative w-full sm:w-1/4 flex-shrink-0 sm:mr-8 mb-4 sm:mb-0 aspect-square sm:aspect-[2/3] bg-gray-100 rounded-lg overflow-hidden group">
      <img
        src={product.imageUrl}
        alt={product.name}
        loading="lazy"
        className="object-cover w-full h-full transition duration-300 group-hover:opacity-50"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = `https://placehold.co/300x450/f3f4f6/333?text=Loi+Anh`;
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
        <div className="flex flex-col space-y-3">
          <button
            className="bg-white/90 text-gray-700 hover:bg-black hover:text-white p-3 rounded-full shadow-lg transition-colors duration-200"
            aria-label="Thêm vào yêu thích"
          >
            <Star size={20} />
          </button>
          <button
            className="bg-white/90 text-gray-700 hover:bg-black hover:text-white p-3 rounded-full shadow-lg transition-colors duration-200"
            aria-label="So sánh"
          >
            <ArrowRightLeft size={20} />
          </button>
          <div className="relative group/view">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView?.(product);
              }}
              className="bg-white/90 text-gray-700 hover:bg-black hover:text-white p-3 rounded-full shadow-lg transition-colors duration-200"
              aria-label="Xem nhanh sản phẩm"
            >
              <Eye size={20} />
            </button>
            <span className="absolute top-1/2 right-full transform -translate-y-1/2 mr-3 px-3 py-1 text-sm text-white bg-black rounded-lg opacity-0 group-hover/view:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              Xem nhanh
            </span>
          </div>
        </div>
      </div>
    </div>

    <div className="flex-grow pt-0 sm:pt-4">
      <h3 className="text-xl font-medium text-gray-800 mb-1">{product.name}</h3>
      <p className="text-lg text-gray-500 font-light mb-4">
        ${product.price.toFixed(2)}
      </p>

      <p className="text-sm text-gray-600 mb-6 max-w-lg">
        {product.description}
      </p>

      <div className="flex space-x-2 mb-8">
        {COLORS.filter((c) => product.colors.includes(c.hex)).map(
          (color, index) => (
            <div
              key={index}
              className={`w-5 h-5 rounded-full border cursor-pointer relative group z-10 hover:scale-110 transition ${
                color.hex === "#A8B79B" ? "border-gray-500" : "border-gray-300"
              }`}
              style={{ backgroundColor: color.hex }}
            >
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-sm text-white bg-black rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                {color.name}
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

              {color.hex === "#A8B79B" && (
                <div className="w-3 h-3 rounded-full border-2 border-white"></div>
              )}
            </div>
          )
        )}
      </div>

      <div className="flex items-center">
        <button
          onClick={() => onAddToCart(product)}
          className="flex items-center justify-center px-8 py-3 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition duration-200 mr-8"
        >
          Thêm vào giỏ
        </button>

        <div className="flex items-center space-x-2 pt-1">
          <button
            className="text-gray-500 hover:text-black transition p-1 rounded-full"
            aria-label="Yêu thích"
          >
            <Star size={20} />
          </button>
          <button
            className="text-gray-500 hover:text-black transition p-1 rounded-full"
            aria-label="So sánh"
          >
            <ArrowRightLeft size={20} />
          </button>
        </div>
      </div>
    </div>
  </div>
);
