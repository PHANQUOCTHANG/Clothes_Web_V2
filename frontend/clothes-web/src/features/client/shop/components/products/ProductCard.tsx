import Image from "next/image";
import { Star, ArrowRightLeft, Eye } from "lucide-react";
import { Product } from "../../types";
import { ProductDetailService } from "@/features/client/product-detail/services/productDetailService";
import { use } from "react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductCard = ({
  product,
  onAddToCart,
  onQuickView,
}: ProductCardProps) => {
  const mainImage =
    "https://tse4.mm.bing.net/th/id/OIP.a9Uoz_mcrcVW1zSEwlE48wHaHa?pid=Api&P=0&h=180";
  const hoverImage =
    "https://tse4.mm.bing.net/th/id/OIP.a9Uoz_mcrcVW1zSEwlE48wHaHa?pid=Api&P=0&h=180";
  const isInStock = ProductDetailService.isInStock(product.stock);
  const isNew = product.productNew === true;
  const finalPrice = ProductDetailService.calculateFinalPrice(
    product.price,
    product.discount
  );

  const router = useRouter() ;
  return (
    <div className="flex flex-col p-2 relative" onClick={() => {router.push(`/product/${product.slug}`)}}>
      {/* Image Container */}
      <div className="relative overflow-hidden mb-3 aspect-2/3 bg-gray-100 rounded-lg group">
        <Image
          src={mainImage}
          alt={product.name}
          fill
          className="object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
        />

        <Image
          src={hoverImage}
          alt={product.name}
          fill
          className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
        />

        {/* Discount Badge */}
        {product.discount > 0 && (
          <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
            {ProductDetailService.getDiscountLabel(product.discount)}
          </span>
        )}

        {/* New Badge */}
        {isNew && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
            New
          </span>
        )}

        {/* Out of Stock Overlay */}
        {!isInStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <button
            disabled={!isInStock}
            className="bg-white/90 text-gray-700 hover:bg-black hover:text-white p-2 rounded-full shadow-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Add to wishlist"
          >
            <Star size={18} />
          </button>
          <button
            disabled={!isInStock}
            className="bg-white/90 text-gray-700 hover:bg-black hover:text-white p-2 rounded-full shadow-md transition-colors duration-200 delay-75 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Compare"
          >
            <ArrowRightLeft size={18} />
          </button>
          <div className="relative group/view">
            <button
              disabled={!isInStock}
              onClick={(e) => {
                e.stopPropagation();
                onQuickView?.(product);
              }}
              className="bg-white text-gray-700 p-2 rounded-full shadow-md border border-gray-300 transition-colors duration-200 delay-150 hover:bg-black hover:text-white hover:border-black disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Quick view"
            >
              <Eye size={18} />
            </button>
            <span className="absolute top-1/2 right-full transform -translate-y-1/2 mr-3 px-3 py-1 text-sm text-white bg-black rounded-lg opacity-0 group-hover/view:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              Quick View
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          disabled={!isInStock}
          onClick={() => onAddToCart(product)}
          className="absolute bottom-0 left-0 right-0 py-3 bg-white text-black text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-full group-hover:translate-y-0 hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed z-10"
        >
          Add to Cart
        </button>
      </div>

      {/* Product Name */}
      <p className="text-sm text-gray-800 font-medium truncate mb-1">
        {product.name}
      </p>

      {/* Price Section */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500 font-normal">
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

      {/* Rating and Sales */}
      <div className="flex items-center space-x-2 mb-3">
        <div className="flex items-center space-x-1">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs text-gray-600">
            {(product.rating || 0).toFixed(1)}
          </span>
        </div>
        <span className="text-xs text-gray-500">
          ({product.amountBuy || 0} sold)
        </span>
      </div>

      {/* Color Display */}
      <div className="flex space-x-2">
        {product.color && (
          <div
            className="w-5 h-5 rounded-full border-2 border-gray-300 cursor-pointer relative group hover:scale-110 transition"
            style={{ backgroundColor: product.color.code }}
            title={product.color.name}
          >
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
              {product.color.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
