import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  MapPin,
  ShoppingBag,
  ShoppingCart,
  ArrowRight,
  ChevronLeft
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useCart } from '../../context/CartContext';
import { PriceTransparencyCard } from '../../components/common/PriceTransparencyCard';
import { ProductCard } from '../../components/marketplace/ProductCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, farmers } = useMarketplace();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id) || products[0];
  const farmer = farmers.find((f) => f.id === product.farmerId) || farmers[0];
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 5);

  const [quantity, setQuantity] = useState(10);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Breadcrumb matching reference */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Link to="/marketplace" className="hover:text-primary flex items-center gap-1">
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Marketplace</span>
        </Link>
        <span>&gt;</span>
        <span className="text-slate-400">{product.category}</span>
        <span>&gt;</span>
        <span className="font-semibold text-primary">{product.name}</span>
      </div>

      {/* Top Product Showcase matching reference */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white dark:bg-slate-900 rounded-2xl p-5 md:p-7 border border-slate-200 dark:border-slate-800 shadow-card">
        {/* Product Image on the left */}
        <div className="lg:col-span-6">
          <div className="rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 dark:bg-slate-800 relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isOrganic && (
              <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full bg-emerald-600 text-white shadow-xs">
                Certified Organic
              </span>
            )}
          </div>
        </div>

        {/* Product Details right side */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Category: <strong className="text-emerald-700 dark:text-emerald-400">{product.category}</strong></span>
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400 font-normal">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {product.name}
            </h1>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Grown by <Link to={`/farmers/${farmer.id}`} className="font-semibold text-primary hover:underline">{product.farmerName}</Link></span>
              <span>•</span>
              <span>{product.location}</span>
            </p>

            {/* Price section matching reference */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Price per Unit:</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  ₹{product.price}
                </span>
                <span className="text-sm font-semibold text-slate-500">
                  /{product.unit}
                </span>
                {product.marketPrice && (
                  <span className="text-xs text-slate-400 line-through ml-2">
                    Mandi Avg: ₹{product.marketPrice}/{product.unit}
                  </span>
                )}
              </div>
            </div>

            {/* Total Available Quantity Pill matching reference */}
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                Total Available Quantity: {product.availableQty} {product.unit}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="mt-5 flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Quantity ({product.unit}):</span>
              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 5))}
                  className="px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm font-bold"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-16 text-center text-xs font-bold bg-transparent focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 5)}
                  className="px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons matching reference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant="outline"
              size="md"
              icon={ShoppingCart}
              onClick={handleAddToCart}
              className="w-full"
            >
              Add to Cart
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={ShoppingBag}
              onClick={handleBuyNow}
              className="w-full shadow-md"
            >
              Request Now / Buy Now
            </Button>
          </div>
        </div>
      </div>

      {/* Product Specifications Table matching reference */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 md:p-6 border border-slate-200 dark:border-slate-800 shadow-card">
        <h3 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
          Product Details
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 md:gap-4 mb-5">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[11px] text-slate-400 block">Min Order Quantity</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{product.minOrderQty}</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[11px] text-slate-400 block">Grade</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{product.grade}</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[11px] text-slate-400 block">Variety</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{product.variety}</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[11px] text-slate-400 block">Shelf Life</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{product.shelfLife}</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[11px] text-slate-400 block">Location</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{product.location}</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1.5">
            Description
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Signature Price Transparency Section */}
      <PriceTransparencyCard
        productName={product.name}
        farmerPrice={product.farmerPrice || Math.round(product.price * 0.79)}
        logisticsFee={product.logisticsFee || 4}
        platformFee={product.platformFee || 4}
        consumerPrice={product.price}
        unit={product.unit}
        traditionalPrices={{
          farmer: Math.round(product.price * 0.47),
          trader: Math.round(product.price * 0.63),
          wholesaler: Math.round(product.price * 0.79),
          retailer: Math.round(product.price * 1.05),
          consumer: product.marketPrice || Math.round(product.price * 1.18)
        }}
      />

      {/* Farmer Information Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 md:p-6 border border-slate-200 dark:border-slate-800 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <img
            src={farmer.avatar}
            alt={farmer.name}
            className="w-16 h-16 rounded-xl object-cover border-2 border-emerald-500 shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {farmer.name}
              </h3>
              <Badge variant="success" size="sm">Verified Farm</Badge>
            </div>
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              {farmer.farmName}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {farmer.location} • {farmer.experienceYears} years farming • {farmer.acres} Acres
            </p>
          </div>
        </div>

        <Link to={`/farmers/${farmer.id}`} className="w-full md:w-auto">
          <Button variant="secondary" size="sm" className="w-full md:w-auto">
            <span>View Farmer Profile & Farm</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Link>
      </div>

      {/* Related Best Sellers matching reference */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Best Sellers
            </h3>
            <p className="text-xs text-slate-500">Popular produce from nearby verified growers</p>
          </div>
          <Link to="/marketplace" className="text-xs font-semibold text-primary hover:underline">
            View all produce
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 md:gap-4">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};
