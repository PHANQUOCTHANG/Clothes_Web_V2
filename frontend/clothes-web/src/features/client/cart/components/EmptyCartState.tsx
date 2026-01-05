import { ShoppingBag } from "lucide-react";

const EmptyCartState = ({ onNavigate }: { onNavigate: () => void }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
      <ShoppingBag className="w-10 h-10 text-gray-500" strokeWidth={1.5} />
    </div>
    <h2 className="text-2xl font-semibold text-gray-900 mb-3">
      Giỏ hàng của bạn đang trống
    </h2>
    <p className="text-gray-600 mb-8 max-w-sm leading-relaxed">
      Khám phá bộ sưu tập sản phẩm mới nhất của chúng tôi và thêm những mục yêu
      thích vào giỏ hàng.
    </p>
    <button
      onClick={onNavigate}
      className="bg-gray-900 text-white px-8 py-3 text-sm font-semibold hover:bg-gray-800 active:bg-gray-950 transition-colors rounded-lg"
    >
      Tiếp tục mua sắm
    </button>
  </div>
);

export default EmptyCartState;
