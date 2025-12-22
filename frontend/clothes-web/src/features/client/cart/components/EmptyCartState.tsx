const EmptyCartState = ({ onNavigate }: { onNavigate: () => void }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
       🛒
    </div>
    <h2 className="text-2xl font-bold text-gray-900 mb-2">Giỏ hàng trống</h2>
    <p className="text-gray-500 mb-8 max-w-sm">
      Có vẻ như bạn chưa chọn sản phẩm nào. Hãy khám phá những bộ sưu tập mới nhất của chúng tôi!
    </p>
    <button 
      onClick={onNavigate}
      className="bg-black text-white px-10 py-4 text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition rounded-sm"
    >
      Tiếp tục Mua sắm
    </button>
  </div>
);

export default EmptyCartState;