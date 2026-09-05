import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export const ProductFiltersModal = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters
}) => {
  const [localFilters, setLocalFilters] = React.useState(filters);
  const [prevFilters, setPrevFilters] = React.useState(filters);

  if (filters !== prevFilters) {
    setPrevFilters(filters);
    setLocalFilters(filters);
  }

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    onResetFilters();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filter Commodities">
      <div className="space-y-5 text-sm">
        {/* Maximum Price Slider */}
        <div>
          <div className="flex justify-between text-xs font-semibold mb-2">
            <span className="text-slate-700 dark:text-slate-300">Max Price (per kg/unit)</span>
            <span className="text-primary font-bold">₹{localFilters.maxPrice}</span>
          </div>
          <input
            type="range"
            min="20"
            max="700"
            step="10"
            value={localFilters.maxPrice}
            onChange={(e) => setLocalFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-[11px] text-slate-400 mt-1">
            <span>₹20</span>
            <span>₹700</span>
          </div>
        </div>

        {/* Organic Only Checkbox */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <div>
            <span className="font-semibold text-slate-800 dark:text-slate-200 block text-xs">
              Organic Produce Only
            </span>
            <span className="text-[11px] text-slate-400">
              Only show verified NPOP / Jaivik Bharat farms
            </span>
          </div>
          <input
            type="checkbox"
            checked={localFilters.organicOnly}
            onChange={(e) => setLocalFilters(prev => ({ ...prev, organicOnly: e.target.checked }))}
            className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
          />
        </div>

        {/* Rating Filter */}
        <div>
          <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Minimum Rating
          </span>
          <div className="grid grid-cols-4 gap-2">
            {[4.0, 4.5, 4.8, 5.0].map(rating => (
              <button
                key={rating}
                type="button"
                onClick={() => setLocalFilters(prev => ({ ...prev, minRating: rating }))}
                className={`py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  localFilters.minRating === rating
                    ? 'border-primary bg-primary-light text-primary-dark font-bold dark:bg-emerald-950 dark:text-emerald-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                ★ {rating}+
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Reset All
          </Button>
          <Button variant="primary" size="sm" onClick={handleApply}>
            Apply Filters
          </Button>
        </div>
      </div>
    </Modal>
  );
};
