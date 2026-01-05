
import React from 'react';
import { Download, MapPin, CreditCard, Truck, Package, ShoppingBag, CheckCircle } from 'lucide-react';

export default function OrderDetailsPage() {
  const products = [
    {
      name: 'Áo khoác cho nam (Màu hồng)',
      color: 'Hồng',
      size: 'M',
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=100',
      price: '$119.99',
      quantity: '02',
      rating: 4.5,
      total: '$239.98'
    },
    {
      name: 'Đồng hồ thông minh NoiseFit Endure',
      color: 'Đen',
      size: '32.5mm',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100',
      price: '$94.99',
      quantity: '01',
      rating: 4.5,
      total: '$94.99'
    },
    {
      name: 'Hũ thủy tinh 350 ml',
      color: 'Trắng',
      size: '350 ml',
      image: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=100',
      price: '$24.99',
      quantity: '01',
      rating: 3,
      total: '$24.99'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between max-w-[1800px] mx-auto gap-2">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-700 tracking-wide">CHI TIẾT ĐƠN HÀNG</h1>
          <div className="flex items-center text-sm text-gray-500">
            <span>Thương mại điện tử</span>
            <span className="mx-2">›</span>
            <span className="text-gray-700">Chi tiết đơn hàng</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            {/* Order Info Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">Đơn hàng #VL2667</h2>
                <button className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium transition-colors w-full sm:w-auto">
                  <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                  Tải hóa đơn
                </button>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-600">Chi tiết sản phẩm</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-600">Đơn giá</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-600">Số lượng</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-600">Đánh giá</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold text-gray-600">Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.map((product, idx) => (
                      <tr key={idx}>
                        <td className="px-3 sm:px-4 py-3 sm:py-4">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <img src={product.image} alt={product.name} className="w-12 h-12 sm:w-16 sm:h-16 rounded object-cover" />
                            <div>
                              <h3 className="font-medium text-gray-800 text-xs sm:text-sm">{product.name}</h3>
                              <p className="text-xs text-gray-500">Màu: {product.color}</p>
                              <p className="text-xs text-gray-500">Kích thước: {product.size}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-800">{product.price}</td>
                        <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-800">{product.quantity}</td>
                        <td className="px-3 sm:px-4 py-3 sm:py-4">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}`}
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                            ))}
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-800 text-right">{product.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Order Summary */}
              <div className="mt-4 sm:mt-6 border-t border-gray-200 pt-4 sm:pt-6">
                <div className="flex justify-end">
                  <div className="w-full sm:w-80 space-y-2 sm:space-y-3">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-600">Tổng phụ:</span>
                      <span className="font-medium text-gray-800">$359.96</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-600">Giảm giá <span className="text-gray-500">(VELZON15)</span>:</span>
                      <span className="font-medium text-gray-800">-$53.99</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-600">Phí vận chuyển:</span>
                      <span className="font-medium text-gray-800">$65.00</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-600">Thuế ước tính:</span>
                      <span className="font-medium text-gray-800">$44.99</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base font-semibold pt-3 border-t border-gray-200">
                      <span className="text-gray-800">Tổng cộng (USD):</span>
                      <span className="text-gray-800">$415.96</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Status Timeline */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">Trạng thái đơn hàng</h2>
                <div className="flex gap-2">
                  <button className="flex items-center justify-center gap-2 text-cyan-600 hover:bg-cyan-50 px-3 py-1.5 rounded text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-initial">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    Đổi địa chỉ
                  </button>
                  <button className="flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-initial">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Hủy đơn
                  </button>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Order Placed */}
                <div className="flex gap-3 sm:gap-4 pb-6 sm:pb-8">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <ShoppingBag className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800 text-xs sm:text-sm">Đã đặt hàng</h3>
                      <span className="text-xs sm:text-sm text-gray-500">- Thứ 4, 15/12/2021</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 mb-1">Đơn hàng đã được đặt thành công.</p>
                    <p className="text-xs text-gray-500">Thứ 4, 15/12/2021 - 17:34</p>
                    <p className="text-xs sm:text-sm text-gray-700 mt-2 sm:mt-3">Người bán đã xử lý đơn hàng của bạn.</p>
                    <p className="text-xs text-gray-500">Thứ 5, 16/12/2021 - 05:48</p>
                  </div>
                </div>

                {/* Packed */}
                <div className="flex gap-3 sm:gap-4 pb-6 sm:pb-8">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <Package className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800 text-xs sm:text-sm">Đã đóng gói</h3>
                      <span className="text-xs sm:text-sm text-gray-500">- Thứ 5, 16/12/2021</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 mb-1">Sản phẩm đã được đối tác vận chuyển nhận.</p>
                    <p className="text-xs text-gray-500">Thứ 6, 17/12/2021 - 09:45</p>
                  </div>
                </div>

                {/* Shipping */}
                <div className="flex gap-3 sm:gap-4 pb-6 sm:pb-8">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <Truck className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800 text-xs sm:text-sm">Đang vận chuyển</h3>
                      <span className="text-xs sm:text-sm text-gray-500">- Thứ 5, 16/12/2021</span>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-gray-800 mb-1">RQK Logistics - MFDS1400457854</p>
                    <p className="text-xs sm:text-sm text-gray-700 mb-1">Sản phẩm của bạn đang được vận chuyển.</p>
                    <p className="text-xs text-gray-500">Thứ 7, 18/12/2021 - 16:54</p>
                  </div>
                </div>

                {/* Out For Delivery */}
                <div className="flex gap-3 sm:gap-4 pb-6 sm:pb-8">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <Truck className="w-3 h-3 sm:w-5 sm:h-5 text-gray-400" />
                    </div>
                    <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-semibold text-gray-600 text-xs sm:text-sm">Đang giao hàng</h3>
                  </div>
                </div>

                {/* Delivered */}
                <div className="flex gap-3 sm:gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 sm:w-5 sm:h-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-semibold text-gray-600 text-xs sm:text-sm">Đã giao hàng</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6">
            {/* Logistics Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2">
                  <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  Thông tin vận chuyển
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium">
                  Theo dõi đơn
                </button>
              </div>

              <div className="text-center mb-4 sm:mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 bg-green-50 rounded-lg flex items-center justify-center">
                  <Truck className="w-8 h-8 sm:w-12 sm:h-12 text-green-500" />
                </div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">RQK Logistics</h4>
                <p className="text-xs sm:text-sm text-gray-600">Mã: MFDS1400457854</p>
                <p className="text-xs sm:text-sm text-gray-600">Phương thức thanh toán: Thẻ ghi nợ</p>
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800">Thông tin khách hàng</h3>
                <button className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium">
                  Xem hồ sơ
                </button>
              </div>

              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
                  alt="Joseph Parker"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Joseph Parkers</h4>
                  <p className="text-xs sm:text-sm text-gray-500">Khách hàng</p>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">josephparker@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-700">+(256) 245451 441</span>
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                Địa chỉ thanh toán
              </h3>
              <div className="text-xs sm:text-sm text-gray-700 space-y-1">
                <p className="font-medium">Joseph Parker</p>
                <p>+(256) 245451 451</p>
                <p>2186 Joyce Street Rocky Mount</p>
                <p>New York - 25645</p>
                <p>Hoa Kỳ</p>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                Địa chỉ giao hàng
              </h3>
              <div className="text-xs sm:text-sm text-gray-700 space-y-1">
                <p className="font-medium">Joseph Parker</p>
                <p>+(256) 245451 451</p>
                <p>2186 Joyce Street Rocky Mount</p>
                <p>California - 24567</p>
                <p>Hoa Kỳ</p>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                Chi tiết thanh toán
              </h3>
              <div className="text-xs sm:text-sm space-y-1 sm:space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mã giao dịch:</span>
                  <span className="font-medium text-gray-800">#VLZ124561278124</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phương thức:</span>
                  <span className="font-medium text-gray-800">Thẻ ghi nợ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Chủ thẻ:</span>
                  <span className="font-medium text-gray-800">Joseph Parker</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Số thẻ:</span>
                  <span className="font-medium text-gray-800">xxxx xxxx xxxx 2456</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng tiền:</span>
                  <span className="font-medium text-gray-800">$415.96</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}