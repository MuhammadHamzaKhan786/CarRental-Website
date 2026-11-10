import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOCATIONS } from '../data/locations.ts';
import { useApp } from '../context/AppContext.tsx';
import { formatUSD } from '../utils/pricing.ts';
import { MapPin, PlaneTakeoff, Building2, Clock, ArrowRight, Search } from 'lucide-react';

export const LocationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { updateSearchParams } = useApp();
  const [filterType, setFilterType] = useState<'All' | 'Airport' | 'Downtown'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLocations = LOCATIONS.filter((loc) => {
    if (filterType !== 'All' && loc.type !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        loc.name.toLowerCase().includes(q) ||
        loc.city.toLowerCase().includes(q) ||
        loc.code.toLowerCase().includes(q) ||
        loc.state.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSelectLocation = (code: string) => {
    updateSearchParams({ pickUpLocation: code, returnLocation: code });
    navigate(`/cars?location=${encodeURIComponent(code)}`);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#070E1E] py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-[#FF6B2C] mb-2">
            Nationwide US Presence
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Our Airport Terminals & Downtown Hubs
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Pick up curbside at major US airport terminals or downtown financial districts with zero counter delays.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white dark:bg-[#0B1B3A] rounded-2xl p-4 sm:p-6 mb-10 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {(['All', 'Airport', 'Downtown'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filterType === type
                    ? 'bg-[#0B1B3A] dark:bg-[#FF6B2C] text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300'
                }`}
              >
                {type === 'All' ? 'All 18 Locations' : type === 'Airport' ? 'Major Airports' : 'Downtown Branches'}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, state, or code..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B2C]"
            />
          </div>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map((loc) => {
            const isAirport = loc.type === 'Airport';
            return (
              <div
                key={loc.code}
                className="p-6 rounded-3xl bg-white dark:bg-[#0B1B3A] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="font-mono font-black text-lg px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 text-[#0B1B3A] dark:text-white border border-slate-200 dark:border-slate-800">
                      {loc.code}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FF6B2C]/10 text-[#FF6B2C] flex items-center gap-1">
                      {isAirport ? <PlaneTakeoff className="w-3.5 h-3.5" /> : <Building2 className="w-3.5 h-3.5" />}
                      <span>{loc.type}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    {loc.name}
                  </h3>

                  <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400 mb-4">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{loc.address}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{loc.hours}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Fleet starting at</span>
                    <span className="text-base font-extrabold text-[#0B1B3A] dark:text-white font-mono tabular-nums">
                      {formatUSD(loc.startingPrice)}/day
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectLocation(loc.code)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF6B2C] hover:bg-[#E85819] text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <span>Book Here</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
