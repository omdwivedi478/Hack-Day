import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Badge } from '../common/Badge';

export const RecentOrdersList = ({ orders = [] }) => {
  // Sample fallback orders if none passed
  const displayOrders = orders.length > 0 ? orders.slice(0, 5) : [
    {
      id: 'FD-10294',
      name: 'Fresh Tomato',
      quantity: '200 kg',
      farmer: 'Rajesh Patel',
      price: '₹7,600',
      status: 'Processing',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'FD-10288',
      name: 'Green Apple (Shimla)',
      quantity: '1,000 kg',
      farmer: 'Balwinder Singh',
      price: '₹1,30,000',
      status: 'In Transit',
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'FD-10271',
      name: 'Toor Dal (Unhusked)',
      quantity: '150 Quintal',
      farmer: 'Preeti Deshmukh',
      price: '₹18,500',
      status: 'Delivered',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'FD-10255',
      name: 'Nashik Red Onions',
      quantity: '500 kg',
      farmer: 'Ramesh Patil',
      price: '₹14,000',
      status: 'Delivered',
      image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'FD-10240',
      name: 'Alphonso Mango (Hapus)',
      quantity: '10 Dozen',
      farmer: 'Anand Vernekar',
      price: '₹6,800',
      status: 'Delivered',
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=100&auto=format&fit=crop&q=80'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return <Badge variant="success">Delivered</Badge>;
      case 'In Transit':
        return <Badge variant="info">In Transit</Badge>;
      case 'Processing':
        return <Badge variant="warning">Processing</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between h-full">
      {/* Header matching reference */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Recent Orders
          </h4>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
              28,653
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3 h-3" />
              +12.45%
            </span>
          </div>
        </div>

        {/* Action Link */}
        <Link
          to="/orders"
          className="text-xs font-semibold text-primary hover:text-primary-dark flex items-center gap-1"
        >
          <span>View All</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* List items matching reference */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800 mt-2">
        {displayOrders.map((item, idx) => (
          <Link
            key={item.id || idx}
            to={`/orders/${item.id || 'FD-10294'}`}
            className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 -mx-2 px-2 rounded-lg transition-colors group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={item.image || item.items?.[0]?.image}
                alt={item.name || item.items?.[0]?.name}
                className="w-10 h-10 rounded-lg object-cover border border-slate-100 dark:border-slate-800 shrink-0"
              />
              <div className="min-w-0 truncate">
                <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors truncate">
                  {item.name || item.items?.[0]?.name}
                </h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {item.farmer || item.items?.[0]?.farmerName || 'Verified Farm'} • {item.quantity || `${item.items?.[0]?.quantity} ${item.items?.[0]?.unit}`}
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                {item.price || `₹${item.total}`}
              </span>
              <div className="mt-0.5">
                {getStatusBadge(item.status)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
