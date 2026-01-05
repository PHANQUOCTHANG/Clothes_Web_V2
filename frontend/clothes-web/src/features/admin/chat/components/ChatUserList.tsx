import React from "react";
import { Plus } from "lucide-react";
import { ChatUser } from "../types";

interface ChatUserListProps {
  users: ChatUser[];
  activeChat: string;
  onSelectChat: (userName: string) => void;
  onAddChat: () => void;
}

export const ChatUserList: React.FC<ChatUserListProps> = ({
  users,
  activeChat,
  onSelectChat,
  onAddChat,
}) => {
  return (
    <>
      {/* Direct Messages Section */}
      <div className="px-4 py-3 bg-white">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            DIRECT MESSAGES
          </h3>
          <button
            onClick={onAddChat}
            className="w-6 h-6 bg-green-50 text-green-600 rounded flex items-center justify-center hover:bg-green-100 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Chat Users */}
      {users.map((user, idx) => (
        <div
          key={idx}
          onClick={() => onSelectChat(user.name)}
          className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
            activeChat === user.name ? "bg-blue-50" : "hover:bg-gray-50"
          }`}
        >
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-lg">
              {user.avatar}
            </div>
            {user.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-normal text-gray-800 truncate">
              {user.name}
            </div>
          </div>
          {user.unread > 0 && (
            <div className="bg-gray-600 text-white text-xs font-medium px-2 py-0.5 rounded-full min-w-[20px] text-center">
              {user.unread}
            </div>
          )}
        </div>
      ))}
    </>
  );
};
