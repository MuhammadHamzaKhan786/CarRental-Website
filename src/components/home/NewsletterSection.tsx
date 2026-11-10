import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Mail, CheckCircle2 } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed! Check your inbox for your 15% roadtrip welcome voucher.', 'success');
  };

  return (
    <section className="py-16 bg-white dark:bg-[#0B1B3A] border-t border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 p-8 sm:p-12 text-center shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#FF6B2C]/10 text-[#FF6B2C] mx-auto flex items-center justify-center mb-4">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B3A] dark:text-white tracking-tight mb-2">
            Get Exclusive American Travel Deals & Upgrades
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-6">
            Join 35,000+ subscribers for weekly seasonal discounts, airport branch updates, and zero-spam fleet drops.
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold text-sm border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Thank you! Your 15% discount welcome promo voucher is on its way.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email (e.g. name@domain.com)"
                className="flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-[#0B1B3A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-[#FF6B2C] focus:outline-none"
                aria-label="Email for travel deals"
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
      </div>
    </section>
  );
};
