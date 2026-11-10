import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CARS } from '../../data/cars.ts';
import { CarCategory } from '../../types/index.ts';
import { CarCard } from '../cars/CarCard.tsx';
import { ArrowRight } from 'lucide-react';

const CATEGORIES: CarCategory[] = ['All', 'SUV', 'Sedan', 'Luxury', 'Electric', 'Truck', 'Economy'];

export const FeaturedFleet: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CarCategory>('All');

  const filteredCars = activeCategory === 'All'
    ? CARS
    : CARS.filter(car => car.category === activeCategory);

  return (
    <section className="py-20 bg-[#F5F7FA] dark:bg-[#070E1E] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#FF6B2C] mb-2">
              Featured American Fleet
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3A] dark:text-white tracking-tight">
              Vehicles Ready For Your Next Journey
            </h2>
          </div>

          <Link
            to="/cars"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#FF6B2C] hover:text-[#E85819] transition-colors group"
          >
            <span>Explore All 12 Fleet Models</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Tabs (Segmented Button Controls) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-[#0B1B3A] text-white dark:bg-[#FF6B2C] shadow-md'
                    : 'bg-white dark:bg-[#0B1B3A] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-800'
                }`}
              >
                {cat === 'All' ? 'All Fleet' : cat}
              </button>
            );
          })}
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.slice(0, 8).map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-[#0B1B3A] rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              No vehicles found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
