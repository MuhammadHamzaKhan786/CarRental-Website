/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext.tsx';
import { ErrorBoundary } from './components/common/ErrorBoundary.tsx';
import { ScrollToTop } from './components/common/ScrollToTop.tsx';
import { ToastContainer } from './components/common/ToastContainer.tsx';
import { Navbar } from './components/layout/Navbar.tsx';
import { Footer } from './components/layout/Footer.tsx';

import { HomePage } from './pages/HomePage.tsx';
import { SearchResultsPage } from './pages/SearchResultsPage.tsx';
import { CarDetailsPage } from './pages/CarDetailsPage.tsx';
import { CheckoutPage } from './pages/CheckoutPage.tsx';
import { DashboardPage } from './pages/DashboardPage.tsx';
import { LocationsPage } from './pages/LocationsPage.tsx';
import { PricingPage } from './pages/PricingPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { AuthPage } from './pages/AuthPage.tsx';
import { NotFoundPage } from './pages/NotFoundPage.tsx';

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <BrowserRouter>
          <ScrollToTop />
          <ToastContainer />
          <div className="min-h-screen flex flex-col bg-[#F5F7FA] text-slate-900 dark:bg-[#070E1E] dark:text-slate-100 transition-colors duration-200 selection:bg-[#FF6B2C] selection:text-white">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cars" element={<SearchResultsPage />} />
                <Route path="/cars/:id" element={<CarDetailsPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/locations" element={<LocationsPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  );
}
