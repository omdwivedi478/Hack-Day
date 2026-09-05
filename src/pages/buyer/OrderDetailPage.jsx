import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronLeft,
  Calendar,
  Truck,
  ShieldCheck,
  Download
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { OrderTimeline } from '../../components/orders/OrderTimeline';
import { Badge } from '../../components/common/Badge';

export const OrderDetailPage = () => {
  const { id } = useParams();
  const { orders } = useMarketplace();

  const order = orders.find((o) => o.id === id) || orders[0];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return <Badge variant="success" size="md">Delivered</Badge>;
      case 'In Transit':
        return <Badge variant="info" size="md">In Transit</Badge>;
      case 'Processing':
        return <Badge variant="warning" size="md">Farmer Preparing</Badge>;
      default:
        return <Badge variant="neutral" size="md">{status}</Badge>;
    }
  };

  const formattedDate = new Date(order.orderDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Back navigation */}
      <div className="flex items-center justify-between">
        <Link to="/orders" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-primary transition-colors">
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Orders</span>
        </Link>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Invoice</span>
        </button>
      </div>

      {/* Header Info Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
              Order #{order.id}
            </h1>
            {getStatusBadge(order.status)}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Placed on {formattedDate}</span>
          </p>
        </div>

        {/* Price transparency badge */}
        {order.savingsVsTraditional > 0 && (
          <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 p-3 rounded-xl text-right self-start sm:self-auto">
            <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300 block">
              You Saved vs APMC Mandi
            </span>
            <span className="text-base font-extrabold text-emerald-800 dark:text-emerald-200">
              ₹{order.savingsVsTraditional}
            </span>
          </div>
        )}
      </div>

      {/* Main Grid: Tracking Timeline on Left, Items & Summary on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Progress Timeline matching specification */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="pb-3 mb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>Live Delivery Timeline</span>
            </h2>
            <span className="text-xs font-semibold text-emerald-600">Refrigerated Logistics</span>
          </div>

          <OrderTimeline timeline={order.timeline} />
        </div>

        {/* Items & Financial Breakdown */}
        <div className="lg:col-span-6 space-y-6">
          {/* Produce Items */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              Ordered Commodities ({order.items.length})
            </h2>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-100 dark:border-slate-800"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {item.farmerName} • {item.quantity} {item.unit} @ ₹{item.unitPrice}/{item.unit}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                    ₹{item.total || item.quantity * item.unitPrice}
                  </span>
                </div>
              ))}
            </div>

            {/* Bill Summary */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Produce Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Direct Cold Logistics</span>
                <span>₹{order.logisticsFee}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Platform Maintenance</span>
                <span>₹{order.platformFee}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Community / Direct Discount</span>
                  <span>-₹{order.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>Total Paid</span>
                <span>₹{order.total}</span>
              </div>

              {/* Farmer Payout Note */}
              <div className="p-2.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/30 text-[11px] text-emerald-800 dark:text-emerald-300 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Farmer receives ₹{order.farmerEarnings} directly into their bank account.</span>
              </div>
            </div>
          </div>

          {/* Delivery & Payment Details */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block font-semibold uppercase tracking-wider text-[10px] mb-1">
                Delivery Address
              </span>
              <p className="font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                {order.buyerName}<br />
                {order.deliveryAddress}
              </p>
            </div>

            <div>
              <span className="text-slate-400 block font-semibold uppercase tracking-wider text-[10px] mb-1">
                Payment Information
              </span>
              <p className="font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                Method: {order.paymentMethod}<br />
                Status: <span className="text-emerald-600 font-bold">Payment Verified</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
