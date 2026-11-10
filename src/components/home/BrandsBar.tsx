import React from 'react';
import { useNavigate } from 'react-router-dom';

const BRANDS = [
  { name: 'Toyota', query: 'Toyota' },
  { name: 'Ford', query: 'Ford' },
  { name: 'Chevrolet', query: 'Chevrolet' },
  { name: 'Tesla', query: 'Tesla' },
  { name: 'BMW', query: 'BMW' },
  { name: 'Mercedes-Benz', query: 'Mercedes' },
  { name: 'Jeep', query: 'Jeep' },
  { name: 'Honda', query: 'Honda' },
];

export const BrandsBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-10 border-y border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#070E1E] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 mb-6">
          Official Fleet Featuring America&apos;s Leading Automotive Makers
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-14 opacity-80 dark:opacity-90">
          {BRANDS.map((brand) => (
            <button
              key={brand.name}
              onClick={() => navigate(`/cars?brand=${encodeURIComponent(brand.query)}`)}
              className="text-lg sm:text-xl font-bold tracking-tight text-slate-600 dark:text-slate-400 hover:text-[#0B1B3A] dark:hover:text-white hover:scale-105 transition-all focus:outline-none"
            >
              {brand.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
