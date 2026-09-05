import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Store,
  Users,
  ShoppingBag,
  CreditCard,
  LineChart,
  Users2,
  TrendingUp,
  Settings,
  HelpCircle,
  LogOut,
  Sprout,
  ArrowRightLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ isMobileOpen, onCloseMobile }) => {
  const { user, isBuyer, switchRole, logout } = useAuth();
  const navigate = useNavigate();

  const buyerNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Marketplace', path: '/marketplace', icon: Store },
    { label: 'Farmers', path: '/farmers', icon: Users },
    { label: 'Orders', path: '/orders', icon: ShoppingBag },
    { label: 'Transactions', path: '/transactions', icon: CreditCard },
    { label: 'Price Intelligence', path: '/price-intelligence', icon: LineChart },
    { label: 'Community Buying', path: '/community-buying', icon: Users2 },
    { label: 'Demand Insights', path: '/demand-insights', icon: TrendingUp },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleSwitchRole = () => {
    if (isBuyer) {
      switchRole('Farmer');
      navigate('/farmer/dashboard');
    } else {
      switchRole('Buyer');
      navigate('/dashboard');
    }
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-xs"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Logo matching reference */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80">
          <NavLink
            to="/"
            className="flex items-center gap-2.5 group"
            onClick={onCloseMobile}
          >
            <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                FarmDirect
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium block -mt-1 tracking-wider uppercase">
                Fair Produce
              </span>
            </div>
          </NavLink>
        </div>

        {/* Role Switcher Pill */}
        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-800/30">
          <button
            onClick={handleSwitchRole}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-primary/50 transition-colors shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span>Mode: <strong className="text-primary font-semibold">{user.role}</strong></span>
            </div>
            <div className="flex items-center gap-1 text-slate-400 text-[11px]">
              <ArrowRightLeft className="w-3 h-3" />
              <span>Switch</span>
            </div>
          </button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
            Main Navigation
          </div>

          {buyerNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-primary text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4 text-white/80" />}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-1 bg-slate-50/40 dark:bg-slate-900/40">
          <NavLink
            to="/settings"
            onClick={onCloseMobile}
            className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Help & Support</span>
          </NavLink>

          {/* User Profile Mini Bar */}
          <div className="pt-2 flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-primary-light dark:bg-emerald-950 text-primary-dark dark:text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0 border border-primary/20">
                {user.avatar || 'RD'}
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate leading-tight">
                  {user.name}
                </p>
                <p className="text-[11px] text-slate-400 capitalize truncate">
                  {user.role}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-md"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
