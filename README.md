# Veloce Car Rental 🚗

Veloce is a car rental web application built around US travel conventions. Users can search a fleet, compare vehicles, see an itemized price before committing, and work through a full booking flow that ends in a printable reservation voucher.

The interface takes its cues from established rental platforms such as Turo, Hertz, Enterprise and Sixt, with the goal of feeling clear and trustworthy rather than flashy.

🌐 **Live demo:** [carrental-website-eta.vercel.app](https://carrental-website-eta.vercel.app)

## ✨ Features

### 🔍 Search and browsing
- Filter by daily price range ($30–$200), brand, category (SUV, Sedan, Luxury, Electric, Truck, Economy), transmission and pick-up location.
- Sort results by price (ascending or descending) or customer rating.
- 18 pick-up locations: eight airport terminals (JFK, LAX, ORD, MIA, ATL, DFW, SFO, LAS) and ten downtown districts across major US cities.

### 💵 Vehicle details and pricing
- Image gallery with a full-screen lightbox.
- A live cost calculator that updates as the rental changes. It accounts for:
  - rental duration
  - US state tax (9.25%)
  - vehicle licensing and road recovery fee ($4.50/day)
  - young driver surcharge ($25/day for drivers aged 21–24)
  - insurance tiers: CDW, Liability, Personal Accident, or the renter's own coverage
  - optional extras: E-ZPass, GPS, child safety seat, additional driver, unlimited miles
- Standard US formats throughout: `MM/DD/YYYY` dates, 12-hour AM/PM times, miles, and MPG (or MPGe and range for electric vehicles).

### 🧾 Checkout
A four-step flow:
1. **Driver details** – 50-state license selector and US phone number formatting.
2. **Protection and extras** – insurance and add-ons.
3. **Payment** – card input with automatic formatting, CVV and expiry validation, plus Apple Pay and Google Pay options.
4. **Voucher** – a reservation summary with booking code (for example `VEL-23372`), vehicle specs and pick-up instructions, ready to print.

### 👤 Account and preferences
- "My Bookings" view with the ability to cancel a reservation.
- Saved favorites ❤️, stored in `localStorage`.
- Light and dark themes 🌗, with the choice remembered between visits.

### 📄 Other pages
- `/pricing` – daily, weekly and monthly rate cards.
- `/contact` – roadside assistance information, dispatch details and a validated inquiry form.

### 📱 Responsive design
Layouts are tuned for phones (320px and up) through to ultra-wide displays (1536px+). On small screens, navigation moves into a slide-in drawer.

## 🛠 Tech Stack

| Area | Tool |
| --- | --- |
| UI framework | [React 19](https://react.dev/) |
| Routing | [React Router v7](https://reactrouter.com/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Animation | [Framer Motion](https://motion.dev/) |
| Build tool | [Vite 8](https://vite.dev/) |
| Language | TypeScript |

## 🚀 Getting Started

### Prerequisites
- Node.js 20 or later
- npm (or pnpm / Bun)

### Installation

```bash
git clone https://github.com/MuhammadHamzaKhan786/CarRental-Website.git
cd CarRental-Website
npm install
```

If the project reads any environment variables, copy the provided template first:

```bash
cp .env.example .env
```

### Run locally

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### Production build

```bash
npm run build
```

The optimized output is written to the `dist` directory.

## 📁 Project Structure

```
.
├── public/          Static assets
├── src/             Application source (components, pages, styles)
├── index.html       Entry HTML file
├── vite.config.ts   Vite configuration
├── tsconfig.json    TypeScript configuration
└── .env.example     Environment variable template
```

## 📝 Notes

This is a front-end project. Booking, favorites and theme data live in the browser, and the payment step is a demonstration of the checkout experience, not a connection to a real payment processor. Do not enter real card details.

## 🤝 Contributing

Issues and pull requests are welcome. For larger changes, please open an issue first so the approach can be discussed before work begins.

## 📜 License

Released under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

## 👨‍💻 Author

Muhammad Hamza Khan — [@MuhammadHamzaKhan786](https://github.com/MuhammadHamzaKhan786)
