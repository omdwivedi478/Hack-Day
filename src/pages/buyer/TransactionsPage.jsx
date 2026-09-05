import React, { useState } from 'react';
import { Search, FileText } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Badge } from '../../components/common/Badge';

export const TransactionsPage = () => {
  const { transactions } = useMarketplace();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTxns = transactions.filter(t =>
    t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Financial Transactions</span>
            <span className="text-xl">💳</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Transparent ledger of all agricultural settlements, direct farmer transfers, and receipts.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transactions, invoices..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-2xs"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-xs font-semibold text-slate-400 block mb-1">Total Procurement Spend</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white">₹17,800</span>
          <span className="text-[11px] text-emerald-600 block mt-1">100% Direct Payouts</span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-xs font-semibold text-slate-400 block mb-1">Farmer Earnings Transferred</span>
          <span className="text-2xl font-black text-emerald-600">₹14,240</span>
          <span className="text-[11px] text-slate-400 block mt-1">80.0% Average Share</span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-xs font-semibold text-slate-400 block mb-1">Middleman Markup Avoided</span>
          <span className="text-2xl font-black text-blue-600">₹4,220</span>
          <span className="text-[11px] text-slate-400 block mt-1">Direct from Origin</span>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Transaction ID</th>
                <th className="py-3.5 px-4">Description & Beneficiary</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Payment Method</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTxns.map((txn) => (
                <tr key={txn.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">
                    {txn.id}
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-slate-900 dark:text-slate-100 block">
                      {txn.description}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Beneficiary: {txn.farmerBeneficiary}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-500 dark:text-slate-400">
                    {new Date(txn.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="py-4 px-4 text-slate-700 dark:text-slate-300">
                    {txn.paymentMethod}
                  </td>
                  <td className="py-4 px-4 font-extrabold text-slate-900 dark:text-white">
                    {txn.type === 'Credit' ? (
                      <span className="text-emerald-600">+₹{txn.amount}</span>
                    ) : (
                      <span>₹{txn.amount}</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant={txn.status === 'Settled' ? 'success' : 'warning'}>
                      {txn.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => alert(`Downloading ${txn.invoiceNumber}.pdf`)}
                      className="inline-flex items-center gap-1 text-slate-500 hover:text-primary transition-colors text-xs font-medium"
                      title="Download PDF"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
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
