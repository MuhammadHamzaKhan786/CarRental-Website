import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Car,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  X,
  CreditCard,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const legalContent: Record<string, { title: string; body: string[] }> = {
    privacy: {
      title: 'Privacy Policy (US & State Disclosures)',
      body: [
        'Veloce Car Rental Inc. ("Veloce") is dedicated to protecting your privacy. This policy outlines how we collect, use, and protect your personal identification, telematics, and payment data when you use our website, mobile booking platform, and physical airport and downtown branches across the United States.',
        'We collect vehicle reservation details, driver identification (valid US driver license number, issuing state, date of birth), contact information, and encrypted transaction details. Under the California Consumer Privacy Act (CCPA) and Virginia Consumer Data Protection Act (VCDPA), US residents have rights to request data access, deletion, and portability.',
        'We never sell your sensitive personal information or driver licensing data to third-party data brokers. Payment data is processed in full compliance with PCI-DSS Level 1 security standards.',
      ],
    },
    terms: {
      title: 'Terms of Service',
      body: [
        'By reserving or taking possession of any vehicle from Veloce Car Rental, you agree to comply with all federal, state, and municipal regulations governing motor vehicle operation in the United States.',
        'Drivers must be at least 21 years of age with a valid, unexpired driver license issued by a US state, territory, or recognized international jurisdiction. Drivers between ages 21 and 24 are subject to a standard young driver surcharge.',
        'Reservations may be cancelled for a full refund up to 48 hours prior to the scheduled pick-up time. Fuel must be returned at the same level as departure unless pre-paid fuel option is selected.',
      ],
    },
    rental: {
      title: 'US Master Rental Agreement',
      body: [
        'This Master Rental Agreement forms the binding contract between Veloce Car Rental Inc. and the primary authorized renter identified on the booking confirmation voucher.',
        'Permitted operation is strictly within the continental United States and Alaska. Cross-border travel into Mexico requires explicit written approval and supplemental Mexican auto liability rider coverage.',
        'Prohibited uses include driving under the influence of alcohol, drugs, or impairing medication; racing; towing unauthorized trailers; and off-roading outside of designated routes in non-4x4 vehicles.',
      ],
    },
    ccpa: {
      title: 'Do Not Sell My Info (California & US Privacy Rights)',
      body: [
        'Under the California Consumer Privacy Act (CCPA), California Privacy Rights Act (CPRA), and applicable state privacy statutes, consumers have the right to opt-out of the "sale" or "sharing" of their personal information.',
        'Veloce Car Rental does NOT sell your personal data, rental history, or driver record for monetary consideration. We only share operational telemetry and reservation details with verified roadside assistance networks and payment processors.',
        'To submit a verifiable consumer opt-out or data deletion request, you may submit via our contact portal or call our dedicated US customer privacy line at 1-800-555-VELOCE.',
      ],
    },
  };

  return (
    <>
      <footer className="bg-[#0B1B3A] text-slate-300 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
            {/* Col 1 & 2: Brand & Trust */}
            <div className="lg:col-span-2 space-y-4">
              <Link to="/" className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-white">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B2C] flex items-center justify-center text-white shadow-md">
                  <Car className="w-5 h-5" />
                </div>
                <span className="font-extrabold text-2xl tracking-tight">
                  VELOCE<span className="text-[#FF6B2C]">.</span>
                </span>
              </Link>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                Premium car rental across 40+ major US airports and downtown centers. Transparent pricing, modern American fleet, and 24/7 dedicated roadside support.
              </p>

              <div className="pt-2 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#FF6B2C]" />
                  <span>US Reservations: (800) 555-8356</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#FF6B2C]" />
                  <span>support@veloce-rentals.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FF6B2C]" />
                  <span>24/7 Roadside Assistance: (888) 555-HELP</span>
                </div>
              </div>
            </div>

            {/* Col 3: Quick Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Fleet & Booking</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/cars" className="hover:text-[#FF6B2C] transition-colors">Browse Full Fleet</Link></li>
                <li><Link to="/cars?category=SUV" className="hover:text-[#FF6B2C] transition-colors">SUVs & 4x4s</Link></li>
                <li><Link to="/cars?category=Electric" className="hover:text-[#FF6B2C] transition-colors">Electric & Hybrids</Link></li>
                <li><Link to="/cars?category=Luxury" className="hover:text-[#FF6B2C] transition-colors">Luxury & Sports</Link></li>
                <li><Link to="/pricing" className="hover:text-[#FF6B2C] transition-colors">Daily & Monthly Plans</Link></li>
                <li><Link to="/contact" className="hover:text-[#FF6B2C] transition-colors">Contact US Concierge</Link></li>
                <li><Link to="/dashboard" className="hover:text-[#FF6B2C] transition-colors">Manage Reservations</Link></li>
              </ul>
            </div>

            {/* Col 4: Top US Hubs */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Top US Hubs</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/cars?location=LAX" className="hover:text-[#FF6B2C] transition-colors">Los Angeles Intl (LAX)</Link></li>
                <li><Link to="/cars?location=JFK" className="hover:text-[#FF6B2C] transition-colors">New York (JFK Airport)</Link></li>
                <li><Link to="/cars?location=MIA" className="hover:text-[#FF6B2C] transition-colors">Miami Intl (MIA)</Link></li>
                <li><Link to="/cars?location=ORD" className="hover:text-[#FF6B2C] transition-colors">Chicago O'Hare (ORD)</Link></li>
                <li><Link to="/cars?location=LAS" className="hover:text-[#FF6B2C] transition-colors">Las Vegas Strip (LAS)</Link></li>
                <li><Link to="/locations" className="hover:text-[#FF6B2C] transition-colors">All 40+ US Locations</Link></li>
              </ul>
            </div>

            {/* Col 5: Security & Payment */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Payment & Security</h4>
              <p className="text-xs text-slate-400">
                We accept all major US credit cards, debit cards, and contactless mobile pay.
              </p>
              
              <div className="flex flex-wrap gap-2 pt-1">
                {['Visa', 'Mastercard', 'Amex', 'Discover', 'Apple Pay', 'Google Pay'].map(badge => (
                  <span
                    key={badge}
                    className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-300"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2 text-xs text-emerald-400">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Legal & Copyright */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              &copy; {new Date().getFullYear()} Veloce Car Rental Inc. All rights reserved. Registered US Travel Operator.
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                onClick={() => setActiveModal('privacy')}
                className="hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setActiveModal('terms')}
                className="hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                Terms of Service
              </button>
              <button
                onClick={() => setActiveModal('rental')}
                className="hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                Rental Agreement
              </button>
              <button
                onClick={() => setActiveModal('ccpa')}
                className="hover:text-[#FF6B2C] transition-colors underline-offset-4 hover:underline font-medium"
              >
                Do Not Sell My Info (CCPA)
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal for full legal disclosures */}
      {activeModal && legalContent[activeModal] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
        >
          <div className="bg-white dark:bg-[#0B1B3A] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {legalContent[activeModal].title}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {legalContent[activeModal].body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 rounded-xl bg-[#0B1B3A] dark:bg-slate-800 text-white font-medium text-sm hover:bg-slate-800 dark:hover:bg-slate-700"
              >
                Close Document
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
