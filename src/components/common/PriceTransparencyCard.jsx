import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const PriceTransparencyCard = ({
  productName = 'Fresh Produce',
  farmerPrice = 30,
  logisticsFee = 4,
  platformFee = 4,
  consumerPrice = 38,
  traditionalPrices = {
    farmer: 18,
    trader: 24,
    wholesaler: 30,
    retailer: 40,
    consumer: 45
  },
  unit = 'kg',
  className = ''
}) => {
  const farmerExtra = farmerPrice - traditionalPrices.farmer;
  const farmerExtraPercent = Math.round((farmerExtra / traditionalPrices.farmer) * 100);
  const consumerSaved = traditionalPrices.consumer - consumerPrice;
  const consumerSavedPercent = Math.round((consumerSaved / traditionalPrices.consumer) * 100);

  return (
    <div className={`bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 md:p-6 shadow-card ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Direct Fair Price
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            See Where Your Money Goes
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Transparent price breakdown for {productName} per {unit}
          </p>
        </div>

        {/* Highlight Badges */}
        <div className="flex items-center gap-2">
          <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 px-3 py-1.5 rounded-lg text-right">
            <span className="text-[11px] block font-medium text-emerald-700 dark:text-emerald-300">Farmer Earns</span>
            <span className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
              +₹{farmerExtra}/{unit} (+{farmerExtraPercent}%)
            </span>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 px-3 py-1.5 rounded-lg text-right">
            <span className="text-[11px] block font-medium text-blue-700 dark:text-blue-300">You Save</span>
            <span className="text-sm font-bold text-blue-800 dark:text-blue-200">
              ₹{consumerSaved}/{unit} (-{consumerSavedPercent}%)
            </span>
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
        {/* FarmDirect Model (Green themed, direct, clean) */}
        <div className="bg-emerald-50/70 dark:bg-emerald-950/20 rounded-xl p-4 md:p-5 border-2 border-emerald-500/40 relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="font-bold text-sm text-emerald-950 dark:text-emerald-300 tracking-wide uppercase">
                FarmDirect Direct Model
              </span>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-600 text-white">
              Zero Middlemen
            </span>
          </div>

          {/* Stepper / Flow */}
          <div className="space-y-3">
            {/* Step 1: Farmer */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-900/60 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
                  🌾
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Farmer Receives</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Direct instant payout</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-base font-bold text-emerald-700 dark:text-emerald-400">₹{farmerPrice}</span>
                <span className="text-xs text-slate-400 block">/{unit} (79%)</span>
              </div>
            </div>

            {/* Step 2: Logistics & Platform */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Refrigerated Logistics</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">₹{logisticsFee}/{unit}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">FarmDirect Platform</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">₹{platformFee}/{unit}</span>
              </div>
            </div>

            {/* Step 3: Consumer Price */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-600 text-white shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-xs">
                  🛒
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Your Final Price</h4>
                  <p className="text-xs text-emerald-100">Direct from farm to doorstep</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-extrabold">₹{consumerPrice}</span>
                <span className="text-xs text-emerald-200 block">/{unit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Traditional Supply Chain (Gray / muted, shows bloated intermediaries) */}
        <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-4 md:p-5 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
              <span className="font-bold text-sm text-slate-700 dark:text-slate-300 tracking-wide uppercase">
                Traditional Mandi Chain
              </span>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
              4 Intermediaries
            </span>
          </div>

          {/* Vertical step list */}
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2 px-3 rounded-md bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">1. Farmer Baseline</span>
              <span className="text-xs font-bold text-slate-500 line-through">₹{traditionalPrices.farmer}/{unit}</span>
            </div>

            <div className="flex items-center justify-between py-2 px-3 rounded-md bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">2. Local Aggregator / Trader</span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">₹{traditionalPrices.trader}/{unit}</span>
            </div>

            <div className="flex items-center justify-between py-2 px-3 rounded-md bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">3. APMC Mandi Wholesaler</span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">₹{traditionalPrices.wholesaler}/{unit}</span>
            </div>

            <div className="flex items-center justify-between py-2 px-3 rounded-md bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">4. Retail Distributor & Shop</span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">₹{traditionalPrices.retailer}/{unit}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
              <div>
                <span className="text-xs font-bold text-rose-900 dark:text-rose-200 block">5. Consumer Shelf Price</span>
                <span className="text-[11px] text-rose-600 dark:text-rose-400">Marked up by 150%</span>
              </div>
              <span className="text-base font-extrabold text-rose-700 dark:text-rose-400">
                ₹{traditionalPrices.consumer}/{unit}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
