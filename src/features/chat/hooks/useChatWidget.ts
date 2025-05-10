import { useCallback, useEffect, useRef, useState } from 'react';

import { chatApi } from '../api/chatApi';

export type ChatMessage = {
  id: string;
  message: string;
  sender: 'user' | 'bot';
  createdAt: string;
};

const THREAD_ID_KEY = 'chat_thread_id';

export const useChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);

  // Load threadId từ localStorage khi mount
  useEffect(() => {
    const savedThreadId = localStorage.getItem(THREAD_ID_KEY);
    if (savedThreadId) setThreadId(savedThreadId);
  }, []);

  // Load lịch sử chat nếu có threadId
  useEffect(() => {
    const loadChatHistory = async () => {
      if (threadId && !isHistoryLoaded) {
        try {
          setLoading(true);
          const history = await chatApi.getChatHistory(threadId);
          const formattedMessages = chatApi.mapThreadMessageToChatMessage(history);
          setMessages(formattedMessages);
          setIsHistoryLoaded(true);
        } catch (error) {
          console.error('Failed to load chat history:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadChatHistory();
  }, [threadId, isHistoryLoaded]);

  // Scroll xuống cuối khi có tin nhắn mới
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim()) return;
    setLoading(true);
    
    // Thêm tin nhắn người dùng vào danh sách
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputValue,
      sender: 'user',
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    
    try {
      // Gọi API gửi tin nhắn
      const response = await chatApi.sendMessage(userMessage.message, threadId || undefined);
      
      // Lưu thread_id nếu chưa có
      if (response.thread_id && !threadId) {
        setThreadId(response.thread_id);
        localStorage.setItem(THREAD_ID_KEY, response.thread_id);
      }
      
      // Thêm phản hồi từ bot vào danh sách tin nhắn
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + '-bot',
          message: response.message,
          sender: 'bot',
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch {
      // Xử lý lỗi
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + '-err',
          message: 'Đã xảy ra lỗi. Vui lòng thử lại.',
          sender: 'bot',
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [inputValue, threadId]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSendMessage();
  }, [handleSendMessage]);

  return {
    isOpen,
    handleOpen,
    handleClose,
    messages,
    inputValue,
    handleInputChange,
    handleSendMessage,
    handleKeyDown,
    loading,
    messagesEndRef,
  };
}; 