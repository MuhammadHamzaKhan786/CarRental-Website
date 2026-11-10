import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'What is the minimum driver age to rent a car in the United States?',
    answer:
      'The minimum age to rent with Veloce in the United States is 21 years old. Drivers between the ages of 21 and 24 are eligible to rent most vehicle categories subject to a standard young driver surcharge ($25.00/day). Drivers age 25 and older are exempt from the young driver fee.',
  },
  {
    question: 'What documents do I need to present at vehicle pick-up?',
    answer:
      'You must present: (1) A valid, unexpired government-issued driver license from any US state, Canadian province, or foreign country; (2) A valid major credit or debit card issued in the primary driver’s name; and (3) Your reservation confirmation email or voucher.',
  },
  {
    question: 'Do I have to purchase car rental insurance?',
    answer:
      'No. While optional, you can choose our Collision Damage Waiver (CDW) with $0 deductible for complete financial peace of mind. If you choose "I have my own insurance", you may use your existing personal US auto policy or primary credit card coverage by presenting proof at pick-up.',
  },
  {
    question: 'What is your cancellation and modification policy?',
    answer:
      'We offer 100% Free Cancellation on all pre-paid reservations up to 48 hours before your scheduled pick-up time. Cancellations can be completed instantly from your user dashboard with zero penalty fees.',
  },
  {
    question: 'Are miles unlimited on my car rental?',
    answer:
      'Standard daily bookings include 200 complimentary miles per day. For extended roadtrips, our Weekly Roadtripper plan and our optional Interstate Unlimited Mileage Pass allow you to drive across state lines with zero per-mile surcharges.',
  },
  {
    question: 'What is your vehicle fuel and electric vehicle charging policy?',
    answer:
      'Gasoline vehicles are delivered with a full tank and should be returned with a full tank to avoid refueling fees. Electric vehicles (such as the Tesla Model 3) are provided with at least 80% battery charge and can be returned with 20% or more charge.',
  },
  {
    question: 'Can international visitors rent with a foreign driver’s license?',
    answer:
      'Yes! Visitors from outside the United States are warmly welcome. We accept valid driver licenses issued in the Latin alphabet. If your foreign license is not in English, an International Driving Permit (IDP) accompanied by your original home country license and passport is required.',
  },
  {
    question: 'How do highway tolls and E-ZPass work on rental vehicles?',
    answer:
      'All Veloce rental vehicles can be equipped with an automated E-ZPass / SunPass electronic toll transponder for $6.99/day. This allows you to breeze through express toll lanes without waiting in cash lines.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="py-20 bg-[#F5F7FA] dark:bg-[#070E1E] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#FF6B2C] mb-2">
            Clear Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3A] dark:text-white tracking-tight">
            Frequently Asked US Rental Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Everything you need to know about age requirements, licenses, insurance, and toll passes.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-2xl bg-white dark:bg-[#0B1B3A] border border-slate-200/80 dark:border-slate-800 shadow-sm transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left font-bold text-base sm:text-lg text-slate-900 dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B2C]"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#FF6B2C] text-white dark:bg-[#FF6B2C]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
