import React from "react";
import { Plus, Search } from "lucide-react";

interface ChatSidebarHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddChat: () => void;
}

export const ChatSidebarHeader: React.FC<ChatSidebarHeaderProps> = ({
  searchTerm,
  onSearchChange,
  onAddChat,
}) => {
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Chats</h2>
        <button
          onClick={onAddChat}
          className="w-8 h-8 bg-green-50 text-green-600 rounded flex items-center justify-center hover:bg-green-100 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search here..."
          className="w-full pl-10 pr-3 py-2.5 bg-gray-50 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 border-0 text-gray-700 placeholder-gray-400"
        />
      </div>
    </div>
  );
};
