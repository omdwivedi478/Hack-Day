import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, X } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { ProductCard } from '../../components/marketplace/ProductCard';
import { CategoryTabs } from '../../components/marketplace/CategoryTabs';
import { ProductFiltersModal } from '../../components/marketplace/ProductFiltersModal';
import { EmptyState } from '../../components/common/EmptyState';

export const MarketplacePage = () => {
  const { products } = useMarketplace();
  const [searchParams] = useSearchParams();

  // Search state
  const queryParam = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Filter state
  const [filters, setFilters] = useState({
    maxPrice: 700,
    organicOnly: false,
    minRating: 4.0
  });

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Category filter
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Organic') {
          if (!prod.isOrganic) return false;
        } else if (prod.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = prod.name.toLowerCase().includes(q);
        const matchCategory = prod.category.toLowerCase().includes(q);
        const matchFarmer = prod.farmerName.toLowerCase().includes(q);
        const matchLocation = prod.location.toLowerCase().includes(q);
        if (!matchName && !matchCategory && !matchFarmer && !matchLocation) return false;
      }

      // Price filter
      if (prod.price > filters.maxPrice) return false;

      // Organic filter
      if (filters.organicOnly && !prod.isOrganic) return false;

      // Rating filter
      if (prod.rating < filters.minRating) return false;

      return true;
    });
  }, [products, selectedCategory, searchQuery, filters]);

  const handleResetFilters = () => {
    setFilters({
      maxPrice: 700,
      organicOnly: false,
      minRating: 4.0
    });
    setSelectedCategory('All');
    setSearchQuery('');
  };

  const hasActiveFilters =
    filters.maxPrice < 700 ||
    filters.organicOnly ||
    filters.minRating > 4.0 ||
    selectedCategory !== 'All' ||
    searchQuery.length > 0;

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Top Header matching reference */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Marketplace</span>
            <span className="text-xl">🌾</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            <span className="text-slate-400">Overview</span>
            <span className="mx-1.5 text-slate-300 dark:text-slate-600">&gt;</span>
            <span className="font-semibold text-primary">Marketplace</span>
          </p>
        </div>

        {/* Search & Filter Controls matching reference */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search commodities..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-2xs"
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

          <button
            onClick={() => setIsFilterModalOpen(true)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors shadow-2xs ${
              hasActiveFilters
                ? 'bg-primary text-white border-primary'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Category Pills matching reference */}
      <div className="flex items-center justify-between gap-4">
        <CategoryTabs
          categories={['All', 'Vegetables', 'Fruits', 'Grains', 'Spices', 'Organic']}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="hidden sm:block text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
          Showing <strong className="text-slate-800 dark:text-slate-200">{filteredProducts.length}</strong> commodities
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-medium">Filters:</span>
          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[11px] font-medium border border-emerald-200 dark:border-emerald-800">
              {selectedCategory}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('All')} />
            </span>
          )}
          {filters.organicOnly && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[11px] font-medium border border-emerald-200 dark:border-emerald-800">
              Organic Only
              <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters(f => ({ ...f, organicOnly: false }))} />
            </span>
          )}
          {filters.maxPrice < 700 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium">
              ≤ ₹{filters.maxPrice}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters(f => ({ ...f, maxPrice: 700 }))} />
            </span>
          )}
          <button
            onClick={handleResetFilters}
            className="text-[11px] text-primary hover:underline font-semibold ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Produce Grid matching reference (5 columns on desktop, 2 columns on mobile) */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 md:gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Search}
          title="No Produce Found"
          description="Try modifying your search keywords or loosening the filter criteria."
          actionLabel="Reset All Filters"
          onAction={handleResetFilters}
        />
      )}

      {/* Filter Modal */}
      <ProductFiltersModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onApplyFilters={setFilters}
        onResetFilters={handleResetFilters}
      />
    </div>
  );
};
