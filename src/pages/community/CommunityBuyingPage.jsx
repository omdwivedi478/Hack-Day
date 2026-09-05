import React, { useState } from 'react';
import { Users2, Clock, MapPin, ArrowRight } from 'lucide-react';
import { initialCommunityPools } from '../../data/mockCommunityPools';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';

export const CommunityBuyingPage = () => {
  const [pools, setPools] = useState(initialCommunityPools);
  const [selectedPool, setSelectedPool] = useState(null);
  const [pledgeKg, setPledgeKg] = useState(5);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleJoinPool = () => {
    if (!selectedPool) return;

    // Simulate adding to community pool
    setPools(prev =>
      prev.map(p => {
        if (p.id === selectedPool.id) {
          const newDemand = Math.min(p.targetKg, p.currentDemandKg + pledgeKg);
          return {
            ...p,
            currentDemandKg: newDemand,
            participantsCount: p.participantsCount + 1
          };
        }
        return p;
      })
    );

    // Add to cart with unlocked discounted price!
    addToCart(
      {
        id: selectedPool.productId,
        name: `${selectedPool.productName} (Community Bulk)`,
        price: selectedPool.unlockedPrice,
        unit: selectedPool.unit,
        farmerName: selectedPool.farmerName,
        farmerPrice: selectedPool.unlockedPrice - 4,
        marketPrice: selectedPool.currentPrice + 7,
        image: selectedPool.image,
        location: selectedPool.farmLocation
      },
      pledgeKg
    );

    showToast(`Pledged ${pledgeKg} ${selectedPool.unit} in "${selectedPool.productName}" pool! Price locked at ₹${selectedPool.unlockedPrice}/${selectedPool.unit}`, 'success');
    setSelectedPool(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-primary to-emerald-600 text-white p-7 md:p-9 rounded-3xl shadow-card relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-xs">
            <Users2 className="w-3.5 h-3.5" />
            <span>Collective Procurement</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            Buy Together. Save Together.
          </h1>
          <p className="text-xs md:text-sm text-emerald-100 leading-relaxed">
            When more buyers join the same order, farmers get guaranteed demand and buyers receive better prices.
            Pool demand in your neighborhood hub to unlock wholesale farm gate rates.
          </p>
        </div>
      </div>

      {/* Community Pools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {pools.map((pool) => {
          const progressPercent = Math.min(100, Math.round((pool.currentDemandKg / pool.targetKg) * 100));
          const kgRemaining = Math.max(0, pool.targetKg - pool.currentDemandKg);

          return (
            <div
              key={pool.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-card transition-all duration-200 overflow-hidden flex flex-col justify-between"
            >
              {/* Product Header */}
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={pool.image}
                    alt={pool.productName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 dark:bg-slate-900/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-100 shadow-xs flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Ends in {pool.endsInHours}h</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-xs">
                    Save ₹{pool.currentPrice - pool.unlockedPrice}/{pool.unit}
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>Grown by <strong className="text-slate-700 dark:text-slate-200">{pool.farmerName}</strong></span>
                      <span>{pool.farmLocation}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {pool.productName}
                    </h3>
                    <p className="text-xs text-slate-500">{pool.variety}</p>
                  </div>

                  {/* Price Comparison */}
                  <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Retail Price</span>
                      <span className="text-base font-bold text-slate-400 line-through">
                        ₹{pool.currentPrice}/{pool.unit}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-bold block">Unlocked Price</span>
                      <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                        ₹{pool.unlockedPrice}/{pool.unit}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar matching requirement */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-800 dark:text-slate-200">
                        {pool.currentDemandKg} {pool.unit} of {pool.targetKg} {pool.unit} Target
                      </span>
                      <span className="text-primary font-extrabold">{progressPercent}%</span>
                    </div>

                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-primary rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>{pool.participantsCount} buyers joined</span>
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                        {kgRemaining > 0 ? `${kgRemaining} ${pool.unit} more needed` : 'Target Unlocked!'}
                      </span>
                    </div>
                  </div>

                  {/* Delivery Hub */}
                  <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{pool.hubLocation}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setSelectedPool(pool);
                    setPledgeKg(5);
                  }}
                  className="w-full shadow-xs"
                >
                  <span>Join Community Order</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Join Community Order Modal */}
      {selectedPool && (
        <Modal
          isOpen={!!selectedPool}
          onClose={() => setSelectedPool(null)}
          title={`Join Community Order: ${selectedPool.productName}`}
        >
          <div className="space-y-5 text-xs md:text-sm">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <img
                src={selectedPool.image}
                alt={selectedPool.productName}
                className="w-14 h-14 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {selectedPool.productName}
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                  Locked Price: ₹{selectedPool.unlockedPrice}/{selectedPool.unit} (Saves ₹{selectedPool.currentPrice - selectedPool.unlockedPrice}/{selectedPool.unit})
                </p>
                <p className="text-[11px] text-slate-500">
                  Fulfillment Hub: {selectedPool.hubLocation}
                </p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                How many {selectedPool.unit} would you like to pledge?
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="2"
                  max="50"
                  step="1"
                  value={pledgeKg}
                  onChange={(e) => setPledgeKg(Number(e.target.value))}
                  className="flex-1 accent-primary"
                />
                <div className="w-20 text-center py-1.5 px-2 bg-slate-100 dark:bg-slate-800 rounded-lg font-bold text-slate-900 dark:text-white">
                  {pledgeKg} {selectedPool.unit}
                </div>
              </div>
            </div>

            {/* Total Estimated Cost */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Pledge ({pledgeKg} {selectedPool.unit} × ₹{selectedPool.unlockedPrice})</span>
                <span>₹{pledgeKg * selectedPool.unlockedPrice}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Hub Community Dispatch</span>
                <span className="text-emerald-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
                <span>Total Due on Delivery</span>
                <span>₹{pledgeKg * selectedPool.unlockedPrice}</span>
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setSelectedPool(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="md" onClick={handleJoinPool}>
                Confirm & Add to Cart
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
