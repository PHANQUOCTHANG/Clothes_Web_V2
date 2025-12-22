"use client";

import { Star, ArrowRightLeft, Eye } from "lucide-react";
import { COLORS } from "../../constants";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductCard = ({
  product,
  onAddToCart,
  onQuickView,
}: ProductCardProps) => (
  <div className="flex flex-col p-2 relative">
    <div className="relative overflow-hidden mb-3 aspect-[2/3] bg-gray-100 rounded-lg group">
      <img
        src={product.imageUrl}
        alt={product.name + " Mặt trước"}
        loading="lazy"
        className="object-cover w-full h-full transition-opacity duration-500 ease-in-out group-hover:opacity-0"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = `https://placehold.co/400x600/f3f4f6/333?text=Loi+Anh`;
        }}
      />

      <img
        src={product.imageHoverUrl}
        alt={product.name + " Người mẫu"}
        loading="lazy"
        className="object-cover w-full h-full absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = `https://placehold.co/400x600/f3f4f6/333?text=Loi+Anh+Hover`;
        }}
      />

      {product.discount && (
        <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
          {product.discount}
        </span>
      )}

      <div className="absolute top-4 right-4 flex flex-col space-y-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10">
        <button
          className="bg-white/90 text-gray-700 hover:bg-black hover:text-white p-2 rounded-full shadow-md transition-colors duration-200"
          aria-label="Thêm vào yêu thích"
        >
          <Star size={18} />
        </button>
        <button
          className="bg-white/90 text-gray-700 hover:bg-black hover:text-white p-2 rounded-full shadow-md transition-colors duration-200 delay-75"
          aria-label="So sánh"
        >
          <ArrowRightLeft size={18} />
        </button>
        <div className="relative group/view flex justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView?.(product);
            }}
            className="bg-white text-gray-700 p-2 rounded-full shadow-md border border-gray-300 transition-colors duration-200 delay-150 relative z-10 hover:bg-black hover:text-white hover:border-black"
            aria-label="Xem nhanh sản phẩm"
          >
            <Eye size={18} />
          </button>
          <span className="absolute top-1/2 right-full transform -translate-y-1/2 mr-0 px-3 py-1 text-sm text-white bg-black rounded-lg opacity-0 group-hover/view:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            Xem nhanh
            <svg
              className="absolute text-black h-2 w-2 right-[-8px] top-1/2 transform -translate-y-1/2"
              viewBox="0 0 10 10"
            >
              <polygon className="fill-current" points="0,0 10,5 0,10" />
            </svg>
          </span>
        </div>
      </div>

      <button
        onClick={() => onAddToCart(product)}
        className="absolute bottom-0 left-0 right-0 py-3 bg-white text-black text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-full group-hover:translate-y-0 hover:bg-black hover:text-white z-10"
      >
        Thêm vào giỏ
      </button>
    </div>

    <p className="text-sm text-gray-800 font-medium truncate mb-1">
      {product.name}
    </p>
    <p className="text-sm text-gray-500 font-normal mb-2">
      ${product.price.toFixed(2)}
    </p>

    <div className="flex space-x-1">
      {COLORS.filter((c) => product.colors.includes(c.hex)).map(
        (color, index) => (
          <div
            key={index}
            className="w-4 h-4 rounded-full border border-gray-200 cursor-pointer relative group z-10 hover:scale-110 transition"
            style={{
              backgroundColor: color.hex,
              backgroundImage: color.pattern
                ? `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><rect width='10' height='10' fill='${color.hex}'/><path d='M0 0l10 10M0 10l10 -10' stroke='rgba(0,0,0,0.2)' stroke-width='0.5'/></svg>")`
                : "none",
            }}
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
          </div>
        )
      )}
    </div>
  </div>
);
