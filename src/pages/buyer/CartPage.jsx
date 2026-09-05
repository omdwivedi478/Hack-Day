import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { EmptyState } from '../../components/common/EmptyState';
import { Button } from '../../components/common/Button';

export const CartPage = () => {
  const {
    items,
    itemCount,
    subtotal,
    deliveryFee,
    platformFee,
    total,
    farmerReceives,
    consumerSavings,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="py-12 animate-fade-in">
        <EmptyState
          icon={ShoppingBag}
          title="Your Shopping Cart is Empty"
          description="Direct-from-farm produce harvested this morning is waiting for you in the marketplace."
          actionLabel="Explore Fresh Commodities"
          onAction={() => navigate('/marketplace')}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Procurement Cart ({items.length} items)
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Direct farmer orders with temperature-controlled delivery.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-slate-400 hover:text-red-600 transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 p-4 md:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-100 dark:border-slate-800 shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    Farmer: <strong className="text-slate-700 dark:text-slate-300">{item.farmerName}</strong>
                  </p>
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
                    ₹{item.price}/{item.unit}
                  </p>
                </div>
              </div>

              {/* Quantity Controls & Subtotal */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                {/* Stepper */}
                <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800">
                  <button
                    onClick={() => {
                      if (item.quantity > 1) {
                        updateQuantity(item.id, item.quantity - 1);
                      } else {
                        removeFromCart(item.id);
                      }
                    }}
                    className="p-1.5 px-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-12 text-center text-xs font-bold text-slate-900 dark:text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1.5 px-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[70px]">
                  <span className="text-sm font-black text-slate-900 dark:text-white block">
                    ₹{item.price * item.quantity}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {item.quantity} {item.unit}
                  </span>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Value Guarantee banner */}
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold text-emerald-900 dark:text-emerald-200 block">
                  Price Transparency Active
                </span>
                <span className="text-emerald-700 dark:text-emerald-300">
                  Farmers will receive <strong>₹{farmerReceives}</strong> net direct payout from this order.
                </span>
              </div>
            </div>
            {consumerSavings > 0 && (
              <span className="font-extrabold text-emerald-800 dark:text-emerald-200 bg-white dark:bg-slate-800 px-3 py-1 rounded-lg border border-emerald-200 dark:border-emerald-700 shrink-0">
                You save ₹{consumerSavings}
              </span>
            )}
          </div>
        </div>

        {/* Order Summary on Right matching specification */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              Order Summary
            </h2>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Produce Subtotal ({itemCount} units)</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Refrigerated Delivery</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {deliveryFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Platform & Escrow Fee</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">₹{platformFee}</span>
              </div>

              {consumerSavings > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold pt-2 border-t border-dashed border-slate-200 dark:border-slate-700">
                  <span>Savings vs Mandi Markup</span>
                  <span>-₹{consumerSavings}</span>
                </div>
              )}

              <div className="flex justify-between text-base font-extrabold text-slate-900 dark:text-white pt-3 border-t border-slate-200 dark:border-slate-800">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full shadow-md"
              onClick={() => navigate('/checkout')}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>

            <p className="text-[10px] text-slate-400 text-center">
              100% farm fresh or instant refund guarantee.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
