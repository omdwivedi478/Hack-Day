# FarmDirect 🌾

> **"Multiple intermediaries reduce farmers' earnings and increase consumer prices."**
> FarmDirect is a digital agricultural marketplace that directly connects farmers with buyers, delivering radical price transparency, direct escrow payouts, market intelligence, and collective procurement.

---

## 📋 Problem Statement & Solution

### The Challenge
In traditional agricultural supply chains across India, produce passes through 4 to 5 middlemen (local aggregators, village traders, APMC commission agents, and urban retailers). As a result:
- **Farmers receive only 30% to 45%** of the consumer shelf price.
- **Consumers pay inflated markups** with no traceability of origin or harvest freshness.
- Volatile mandi auctions and lack of demand forecasting lead to distress selling and seasonal spoilage.

### The FarmDirect Solution
FarmDirect disintermediates the supply chain:
- **Direct From Origin**: Buyers purchase produce harvested at dawn straight from verified growers.
- **Transparent Price Breakdown**: Every product listing details exactly how much the farmer receives (up to 80%), alongside logistics and platform fees.
- **Fair Market Benchmarking**: Real-time comparisons against APMC Mandi wholesale averages ensure buyers and growers get true market parity.
- **Community Buying Pools**: Neighborhoods and cooperatives pool orders to unlock bulk farm-gate pricing.
- **Predictive Sowing Insights**: Institutional demand telemetry guides farmers on high-yield planting cycles.

---

## 🚀 Key Features

### 🛒 Buyer Experience
- **Interactive Produce Marketplace**: Browse commodities by category (Vegetables, Fruits, Grains, Spices, Organic), filter by price, organic certification, and grower ratings.
- **Product Detail & Price Transparency Engine**: Inspect unit pricing alongside interactive visual breakdowns comparing the FarmDirect direct model vs. traditional 4-tier middleman supply chains.
- **Community Buying Pools ("Buy Together. Save Together")**: Collective procurement pools with live demand progress meters that unlock lower tier prices when volume targets are reached.
- **Verified Farmers Directory**: Discover family farms across states, view experience, acreage, certifications, and customer reviews.
- **Order Management & Live Tracking**: Real-time tracking from field harvest to cold-chain delivery.
- **Transparent Ledger & Receipts**: Complete transaction history with PDF invoice downloads.

### 🧑‍🌾 Farmer Studio (Producer Portal)
- **Farmer Dashboard**: Key metrics on net farm revenue, harvest absorption, average realized price vs. mandi rates, and pending orders.
- **Harvest Catalog & Inventory**: Publish new produce listings with pricing, grades, and photo selection; live quick-edit for stock quantities.
- **Fulfillment Pipeline**: Manage incoming order preparation, crating, cold-chain transport handovers, and delivery confirmation.
- **Direct Bank Settlements**: Instant escrow settlement ledger with zero intermediary deductions and balance withdrawal simulation.
- **Farm Profile Management**: Edit bio, acreage, specialty crops, and government certifications (NPOP, Jaivik Bharat, PGS-India).

### 📊 Market Intelligence & AI
- **Market Price Intelligence**: 7-day comparative charts between FarmDirect stable pricing and volatile APMC Mandi wholesale averages, supported by AI procurement advisories.
- **Demand Forecasting & Sowing Calendar**: Predictive volume graphs across quarters to guide harvest planning.
- **FarmDirect AI Assistant**: An interactive floating agronomic advisory assistant providing quick insights on seasonal crops, mandi rates, and pest management.

---

## 🏗️ Architecture & Directory Structure

The codebase is organized with clear separation of concerns, modular components, dedicated domain services, and reusable utilities:

```
src/
├── assets/                  # Static assets organized by type
│   ├── icons/
│   ├── images/
│   └── logos/
├── components/              # Modular UI components
│   ├── ai/                  # AI Assistant drawer & prompt bar
│   ├── common/              # Reusable atoms (Button, Badge, Modal, EmptyState, PriceTransparencyCard)
│   ├── dashboard/           # Analytics charts, stat cards, recent order widgets
│   ├── farmer/              # Farmer cards, stats, and profile widgets
│   ├── layout/              # AppLayout, Header, Sidebar, FarmerSidebar, MobileNav
│   ├── marketplace/         # ProductCard, CategoryTabs, ProductFiltersModal
│   └── orders/              # OrderRow, OrderTimeline, TrackingCard
├── context/                 # Application state management
│   ├── AuthContext.jsx      # User profile, role switching (Buyer <-> Farmer)
│   ├── CartContext.jsx      # Cart items, persistence, savings calculation
│   ├── MarketplaceContext.jsx # Products, orders, farmers state & service orchestration
│   ├── ThemeContext.jsx     # Dark / Light theme toggle with local storage persistence
│   └── ToastContext.jsx     # Global notification toast alerts
├── data/                    # Seed mock datasets
│   ├── mockAiResponses.js
│   ├── mockCommunityPools.js
│   ├── mockDemandInsights.js
│   ├── mockFarmers.js
│   ├── mockMarketPrices.js
│   ├── mockOrders.js
│   └── mockProducts.js
├── pages/                   # Categorized route views
│   ├── auth/                # Login & Register
│   ├── buyer/               # Buyer Dashboard, Cart, Checkout, Orders, OrderDetail, Transactions
│   ├── community/           # Community Bulk Buying Pools
│   ├── farmer/              # Farmer Dashboard, Products, AddProduct, Orders, Earnings, ProfileEdit
│   ├── insights/            # Price Intelligence & Demand Insights
│   ├── landing/             # Public Marketing Landing Page
│   ├── marketplace/         # Marketplace catalog & Product Detail
│   ├── profile/             # Farmers Directory & Farmer Profile
│   └── settings/            # Account & Notification Settings
├── services/                # Business logic & data access layer
│   ├── cartService.js       # Cart calculation & local persistence
│   ├── farmerService.js     # Farmer queries & profile persistence
│   ├── marketService.js     # Market prices, demand trends & community pools
│   ├── orderService.js      # Order creation, status updates & transaction logs
│   └── productService.js    # Product queries, listing creation & inventory updates
├── utils/                   # Shared utility helpers
│   ├── formatCurrency.js    # INR currency formatting (₹)
│   ├── formatDate.js        # Locale date and time formatters
│   └── storage.js           # Safe localStorage wrapper with error fallbacks
├── App.jsx                  # Main router setup & provider tree
├── index.css                # Tailwind CSS & custom design tokens
└── main.jsx                 # Entry point
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18.0 or later recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/HackDay.git

# Navigate to project directory
cd HackDay

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Linting & Code Quality
FarmDirect uses **Oxlint** for ultra-fast, high-rigor static analysis:
```bash
npm run lint
```
*(Configured with 0 warnings and 0 errors).*

### Production Build
```bash
npm run build
```
Generates an optimized production bundle in `dist/`.

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` to configure application variables:
```bash
cp .env.example .env
```

| Variable | Description | Default |
|---|---|---|
| `VITE_APP_NAME` | Name of the application | `"FarmDirect"` |
| `VITE_APP_ENV` | Current runtime environment | `"development"` |
| `VITE_API_BASE_URL` | Future REST API endpoint | `"http://localhost:8000/api/v1"` |
| `VITE_ENABLE_MOCK_DATA` | Flag to use local seed mock data | `"true"` |

---

## 📌 Prototype Notice & Future Roadmap

> [!NOTE]
> This repository represents the **Frontend Production Build** containing interactive mock datasets, localStorage simulation, and dedicated domain services (`src/services/`) designed for seamless drop-in backend API integration.

### Future Backend Milestones:
1. **REST / GraphQL API**: Replace `localStorage` services with live endpoints (Node.js/Express, Python/FastAPI, or Go).
2. **Real Mandi Agmarknet Integration**: Ingest live APMC daily wholesale modal prices via government data APIs.
3. **Payments & Escrow**: Integrate Razorpay / UPI autopay with webhook-triggered escrow releases upon buyer proof-of-delivery.
4. **Cold Chain Telemetry**: IoT temperature sensor integration for live transport quality tracking.
