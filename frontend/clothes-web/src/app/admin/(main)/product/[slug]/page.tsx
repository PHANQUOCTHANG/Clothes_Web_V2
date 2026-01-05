'use client'

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Edit } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('specification');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');

  const images = [
    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500',
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500',
    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500'
  ];

  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = [
    { name: 'Xanh nhạt', color: 'bg-blue-300' },
    { name: 'Tím', color: 'bg-purple-500' },
    { name: 'Xanh lá', color: 'bg-green-500' },
    { name: 'Xanh lơ', color: 'bg-cyan-400' },
    { name: 'Vàng', color: 'bg-yellow-400' },
    { name: 'Đỏ', color: 'bg-red-400' },
    { name: 'Đen', color: 'bg-gray-900' }
  ];

  const ratingData = [
    { stars: 5, count: 2758, percentage: 50 },
    { stars: 4, count: 1063, percentage: 19 },
    { stars: 3, count: 997, percentage: 18 },
    { stars: 2, count: 408, percentage: 7 },
    { stars: 1, count: 274, percentage: 5 }
  ];

  const reviews = [
    {
      name: 'Nguyễn Văn A',
      rating: 4.2,
      comment: 'Sản phẩm tốt. Tôi rất hài lòng.',
      date: '06/07/21'
    },
    {
      name: 'Trần Thị B',
      rating: 4.1,
      comment: 'Sản phẩm đẹp, chất lượng tốt.',
      date: '24/06/21'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between max-w-[1600px] mx-auto gap-2">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-700 tracking-wide">CHI TIẾT SẢN PHẨM</h1>
          <div className="flex items-center text-sm text-gray-500">
            <span>Thương mại điện tử</span>
            <span className="mx-2">›</span>
            <span className="text-gray-700">Chi tiết sản phẩm</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Left - Product Gallery */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded border border-gray-200 p-4 sm:p-6">
              {/* Main Image */}
              <div className="relative bg-gray-50 rounded-lg mb-3 sm:mb-4 aspect-square flex items-center justify-center overflow-hidden">
                <button 
                  onClick={() => setSelectedImage(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 z-10"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>
                <img
                  src={images[selectedImage]}
                  alt="Sản phẩm"
                  className="max-w-full max-h-full object-contain p-4 sm:p-8 mix-blend-multiply"
                />
                <button 
                  onClick={() => setSelectedImage(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 z-10"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-gray-50 rounded border-2 overflow-hidden hover:border-gray-400 transition-colors ${
                      selectedImage === idx ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt={`Ảnh nhỏ ${idx + 1}`} className="w-full h-full object-cover p-1 sm:p-2 mix-blend-multiply" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            {/* Product Header */}
            <div className="bg-white rounded border border-gray-200 p-4 sm:p-6">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">
                  Áo khoác tay dài cho nam (Màu hồng)
                </h2>
                <button className="p-1 sm:p-2 hover:bg-gray-100 rounded">
                  <Edit className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm mb-4">
                <a href="#" className="text-teal-600 hover:underline font-medium">Tommy Hilfiger</a>
                <span className="text-gray-400 hidden sm:inline">|</span>
                <span className="text-gray-600">Người bán:</span>
                <span className="text-gray-800 font-medium">Zoetic Fashion</span>
                <span className="text-gray-400 hidden sm:inline">|</span>
                <span className="text-gray-600">Đăng tải: <span className="text-gray-800">26/03/2021</span></span>
              </div>

              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600 text-xs sm:text-sm">( 5.50k đánh giá )</span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-base sm:text-xl font-bold">$</span>
                  </div>
                  <div>
                    <div className="text-[8px] sm:text-[10px] uppercase tracking-wider text-gray-500">Giá:</div>
                    <div className="text-sm sm:text-lg font-semibold text-gray-800">$120.40</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[8px] sm:text-[10px] uppercase tracking-wider text-gray-500">Đơn hàng:</div>
                    <div className="text-sm sm:text-lg font-semibold text-gray-800">2,234</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[8px] sm:text-[10px] uppercase tracking-wider text-gray-500">Tồn kho:</div>
                    <div className="text-sm sm:text-lg font-semibold text-gray-800">1,230</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-base sm:text-xl font-bold">$</span>
                  </div>
                  <div>
                    <div className="text-[8px] sm:text-[10px] uppercase tracking-wider text-gray-500">Doanh thu:</div>
                    <div className="text-sm sm:text-lg font-semibold text-gray-800">$60,645</div>
                  </div>
                </div>
              </div>

              {/* Sizes & Colors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Kích cỡ:</h3>
                  <div className="flex gap-1 sm:gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg font-medium text-xs sm:text-sm transition-all ${
                          selectedSize === size
                            ? 'bg-blue-100 text-blue-600 border-2 border-blue-500'
                            : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 md:mt-0">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Màu sắc:</h3>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {colors.map((colorItem, idx) => (
                      <button
                        key={idx}
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${colorItem.color} border-2 border-white ring-1 ring-gray-200 hover:scale-110 transition-transform shadow-sm`}
                        title={colorItem.name}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">Mô tả:</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Áo khoác Tommy Hilfiger nam sọc hồng. Được làm từ cotton. Thành phần chất liệu là 100% cotton hữu cơ. Đây là một trong những thương hiệu thiết kế hàng đầu thế giới và được công nhận quốc tế về việc tôn vinh phong cách Mỹ cổ điển, với thiết kế preppy độc đáo.
                </p>
              </div>

              {/* Features & Services */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Đặc điểm:</h3>
                  <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 mr-2"></span>
                      Tay dài
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 mr-2"></span>
                      Chất liệu cotton
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 mr-2"></span>
                      Đầy đủ các kích cỡ
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 mr-2"></span>
                      4 màu khác nhau
                    </li>
                  </ul>
                </div>

                <div className="mt-4 sm:mt-0">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Dịch vụ:</h3>
                  <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                       <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                       Đổi trả trong 10 ngày
                    </li>
                    <li className="flex items-center gap-2">
                       <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                       Thanh toán khi nhận hàng
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Product Description Tabs */}
            <div className="bg-white rounded border border-gray-200">
              <div className="px-4 sm:px-6 pt-4 sm:pt-6">
                <h3 className="text-sm sm:text-base font-semibold text-gray-700 mb-4">Mô tả sản phẩm:</h3>
                
                <div className="border-b border-gray-200">
                  <div className="flex gap-4 sm:gap-8 overflow-x-auto">
                    <button
                      onClick={() => setActiveTab('specification')}
                      className={`pb-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === 'specification'
                          ? 'text-teal-600 border-teal-600'
                          : 'text-gray-500 border-transparent hover:text-gray-700'
                      }`}
                    >
                      Thông số kỹ thuật
                    </button>
                    <button
                      onClick={() => setActiveTab('details')}
                      className={`pb-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === 'details'
                          ? 'text-teal-600 border-teal-600'
                          : 'text-gray-500 border-transparent hover:text-gray-700'
                      }`}
                    >
                      Chi tiết
                    </button>
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-4 sm:p-6">
                {activeTab === 'specification' ? (
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-700 w-1/3">Danh mục</td>
                        <td className="py-2 sm:py-3 text-xs sm:text-sm text-gray-600">Áo thun</td>
                      </tr>
                      <tr>
                        <td className="py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-700">Thương hiệu</td>
                        <td className="py-2 sm:py-3 text-xs sm:text-sm text-gray-600">Tommy Hilfiger</td>
                      </tr>
                      <tr>
                        <td className="py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-700">Màu sắc</td>
                        <td className="py-2 sm:py-3 text-xs sm:text-sm text-gray-600">Xanh dương</td>
                      </tr>
                      <tr>
                        <td className="py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-700">Chất liệu</td>
                        <td className="py-2 sm:py-3 text-xs sm:text-sm text-gray-600">Cotton</td>
                      </tr>
                      <tr>
                        <td className="py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-700">Trọng lượng</td>
                        <td className="py-2 sm:py-3 text-xs sm:text-sm text-gray-600">140 Gram</td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                   <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                     Thông tin chi tiết về sản phẩm Sweatshirt cao cấp của Tommy Hilfiger. Sản phẩm được thiết kế mang lại sự thoải mái tối đa với chất liệu 100% cotton hữu cơ. Đường may tinh tế, form dáng hiện đại phù hợp cho nhiều hoàn cảnh.
                   </p>
                )}
              </div>
            </div>

            {/* Ratings & Reviews */}
            <div className="bg-white rounded border border-gray-200 p-4 sm:p-6">
              <h3 className="text-sm sm:text-base font-semibold text-gray-700 mb-4">Đánh giá & Nhận xét</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6">
                {/* Rating Summary */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4].map((star) => (
                        <Star key={star} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />
                    </div>
                    <span className="text-base sm:text-lg font-bold text-gray-800">4.5 trên 5</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-4">Tổng 5.50k đánh giá</p>

                  {/* Rating Bars */}
                  <div className="space-y-2">
                    {ratingData.map((item) => (
                      <div key={item.stars} className="flex items-center gap-2 sm:gap-3">
                        <span className="text-xs text-gray-600 w-12">{item.stars} sao</span>
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              item.stars >= 3 ? 'bg-green-500' : item.stars === 2 ? 'bg-orange-400' : 'bg-red-500'
                            }`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 w-12 text-right">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews */}
                <div className="mt-6 md:mt-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-4">Đánh giá gần đây:</h4>
                  <div className="space-y-4">
                    {reviews.map((review, idx) => (
                      <div key={idx} className="border-b border-gray-50 pb-4 last:border-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                              ★ {review.rating}
                            </span>
                            <span className="text-xs font-medium text-gray-800">{review.name}</span>
                          </div>
                          <span className="text-[10px] text-gray-400">{review.date}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed italic">"{review.comment}"</p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 py-2 border border-gray-200 rounded text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                    Xem tất cả đánh giá
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}