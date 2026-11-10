import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car } from '../../types/index.ts';
import { useApp } from '../../context/AppContext.tsx';
import { formatUSD } from '../../utils/pricing.ts';
import {
  Users,
  Fuel,
  Gauge,
  Heart,
  Snowflake,
  Star,
  Check,
  ArrowRight,
} from 'lucide-react';

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useApp();
  const [imgSrc, setImgSrc] = useState(car.imageUrl);
  const [failed, setFailed] = useState(false);
  const favorited = isFavorite(car.id);

  const handleImageError = () => {
    const backup = car.galleryUrls.find((u) => u !== imgSrc && u.startsWith('http'));
    if (backup && imgSrc !== backup) {
      setImgSrc(backup);
    } else {
      setFailed(true);
    }
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/cars/${car.id}`);
  };

  return (
    <div
      onClick={() => navigate(`/cars/${car.id}`)}
      className="group relative flex flex-col justify-between bg-white dark:bg-[#0B1B3A] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Top Banner & Image Container */}
      <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-900 overflow-hidden">
        {failed ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-800 to-[#0B1B3A] text-white">
            <span className="text-xs uppercase tracking-wider text-[#FF6B2C] font-bold">{car.category}</span>
            <span className="text-base font-bold mt-1 text-center">{car.name}</span>
          </div>
        ) : (
          <img
            src={imgSrc}
            alt={`${car.year} ${car.name}`}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(car.id);
          }}
          aria-label={favorited ? `Remove ${car.name} from favorites` : `Add ${car.name} to favorites`}
          className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md text-slate-600 dark:text-slate-300 hover:text-[#FF6B2C] dark:hover:text-[#FF6B2C] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B2C]"
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              favorited ? 'fill-[#FF6B2C] text-[#FF6B2C]' : ''
            }`}
          />
        </button>

        {/* Quiet Category & Popular Tag */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-black/60 backdrop-blur-md text-white">
            {car.category}
          </span>
          {car.popular && (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#FF6B2C] text-white shadow-sm">
              Popular
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header & Rating */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {car.year} {car.make}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                {car.name}
              </h3>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-slate-800 dark:text-slate-200 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 px-2 py-0.5 rounded-md shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{car.rating}</span>
              <span className="text-slate-400 font-normal">({car.reviewCount})</span>
            </div>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 py-3 my-2 border-y border-slate-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{car.seats} Passengers</span>
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center gap-2">
              <Fuel className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="truncate">{car.mpg}</span>
            </div>
            <div className="flex items-center gap-2">
              <Snowflake className="w-4 h-4 text-slate-400 shrink-0" />
              <span>A/C Climate Control</span>
            </div>
          </div>
        </div>

        {/* Footer: Price & CTA */}
        <div className="pt-3 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-[#0B1B3A] dark:text-white tracking-tight tabular-nums">
                {formatUSD(car.pricePerDay)}
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                /day
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
              Taxes itemized at checkout
            </span>
          </div>

          <button
            type="button"
            onClick={handleBookNow}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0B1B3A] dark:bg-[#FF6B2C] hover:bg-[#FF6B2C] dark:hover:bg-[#E85819] text-white text-xs font-semibold shadow-sm transition-all group/btn"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
