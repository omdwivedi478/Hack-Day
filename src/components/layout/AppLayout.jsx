import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { FarmerSidebar } from './FarmerSidebar';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { FarmAssistantWidget } from '../ai/FarmAssistantWidget';
import { useAuth } from '../../context/AuthContext';

export const AppLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isFarmer } = useAuth();
  const location = useLocation();

  // Check if current route is within farmer studio
  const isFarmerRoute = location.pathname.startsWith('/farmer');
  const showFarmerSidebar = isFarmer || isFarmerRoute;

  return (
    <div className="min-h-screen bg-surface-bg dark:bg-slate-950 text-surface-text dark:text-slate-100 flex flex-col transition-colors duration-200">
      {/* Sidebar (Desktop fixed, mobile off-canvas drawer) */}
      {showFarmerSidebar ? (
        <FarmerSidebar
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />
      ) : (
        <Sidebar
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        {/* Top Header */}
        <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-24 lg:pb-12 max-w-7xl w-full mx-auto animate-fade-in">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation */}
        <MobileNav />

        {/* Global AI Assistant Floating Trigger */}
        <FarmAssistantWidget />
      </div>
    </div>
  );
};
