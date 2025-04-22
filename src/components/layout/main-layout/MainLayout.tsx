import React from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from './Footer';
import { Header } from './Header';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useScrollToTop } from '@/hooks/useScrollToTop';

export const MainLayout: React.FC = () => {
  // Use the scroll to top hook
  useScrollToTop();
  console.log('test')
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="min-h-screen flex-1">
          <ScrollArea>        <Outlet /></ScrollArea>
      </main>
      <Footer />
    </div>
  );
}; 