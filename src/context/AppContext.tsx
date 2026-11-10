import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, SearchParams, CarCategory, UserAuth } from '../types/index.ts';
import { CARS } from '../data/cars.ts';
import { toInputDateFormat } from '../utils/pricing.ts';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  // Theme
  isDark: boolean;
  toggleDarkMode: () => void;

  // Search parameters for booking
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  updateSearchParams: (updates: Partial<SearchParams>) => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (carId: string) => void;
  isFavorite: (carId: string) => boolean;

  // Bookings
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  cancelBooking: (bookingId: string) => void;

  // User Auth
  auth: UserAuth;
  login: (name: string, email: string) => void;
  logout: () => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;
}

const defaultPickUp = new Date();
defaultPickUp.setDate(defaultPickUp.getDate() + 1); // tomorrow
const defaultReturn = new Date();
defaultReturn.setDate(defaultReturn.getDate() + 4); // 3 days rental

const DEFAULT_SEARCH_PARAMS: SearchParams = {
  pickUpLocation: 'LAX',
  returnLocation: 'LAX',
  pickUpDate: toInputDateFormat(defaultPickUp),
  pickUpTime: '10:00 AM',
  returnDate: toInputDateFormat(defaultReturn),
  returnTime: '10:00 AM',
  carCategory: 'All',
  driverAge: 26,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('veloce_dark_mode');
      if (saved !== null) {
        return saved === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('veloce_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('veloce_dark_mode', 'false');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(prev => !prev);

  // Search Parameters
  const [searchParams, setSearchParams] = useState<SearchParams>(() => {
    try {
      const saved = localStorage.getItem('veloce_search_params');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_SEARCH_PARAMS;
  });

  const updateSearchParams = (updates: Partial<SearchParams>) => {
    setSearchParams(prev => {
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem('veloce_search_params', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('veloce_favorites');
      return saved ? JSON.parse(saved) : ['ford-mustang-gt', 'tesla-model-3'];
    } catch {
      return ['ford-mustang-gt', 'tesla-model-3'];
    }
  });

  const toggleFavorite = (carId: string) => {
    setFavorites(prev => {
      let updated: string[];
      if (prev.includes(carId)) {
        updated = prev.filter(id => id !== carId);
        showToast('Removed from your favorites', 'info');
      } else {
        updated = [...prev, carId];
        showToast('Saved to your favorites!', 'success');
      }
      try {
        localStorage.setItem('veloce_favorites', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const isFavorite = (carId: string) => favorites.includes(carId);

  // Bookings list with initial demo booking for instant rich experience
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('veloce_bookings');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }

    // Default sample completed/upcoming booking
    const sampleCar = CARS[0]; // Mustang GT
    return [
      {
        id: 'VEL-89241',
        car: sampleCar,
        searchParams: {
          pickUpLocation: 'LAX',
          returnLocation: 'LAX',
          pickUpDate: '2026-11-20',
          pickUpTime: '10:00 AM',
          returnDate: '2026-11-23',
          returnTime: '10:00 AM',
          carCategory: 'Luxury',
          driverAge: 28,
        },
        driverDetails: {
          firstName: 'Alex',
          lastName: 'Morgan',
          email: 'alex.morgan@example.com',
          phone: '(555) 234-5678',
          licenseNumber: 'D84729104',
          licenseState: 'CA',
          driverAge: 28,
          streetAddress: '742 Evergreen Terrace',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90001',
        },
        selectedInsuranceId: 'cdw-full',
        selectedExtraIds: ['ezpass', 'unlimited-miles'],
        pricing: {
          days: 3,
          baseDailyRate: 89,
          baseTotal: 267.00,
          youngDriverFeePerDay: 0,
          youngDriverFeeTotal: 0,
          insurancePerDay: 19.99,
          insuranceTotal: 59.97,
          extrasTotal: 65.94,
          subtotal: 392.91,
          discount: 53.40,
          promoCodeApplied: 'ROADTRIP20 (20% Off Base Rate)',
          taxesAndConcessionFee: 31.40,
          licensingFeeTotal: 13.50,
          grandTotal: 384.41,
        },
        paymentMethod: 'card',
        cardLast4: '4242',
        status: 'Confirmed',
        createdAt: new Date().toISOString(),
      },
    ];
  });

  const addBooking = (newBooking: Booking) => {
    setBookings(prev => {
      const updated = [newBooking, ...prev];
      try {
        localStorage.setItem('veloce_bookings', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev => {
      const updated = prev.map(b => (b.id === bookingId ? { ...b, status: 'Cancelled' as const } : b));
      try {
        localStorage.setItem('veloce_bookings', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast('Reservation successfully cancelled.', 'info');
  };

  // Auth
  const [auth, setAuth] = useState<UserAuth>(() => {
    try {
      const saved = localStorage.getItem('veloce_user');
      if (saved) {
        return { isLoggedIn: true, user: JSON.parse(saved) };
      }
    } catch {
      // ignore
    }
    return {
      isLoggedIn: true,
      user: {
        id: 'usr_001',
        name: 'Jordan Miller',
        email: 'jordan.miller@example.com',
        phone: '(555) 789-0123',
        licenseNumber: 'N92837411',
        licenseState: 'CA',
      },
    };
  });

  const login = (name: string, email: string) => {
    const user = {
      id: `usr_${Date.now()}`,
      name,
      email,
      phone: '(555) 321-7654',
      licenseNumber: 'F73829104',
      licenseState: 'NY',
    };
    setAuth({ isLoggedIn: true, user });
    try {
      localStorage.setItem('veloce_user', JSON.stringify(user));
    } catch {
      // ignore
    }
    showToast(`Welcome back, ${name}!`, 'success');
  };

  const logout = () => {
    setAuth({ isLoggedIn: false, user: null });
    try {
      localStorage.removeItem('veloce_user');
    } catch {
      // ignore
    }
    showToast('You have been signed out.', 'info');
  };

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        isDark,
        toggleDarkMode,
        searchParams,
        setSearchParams,
        updateSearchParams,
        favorites,
        toggleFavorite,
        isFavorite,
        bookings,
        addBooking,
        cancelBooking,
        auth,
        login,
        logout,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
