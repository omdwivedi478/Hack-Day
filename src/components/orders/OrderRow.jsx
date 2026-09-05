import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Badge } from '../common/Badge';

export const OrderRow = ({ order }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return <Badge variant="success">Delivered</Badge>;
      case 'In Transit':
        return <Badge variant="info">In Transit</Badge>;
      case 'Processing':
        return <Badge variant="warning">Processing</Badge>;
      case 'Pending':
        return <Badge variant="neutral">Pending</Badge>;
      case 'Cancelled':
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const primaryItem = order.items?.[0] || {};
  const additionalItemsCount = (order.items?.length || 1) - 1;
  const formattedDate = new Date(order.orderDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <>
      {/* Desktop Table Row */}
      <tr className="hidden md:table-row hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100 dark:border-slate-800/60 text-xs">
        {/* Order ID */}
        <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">
          <Link to={`/orders/${order.id}`} className="hover:text-primary transition-colors">
            #{order.id}
          </Link>
        </td>

        {/* Product & thumbnail */}
        <td className="py-4 px-4">
          <div className="flex items-center gap-3">
            <img
              src={primaryItem.image}
              alt={primaryItem.name}
              className="w-9 h-9 rounded-lg object-cover border border-slate-100 dark:border-slate-800 shrink-0"
            />
            <div>
              <span className="font-semibold text-slate-900 dark:text-slate-100 block">
                {primaryItem.name}
              </span>
              {additionalItemsCount > 0 && (
                <span className="text-[10px] text-slate-400">
                  +{additionalItemsCount} more produce
                </span>
              )}
            </div>
          </div>
        </td>

        {/* Farmer */}
        <td className="py-4 px-4 text-slate-600 dark:text-slate-300 font-medium">
          {primaryItem.farmerName || 'Verified Farmer'}
        </td>

        {/* Quantity */}
        <td className="py-4 px-4 text-slate-700 dark:text-slate-300">
          {primaryItem.quantity} {primaryItem.unit}
        </td>

        {/* Amount */}
        <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">
          ₹{order.total}
        </td>

        {/* Date */}
        <td className="py-4 px-4 text-slate-500 dark:text-slate-400">
          {formattedDate}
        </td>

        {/* Status */}
        <td className="py-4 px-4">
          {getStatusBadge(order.status)}
        </td>

        {/* Action */}
        <td className="py-4 px-4 text-right">
          <Link
            to={`/orders/${order.id}`}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-primary hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
          >
            <span>View</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </td>
      </tr>

      {/* Mobile Responsive Card */}
      <div className="md:hidden bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <Link to={`/orders/${order.id}`} className="text-xs font-bold text-slate-900 dark:text-white hover:text-primary">
            #{order.id}
          </Link>
          {getStatusBadge(order.status)}
        </div>

        <div className="flex items-center gap-3">
          <img
            src={primaryItem.image}
            alt={primaryItem.name}
            className="w-12 h-12 rounded-lg object-cover border border-slate-100 dark:border-slate-800 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
              {primaryItem.name}
            </h5>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              {primaryItem.farmerName} • {primaryItem.quantity} {primaryItem.unit}
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Ordered on {formattedDate}
            </p>
          </div>
          <div className="text-right">
            <span className="text-sm font-extrabold text-slate-900 dark:text-white">
              ₹{order.total}
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <Link
            to={`/orders/${order.id}`}
            className="w-full text-center py-1.5 px-3 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
          >
            Track & View Details
          </Link>
        </div>
      </div>
    </>
  );
};
