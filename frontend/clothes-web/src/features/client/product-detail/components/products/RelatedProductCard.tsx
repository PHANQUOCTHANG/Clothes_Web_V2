/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Star, ArrowRightLeft, Eye } from "lucide-react";
import { IProductData } from "../../types";
import { OverlayTooltip } from "../common/Utilities";
import { ALL_PRODUCTS } from "../../constants";

interface RelatedProductCardProps {
  product: IProductData;
  setCurrentProduct: (p: IProductData) => void;
  onQuickView?: () => void;
}

export const RelatedProductCard = ({
  product,
  setCurrentProduct,
  onQuickView,
}: RelatedProductCardProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const defaultImage = product.images[0]?.url;
  const hoverImage =
    product.images.length > 1 ? product.images[1].url : defaultImage;
  const displayImage =
    isHovered && hoverImage !== defaultImage ? hoverImage : defaultImage;

  const handleClick = () => {
    const fullProductData = ALL_PRODUCTS.find((p) => p.id === product.id);
    if (fullProductData) {
      setCurrentProduct(fullProductData);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      className="group flex flex-col p-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative aspect-3/4 overflow-hidden rounded-lg bg-gray-100">
        {product.discount && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full z-10">
            -{product.discount}%
          </span>
        )}
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://placehold.co/300x400/E0E0E0/333333?text=Product";
          }}
        />

        <div className="absolute top-4 right-4 space-y-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <OverlayTooltip text="Yêu thích">
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors">
              <Star size={18} className="text-gray-900" />
            </div>
          </OverlayTooltip>

          <OverlayTooltip text="So sánh">
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors">
              <ArrowRightLeft size={18} className="text-gray-900" />
            </div>
          </OverlayTooltip>

          <OverlayTooltip text="Xem nhanh">
            <div
              className="w-9 h-9 flex items-center justify-center rounded-full shadow-md transition-colors bg-white text-gray-900 hover:bg-gray-900 hover:text-white cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView?.();
              }}
            >
              <Eye size={18} className="transition-colors" />
            </div>
          </OverlayTooltip>
        </div>
      </div>
      <div className="mt-3 text-center">
        <h4 className="text-sm font-medium text-gray-800 truncate">
          {product.name}
        </h4>
        <p className="text-sm mt-1">
          <span className="font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.oldPrice && (
            <span className="ml-2 text-xs text-gray-400 line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};
