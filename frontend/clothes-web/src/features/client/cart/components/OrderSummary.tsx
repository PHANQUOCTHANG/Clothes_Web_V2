/* eslint-disable @typescript-eslint/no-explicit-any */
const OrderSummary = ({
  subtotal,
  shipping,
  tax,
  total,
  onCheckout,
  onContinue,
}: any) => (
  <div className="lg:col-span-1 p-6 bg-white border border-gray-200 rounded-xl shadow-lg h-min sticky top-20">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Tóm tắt đơn hàng</h2>

    <div className="space-y-3 mb-6">
      <div className="flex justify-between text-base">
        <span className="text-gray-600">Tổng phụ</span>
        <span className="font-semibold">${subtotal?.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-base">
        <span className="text-gray-600">Vận chuyển</span>
        <span className="font-semibold">
          {shipping === 0 ? (
            <span className="text-green-600">Miễn phí</span>
          ) : (
            `$${shipping.toFixed(2)}`
          )}
        </span>
      </div>
      <div className="flex justify-between border-b border-gray-200 pb-3 text-base">
        <span className="text-gray-600">Thuế (5%)</span>
        <span className="font-semibold">${tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between pt-3">
        <span className="text-xl font-bold text-gray-900">TỔNG CỘNG</span>
        <span className="text-2xl font-bold text-blue-600">
          ${total.toFixed(2)}
        </span>
      </div>
    </div>

    <button
      onClick={onCheckout}
      className="w-full bg-blue-600 text-white px-4 py-3 text-sm font-semibold hover:bg-blue-700 transition mb-2 rounded-md"
    >
      Tiến hành Thanh toán
    </button>
    <button
      onClick={onContinue}
      className="w-full text-gray-800 border border-gray-300 px-4 py-3 text-sm font-semibold hover:bg-gray-100 transition rounded-md"
    >
      Tiếp tục Mua sắm
    </button>
  </div>
);

export default OrderSummary;
