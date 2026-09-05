import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { Sparkles, Info } from 'lucide-react';
import { initialMarketPrices } from '../../data/mockMarketPrices';

export const PriceIntelligencePage = () => {
  const [selectedCommodity, setSelectedCommodity] = useState(initialMarketPrices[0]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with mandatory Demo Data Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Market Price Intelligence
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
              Demo Data
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Compare FarmDirect transparent contract pricing directly against APMC Mandi wholesale averages.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg text-xs text-slate-600 dark:text-slate-400">
          <Info className="w-4 h-4 text-primary shrink-0" />
          <span>Calculated from 14 regional wholesale APMCs</span>
        </div>
      </div>

      {/* Commodity KPI Comparison Cards matching prompt */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {initialMarketPrices.slice(0, 3).map((item) => {
          const isSelected = selectedCommodity.id === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setSelectedCommodity(item)}
              className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer shadow-xs ${
                isSelected
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-primary ring-2 ring-primary/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-primary/40'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {item.commodity}
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {item.differencePercent}%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">FarmDirect</span>
                  <span className="text-lg font-extrabold text-emerald-600">
                    ₹{item.farmDirectPrice}/{item.unit}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Market Average</span>
                  <span className="text-lg font-extrabold text-slate-500 line-through">
                    ₹{item.marketAverage}/{item.unit}
                  </span>
                </div>
              </div>

              <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between">
                <span>{item.mandiLocation}</span>
                <span className="font-semibold text-primary">Click to graph</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Chart & AI Recommendation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Price History Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                7-Day Price Comparison: {selectedCommodity.commodity}
              </h3>
              <p className="text-xs text-slate-500">
                FarmDirect stable price vs volatile mandi auction rates
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-emerald-600 rounded"></span>
                <span className="text-slate-800 dark:text-slate-200">FarmDirect Price</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-slate-400 rounded"></span>
                <span className="text-slate-500">APMC Mandi Average</span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={selectedCommodity.history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:stroke-slate-800" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    color: '#f8fafc',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(val, name) => [`₹${val}/kg`, name === 'farmDirect' ? 'FarmDirect' : 'Mandi Avg']}
                />
                <Line
                  type="monotone"
                  dataKey="farmDirect"
                  name="FarmDirect"
                  stroke="#16A34A"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#16A34A' }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="mandi"
                  name="Mandi Average"
                  stroke="#94A3B8"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 3, fill: '#94A3B8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Pricing Recommendation matching prompt */}
        <div className="lg:col-span-4 bg-gradient-to-br from-emerald-50/80 via-white to-white dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                FarmDirect AI Advisory
              </h4>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-900/60 shadow-2xs mb-4">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                Recommended Buying Range
              </span>
              <span className="text-lg font-extrabold text-emerald-700 dark:text-emerald-300">
                {selectedCommodity.recommendedRange}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {selectedCommodity.aiAdvisory}
            </p>
          </div>

          <div className="pt-3 border-t border-emerald-200/60 dark:border-emerald-900/40 text-[11px] text-slate-500">
            <span>Model confidence: <strong>94%</strong> based on 3-year seasonal rainfall & wholesale mandi volume telemetry.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
