"use client";

import React from "react";
import { ArrowDownIcon } from "@/components/common/Icons";
import { SOCIAL_CHANNELS } from "@/data/mockHome";

interface TopBarProps {
  isScrolled: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ isScrolled }) => {
  return (
    <div
      className={`bg-red-600 text-white text-sm py-1.5 px-4 sm:px-6 flex justify-between items-center w-full transition-all duration-300 ease-in-out origin-top ${
        isScrolled ? "h-0 opacity-0 overflow-hidden py-0" : "h-auto opacity-100"
      }`}
      role="complementary"
    >
      <div className="flex items-center gap-3">
        <span className="bg-white text-red-600 text-xs font-bold px-1.5 py-0.5 rounded-sm uppercase shrink-0">
          HOT
        </span>
        {/* Thông báo khuyến mãi: Miễn phí vận chuyển */}
        <p className="text-sm">
          <span className="hidden sm:inline">
            Miễn phí vận chuyển nhanh cho đơn hàng trên $200!
          </span>
          <span className="sm:hidden text-xs">Freeship {">"} $200!</span>
        </p>
      </div>

      {/* Lựa chọn tiền tệ và liên kết mạng xã hội */}
      <div className="flex items-center gap-4">
        <button className="flex items-center hover:text-gray-200 transition-colors text-sm font-semibold group">
          USD
          <ArrowDownIcon className="ml-1 w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
        </button>

        <div className="hidden sm:block h-3 w-px bg-white/20" />

        <nav
          className="hidden md:flex items-center gap-3"
          aria-label="Social links"
        >
          {SOCIAL_CHANNELS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="opacity-75 hover:opacity-100 transition-all hover:scale-110"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TopBar;
