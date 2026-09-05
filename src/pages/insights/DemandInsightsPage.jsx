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
import {
  Sparkles,
  Lightbulb
} from 'lucide-react';
import { initialDemandInsights } from '../../data/mockDemandInsights';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

export const DemandInsightsPage = () => {
  const { forecasts, monthlyDemandTrends, aiRecommendations } = initialDemandInsights;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Demand Forecast & Sowing Insights
            </h1>
            <Badge variant="success">AI Model Active</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Predictive institutional and consumer produce consumption to guide grower planting cycles.
          </p>
        </div>
      </div>

      {/* Demand Cards Grid matching specification */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {forecasts.slice(0, 4).map((item, idx) => {
          const isPositive = item.changePercent > 0;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-card transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {item.commodity}
                </span>
                <Badge variant={item.demandLevel === 'High' ? 'success' : item.demandLevel === 'Medium' ? 'info' : 'warning'}>
                  {item.demandLevel} Demand
                </Badge>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className={`text-2xl font-black ${isPositive ? 'text-emerald-600' : 'text-amber-500'}`}>
                  {isPositive ? `+${item.changePercent}%` : `${item.changePercent}%`}
                </span>
                <span className="text-xs text-slate-400 font-medium">YoY projected</span>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                {item.primaryDriver}
              </p>

              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
                <span>Target: <strong>{item.projectedNeed}</strong></span>
                <span>{item.confidence}% confidence</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Demand Trend Chart & AI Insights Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Projected Monthly Volume Trends (MT)
              </h3>
              <p className="text-xs text-slate-500">
                Institutional & wholesale consumer appetite over the next two quarters
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Tomatoes
              </span>
              <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Onions
              </span>
              <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Potatoes
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyDemandTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:stroke-slate-800" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    color: '#f8fafc',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(val) => [`${val} MT`, 'Volume']}
                />
                <Bar dataKey="tomatoes" fill="#16A34A" radius={[4, 4, 0, 0]} maxBarSize={16} />
                <Bar dataKey="onions" fill="#2563EB" radius={[4, 4, 0, 0]} maxBarSize={16} />
                <Bar dataKey="potatoes" fill="#F59E0B" radius={[4, 4, 0, 0]} maxBarSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Recommendations Card matching specification */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  FarmDirect AI Recommendations
                </h4>
                <p className="text-[11px] text-slate-400">Actionable intelligence for growers & buyers</p>
              </div>
            </div>

            <div className="space-y-3.5">
              {aiRecommendations.map((rec, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{rec.title}</span>
                    </h5>
                    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.2 rounded">
                      {rec.urgency}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    {rec.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => alert('Exporting full seasonal agronomic insights report...')}
            >
              View Full Insights & Sowing Calendar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
