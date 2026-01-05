'use client';

import React from 'react';
import { useChat } from '@/features/admin/chat/hooks';
import {
  ChatSidebarHeader,
  ChatTabs,
  ChatUserList,
  ChannelList,
  ChatMainHeader,
  ChatMessages,
  ChatInput
} from '@/features/admin/chat/components';

export default function ChatPage() {
  const {
    filteredChatUsers,
    filteredChannels,
    activeChat,
    activeTab,
    activeUser,
    message,
    searchTerm,
    handleChatSelect,
    handleTabChange,
    handleMessageChange,
    handleSendMessage,
    handleSearchChange,
    handleAddChat,
    handleAddChannel
  } = useChat();

  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <ChatSidebarHeader
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onAddChat={handleAddChat}
        />

        {/* Tabs */}
        <ChatTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'chats' && (
            <>
              <ChatUserList
                users={filteredChatUsers}
                activeChat={activeChat}
                onSelectChat={handleChatSelect}
                onAddChat={handleAddChat}
              />
              <ChannelList channels={filteredChannels} onAddChannel={handleAddChannel} />
            </>
          )}

          {activeTab === 'contacts' && (
            <ChatUserList
              users={filteredChatUsers}
              activeChat={activeChat}
              onSelectChat={handleChatSelect}
              onAddChat={handleAddChat}
            />
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <ChatMainHeader activeUser={activeUser} activeChat={activeChat} />

        {/* Chat Messages Area */}
        <ChatMessages activeChat={activeChat} />

        {/* Message Input */}
        <ChatInput
          message={message}
          onMessageChange={handleMessageChange}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
