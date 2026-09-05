import React, { useState, useMemo } from 'react';
import { ShoppingBag, Search, X } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { OrderRow } from '../../components/orders/OrderRow';
import { EmptyState } from '../../components/common/EmptyState';

export const OrdersPage = () => {
  const { orders } = useMarketplace();
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const statusTabs = ['All', 'Pending', 'Processing', 'In Transit', 'Delivered', 'Cancelled'];

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (selectedStatus !== 'All' && order.status.toLowerCase() !== selectedStatus.toLowerCase()) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = order.id.toLowerCase().includes(q);
        const matchItem = order.items?.some(i => i.name.toLowerCase().includes(q) || i.farmerName.toLowerCase().includes(q));
        if (!matchId && !matchItem) return false;
      }
      return true;
    });
  }, [orders, selectedStatus, searchQuery]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Orders & Procurement</span>
            <span className="text-xl">📦</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Track live harvests, cold-chain dispatches, and doorstep deliveries.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID or item..."
            className="w-full pl-10 pr-8 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {statusTabs.map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedStatus === status
                ? 'bg-primary text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-primary/40'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Table on Desktop / Cards on Mobile matching requirements */}
      {filteredOrders.length > 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card overflow-hidden">
          {/* Desktop Table View */}
          <table className="w-full hidden md:table text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">Farmer</th>
                <th className="py-3.5 px-4">Quantity</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <OrderRow key={order.id} order={order} />
              ))}
            </tbody>
          </table>

          {/* Mobile Card List View */}
          <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800 p-3 space-y-3">
            {filteredOrders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          icon={ShoppingBag}
          title="No Orders Found"
          description="You don't have any orders matching this status or keyword."
          actionLabel="Explore Marketplace"
          onAction={() => setSelectedStatus('All')}
        />
      )}
    </div>
  );
};
