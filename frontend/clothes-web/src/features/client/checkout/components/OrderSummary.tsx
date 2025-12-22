import { SummaryProps } from "@/features/checkout/types";
import React from "react";


export const OrderSummary: React.FC<SummaryProps> = ({ cartItems, subtotal, shipping, tax, total }) => (
  <aside className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-24">
    <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-b pb-4">Tóm tắt đơn hàng</h3>
    
    <div className="space-y-4 text-sm mb-6">
      <div className="flex justify-between text-gray-500">
        <span>Tổng phụ</span>
        <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-gray-500">
        <span>Vận chuyển</span>
        <span className={`font-bold ${shipping === 0 ? "text-green-600" : "text-gray-900"}`}>
          {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
        </span>
      </div>
      <div className="flex justify-between text-gray-500 border-b pb-4">
        <span>Thuế (5%)</span>
        <span className="font-bold text-gray-900">${tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-end pt-2">
        <span className="text-xs font-black uppercase tracking-wider">Tổng cộng</span>
        <span className="text-2xl font-black text-blue-600 leading-none">${total.toFixed(2)}</span>
      </div>
    </div>

    <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
      {cartItems?.map((item) => (
        <div key={item.id} className="flex justify-between items-center gap-4 text-[11px]">
          <span className="text-gray-500 truncate flex-1">{item.name} <b className="text-gray-900">x{item.quantity}</b></span>
          <span className="font-bold text-gray-900 shrink-0">
            ${(parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  </aside>
);