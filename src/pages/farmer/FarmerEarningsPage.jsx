import React from 'react';
import { Building } from 'lucide-react';
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
import { Badge } from '../../components/common/Badge';

const monthlyEarningsData = [
  { month: 'Dec', earnings: 14200 },
  { month: 'Jan', earnings: 16800 },
  { month: 'Feb', earnings: 15400 },
  { month: 'Mar', earnings: 19400 },
  { month: 'Apr', earnings: 18420 },
  { month: 'May (Current)', earnings: 24800 },
];

const settlements = [
  { id: 'SET-8812', date: '12 May 2025', orders: 'Order #FD-10294', amount: '₹1,500', status: 'Pending Settlement', method: 'Direct NEFT to SBI' },
  { id: 'SET-8809', date: '08 May 2025', orders: 'Order #FD-10271', amount: '₹1,600', status: 'Settled', method: 'IMPS Payout' },
  { id: 'SET-8798', date: '05 May 2025', orders: 'Order #FD-10255', amount: '₹1,400', status: 'Settled', method: 'IMPS Payout' },
  { id: 'SET-8784', date: '02 May 2025', orders: 'Order #FD-10240', amount: '₹1,080', status: 'Settled', method: 'IMPS Payout' },
  { id: 'SET-8770', date: '28 Apr 2025', orders: 'Order #FD-10222', amount: '₹3,600', status: 'Settled', method: 'IMPS Payout' },
];

export const FarmerEarningsPage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Farmer Earnings & Settlements
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Direct bank transfers with 0% intermediary deduction. Escrow released upon buyer receipt.
          </p>
        </div>

        <button
          onClick={() => alert('Initiating payout transfer of ₹14,170 to your verified bank account...')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs self-start sm:self-auto transition-colors"
        >
          <Building className="w-3.5 h-3.5" />
          <span>Withdraw Available Balance</span>
        </button>
      </div>

      {/* 4 Financial Metric Cards matching prompt */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Total Earnings</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white">₹84,250</span>
          <span className="text-[10px] text-emerald-600 font-semibold block mt-1">+18.5% YoY</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">This Month</span>
          <span className="text-2xl font-black text-emerald-600">₹18,420</span>
          <span className="text-[10px] text-slate-400 block mt-1">32 Orders Fulfilled</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Pending Settlement</span>
          <span className="text-2xl font-black text-amber-500">₹4,250</span>
          <span className="text-[10px] text-slate-400 block mt-1">In Transit Escrow</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Available Balance</span>
          <span className="text-2xl font-black text-blue-600">₹14,170</span>
          <span className="text-[10px] text-emerald-600 font-semibold block mt-1">Ready for withdrawal</span>
        </div>
      </div>

      {/* Revenue Area Chart */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Revenue Growth Over Time
            </h3>
            <p className="text-xs text-slate-500">Historical proceeds credited to bank</p>
          </div>
          <span className="text-xs font-semibold text-slate-500">6-Month View</span>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyEarningsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
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
                formatter={(val) => [`₹${val}`, 'Monthly Proceeds']}
              />
              <Area
                type="monotone"
                dataKey="earnings"
                stroke="#16A34A"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#earningsGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Settlement History Table matching specification */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Payout Settlement History
          </h3>
          <span className="text-xs text-slate-400">
            Account: {user.bankSettlement || 'State Bank of India (Ending in 4092)'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Settlement ID</th>
                <th className="py-3.5 px-4">Order Reference</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Payout Method</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {settlements.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">
                    {s.id}
                  </td>
                  <td className="py-4 px-4 text-slate-700 dark:text-slate-300">
                    {s.orders}
                  </td>
                  <td className="py-4 px-4 text-slate-500">
                    {s.date}
                  </td>
                  <td className="py-4 px-4 text-slate-600 dark:text-slate-300">
                    {s.method}
                  </td>
                  <td className="py-4 px-4 font-black text-emerald-600 text-sm">
                    {s.amount}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Badge variant={s.status === 'Settled' ? 'success' : 'warning'}>
                      {s.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
