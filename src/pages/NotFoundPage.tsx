import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Compass, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-[#F5F7FA] dark:bg-[#070E1E] transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-[#0B1B3A] rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-slate-800 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#FF6B2C]/10 text-[#FF6B2C] flex items-center justify-center mx-auto shadow-sm">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white font-mono">
            404
          </div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200">
            Off The Beaten Path
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            The page or vehicle you are searching for may have been relocated or is currently on a cross-country adventure.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Link
            to="/cars"
            className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#FF6B2C] hover:bg-[#E85819] text-white font-bold text-sm shadow-md transition-all"
          >
            <Car className="w-4 h-4" />
            <span>Browse Available Fleet</span>
          </Link>
          <Link
            to="/"
            className="py-3 px-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
