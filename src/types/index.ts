export type CarCategory = 'All' | 'SUV' | 'Sedan' | 'Luxury' | 'Electric' | 'Truck' | 'Economy';

export interface Car {
  id: string;
  name: string;
  make: string;
  model: string;
  year: number;
  category: Exclude<CarCategory, 'All'>;
  pricePerDay: number;
  seats: number;
  doors: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Gasoline' | 'Electric' | 'Hybrid';
  mpg: string;
  luggage: number;
  ac: boolean;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  galleryUrls: string[];
  features: string[];
  specs: {
    engine: string;
    horsepower: string;
    acceleration: string;
    cargoCapacity: string;
    driveType: string;
  };
  availableLocations: string[];
  popular: boolean;
}

export interface RentalLocation {
  code: string;
  name: string;
  city: string;
  state: string;
  type: 'Airport' | 'Downtown';
  address: string;
  hours: string;
  startingPrice: number;
}

export interface SearchParams {
  pickUpLocation: string;
  returnLocation: string;
  pickUpDate: string;
  pickUpTime: string;
  returnDate: string;
  returnTime: string;
  carCategory: CarCategory;
  driverAge: number;
}

export interface InsuranceOption {
  id: string;
  name: string;
  pricePerDay: number;
  tagline: string;
  description: string;
  coverageItems: string[];
  recommended?: boolean;
}

export interface ExtraOption {
  id: string;
  name: string;
  pricePerDay: number;
  description: string;
  iconName: string;
}

export interface DriverDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseState: string;
  driverAge: number;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface PaymentDetails {
  method: 'card' | 'apple_pay' | 'google_pay';
  cardNumber?: string;
  cardName?: string;
  expiry?: string;
  cvv?: string;
  billingZip?: string;
}

export interface PricingBreakdown {
  days: number;
  baseDailyRate: number;
  baseTotal: number;
  youngDriverFeePerDay: number;
  youngDriverFeeTotal: number;
  insurancePerDay: number;
  insuranceTotal: number;
  extrasTotal: number;
  subtotal: number;
  discount: number;
  promoCodeApplied?: string;
  taxesAndConcessionFee: number;
  licensingFeeTotal: number;
  grandTotal: number;
}

export interface Booking {
  id: string;
  car: Car;
  searchParams: SearchParams;
  driverDetails: DriverDetails;
  selectedInsuranceId: string;
  selectedExtraIds: string[];
  pricing: PricingBreakdown;
  paymentMethod: 'card' | 'apple_pay' | 'google_pay';
  cardLast4?: string;
  status: 'Confirmed' | 'Active' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface UserAuth {
  isLoggedIn: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    licenseNumber?: string;
    licenseState?: string;
  } | null;
}
