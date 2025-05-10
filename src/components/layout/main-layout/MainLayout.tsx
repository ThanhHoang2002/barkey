import React from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from './Footer';
import { Header } from './Header';
import { ChatWidget } from '../../../features/chat/components/ChatWidget';

import { ScrollArea } from '@/components/ui/scroll-area';
import { AuthDialog } from '@/features/auth/components/AuthDialog';
import { useAuthFormStore } from '@/features/auth/stores/authFormStore';
import { useScrollToTop } from '@/hooks/useScrollToTop';

export const MainLayout: React.FC = () => {
  // Use the scroll to top hook
    const { isOpen, setIsOpen } = useAuthFormStore();

  useScrollToTop();
  console.log('test')
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="min-h-screen flex-1">
          <ScrollArea>        <Outlet /></ScrollArea>
      </main>
            {isOpen && <AuthDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />}

      <Footer />
      <ChatWidget />
    </div>
  );
}; 