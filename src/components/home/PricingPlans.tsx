import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

const PLANS = [
  {
    id: 'daily',
    name: 'Daily Flex Rental',
    highlight: false,
    badge: 'Short Trips',
    price: '$45',
    unit: '/day avg',
    description: 'Perfect for weekend getaways, quick business trips, and local travel.',
    features: [
      'Standard 200 miles/day included',
      'Free airport shuttle pick-up',
      '24/7 Roadside assistance',
      'Flexible pay-at-counter option',
      'Free cancellation up to 48 hours',
    ],
    ctaText: 'Browse Daily Fleet',
  },
  {
    id: 'weekly',
    name: 'Weekly Roadtripper',
    highlight: true,
    badge: 'Most Popular',
    price: '$38',
    unit: '/day (15% Savings)',
    description: 'Best value for family holidays, vacation roadtrips, and cross-state journeys.',
    features: [
      'Unlimited miles included nationwide',
      'Discounted young driver fee rate',
      'Free additional driver included',
      'Priority curbside vehicle pickup',
      'Flexible drop-off time buffer (2 hrs)',
      '15% discount vs daily rates',
    ],
    ctaText: 'Book Weekly Special',
  },
  {
    id: 'monthly',
    name: 'Monthly Long-Term Pass',
    highlight: false,
    badge: 'Extended Travel',
    price: '$29',
    unit: '/day (30% Savings)',
    description: 'Tailored for seasonal residents, remote workers, and extended relocation.',
    features: [
      'Vehicle swap privileges every 30 days',
      'Comprehensive maintenance included',
      'Dedicated VIP account specialist',
      'Full nationwide toll account option',
      'Direct billing for business travelers',
    ],
    ctaText: 'Explore Monthly Rates',
  },
];

export const PricingPlans: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white dark:bg-[#0B1B3A] border-t border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#FF6B2C] mb-2">
            Transparent Pricing Structure
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3A] dark:text-white tracking-tight">
            Flexible Rental Plans For Every Journey
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Enjoy significant volume discounts when booking weekly or monthly rental periods.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between p-8 rounded-3xl transition-all ${
                plan.highlight
                  ? 'bg-gradient-to-b from-[#0B1B3A] to-[#122347] text-white shadow-2xl border-2 border-[#FF6B2C] lg:-translate-y-2'
                  : 'bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#FF6B2C] text-white text-xs font-extrabold uppercase tracking-wider shadow-md">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  {!plan.highlight && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1.5 mb-4">
                  <span className="text-4xl sm:text-5xl font-black tracking-tight tabular-nums">
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.highlight ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                    {plan.unit}
                  </span>
                </div>

                <p className={`text-sm leading-relaxed mb-6 ${plan.highlight ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'}`}>
                  {plan.description}
                </p>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <div className={`mt-0.5 rounded-full p-0.5 shrink-0 ${plan.highlight ? 'bg-[#FF6B2C] text-white' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'}`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className={plan.highlight ? 'text-slate-200' : 'text-slate-700 dark:text-slate-300'}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/cars')}
                className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  plan.highlight
                    ? 'bg-[#FF6B2C] hover:bg-[#E85819] text-white shadow-lg shadow-orange-500/30'
                    : 'bg-[#0B1B3A] dark:bg-slate-800 hover:bg-[#FF6B2C] dark:hover:bg-[#FF6B2C] text-white'
                }`}
              >
                <span>{plan.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
