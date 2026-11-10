import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Marcus Vance',
    location: 'Austin, Texas',
    route: 'LAX Airport to Pacific Coast Highway',
    car: 'Ford Mustang GT Coupe',
    rating: 5,
    date: 'October 2026',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    quote:
      'Renting the 5.0L Mustang from LAX was the smoothest airport car rental experience of my life. Digital check-in let me walk straight to the stall, keys were ready, and the car was immaculate. Zero hidden fees at checkout.',
  },
  {
    id: 2,
    name: 'Elena Rostova',
    location: 'Denver, Colorado',
    route: 'Denver to Aspen Ski Trip',
    car: 'Chevrolet Tahoe Premier 4WD',
    rating: 5,
    date: 'November 2026',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    quote:
      'We booked the 8-passenger Tahoe for a winter family getaway. The 4WD handled snowy mountain passes with complete confidence. Customer support answered our roadside question within 30 seconds. Absolutely first class.',
  },
  {
    id: 3,
    name: 'David Chen',
    location: 'Seattle, Washington',
    route: 'San Francisco SFO to Napa Valley',
    car: 'Tesla Model 3 Long Range',
    rating: 5,
    date: 'September 2026',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    quote:
      'The Tesla was charged to 90% right at SFO. The E-ZPass toll transponder saved us easily an hour in bay area toll queues. Transparent pricing with clear tax itemization made expensing this for business effortless.',
  },
  {
    id: 4,
    name: 'Sarah Jenkins',
    location: 'Chicago, Illinois',
    route: 'Miami MIA to Key West Roadtrip',
    car: 'Jeep Wrangler Rubicon',
    rating: 5,
    date: 'November 2026',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    quote:
      'Taking off the Wrangler Freedom Top on the Overseas Highway into Key West was unforgettable. Veloce gave us an incredible weekly discount rate and true zero-deductible CDW insurance that gave us total peace of mind.',
  },
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex(prev => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex(prev => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const current = REVIEWS[currentIndex];

  return (
    <section className="py-20 bg-white dark:bg-[#0B1B3A] border-t border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#FF6B2C] mb-2">
              Verified American Renters
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3A] dark:text-white tracking-tight">
              Real Experiences From The Highway
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevReview}
              className="p-3 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-[#FF6B2C] hover:text-white hover:border-[#FF6B2C] transition-all focus:outline-none"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-slate-500 tabular-nums">
              {currentIndex + 1} / {REVIEWS.length}
            </span>
            <button
              onClick={nextReview}
              className="p-3 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-[#FF6B2C] hover:text-white hover:border-[#FF6B2C] transition-all focus:outline-none"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Testimonial Card */}
        <div className="relative p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <Quote className="absolute top-8 right-8 w-16 h-16 text-slate-200 dark:text-slate-800 pointer-events-none" />

          <div className="flex items-center gap-1 mb-6">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>

          <p className="text-lg sm:text-2xl font-medium text-slate-800 dark:text-slate-100 leading-relaxed mb-8 max-w-4xl">
            &ldquo;{current.quote}&rdquo;
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <img
                src={current.photo}
                alt={current.name}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-14 h-14 rounded-full object-cover border-2 border-[#FF6B2C]"
              />
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{current.name}</span>
                  <span title="Verified Renter" className="inline-flex items-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" aria-label="Verified Renter" />
                  </span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {current.location} &middot; Rented {current.car}
                </p>
              </div>
            </div>

            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Trip: <span className="text-[#0B1B3A] dark:text-slate-200">{current.route}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
