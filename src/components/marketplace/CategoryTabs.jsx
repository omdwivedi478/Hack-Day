import React from 'react';

export const CategoryTabs = ({
  categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Spices', 'Organic'],
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
              isSelected
                ? 'bg-primary text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-primary/40'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};
