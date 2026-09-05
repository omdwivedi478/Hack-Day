import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  Banknote,
  Smartphone,
  Lock
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';

export const CheckoutPage = () => {
  const { items, subtotal, deliveryFee, platformFee, total, farmerReceives, consumerSavings, clearCart } = useCart();
  const { createOrder } = useMarketplace();
  const { user } = useAuth();

  // Form state
  const [address, setAddress] = useState({
    fullName: user?.name || 'Rohan Deshmukh',
    phone: user?.phone || '+91 98230 11223',
    street: 'Flat 402, Green Meadows Residency, Shivaji Nagar',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411005',
    instructions: 'Deliver before 10 AM if possible, ring door bell.'
  });

  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI', 'Card', 'COD'
  const [upiId, setUpiId] = useState('rohan@okaxis');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  if (items.length === 0 && !orderSuccess) {
    return (
      <div className="py-12 text-center space-y-4">
        <h2 className="text-xl font-bold">No Items to Checkout</h2>
        <Link to="/marketplace">
          <Button variant="primary">Return to Marketplace</Button>
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const fullDeliveryAddress = `${address.street}, ${address.city}, ${address.state} ${address.pincode}`;

      const newOrder = createOrder({
        buyerName: address.fullName,
        buyerPhone: address.phone,
        deliveryAddress: fullDeliveryAddress,
        paymentMethod: paymentMethod === 'UPI' ? `UPI (${upiId})` : paymentMethod === 'Card' ? 'Credit/Debit Card' : 'Cash on Delivery',
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          image: item.image,
          farmerName: item.farmerName,
          quantity: item.quantity,
          unit: item.unit,
          unitPrice: item.price,
          total: item.price * item.quantity
        })),
        subtotal,
        logisticsFee: deliveryFee,
        platformFee,
        discount: consumerSavings > 0 ? 50 : 0,
        total,
        farmerEarnings: farmerReceives,
        traditionalMarketCost: subtotal + consumerSavings,
        savingsVsTraditional: consumerSavings
      });

      clearCart();
      setIsProcessing(false);
      setOrderSuccess(newOrder);
    }, 900);
  };

  // Success Screen
  if (orderSuccess) {
    return (
      <div className="max-w-xl mx-auto py-8 text-center space-y-5 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">
            Order Confirmed
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
            Thank You for Supporting Direct Farmers!
          </h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Order #{orderSuccess.id} has been transmitted directly to local growers for dawn harvesting.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs space-y-1">
          <p className="font-bold text-emerald-900 dark:text-emerald-200">
            ₹{orderSuccess.farmerEarnings} will be settled directly to growers
          </p>
          <p className="text-emerald-700 dark:text-emerald-400">
            You saved approximately ₹{orderSuccess.savingsVsTraditional} compared to retail APMC mandi markups.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <Link to={`/orders/${orderSuccess.id}`}>
            <Button variant="primary" size="md">
              <span>Track Live Delivery Progress</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
          <Link to="/marketplace">
            <Button variant="outline" size="md">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/cart" className="hover:text-primary flex items-center gap-1">
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Back to Cart</span>
        </Link>
        <span>&gt;</span>
        <span className="font-semibold text-primary">Direct Checkout</span>
      </div>

      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Checkout & Direct Payment
      </h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Columns: Address & Payment */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Delivery Address */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Delivery Address</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Street Address / Society
                </label>
                <input
                  type="text"
                  required
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  required
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment Method matching specification */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>Payment Method (Mock Testing)</span>
            </h2>

            <div className="space-y-2.5 text-xs">
              {/* UPI */}
              <label
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                  paymentMethod === 'UPI'
                    ? 'border-primary bg-emerald-50/50 dark:bg-emerald-950/30'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI"
                    checked={paymentMethod === 'UPI'}
                    onChange={() => setPaymentMethod('UPI')}
                    className="accent-primary w-4 h-4"
                  />
                  <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span>Instant UPI (Google Pay / PhonePe / Paytm)</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300">
                  Instant Zero Fee
                </span>
              </label>

              {paymentMethod === 'UPI' && (
                <div className="pl-7 pr-2 pb-2">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="Enter UPI ID (e.g. yourname@okhdfcbank)"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              )}

              {/* Card */}
              <label
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                  paymentMethod === 'Card'
                    ? 'border-primary bg-emerald-50/50 dark:bg-emerald-950/30'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Card"
                    checked={paymentMethod === 'Card'}
                    onChange={() => setPaymentMethod('Card')}
                    className="accent-primary w-4 h-4"
                  />
                  <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span>Credit / Debit Card (Visa, Mastercard, RuPay)</span>
                  </div>
                </div>
              </label>

              {/* Cash on Delivery */}
              <label
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                  paymentMethod === 'COD'
                    ? 'border-primary bg-emerald-50/50 dark:bg-emerald-950/30'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="accent-primary w-4 h-4"
                  />
                  <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                    <Banknote className="w-4 h-4 text-slate-500" />
                    <span>Cash on Delivery</span>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card space-y-4 sticky top-20">
            <h2 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              Checkout Summary ({items.length} items)
            </h2>

            <div className="max-h-52 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 pr-1">
              {items.map((item) => (
                <div key={item.id} className="py-2 flex items-center justify-between text-xs">
                  <div className="truncate pr-2">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {item.quantity} {item.unit} • {item.farmerName}
                    </span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white shrink-0">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Refrigerated Delivery</span>
                <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Platform Escrow</span>
                <span>₹{platformFee}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>Total Due</span>
                <span>₹{total}</span>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isProcessing}
              className="w-full shadow-md"
            >
              {isProcessing ? 'Confirming with Growers...' : `Place Direct Order (₹${total})`}
            </Button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 pt-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Safe Escrow Settlement • FarmDirect Guarantee</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
