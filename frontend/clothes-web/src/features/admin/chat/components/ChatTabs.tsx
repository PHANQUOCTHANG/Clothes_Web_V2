import React from "react";
import { ChatTab } from "../types";

interface ChatTabsProps {
  activeTab: ChatTab;
  onTabChange: (tab: ChatTab) => void;
}

export const ChatTabs: React.FC<ChatTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex border-b border-gray-200">
      <button
        onClick={() => onTabChange("chats")}
        className={`flex-1 py-3 text-sm font-medium relative transition-colors ${
          activeTab === "chats"
            ? "text-green-600"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        Chats
        {activeTab === "chats" && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
        )}
      </button>
      <button
        onClick={() => onTabChange("contacts")}
        className={`flex-1 py-3 text-sm font-medium relative transition-colors ${
          activeTab === "contacts"
            ? "text-green-600"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        Contacts
        {activeTab === "contacts" && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
        )}
      </button>
    </div>
  );
};
