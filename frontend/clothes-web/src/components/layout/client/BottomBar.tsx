"use client";

import React from "react";
import { MenuIcon } from "@/components/common/Icons";
import { useRouter } from "next/navigation";

interface MenuItem {
  name: string;
  view: string;
  link: string;
}

interface BottomBarProps {
  isScrolled: boolean;
  currentView: string;
  setCurrentView: (view: string) => void;
}

const NAV_MENU: MenuItem[] = [
  { name: "TRANG CHỦ", view: "home", link: "" },
  { name: "CỬA HÀNG", view: "shop", link: "shop" },
  { name: "BLOG", view: "blog", link: "blog" },
  { name: "LIÊN HỆ", view: "contact", link: "contact" },
];

const BottomBar: React.FC<BottomBarProps> = ({
  isScrolled,
  currentView,
  setCurrentView,
}) => {
  const categoryBtnStyles = isScrolled
    ? "bg-white text-gray-800 border-r border-gray-100 hover:bg-gray-100"
    : "bg-black text-white hover:bg-red-700";

  const iconStyles = isScrolled ? "text-gray-800" : "text-white";
  const router = useRouter();

  const handleClickTab = (item: MenuItem) => {
    setCurrentView(item.view);
    router.push(`/${item.link}`);
  };

  return (
    <nav
      className="border-t border-gray-100 bg-white shadow-sm transition-colors duration-300"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Nút danh mục sản phẩm (hiển thị trên desktop) */}
        <div
          className={`hidden lg:flex items-center w-64 px-6 py-3 cursor-pointer transition-all duration-300 group ${categoryBtnStyles} ml-6`}
          role="button"
          aria-haspopup="true"
        >
          <MenuIcon
            className={`h-5 w-5 mr-3 transition-colors ${iconStyles}`}
          />
          <span className="font-semibold text-xs tracking-wider uppercase">
            MUA SẮM THEO DANH MỤC
          </span>
        </div>

        {/* Menu điều hướng chính */}
        <nav className="flex-1 px-4 lg:px-0 ml-10">
          <ul className="flex space-x-6 lg:space-x-8 text-sm font-semibold text-gray-800 justify-center lg:justify-start">
            {NAV_MENU.map((item) => (
              <li key={item.name} className="relative group">
                <button
                  onClick={() => handleClickTab(item)}
                  className={`py-4 flex items-center uppercase transition duration-150 ${
                    currentView === item.view
                      ? "text-red-600"
                      : "text-gray-800 hover:text-red-600"
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ))}
            <li className="block lg:hidden relative group">
              <button className="py-4 flex items-center hover:text-red-600 transition uppercase text-sm font-semibold text-gray-800">
                Danh mục
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </nav>
  );
};

export default BottomBar;
