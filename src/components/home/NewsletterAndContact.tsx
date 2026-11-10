import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  Mail,
  Send,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Building,
} from 'lucide-react';
import { formatUSPhone } from '../../utils/pricing.ts';

export const NewsletterAndContact: React.FC = () => {
  const { showToast } = useApp();

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@') || !newsletterEmail.includes('.')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setNewsletterSubscribed(true);
    showToast('Subscribed! Check your inbox for your 15% welcome voucher.', 'success');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim()) {
      showToast('Please enter your full name.', 'error');
      return;
    }
    if (!contactEmail.includes('@') || !contactEmail.includes('.')) {
      showToast('Please enter a valid contact email.', 'error');
      return;
    }
    if (!contactMessage.trim()) {
      showToast('Please enter a brief message.', 'error');
      return;
    }

    setContactSubmitted(true);
    showToast('Your message has been dispatched to US Customer Concierge!', 'success');
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-[#0B1B3A] border-t border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* 1. Newsletter Box */}
        <div className="rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#FF6B2C]/10 text-[#FF6B2C] mx-auto flex items-center justify-center mb-4">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B3A] dark:text-white tracking-tight mb-2">
            Get Exclusive American Travel Deals & Upgrades
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-6">
            Join 35,000+ subscribers for weekly seasonal discounts, airport branch updates, and zero-spam fleet drops.
          </p>

          {newsletterSubscribed ? (
            <div className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold text-sm border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Thank you! Your welcome promo voucher is on its way.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email (e.g. name@domain.com)"
                className="flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-[#0B1B3A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-[#FF6B2C] focus:outline-none"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-[#FF6B2C] hover:bg-[#E85819] text-white font-bold text-sm shadow-md transition-all whitespace-nowrap shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* 2. Contact Section */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-bold uppercase tracking-widest text-[#FF6B2C] mb-2">
              US Concierge Support
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3A] dark:text-white tracking-tight">
              We&apos;re Here For Your Road Ahead
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Need assistance with airport pickup arrangements, commercial fleet billing, or custom rental terms?
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contact Details & Map Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-6">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Building className="w-5 h-5 text-[#FF6B2C]" />
                  <span>US Headquarters & Dispatch</span>
                </h4>

                <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#FF6B2C] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Veloce Car Rental Inc.</div>
                      <div>9020 Aviation Blvd, Suite 500</div>
                      <div>Los Angeles, CA 90301, United States</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#FF6B2C] shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white">Reservations: </span>
                      <span>(800) 555-VELOCE (8356)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#FF6B2C] shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white">Email: </span>
                      <span>concierge@veloce-rentals.com</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#FF6B2C] shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white">Customer Support: </span>
                      <span>24 Hours / 7 Days a Week</span>
                    </div>
                  </div>
                </div>

                {/* Map Graphic Box */}
                <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center p-4">
                  <div className="text-center space-y-1">
                    <div className="w-10 h-10 rounded-full bg-[#FF6B2C] text-white flex items-center justify-center mx-auto shadow-md">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold text-slate-800 dark:text-white">
                      Terminal Hub Location
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Adjacent to LAX Airport Rental Car Center (Conrac)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0B1B3A] border border-slate-200/80 dark:border-slate-800 shadow-md">
                {contactSubmitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Message Received!
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                      Thank you for contacting Veloce. A member of our US Concierge team will review your inquiry and get back to you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setContactSubmitted(false);
                        setContactName('');
                        setContactEmail('');
                        setContactPhone('');
                        setContactMessage('');
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[#0B1B3A] dark:bg-slate-800 text-white font-medium text-sm hover:bg-slate-800"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                      Send An Inquiry
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g. Johnathan Smith"
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-[#FF6B2C] focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="johnathan@example.com"
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-[#FF6B2C] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                        Phone Number (US Format)
                      </label>
                      <input
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(formatUSPhone(e.target.value))}
                        placeholder="(555) 123-4567"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-[#FF6B2C] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                        How can we help? *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Tell us about your upcoming rental plans, airport transfer needs, or corporate fleet questions..."
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-[#FF6B2C] focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#FF6B2C] hover:bg-[#E85819] text-white font-bold text-sm shadow-lg shadow-orange-500/25 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
