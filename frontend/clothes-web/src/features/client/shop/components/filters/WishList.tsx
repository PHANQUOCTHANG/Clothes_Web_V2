"use client";

import { Minus, Plus } from "lucide-react";

interface WishListProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const WishList = ({ isOpen, onToggle }: WishListProps) => (
  <div className="pt-6 border-t border-gray-200 space-y-3">
    <h3
      className="font-semibold text-lg text-gray-800 mb-4 flex justify-between items-center cursor-pointer"
      onClick={onToggle}
    >
      Danh sách yêu thích
      {isOpen ? (
        <Minus size={16} className="text-gray-500" />
      ) : (
        <Plus size={16} className="text-gray-500" />
      )}
    </h3>
    {isOpen && (
      <p className="text-sm text-gray-500">
        Bạn chưa có sản phẩm nào trong danh sách yêu thích.
      </p>
    )}
  </div>
);
