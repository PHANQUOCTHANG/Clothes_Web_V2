"use client";

import React, { useState, useEffect, useRef, FormEvent } from "react";
import { Headset, X, SendHorizontal } from "lucide-react"; // Giả định dùng lucide-react

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  time: string;
}

interface LiveChatModalProps {
  isChatOpen: boolean;
  toggleChat: () => void;
}

// Component con: Hiển thị một tin nhắn trong cuộc hội thoại
const ChatMessage: React.FC<Message> = ({ text, sender, time }) => {
  const isUser = sender === "user";
  return (
    <div className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2`}>
      <div
        className={`max-w-[85%] p-3 rounded-2xl shadow-sm relative ${
          isUser 
            ? "bg-red-600 text-white rounded-br-none" 
            : "bg-white border border-gray-100 text-gray-800 rounded-tl-none"
        }`}
      >
        <p className="text-sm leading-relaxed">{text}</p>
        <span className={`text-[10px] block mt-1 opacity-70 ${isUser ? "text-right" : "text-left"}`}>
          {time}
        </span>
      </div>
    </div>
  );
};

// Component con: Hiệu ứng ba chấm chỉ bot đang gõ
const TypingIndicator = () => (
  <div className="flex mb-4 justify-start animate-pulse">
    <div className="bg-gray-100 text-gray-500 rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-1">
      <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
    </div>
  </div>
);

// Component chính: Modal chat trực tiếp
export const LiveChatModal: React.FC<LiveChatModalProps> = ({ isChatOpen, toggleChat }) => {
  // Danh sách tin nhắn trong cuộc hội thoại
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Chào mừng đến với Megastore! Tôi có thể giúp gì cho bạn hôm nay?",
      sender: "bot",
      time: "9:00 AM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Lấy thời gian hiện tại theo định dạng Việt Nam
  const getCurrentTime = () => 
    new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });

  // Cuộn xuống dưới cùng khi có tin nhắn mới
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  // Tự động trả lời từ bot
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.sender === "user") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsTyping(true);
      const timer = setTimeout(() => {
        const botReply: Message = {
          id: Date.now(),
          text: "Cảm ơn bạn. Chúng tôi đã nhận được thông tin và sẽ phản hồi ngay lập tức! (Bot tự động)",
          sender: "bot",
          time: getCurrentTime(),
        };
        setMessages((prev) => [...prev, botReply]);
        setIsTyping(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  // Xử lý gửi tin nhắn
  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now(),
      text: newMessage.trim(),
      sender: "user",
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setNewMessage("");
  };

  return (
    <div
      className={`fixed bottom-24 right-6 w-[340px] h-[480px] bg-white rounded-2xl shadow-2xl flex flex-col z-100 transition-all duration-300 origin-bottom-right border border-gray-100 overflow-hidden ${
        isChatOpen ? "scale-100 opacity-100 translate-y-0" : "scale-90 opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      {/* Phần đầu: Tiêu đề và nút đóng */}
      <header className="p-4 bg-red-600 text-white flex items-center justify-between shadow-lg shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Headset className="w-6 h-6" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 border-2 border-red-600 rounded-full" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider">Hỗ trợ trực tuyến</h3>
            <p className="text-[10px] text-red-100 font-medium">
              {isTyping ? "Đang soạn tin nhắn..." : "Sẵn sàng trợ giúp"}
            </p>
          </div>
        </div>
        <button onClick={toggleChat} className="p-1 hover:bg-white/20 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>
      </header>

      {/* Phần giữa: Danh sách tin nhắn */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50/50 custom-scrollbar">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} {...msg} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Phần cuối: Form nhập tin nhắn */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
        <input
          type="text"
          placeholder="Nhập câu hỏi của bạn..."
          className="flex-1 px-4 py-2.5 text-sm bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-red-500/20 focus:bg-white outline-none transition-all disabled:opacity-50"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={isTyping}
        />
        <button
          type="submit"
          disabled={isTyping || !newMessage.trim()}
          className="p-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all disabled:bg-gray-300 shadow-md shadow-red-200"
        >
          <SendHorizontal className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default LiveChatModal;