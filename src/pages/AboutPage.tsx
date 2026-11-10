import React from 'react';
import { Link } from 'react-router-dom';
import { StatsCounter } from '../components/home/StatsCounter.tsx';
import { ShieldCheck, Award, HeartHandshake, Car, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#070E1E] py-12 transition-colors space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#FF6B2C] mb-2">
            The Veloce Story
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Redefining Car Rental For The Modern American Traveler
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Founded with the belief that reserving a car in the United States should be as seamless, transparent, and exhilarating as the road trip itself.
          </p>
        </div>

        {/* Narrative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/src/assets/images/hero_us_car_rental_1794333645453.jpg"
              alt="Veloce car cruising coastal highway"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B3A] dark:text-white">
              Built To Eliminate Airport Desk Frustrations
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              We grew tired of the legacy car rental playbook: standing in 45-minute terminal lines after a long flight, being pressured into surprise counter insurance surcharges, and finding keys to a vehicle you never requested.
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Veloce combines digital curbside check-in with a meticulously maintained fleet of popular American models—from the iconic 5.0L Ford Mustang and rugged Jeep Wrangler to the whisper-quiet Tesla Model 3 and spacious Chevy Tahoe.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <div className="font-bold text-slate-900 dark:text-white">100% Upfront Pricing</div>
                  <div className="text-slate-500">Every tax & fee listed before payment</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-[#FF6B2C] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <div className="font-bold text-slate-900 dark:text-white">Late-Model Fleet</div>
                  <div className="text-slate-500">Vehicles under 15,000 miles</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StatsCounter />

      <div className="max-w-4xl mx-auto px-4 text-center pb-12">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Ready to experience car rental done right?
        </h3>
        <Link
          to="/cars"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#FF6B2C] hover:bg-[#E85819] text-white font-bold text-sm shadow-md"
        >
          <span>Find Your Vehicle</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
