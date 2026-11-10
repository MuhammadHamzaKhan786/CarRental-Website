import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CARS } from '../data/cars.ts';
import { LOCATIONS } from '../data/locations.ts';
import { CarCard } from '../components/cars/CarCard.tsx';
import { Car, CarCategory } from '../types/index.ts';
import { useApp } from '../context/AppContext.tsx';
import { formatUSD } from '../utils/pricing.ts';
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  Search,
  MapPin,
  Calendar,
  Users,
  ChevronDown,
  ArrowUpDown,
  Car as CarIcon,
} from 'lucide-react';

const CATEGORIES: CarCategory[] = ['All', 'SUV', 'Sedan', 'Luxury', 'Electric', 'Truck', 'Economy'];
const BRANDS = ['All', 'Toyota', 'Ford', 'Chevrolet', 'Tesla', 'Jeep', 'BMW', 'Mercedes-Benz', 'Honda', 'Dodge', 'Nissan'];
const TRANSMISSIONS = ['All', 'Automatic'];
const FUELS = ['All', 'Gasoline', 'Hybrid', 'Electric'];
const SEATS_OPTIONS = ['All', '4', '5', '8'];

export const SearchResultsPage: React.FC = () => {
  const [urlParams, setUrlParams] = useSearchParams();
  const navigate = useNavigate();
  const { searchParams, updateSearchParams } = useApp();

  // URL Query reading
  const initialCategory = (urlParams.get('category') as CarCategory) || searchParams.carCategory || 'All';
  const initialLocation = urlParams.get('location') || searchParams.pickUpLocation || 'All';
  const initialBrand = urlParams.get('brand') || 'All';

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<CarCategory>(initialCategory);
  const [selectedLocation, setSelectedLocation] = useState<string>(initialLocation);
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
  const [selectedSeats, setSelectedSeats] = useState<string>('All');
  const [selectedFuel, setSelectedFuel] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(150);
  const [minPrice, setMinPrice] = useState<number>(30);
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc'>('popularity');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Mobile bottom sheet state
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state if url params change
  useEffect(() => {
    const cat = urlParams.get('category');
    if (cat) setSelectedCategory(cat as CarCategory);
    const loc = urlParams.get('location');
    if (loc) setSelectedLocation(loc);
    const b = urlParams.get('brand');
    if (b) setSelectedBrand(b);
  }, [urlParams]);

  // Reset filters
  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSelectedLocation('All');
    setSelectedBrand('All');
    setSelectedSeats('All');
    setSelectedFuel('All');
    setMaxPrice(150);
    setMinPrice(30);
    setSearchQuery('');
    setSortBy('popularity');
    setUrlParams({});
  };

  // Filtered & Sorted cars
  const filteredCars = useMemo(() => {
    return CARS.filter((car) => {
      // Category filter
      if (selectedCategory !== 'All' && car.category !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== 'All' && !car.make.toLowerCase().includes(selectedBrand.toLowerCase())) {
        return false;
      }
      // Location filter
      if (selectedLocation !== 'All' && !car.availableLocations.includes(selectedLocation)) {
        return false;
      }
      // Price range
      if (car.pricePerDay < minPrice || car.pricePerDay > maxPrice) {
        return false;
      }
      // Seats filter
      if (selectedSeats !== 'All' && car.seats !== Number(selectedSeats)) {
        return false;
      }
      // Fuel filter
      if (selectedFuel !== 'All' && car.fuelType !== selectedFuel) {
        return false;
      }
      // Search text query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = car.name.toLowerCase().includes(q);
        const matchesMake = car.make.toLowerCase().includes(q);
        const matchesModel = car.model.toLowerCase().includes(q);
        if (!matchesName && !matchesMake && !matchesModel) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerDay - b.pricePerDay;
      if (sortBy === 'price-desc') return b.pricePerDay - a.pricePerDay;
      // Popularity default (rating * reviews)
      return b.rating * b.reviewCount - a.rating * a.reviewCount;
    });
  }, [
    selectedCategory,
    selectedBrand,
    selectedLocation,
    minPrice,
    maxPrice,
    selectedSeats,
    selectedFuel,
    searchQuery,
    sortBy,
  ]);

  const activeFiltersCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedLocation !== 'All' ? 1 : 0) +
    (selectedBrand !== 'All' ? 1 : 0) +
    (selectedSeats !== 'All' ? 1 : 0) +
    (selectedFuel !== 'All' ? 1 : 0) +
    (maxPrice < 150 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const matchedLocationObj = LOCATIONS.find(l => l.code === searchParams.pickUpLocation);

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#070E1E] py-8 sm:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Search Bar & Summary Strip */}
        <div className="bg-white dark:bg-[#0B1B3A] rounded-3xl p-5 sm:p-6 mb-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FF6B2C]" />
                <span className="font-semibold text-slate-900 dark:text-white">
                  {matchedLocationObj ? matchedLocationObj.name : 'All US Locations'}
                </span>
              </div>
              <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">&bull;</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#FF6B2C]" />
                <span>
                  {searchParams.pickUpDate} to {searchParams.returnDate}
                </span>
              </div>
              <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">&bull;</span>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#FF6B2C]" />
                <span>Driver Age: {searchParams.driverAge}</span>
              </div>
            </div>

            {/* Quick Keyword Search input */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by make/model..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B2C]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Mobile filter toggle button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B1B3A] dark:bg-slate-800 text-white text-xs font-semibold shrink-0"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#FF6B2C]" />
                <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 bg-white dark:bg-[#0B1B3A] rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm sticky top-28 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#FF6B2C]" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  Filters
                </h3>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-[#FF6B2C] hover:underline flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            {/* Price Range Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Max Daily Rate</span>
                <span className="text-[#FF6B2C] tabular-nums font-mono text-sm">
                  {formatUSD(maxPrice)}/day
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="150"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#FF6B2C] cursor-pointer"
                aria-label="Max daily price slider"
              />
              <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-300 font-mono">
                <span>$40</span>
                <span>$95</span>
                <span>$150+</span>
              </div>
            </div>

            {/* Category / Vehicle Type */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Vehicle Category
              </label>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#0B1B3A] text-white dark:bg-[#FF6B2C]'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Location Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Pick-up Hub
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B2C]"
              >
                <option value="All">All 40+ US Locations</option>
                <optgroup label="Airports">
                  {LOCATIONS.filter((l) => l.type === 'Airport').map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.code} - {l.city}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Downtown Hubs">
                  {LOCATIONS.filter((l) => l.type === 'Downtown').map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.city} ({l.state})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Brand Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Automotive Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B2C]"
              >
                {BRANDS.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Fuel Type */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Fuel & Powertrain
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {FUELS.map((fuel) => (
                  <button
                    key={fuel}
                    onClick={() => setSelectedFuel(fuel)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedFuel === fuel
                        ? 'bg-[#0B1B3A] text-white dark:bg-[#FF6B2C]'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {fuel}
                  </button>
                ))}
              </div>
            </div>

            {/* Passenger Seats */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Passenger Seats
              </label>
              <div className="flex gap-2">
                {SEATS_OPTIONS.map((seats) => (
                  <button
                    key={seats}
                    onClick={() => setSelectedSeats(seats)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedSeats === seats
                        ? 'bg-[#0B1B3A] text-white dark:bg-[#FF6B2C]'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {seats === 'All' ? 'All' : `${seats} Seats`}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Results Grid Area */}
          <main className="lg:col-span-3 space-y-6">
            {/* Header: Count & Sorting */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0B1B3A] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Showing{' '}
                <span className="text-[#FF6B2C] font-bold tabular-nums">
                  {filteredCars.length}
                </span>{' '}
                available vehicles
              </div>

              {/* Sorting Dropdown */}
              <div className="flex items-center gap-2 text-xs font-medium">
                <ArrowUpDown className="w-4 h-4 text-slate-400" />
                <span className="text-slate-500">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#FF6B2C]"
                >
                  <option value="popularity">Popularity & Rating</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Fleet Cards Grid */}
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white dark:bg-[#0B1B3A] rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                  <CarIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  No matching vehicles found
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Try adjusting your price range, clearing some category filters, or selecting a broader location.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6B2C] hover:bg-[#E85819] text-white text-xs font-bold transition-all shadow-md"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Clear All Filters</span>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Slide-Up Bottom Sheet */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-end">
          <div className="bg-white dark:bg-[#0B1B3A] rounded-t-3xl max-h-[85vh] overflow-y-auto p-6 space-y-6 animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Filter Vehicles ({filteredCars.length} results)
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Price slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Max Daily Rate</span>
                <span className="text-[#FF6B2C] font-mono">{formatUSD(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="40"
                max="150"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#FF6B2C]"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      selectedCategory === cat
                        ? 'bg-[#FF6B2C] text-white'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm"
              >
                {BRANDS.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Bottom Sheet Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex gap-3">
              <button
                onClick={handleClearFilters}
                className="flex-1 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 rounded-xl bg-[#FF6B2C] text-white text-xs font-bold shadow-md"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
