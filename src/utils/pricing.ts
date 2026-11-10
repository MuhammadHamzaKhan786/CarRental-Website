import { PricingBreakdown, InsuranceOption, ExtraOption } from '../types/index.ts';

export const TAX_RATE = 0.0925; // 9.25% combined state sales & airport concession fee
export const DAILY_LICENSING_FEE = 4.50; // $4.50/day US road recovery & vehicle licensing fee
export const YOUNG_DRIVER_DAILY_FEE = 25.00; // $25/day for drivers 21-24 in US car rental

/**
 * Parses MM/DD/YYYY or YYYY-MM-DD into a Date
 */
export function parseDateString(dateStr: string): Date {
  if (!dateStr) return new Date();
  if (dateStr.includes('-')) {
    // YYYY-MM-DD
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
  }
  if (dateStr.includes('/')) {
    // MM/DD/YYYY
    const [m, d, y] = dateStr.split('/').map(Number);
    return new Date(y, m - 1, d);
  }
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? new Date() : d;
}

/**
 * Calculates rental duration in days (minimum 1 day).
 */
export function calculateRentalDays(pickUpDateStr: string, returnDateStr: string): number {
  if (!pickUpDateStr || !returnDateStr) return 1;
  const start = parseDateString(pickUpDateStr);
  const end = parseDateString(returnDateStr);
  
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays);
}

/**
 * Formats a Date or date string to MM/DD/YYYY
 */
export function formatToUSDate(dateInput: Date | string): string {
  const date = typeof dateInput === 'string' ? parseDateString(dateInput) : dateInput;
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

/**
 * Converts standard Date to YYYY-MM-DD for native HTML date inputs
 */
export function toInputDateFormat(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Formats number to USD currency string ($xx.xx)
 */
export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats input into US Phone (555) 123-4567
 */
export function formatUSPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) {
    return digits ? `(${digits}` : '';
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

/**
 * Formats input into 16-digit credit card with spaces
 */
export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  const parts = [];
  for (let i = 0; i < digits.length; i += 4) {
    parts.push(digits.slice(i, i + 4));
  }
  return parts.join(' ');
}

/**
 * Formats card expiration MM/YY
 */
export function formatCardExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) {
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  }
  return digits;
}

export interface PricingParams {
  baseDailyRate: number;
  days: number;
  driverAge: number;
  insuranceOption?: InsuranceOption | null;
  selectedExtras?: ExtraOption[];
  promoCode?: string;
}

/**
 * Calculates complete itemized pricing breakdown according to US rental conventions.
 */
export function calculatePricing({
  baseDailyRate,
  days,
  driverAge,
  insuranceOption,
  selectedExtras = [],
  promoCode = '',
}: PricingParams): PricingBreakdown {
  const safeDays = Math.max(1, days);
  const baseTotal = +(baseDailyRate * safeDays).toFixed(2);
  
  // Young driver fee if 21-24
  const isYoungDriver = driverAge >= 21 && driverAge <= 24;
  const youngDriverFeePerDay = isYoungDriver ? YOUNG_DRIVER_DAILY_FEE : 0;
  const youngDriverFeeTotal = +(youngDriverFeePerDay * safeDays).toFixed(2);

  // Insurance
  const insurancePerDay = insuranceOption ? insuranceOption.pricePerDay : 0;
  const insuranceTotal = +(insurancePerDay * safeDays).toFixed(2);

  // Extras
  const extrasTotal = +selectedExtras
    .reduce((sum, extra) => sum + extra.pricePerDay * safeDays, 0)
    .toFixed(2);

  const subtotalBeforeDiscount = +(baseTotal + youngDriverFeeTotal + insuranceTotal + extrasTotal).toFixed(2);

  // Promo Code Validation
  let discount = 0;
  let promoCodeApplied: string | undefined = undefined;
  const cleanCode = promoCode.trim().toUpperCase();

  if (cleanCode === 'ROADTRIP20') {
    discount = +(baseTotal * 0.20).toFixed(2);
    promoCodeApplied = 'ROADTRIP20 (20% Off Base Rate)';
  } else if (cleanCode === 'USA50') {
    if (subtotalBeforeDiscount >= 150) {
      discount = 50.00;
      promoCodeApplied = 'USA50 ($50 Off Total)';
    }
  } else if (cleanCode === 'WELCOME10') {
    discount = +(subtotalBeforeDiscount * 0.10).toFixed(2);
    promoCodeApplied = 'WELCOME10 (10% Off Rental)';
  }

  const taxableSubtotal = Math.max(0, subtotalBeforeDiscount - discount);
  const taxesAndConcessionFee = +(taxableSubtotal * TAX_RATE).toFixed(2);
  const licensingFeeTotal = +(DAILY_LICENSING_FEE * safeDays).toFixed(2);

  const grandTotal = +(taxableSubtotal + taxesAndConcessionFee + licensingFeeTotal).toFixed(2);

  return {
    days: safeDays,
    baseDailyRate,
    baseTotal,
    youngDriverFeePerDay,
    youngDriverFeeTotal,
    insurancePerDay,
    insuranceTotal,
    extrasTotal,
    subtotal: subtotalBeforeDiscount,
    discount,
    promoCodeApplied,
    taxesAndConcessionFee,
    licensingFeeTotal,
    grandTotal,
  };
}

/**
 * Validates promo code and returns info or error
 */
export function checkPromoCode(code: string, currentSubtotal: number): { valid: boolean; message: string; discountText: string } {
  const clean = code.trim().toUpperCase();
  if (!clean) return { valid: false, message: 'Please enter a promo code.', discountText: '' };
  if (clean === 'ROADTRIP20') {
    return { valid: true, message: 'Promo code applied: 20% discount on base daily rate!', discountText: '20% Off Base' };
  }
  if (clean === 'USA50') {
    if (currentSubtotal < 150) {
      return { valid: false, message: 'USA50 requires a minimum booking subtotal of $150.', discountText: '' };
    }
    return { valid: true, message: 'Promo code applied: $50 off your trip!', discountText: '$50.00 Off' };
  }
  if (clean === 'WELCOME10') {
    return { valid: true, message: 'Promo code applied: 10% off entire booking!', discountText: '10% Off' };
  }
  return { valid: false, message: 'Invalid or expired promo code. Try ROADTRIP20 or USA50', discountText: '' };
}
