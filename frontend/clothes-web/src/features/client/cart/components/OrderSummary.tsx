/* eslint-disable @typescript-eslint/no-explicit-any */
const OrderSummary = ({
  subtotal,
  shipping,
  tax,
  total,
  onCheckout,
  onContinue,
}: any) => (
  <div className="lg:col-span-1 p-6 bg-white border border-gray-200 rounded-lg shadow-sm h-min sticky top-20">
    <h2 className="text-lg font-semibold text-gray-900 mb-6">
      Tóm tắt đơn hàng
    </h2>

    <div className="space-y-4 mb-6 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-600">Tổng tiền hàng</span>
        <span className="font-medium text-gray-900">
          ${subtotal?.toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Vận chuyển</span>
        <span className="font-medium text-gray-900">
          {shipping === 0 ? (
            <span className="text-gray-900">Miễn phí</span>
          ) : (
            `$${shipping.toFixed(2)}`
          )}
        </span>
      </div>
      <div className="flex justify-between border-t border-gray-200 pt-4">
        <span className="text-gray-600">Thuế (5%)</span>
        <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between border-t border-gray-200 pt-4 text-base">
        <span className="font-semibold text-gray-900">Tổng cộng</span>
        <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
      </div>
    </div>

    <button
      onClick={onCheckout}
      className="w-full bg-gray-900 text-white px-4 py-3 text-sm font-medium hover:bg-gray-800 active:bg-gray-950 transition-colors rounded-lg mb-3"
    >
      Tiến hành thanh toán
    </button>
    <button
      onClick={onContinue}
      className="w-full text-gray-900 border border-gray-300 px-4 py-3 text-sm font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors rounded-lg"
    >
      Tiếp tục mua sắm
    </button>
  </div>
);

export default OrderSummary;
