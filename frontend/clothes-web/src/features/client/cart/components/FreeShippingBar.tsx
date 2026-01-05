// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FreeShippingBar = ({ isFreeShipping, remaining, progress }: any) => (
  <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
    <div className="text-sm font-medium mb-3 text-gray-900">
      {isFreeShipping ? (
        <span className="text-gray-900">✓ Bạn được miễn phí vận chuyển</span>
      ) : (
        <span className="text-gray-700">
          Mua thêm{" "}
          <span className="font-semibold">${remaining.toFixed(2)}</span> để được
          miễn phí vận chuyển
        </span>
      )}
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div
        className={`h-2 rounded-full transition-all duration-500 ${
          isFreeShipping ? "bg-gray-900" : "bg-gray-400"
        }`}
        style={{
          width: `${Math.min(100, progress)}%`,
        }}
      />
    </div>
  </div>
);

export default FreeShippingBar;
