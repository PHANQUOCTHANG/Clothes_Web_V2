"use client";

import Image from "next/image";
import { Star, ArrowRightLeft, Eye } from "lucide-react";
import { Product } from "../../types";
import { ProductDetailService } from "@/features/client/product-detail/services/productDetailService";

interface ProductListViewItemProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductListViewItem = ({
  product,
  onAddToCart,
  onQuickView,
}: ProductListViewItemProps) => {
  const mainImage = product.images?.[0] || "/images/placeholder.png";
  const isInStock = ProductDetailService.isInStock(product.stock);
  const isNew = product.productNew === true;
  const finalPrice = ProductDetailService.calculateFinalPrice(
    product.price,
    product.discount
  );

  return (
    <div className="flex flex-col sm:flex-row border-b border-gray-100 pb-10">
      <div className="relative w-full sm:w-1/4 shrink-0 sm:mr-8 mb-4 sm:mb-0 aspect-square sm:aspect-2/3 bg-gray-100 rounded-lg overflow-hidden group">
        <Image
          src={mainImage}
          alt={product.name}
          fill
          priority={false}
          className="object-cover transition duration-300 group-hover:opacity-50"
        />

        {!isInStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
          <div className="flex flex-col space-y-3">
            <button
              disabled={!isInStock}
              className="bg-white/90 text-gray-700 hover:bg-black hover:text-white p-3 rounded-full shadow-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Add to wishlist"
            >
              <Star size={20} />
            </button>
            <button
              disabled={!isInStock}
              className="bg-white/90 text-gray-700 hover:bg-black hover:text-white p-3 rounded-full shadow-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Compare"
            >
              <ArrowRightLeft size={20} />
            </button>
            <div className="relative group/view">
              <button
                disabled={!isInStock}
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView?.(product);
                }}
                className="bg-white/90 text-gray-700 hover:bg-black hover:text-white p-3 rounded-full shadow-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Quick view"
              >
                <Eye size={20} />
              </button>
              <span className="absolute top-1/2 right-full transform -translate-y-1/2 mr-3 px-3 py-1 text-sm text-white bg-black rounded-lg opacity-0 group-hover/view:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                Quick View
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grow pt-0 sm:pt-4">
        <h3 className="text-xl font-medium text-gray-800 mb-1">
          {product.name}
        </h3>
        <div className="flex items-center space-x-2 mb-4">
          <p className="text-lg text-gray-500 font-light">
            {finalPrice !== product.price && (
              <span className="line-through text-gray-400 mr-2">
                {ProductDetailService.formatPrice(product.price)}
              </span>
            )}
            <span className="font-semibold text-gray-900">
              {ProductDetailService.formatPrice(finalPrice)}
            </span>
          </p>
          {isNew && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              New
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-6 max-w-lg">
          {product.description}
        </p>

        <div className="flex space-x-2 mb-8">
          {product.color && (
            <div
              className="w-5 h-5 rounded-full border-2 border-gray-300 cursor-pointer relative group z-10 hover:scale-110 transition"
              style={{ backgroundColor: product.color.code }}
              title={product.color.name}
            >
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-sm text-white bg-black rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                {product.color.name}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center">
          <button
            disabled={!isInStock}
            onClick={() => onAddToCart(product)}
            className="flex items-center justify-center px-8 py-3 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed mr-8"
          >
            Add to Cart
          </button>

          <div className="flex items-center space-x-2 pt-1">
            <div className="flex items-center space-x-1">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-gray-700">
                {(product.rating || 0).toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              ({product.amountBuy || 0} sold)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
