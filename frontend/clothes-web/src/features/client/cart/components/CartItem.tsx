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
  const placeholderImage = "https://placehold.co/64x64/E5E7EB/333333/png?text=Sản+phẩm";

  const handleUpdateQuantity = (newQty: number) => updateQuantity(id, newQty);
  const handleRemoveItem = () => removeItem(id);

  // --- GIAO DIỆN TRONG MODAL (NHỎ) ---
  if (!isFullPage) {
    return (
      <div className="flex py-4 border-b border-gray-100 items-start">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 shrink-0 object-cover bg-gray-100 mr-4 rounded-md"
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholderImage;
          }}
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">{name}</h4>
            <button onClick={handleRemoveItem} className="text-gray-400 hover:text-blue-600 transition ml-4">
              <XIcon className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm font-medium text-gray-700 mt-1">${priceValue.toFixed(2)}</p>
          <div className="text-xs text-gray-500 mt-1.5 space-y-0.5">
            <p>Màu: <span className="font-semibold text-gray-800">{color}</span></p>
            <p>Size: <span className="font-semibold text-gray-800">{size}</span></p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center border border-gray-300 rounded-sm">
              <button onClick={() => handleUpdateQuantity(Math.max(1, quantity - 1))} className="px-2 py-1 text-gray-500 hover:bg-gray-100">-</button>
              <span className="px-3 text-sm font-medium border-l border-r border-gray-300">{quantity}</span>
              <button onClick={() => handleUpdateQuantity(quantity + 1)} className="px-2 py-1 text-gray-500 hover:bg-gray-100">+</button>
            </div>
            <p className="text-sm font-semibold text-gray-800">Total: ${totalPrice}</p>
          </div>
        </div>
      </div>
    );
  }

  // --- GIAO DIỆN TRONG TRANG GIỎ HÀNG (FULL PAGE) ---
  return (
    <div className="grid grid-cols-5 items-center border-b border-gray-200 hover:bg-gray-50 transition duration-150 p-4">
      {/* Col 1 & 2: Thông tin sản phẩm */}
      <div className="col-span-2 flex items-center space-x-4">
        <img
          src={image}
          alt={name}
          className="w-20 h-20 shrink-0 object-cover bg-gray-100 rounded-md"
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholderImage;
          }}
        />
        <div className="flex flex-col space-y-1">
          <h4 className="text-base font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 cursor-pointer transition">{name}</h4>
          <p className="font-semibold text-sm text-gray-900">${priceValue.toFixed(2)}</p>
          <div className="text-xs text-gray-600 space-y-0.5 mt-2">
            <p>Màu: <span className="font-semibold text-gray-800">{color}</span></p>
            <p>Size: <span className="font-semibold text-gray-800">{size}</span></p>
          </div>
        </div>
      </div>

      {/* Col 3: Số lượng */}
      <div className="col-span-1 flex items-center justify-center">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button onClick={() => handleUpdateQuantity(Math.max(1, quantity - 1))} className="px-2 py-1 text-gray-500 hover:bg-gray-100">-</button>
          <span className="px-3 text-sm font-medium border-l border-r border-gray-300">{quantity}</span>
          <button onClick={() => handleUpdateQuantity(quantity + 1)} className="px-2 py-1 text-gray-500 hover:bg-gray-100">+</button>
        </div>
      </div>

      {/* Col 4: Thành tiền */}
      <div className="col-span-1 flex items-center justify-end font-bold text-gray-900">
        ${totalPrice}
      </div>

      {/* Col 5: Xóa */}
      <div className="col-span-1 flex items-center justify-end">
        <button onClick={handleRemoveItem} className="text-gray-400 hover:text-blue-600 transition p-1" title="Xóa sản phẩm">
          <XIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};