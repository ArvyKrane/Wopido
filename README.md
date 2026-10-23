# Wopido — Women-First Ride-Hailing Platform (Rider App)

> **For women, by women.** A safe, reliable, two-sided ride-hailing experience connecting women riders with verified women captains across Pune.

---

## 🌸 Product Purpose & Highlights
- **100% Women Captains**: Dedicated safety ecosystem for women travelers.
- **Fair & Transparent Pricing**: ₹40 base fare for the first 2 km, ₹12/km thereafter (Bike demo rate), 3% platform fee.
- **Interactive Pune Booking Experience**: Pre-configured locations (FC Road, Koregaon Park, Shivajinagar, Hinjewadi IT Park, Pune Airport).
- **Two-Sided Cross-App Realtime Sync**: Shared Supabase backend with live booking status synchronization with the Wopido Driver App.
- **Comprehensive Women Safety Suite**: Emergency SOS, trusted contacts, live trip sharing, Pune police helplines (1091).
- **Graceful Fallbacks**: Fully demonstrable offline or in demo mode without external API keys.

---

## 🛠️ Technology Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS & shadcn/ui (New York style, Deep Plum `#4A1C6A` & Warm Rose `#E8637A`)
- **Icons**: Lucide React
- **Backend / Realtime**: Supabase (PostgreSQL, Realtime, RLS)
- **Deployment**: Vercel

---

## 🚀 Quick Start (Local Setup)

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DEMO_MODE=true
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_GOOGLE_MAPS_KEY=
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📱 Core Pages & User Flows
- `/` — Home Booking: Interactive Pune location search, ride category selector (Bike/Auto/Cab), fare breakdown, live route map preview, booking lifecycle actions.
- `/auth` — Rider Authentication: Mobile OTP sign-in with instant demo bypass login.
- `/rides` — Rides History: Filter completed/cancelled rides with ratings and dates.
- `/rides/[id]` — Ride Receipt: Itemized fare breakdown, captain information, and downloadable receipt.
- `/profile` — Rider Profile: Manage personal information and saved locations (Home/Work).
- `/safety` — Safety Centre: Simulated one-tap Emergency SOS, emergency contacts, live share link.
- `/help` — Help & FAQs: 24/7 dedicated support and safety guidance.

---

## 💳 Fare Formula (INR)
- **Base Fare**: ₹40.00 (covers first 2.0 km)
- **Extra Distance Charge**: `max(0, distance - 2.0 km) * ₹12.00/km` (Bike demo rate)
- **Ride Subtotal**: Base Fare + Extra Distance Charge
- **Platform Fee**: 3% of Subtotal
- **Total Fare**: Subtotal + Platform Fee
