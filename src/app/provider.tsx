import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

import { ScrollBehaviorProvider } from '@/components/providers/ScrollBehaviorProvider';
import { Toaster } from '@/components/ui/toaster';
import { queryClient } from '@/lib/query-client';


export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          Loading...
        </div>
      }
    >    
      <ScrollBehaviorProvider>
        <QueryClientProvider client={queryClient}>
          {import.meta.env.DEV && <ReactQueryDevtools />}        
          {children}
          <Toaster /> 
        </QueryClientProvider>
      </ScrollBehaviorProvider>
    </React.Suspense>
  );
};
