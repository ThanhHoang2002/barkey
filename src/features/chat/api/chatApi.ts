import { ChatMessage } from '../hooks/useChatWidget';

export interface ChatThreadMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
  metadata: {
    user_id?: string;
    agent?: string;
  };
}

export interface SendChatRequest {
  message: string;
  thread_id?: string;
  user_id: string;
  auth_token: string;
}

export interface SourceDocument {
  content: string;
  metadata: Record<string, unknown>;
}

export interface ChatResponse {
  message: string;
  source_documents: SourceDocument[];
  thread_id: string;
}

const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0dWFubnYiLCJwZXJtaXNzaW9uIjpbIlJPTEVfYWRtaW4iXSwiZXhwIjoxNzUyNjU2ODgwLCJpYXQiOjE3NDQwMTY4ODAsInVzZXIiOnsiaWQiOjEsInVzZXJuYW1lIjoidHVhbm52IiwibmFtZSI6Ik5ndXnhu4VuIFbEg24gVHXhuqVuIn19.XyP2aMpPpn1Q7ltzxcmS3s6CaX5oJk7k8jlJeIrR9UcNKH-ayQVHV9Aa6QeXvYYuRnAokbjdWaaYYmIQ8juzNA';
const USER_ID = '1';

const API_BASE_URL = '/api';

export const chatApi = {
  // Gửi tin nhắn chat
  sendMessage: async (message: string, threadId?: string): Promise<ChatResponse> => {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        thread_id: threadId,
        user_id: USER_ID,
        auth_token: AUTH_TOKEN,
      } as SendChatRequest),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return response.json();
  },

  // Lấy lịch sử chat
  getChatHistory: async (threadId: string): Promise<ChatThreadMessage[]> => {
    const response = await fetch(`${API_BASE_URL}/threads/${threadId}/history`, {
      headers: {
        'Authorization': AUTH_TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get chat history');
    }

    return response.json();
  },

  // Chuyển đổi dữ liệu từ API thành format của ứng dụng
  mapThreadMessageToChatMessage: (messages: ChatThreadMessage[]): ChatMessage[] => {
    return messages.map(msg => ({
      id: msg.id,
      message: msg.content,
      sender: msg.role === 'user' ? 'user' : 'bot',
      createdAt: msg.created_at,
    }));
  }
}; 