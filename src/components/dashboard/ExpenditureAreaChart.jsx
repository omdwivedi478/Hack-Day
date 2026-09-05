import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { ArrowUpRight } from 'lucide-react';

const weeklyData = [
  { day: 'Mon', amount: 1240, supply: 1400 },
  { day: 'Tue', amount: 1850, supply: 1650 },
  { day: 'Wed', amount: 1420, supply: 1500 },
  { day: 'Thu', amount: 2480, supply: 2100 },
  { day: 'Fri', amount: 2100, supply: 1950 },
  { day: 'Sat', amount: 2890, supply: 2600 },
  { day: 'Sun', amount: 1950, supply: 2000 },
];

const monthlyData = [
  { day: 'Week 1', amount: 8400, supply: 9100 },
  { day: 'Week 2', amount: 11200, supply: 10800 },
  { day: 'Week 3', amount: 14500, supply: 13900 },
  { day: 'Week 4', amount: 16800, supply: 15400 },
];

export const ExpenditureAreaChart = () => {
  const [period, setPeriod] = useState('weekly');
  const chartData = period === 'weekly' ? weeklyData : monthlyData;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between h-full">
      {/* Header matching reference */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Demand and Supply
          </h4>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
              ₹28,946 Lac
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full flex items-center">
              <ArrowUpRight className="w-3 h-3" />
              +22.06%
            </span>
          </div>
        </div>

        {/* Weekly / Monthly toggle matching reference */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-medium">
          <button
            onClick={() => setPeriod('weekly')}
            className={`px-3 py-1 rounded-md transition-colors ${
              period === 'weekly'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setPeriod('monthly')}
            className={`px-3 py-1 rounded-md transition-colors ${
              period === 'monthly'
                ? 'bg-primary text-white shadow-2xs font-semibold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Recharts Area with Green Gradient */}
      <div className="h-52 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16A34A" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#16A34A" stopOpacity={0.0} />
              </linearGradient>
            </defs>
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
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-900 text-white px-3 py-2 rounded-lg text-xs shadow-lg border border-slate-700">
                      <p className="font-semibold text-emerald-400 mb-1">{label}</p>
                      <p className="flex items-center justify-between gap-3">
                        <span className="text-slate-300">Procured:</span>
                        <span className="font-bold">₹{payload[0].value} Lac</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#16A34A"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorAmount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
