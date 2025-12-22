const LoadingWardrobeReveal = ({ text = "Đang tải giỏ hàng..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Animation loading SVG */}
      <div className="reveal-container">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Đường nét: Nửa trái */}
          <path className="logo-path" d="M 50 10 L 10 90" />
          {/* Đường nét: Nửa phải */}
          <path className="logo-path" d="M 50 10 L 90 90" />
          {/* Đường nét: Thanh ngang */}
          <path className="logo-path" d="M 30 50 H 70" />
        </svg>
      </div>

      {/* Thông báo tải */}
      <p className="mt-4 text-sm font-semibold text-zinc-700">{text}</p>
    </div>
  );
};

export default LoadingWardrobeReveal;