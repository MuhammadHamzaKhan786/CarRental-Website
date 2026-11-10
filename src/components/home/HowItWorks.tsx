import React from 'react';
import { MapPin, Car, ShieldCheck, KeyRound } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Select Destination',
    desc: 'Pick your airport terminal or downtown city branch across 40+ premier US hubs.',
    icon: MapPin,
  },
  {
    step: '02',
    title: 'Choose Your Fleet',
    desc: 'Browse late-model American SUVs, sedans, trucks, or high-performance electric vehicles.',
    icon: Car,
  },
  {
    step: '03',
    title: 'Customize Protection',
    desc: 'Tailor coverage with $0 deductible CDW, toll transponders, GPS, or unlimited mileage.',
    icon: ShieldCheck,
  },
  {
    step: '04',
    title: 'Grab Keys & Drive',
    desc: 'Bypass counter wait times with digital check-in and streamlined curbside vehicle handover.',
    icon: KeyRound,
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-[#0B1B3A] border-t border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#FF6B2C] mb-2">
            Effortless US Car Rental
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3A] dark:text-white tracking-tight">
            How Renting With Veloce Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Four simple steps from your device to the open American interstate highway.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#0B1B3A] dark:bg-[#FF6B2C] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-300 dark:text-slate-700 tracking-wider">
                    {s.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
