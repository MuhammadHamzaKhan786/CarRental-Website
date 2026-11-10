import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.tsx';
import { CARS } from '../data/cars.ts';
import { LOCATIONS } from '../data/locations.ts';
import { CarCard } from '../components/cars/CarCard.tsx';
import { formatUSD } from '../utils/pricing.ts';
import {
  CalendarCheck,
  Heart,
  Car as CarIcon,
  MapPin,
  Clock,
  Calendar,
  AlertCircle,
  XCircle,
  ArrowRight,
  ShieldCheck,
  User,
  LogOut,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [urlParams, setUrlParams] = useSearchParams();
  const navigate = useNavigate();
  const { bookings, cancelBooking, favorites, auth, logout, showToast } = useApp();

  const tabParam = urlParams.get('tab');
  const [activeTab, setActiveTab] = useState<'bookings' | 'favorites'>(
    tabParam === 'favorites' ? 'favorites' : 'bookings'
  );

  useEffect(() => {
    if (tabParam === 'favorites') setActiveTab('favorites');
    else if (tabParam === 'bookings') setActiveTab('bookings');
  }, [tabParam]);

  const handleTabChange = (tab: 'bookings' | 'favorites') => {
    setActiveTab(tab);
    setUrlParams({ tab });
  };

  const favoriteCars = CARS.filter((car) => favorites.includes(car.id));

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#070E1E] py-8 sm:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Welcome Banner */}
        <div className="bg-white dark:bg-[#0B1B3A] rounded-3xl p-6 sm:p-8 mb-8 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#0B1B3A] text-white dark:bg-[#FF6B2C] flex items-center justify-center font-extrabold text-2xl shadow-md">
              {auth.user?.name.charAt(0) || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                  Welcome back, {auth.user?.name || 'Valued Renter'}
                </h1>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
                  Verified Driver
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {auth.user?.email} &bull; US License: {auth.user?.licenseNumber || 'CA-Verified'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/cars"
              className="px-5 py-2.5 rounded-xl bg-[#FF6B2C] hover:bg-[#E85819] text-white text-xs font-bold shadow-md transition-all"
            >
              Book New Rental
            </Link>
            <button
              onClick={logout}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-600 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dashboard Tabs Header */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 mb-8">
          <button
            onClick={() => handleTabChange('bookings')}
            className={`flex items-center gap-2 pb-3 px-4 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'bookings'
                ? 'border-[#FF6B2C] text-[#FF6B2C]'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>My Bookings ({bookings.length})</span>
          </button>

          <button
            onClick={() => handleTabChange('favorites')}
            className={`flex items-center gap-2 pb-3 px-4 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'favorites'
                ? 'border-[#FF6B2C] text-[#FF6B2C]'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Favorites ({favorites.length})</span>
          </button>
        </div>

        {/* TAB 1: My Bookings */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {bookings.length > 0 ? (
              bookings.map((booking) => {
                const pickUpLoc = LOCATIONS.find((l) => l.code === booking.searchParams.pickUpLocation);
                const returnLoc = LOCATIONS.find((l) => l.code === booking.searchParams.returnLocation);
                const isCancelled = booking.status === 'Cancelled';

                return (
                  <div
                    key={booking.id}
                    className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B1B3A] border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                      <img
                        src={booking.car.imageUrl}
                        alt={booking.car.name}
                        referrerPolicy="no-referrer"
                        className="w-32 h-20 object-cover rounded-2xl"
                      />

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-slate-500">
                            {booking.id}
                          </span>
                          <span
                            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                              isCancelled
                                ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400'
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {booking.car.name}
                        </h3>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#FF6B2C]" />
                            <span>{pickUpLoc?.name || booking.searchParams.pickUpLocation}</span>
                          </div>
                          <span>&bull;</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[#FF6B2C]" />
                            <span>
                              {booking.searchParams.pickUpDate} to {booking.searchParams.returnDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="flex items-center justify-between lg:justify-end gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
                      <div>
                        <div className="text-[11px] text-slate-400">Total Paid (USD)</div>
                        <div className="text-xl font-black text-[#0B1B3A] dark:text-white font-mono tabular-nums">
                          {formatUSD(booking.pricing.grandTotal)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {!isCancelled && (
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Are you sure you want to cancel reservation ${booking.id}? Full refund will be credited.`)) {
                                cancelBooking(booking.id);
                              }
                            }}
                            className="px-4 py-2 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 text-xs font-bold transition-colors"
                          >
                            Cancel Booking
                          </button>
                        )}
                        <Link
                          to={`/cars/${booking.car.id}`}
                          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-900 dark:text-white text-xs font-bold transition-colors"
                        >
                          View Vehicle
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white dark:bg-[#0B1B3A] rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
                <CalendarCheck className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  No active or completed bookings yet
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Find the ideal car for your next journey with our easy online booking.
                </p>
                <Link
                  to="/cars"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FF6B2C] text-white text-xs font-bold shadow-md"
                >
                  <span>Search Available Fleet</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Saved Favorites */}
        {activeTab === 'favorites' && (
          <div>
            {favoriteCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoriteCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-[#0B1B3A] rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
                <Heart className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  You haven&apos;t saved any favorites yet
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Click the heart icon on any vehicle card to quickly compare and save models here.
                </p>
                <Link
                  to="/cars"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FF6B2C] text-white text-xs font-bold shadow-md"
                >
                  <span>Explore Cars</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
