"use client";

import { useState, useCallback } from "react";
import { ChatUser, Channel, ChatTab } from "../types";

// ============================================
// Mock Data
// ============================================

const MOCK_CHAT_USERS: ChatUser[] = [
  { name: "Lisa Parker", avatar: "👩", online: true, unread: 0 },
  { name: "Frank Thomas", avatar: "👨", online: true, unread: 8 },
  { name: "Clifford Taylor", avatar: "👨‍💼", online: false, unread: 0 },
  { name: "Janette Caster", avatar: "👩‍🦰", online: true, unread: 0 },
  { name: "Sarah Beattie", avatar: "👩", online: false, unread: 5 },
  { name: "Nellie Cornett", avatar: "👩‍🦱", online: false, unread: 2 },
  { name: "Chris Kiernan", avatar: "👨", online: false, unread: 0 },
  { name: "Edith Evans", avatar: "👩", online: false, unread: 0 },
  { name: "Joseph Siegel", avatar: "👨", online: false, unread: 0 },
];

const MOCK_CHANNELS: Channel[] = [
  { name: "Landing Design", unread: 7 },
  { name: "General", unread: 0 },
  { name: "Project Tasks", unread: 2 },
  { name: "Meeting", unread: 0 },
  { name: "Reporting", unread: 0 },
];

// ============================================
// useChat Hook
// ============================================

export const useChat = () => {
  const [chatUsers] = useState<ChatUser[]>(MOCK_CHAT_USERS);
  const [channels] = useState<Channel[]>(MOCK_CHANNELS);
  const [activeChat, setActiveChat] = useState("Lisa Parker");
  const [activeTab, setActiveTab] = useState<ChatTab>("chats");
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // ============================================
  // Computed State
  // ============================================

  // Lấy user đang active
  const activeUser = chatUsers.find((user) => user.name === activeChat);

  // Lọc user theo search
  const filteredChatUsers = chatUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lọc channel theo search
  const filteredChannels = channels.filter((channel) =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ============================================
  // Chat Actions
  // ============================================

  const handleChatSelect = useCallback((userName: string) => {
    setActiveChat(userName);
  }, []);

  const handleTabChange = useCallback((tab: ChatTab) => {
    setActiveTab(tab);
  }, []);

  const handleMessageChange = useCallback((value: string) => {
    setMessage(value);
  }, []);

  const handleSendMessage = useCallback(() => {
    if (message.trim()) {
      // Logic to send message would go here
      setMessage("");
    }
  }, [message]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleAddChat = useCallback(() => {
    // Logic to add new chat would go here
  }, []);

  const handleAddChannel = useCallback(() => {
    // Logic to add new channel would go here
  }, []);

  // ============================================
  // Return Hook State & Methods
  // ============================================

  return {
    // Data
    chatUsers,
    channels,
    activeUser,
    filteredChatUsers,
    filteredChannels,

    // State
    activeChat,
    activeTab,
    message,
    searchTerm,

    // Actions
    handleChatSelect,
    handleTabChange,
    handleMessageChange,
    handleSendMessage,
    handleSearchChange,
    handleAddChat,
    handleAddChannel,
  };
};
