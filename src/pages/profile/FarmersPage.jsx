import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { FarmerCard } from '../../components/farmer/FarmerCard';
import { EmptyState } from '../../components/common/EmptyState';

export const FarmersPage = () => {
  const { farmers } = useMarketplace();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');

  const states = ['All', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Haryana'];

  const filteredFarmers = useMemo(() => {
    return farmers.filter((farmer) => {
      if (selectedState !== 'All' && farmer.state !== selectedState) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = farmer.name.toLowerCase().includes(q);
        const matchFarm = farmer.farmName.toLowerCase().includes(q);
        const matchLocation = farmer.location.toLowerCase().includes(q);
        const matchCrop = farmer.specialtyCrops.some(c => c.toLowerCase().includes(q));
        if (!matchName && !matchFarm && !matchLocation && !matchCrop) return false;
      }
      return true;
    });
  }, [farmers, selectedState, searchQuery]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Verified Farmers Directory</span>
            <span className="text-xl">🧑‍🌾</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Connect directly with verified family farms across India. Guaranteed zero broker margins.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search farmer, farm or crop..."
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

      {/* State Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {states.map((state) => (
          <button
            key={state}
            onClick={() => setSelectedState(state)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedState === state
                ? 'bg-primary text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-primary/40'
            }`}
          >
            {state}
          </button>
        ))}
      </div>

      {/* Farmers Grid */}
      {filteredFarmers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredFarmers.map((farmer) => (
            <FarmerCard key={farmer.id} farmer={farmer} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Search}
          title="No Farmers Found"
          description="No farmers match your state or name search criteria."
          actionLabel="Reset Search"
          onAction={() => {
            setSearchQuery('');
            setSelectedState('All');
          }}
        />
      )}
    </div>
  );
};
