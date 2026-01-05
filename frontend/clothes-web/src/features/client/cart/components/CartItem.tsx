/* eslint-disable @next/next/no-img-element */
"use client";

import { XIcon } from "@/components/common/Icons";
import { CartItemProps } from "@/features/cart/types";
import React from "react";

export const CartItem: React.FC<CartItemProps> = ({
  item,
  updateQuantity,
  removeItem,
  isFullPage = false,
}) => {
  const { id, name, price, image, quantity, color, size } = item;
  const priceValue = parseFloat(price.replace("$", ""));
  const totalPrice = (priceValue * quantity).toFixed(2);
  const placeholderImage =
    "https://placehold.co/64x64/E5E7EB/333333/png?text=Sản+phẩm";

  const handleUpdateQuantity = (newQty: number) => updateQuantity(id, newQty);
  const handleRemoveItem = () => removeItem(id);

  // --- GIAO DIỆN TRONG MODAL (NHỎ) ---
  if (!isFullPage) {
    return (
      <div className="flex gap-3 py-4 border-b border-gray-200 items-start hover:bg-gray-50/50 transition-colors px-1">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 shrink-0 object-cover bg-gray-100 rounded-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholderImage;
          }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
              {name}
            </h4>
            <button
              onClick={handleRemoveItem}
              className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm font-semibold text-gray-900 mt-1">
            ${priceValue.toFixed(2)}
          </p>
          <div className="text-xs text-gray-500 mt-1.5 space-y-0.5">
            <p>
              <span className="text-gray-700 font-medium">{color}</span> •{" "}
              <span className="text-gray-700 font-medium">{size}</span>
            </p>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center border border-gray-300 rounded">
              <button
                onClick={() => handleUpdateQuantity(Math.max(1, quantity - 1))}
                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-xs"
              >
                −
              </button>
              <span className="w-8 h-6 flex items-center justify-center text-xs font-medium border-l border-r border-gray-300">
                {quantity}
              </span>
              <button
                onClick={() => handleUpdateQuantity(quantity + 1)}
                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-xs"
              >
                +
              </button>
            </div>
            <p className="text-sm font-semibold text-gray-900">${totalPrice}</p>
          </div>
        </div>
      </div>
    );
  }

  // --- GIAO DIỆN TRONG TRANG GIỎ HÀNG (FULL PAGE) ---
  return (
    <div className="grid grid-cols-5 gap-4 items-center border-b border-gray-200 hover:bg-gray-50/50 transition-colors py-4 px-2">
      {/* Col 1 & 2: Thông tin sản phẩm */}
      <div className="col-span-2 flex items-start gap-4">
        <img
          src={image}
          alt={name}
          className="w-24 h-24 shrink-0 object-cover bg-gray-100 rounded-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholderImage;
          }}
        />
        <div className="flex flex-col justify-start min-w-0">
          <h4 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-gray-700 cursor-pointer transition">
            {name}
          </h4>
          <p className="text-sm font-semibold text-gray-900 mt-1.5">
            ${priceValue.toFixed(2)}
          </p>
          <div className="text-xs text-gray-500 space-y-0.5 mt-2.5">
            <p>
              <span className="text-gray-700 font-medium">{color}</span> •{" "}
              <span className="text-gray-700 font-medium">{size}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Col 3: Số lượng */}
      <div className="col-span-1 flex items-center justify-center">
        <div className="flex items-center border border-gray-300 rounded">
          <button
            onClick={() => handleUpdateQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-sm"
          >
            −
          </button>
          <span className="w-9 h-8 flex items-center justify-center text-sm font-medium border-l border-r border-gray-300">
            {quantity}
          </span>
          <button
            onClick={() => handleUpdateQuantity(quantity + 1)}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-sm"
          >
            +
          </button>
        </div>
      </div>

      {/* Col 4: Thành tiền */}
      <div className="col-span-1 flex items-center justify-end">
        <span className="text-sm font-semibold text-gray-900">
          ${totalPrice}
        </span>
      </div>

      {/* Col 5: Xóa */}
      <div className="col-span-1 flex items-center justify-end">
        <button
          onClick={handleRemoveItem}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded hover:bg-gray-100"
          title="Xóa sản phẩm"
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
