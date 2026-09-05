import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';

export const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const initialRole = searchParams.get('role') === 'farmer' ? 'Farmer' : 'Buyer';

  const [mode, setMode] = useState(initialMode);
  const [role, setRole] = useState(initialRole);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    farmName: '',
    location: '',
    experienceYears: 5
  });

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = formData.name || (formData.email ? formData.email.split('@')[0] : (role === 'Farmer' ? 'Rajesh Patel' : 'Rohan Deshmukh'));

    login({
      name: displayName,
      email: formData.email || (role === 'Farmer' ? 'rajesh@rajeshfarms.in' : 'rohan.deshmukh@gmail.com'),
      role,
      farmName: formData.farmName || (role === 'Farmer' ? 'Rajesh Organic Farms' : ''),
      location: formData.location || 'Bhopal, MP',
      phone: formData.phone || '+91 98230 11223'
    });

    showToast(`Logged in successfully as ${role}!`, 'success');

    if (role === 'Farmer') {
      navigate('/farmer/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  const handleQuickDemo = (demoRole) => {
    if (demoRole === 'Farmer') {
      login({
        name: 'Rajesh Patel',
        email: 'rajesh@rajeshfarms.in',
        role: 'Farmer',
        farmName: 'Rajesh Organic Farms',
        location: 'Bhopal, Madhya Pradesh',
        phone: '+91 98260 12489'
      });
      showToast('Logged in as Farmer (Rajesh Patel)', 'success');
      navigate('/farmer/dashboard');
    } else {
      login({
        name: 'Rohan Deshmukh',
        email: 'rohan.deshmukh@gmail.com',
        role: 'Buyer',
        location: 'Pune, Maharashtra',
        phone: '+91 98230 11223'
      });
      showToast('Logged in as Buyer (Rohan Deshmukh)', 'success');
      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto py-8 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-card space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto shadow-sm">
            <Sprout className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            {mode === 'login' ? 'Welcome to FarmDirect' : 'Create an Account'}
          </h1>
          <p className="text-xs text-slate-500">
            {mode === 'login'
              ? 'Access transparent agricultural trade and fair pricing.'
              : 'Join the direct connection between farms and buyers.'}
          </p>
        </div>

        {/* Quick Demo Switcher Pills */}
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block mb-1.5 text-center">
            Instant Demo Sign-In
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('Buyer')}
              className="py-1.5 px-3 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-primary shadow-2xs transition-colors"
            >
              Demo Buyer
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('Farmer')}
              className="py-1.5 px-3 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:border-primary shadow-2xs transition-colors"
            >
              Demo Farmer
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Account Role Selector if Registering */}
          {mode === 'register' && (
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                I want to join as a:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('Buyer')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors ${
                    role === 'Buyer'
                      ? 'border-primary bg-emerald-50 dark:bg-emerald-950 text-primary-dark dark:text-emerald-300'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Consumer / Buyer
                </button>
                <button
                  type="button"
                  onClick={() => setRole('Farmer')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors ${
                    role === 'Farmer'
                      ? 'border-primary bg-emerald-50 dark:bg-emerald-950 text-primary-dark dark:text-emerald-300'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Farmer / Producer
                </button>
              </div>
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Rohan Deshmukh"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="rohan@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98230 11223"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          )}

          {/* Extra Fields if Farmer in Register mode */}
          {mode === 'register' && role === 'Farmer' && (
            <div className="space-y-3 p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
              <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block">
                Producer Profile Info
              </span>
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Farm / Collective Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sahyadri Organic Orchards"
                  value={formData.farmName}
                  onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Bhopal, MP"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Years Farming
                  </label>
                  <input
                    type="number"
                    placeholder="10"
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                Password
              </label>
              {mode === 'login' && (
                <span className="text-[10px] text-primary cursor-pointer hover:underline">
                  Forgot password?
                </span>
              )}
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <Button type="submit" variant="primary" size="md" className="w-full shadow-md mt-2">
            {mode === 'login' ? 'Sign In' : 'Complete Registration'}
          </Button>
        </form>

        {/* Toggle Mode */}
        <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-primary font-bold hover:underline"
              >
                Create Account
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-primary font-bold hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
