import React from "react";
import { Search, Info, MoreVertical } from "lucide-react";
import { ChatUser } from "../types";

interface ChatMainHeaderProps {
  activeUser: ChatUser | undefined;
  activeChat: string;
}

export const ChatMainHeader: React.FC<ChatMainHeaderProps> = ({
  activeUser,
  activeChat,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-lg">
            {activeUser?.avatar}
          </div>
          {activeUser?.online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        <div>
          <div className="text-base font-medium text-gray-900">
            {activeChat}
          </div>
          <div className="text-xs text-green-600 font-normal">Online</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Search className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Info className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};
