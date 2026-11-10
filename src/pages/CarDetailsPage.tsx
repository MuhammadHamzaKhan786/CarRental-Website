import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CARS } from '../data/cars.ts';
import { LOCATIONS } from '../data/locations.ts';
import { INSURANCE_OPTIONS, EXTRAS_OPTIONS } from '../data/insuranceAndExtras.ts';
import { useApp } from '../context/AppContext.tsx';
import {
  calculateRentalDays,
  calculatePricing,
  formatUSD,
  checkPromoCode,
  toInputDateFormat,
} from '../utils/pricing.ts';
import {
  Heart,
  Star,
  Users,
  Gauge,
  Fuel,
  Snowflake,
  ShieldCheck,
  Check,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  ChevronLeft,
  X,
  Maximize2,
  Tag,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const CarDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    searchParams,
    updateSearchParams,
    isFavorite,
    toggleFavorite,
    showToast,
  } = useApp();

  const car = CARS.find((c) => c.id === id) || CARS[0];
  const favorited = isFavorite(car.id);

  // Gallery state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Booking customizer state
  const [pickUpLocation, setPickUpLocation] = useState(searchParams.pickUpLocation);
  const [returnLocation, setReturnLocation] = useState(searchParams.returnLocation);
  const [pickUpDate, setPickUpDate] = useState(searchParams.pickUpDate);
  const [returnDate, setReturnDate] = useState(searchParams.returnDate);
  const [driverAge, setDriverAge] = useState<number>(searchParams.driverAge);

  // Insurance & Extras selection
  const [selectedInsuranceId, setSelectedInsuranceId] = useState<string>('cdw-full');
  const [selectedExtraIds, setSelectedExtraIds] = useState<string[]>(['ezpass']);
  const [promoCodeInput, setPromoCodeInput] = useState<string>('ROADTRIP20');
  const [appliedPromo, setAppliedPromo] = useState<string>('ROADTRIP20');
  const [promoFeedback, setPromoFeedback] = useState<string | null>(
    'Promo ROADTRIP20 applied: 20% discount on base rate!'
  );

  const images = car.galleryUrls.length > 0 ? car.galleryUrls : [car.imageUrl];

  const rentalDays = useMemo(() => {
    return calculateRentalDays(pickUpDate, returnDate);
  }, [pickUpDate, returnDate]);

  const selectedInsuranceObj = INSURANCE_OPTIONS.find((i) => i.id === selectedInsuranceId);
  const selectedExtrasObjs = EXTRAS_OPTIONS.filter((e) => selectedExtraIds.includes(e.id));

  // Live pricing breakdown calculation
  const pricing = useMemo(() => {
    return calculatePricing({
      baseDailyRate: car.pricePerDay,
      days: rentalDays,
      driverAge,
      insuranceOption: selectedInsuranceObj,
      selectedExtras: selectedExtrasObjs,
      promoCode: appliedPromo,
    });
  }, [car.pricePerDay, rentalDays, driverAge, selectedInsuranceObj, selectedExtrasObjs, appliedPromo]);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const result = checkPromoCode(promoCodeInput, pricing.subtotal);
    if (result.valid) {
      setAppliedPromo(promoCodeInput.trim().toUpperCase());
      setPromoFeedback(result.message);
      showToast(result.message, 'success');
    } else {
      setPromoFeedback(result.message);
      showToast(result.message, 'error');
    }
  };

  const handleToggleExtra = (extraId: string) => {
    setSelectedExtraIds((prev) =>
      prev.includes(extraId) ? prev.filter((id) => id !== extraId) : [...prev, extraId]
    );
  };

  const handleProceedToCheckout = () => {
    // Validate driver age
    if (driverAge < 21) {
      showToast('Minimum rental age is 21 in the US.', 'error');
      return;
    }
    // Update global search context
    updateSearchParams({
      pickUpLocation,
      returnLocation,
      pickUpDate,
      returnDate,
      driverAge,
    });

    // Pass chosen options to checkout
    navigate('/checkout', {
      state: {
        carId: car.id,
        selectedInsuranceId,
        selectedExtraIds,
        appliedPromo,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#070E1E] py-8 sm:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            to="/cars"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-[#FF6B2C] dark:hover:text-[#FF6B2C] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Fleet</span>
          </Link>

          <button
            type="button"
            onClick={() => toggleFavorite(car.id)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1B3A] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-[#FF6B2C]"
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-[#FF6B2C] text-[#FF6B2C]' : ''}`} />
            <span>{favorited ? 'Favorited' : 'Save to Favorites'}</span>
          </button>
        </div>

        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B2C]">
                {car.category} Fleet
              </span>
              <span className="text-slate-300 dark:text-slate-700">&bull;</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Model Year {car.year}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              {car.name}
            </h1>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3A] dark:text-white tracking-tight font-mono tabular-nums">
              {formatUSD(car.pricePerDay)}
            </span>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              /day base rate
            </span>
          </div>
        </div>

        {/* 2-Column Split: Visual Gallery & Specs (Left) vs Sticky Booking Calculator (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Gallery, Specs & Features */}
          <div className="lg:col-span-7 space-y-8">
            {/* Gallery Main Container */}
            <div className="space-y-3">
              <div
                onClick={() => setLightboxOpen(true)}
                className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-slate-900 shadow-lg cursor-pointer group"
              >
                <img
                  src={images[selectedImageIndex] || car.imageUrl}
                  alt={car.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 text-white backdrop-blur-md opacity-80 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImageIndex === idx
                          ? 'border-[#FF6B2C] shadow-md scale-95'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Badges Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1B3A] border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
                <Users className="w-5 h-5 text-[#FF6B2C]" />
                <div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Capacity</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{car.seats} Seats</div>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1B3A] border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
                <Gauge className="w-5 h-5 text-[#FF6B2C]" />
                <div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Transmission</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{car.transmission}</div>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1B3A] border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
                <Fuel className="w-5 h-5 text-[#FF6B2C]" />
                <div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Economy</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{car.mpg}</div>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1B3A] border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
                <Snowflake className="w-5 h-5 text-[#FF6B2C]" />
                <div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Climate</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Dual-Zone A/C</div>
                </div>
              </div>
            </div>

            {/* Technical Specifications Table */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B1B3A] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Vehicle Specifications
              </h3>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Powertrain / Engine</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{car.specs.engine}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Total Horsepower</span>
                  <span className="font-semibold text-slate-900 dark:text-white font-mono">{car.specs.horsepower}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Acceleration</span>
                  <span className="font-semibold text-slate-900 dark:text-white font-mono">{car.specs.acceleration}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Drivetrain Configuration</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{car.specs.driveType}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Trunk / Cargo Volume</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{car.specs.cargoCapacity}</span>
                </div>
              </div>
            </div>

            {/* Standard Premium Features */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B1B3A] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Included Features & Amenities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {car.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Insurance Options Section */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B1B3A] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Coverage & Protection Plans
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Select your preferred tier
                </span>
              </div>

              <div className="space-y-3">
                {INSURANCE_OPTIONS.map((ins) => {
                  const isSelected = selectedInsuranceId === ins.id;
                  return (
                    <div
                      key={ins.id}
                      onClick={() => setSelectedInsuranceId(ins.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#FF6B2C] bg-orange-50/20 dark:bg-orange-950/20 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="insurance"
                            checked={isSelected}
                            onChange={() => setSelectedInsuranceId(ins.id)}
                            className="text-[#FF6B2C] focus:ring-[#FF6B2C]"
                          />
                          <div>
                            <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                              <span>{ins.name}</span>
                              {ins.recommended && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FF6B2C] text-white uppercase font-black">
                                  Recommended
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              {ins.description}
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="font-bold text-sm text-[#0B1B3A] dark:text-white font-mono">
                            {ins.pricePerDay === 0 ? 'Included' : `${formatUSD(ins.pricePerDay)}/day`}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Popular Extras Section */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B1B3A] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Add Travel Extras
              </h3>
              <div className="space-y-3">
                {EXTRAS_OPTIONS.map((extra) => {
                  const isChecked = selectedExtraIds.includes(extra.id);
                  return (
                    <label
                      key={extra.id}
                      className={`flex items-start justify-between gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'border-[#FF6B2C] bg-orange-50/20 dark:bg-orange-950/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleExtra(extra.id)}
                          className="w-4 h-4 mt-0.5 rounded text-[#FF6B2C] focus:ring-[#FF6B2C]"
                        />
                        <div>
                          <div className="font-bold text-sm text-slate-900 dark:text-white">
                            {extra.name}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {extra.description}
                          </div>
                        </div>
                      </div>
                      <div className="font-bold text-sm text-[#0B1B3A] dark:text-white font-mono shrink-0">
                        {formatUSD(extra.pricePerDay)}/day
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Live Price Calculator & Booking Form */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B1B3A] border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Trip Customizer & Live Price
              </h3>

              {/* Location Selectors */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                    Pick-up Hub
                  </label>
                  <select
                    value={pickUpLocation}
                    onChange={(e) => setPickUpLocation(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc.code} value={loc.code}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                    Return Hub
                  </label>
                  <select
                    value={returnLocation}
                    onChange={(e) => setReturnLocation(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc.code} value={loc.code}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                    Pick-up Date
                  </label>
                  <input
                    type="date"
                    value={pickUpDate}
                    onChange={(e) => setPickUpDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                    Return Date
                  </label>
                  <input
                    type="date"
                    min={pickUpDate}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Driver Age */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                  Driver Age
                </label>
                <select
                  value={driverAge}
                  onChange={(e) => setDriverAge(Number(e.target.value))}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                >
                  <option value={21}>21 (Young Driver Fee applies)</option>
                  <option value={22}>22 (Young Driver Fee applies)</option>
                  <option value={23}>23 (Young Driver Fee applies)</option>
                  <option value={24}>24 (Young Driver Fee applies)</option>
                  <option value={25}>25+ (Standard)</option>
                  <option value={30}>30+</option>
                  <option value={45}>45+</option>
                </select>
                {pricing.youngDriverFeeTotal > 0 && (
                  <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1 font-medium">
                    Note: Drivers 21–24 are charged $25.00/day young driver insurance surcharge.
                  </p>
                )}
              </div>

              {/* Promo Code Input */}
              <div className="pt-2">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white text-xs font-bold"
                  >
                    Apply
                  </button>
                </form>
                {promoFeedback && (
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                    {promoFeedback}
                  </p>
                )}
              </div>

              {/* Itemized Price Breakdown */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>
                    Vehicle Base ({rentalDays} {rentalDays === 1 ? 'day' : 'days'} &times; {formatUSD(car.pricePerDay)})
                  </span>
                  <span className="font-mono tabular-nums font-semibold text-slate-900 dark:text-white">
                    {formatUSD(pricing.baseTotal)}
                  </span>
                </div>

                {pricing.youngDriverFeeTotal > 0 && (
                  <div className="flex justify-between text-amber-600 dark:text-amber-400">
                    <span>Young Driver Surcharge ($25/day &times; {rentalDays}d)</span>
                    <span className="font-mono tabular-nums font-semibold">
                      +{formatUSD(pricing.youngDriverFeeTotal)}
                    </span>
                  </div>
                )}

                {pricing.insuranceTotal > 0 && (
                  <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span>Coverage ({selectedInsuranceObj?.name})</span>
                    <span className="font-mono tabular-nums font-semibold text-slate-900 dark:text-white">
                      +{formatUSD(pricing.insuranceTotal)}
                    </span>
                  </div>
                )}

                {pricing.extrasTotal > 0 && (
                  <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span>Travel Extras ({selectedExtraIds.length} items)</span>
                    <span className="font-mono tabular-nums font-semibold text-slate-900 dark:text-white">
                      +{formatUSD(pricing.extrasTotal)}
                    </span>
                  </div>
                )}

                {pricing.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Discount ({pricing.promoCodeApplied})</span>
                    <span className="font-mono tabular-nums">-{formatUSD(pricing.discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>US State & Airport Concession Tax (9.25%)</span>
                  <span className="font-mono tabular-nums font-semibold">
                    {formatUSD(pricing.taxesAndConcessionFee)}
                  </span>
                </div>

                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Vehicle Licensing & Road Fee ($4.50/day)</span>
                  <span className="font-mono tabular-nums font-semibold">
                    {formatUSD(pricing.licensingFeeTotal)}
                  </span>
                </div>

                {/* Grand Total */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white block">
                      Estimated Grand Total
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Itemized in USD &bull; Pay online or counter
                    </span>
                  </div>
                  <span className="text-2xl font-black text-[#FF6B2C] font-mono tabular-nums">
                    {formatUSD(pricing.grandTotal)}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-[#FF6B2C] hover:bg-[#E85819] text-white font-bold text-sm sm:text-base shadow-xl shadow-orange-500/25 transition-all active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <img
            src={images[selectedImageIndex] || car.imageUrl}
            alt={car.name}
            referrerPolicy="no-referrer"
            className="max-w-5xl max-h-[85vh] w-auto h-auto object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
