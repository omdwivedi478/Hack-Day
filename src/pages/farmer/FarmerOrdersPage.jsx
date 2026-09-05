import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

export const FarmerOrdersPage = () => {
  const { orders, updateOrderStatus } = useMarketplace();
  const [filter, setFilter] = useState('All');

  const filteredOrders = orders.filter((order) => {
    if (filter === 'All') return true;
    return order.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Incoming Buyer Orders ({orders.length})
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Fulfill morning harvesting queues and hand over crates to refrigerated transport.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {['All', 'Pending', 'Processing', 'In Transit', 'Delivered'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              filter === status
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-500'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Order #{order.id}
                </span>
                <Badge variant={order.status === 'Delivered' ? 'success' : order.status === 'Processing' ? 'warning' : 'info'}>
                  {order.status}
                </Badge>
                <span className="text-[11px] text-slate-400">
                  {new Date(order.orderDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                <span>Buyer: <strong>{order.buyerName}</strong></span>
                <span>•</span>
                <span>Items: <strong>{order.items.map(i => `${i.name} (${i.quantity}${i.unit})`).join(', ')}</strong></span>
              </div>

              <p className="text-[11px] text-slate-400">
                Delivery: {order.deliveryAddress}
              </p>
            </div>

            {/* Price & Action Buttons */}
            <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
              <div className="text-left lg:text-right">
                <span className="text-[10px] text-slate-400 block uppercase font-semibold">Your Net Payout</span>
                <span className="text-base font-extrabold text-emerald-600">
                  ₹{order.farmerEarnings || Math.round(order.total * 0.79)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {order.status === 'Pending' && (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => updateOrderStatus(order.id, 'Processing')}
                  >
                    Accept & Prepare
                  </Button>
                )}
                {order.status === 'Processing' && (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => updateOrderStatus(order.id, 'In Transit')}
                  >
                    Dispatch / Handover
                  </Button>
                )}
                {order.status === 'In Transit' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateOrderStatus(order.id, 'Delivered')}
                  >
                    Mark Delivered
                  </Button>
                )}
                {order.status === 'Delivered' && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Settled
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
