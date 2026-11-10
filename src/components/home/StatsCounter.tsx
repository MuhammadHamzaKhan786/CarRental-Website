import React from 'react';
import { Users, Car, MapPin, Star } from 'lucide-react';

const STATS = [
  {
    icon: Users,
    value: '50K+',
    label: 'Happy US Travelers',
    sublabel: 'Over 120,000 trips completed',
  },
  {
    icon: Car,
    value: '1,200+',
    label: 'Late-Model Vehicles',
    sublabel: 'Average fleet age < 12 months',
  },
  {
    icon: MapPin,
    value: '40+',
    label: 'US Cities & Airports',
    sublabel: 'Direct terminal pickup points',
  },
  {
    icon: Star,
    value: '4.9/5',
    label: 'Customer Satisfaction',
    sublabel: 'Based on 14,800+ verified reviews',
  },
];

export const StatsCounter: React.FC = () => {
  return (
    <section className="py-16 bg-[#0B1B3A] text-white border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-[#FF6B2C]/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FF6B2C]/10 text-[#FF6B2C] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-1 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-slate-200 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-400">
                  {stat.sublabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
