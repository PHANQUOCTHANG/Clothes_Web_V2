/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

// --- Dữ liệu hằng số ---
const CONTACT_METHODS = [
  {
    icon: MapPin,
    title: "Địa chỉ cửa hàng",
    detail: "216 Đại lộ Cách Mạng Tháng 8, Phường 10, Quận 3, TP.HCM",
  },
  {
    icon: Phone,
    title: "Điện thoại & Hỗ trợ",
    detail: "+84 901 234 567",
  },
  {
    icon: Mail,
    title: "Email liên hệ",
    detail: "support@megastore.vn",
  },
  {
    icon: Clock,
    title: "Giờ làm việc",
    detail: "Thứ Hai - Thứ Sáu: 9:00 - 18:00",
  },
];

interface ContactPageProps {
  createRipple: (event: React.MouseEvent<HTMLElement>) => void;
  setCurrentView: (view: string) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({
  createRipple,
  setCurrentView,
}) => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Chuyển đổi event để dùng ripple
    createRipple(e as unknown as React.MouseEvent<HTMLElement>);

    setStatusMessage("Cảm ơn bạn! Tin nhắn đã được gửi thành công.");
    setTimeout(() => setStatusMessage(null), 5000);
  };

  return (
    <section className="px-4 sm:px-6 max-w-7xl mx-auto pt-6 pb-20 overflow-hidden">
      {/* Breadcrumbs */}
      <div className="mb-8 text-sm text-gray-500">
        <button
          onClick={() => setCurrentView("home")}
          className="hover:text-red-600"
        >
          Trang Chủ
        </button>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900 font-semibold">Liên Hệ</span>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-3">
        Liên Hệ Với Chúng Tôi
      </h1>

      {/* Map Section */}
      <div className="mb-12 overflow-hidden rounded-lg shadow-xl">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.390886299105!2d106.68728987508493!3d10.781878889360814!2m3!1f0!2f0!0f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f205c06497f%3A0x647e3a985f5e557b!2zQ2jhu6MgQuG6v24gVGhDoG5o!5e0!3m2!1svi!2sbd!4v1703673752119!5m2!1svi!2sbd"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Map Placeholder"
        />
      </div>

      {/* Contact Form and Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Form (2/3 width on large screens) */}
        <div className="lg:col-span-2 p-6 bg-white border border-gray-100 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Gửi tin nhắn cho chúng tôi
          </h2>

          {statusMessage && (
            <div className="mb-4 p-4 bg-green-500 text-white rounded-md text-sm font-semibold">
              {statusMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Họ tên
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  placeholder="vidu@email.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Chủ đề
              </label>
              <input
                type="text"
                id="subject"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                placeholder="Vấn đề cần hỗ trợ"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nội dung tin nhắn
              </label>
              <textarea
                id="message"
                rows={4}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                placeholder="Nhập nội dung tin nhắn của bạn..."
              />
            </div>

            <button
              type="submit"
              className="bg-red-600 text-white px-8 py-3 text-sm font-semibold hover:bg-red-700 transition rounded-md shadow-md"
            >
              GỬI TIN NHẮN
            </button>
          </form>
        </div>

        {/* Contact Information (1/3 width on large screens) */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Thông tin cửa hàng
          </h2>

          {CONTACT_METHODS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg shadow-sm"
              >
                <Icon className="text-red-600 w-6 h-6 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-semibold text-gray-800">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600">{item.detail}</p>
                </div>
              </div>
            );
          })}

          {/* Note về Chat Support */}
          <div className="p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700 rounded-lg">
            <p className="text-xs font-semibold uppercase mb-1">
              Hỗ trợ trực tuyến
            </p>
            <p className="text-xs">
              Kỹ thuật viên của chúng tôi luôn sẵn sàng hỗ trợ bạn qua hệ thống
              Live Chat 24/7 ở góc màn hình.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};


export default ContactPage;
