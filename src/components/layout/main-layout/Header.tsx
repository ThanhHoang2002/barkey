import { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';

import { AuthDialog } from '@/components/auth/auth-dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useCartStore } from '@/stores/cartStore';

const navigation = [
  { name: 'Trang chủ', href: '/' },
  { name: 'Bánh ngọt và Bánh mỳ', href: '/products' },
  { name: 'Bánh sinh nhật', href: '/categories/banh-sinh-nhat' },
  { name: 'Liên hệ', href: '/contact' },
];

export const Header = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCartStore();
  const { isAuthDialogOpen, authMode, openAuthDialog, closeAuthDialog, setAuthMode } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <header className={`sticky top-0 z-50 w-full transition-shadow ${isScrolled ? 'bg-white shadow-md' : 'bg-white'}`}>
      {/* Top Bar */}
      <div className="bg-primary py-2 text-white">
        <div className="container mx-auto flex justify-between px-4">
          <span className="text-sm">Hotline: 02438222228</span>
          <div className="flex gap-4">
            <button 
              onClick={() => openAuthDialog("login")} 
              className="text-sm hover:underline"
              aria-label="Đăng nhập"
              tabIndex={0}
            >
              Đăng nhập
            </button>
            <span className="text-sm">|</span>
            <button 
              onClick={() => openAuthDialog("register")} 
              className="text-sm hover:underline"
              aria-label="Đăng ký"
              tabIndex={0}
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary">Cosmo Bakery</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Cart & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden ${
          isMobileMenuOpen ? 'block' : 'hidden'
        } bg-white shadow-md`}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-base font-medium text-gray-700 transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-4">
              <Button
                className="w-full"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openAuthDialog("login");
                }}
              >
                Đăng nhập / Đăng ký
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
                asChild
              >
                <Link to="/cart">Giỏ hàng ({totalItems})</Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>

      {/* Auth Dialog */}
      <AuthDialog 
        isOpen={isAuthDialogOpen} 
        onClose={closeAuthDialog} 
        initialMode={authMode}
        onModeChange={setAuthMode}
      />
    </header>
  );
});
Header.displayName = 'Header';
