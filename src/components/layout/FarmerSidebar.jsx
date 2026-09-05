import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ClipboardList,
  Wallet,
  LineChart,
  TrendingUp,
  UserCheck,
  Settings,
  HelpCircle,
  LogOut,
  Sprout,
  ArrowRightLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const FarmerSidebar = ({ isMobileOpen, onCloseMobile }) => {
  const { user, switchRole, logout } = useAuth();
  const navigate = useNavigate();

  const farmerNavItems = [
    { label: 'Farmer Dashboard', path: '/farmer/dashboard', icon: LayoutDashboard },
    { label: 'My Products', path: '/farmer/products', icon: Package },
    { label: 'Add Product', path: '/farmer/products/add', icon: PlusCircle },
    { label: 'Incoming Orders', path: '/farmer/orders', icon: ClipboardList },
    { label: 'Earnings & Payouts', path: '/farmer/earnings', icon: Wallet },
    { label: 'Market Prices', path: '/price-intelligence', icon: LineChart },
    { label: 'Demand Insights', path: '/demand-insights', icon: TrendingUp },
    { label: 'Farm Profile', path: '/farmer/profile', icon: UserCheck },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleSwitchRole = () => {
    switchRole('Buyer');
    navigate('/dashboard');
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
        {/* Brand Logo */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80">
          <NavLink
            to="/farmer/dashboard"
            className="flex items-center gap-2.5 group"
            onClick={onCloseMobile}
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                FarmDirect
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block"></span>
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block -mt-1 tracking-wider uppercase">
                Farmer Studio
              </span>
            </div>
          </NavLink>
        </div>

        {/* Role Switcher Pill */}
        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800/60 bg-emerald-50/50 dark:bg-emerald-950/20">
          <button
            onClick={handleSwitchRole}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500 transition-colors shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Mode: <strong className="text-emerald-700 dark:text-emerald-400 font-semibold">Farmer</strong></span>
            </div>
            <div className="flex items-center gap-1 text-slate-400 text-[11px]">
              <ArrowRightLeft className="w-3 h-3" />
              <span>To Buyer</span>
            </div>
          </button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
            Producer Portal
          </div>

          {farmerNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-xs font-semibold'
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
            <span>Support & Policies</span>
          </NavLink>

          {/* User Profile Mini Bar */}
          <div className="pt-2 flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-300">
                {user.avatar || 'RP'}
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate leading-tight">
                  {user.name}
                </p>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium truncate">
                  {user.farmName || 'Verified Farm'}
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
