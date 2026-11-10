import React from 'react';
import { Hero } from '../components/home/Hero.tsx';
import { BrandsBar } from '../components/home/BrandsBar.tsx';
import { FeaturedFleet } from '../components/home/FeaturedFleet.tsx';
import { HowItWorks } from '../components/home/HowItWorks.tsx';
import { WhyChooseUs } from '../components/home/WhyChooseUs.tsx';
import { PopularLocations } from '../components/home/PopularLocations.tsx';
import { StatsCounter } from '../components/home/StatsCounter.tsx';
import { Testimonials } from '../components/home/Testimonials.tsx';
import { SpecialOfferBanner } from '../components/home/SpecialOfferBanner.tsx';
import { FaqSection } from '../components/home/FaqSection.tsx';
import { NewsletterSection } from '../components/home/NewsletterSection.tsx';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <BrandsBar />
      <FeaturedFleet />
      <HowItWorks />
      <WhyChooseUs />
      <PopularLocations />
      <StatsCounter />
      <Testimonials />
      <SpecialOfferBanner />
      <FaqSection />
      <NewsletterSection />
    </div>
  );
};
