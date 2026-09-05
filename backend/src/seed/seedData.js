import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Models
import { User } from '../models/User.js';
import { Farmer } from '../models/Farmer.js';
import { Product } from '../models/Product.js';
import { Order } from '../models/Order.js';
import { MarketPrice } from '../models/MarketPrice.js';
import { CommunityOrder } from '../models/CommunityOrder.js';

// Setup dirname & env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Seed Datasets
const seedUsers = [
  {
    name: 'Priya Sharma',
    email: 'buyer@farmdirect.io',
    password: 'Password123!',
    role: 'buyer',
    phone: '+91 98765 43210',
    address: 'Flat 402, Green Meadows Residency, Shivaji Nagar, Pune, Maharashtra 411005'
  },
  {
    name: 'Rajesh Patel',
    email: 'farmer@farmdirect.io',
    password: 'Password123!',
    role: 'farmer',
    phone: '+91 98260 12489',
    address: 'Village Berasia, Bhopal District, Madhya Pradesh'
  },
  {
    name: 'Admin Operations',
    email: 'admin@farmdirect.io',
    password: 'Password123!',
    role: 'admin',
    phone: '+91 99999 88888',
    address: 'FarmDirect HQ, Sector 5, Bhopal'
  }
];

const seedFarmers = [
  {
    id: 'farmer-1',
    name: 'Rajesh Patel',
    farmerName: 'Rajesh Patel',
    farmName: 'Rajesh Organic Farms',
    location: 'Bhopal, Madhya Pradesh',
    state: 'Madhya Pradesh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80',
    experienceYears: 15,
    rating: 4.8,
    reviewsCount: 142,
    acres: 12,
    ordersCount: 128,
    distanceKm: 8.4,
    verified: true,
    certifications: ['India Organic (NPOP)', 'Jaivik Bharat', 'PGS-India Green'],
    specialtyCrops: ['Cherry Tomatoes', 'Red Onions', 'Sehore Sharbati Wheat', 'Papaya'],
    bio: 'Pioneering organic soil stewardship in the Bhopal countryside for over 15 years. We harness solar irrigation, vermicomposting, and multi-cropping.',
    phone: '+91 98260 12489',
    establishedYear: 2009,
    bankSettlement: 'State Bank of India (Ending in 4092)'
  },
  {
    id: 'farmer-2',
    name: 'Balwinder Singh',
    farmerName: 'Balwinder Singh',
    farmName: 'Singh Heritage Agri',
    location: 'Ludhiana, Punjab',
    state: 'Punjab',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&auto=format&fit=crop&q=80',
    experienceYears: 22,
    rating: 4.9,
    reviewsCount: 218,
    acres: 35,
    ordersCount: 245,
    distanceKm: 18.2,
    verified: true,
    certifications: ['GlobalGAP Compliant', 'Punjab Agri Certified'],
    specialtyCrops: ['Shimla Royal Apples', 'Moong Dal', 'Basmati Rice'],
    bio: 'Fourth-generation farming family combining heritage agro-ecological wisdom with precision laser land leveling and drip systems.',
    phone: '+91 98140 55198',
    establishedYear: 2002,
    bankSettlement: 'Punjab National Bank (Ending in 7731)'
  },
  {
    id: 'farmer-3',
    name: 'Ramesh Patil',
    farmerName: 'Ramesh Patil',
    farmName: 'Sahyadri Agro',
    location: 'Nashik, Maharashtra',
    state: 'Maharashtra',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23153?w=1200&auto=format&fit=crop&q=80',
    experienceYears: 12,
    rating: 4.7,
    reviewsCount: 310,
    acres: 18,
    ordersCount: 340,
    distanceKm: 14.5,
    verified: true,
    certifications: ['Maharashtra Jaivik प्रमाणीकरण', 'Water Stewardship Certified'],
    specialtyCrops: ['Nashik Red Onion', 'Thompson Seedless Grapes', 'Pomegranate'],
    bio: 'Nestled in the lush valleys of Nashik, we utilize bio-fermented mulches and drip nutrition to raise premium onions and table grapes.',
    phone: '+91 94222 38901',
    establishedYear: 2012,
    bankSettlement: 'Bank of Baroda (Ending in 1184)'
  },
  {
    id: 'farmer-4',
    name: 'Ananya Roy',
    farmerName: 'Ananya Roy',
    farmName: 'Brahmaputra Organics',
    location: 'Jorhat, Assam',
    state: 'Assam',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1544965838-54ef8406f868?w=1200&auto=format&fit=crop&q=80',
    experienceYears: 8,
    rating: 4.9,
    reviewsCount: 94,
    acres: 9,
    ordersCount: 88,
    distanceKm: 28.0,
    verified: true,
    certifications: ['India Organic (NPOP)', 'Rainforest Alliance'],
    specialtyCrops: ['Assam CTC Premium Tea', 'Bhut Jolokia Peppers', 'Wildflower Honey'],
    bio: 'High-altitude organic tea gardens and rare medicinal herbs tended with biodynamic bio-preparations.',
    phone: '+91 94350 88210',
    establishedYear: 2016,
    bankSettlement: 'HDFC Bank (Ending in 5490)'
  },
  {
    id: 'farmer-5',
    name: 'Suresh Kumar',
    farmerName: 'Suresh Kumar',
    farmName: 'Cauvery Bio Farms',
    location: 'Coimbatore, Tamil Nadu',
    state: 'Tamil Nadu',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=1200&auto=format&fit=crop&q=80',
    experienceYears: 18,
    rating: 4.8,
    reviewsCount: 165,
    acres: 22,
    ordersCount: 195,
    distanceKm: 22.1,
    verified: true,
    certifications: ['Tamil Nadu Organic Certification Department (TNOCD)'],
    specialtyCrops: ['Robusta Raw Coffee', 'Coimbatore Bananas', 'Cold-Pressed Coconut Oil'],
    bio: 'Permaculture agroforest canopy located along the fertile Cauvery basin.',
    phone: '+91 94430 76112',
    establishedYear: 2006,
    bankSettlement: 'Canara Bank (Ending in 9302)'
  },
  {
    id: 'farmer-6',
    name: 'Vikramaditya Rathore',
    farmerName: 'Vikramaditya Rathore',
    farmName: 'Malwa Crops',
    location: 'Indore, Madhya Pradesh',
    state: 'Madhya Pradesh',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80',
    experienceYears: 14,
    rating: 4.7,
    reviewsCount: 182,
    acres: 28,
    ordersCount: 210,
    distanceKm: 12.0,
    verified: true,
    certifications: ['PGS-India Green'],
    specialtyCrops: ['Jyoti Potatoes', 'Green Peas', 'Soybean'],
    bio: 'High dry-matter Jyoti potatoes and legume rotations directly from the rich Malwa soil plateaus.',
    phone: '+91 98270 34912',
    establishedYear: 2010,
    bankSettlement: 'Union Bank of India (Ending in 6621)'
  }
];

const seedProducts = [
  {
    id: 'prod-1',
    name: 'Fresh Tomato',
    category: 'Vegetables',
    variety: 'Cherry & Hybrid Tomato',
    grade: 'Grade A',
    shelfLife: '6 - 8 Days',
    minOrderQty: '5 kg',
    availableQty: 1200,
    unit: 'kg',
    price: 38,
    marketPrice: 45,
    farmerPrice: 30,
    logisticsFee: 4,
    platformFee: 4,
    rating: 4.8,
    reviewsCount: 142,
    isOrganic: true,
    isPopular: true,
    isLocal: true,
    location: 'Bhopal, Madhya Pradesh',
    state: 'Madhya Pradesh',
    farmerId: 'farmer-1',
    farmerName: 'Rajesh Patel',
    farmName: 'Rajesh Organic Farms',
    farmerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
    description: 'Farm-fresh, naturally ripened vibrant red tomatoes harvested at peak sweetness. Zero chemical pesticide residue.',
    traditionalSupplyChain: [
      { role: 'Farmer', price: 18, label: 'Farmer baseline' },
      { role: 'Trader', price: 24, label: 'Mandi aggregator fee' },
      { role: 'Wholesaler', price: 30, label: 'Regional mandi markup' },
      { role: 'Retailer', price: 40, label: 'Local store markup' },
      { role: 'Consumer', price: 45, label: 'Final consumer shelf price' }
    ]
  },
  {
    id: 'prod-2',
    name: 'Potato (Jyoti)',
    category: 'Vegetables',
    variety: 'Kufri Jyoti',
    grade: 'Grade 1 (Medium - Large)',
    shelfLife: '3 - 4 Weeks',
    minOrderQty: '10 kg',
    availableQty: 4500,
    unit: 'kg',
    price: 26,
    marketPrice: 34,
    farmerPrice: 20,
    logisticsFee: 3,
    platformFee: 3,
    rating: 4.7,
    reviewsCount: 98,
    isOrganic: false,
    isPopular: true,
    isLocal: true,
    location: 'Indore, Madhya Pradesh',
    state: 'Madhya Pradesh',
    farmerId: 'farmer-6',
    farmerName: 'Vikramaditya Rathore',
    farmName: 'Malwa Crops',
    farmerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
    description: 'High dry-matter Jyoti potatoes directly from the rich Malwa soil. Firm texture, low sugar content.',
    traditionalSupplyChain: [
      { role: 'Farmer', price: 12, label: 'Farm gate' },
      { role: 'Trader', price: 17, label: 'Cold store intermediary' },
      { role: 'Wholesaler', price: 23, label: 'APMC Wholesaler' },
      { role: 'Retailer', price: 29, label: 'Retail distributor' },
      { role: 'Consumer', price: 34, label: 'Market price' }
    ]
  },
  {
    id: 'prod-3',
    name: 'Green Peas (Matar)',
    category: 'Vegetables',
    variety: 'GS-10 Sweet Pods',
    grade: 'Export Grade',
    shelfLife: '5 - 7 Days',
    minOrderQty: '5 kg',
    availableQty: 850,
    unit: 'kg',
    price: 68,
    marketPrice: 85,
    farmerPrice: 56,
    logisticsFee: 6,
    platformFee: 6,
    rating: 4.9,
    reviewsCount: 76,
    isOrganic: true,
    isPopular: false,
    isLocal: true,
    location: 'Indore, Madhya Pradesh',
    state: 'Madhya Pradesh',
    farmerId: 'farmer-6',
    farmerName: 'Vikramaditya Rathore',
    farmName: 'Malwa Crops',
    farmerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=600&auto=format&fit=crop&q=80',
    description: 'Sweet, crisp garden peas picked at dawn and kept in cool chain crating.',
    traditionalSupplyChain: [
      { role: 'Farmer', price: 36, label: 'Farm gate' },
      { role: 'Trader', price: 48, label: 'Commission agent' },
      { role: 'Wholesaler', price: 62, label: 'City mandi wholesaler' },
      { role: 'Retailer', price: 74, label: 'Greengrocer markup' },
      { role: 'Consumer', price: 85, label: 'Supermarket price' }
    ]
  },
  {
    id: 'prod-4',
    name: 'Shimla Royal Apple',
    category: 'Fruits',
    variety: 'Royal Delicious Red',
    grade: 'A+ Extra Fancy',
    shelfLife: '3 - 4 Weeks',
    minOrderQty: '5 kg (Crate)',
    availableQty: 1800,
    unit: 'kg',
    price: 145,
    marketPrice: 195,
    farmerPrice: 120,
    logisticsFee: 15,
    platformFee: 10,
    rating: 4.9,
    reviewsCount: 218,
    isOrganic: true,
    isPopular: true,
    isLocal: false,
    location: 'Ludhiana, Punjab',
    state: 'Punjab',
    farmerId: 'farmer-2',
    farmerName: 'Balwinder Singh',
    farmName: 'Singh Heritage Agri',
    farmerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80',
    description: 'Crisp, aromatic high-altitude Royal Delicious apples with natural wax and intense mountain sweetness.',
    traditionalSupplyChain: [
      { role: 'Farmer', price: 65, label: 'Orchard rate' },
      { role: 'Trader', price: 95, label: 'CA cold store agent' },
      { role: 'Wholesaler', price: 130, label: 'Azadpur mandi wholesaler' },
      { role: 'Retailer', price: 170, label: 'Metro retailer' },
      { role: 'Consumer', price: 195, label: 'Retail price' }
    ]
  },
  {
    id: 'prod-5',
    name: 'Nashik Red Onion',
    category: 'Vegetables',
    variety: 'Garwa Dark Red',
    grade: 'Grade A (55mm+)',
    shelfLife: '6 - 8 Weeks',
    minOrderQty: '10 kg',
    availableQty: 6000,
    unit: 'kg',
    price: 28,
    marketPrice: 38,
    farmerPrice: 21,
    logisticsFee: 3.5,
    platformFee: 3.5,
    rating: 4.7,
    reviewsCount: 310,
    isOrganic: false,
    isPopular: true,
    isLocal: true,
    location: 'Nashik, Maharashtra',
    state: 'Maharashtra',
    farmerId: 'farmer-3',
    farmerName: 'Ramesh Patil',
    farmName: 'Sahyadri Agro',
    farmerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80',
    description: 'Renowned Nashik dark red onions known for pungency, thick protective skin, and long storability.',
    traditionalSupplyChain: [
      { role: 'Farmer', price: 12, label: 'Lasalgaon Mandi base' },
      { role: 'Trader', price: 18, label: 'Bidding middleman' },
      { role: 'Wholesaler', price: 26, label: 'Secondary mandi wholesaler' },
      { role: 'Retailer', price: 33, label: 'Kirana markup' },
      { role: 'Consumer', price: 38, label: 'Consumer purchase price' }
    ]
  }
];

const seedMarketPrices = [
  {
    id: 'mp-1',
    commodity: 'Tomato (Hybrid)',
    location: 'Bhopal Mandi (Karond)',
    mandiLocation: 'Karond APMC, MP',
    marketAverage: 45,
    farmDirectPrice: 38,
    differencePercent: 18.4,
    unit: 'kg',
    trend: 'down',
    recommendedRange: '₹36 - ₹40 / kg',
    aiAdvisory: 'Mandi arrivals increased by 14% this morning. Direct farm-gate orders protect ₹8/kg surplus.',
    history: [
      { day: 'Mon', farmDirect: 39, mandi: 48 },
      { day: 'Tue', farmDirect: 38, mandi: 47 },
      { day: 'Wed', farmDirect: 38, mandi: 46 },
      { day: 'Thu', farmDirect: 37, mandi: 45 },
      { day: 'Fri', farmDirect: 38, mandi: 45 }
    ]
  },
  {
    id: 'mp-2',
    commodity: 'Potato (Jyoti)',
    location: 'Indore Mandi (Choithram)',
    mandiLocation: 'Choithram APMC, Indore',
    marketAverage: 34,
    farmDirectPrice: 26,
    differencePercent: 23.5,
    unit: 'kg',
    trend: 'stable',
    recommendedRange: '₹24 - ₹28 / kg',
    aiAdvisory: 'Cold storage release steady. FarmDirect bulk crates save ₹8 per kg vs city supermarkets.',
    history: [
      { day: 'Mon', farmDirect: 26, mandi: 34 },
      { day: 'Tue', farmDirect: 26, mandi: 35 },
      { day: 'Wed', farmDirect: 26, mandi: 34 },
      { day: 'Thu', farmDirect: 25, mandi: 33 },
      { day: 'Fri', farmDirect: 26, mandi: 34 }
    ]
  },
  {
    id: 'mp-3',
    commodity: 'Red Onion (Nashik)',
    location: 'Lasalgaon APMC',
    mandiLocation: 'Lasalgaon Mandi, Nashik',
    marketAverage: 38,
    farmDirectPrice: 28,
    differencePercent: 26.3,
    unit: 'kg',
    trend: 'up',
    recommendedRange: '₹27 - ₹31 / kg',
    aiAdvisory: 'Heavy wholesale speculation at Lasalgaon. Direct booking locks guaranteed fair compensation.',
    history: [
      { day: 'Mon', farmDirect: 27, mandi: 35 },
      { day: 'Tue', farmDirect: 28, mandi: 36 },
      { day: 'Wed', farmDirect: 28, mandi: 38 },
      { day: 'Thu', farmDirect: 28, mandi: 39 },
      { day: 'Fri', farmDirect: 28, mandi: 38 }
    ]
  }
];

const seedCommunityPools = [
  {
    id: 'pool-1',
    productId: 'prod-1',
    productName: 'Fresh Tomato',
    variety: 'Hybrid Salad Tomato',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80',
    farmerName: 'Rajesh Patel',
    farmLocation: 'Bhopal, MP',
    currentDemandKg: 87,
    targetKg: 100,
    unit: 'kg',
    currentPrice: 38,
    unlockedPrice: 34,
    superPrice: 31,
    superTargetKg: 250,
    participantsCount: 14,
    endsInHours: 8,
    deliveryDate: 'Tomorrow, 5:00 PM',
    hubLocation: 'Shivaji Nagar Community Hub, Pune',
    status: 'Active'
  },
  {
    id: 'pool-2',
    productId: 'prod-5',
    productName: 'Nashik Red Onion',
    variety: 'Garwa Dark Red',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop&q=80',
    farmerName: 'Ramesh Patil',
    farmLocation: 'Nashik, Maharashtra',
    currentDemandKg: 165,
    targetKg: 200,
    unit: 'kg',
    currentPrice: 28,
    unlockedPrice: 23,
    superPrice: 20,
    superTargetKg: 500,
    participantsCount: 22,
    endsInHours: 14,
    deliveryDate: '15 May, 10:00 AM',
    hubLocation: 'Kothrud Societies Center, Pune',
    status: 'Active'
  }
];

const seedOrders = [
  {
    id: 'FD-10294',
    orderNumber: 'FD-10294',
    orderDate: new Date('2025-05-12T10:30:00Z'),
    status: 'Processing',
    buyerId: 'buyer-demo',
    buyerName: 'Rohan Deshmukh',
    deliveryAddress: 'Flat 402, Green Meadows Residency, Shivaji Nagar, Pune, Maharashtra 411005',
    paymentMethod: 'UPI (GPay)',
    paymentStatus: 'Escrow Held',
    items: [
      {
        productId: 'prod-1',
        name: 'Fresh Tomato',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&auto=format&fit=crop&q=80',
        farmerName: 'Rajesh Patel',
        quantity: 50,
        unit: 'kg',
        unitPrice: 38,
        total: 1900
      },
      {
        productId: 'prod-2',
        name: 'Potato (Jyoti)',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&auto=format&fit=crop&q=80',
        farmerName: 'Vikramaditya Rathore',
        quantity: 40,
        unit: 'kg',
        unitPrice: 26,
        total: 1040
      }
    ],
    subtotal: 2940,
    deliveryFee: 180,
    platformFee: 60,
    totalAmount: 3060,
    total: 3060,
    farmerEarnings: 2540,
    timeline: [
      { step: 'Order Confirmed', time: '12 May 2025, 10:30 AM', completed: true, current: false, description: 'Order verified & payment confirmed via UPI' },
      { step: 'Farmer Preparing', time: '12 May 2025, 01:15 PM', completed: true, current: true, description: 'Grading and crating fresh produce' },
      { step: 'Picked Up', time: 'Est. 13 May, 07:00 AM', completed: false, current: false, description: 'Refrigerated logistics van will collect crates' },
      { step: 'Out for Delivery', time: 'Est. 13 May, 02:00 PM', completed: false, current: false, description: 'Last-mile dispatch to your address' },
      { step: 'Delivered', time: 'Est. 13 May, 05:30 PM', completed: false, current: false, description: 'Handover complete' }
    ]
  }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/farmdirect';
    console.log(`[Seed] Connecting to MongoDB at ${mongoUri}...`);
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 6000 });
    console.log('[Seed] MongoDB Connected successfully.');

    // Clear existing collections
    console.log('[Seed] Clearing old collections...');
    await User.deleteMany({});
    await Farmer.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await MarketPrice.deleteMany({});
    await CommunityOrder.deleteMany({});

    // Seed Users
    console.log('[Seed] Seeding Users...');
    for (const u of seedUsers) {
      await User.create(u);
    }
    console.log(`[Seed] ${seedUsers.length} Users seeded.`);

    // Seed Farmers
    console.log('[Seed] Seeding Farmers...');
    await Farmer.insertMany(seedFarmers);
    console.log(`[Seed] ${seedFarmers.length} Farmers seeded.`);

    // Seed Products
    console.log('[Seed] Seeding Products...');
    await Product.insertMany(seedProducts);
    console.log(`[Seed] ${seedProducts.length} Products seeded.`);

    // Seed Market Prices
    console.log('[Seed] Seeding Market Prices...');
    await MarketPrice.insertMany(seedMarketPrices);
    console.log(`[Seed] ${seedMarketPrices.length} Market Price benchmarks seeded.`);

    // Seed Community Pools
    console.log('[Seed] Seeding Community Buying Pools...');
    await CommunityOrder.insertMany(seedCommunityPools);
    console.log(`[Seed] ${seedCommunityPools.length} Community Buying Pools seeded.`);

    // Seed Orders
    console.log('[Seed] Seeding Orders...');
    await Order.insertMany(seedOrders);
    console.log(`[Seed] ${seedOrders.length} Orders seeded.`);

    console.log('[Seed] DATABASE SEEDING COMPLETED SUCCESSFULLY! 🌱');
    process.exit(0);
  } catch (error) {
    console.warn(`[Seed Warning] Could not connect to local MongoDB (${error.message}).`);
    console.warn('[Seed Warning] If MongoDB is not running locally, the backend & frontend resilient mock layer will serve data seamlessly.');
    process.exit(0);
  }
};

seedDatabase();
