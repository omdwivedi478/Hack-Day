import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, ChevronRight, Navigation } from 'lucide-react';
import { Badge } from '../common/Badge';

export const FarmerCard = ({ farmer }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-card transition-all duration-200 flex flex-col group">
      {/* Cover / Header Banner */}
      <div className="h-24 bg-gradient-to-r from-emerald-700 to-primary-dark relative overflow-hidden">
        {farmer.coverImage && (
          <img
            src={farmer.coverImage}
            alt={farmer.farmName}
            className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <div className="absolute top-2.5 right-2.5">
          <Badge variant="success" size="sm">
            Verified Farm
          </Badge>
        </div>
      </div>

      {/* Profile Details */}
      <div className="p-4 pt-0 flex-1 flex flex-col justify-between relative">
        <div>
          {/* Avatar overlapping banner */}
          <div className="-mt-10 mb-3 flex items-end justify-between">
            <img
              src={farmer.avatar}
              alt={farmer.name}
              className="w-16 h-16 rounded-xl object-cover border-3 border-white dark:border-slate-900 shadow-sm"
            />
            <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 px-2 py-0.5 rounded-md text-xs font-bold text-amber-800 dark:text-amber-300">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{farmer.rating}</span>
              <span className="text-[10px] text-slate-400 font-normal">({farmer.reviewsCount})</span>
            </div>
          </div>

          {/* Name & Farm */}
          <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
            {farmer.name}
          </h4>
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            {farmer.farmName}
          </p>

          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {farmer.location?.split(',')[0]}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Navigation className="w-3 h-3 text-slate-400" />
              {farmer.distanceKm} km away
            </span>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-2 mt-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-[11px]">
            <div>
              <span className="text-slate-400 block">Experience</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {farmer.experienceYears} Years
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Cultivation</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {farmer.acres} Acres
              </span>
            </div>
          </div>

          {/* Specialty Crops Tags */}
          <div className="flex flex-wrap gap-1 mt-3">
            {farmer.specialtyCrops?.slice(0, 3).map((crop, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                {crop}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Link
            to={`/farmers/${farmer.id}`}
            className="w-full flex items-center justify-center gap-1 py-2 px-3 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/60 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 transition-all duration-150"
          >
            <span>View Farm & Produce</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
