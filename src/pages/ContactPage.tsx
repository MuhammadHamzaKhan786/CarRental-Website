import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  Mail,
  Send,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Building,
  ShieldCheck,
  Headphones,
  Car,
  FileQuestion,
  AlertCircle,
} from 'lucide-react';
import { formatUSPhone } from '../utils/pricing.ts';
import { Link } from 'react-router-dom';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('General Question');
  const [bookingRef, setBookingRef] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      showToast('Please enter your full name.', 'error');
      return;
    }
    if (!email || !email.includes('@') || !email.includes('.')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    if (!message.trim()) {
      showToast('Please write a message explaining your inquiry.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Inquiry dispatched successfully! Our US Concierge team will reach out within 15 minutes.', 'success');
    }, 600);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatUSPhone(e.target.value));
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#070E1E] py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6B2C]/10 text-[#FF6B2C] text-xs font-bold uppercase tracking-wider mb-3">
            <Headphones className="w-3.5 h-3.5" />
            <span>24/7 Nationwide Support</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Contact US Concierge & Dispatch
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Have questions about airport pickup, reservations, corporate accounts, or need immediate 24/7 roadside assistance? We’re standing by to assist you across all 40+ US hub locations.
          </p>
        </div>

        {/* Emergency Assistance Callout Banner */}
        <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-300 dark:border-amber-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B2C] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Phone className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Immediate Roadside Assistance (24/7)</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400">
                  Toll-Free Priority
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Tire changes, battery jumps, keys locked, or mechanical assistance on any US highway: <strong className="text-[#FF6B2C]">(888) 555-HELP (4357)</strong>
              </p>
            </div>
          </div>
          <a
            href="tel:8885554357"
            className="px-4 py-2 rounded-xl bg-[#0B1B3A] dark:bg-slate-800 text-white text-xs font-bold hover:bg-slate-800 transition-colors shrink-0"
          >
            Call Dispatch Now
          </a>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Office info & Hub network */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-[#0B1B3A] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B2C]/10 text-[#FF6B2C] flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    US Corporate Dispatch HQ
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Veloce Car Rental Inc.
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#FF6B2C] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Headquarters Address</div>
                    <div>9020 Aviation Blvd, Suite 500</div>
                    <div>Los Angeles, CA 90301, United States</div>
                    <div className="text-xs text-slate-400 mt-0.5">Adjacent to LAX Consolidated Rental Car Center</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#FF6B2C] shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Reservations & Concierge</div>
                    <a href="tel:8005558356" className="text-[#FF6B2C] hover:underline font-medium">
                      (800) 555-VELOCE (8356)
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#FF6B2C] shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Email Inquiries</div>
                    <a href="mailto:concierge@veloce-rentals.com" className="hover:underline">
                      concierge@veloce-rentals.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#FF6B2C] shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Operating Hours</div>
                    <div>Airport Desks: 24/7/365 Non-stop</div>
                    <div>Downtown Hubs: 7:00 AM – 10:00 PM Local Time</div>
                  </div>
                </div>
              </div>

              {/* Map Illustration Box */}
              <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center p-4">
                <div className="text-center space-y-1">
                  <div className="w-10 h-10 rounded-full bg-[#FF6B2C] text-white flex items-center justify-center mx-auto shadow-md">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-800 dark:text-white">
                    LAX Terminal Hub & Dispatch Center
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400">
                    Curbside pickup shuttle available at all terminals
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="bg-white dark:bg-[#0B1B3A] rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Frequently Requested Services
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  to="/cars"
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-[#FF6B2C]/10 hover:text-[#FF6B2C] transition-colors border border-slate-200 dark:border-slate-800 flex items-center gap-2"
                >
                  <Car className="w-4 h-4 text-[#FF6B2C]" />
                  <span>Browse Available Fleet</span>
                </Link>
                <Link
                  to="/pricing"
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-[#FF6B2C]/10 hover:text-[#FF6B2C] transition-colors border border-slate-200 dark:border-slate-800 flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#FF6B2C]" />
                  <span>Rental Rate Plans</span>
                </Link>
                <Link
                  to="/locations"
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-[#FF6B2C]/10 hover:text-[#FF6B2C] transition-colors border border-slate-200 dark:border-slate-800 flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-[#FF6B2C]" />
                  <span>40+ Airport Hubs</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-[#FF6B2C]/10 hover:text-[#FF6B2C] transition-colors border border-slate-200 dark:border-slate-800 flex items-center gap-2"
                >
                  <FileQuestion className="w-4 h-4 text-[#FF6B2C]" />
                  <span>Modify My Booking</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0B1B3A] rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Send Us A Message
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Fill in the details below and our concierge team will respond within 15 minutes during standard operational hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-100">
                    Message Dispatched Successfully!
                  </h3>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-2 max-w-md mx-auto">
                    Thank you, <strong>{fullName}</strong>. A concierge reservation specialist has received your message regarding <em>{inquiryType}</em> and will respond to <strong>{email}</strong> shortly.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                      setBookingRef('');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs shadow border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Jonathan Miller"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-[#FF6B2C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. jonathan@example.com"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-[#FF6B2C] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Phone Number (US Format)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="(555) 123-4567"
                      maxLength={14}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-[#FF6B2C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-[#FF6B2C] focus:outline-none"
                    >
                      <option value="General Question">General Question</option>
                      <option value="Airport Terminal Pickup">Airport Terminal Pickup</option>
                      <option value="Modify Existing Booking">Modify Existing Booking</option>
                      <option value="Corporate Fleet & Business Accounts">Corporate Fleet & Business Accounts</option>
                      <option value="Insurance & Coverage Inquiries">Insurance & Coverage Inquiries</option>
                      <option value="Roadside Emergency Support">Roadside Emergency Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Reservation Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={bookingRef}
                    onChange={(e) => setBookingRef(e.target.value.toUpperCase())}
                    placeholder="e.g. VEL-89241"
                    maxLength={12}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-mono focus:ring-2 focus:ring-[#FF6B2C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    How Can We Help You? *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your upcoming travel plans, vehicle preferences, flight arrival delays, or any questions you have..."
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-[#FF6B2C] focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Your private contact information is protected under CCPA guidelines.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#FF6B2C] hover:bg-[#E85819] text-white font-bold text-sm shadow-md transition-all disabled:opacity-50 shrink-0"
                  >
                    {isSubmitting ? (
                      <span>Dispatching...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
