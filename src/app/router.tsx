import { lazy, Suspense } from 'react';
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom';

import NotFoundPage from '@/components/errors/NotFoundPage';
import DashboardLayout from '@/components/layout/dashboard-layout';
import {MainLayout} from '@/components/layout/main-layout/MainLayout';

// Lazy loaded components
const HomePage = lazy(() => import('@/features/home/components/HomePage'));
const CategoryPage = lazy(() => import('@/features/categories/components/CategoryPage'));
const ProductsPage = lazy(() => import('@/features/products/components/ProductsPage'));
const ProductDetail = lazy(() => import('@/features/products/components/ProductDetail'));
const CartPage = lazy(() => import('@/features/cart/components/CartPage'));
const ContactPage = lazy(() => import('@/features/contact/components/ContactPage'));
const AboutPage = lazy(() => import('@/features/about/components/AboutPage'));
const DashboardPage = lazy(() => import('@/features/dashboard/pages/dashboard-page'));

// Loading component
const LoadingFallback = () => (
  <div className="flex min-h-[70vh] items-center justify-center">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

// Under construction page
const UnderConstructionPage = ({ title }: { title: string }) => (
  <div className="rounded-lg border border-border bg-card p-8">
    <h1 className="mb-4 text-2xl font-bold">{title}</h1>
    <p className="text-muted-foreground">
      This page is under construction. Come back later for more features.
    </p>
  </div>
);

export const AppRouter = () => {
    const router = createBrowserRouter([
        // Customer-facing routes
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
                    path: '/about',
                    element: (
                      <Suspense fallback={<LoadingFallback />}>
                        <AboutPage />
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
        },

        // Admin dashboard routes
        {
            path: '/admin',
            element: <Navigate to="/admin/dashboard" replace />,
        },
        {
            path: '/admin/dashboard',
            element: (
                <Suspense fallback={<LoadingFallback />}>
                    <DashboardPage />
                </Suspense>
            ),
        },
        {
            path: '/admin/products',
            element: (
                <DashboardLayout>
                    <UnderConstructionPage title="Products" />
                </DashboardLayout>
            ),
        },
        {
            path: '/admin/orders',
            element: (
                <DashboardLayout>
                    <UnderConstructionPage title="Orders" />
                </DashboardLayout>
            ),
        },
        {
            path: '/admin/customers',
            element: (
                <DashboardLayout>
                    <UnderConstructionPage title="Customers" />
                </DashboardLayout>
            ),
        },
        {
            path: '/admin/analytics',
            element: (
                <DashboardLayout>
                    <UnderConstructionPage title="Analytics" />
                </DashboardLayout>
            ),
        },
        {
            path: '/admin/settings',
            element: (
                <DashboardLayout>
                    <UnderConstructionPage title="Settings" />
                </DashboardLayout>
            ),
        },
        
        // Error route
        {
            path: '*',
            element: <NotFoundPage/>,
        },
    ])
    return <RouterProvider router={router}/>
}