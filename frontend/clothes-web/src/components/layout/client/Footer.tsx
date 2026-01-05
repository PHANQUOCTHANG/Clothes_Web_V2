/* eslint-disable @next/next/no-img-element */
"use client";

import {
  ArrowRightIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  TwitterIcon,
} from "@/components/common/Icons";
import React from "react";

const FooterLinkColumn = ({
  title,
  links,
}: {
  title: string;
  links: string[];
}) => (
  <div>
    <h4 className="text-white font-bold text-sm mb-6 tracking-wider uppercase">
      {title}
    </h4>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link}>
          <a
            href="#"
            className="text-gray-400 text-sm hover:text-white transition"
          >
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer: React.FC = () => {
  const quickLinks = [
    "Về chúng tôi",
    "Chính sách bảo mật",
    "Điều khoản & Điều kiện",
    "Phản hồi khách hàng",
    "Tìm kiếm hàng đầu",
  ];
  const customerCare = [
    "Tài khoản của tôi",
    "Đăng nhập",
    "Giỏ hàng của tôi",
    "Danh sách yêu thích",
    "Thanh toán",
  ];
  const otherBusiness = [
    "Chương trình Đối tác",
    "Chương trình Cộng tác viên",
    "Bán sỉ Tất",
    "Bán sỉ Tất Hài",
    "Thông tin Giao hàng",
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-b border-gray-800 pb-8">
          {/* Cột: Thông tin nhanh */}
          <FooterLinkColumn title="TÌM KIẾM NHANH" links={quickLinks} />

          {/* Cột: Hỗ trợ khách hàng */}
          <FooterLinkColumn title="CHĂM SÓC KHÁCH HÀNG" links={customerCare} />

          {/* Cột: Kinh doanh khác */}
          <div className="col-span-2 md:col-span-1">
            <FooterLinkColumn title="KINH DOANH KHÁC" links={otherBusiness} />
          </div>

          {/* Cột: Bản tin và mạng xã hội */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-bold text-sm mb-6 tracking-wider uppercase">
              BẢN TIN (NEWSLETTER)
            </h4>
            {/* Form đăng ký bản tin */}
            <div className="flex mb-4 relative bg-white">
              <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="email"
                placeholder="Địa chỉ email của bạn"
                className="w-full pl-10 pr-10 py-3 text-sm text-gray-900 rounded-l-md focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              <button className="bg-white text-gray-900 px-3 py-3 rounded-r-md hover:bg-gray-200 transition">
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
            {/* Liên kết mạng xã hội */}
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram">
                <InstagramIcon className="text-gray-400 hover:text-white transition w-5 h-5" />
              </a>
              <a href="#" aria-label="Facebook">
                <FacebookIcon className="text-gray-400 hover:text-white transition w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter">
                <TwitterIcon className="text-gray-400 hover:text-white transition w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bản quyền và phương thức thanh toán */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 space-y-4 md:space-y-0">
          <p className="text-sm text-gray-400">
            © 2025 Megastore. Bảo lưu mọi quyền.
          </p>

          {/* Các biểu tượng phương thức thanh toán */}
          <div className="flex space-x-2 grayscale hover:grayscale-0 transition duration-300">
            <img
              src="https://placehold.co/40x25/FFFFFF/333333/png?text=Visa"
              alt="Visa"
              className="rounded"
            />
            <img
              src="https://placehold.co/40x25/FFFFFF/333333/png?text=Master"
              alt="Mastercard"
              className="rounded"
            />
            <img
              src="https://placehold.co/40x25/FFFFFF/333333/png?text=Amex"
              alt="Amex"
              className="rounded"
            />
            <img
              src="https://placehold.co/40x25/FFFFFF/333333/png?text=Pay"
              alt="Apple Pay"
              className="rounded"
            />
            <img
              src="https://placehold.co/40x25/FFFFFF/333333/png?text=GPay"
              alt="Google Pay"
              className="rounded"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
