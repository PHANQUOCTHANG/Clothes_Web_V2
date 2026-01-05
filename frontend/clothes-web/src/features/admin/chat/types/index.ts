// ============================================
// Chat Types & Interfaces
// ============================================

export interface ChatUser {
  name: string;
  avatar: string;
  online: boolean;
  unread: number;
}

export interface Channel {
  name: string;
  unread: number;
}

export interface ChatMessage {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isOwn?: boolean;
}

export type ChatTab = "chats" | "contacts";

export interface ChatState {
  activeChat: string;
  activeTab: ChatTab;
  message: string;
  searchTerm: string;
}
