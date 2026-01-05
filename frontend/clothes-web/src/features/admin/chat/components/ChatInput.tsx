import React from "react";
import { Smile, Send } from "lucide-react";

interface ChatInputProps {
  message: string;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  message,
  onMessageChange,
  onSendMessage,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 px-6 py-4">
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0 transition-colors">
          <Smile className="w-5 h-5 text-gray-500" />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2.5 bg-gray-50 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 border-0 text-gray-700 placeholder-gray-400"
        />
        <button
          onClick={onSendMessage}
          className="p-2.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex-shrink-0"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
