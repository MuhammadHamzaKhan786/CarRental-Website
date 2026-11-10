import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { CARS } from '../data/cars.ts';
import { LOCATIONS } from '../data/locations.ts';
import { INSURANCE_OPTIONS, EXTRAS_OPTIONS } from '../data/insuranceAndExtras.ts';
import { useApp } from '../context/AppContext.tsx';
import {
  calculateRentalDays,
  calculatePricing,
  formatUSD,
  formatUSPhone,
  formatCardNumber,
  formatCardExpiry,
  formatToUSDate,
} from '../utils/pricing.ts';
import { Booking, DriverDetails } from '../types/index.ts';
import {
  User,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Printer,
  Calendar,
  MapPin,
  Clock,
  Car as CarIcon,
  AlertCircle,
  Sparkles,
  Lock,
} from 'lucide-react';

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchParams, addBooking, auth, showToast } = useApp();

  const stateData = (location.state as any) || {};
  const carId = stateData.carId || 'ford-mustang-gt';
  const car = CARS.find((c) => c.id === carId) || CARS[0];

  // Current checkout step: 1 = Driver, 2 = Extras & Protection, 3 = Payment, 4 = Confirmation
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Driver details form
  const [driverDetails, setDriverDetails] = useState<DriverDetails>({
    firstName: auth.user ? auth.user.name.split(' ')[0] : 'Michael',
    lastName: auth.user ? auth.user.name.split(' ').slice(1).join(' ') || 'Scott' : 'Reynolds',
    email: auth.user ? auth.user.email : 'michael.reynolds@example.com',
    phone: auth.user ? auth.user.phone : '(555) 392-8174',
    licenseNumber: 'D93847291',
    licenseState: 'CA',
    driverAge: searchParams.driverAge || 28,
    streetAddress: '1042 Wilshire Blvd',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90017',
  });

  // Selected Protection & Extras
  const [selectedInsuranceId, setSelectedInsuranceId] = useState<string>(
    stateData.selectedInsuranceId || 'cdw-full'
  );
  const [selectedExtraIds, setSelectedExtraIds] = useState<string[]>(
    stateData.selectedExtraIds || ['ezpass']
  );
  const [promoCode] = useState<string>(stateData.appliedPromo || 'ROADTRIP20');

  // Payment form
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'google_pay'>('card');
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardName, setCardName] = useState('Michael Reynolds');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('883');
  const [billingZip, setBillingZip] = useState('90017');

  // Confirmation Record
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const rentalDays = useMemo(() => {
    return calculateRentalDays(searchParams.pickUpDate, searchParams.returnDate);
  }, [searchParams.pickUpDate, searchParams.returnDate]);

  const selectedInsuranceObj = INSURANCE_OPTIONS.find((i) => i.id === selectedInsuranceId);
  const selectedExtrasObjs = EXTRAS_OPTIONS.filter((e) => selectedExtraIds.includes(e.id));

  const pricing = useMemo(() => {
    return calculatePricing({
      baseDailyRate: car.pricePerDay,
      days: rentalDays,
      driverAge: driverDetails.driverAge,
      insuranceOption: selectedInsuranceObj,
      selectedExtras: selectedExtrasObjs,
      promoCode,
    });
  }, [car.pricePerDay, rentalDays, driverDetails.driverAge, selectedInsuranceObj, selectedExtrasObjs, promoCode]);

  // Validation step 1: Driver
  const validateDriverDetails = (): boolean => {
    const errs: Record<string, string> = {};
    if (!driverDetails.firstName.trim()) errs.firstName = 'First name is required.';
    if (!driverDetails.lastName.trim()) errs.lastName = 'Last name is required.';
    if (!driverDetails.email.includes('@')) errs.email = 'Valid email is required.';
    if (driverDetails.phone.replace(/\D/g, '').length < 10) errs.phone = '10-digit US phone required.';
    if (!driverDetails.licenseNumber.trim()) errs.licenseNumber = 'Valid US driver license is required.';
    if (driverDetails.driverAge < 21) errs.driverAge = 'Driver must be 21+ years old.';
    if (!driverDetails.zipCode.trim() || driverDetails.zipCode.length < 5) errs.zipCode = 'Valid 5-digit ZIP required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Validation step 3: Payment
  const validatePayment = (): boolean => {
    if (paymentMethod === 'apple_pay' || paymentMethod === 'google_pay') return true;

    const errs: Record<string, string> = {};
    const digits = cardNumber.replace(/\s/g, '');
    if (digits.length < 15) errs.cardNumber = 'Valid 15-16 digit card number required.';
    if (!cardName.trim()) errs.cardName = 'Cardholder name required.';
    if (!cardExpiry.includes('/') || cardExpiry.length < 5) errs.cardExpiry = 'Format MM/YY required.';
    if (cardCvv.length < 3) errs.cardCvv = '3 or 4 digit CVV required.';
    if (!billingZip || billingZip.length < 5) errs.billingZip = 'Valid 5-digit US ZIP required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextFromDriver = () => {
    if (validateDriverDetails()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showToast('Please correct highlighted driver fields.', 'error');
    }
  };

  const handleNextFromExtras = () => {
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteBooking = () => {
    if (!validatePayment()) {
      showToast('Please correct the payment information.', 'error');
      return;
    }

    const bookingRef = `VEL-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: Booking = {
      id: bookingRef,
      car,
      searchParams,
      driverDetails,
      selectedInsuranceId,
      selectedExtraIds,
      pricing,
      paymentMethod,
      cardLast4: cardNumber.replace(/\s/g, '').slice(-4) || '4242',
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    // Save to context & storage
    addBooking(newBooking);
    setConfirmedBooking(newBooking);
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
    showToast(`Reservation ${bookingRef} successfully confirmed!`, 'success');
  };

  const pickUpLocObj = LOCATIONS.find((l) => l.code === searchParams.pickUpLocation);
  const returnLocObj = LOCATIONS.find((l) => l.code === searchParams.returnLocation);

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#070E1E] py-8 sm:py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Progress Bar (Hidden on step 4 confirmation) */}
        {currentStep < 4 && (
          <div className="mb-10">
            <div className="flex items-center justify-between max-w-2xl mx-auto relative">
              {/* Connecting line */}
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-slate-200 dark:bg-slate-800 -z-0" />
              <div
                className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-[#FF6B2C] -z-0 transition-all duration-300"
                style={{
                  width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%',
                }}
              />

              {/* Step 1 */}
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    currentStep >= 1
                      ? 'bg-[#FF6B2C] text-white shadow-md'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  1
                </div>
                <span className="text-xs font-bold mt-2 text-slate-800 dark:text-slate-200">
                  Driver Info
                </span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    currentStep >= 2
                      ? 'bg-[#FF6B2C] text-white shadow-md'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  2
                </div>
                <span className="text-xs font-bold mt-2 text-slate-800 dark:text-slate-200">
                  Protection & Extras
                </span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    currentStep >= 3
                      ? 'bg-[#FF6B2C] text-white shadow-md'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  3
                </div>
                <span className="text-xs font-bold mt-2 text-slate-800 dark:text-slate-200">
                  Secure Payment
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: Driver Details */}
        {currentStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white dark:bg-[#0B1B3A] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Step 1: Primary Driver Identification
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  US federal and state rental regulations require a valid government driver license matching the primary renter.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={driverDetails.firstName}
                    onChange={(e) => setDriverDetails({ ...driverDetails, firstName: e.target.value })}
                    className={`w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border text-sm text-slate-900 dark:text-white ${
                      errors.firstName ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.firstName && <span className="text-xs text-rose-500 mt-0.5">{errors.firstName}</span>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={driverDetails.lastName}
                    onChange={(e) => setDriverDetails({ ...driverDetails, lastName: e.target.value })}
                    className={`w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border text-sm text-slate-900 dark:text-white ${
                      errors.lastName ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.lastName && <span className="text-xs text-rose-500 mt-0.5">{errors.lastName}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={driverDetails.email}
                    onChange={(e) => setDriverDetails({ ...driverDetails, email: e.target.value })}
                    className={`w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border text-sm text-slate-900 dark:text-white ${
                      errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.email && <span className="text-xs text-rose-500 mt-0.5">{errors.email}</span>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Phone Number (US Format) *
                  </label>
                  <input
                    type="tel"
                    value={driverDetails.phone}
                    onChange={(e) => setDriverDetails({ ...driverDetails, phone: formatUSPhone(e.target.value) })}
                    className={`w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border text-sm text-slate-900 dark:text-white ${
                      errors.phone ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.phone && <span className="text-xs text-rose-500 mt-0.5">{errors.phone}</span>}
                </div>
              </div>

              {/* License & State & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    US Driver License # *
                  </label>
                  <input
                    type="text"
                    value={driverDetails.licenseNumber}
                    onChange={(e) => setDriverDetails({ ...driverDetails, licenseNumber: e.target.value.toUpperCase() })}
                    className={`w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border text-sm font-mono uppercase text-slate-900 dark:text-white ${
                      errors.licenseNumber ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.licenseNumber && <span className="text-xs text-rose-500 mt-0.5">{errors.licenseNumber}</span>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Issuing State *
                  </label>
                  <select
                    value={driverDetails.licenseState}
                    onChange={(e) => setDriverDetails({ ...driverDetails, licenseState: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-900 dark:text-white"
                  >
                    {US_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Driver Age (21+) *
                  </label>
                  <select
                    value={driverDetails.driverAge}
                    onChange={(e) => setDriverDetails({ ...driverDetails, driverAge: Number(e.target.value) })}
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-900 dark:text-white"
                  >
                    <option value={21}>21 (Young Driver Fee)</option>
                    <option value={22}>22 (Young Driver Fee)</option>
                    <option value={23}>23 (Young Driver Fee)</option>
                    <option value={24}>24 (Young Driver Fee)</option>
                    <option value={25}>25+</option>
                    <option value={28}>28</option>
                    <option value={35}>35+</option>
                  </select>
                </div>
              </div>

              {/* Address */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Billing Street Address
                  </label>
                  <input
                    type="text"
                    value={driverDetails.streetAddress}
                    onChange={(e) => setDriverDetails({ ...driverDetails, streetAddress: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    maxLength={5}
                    value={driverDetails.zipCode}
                    onChange={(e) => setDriverDetails({ ...driverDetails, zipCode: e.target.value })}
                    className={`w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border text-sm font-mono text-slate-900 dark:text-white ${
                      errors.zipCode ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.zipCode && <span className="text-xs text-rose-500 mt-0.5">{errors.zipCode}</span>}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextFromDriver}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#FF6B2C] hover:bg-[#E85819] text-white font-bold text-sm shadow-md transition-all"
                >
                  <span>Continue to Extras & Protection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-4">
              <OrderSummarySidebar car={car} pricing={pricing} searchParams={searchParams} />
            </div>
          </div>
        )}

        {/* STEP 2: Extras & Insurance Review */}
        {currentStep === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white dark:bg-[#0B1B3A] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-8">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Step 2: Customize Insurance & Add-On Extras
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Adjust coverage or select electronic highway toll transponders and GPS navigation.
                </p>
              </div>

              {/* Insurance */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#FF6B2C]" />
                  <span>Rental Insurance Coverage</span>
                </h3>

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
                            : 'border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <input
                              type="radio"
                              name="checkout_ins"
                              checked={isSelected}
                              onChange={() => setSelectedInsuranceId(ins.id)}
                              className="mt-1 text-[#FF6B2C] focus:ring-[#FF6B2C]"
                            />
                            <div>
                              <div className="font-bold text-sm text-slate-900 dark:text-white">
                                {ins.name}
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                {ins.description}
                              </div>
                            </div>
                          </div>
                          <span className="font-bold text-sm text-slate-900 dark:text-white font-mono shrink-0">
                            {ins.pricePerDay === 0 ? '$0.00' : `${formatUSD(ins.pricePerDay)}/day`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Extras */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Add Roadtrip Extras
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
                            : 'border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              setSelectedExtraIds((prev) =>
                                prev.includes(extra.id)
                                  ? prev.filter((id) => id !== extra.id)
                                  : [...prev, extra.id]
                              );
                            }}
                            className="mt-1 rounded text-[#FF6B2C] focus:ring-[#FF6B2C]"
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
                        <span className="font-bold text-sm text-slate-900 dark:text-white font-mono shrink-0">
                          {formatUSD(extra.pricePerDay)}/day
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-1.5 px-6 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Driver Info</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextFromExtras}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#FF6B2C] hover:bg-[#E85819] text-white font-bold text-sm shadow-md transition-all"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-4">
              <OrderSummarySidebar car={car} pricing={pricing} searchParams={searchParams} />
            </div>
          </div>
        )}

        {/* STEP 3: Payment */}
        {currentStep === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white dark:bg-[#0B1B3A] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Step 3: Secure Payment & Guarantee
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  All transactions are encrypted with 256-bit bank-grade SSL security.
                </p>
              </div>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 text-xs font-bold transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#FF6B2C] bg-orange-50/20 dark:bg-orange-950/20 text-[#FF6B2C]'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Credit / Debit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 text-xs font-bold transition-all ${
                    paymentMethod === 'apple_pay'
                      ? 'border-[#FF6B2C] bg-orange-50/20 dark:bg-orange-950/20 text-[#FF6B2C]'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="text-base font-black">&bull; Pay</span>
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('google_pay')}
                  className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 text-xs font-bold transition-all ${
                    paymentMethod === 'google_pay'
                      ? 'border-[#FF6B2C] bg-orange-50/20 dark:bg-orange-950/20 text-[#FF6B2C]'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="text-base font-black">G Pay</span>
                  <span>Google Pay</span>
                </button>
              </div>

              {paymentMethod === 'card' ? (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Accepted US Cards:</span>
                    <div className="flex items-center gap-2 font-bold">
                      <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">Visa</span>
                      <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">Mastercard</span>
                      <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">Amex</span>
                      <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">Discover</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      className={`w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border text-sm font-mono text-slate-900 dark:text-white ${
                        errors.cardNumber ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                      }`}
                    />
                    {errors.cardNumber && <span className="text-xs text-rose-500 mt-0.5">{errors.cardNumber}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Name on Card *
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className={`w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border text-sm text-slate-900 dark:text-white ${
                        errors.cardName ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                      }`}
                    />
                    {errors.cardName && <span className="text-xs text-rose-500 mt-0.5">{errors.cardName}</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                        Expiry (MM/YY) *
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(formatCardExpiry(e.target.value))}
                        className={`w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border text-sm font-mono text-slate-900 dark:text-white ${
                          errors.cardExpiry ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                        }`}
                      />
                      {errors.cardExpiry && <span className="text-xs text-rose-500 mt-0.5">{errors.cardExpiry}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                        Security Code (CVV) *
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        className={`w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border text-sm font-mono text-slate-900 dark:text-white ${
                          errors.cardCvv ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                        }`}
                      />
                      {errors.cardCvv && <span className="text-xs text-rose-500 mt-0.5">{errors.cardCvv}</span>}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 text-center space-y-2 border border-slate-200 dark:border-slate-800">
                  <Lock className="w-8 h-8 text-[#FF6B2C] mx-auto" />
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    {paymentMethod === 'apple_pay' ? 'Apple Pay Express Checkout' : 'Google Pay Express Checkout'}
                  </div>
                  <p className="text-xs text-slate-500">
                    Your default card and shipping information will be authorized securely upon confirming.
                  </p>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-1.5 px-6 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Extras</span>
                </button>

                <button
                  type="button"
                  onClick={handleCompleteBooking}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#FF6B2C] hover:bg-[#E85819] text-white font-bold text-base shadow-xl shadow-orange-500/25 transition-all"
                >
                  <Lock className="w-4 h-4" />
                  <span>Confirm Reservation ({formatUSD(pricing.grandTotal)})</span>
                </button>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-4">
              <OrderSummarySidebar car={car} pricing={pricing} searchParams={searchParams} />
            </div>
          </div>
        )}

        {/* STEP 4: Confirmation Voucher */}
        {currentStep === 4 && confirmedBooking && (
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Header Success Card */}
            <div className="text-center p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0B1B3A] border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  Reservation Confirmed
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  You&apos;re Ready For The Open Road!
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Confirmation voucher has been dispatched to{' '}
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {confirmedBooking.driverDetails.email}
                  </span>
                </p>
              </div>

              {/* Booking Reference Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-sm mx-auto flex items-center justify-between">
                <div className="text-left">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Booking Reference
                  </div>
                  <div className="text-xl font-black font-mono text-[#0B1B3A] dark:text-white tracking-wider">
                    {confirmedBooking.id}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* Printable Reservation Voucher Details */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#0B1B3A] border border-slate-200/80 dark:border-slate-800 shadow-md space-y-6 print:shadow-none">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0B1B3A] text-white flex items-center justify-center font-bold">
                    <CarIcon className="w-5 h-5 text-[#FF6B2C]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      {car.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {car.category} &bull; {car.transmission} &bull; {car.fuelType}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Status</div>
                  <div className="text-xs font-extrabold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full inline-block">
                    Confirmed
                  </div>
                </div>
              </div>

              {/* Trip Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase text-slate-400">Pick-Up Location</span>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {pickUpLocObj?.name}
                  </p>
                  <p className="text-xs text-slate-500">{pickUpLocObj?.address}</p>
                  <p className="text-xs text-slate-500 font-medium">
                    Date & Time: {confirmedBooking.searchParams.pickUpDate} at {confirmedBooking.searchParams.pickUpTime}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase text-slate-400">Return Location</span>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {returnLocObj?.name}
                  </p>
                  <p className="text-xs text-slate-500">{returnLocObj?.address}</p>
                  <p className="text-xs text-slate-500 font-medium">
                    Date & Time: {confirmedBooking.searchParams.returnDate} at {confirmedBooking.searchParams.returnTime}
                  </p>
                </div>
              </div>

              {/* Primary Driver & Paid Breakdown */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-bold text-slate-400 uppercase text-[11px] block mb-1">
                    Primary Driver
                  </span>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {confirmedBooking.driverDetails.firstName} {confirmedBooking.driverDetails.lastName}
                  </p>
                  <p className="text-slate-500">
                    License: {confirmedBooking.driverDetails.licenseNumber} ({confirmedBooking.driverDetails.licenseState})
                  </p>
                  <p className="text-slate-500">Phone: {confirmedBooking.driverDetails.phone}</p>
                </div>

                <div>
                  <span className="font-bold text-slate-400 uppercase text-[11px] block mb-1">
                    Payment Method
                  </span>
                  <p className="font-semibold text-slate-900 dark:text-white capitalize">
                    {confirmedBooking.paymentMethod === 'card'
                      ? `Card ending in ${confirmedBooking.cardLast4}`
                      : confirmedBooking.paymentMethod.replace('_', ' ')}
                  </p>
                  <p className="text-slate-500">
                    Grand Total Paid: <span className="font-bold text-emerald-600 font-mono">{formatUSD(confirmedBooking.pricing.grandTotal)}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/dashboard"
                  className="flex-1 py-3.5 px-4 rounded-xl bg-[#0B1B3A] dark:bg-slate-800 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm text-center transition-colors"
                >
                  View In My Bookings Dashboard
                </Link>
                <Link
                  to="/"
                  className="flex-1 py-3.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-200 text-center hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface OrderSummarySidebarProps {
  car: any;
  pricing: any;
  searchParams: any;
}

const OrderSummarySidebar: React.FC<OrderSummarySidebarProps> = ({ car, pricing, searchParams }) => {
  return (
    <div className="bg-white dark:bg-[#0B1B3A] rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5 sticky top-28">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <img
          src={car.imageUrl}
          alt={car.name}
          referrerPolicy="no-referrer"
          className="w-16 h-12 object-cover rounded-xl"
        />
        <div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
            {car.name}
          </h4>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {car.category} &bull; {pricing.days} {pricing.days === 1 ? 'day' : 'days'}
          </span>
        </div>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between text-slate-600 dark:text-slate-300">
          <span>Vehicle Base ({pricing.days}d)</span>
          <span className="font-mono tabular-nums font-semibold text-slate-900 dark:text-white">
            {formatUSD(pricing.baseTotal)}
          </span>
        </div>

        {pricing.youngDriverFeeTotal > 0 && (
          <div className="flex justify-between text-amber-600 dark:text-amber-400">
            <span>Young Driver Fee ($25/d)</span>
            <span className="font-mono tabular-nums font-semibold">
              +{formatUSD(pricing.youngDriverFeeTotal)}
            </span>
          </div>
        )}

        {pricing.insuranceTotal > 0 && (
          <div className="flex justify-between text-slate-600 dark:text-slate-300">
            <span>Protection</span>
            <span className="font-mono tabular-nums font-semibold text-slate-900 dark:text-white">
              +{formatUSD(pricing.insuranceTotal)}
            </span>
          </div>
        )}

        {pricing.extrasTotal > 0 && (
          <div className="flex justify-between text-slate-600 dark:text-slate-300">
            <span>Travel Extras</span>
            <span className="font-mono tabular-nums font-semibold text-slate-900 dark:text-white">
              +{formatUSD(pricing.extrasTotal)}
            </span>
          </div>
        )}

        {pricing.discount > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
            <span>Promo Discount</span>
            <span className="font-mono tabular-nums">-{formatUSD(pricing.discount)}</span>
          </div>
        )}

        <div className="flex justify-between text-slate-500 dark:text-slate-400">
          <span>State & Airport Concession Tax (9.25%)</span>
          <span className="font-mono tabular-nums font-semibold">
            {formatUSD(pricing.taxesAndConcessionFee)}
          </span>
        </div>

        <div className="flex justify-between text-slate-500 dark:text-slate-400">
          <span>Vehicle Licensing & Road Fee</span>
          <span className="font-mono tabular-nums font-semibold">
            {formatUSD(pricing.licensingFeeTotal)}
          </span>
        </div>

        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-baseline justify-between">
          <span className="font-bold text-sm text-slate-900 dark:text-white">Total USD</span>
          <span className="text-xl font-black text-[#FF6B2C] font-mono tabular-nums">
            {formatUSD(pricing.grandTotal)}
          </span>
        </div>
      </div>
    </div>
  );
};
