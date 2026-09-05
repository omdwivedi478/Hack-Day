import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorage, setStorage } from '../utils/storage';
import { apiClient } from '../utils/apiClient';

const buyerDefault = {
  id: 'user-buyer-1',
  name: 'Rohan Deshmukh',
  email: 'rohan.deshmukh@gmail.com',
  role: 'Buyer', // 'Buyer' | 'Farmer'
  avatar: 'RD',
  phone: '+91 98230 11223',
  city: 'Pune',
  state: 'Maharashtra',
  address: 'Flat 402, Green Meadows Residency, Shivaji Nagar, Pune, Maharashtra 411005'
};

const farmerDefault = {
  id: 'farmer-1',
  name: 'Rajesh Patel',
  email: 'rajesh@rajeshfarms.in',
  role: 'Farmer',
  avatar: 'RP',
  phone: '+91 98260 12489',
  farmName: 'Rajesh Organic Farms',
  location: 'Bhopal, Madhya Pradesh',
  state: 'Madhya Pradesh',
  acres: 12,
  experienceYears: 15,
  rating: 4.8,
  bankSettlement: 'State Bank of India (Ending in 4092)'
};

const USER_STORAGE_KEY = 'farmdirect_user';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStorage(USER_STORAGE_KEY, buyerDefault));

  useEffect(() => {
    setStorage(USER_STORAGE_KEY, user);
  }, [user]);

  // Attempt session restore if JWT token exists
  useEffect(() => {
    const checkAuth = async () => {
      const token = apiClient.getToken();
      if (!token) return;

      try {
        const res = await apiClient.get('/auth/me');
        if (res.success && res.user) {
          setUser(prev => ({
            ...prev,
            ...res.user,
            role: res.user.role || prev.role
          }));
        }
      } catch {
        // Fallback silently if offline
      }
    };

    checkAuth();
  }, []);

  const switchRole = (newRole) => {
    if (newRole === 'Farmer') {
      setUser(farmerDefault);
    } else {
      setUser(buyerDefault);
    }
  };

  const login = (userData) => {
    setUser({
      ...userData,
      avatar: userData.name ? userData.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'FD'
    });
  };

  const loginWithCredentials = async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      if (response.success && response.token) {
        apiClient.setToken(response.token);
        if (response.user) {
          login(response.user);
        }
        return { success: true, user: response.user };
      }
      return { success: false, message: response.message || 'Login failed' };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const registerWithCredentials = async (registerData) => {
    try {
      const response = await apiClient.post('/auth/register', registerData);
      if (response.success && response.token) {
        apiClient.setToken(response.token);
        if (response.user) {
          login(response.user);
        }
        return { success: true, user: response.user };
      }
      return { success: false, message: response.message || 'Registration failed' };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    apiClient.setToken(null);
    setUser(buyerDefault);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isBuyer: user?.role === 'Buyer',
      isFarmer: user?.role === 'Farmer',
      switchRole,
      login,
      loginWithCredentials,
      registerWithCredentials,
      logout,
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
