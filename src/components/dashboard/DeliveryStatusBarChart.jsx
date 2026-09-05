import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

const deliveryData = [
  { day: 'Mon', delivered: 42, inTransit: 18, delayed: 4 },
  { day: 'Tue', delivered: 55, inTransit: 22, delayed: 2 },
  { day: 'Wed', delivered: 38, inTransit: 28, delayed: 6 },
  { day: 'Thu', delivered: 68, inTransit: 15, delayed: 3 },
  { day: 'Fri', delivered: 74, inTransit: 24, delayed: 5 },
  { day: 'Sat', delivered: 82, inTransit: 19, delayed: 2 },
  { day: 'Sun', delivered: 48, inTransit: 12, delayed: 1 },
];

export const DeliveryStatusBarChart = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between h-full">
      {/* Header matching reference */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Delivery Status
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Weekly fulfillment performance
          </p>
        </div>

        {/* Legend pills */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span className="text-slate-600 dark:text-slate-300">Delivered</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span className="text-slate-600 dark:text-slate-300">In Transit</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="text-slate-600 dark:text-slate-300">Delayed</span>
          </div>
        </div>
      </div>

      {/* Grouped Bar Chart */}
      <div className="h-52 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={deliveryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:stroke-slate-800" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                borderColor: '#334155',
                color: '#f8fafc',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="delivered" fill="#16A34A" radius={[4, 4, 0, 0]} maxBarSize={12} />
            <Bar dataKey="inTransit" fill="#2563EB" radius={[4, 4, 0, 0]} maxBarSize={12} />
            <Bar dataKey="delayed" fill="#F59E0B" radius={[4, 4, 0, 0]} maxBarSize={12} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
