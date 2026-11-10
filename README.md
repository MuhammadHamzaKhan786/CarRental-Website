# Veloce Car Rental 🚗💨

A modern, responsive, and feature-rich car rental web application tailored for the United States market, built with **React 19**, **React Router v7**, and **Tailwind CSS v4**.

Designed with a premium, trustworthy look inspired by leading mobility platforms (Turo, Hertz, Enterprise, Sixt).

---

## ✨ Features

- **US Fleet & Travel Conventions**:
  - Itemized pricing in USD (`$`) with mandatory US state taxes (9.25%), vehicle licensing & road recovery ($4.50/day), and age-based young driver surcharges ($25/day for ages 21–24).
  - Standard US date format (`MM/DD/YYYY`), 12-hour pick-up/return time pickers (`AM`/`PM`), distances in miles, and fuel economy in `MPG` (or `MPGe` / EV range).
  - 18 premier US pick-up hubs: 8 major airport terminals (`JFK`, `LAX`, `ORD`, `MIA`, `ATL`, `DFW`, `SFO`, `LAS`) and 10 downtown business districts (`NYC`, `LA`, `Chicago`, `Miami`, `Atlanta`, `Dallas`, `SF`, `Las Vegas`, `Houston`, `Seattle`).
- **Interactive Multi-Facet Search**:
  - Live filtering by price range slider ($30–$200/day), brand, vehicle category (`SUV`, `Sedan`, `Luxury`, `Electric`, `Truck`, `Economy`), transmission, and pick-up location.
  - Real-time sorting by Price (Low to High, High to Low) and Customer Rating.
- **Car Details & Live Cost Calculator**:
  - Image gallery with full-screen lightbox modal.
  - Dynamic price breakdown calculating duration, young driver surcharges, insurance tiers (CDW, Liability, Personal Accident, or Own Insurance), and add-on extras (E-ZPass toll pass, GPS, child safety seat, additional driver, unlimited miles).
- **4-Step Checkout & Printable Voucher**:
  - Step 1: Driver details (50-state license selector, US phone formatting).
  - Step 2: Protection and travel extras.
  - Step 3: Secure card payment (auto-formatting, CVV/Expiry check, Apple Pay & Google Pay).
  - Step 4: Reservation voucher with booking code (e.g. `VEL-23372`), vehicle specs, pick-up instructions, and print capability.
- **Dedicated Pricing & Contact Pages**:
  - Separate `/pricing` route with daily, weekly, and monthly rate cards.
  - Dedicated `/contact` route with 24/7 roadside assistance callout, HQ dispatch details, and validated inquiry form.
- **User Dashboard & Persistence**:
  - "My Bookings" tab with cancellation capabilities.
  - "Saved Favorites" wishlist persisted in `localStorage`.
  - Dual-mode Dark / Light theme toggle with `localStorage` memory.
- **Mobile First & Fully Responsive**:
  - Optimized for mobile viewports (320px–414px) up to ultra-wide displays (1536px+).
  - Slide-in mobile drawer navigation with smooth animations.

---

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://motion.dev/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Language**: TypeScript

---

## 🚀 Getting Started

### Prerequisites

- Node.js (version 20 or higher recommended)
- npm or pnpm

### Installation

1. Clone your repository:
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd <YOUR_REPO_DIR>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```

### Building for Production

```bash
npm run build
```

---

## 📄 License

Apache-2.0
