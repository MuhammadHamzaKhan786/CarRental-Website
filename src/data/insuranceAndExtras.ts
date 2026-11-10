import { InsuranceOption, ExtraOption } from '../types/index.ts';

export const INSURANCE_OPTIONS: InsuranceOption[] = [
  {
    id: 'cdw-full',
    name: 'Collision Damage Waiver (CDW)',
    pricePerDay: 19.99,
    tagline: 'Zero-deductible peace of mind',
    description: 'Relieves you of financial responsibility for damage, loss, vandalism, or theft of the rental vehicle.',
    coverageItems: [
      '$0 damage deductible',
      'Theft & vandalism protection',
      'Windshield, tire, & glass replacement',
      'Loss of use charges waived',
    ],
    recommended: true,
  },
  {
    id: 'supplemental-liability',
    name: 'Supplemental Liability Insurance (SLI)',
    pricePerDay: 14.49,
    tagline: 'Up to $1,000,000 coverage',
    description: 'Provides supplemental protection against 3rd party claims for bodily injury and property damage.',
    coverageItems: [
      'Up to $1M 3rd party bodily injury',
      'Property damage liability',
      'Legal defense costs covered',
      'Valid across all 50 US States',
    ],
  },
  {
    id: 'personal-accident',
    name: 'Personal Accident & Cargo Protection',
    pricePerDay: 8.99,
    tagline: 'Medical & baggage protection',
    description: 'Covers accidental medical expenses and personal effects lost or damaged in vehicle during the trip.',
    coverageItems: [
      'Up to $25,000 medical coverage per occupant',
      '$2,500 personal luggage / effects protection',
      'Ambulance and emergency assistance',
      'Accidental death benefit',
    ],
  },
  {
    id: 'own-insurance',
    name: 'I Have My Own Insurance',
    pricePerDay: 0.00,
    tagline: 'Personal Auto or Credit Card Policy',
    description: 'Use your existing personal US auto policy or primary credit card rental protection benefit.',
    coverageItems: [
      'Must present proof of valid US auto policy at counter',
      'Subject to your policy deductible (typically $500–$1,000)',
      'Primary driver must match credit card holder',
    ],
  },
];

export const EXTRAS_OPTIONS: ExtraOption[] = [
  {
    id: 'ezpass',
    name: 'E-ZPass / SunPass Automatic Toll Transponder',
    pricePerDay: 6.99,
    description: 'Glide through automated electronic toll lanes across all US highways, bridges, and turnpikes without waiting at cash booths.',
    iconName: 'CreditCard',
  },
  {
    id: 'gps',
    name: 'Garmin HD Voice GPS Navigation',
    pricePerDay: 7.99,
    description: 'Dedicated high-definition satellite navigation with live lane assist and offline maps for areas with spotty cellular reception.',
    iconName: 'Navigation',
  },
  {
    id: 'child-seat',
    name: 'NHTSA Certified Child Safety Seat',
    pricePerDay: 11.99,
    description: 'Pre-sanitized convertible car seat suitable for infants, toddlers, and booster ages meeting federal motor vehicle safety standards.',
    iconName: 'Baby',
  },
  {
    id: 'additional-driver',
    name: 'Additional Authorized Driver',
    pricePerDay: 12.00,
    description: 'Add a spouse, partner, or companion as a fully licensed and insured driver for long cross-country highway shifts.',
    iconName: 'Users',
  },
  {
    id: 'unlimited-miles',
    name: 'Interstate Unlimited Mileage Pass',
    pricePerDay: 14.99,
    description: 'Drive as far as your adventure takes you across state lines with zero per-mile surcharge or distance caps.',
    iconName: 'Gauge',
  },
];
