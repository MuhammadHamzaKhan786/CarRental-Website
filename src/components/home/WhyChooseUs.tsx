import React from 'react';
import {
  CalendarX2,
  Headphones,
  ShieldCheck,
  Receipt,
  PlaneTakeoff,
  Sparkles,
} from 'lucide-react';

const REASONS = [
  {
    icon: CalendarX2,
    title: 'Free 48-Hour Cancellation',
    desc: 'Plans change. Cancel risk-free up to 48 hours prior to pickup with instant refund.',
  },
  {
    icon: Headphones,
    title: '24/7 Dedicated US Roadside',
    desc: 'Tire changes, lockout support, and battery boosts anywhere on the highway 24 hours a day.',
  },
  {
    icon: ShieldCheck,
    title: 'Transparent Protection Tiers',
    desc: 'From full zero-deductible CDW to using your own policy—we respect your coverage choice.',
  },
  {
    icon: Receipt,
    title: 'Zero Hidden Counter Fees',
    desc: 'Every state surcharge, facility concession, and airport licensing fee is itemized upfront.',
  },
  {
    icon: PlaneTakeoff,
    title: 'Airport Terminal Pick-Up',
    desc: 'Bypass long rental shuttle loops with prioritized curbside pickup at major US terminals.',
  },
  {
    icon: Sparkles,
    title: 'Certified Pristine & Sanitized',
    desc: 'Every vehicle completes a multi-point mechanical inspection and complete cabin detailing before keys handoff.',
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 bg-[#F5F7FA] dark:bg-[#070E1E] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#FF6B2C] mb-2">
            The Veloce Guarantee
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3A] dark:text-white tracking-tight">
            Why Travelers Across America Choose Us
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            A customer-first car rental standard designed to eliminate airport rental friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REASONS.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white dark:bg-[#0B1B3A] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0B1B3A]/5 dark:bg-slate-800 flex items-center justify-center text-[#FF6B2C] mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {r.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
