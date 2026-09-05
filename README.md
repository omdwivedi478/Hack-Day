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

FarmDirect is architected as a decoupled full-stack platform comprising a high-performance React + Tailwind CSS client and a production-structured Node.js + Express + MongoDB REST API backend:

```
HackDay/
├── backend/                     # Node.js + Express + MongoDB REST API
│   ├── src/
│   │   ├── config/              # MongoDB Mongoose connection & pool config
│   │   ├── controllers/         # Request handling & HTTP response mapping
│   │   │   ├── authController.js
│   │   │   ├── dashboardController.js
│   │   │   ├── farmerController.js
│   │   │   ├── marketController.js
│   │   │   ├── orderController.js
│   │   │   └── productController.js
│   │   ├── middleware/          # JWT auth, role authorization, centralized error handling
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorMiddleware.js
│   │   │   └── roleMiddleware.js
│   │   ├── models/              # Mongoose database schemas
│   │   │   ├── CommunityOrder.js
│   │   │   ├── Farmer.js
│   │   │   ├── MarketPrice.js
│   │   │   ├── Notification.js
│   │   │   ├── Order.js
│   │   │   ├── Product.js
│   │   │   ├── Review.js
│   │   │   └── User.js
│   │   ├── routes/              # Express API routers
│   │   │   ├── authRoutes.js
│   │   │   ├── dashboardRoutes.js
│   │   │   ├── farmerRoutes.js
│   │   │   ├── marketRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   └── productRoutes.js
│   │   ├── seed/                # Standalone database seeder
│   │   │   └── seedData.js
│   │   ├── services/            # Domain services (e.g. price transparency calculation)
│   │   │   └── priceTransparencyService.js
│   │   └── utils/               # JWT token generator & in-memory offline fallback store
│   │       ├── fallbackStore.js
│   │       └── generateToken.js
│   ├── .env.example             # Backend environment template
│   ├── package.json             # Backend dependencies (express, mongoose, jsonwebtoken, etc.)
│   └── server.js                # Server entry point & CORS configuration
│
├── src/                         # React Frontend (Source of truth for UI/UX)
│   ├── components/              # Modular UI components (cards, charts, modal, timeline)
│   ├── context/                 # Application state (AuthContext, MarketplaceContext, CartContext)
│   ├── pages/                   # Categorized route views (buyer, farmer, marketplace, orders)
│   ├── services/                # API service layer with resilient offline fallback
│   │   ├── farmerService.js
│   │   ├── marketService.js
│   │   ├── orderService.js
│   │   └── productService.js
│   └── utils/
│       ├── apiClient.js         # Fetch client with auto JWT bearer injection & timeout handling
│       ├── formatCurrency.js
│       └── storage.js
├── .env.example                 # Frontend environment template
├── package.json                 # Frontend dependencies (React, Vite, Lucide, Tailwind)
└── vite.config.js
```

---

## 🔌 API Endpoints Reference

Base URL: `http://localhost:5000/api`

### 1. System Health
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service status, uptime, timestamp & database connectivity |

### 2. Authentication (`/api/auth`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new Buyer/Farmer with hashed password |
| `POST` | `/api/auth/login` | Public | Authenticate user & receive JWT token |
| `GET` | `/api/auth/me` | Bearer Token | Fetch authenticated user profile |

### 3. Products & Produce (`/api/products`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/products` | Public | List products (supports `q`, `category`, `maxPrice`, `organicOnly`, `sort`) |
| `GET` | `/api/products/:id` | Public | Get single produce listing with price transparency breakdown |
| `POST` | `/api/products` | Farmer / Admin | Publish new direct farm listing |
| `PUT` | `/api/products/:id` | Farmer / Admin | Update inventory quantity or price |
| `DELETE` | `/api/products/:id` | Farmer / Admin | Remove produce listing from marketplace |

### 4. Farmers & Producer Profiles (`/api/farmers`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/farmers` | Public | List verified farmers (supports search, state, minRating) |
| `GET` | `/api/farmers/:id` | Public | Get detailed farmer profile with acreage, certifications & products |
| `GET` | `/api/farmers/:id/products` | Public | Fetch all produce listings from a specific grower |
| `GET` | `/api/farmers/dashboard` | Farmer Token | Farmer dashboard metrics, revenue & active orders |
| `GET` | `/api/farmers/earnings` | Farmer Token | Payout history, pending escrow & bank settlements |
| `PUT` | `/api/farmers/profile` | Farmer Token | Update farm profile, acreage, crops & bank account |

### 5. Orders & Escrow (`/api/orders`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/orders` | Optional / Token | Create order with automatic timeline, escrow allocation & fee breakdown |
| `GET` | `/api/orders` | Optional / Token | List orders (filterable by `buyerId`, `farmerId`, `status`) |
| `GET` | `/api/orders/:id` | Optional / Token | Get single order detail with live 5-step tracking milestones |
| `PUT` | `/api/orders/:id/status` | Token | Advance status (`Pending`, `Processing`, `In Transit`, `Delivered`, `Cancelled`) |

### 6. Market Intelligence & Community Buying (`/api/market`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/market/prices` | Public | APMC Mandi benchmarks vs FarmDirect fair prices |
| `GET` | `/api/market/prices/:id` | Public | 7-day price history & AI procurement advisory for commodity |
| `GET` | `/api/market/community` | Public | List active bulk buying pools |
| `POST` | `/api/market/community/:id/join`| Public / Token | Pledge quantity (kg) to collective pool and unlock lower price tiers |
| `GET` | `/api/market/insights` | Public | Seasonal demand forecasting & high-yield planting calendar |

### 7. Dashboards (`/api/dashboard`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/dashboard/buyer` | Public / Token | Buyer spend overview, active orders, and intermediary savings |
| `GET` | `/api/dashboard/farmer` | Public / Token | Monthly farm revenue, realized margin, and fulfillment queue |

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18.0 or later recommended)
- npm or yarn
- MongoDB (optional for local database persistence; the system includes a zero-dependency in-memory fallback layer)

### 1. Running the Backend API
```bash
# Navigate to backend directory
cd backend

# Install dependencies (express, mongoose, jsonwebtoken, bcryptjs, cors, dotenv)
npm install

# Seed the database with realistic agricultural records (Optional)
npm run seed

# Start development server on port 5000
npm run dev
# Or production mode:
npm start
```
*Health Check*: Open [http://localhost:5000/api/health](http://localhost:5000/api/health)

### 2. Running the Frontend Application
```bash
# In the root HackDay directory
npm install

# Start Vite dev server on port 5173
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛡️ Resilient Offline Fallback Architecture

FarmDirect is engineered for **100% resilience**:
1. **Frontend Graceful Fallback**: If the backend server is offline or restarting, `apiClient` catches network timeouts within 3.5 seconds and falls back to local storage and structured seed datasets with zero UI interruption.
2. **Backend Database Resilience**: If MongoDB is not running locally, the Express API starts normally, reports `database: disconnected` on `/api/health`, and serves all requests via `fallbackStore` with full query filtering, sorting, and in-memory persistence.
3. **Zero Visual Regression**: The frontend visual identity, color scheme, typography, responsive layouts, routes, and interactions remain completely preserved.

---

## 🧪 Linting & Quality Verification

```bash
# Run ultra-fast Oxlint across all frontend and backend source files
npm run lint
# Verified: 0 warnings and 0 errors across 103 files

# Validate production build bundle
npm run build
# Verified: Build succeeds cleanly with code 0
```

