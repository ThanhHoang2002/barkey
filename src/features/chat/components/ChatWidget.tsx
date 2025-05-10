import { motion } from 'motion/react';
import React from 'react';

import { ChatModal } from './ChatModal';
import { useChatWidget } from '../hooks/useChatWidget';

export const ChatWidget: React.FC = () => {
  const {
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
  } = useChatWidget();

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3, type: 'spring' }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-black shadow-lg focus:outline-none focus:ring-2 focus:ring-black"
        aria-label="Mở chat hỗ trợ"
        tabIndex={0}
        onClick={handleOpen}
        onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => { if (e.key === 'Enter' || e.key === ' ') handleOpen(); }}
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 21l1.8-4A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </motion.button>
      <ChatModal
        isOpen={isOpen}
        messages={messages}
        inputValue={inputValue}
        loading={loading}
        messagesEndRef={messagesEndRef}
        onClose={handleClose}
        onInputChange={handleInputChange}
        onSendMessage={handleSendMessage}
        onKeyDown={handleKeyDown}
      />
    </>
  );
}; 