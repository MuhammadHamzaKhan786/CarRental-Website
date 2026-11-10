import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.tsx';
import { LOCATIONS } from '../../data/locations.ts';
import { CarCategory } from '../../types/index.ts';
import {
  MapPin,
  Calendar,
  Clock,
  Car as CarIcon,
  UserCheck,
  AlertCircle,
  Search,
  Check,
} from 'lucide-react';
import { toInputDateFormat } from '../../utils/pricing.ts';

const TIME_OPTIONS = [
  '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM'
];

export const BookingWidget: React.FC = () => {
  const navigate = useNavigate();
  const { searchParams, updateSearchParams, showToast } = useApp();

  const [sameLocation, setSameLocation] = useState(
    searchParams.pickUpLocation === searchParams.returnLocation
  );
  const [pickUpLocation, setPickUpLocation] = useState(searchParams.pickUpLocation);
  const [returnLocation, setReturnLocation] = useState(searchParams.returnLocation);
  const [pickUpDate, setPickUpDate] = useState(searchParams.pickUpDate);
  const [pickUpTime, setPickUpTime] = useState(searchParams.pickUpTime || '10:00 AM');
  const [returnDate, setReturnDate] = useState(searchParams.returnDate);
  const [returnTime, setReturnTime] = useState(searchParams.returnTime || '10:00 AM');
  const [carCategory, setCarCategory] = useState<CarCategory>(searchParams.carCategory || 'All');
  const [driverAge, setDriverAge] = useState<number>(searchParams.driverAge || 26);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const todayStr = toInputDateFormat(new Date());

  const handlePickUpDateChange = (val: string) => {
    setPickUpDate(val);
    setErrorMessage(null);
    // If return date is earlier or same, push return date forward by 2 days
    if (val >= returnDate) {
      const nextDate = new Date(val);
      nextDate.setDate(nextDate.getDate() + 3);
      setReturnDate(toInputDateFormat(nextDate));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation 1: No past dates
    if (pickUpDate < todayStr) {
      setErrorMessage('Pick-up date cannot be in the past.');
      showToast('Pick-up date cannot be in the past.', 'error');
      return;
    }

    // Validation 2: Return date must be on or after pick-up date
    if (returnDate < pickUpDate) {
      setErrorMessage('Return date must be after pick-up date.');
      showToast('Return date must be after pick-up date.', 'error');
      return;
    }

    // Validation 3: Driver age must be >= 21
    if (driverAge < 21) {
      setErrorMessage('Renters must be at least 21 years of age.');
      showToast('Renters must be at least 21 years of age.', 'error');
      return;
    }

    const effectiveReturnLocation = sameLocation ? pickUpLocation : returnLocation;

    // Save to context
    updateSearchParams({
      pickUpLocation,
      returnLocation: effectiveReturnLocation,
      pickUpDate,
      pickUpTime,
      returnDate,
      returnTime,
      carCategory,
      driverAge,
    });

    showToast('Searching available vehicles...', 'info');
    navigate(
      `/cars?location=${encodeURIComponent(pickUpLocation)}&category=${encodeURIComponent(
        carCategory
      )}`
    );
  };

  const isYoungDriver = driverAge >= 21 && driverAge <= 24;

  return (
    <div className="w-full bg-white dark:bg-[#0B1B3A] rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 dark:border-slate-800 transition-colors">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Top Controls: Return to same location toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <label className="flex items-center gap-2 cursor-pointer select-none text-sm font-medium text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={sameLocation}
              onChange={(e) => {
                setSameLocation(e.target.checked);
                if (e.target.checked) setReturnLocation(pickUpLocation);
              }}
              className="w-4 h-4 rounded text-[#FF6B2C] focus:ring-[#FF6B2C] border-slate-300"
            />
            <span>Return car to same location</span>
          </label>

          {isYoungDriver && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800/60">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Young Driver Fee ($25/day) applies for ages 21–24</span>
            </div>
          )}
        </div>

        {/* Location Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pick-Up Location */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Pick-Up Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <MapPin className="w-5 h-5 text-[#FF6B2C]" />
              </div>
              <select
                value={pickUpLocation}
                onChange={(e) => {
                  setPickUpLocation(e.target.value);
                  if (sameLocation) setReturnLocation(e.target.value);
                }}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-[#FF6B2C] focus:outline-none transition-colors"
                aria-label="Select pick-up airport or downtown location"
              >
                <optgroup label="Major US Airports">
                  {LOCATIONS.filter((l) => l.type === 'Airport').map((loc) => (
                    <option key={loc.code} value={loc.code}>
                      {loc.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Downtown US Hubs">
                  {LOCATIONS.filter((l) => l.type === 'Downtown').map((loc) => (
                    <option key={loc.code} value={loc.code}>
                      {loc.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* Drop-Off Location */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Return Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <MapPin className="w-5 h-5 text-slate-400" />
              </div>
              <select
                disabled={sameLocation}
                value={sameLocation ? pickUpLocation : returnLocation}
                onChange={(e) => setReturnLocation(e.target.value)}
                className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-sm font-medium transition-colors ${
                  sameLocation
                    ? 'bg-slate-100 dark:bg-slate-900/60 text-slate-500 border-slate-200 dark:border-slate-800 cursor-not-allowed'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FF6B2C] focus:outline-none'
                }`}
                aria-label="Select return airport or downtown location"
              >
                <optgroup label="Major US Airports">
                  {LOCATIONS.filter((l) => l.type === 'Airport').map((loc) => (
                    <option key={loc.code} value={loc.code}>
                      {loc.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Downtown US Hubs">
                  {LOCATIONS.filter((l) => l.type === 'Downtown').map((loc) => (
                    <option key={loc.code} value={loc.code}>
                      {loc.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>
        </div>

        {/* Dates & Times Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pick-Up Date */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Pick-Up Date
            </label>
            <div className="relative">
              <input
                type="date"
                min={todayStr}
                value={pickUpDate}
                onChange={(e) => handlePickUpDateChange(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-[#FF6B2C] focus:outline-none transition-colors"
                aria-label="Pick-up date"
              />
            </div>
          </div>

          {/* Pick-Up Time */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Pick-Up Time
            </label>
            <div className="relative">
              <select
                value={pickUpTime}
                onChange={(e) => setPickUpTime(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-[#FF6B2C] focus:outline-none transition-colors"
                aria-label="Pick-up time"
              >
                {TIME_OPTIONS.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Return Date */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Return Date
            </label>
            <div className="relative">
              <input
                type="date"
                min={pickUpDate || todayStr}
                value={returnDate}
                onChange={(e) => {
                  setReturnDate(e.target.value);
                  setErrorMessage(null);
                }}
                required
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-[#FF6B2C] focus:outline-none transition-colors"
                aria-label="Return date"
              />
            </div>
          </div>

          {/* Return Time */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Return Time
            </label>
            <div className="relative">
              <select
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-[#FF6B2C] focus:outline-none transition-colors"
                aria-label="Return time"
              >
                {TIME_OPTIONS.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category & Age Row + Submit CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Car Type Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Vehicle Type
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <CarIcon className="w-5 h-5" />
              </div>
              <select
                value={carCategory}
                onChange={(e) => setCarCategory(e.target.value as CarCategory)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-[#FF6B2C] focus:outline-none transition-colors"
                aria-label="Car type category"
              >
                <option value="All">All Categories</option>
                <option value="SUV">SUVs & 4WD</option>
                <option value="Sedan">Sedans</option>
                <option value="Luxury">Luxury & Sports</option>
                <option value="Electric">Electric (EV)</option>
                <option value="Truck">Pickup Trucks</option>
                <option value="Economy">Economy</option>
              </select>
            </div>
          </div>

          {/* Driver Age Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Driver Age (US Req: 21+)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <UserCheck className="w-5 h-5" />
              </div>
              <select
                value={driverAge}
                onChange={(e) => setDriverAge(Number(e.target.value))}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-[#FF6B2C] focus:outline-none transition-colors"
                aria-label="Driver age"
              >
                <option value={21}>Age 21 (Young driver fee)</option>
                <option value={22}>Age 22 (Young driver fee)</option>
                <option value={23}>Age 23 (Young driver fee)</option>
                <option value={24}>Age 24 (Young driver fee)</option>
                <option value={25}>Age 25+ (Standard)</option>
                <option value={28}>Age 28</option>
                <option value={35}>Age 35+</option>
                <option value={50}>Age 50+</option>
              </select>
            </div>
          </div>

          {/* Search Button (spans 2 columns on desktop) */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#FF6B2C] hover:bg-[#E85819] text-white font-bold text-base shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 transition-all duration-200 active:scale-[0.99]"
            >
              <Search className="w-5 h-5" />
              <span>Search Available Cars</span>
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}
      </form>
    </div>
  );
};
