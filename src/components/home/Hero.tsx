import React from 'react';
import { BookingWidget } from './BookingWidget.tsx';
import { ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import heroImg from '../../assets/images/hero_us_car_rental_1794333645453.jpg';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
      {/* Background Photography with Scrim Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Luxury car driving on Pacific Coast Highway bridge at sunset"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Measured Scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A] via-[#0B1B3A]/60 to-[#0B1B3A]/30 dark:from-[#070E1E] dark:via-[#070E1E]/80 dark:to-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="text-center max-w-3xl mx-auto mb-10 text-white space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-slate-200">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B2C]" />
            <span>Serving 40+ US Airport Terminals & Downtown Centers</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-wrap text-white drop-shadow-md">
            Drive Your Dream Car Across America
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            Experience late-model American SUVs, sedans, trucks, and high-performance electric vehicles with zero hidden fees and instant airport delivery.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-medium text-slate-300">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Free 48-Hour Cancellation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Itemized US Taxes & Concession Fees</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>24/7 Nationwide Roadside Support</span>
            </div>
          </div>
        </div>

        {/* Floating Booking Card */}
        <div className="max-w-5xl mx-auto">
          <BookingWidget />
        </div>
      </div>
    </section>
  );
};
