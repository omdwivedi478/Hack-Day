import React from 'react';
import { Check } from 'lucide-react';

export const OrderTimeline = ({ timeline = [] }) => {
  return (
    <div className="py-2">
      <div className="relative">
        {timeline.map((step, idx) => {
          const isLast = idx === timeline.length - 1;
          const isCompleted = step.completed;
          const isCurrent = step.current;

          return (
            <div key={idx} className="flex items-start gap-4 relative pb-8 last:pb-0">
              {/* Connecting line */}
              {!isLast && (
                <div
                  className={`absolute left-4 top-8 -bottom-0 w-0.5 -ml-[1px] transition-colors ${
                    isCompleted ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                />
              )}

              {/* Status Circle indicator */}
              <div className="relative z-10 shrink-0">
                {isCompleted ? (
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                ) : isCurrent ? (
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-2 border-emerald-500 flex items-center justify-center animate-pulse">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-600"></div>
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-300 dark:border-slate-700 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                  </div>
                )}
              </div>

              {/* Step info */}
              <div className="flex-1 pt-0.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4
                    className={`text-sm font-bold ${
                      isCompleted || isCurrent
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {step.step}
                  </h4>
                  <span className="text-xs text-slate-400 font-medium">
                    {step.time}
                  </span>
                </div>
                {step.description && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
