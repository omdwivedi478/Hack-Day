import React from 'react';

export const SkeletonLoader = ({ type = 'card', count = 4 }) => {
  const items = Array.from({ length: count });

  if (type === 'card') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {items.map((_, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-100 dark:border-slate-800 animate-pulse">
            <div className="w-full aspect-[4/3] bg-slate-200 dark:bg-slate-700 rounded-lg mb-3"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-slate-100 dark:bg-slate-700/60 rounded w-1/2 mb-3"></div>
            <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-3"></div>
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'stat') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((_, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-100 dark:border-slate-800 animate-pulse">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
              <div className="w-16 h-5 rounded-full bg-slate-100 dark:bg-slate-700/60"></div>
            </div>
            <div className="h-7 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-slate-100 dark:bg-slate-700/60 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800 p-4 space-y-3 animate-pulse">
        {items.map((_, i) => (
          <div key={i} className="h-12 bg-slate-100 dark:bg-slate-700/50 rounded-lg w-full"></div>
        ))}
      </div>
    );
  }

  return <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"></div>;
};
