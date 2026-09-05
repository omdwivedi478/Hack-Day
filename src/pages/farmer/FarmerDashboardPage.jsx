import React from 'react';
import { Link } from 'react-router-dom';
import {
  Wallet,
  ShoppingBag,
  TrendingUp,
  Scale,
  PlusCircle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/dashboard/StatCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

const revenueHistory = [
  { month: 'Jan', revenue: 9500, orders: 18 },
  { month: 'Feb', revenue: 12400, orders: 22 },
  { month: 'Mar', revenue: 14200, orders: 26 },
  { month: 'Apr', revenue: 18420, orders: 32 },
  { month: 'May (Est)', revenue: 29730, orders: 44 },
];

export const FarmerDashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header matching prompt */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Good Morning, {user.name}</span>
            <span className="text-xl">👋</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {user.farmName || 'Rajesh Organic Farms'} • {user.location || 'Bhopal, MP'} • Producer Portal
          </p>
        </div>

        {/* Quick Action Button */}
        <Link to="/farmer/products/add">
          <Button variant="primary" size="sm" icon={PlusCircle} className="shadow-xs">
            Add Produce Listing
          </Button>
        </Link>
      </div>

      {/* 4 Statistics Cards matching specification */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value="₹84,250"
          icon={Wallet}
          change="+18.2%"
          period="vs previous cycle"
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50 dark:bg-emerald-950/60"
        />
        <StatCard
          title="Orders"
          value="142"
          icon={ShoppingBag}
          change="+12.5%"
          period="from active buyers"
          iconColor="text-blue-600"
          iconBg="bg-blue-50 dark:bg-blue-950/60"
        />
        <StatCard
          title="Produce Sold"
          value="1,284 kg"
          icon={Scale}
          change="+24.0%"
          period="harvest absorption"
          iconColor="text-amber-600"
          iconBg="bg-amber-50 dark:bg-amber-950/60"
        />
        <StatCard
          title="Average Price"
          value="₹31/kg"
          icon={TrendingUp}
          change="+45.0%"
          period="vs APMC Mandi Rate"
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50 dark:bg-emerald-950/60"
        />
      </div>

      {/* Revenue & Demand Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Performance Area Chart */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Monthly Net Farm Proceeds
              </h3>
              <p className="text-xs text-slate-500">Direct instant escrow payouts credited</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
              Zero Commission
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="farmRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A34A" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
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
                  formatter={(val) => [`₹${val}`, 'Net Proceeds']}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#16A34A"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#farmRevenueGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Incoming Orders to Prepare matching specification */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Orders to Prepare
              </h3>
              <Link to="/farmer/orders" className="text-xs font-semibold text-primary hover:underline">
                View All
              </Link>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 space-y-3">
              <div className="pt-2 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Fresh Tomatoes (50 kg)
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Buyer: Rohan Deshmukh • Order #FD-10294
                  </p>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold block mt-0.5">
                    Morning Pickup: 07:00 AM Tomorrow
                  </span>
                </div>

                <div className="text-right">
                  <Badge variant="warning">Processing</Badge>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mt-1">
                    ₹1,500 Net
                  </span>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Jyoti Potatoes (40 kg)
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Buyer: Green Leaf Co-op • Order #FD-10289
                  </p>
                  <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">
                    Ready for Crating
                  </span>
                </div>

                <div className="text-right">
                  <Badge variant="info">In Queue</Badge>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mt-1">
                    ₹800 Net
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link to="/farmer/orders">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Manage Order Fulfillment Queue
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
