import React, { useState } from 'react';
import { User, Bell, Moon, Sun, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';

export const SettingsPage = () => {
  const { user, setUser } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: user.name || 'Rohan Deshmukh',
    email: user.email || 'rohan.deshmukh@gmail.com',
    phone: user.phone || '+91 98230 11223',
    address: user.address || 'Flat 402, Green Meadows Residency, Shivaji Nagar, Pune, Maharashtra 411005',
    notificationsEmail: true,
    notificationsSMS: true,
    priceAlerts: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address
    }));
    showToast('Profile and preferences updated!', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      <div className="pb-3 border-b border-slate-200/80 dark:border-slate-800">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Account & App Settings
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Manage your personal profile, addresses, notification preferences and display theme.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <User className="w-4 h-4 text-emerald-600" />
            <span>Profile Details</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Active Role
              </label>
              <input
                type="text"
                readOnly
                value={`${user.role} (Toggle in top navigation menu)`}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 text-slate-500 cursor-not-allowed"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Primary Delivery Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Display & Appearance */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            {isDark ? <Moon className="w-4 h-4 text-emerald-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            <span>Appearance & Theme</span>
          </h2>

          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-slate-900 dark:text-white block">
                Dark Mode
              </span>
              <span className="text-slate-400">
                Current theme is {isDark ? 'Dark Mode' : 'Light Mode'}
              </span>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-primary"
            >
              Toggle to {isDark ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>

        {/* Notifications Preference */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card space-y-4 text-xs">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Bell className="w-4 h-4 text-emerald-600" />
            <span>Notification Preferences</span>
          </h2>

          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="font-medium text-slate-700 dark:text-slate-300">Harvest & Order Dispatches (Email)</span>
              <input
                type="checkbox"
                checked={formData.notificationsEmail}
                onChange={(e) => setFormData({ ...formData, notificationsEmail: e.target.checked })}
                className="w-4 h-4 accent-primary"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="font-medium text-slate-700 dark:text-slate-300">Delivery Driver SMS Updates</span>
              <input
                type="checkbox"
                checked={formData.notificationsSMS}
                onChange={(e) => setFormData({ ...formData, notificationsSMS: e.target.checked })}
                className="w-4 h-4 accent-primary"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="font-medium text-slate-700 dark:text-slate-300">Mandi Price Alert Notifications</span>
              <input
                type="checkbox"
                checked={formData.priceAlerts}
                onChange={(e) => setFormData({ ...formData, priceAlerts: e.target.checked })}
                className="w-4 h-4 accent-primary"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="md" icon={Save}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
