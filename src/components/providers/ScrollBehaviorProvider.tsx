import { ReactNode, useEffect } from 'react';

interface ScrollBehaviorProviderProps {
  children: ReactNode;
}

export const ScrollBehaviorProvider = ({ children }: ScrollBehaviorProviderProps) => {
  useEffect(() => {
    // Set default scroll behavior for the entire application
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      // Clean up when component unmounts
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return <>{children}</>;
}; 