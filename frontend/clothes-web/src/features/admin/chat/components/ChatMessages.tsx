import React from "react";

interface ChatMessagesProps {
  activeChat: string;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ activeChat }) => {
  return (
    <div className="flex-1 p-8 overflow-y-auto bg-gray-50 relative">
      {/* Pattern Background - Very Subtle */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='20' y='50' font-size='60' fill='%23000000' opacity='0.3'%3E%E2%80%9C%3C/text%3E%3Ctext x='20' y='90' font-size='60' fill='%23000000' opacity='0.3'%3E%E2%80%9C%3C/text%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "100px 100px",
          }}
        ></div>
      </div>

      {/* Empty State */}
      <div className="flex items-center justify-center h-full relative z-10">
        <div className="text-center text-gray-400">
          <div className="text-6xl mb-4">💬</div>
          <div className="text-lg font-normal text-gray-500">
            No messages yet
          </div>
          <div className="text-sm text-gray-400 mt-1">
            Start a conversation with {activeChat}
          </div>
        </div>
      </div>
    </div>
  );
};
