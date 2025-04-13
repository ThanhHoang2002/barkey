import { lazy, Suspense } from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import NotFoundPage from '@/components/errors/NotFoundPage';
import {MainLayout} from '@/components/layout/main-layout/MainLayout';

// Lazy loaded components
const HomePage = lazy(() => import('@/features/home/components/HomePage'));
const CategoryPage = lazy(() => import('@/features/categories/components/CategoryPage'));
const ProductsPage = lazy(() => import('@/features/products/components/ProductsPage'));
const ProductDetail = lazy(() => import('@/features/products/components/ProductDetail'));
const CartPage = lazy(() => import('@/features/cart/components/CartPage'));
const ContactPage = lazy(() => import('@/features/contact/components/ContactPage'));

// Loading component
const LoadingFallback = () => (
  <div className="flex min-h-[70vh] items-center justify-center">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

export const AppRouter = () => {
    const router = createBrowserRouter([
        {
            element: <MainLayout />,
            children: [
                {
                    path: '/',
                    element: (
                      <Suspense fallback={<LoadingFallback />}>
                        <HomePage />
                      </Suspense>
                    )
                },
                {
                    path: '/categories/:slug',
                    element: (
                      <Suspense fallback={<LoadingFallback />}>
                        <CategoryPage />
                      </Suspense>
                    )
                },
                {
                    path: '/products',
                    element: (
                      <Suspense fallback={<LoadingFallback />}>
                        <ProductsPage />
                      </Suspense>
                    )
                },
                {
                    path: '/products/:slug',
                    element: (
                      <Suspense fallback={<LoadingFallback />}>
                        <ProductDetail />
                      </Suspense>
                    )
                },
                {
                    path: '/cart',
                    element: (
                      <Suspense fallback={<LoadingFallback />}>
                        <CartPage />
                      </Suspense>
                    )
                },
                {
                    path: '/contact',
                    element: (
                      <Suspense fallback={<LoadingFallback />}>
                        <ContactPage />
                      </Suspense>
                    )
                }
            ],
            errorElement: <NotFoundPage/>,
        },
    
    ])
    return <RouterProvider router={router}/>
}