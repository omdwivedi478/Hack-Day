import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorage, setStorage } from '../utils/storage';

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

  const logout = () => {
    setUser(buyerDefault);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isBuyer: user?.role === 'Buyer',
      isFarmer: user?.role === 'Farmer',
      switchRole,
      login,
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
