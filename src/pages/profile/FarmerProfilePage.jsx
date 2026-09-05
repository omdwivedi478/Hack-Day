import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  MapPin,
  ShieldCheck,
  Award,
  ChevronLeft
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { FarmerStats } from '../../components/farmer/FarmerStats';
import { ProductCard } from '../../components/marketplace/ProductCard';
import { Badge } from '../../components/common/Badge';

export const FarmerProfilePage = () => {
  const { id } = useParams();
  const { farmers, products } = useMarketplace();

  const farmer = farmers.find((f) => f.id === id) || farmers[0];
  const farmerProducts = products.filter((p) => p.farmerId === farmer.id);

  const sampleReviews = [
    {
      author: 'Amitabh Sen',
      role: 'Restaurant Owner, Pune',
      rating: 5,
      date: '3 days ago',
      comment: 'The hybrid tomatoes from Rajesh are incomparable in brix sweetness and firmness. Delivered within 14 hours of harvest with zero transit bruising.'
    },
    {
      author: 'Sunil Mehra',
      role: 'Organic Co-op Buyer, Mumbai',
      rating: 5,
      date: '1 week ago',
      comment: 'Authentic organic produce with complete chemical-free testing certificates. The price transparency gives us peace of mind knowing the farmer gets the major cut.'
    },
    {
      author: 'Pooja Kulkarni',
      role: 'Verified Household Buyer',
      rating: 4.8,
      date: '2 weeks ago',
      comment: 'Fresh farm-scented produce that lasts twice as long in the refrigerator compared to local mandi vegetables. Highly recommended!'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Back link */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Link to="/farmers" className="hover:text-primary flex items-center gap-1">
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Farmers Directory</span>
        </Link>
        <span>&gt;</span>
        <span className="font-semibold text-primary">{farmer.name}</span>
      </div>

      {/* Hero Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-card">
        {/* Cover Photo */}
        <div className="h-48 md:h-64 relative bg-gradient-to-r from-emerald-800 to-emerald-950 overflow-hidden">
          {farmer.coverImage && (
            <img
              src={farmer.coverImage}
              alt={farmer.farmName}
              className="w-full h-full object-cover opacity-60"
            />
          )}
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white text-emerald-800 shadow-md">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Verified Direct Producer
            </span>
          </div>
        </div>

        {/* Profile Details Header */}
        <div className="p-6 md:p-8 pt-0 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 -mt-16 md:-mt-20 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <img
                src={farmer.avatar}
                alt={farmer.name}
                className="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover border-4 border-white dark:border-slate-900 shadow-lg shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {farmer.name}
                  </h1>
                  <Badge variant="success" size="sm">Active</Badge>
                </div>
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                  {farmer.farmName}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {farmer.location}
                  </span>
                  <span>•</span>
                  <span>{farmer.distanceKm} km away</span>
                </p>
              </div>
            </div>

            {/* Quick Contact & Rating */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-base font-extrabold text-slate-900 dark:text-white">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{farmer.rating}</span>
                </div>
                <span className="text-[11px] text-slate-400">
                  {farmer.reviewsCount} verified reviews
                </span>
              </div>
            </div>
          </div>

          {/* 4 Statistics Cards matching specification */}
          <FarmerStats farmer={farmer} />
        </div>
      </div>

      {/* About & Certifications Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* About Farm Story */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            About {farmer.farmName}
          </h2>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {farmer.bio}
          </p>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Specialty Crops
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {farmer.specialtyCrops.map((crop, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                >
                  {crop}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications & Farm Details */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            Verified Certifications
          </h2>

          <div className="space-y-3">
            {farmer.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {cert}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 text-xs text-slate-400">
            <span className="block font-medium text-slate-600 dark:text-slate-300">Farming Since {farmer.establishedYear || 2010}</span>
            <span>All produce inspected by FarmDirect quality inspectors.</span>
          </div>
        </div>
      </div>

      {/* Direct From This Farm Produce */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Direct From This Farm
            </h2>
            <p className="text-xs text-slate-500">
              Harvested and packed exclusively at {farmer.farmName}
            </p>
          </div>
          <span className="text-xs font-semibold text-primary">
            {farmerProducts.length} Active Listings
          </span>
        </div>

        {farmerProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {farmerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500">
              This farm has no public produce listings currently. Check back tomorrow morning after dawn harvest.
            </p>
          </div>
        )}
      </div>

      {/* Customer Reviews Section */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Customer Reviews
            </h2>
            <p className="text-xs text-slate-500">Feedback from verified buyers and institutional clients</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/50 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-amber-800">
            <Star className="w-4 h-4 fill-amber-400" />
            <span>{farmer.rating} Average Rating</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sampleReviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-slate-900 dark:text-white">{rev.author}</span>
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
                  {rev.role}
                </span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>
              <span className="text-[10px] text-slate-400 pt-2 block border-t border-slate-200/60 dark:border-slate-700/60">
                {rev.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
