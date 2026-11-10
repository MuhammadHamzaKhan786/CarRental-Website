import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { formatUSD } from '../../utils/pricing.ts';

const CITIES = [
  {
    name: 'Los Angeles, California',
    hub: 'LAX Airport & Downtown Financial',
    code: 'LAX',
    price: 49,
    imageUrl: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Miami, Florida',
    hub: 'MIA Airport & Brickell City Centre',
    code: 'MIA',
    price: 52,
    imageUrl: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'New York City, New York',
    hub: 'JFK Intl & Midtown Manhattan',
    code: 'JFK',
    price: 54,
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Las Vegas, Nevada',
    hub: 'Harry Reid Intl (LAS) & The Strip',
    code: 'LAS',
    price: 49,
    imageUrl: 'https://images.unsplash.com/photo-1581351123004-757df051db8e?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'San Francisco, California',
    hub: 'SFO Airport & Silicon Valley Corridor',
    code: 'SFO',
    price: 55,
    imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Chicago, Illinois',
    hub: "O'Hare (ORD) & Michigan Ave",
    code: 'ORD',
    price: 48,
    imageUrl: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=800&q=80',
  },
];

export const PopularLocations: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-[#F5F7FA] dark:bg-[#070E1E] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#FF6B2C] mb-2">
              Popular US Destinations
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3A] dark:text-white tracking-tight">
              Rent At America&apos;s Busiest Travel Hubs
            </h2>
          </div>

          <button
            onClick={() => navigate('/locations')}
            className="text-sm font-bold text-[#FF6B2C] hover:text-[#E85819] flex items-center gap-1.5"
          >
            <span>View All 40+ US Locations</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CITIES.map((city) => (
            <div
              key={city.code}
              onClick={() => navigate(`/cars?location=${encodeURIComponent(city.code)}`)}
              className="group relative h-72 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={city.imageUrl}
                alt={city.name}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Scrim overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A]/90 via-[#0B1B3A]/40 to-transparent" />

              {/* Top Tag */}
              <div className="absolute top-4 right-4">
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#FF6B2C] transition-colors">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-1 text-xs text-orange-300 font-semibold mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{city.hub}</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-2">
                  {city.name}
                </h3>
                <div className="flex items-center justify-between pt-2 border-t border-white/20 text-xs">
                  <span className="text-slate-300">Fleet available today</span>
                  <div className="font-bold text-sm">
                    From <span className="text-lg text-[#FF6B2C] tabular-nums">{formatUSD(city.price)}</span>/day
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
