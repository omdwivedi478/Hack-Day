import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { MarketplaceProvider } from './context/MarketplaceContext';
import { CartProvider } from './context/CartContext';

import { AppLayout } from './components/layout/AppLayout';

// Public & Landing
import { LandingPage } from './pages/landing/LandingPage';
import { AuthPage } from './pages/auth/AuthPage';

// Buyer Portal Pages
import { BuyerDashboard } from './pages/buyer/BuyerDashboard';
import { CartPage } from './pages/buyer/CartPage';
import { CheckoutPage } from './pages/buyer/CheckoutPage';
import { OrdersPage } from './pages/buyer/OrdersPage';
import { OrderDetailPage } from './pages/buyer/OrderDetailPage';
import { TransactionsPage } from './pages/buyer/TransactionsPage';

// Marketplace Pages
import { MarketplacePage } from './pages/marketplace/MarketplacePage';
import { ProductDetailPage } from './pages/marketplace/ProductDetailPage';

// Profiles & Directories
import { FarmersPage } from './pages/profile/FarmersPage';
import { FarmerProfilePage } from './pages/profile/FarmerProfilePage';

// Insights & Community
import { PriceIntelligencePage } from './pages/insights/PriceIntelligencePage';
import { DemandInsightsPage } from './pages/insights/DemandInsightsPage';
import { CommunityBuyingPage } from './pages/community/CommunityBuyingPage';

// Settings
import { SettingsPage } from './pages/settings/SettingsPage';

// Farmer Portal Pages
import { FarmerDashboardPage } from './pages/farmer/FarmerDashboardPage';
import { FarmerProductsPage } from './pages/farmer/FarmerProductsPage';
import { AddProductPage } from './pages/farmer/AddProductPage';
import { FarmerOrdersPage } from './pages/farmer/FarmerOrdersPage';
import { FarmerEarningsPage } from './pages/farmer/FarmerEarningsPage';
import { FarmerProfileEditPage } from './pages/farmer/FarmerProfileEditPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <MarketplaceProvider>
            <CartProvider>
              <BrowserRouter>
                <Routes>
                  {/* Main Application Shell with Sidebar, Header & Mobile Nav */}
                  <Route element={<AppLayout />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/dashboard" element={<BuyerDashboard />} />
                    <Route path="/marketplace" element={<MarketplacePage />} />
                    <Route path="/marketplace/:id" element={<ProductDetailPage />} />
                    <Route path="/farmers" element={<FarmersPage />} />
                    <Route path="/farmers/:id" element={<FarmerProfilePage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/orders/:id" element={<OrderDetailPage />} />
                    <Route path="/transactions" element={<TransactionsPage />} />
                    <Route path="/price-intelligence" element={<PriceIntelligencePage />} />
                    <Route path="/community-buying" element={<CommunityBuyingPage />} />
                    <Route path="/demand-insights" element={<DemandInsightsPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/login" element={<AuthPage />} />
                    <Route path="/register" element={<AuthPage />} />
                    <Route path="/settings" element={<SettingsPage />} />

                    {/* Farmer Portal Routes */}
                    <Route path="/farmer/dashboard" element={<FarmerDashboardPage />} />
                    <Route path="/farmer/products" element={<FarmerProductsPage />} />
                    <Route path="/farmer/products/add" element={<AddProductPage />} />
                    <Route path="/farmer/orders" element={<FarmerOrdersPage />} />
                    <Route path="/farmer/earnings" element={<FarmerEarningsPage />} />
                    <Route path="/farmer/profile" element={<FarmerProfileEditPage />} />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </CartProvider>
          </MarketplaceProvider>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
