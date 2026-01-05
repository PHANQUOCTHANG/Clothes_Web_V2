/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { RatingStars } from "@/features/client/product-detail/components/common/Rating";
import { WashingIcon } from "@/features/client/product-detail/components/common/Utilities";
import { REVIEW_IMAGES } from "@/features/client/product-detail/constants";
import { IProduct } from "@/types/product";
import { Maximize } from "lucide-react";

export const renderDetailsContent = (currentProduct : IProduct) => (
  <div className="py-6 text-gray-700">
    <p className="text-sm mb-8 leading-relaxed">
      Chi phí vận chuyển dựa trên trọng lượng, hãy thêm sản phẩm vào giỏ hàng và
      sử dụng Công cụ tính phí vận chuyển để xem giá. Chúng tôi muốn bạn hài
      lòng 100% với giao dịch mua hàng của mình. Các mặt hàng có thể được trả
      lại hoặc đổi trong vòng 30 ngày kể từ ngày giao hàng.
    </p>

    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-1/2">
        <img
          src="https://placehold.co/400x400/C4D4BF/242424?text=Chi+Tiet+Vai"
          alt="Chi Tiết Vải"
          className="w-full h-auto rounded-xl object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://placehold.co/400x400/C4D4BF/242424?text=Fabric+Detail";
          }}
        />
      </div>
      <div className="lg:w-1/2">
        <h3 className="text-2xl font-semibold mb-4 text-gray-900">
          Hình bóng mang tính biểu tượng
        </h3>
        <p className="text-sm leading-relaxed mb-6">
          Các sản phẩm có nhãn Committed là những sản phẩm được sản xuất bằng
          sợi hoặc quy trình bền vững, giảm tác động đến môi trường. Mục tiêu
          của Mango là hỗ trợ thực hiện các hoạt động cam kết hơn với môi
          trường, và do đó tăng số lượng hàng may mặc bền vững trong bộ sưu tập.
        </p>

        <h4 className="text-lg font-semibold mb-3 text-gray-900">Thông tin</h4>
        <ul className="list-disc list-inside space-y-1 text-sm pl-4">
          <li>Cổ cắt</li>
          <li>Khóa nút phía trước</li>
          <li>Túi vá ngực</li>
          <li>Tay dài</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900">
          Hướng dẫn giặt
        </h4>
        <div className="flex space-x-4 mb-3 text-gray-700">
          <WashingIcon label="Giặt máy nước ấm">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
              <line x1="2" y1="6" x2="22" y2="6" />
              <line x1="12" y1="6" x2="12" y2="21" />
              <line x1="4" y1="18" x2="20" y2="18" />
              <line x1="15" y1="18" x2="18" y2="18" />
              <line x1="10" y1="18" x2="7" y2="18" />
            </svg>
          </WashingIcon>
          <WashingIcon label="Không tẩy trắng">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 22h20L12 2z" />
              <line x1="3" y1="21" x2="21" y2="3" className="stroke-red-600" />
            </svg>
          </WashingIcon>
          <WashingIcon label="Không sấy khô">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="21" x2="21" y2="3" className="stroke-red-600" />
            </svg>
          </WashingIcon>
          <WashingIcon label="Không ủi">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 12v6H10v-6h4z" />
              <path d="M10 6L7 9h10l-3-3" />
              <line x1="3" y1="21" x2="21" y2="3" className="stroke-red-600" />
            </svg>
          </WashingIcon>
          <WashingIcon label="Không giặt khô">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="3" y1="21" x2="21" y2="3" className="stroke-red-600" />
            </svg>
          </WashingIcon>
        </div>
        <p className="text-sm">
          Giặt máy, không ủi, không giặt khô, không sấy khô
        </p>
      </div>
    </div>
  </div>
);

export const renderReviewsContent = (currentProduct: IProduct) => {
  return (
    <div className="py-6 text-gray-700">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Đánh giá khách hàng ({currentProduct.reviews?.length || 0})
      </h2>

      <div className="border-b border-gray-200 pb-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Sản phẩm tuyệt vời!
        </h3>

        <div className="space-y-1 text-sm mb-4">
          <div className="flex items-center">
            <span className="w-16 font-medium text-gray-600">Đánh giá:</span>
            <RatingStars rating={currentProduct.rating} size={14} />
          </div>
        </div>

        <p className="text-sm leading-relaxed mb-4 italic">
          Tôi mua đầm này cho buổi tiệc tối và nhận được rất nhiều lời khen.
          Chất vải mềm và tôn dáng.
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {REVIEW_IMAGES.map((imgUrl, idx) => (
            <div
              key={idx}
              className="relative group w-20 h-20 overflow-hidden rounded-lg border border-gray-200 cursor-pointer"
            >
              <img
                src={imgUrl}
                alt={`Review ${idx}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
                <Maximize
                  size={14}
                  className="text-white opacity-0 group-hover:opacity-100"
                />
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500">
          Đánh giá bởi **Hương Trà** vào 12/12/2024.
        </p>
      </div>

      <div className="border-b border-gray-200 pb-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Nó rẻ và tốt.
        </h3>

        <div className="space-y-1 text-sm mb-4">
          <div className="flex items-center">
            <span className="w-16 font-medium text-gray-600">Đánh giá:</span>
            <RatingStars rating={currentProduct.rating} size={14} />
          </div>
        </div>

        <p className="text-sm leading-relaxed italic mb-3">
          Tôi mua cái này tuần trước và nó rất tuyệt, tôi thích nó.
        </p>
        <p className="text-xs text-gray-500">
          Đánh giá bởi **Elle** vào 6/11/22.
        </p>
      </div>
    </div>
  );
};

export const renderTabContent = (
  activeTab: string,
  currentProduct: IProduct
) => {
  switch (activeTab) {
    case "details":
      return renderDetailsContent(currentProduct);
    case "moreInfo":
      return (
        <div className="p-6 text-gray-700">
          Nội dung cho "Thông Tin Thêm" sẽ được cập nhật tại đây.
        </div>
      );
    case "reviews":
      return renderReviewsContent(currentProduct);
    case "aboutBrand":
      return (
        <div className="p-6 text-gray-700">
          Nội dung cho "Về Thương Hiệu" sẽ được cập nhật tại đây.
        </div>
      );
    case "shippingReturns":
      return (
        <div className="p-6 text-gray-700">
          Nội dung cho "Vận Chuyển & Đổi Trả" sẽ được cập nhật tại đây.
        </div>
      );
    default:
      return null;
  }
};
