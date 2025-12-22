"use client";

import React from "react";

// Import các icon cần thiết từ file common Icons hoặc thư viện lucide-react
import { 
  Truck, 
  DollarSign, 
  Headset, 
  CreditCard 
} from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const ServiceInfo: React.FC = () => {
  // Sử dụng Hook để kích hoạt hiệu ứng Reveal khi cuộn trang
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  // Dữ liệu dịch vụ được cấu trúc hóa
  const services = [
    {
      icon: <Truck size={30} className="text-gray-900 mb-2" />,
      title: "Miễn phí vận chuyển",
      description: "Miễn phí vận chuyển cho đơn hàng trên £130",
    },
    {
      icon: <DollarSign size={30} className="text-gray-900 mb-2" />,
      title: "Đảm bảo hoàn tiền",
      description: "Trong vòng 30 ngày để đổi trả.",
    },
    {
      icon: <Headset size={30} className="text-gray-900 mb-2" />,
      title: "Hỗ trợ trực tuyến",
      description: "24 giờ mỗi ngày, 7 ngày mỗi tuần",
    },
    {
      icon: <CreditCard size={30} className="text-gray-900 mb-2" />,
      title: "Thanh toán linh hoạt",
      description: "Thanh toán bằng nhiều loại thẻ tín dụng",
    },
  ];

  return (
    <div 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={sectionRef as any}
      className={`max-w-7xl mx-auto border-t border-gray-200 mt-16 pt-8 pb-12 scroll-reveal ${
        isVisible ? "animate-reveal" : ""
      }`}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center group transition-transform duration-300 hover:scale-105"
          >
            {/* Hiển thị Icon */}
            {service.icon}
            
            <h5 className="text-sm font-semibold text-gray-800 uppercase tracking-tight">
              {service.title}
            </h5>
            
            <p className="text-xs text-gray-500 mt-1 max-w-[150px]">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceInfo;