// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FreeShippingBar = ({ isFreeShipping, remaining, progress }: any) => (
  <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
    <div className="text-sm font-semibold mb-2">
      {isFreeShipping ? (
        <span className="text-green-600">🎉 MIỄN PHÍ VẬN CHUYỂN!</span>
      ) : (
        <span className="text-blue-600">
          Mua thêm ${remaining.toFixed(2)} để được MIỄN PHÍ VẬN CHUYỂN!
        </span>
      )}
    </div>
    <div className="w-full bg-gray-300 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-500 ${
          isFreeShipping ? "bg-green-500" : "bg-blue-500"
        }`}
        style={{
          width: `${Math.min(100, progress)}%`,
        }}
      />
    </div>
  </div>
);

export default FreeShippingBar;
