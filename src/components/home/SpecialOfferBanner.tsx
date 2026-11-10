import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.tsx';
import { Tag, Copy, Check, ArrowRight, Sparkles } from 'lucide-react';

export const SpecialOfferBanner: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [copied, setCopied] = useState(false);

  const promoCode = 'ROADTRIP20';

  const handleCopy = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    showToast(`Promo code ${promoCode} copied! 20% discount ready at checkout.`, 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="py-12 bg-white dark:bg-[#070E1E] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0B1B3A] via-[#152B57] to-[#0B1B3A] text-white p-8 sm:p-12 shadow-xl overflow-hidden border border-slate-700">
          {/* Subtle decorative background shapes */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-[#FF6B2C]/10 blur-3xl pointer-events-none" />
          <div className="absolute left-1/3 -top-10 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B2C]/20 border border-[#FF6B2C]/40 text-[#FF6B2C] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Limited Time American Roadtrip Special</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                Save 20% Off Your Entire Rental With Code <span className="text-[#FF6B2C]">{promoCode}</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-300">
                Valid on all SUVs, sedans, luxury sports coupes, and electric vehicles across all 40+ US airport and city locations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <div className="flex items-center bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-1.5 w-full sm:w-auto">
                <div className="px-4 py-2 font-mono font-black text-lg tracking-wider text-white">
                  {promoCode}
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold transition-all"
                  aria-label="Copy promo code"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={() => navigate('/cars')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#FF6B2C] hover:bg-[#E85819] text-white font-bold text-sm shadow-lg shadow-orange-500/25 transition-all"
              >
                <span>Redeem & Book</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
