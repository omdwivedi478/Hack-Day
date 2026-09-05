import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  icon: Icon,
  change = '+12.4%',
  period = 'from past week',
  iconColor = 'text-primary',
  iconBg = 'bg-primary-light dark:bg-emerald-950/60'
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-card transition-all duration-200 group">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-11 h-11 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center transition-transform group-hover:scale-105`}>
          {Icon && <Icon className="w-5 h-5 stroke-[2.2]" />}
        </div>

        {/* Change indicator pill matching reference */}
        {change && (
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-900/60">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>{change}</span>
          </div>
        )}
      </div>

      {/* Main value */}
      <div className="space-y-1">
        <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {value}
        </h3>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {title}
        </p>
      </div>

      {/* Comparison subtext */}
      {period && (
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">{change}</span> {period}
        </p>
      )}
    </div>
  );
};
