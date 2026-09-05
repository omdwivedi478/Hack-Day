import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-card transition-all duration-200 flex flex-col group">
      {/* Product Image matching reference */}
      <Link to={`/marketplace/${product.id}`} className="relative block aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Badges on top of image */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {product.isOrganic && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
              Organic
            </span>
          )}
          {product.isPopular && !product.isOrganic && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-xs">
              Popular
            </span>
          )}
        </div>

        {/* Quick Cart button */}
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white text-slate-700 dark:text-slate-200 shadow-sm flex items-center justify-center transition-all opacity-90 sm:opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100"
          title="Add to Cart"
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
      </Link>

      {/* Content */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
            <span className="font-medium text-emerald-700 dark:text-emerald-400">
              {product.category}
            </span>
            <div className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-200">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <Link
            to={`/marketplace/${product.id}`}
            className="block text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors truncate"
          >
            {product.name}
          </Link>

          {/* Farmer & Location */}
          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5 flex items-center gap-1">
            <span className="truncate">{product.farmerName}</span>
            <span>•</span>
            <span className="truncate text-slate-400">{product.location?.split(',')[0]}</span>
          </p>

          {/* Stock availability with green dot matching reference */}
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">
              {product.availableQty} {product.unit} Available
            </span>
          </div>
        </div>

        {/* Price & View Details Button matching reference */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-base font-extrabold text-slate-900 dark:text-white">
                ₹{product.price}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                /{product.unit}
              </span>
            </div>
            {product.marketPrice && (
              <span className="text-[11px] text-slate-400 line-through">
                ₹{product.marketPrice}/{product.unit}
              </span>
            )}
          </div>

          <Link
            to={`/marketplace/${product.id}`}
            className="w-full block text-center py-2 px-3 text-xs font-semibold rounded-lg bg-primary hover:bg-primary-dark text-white transition-colors duration-150 shadow-2xs"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
