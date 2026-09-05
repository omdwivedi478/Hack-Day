import React from 'react';
import { Award, Clock, ShoppingBag, Star } from 'lucide-react';

export const FarmerStats = ({ farmer }) => {
  const stats = [
    { label: 'Farm Land', value: `${farmer.acres || 12} Acres`, icon: Award },
    { label: 'Experience', value: `${farmer.experienceYears || 15} Years`, icon: Clock },
    { label: 'Orders Fulfilled', value: `${farmer.ordersCount || 128}+`, icon: ShoppingBag },
    { label: 'Farmer Rating', value: `${farmer.rating || 4.8} / 5.0`, icon: Star },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
      {stats.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs text-center"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto mb-2">
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white block leading-tight">
              {item.value}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
