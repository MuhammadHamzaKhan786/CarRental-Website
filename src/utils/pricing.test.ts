import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateRentalDays,
  calculatePricing,
  formatUSD,
  formatUSPhone,
  formatCardNumber,
  checkPromoCode,
  parseDateString,
  YOUNG_DRIVER_DAILY_FEE,
  TAX_RATE,
  DAILY_LICENSING_FEE
} from './pricing.ts';

test('calculateRentalDays correctly counts difference in days with 1-day minimum', () => {
  assert.equal(calculateRentalDays('2026-11-10', '2026-11-10'), 1);
  assert.equal(calculateRentalDays('2026-11-10', '2026-11-13'), 3);
  assert.equal(calculateRentalDays('11/10/2026', '11/15/2026'), 5);
  // Negative or invalid defaults to minimum 1 day
  assert.equal(calculateRentalDays('2026-11-15', '2026-11-10'), 1);
});

test('calculatePricing computes base rate, young driver fee, tax and licensing fee', () => {
  const resultYoung = calculatePricing({
    baseDailyRate: 100,
    days: 2,
    driverAge: 22, // young driver (<25)
  });

  assert.equal(resultYoung.days, 2);
  assert.equal(resultYoung.baseTotal, 200);
  assert.equal(resultYoung.youngDriverFeePerDay, YOUNG_DRIVER_DAILY_FEE);
  assert.equal(resultYoung.youngDriverFeeTotal, 50); // 25 * 2
  assert.equal(resultYoung.licensingFeeTotal, 9.00); // 4.50 * 2
  
  const expectedSubtotal = 200 + 50; // 250
  assert.equal(resultYoung.subtotal, expectedSubtotal);
  const expectedTax = +(expectedSubtotal * TAX_RATE).toFixed(2); // 250 * 0.0925 = 23.13
  assert.equal(resultYoung.taxesAndConcessionFee, expectedTax);
  assert.equal(resultYoung.grandTotal, +(expectedSubtotal + expectedTax + 9.00).toFixed(2));
});

test('calculatePricing excludes young driver fee for age >= 25', () => {
  const resultMature = calculatePricing({
    baseDailyRate: 50,
    days: 3,
    driverAge: 28,
  });

  assert.equal(resultMature.youngDriverFeeTotal, 0);
  assert.equal(resultMature.baseTotal, 150);
});

test('calculatePricing applies promo codes correctly', () => {
  const withRoadtrip = calculatePricing({
    baseDailyRate: 100,
    days: 3,
    driverAge: 30,
    promoCode: 'ROADTRIP20',
  });

  // Base total is 300, 20% discount is 60
  assert.equal(withRoadtrip.discount, 60);
  assert.ok(withRoadtrip.promoCodeApplied?.includes('ROADTRIP20'));
});

test('formatUSD formats currency properly', () => {
  assert.equal(formatUSD(49.9), '$49.90');
  assert.equal(formatUSD(1250), '$1,250.00');
});

test('formatUSPhone and formatCardNumber format inputs correctly', () => {
  assert.equal(formatUSPhone('5551234567'), '(555) 123-4567');
  assert.equal(formatCardNumber('4111222233334444'), '4111 2222 3333 4444');
});

test('checkPromoCode validates codes accurately', () => {
  assert.equal(checkPromoCode('ROADTRIP20', 100).valid, true);
  assert.equal(checkPromoCode('USA50', 100).valid, false); // requires >= $150
  assert.equal(checkPromoCode('USA50', 200).valid, true);
  assert.equal(checkPromoCode('INVALID_CODE', 200).valid, false);
});
