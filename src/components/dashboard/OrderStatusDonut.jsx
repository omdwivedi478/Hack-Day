import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowUpRight } from 'lucide-react';

const data = [
  { name: 'Procurement Done', value: 200, color: '#16A34A', displayValue: '200 MT' },
  { name: 'Requirement', value: 500, color: '#2563EB', displayValue: '500 MT' },
  { name: 'Procurement Ongoing', value: 100, color: '#F97316', displayValue: '100 MT' },
  { name: 'Procurement Left', value: 200, color: '#059669', displayValue: '200 MT' },
];

export const OrderStatusDonut = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between h-full">
      {/* Header matching reference */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Order Status
          </h4>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-base font-extrabold text-slate-900 dark:text-slate-100">
              20%
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3 h-3" />
              Up from yesterday
            </span>
          </div>
        </div>

        {/* Dropdown filter badge */}
        <div className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg font-medium cursor-pointer">
          Order ID: 101036
        </div>
      </div>

      {/* Chart and Legend Layout matching reference */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center mt-4">
        {/* Donut Chart */}
        <div className="sm:col-span-6 h-48 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                formatter={(val, name) => [`${val} MT`, name]}
                contentStyle={{
                  backgroundColor: '#1e293b',
                  borderColor: '#334155',
                  color: '#f8fafc',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Pie
                data={data}
                innerRadius={52}
                outerRadius={75}
                paddingAngle={4}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Central Donut Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">
              1,000
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Total MT
            </span>
          </div>
        </div>

        {/* Legend matching reference layout */}
        <div className="sm:col-span-6 space-y-2.5">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-600 dark:text-slate-300 font-medium">
                  {item.name}
                </span>
              </div>
              <span className="font-bold text-slate-800 dark:text-slate-100">
                {item.displayValue}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
