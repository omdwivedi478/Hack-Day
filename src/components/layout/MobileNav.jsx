import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Store, ShoppingBag, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export const MobileNav = () => {
  const { itemCount } = useCart();
  const { isBuyer } = useAuth();

  const navItems = isBuyer
    ? [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Marketplace', path: '/marketplace', icon: Store },
        { label: 'Orders', path: '/orders', icon: ShoppingBag },
        { label: 'Cart', path: '/cart', icon: ShoppingCart, badge: itemCount },
        { label: 'Settings', path: '/settings', icon: User },
      ]
    : [
        { label: 'Studio', path: '/farmer/dashboard', icon: LayoutDashboard },
        { label: 'Products', path: '/farmer/products', icon: Store },
        { label: 'Orders', path: '/farmer/orders', icon: ShoppingBag },
        { label: 'Earnings', path: '/farmer/earnings', icon: ShoppingCart },
        { label: 'Profile', path: '/farmer/profile', icon: User },
      ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 shadow-lg safe-area-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] font-medium transition-colors relative ${
                  isActive
                    ? 'text-primary font-semibold dark:text-primary-light'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-primary stroke-[2.5]' : 'stroke-[1.75]'}`} />
                    {item.badge > 0 && (
                      <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
