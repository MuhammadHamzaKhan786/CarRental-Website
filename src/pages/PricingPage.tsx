import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PricingPlans } from '../components/home/PricingPlans.tsx';
import { Check, ShieldAlert, FileText, ArrowRight } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#070E1E] py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-widest text-[#FF6B2C] mb-2">
            No Hidden Fees Guarantee
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Transparent Pricing & Rate Plans
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            What you see is what you pay. Every US state tax, airport concession fee, and optional protection tier is fully itemized before you enter payment details.
          </p>
        </div>

        {/* Pricing Plans Component */}
        <PricingPlans />

        {/* Transparent Fee Guide */}
        <div className="bg-white dark:bg-[#0B1B3A] rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-8">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Understanding US Car Rental Taxes & Surcharges
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Unlike legacy rental desks with unexpected counter invoices, Veloce items are transparent:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B2C]">
                Standard 9.25%
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                State Sales & Airport Concession Fee
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Mandatory municipal tax and airport authority customer facility charge (CFC) for maintaining airport access routes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B2C]">
                $4.50 / Day
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Vehicle Licensing & Road Recovery
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Covers annual state vehicle registration, DMV inspection fees, and department of transportation highway compliance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                $25.00 / Day (Ages 21–24)
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Young Driver Protection Surcharge
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                US commercial fleet insurance carriers require an actuarial young driver fee for drivers ages 21 to 24. Exempt at age 25+.
              </p>
            </div>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={() => navigate('/cars')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#FF6B2C] hover:bg-[#E85819] text-white font-bold text-sm shadow-md"
            >
              <span>Explore Fleet with Live Pricing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
