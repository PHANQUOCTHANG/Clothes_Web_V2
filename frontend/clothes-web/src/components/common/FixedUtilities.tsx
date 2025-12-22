"use client";

import React from "react";
import { ArrowUpIcon, ChatIcon, XIcon } from "./Icons";

interface FixedUtilitiesProps {
  /** Trạng thái hiển thị của nút cuộn lên đầu trang */
  isScrollTopVisible: boolean;
  /** Trạng thái đóng/mở của cửa sổ chat */
  isChatOpen: boolean;
  /** Hàm xử lý đóng/mở chat */
  toggleChat: () => void;
}

const FixedUtilities: React.FC<FixedUtilitiesProps> = ({
  isScrollTopVisible,
  isChatOpen,
  toggleChat,
}) => {
  /**
   * Cuộn trang lên đầu một cách mượt mà
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-100 flex flex-col items-end space-y-3">
      {/* Nút cuộn lên đầu trang */}
      <button
        onClick={scrollToTop}
        className={`
          w-12 h-12 bg-black text-white rounded-full shadow-xl 
          flex items-center justify-center transition-all duration-300 transform
          ${
            isScrollTopVisible
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible translate-y-10"
          }
          hover:bg-red-600 hover:-translate-y-1
        `}
        aria-label="Cuộn lên đầu trang"
      >
        <ArrowUpIcon className="w-5 h-5" />
      </button>

      {/* Nút chat trực tiếp */}
      <button
        onClick={toggleChat}
        className={`w-14 h-14 text-white rounded-full shadow-2xl flex items-center justify-center transition duration-300 transform 
          ${
            isChatOpen
              ? "bg-red-600 hover:bg-red-700 rotate-90 scale-110"
              : "bg-blue-500 hover:bg-blue-600 hover:scale-110"
          }`}
        aria-label={isChatOpen ? "Đóng chat" : "Trò chuyện trực tuyến"}
      >
        {isChatOpen ? (
          <XIcon className="w-7 h-7" />
        ) : (
          <ChatIcon className="w-7 h-7 fill-white stroke-white" />
        )}
      </button>
    </div>
  );
};

export default FixedUtilities;
