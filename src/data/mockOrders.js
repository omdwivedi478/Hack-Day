export const initialOrders = [
  {
    id: 'FD-10294',
    orderDate: '2025-05-12T10:30:00Z',
    status: 'Processing', // 'Pending', 'Processing', 'In Transit', 'Delivered', 'Cancelled'
    buyerName: 'Rohan Deshmukh',
    deliveryAddress: 'Flat 402, Green Meadows Residency, Shivaji Nagar, Pune, Maharashtra 411005',
    paymentMethod: 'UPI (GPay - rohan@okaxis)',
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
    logisticsFee: 180,
    platformFee: 60,
    discount: 120,
    total: 3060,
    farmerEarnings: 2540,
    traditionalMarketCost: 3750,
    savingsVsTraditional: 690,
    timeline: [
      { step: 'Order Confirmed', time: '12 May 2025, 10:30 AM', completed: true, current: false, description: 'Order verified & payment confirmed via UPI' },
      { step: 'Farmer Preparing', time: '12 May 2025, 01:15 PM', completed: true, current: true, description: 'Rajesh Patel & Vikramaditya are grading and crating fresh produce' },
      { step: 'Picked Up', time: 'Est. 13 May, 07:00 AM', completed: false, current: false, description: 'FarmDirect refrigerated logistics van will collect crates' },
      { step: 'Out for Delivery', time: 'Est. 13 May, 02:00 PM', completed: false, current: false, description: 'Last-mile dispatch to your address' },
      { step: 'Delivered', time: 'Est. 13 May, 05:30 PM', completed: false, current: false, description: 'Crates delivered with zero-damage guarantee' }
    ]
  },
  {
    id: 'FD-10288',
    orderDate: '2025-05-11T14:15:00Z',
    status: 'In Transit',
    buyerName: 'Rohan Deshmukh',
    deliveryAddress: 'Flat 402, Green Meadows Residency, Shivaji Nagar, Pune, Maharashtra 411005',
    paymentMethod: 'HDFC Credit Card (Ending in 9042)',
    items: [
      {
        productId: 'prod-4',
        name: 'Shimla Royal Apple',
        image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&auto=format&fit=crop&q=80',
        farmerName: 'Balwinder Singh',
        quantity: 20,
        unit: 'kg',
        unitPrice: 130,
        total: 2600
      }
    ],
    subtotal: 2600,
    logisticsFee: 140,
    platformFee: 50,
    discount: 0,
    total: 2790,
    farmerEarnings: 2100,
    traditionalMarketCost: 3450,
    savingsVsTraditional: 660,
    timeline: [
      { step: 'Order Confirmed', time: '11 May 2025, 02:15 PM', completed: true, current: false, description: 'Payment verified' },
      { step: 'Farmer Preparing', time: '11 May 2025, 04:30 PM', completed: true, current: false, description: 'Apples cold-sorted and packed in protective foam sleeves' },
      { step: 'Picked Up', time: '12 May 2025, 08:45 AM', completed: true, current: false, description: 'Cold chain transit vehicle departed orchard' },
      { step: 'Out for Delivery', time: '13 May 2025, 09:30 AM', completed: true, current: true, description: 'Dispatched from Pune West distribution center' },
      { step: 'Delivered', time: 'Est. 13 May, 01:00 PM', completed: false, current: false, description: 'Awaiting customer handover' }
    ]
  },
  {
    id: 'FD-10271',
    orderDate: '2025-05-08T09:00:00Z',
    status: 'Delivered',
    buyerName: 'Rohan Deshmukh',
    deliveryAddress: 'Flat 402, Green Meadows Residency, Shivaji Nagar, Pune, Maharashtra 411005',
    paymentMethod: 'UPI (Paytm - 9823011223@paytm)',
    items: [
      {
        productId: 'prod-5',
        name: 'Nashik Red Onion',
        image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=200&auto=format&fit=crop&q=80',
        farmerName: 'Ramesh Patil',
        quantity: 50,
        unit: 'kg',
        unitPrice: 28,
        total: 1400
      },
      {
        productId: 'prod-3',
        name: 'Green Peas (Matar)',
        image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=200&auto=format&fit=crop&q=80',
        farmerName: 'Sunita Devi',
        quantity: 10,
        unit: 'kg',
        unitPrice: 62,
        total: 620
      }
    ],
    subtotal: 2020,
    logisticsFee: 120,
    platformFee: 40,
    discount: 50,
    total: 2130,
    farmerEarnings: 1600,
    traditionalMarketCost: 2680,
    savingsVsTraditional: 550,
    timeline: [
      { step: 'Order Confirmed', time: '08 May 2025, 09:00 AM', completed: true, current: false, description: 'Order confirmed' },
      { step: 'Farmer Preparing', time: '08 May 2025, 11:30 AM', completed: true, current: false, description: 'Crates packed' },
      { step: 'Picked Up', time: '08 May 2025, 03:20 PM', completed: true, current: false, description: 'Transit underway' },
      { step: 'Out for Delivery', time: '09 May 2025, 08:30 AM', completed: true, current: false, description: 'On delivery route' },
      { step: 'Delivered', time: '09 May 2025, 11:15 AM', completed: true, current: true, description: 'Delivered to gate security' }
    ]
  },
  {
    id: 'FD-10255',
    orderDate: '2025-05-05T16:20:00Z',
    status: 'Delivered',
    buyerName: 'Rohan Deshmukh',
    deliveryAddress: 'Flat 402, Green Meadows Residency, Shivaji Nagar, Pune, Maharashtra 411005',
    paymentMethod: 'UPI',
    items: [
      {
        productId: 'prod-15',
        name: 'Sehore Sharbati Wheat',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&auto=format&fit=crop&q=80',
        farmerName: 'Rajesh Patel',
        quantity: 50,
        unit: 'kg',
        unitPrice: 36,
        total: 1800
      }
    ],
    subtotal: 1800,
    logisticsFee: 100,
    platformFee: 40,
    discount: 0,
    total: 1940,
    farmerEarnings: 1400,
    traditionalMarketCost: 2400,
    savingsVsTraditional: 460,
    timeline: [
      { step: 'Order Confirmed', time: '05 May 2025, 04:20 PM', completed: true, current: false, description: 'Confirmed' },
      { step: 'Farmer Preparing', time: '05 May 2025, 05:40 PM', completed: true, current: false, description: 'Bagged & weighed' },
      { step: 'Picked Up', time: '06 May 2025, 09:10 AM', completed: true, current: false, description: 'In transit' },
      { step: 'Out for Delivery', time: '06 May 2025, 02:30 PM', completed: true, current: false, description: 'Out with delivery agent' },
      { step: 'Delivered', time: '06 May 2025, 05:10 PM', completed: true, current: true, description: 'Delivered and acknowledged' }
    ]
  },
  {
    id: 'FD-10240',
    orderDate: '2025-05-02T11:00:00Z',
    status: 'Delivered',
    buyerName: 'Rohan Deshmukh',
    deliveryAddress: 'Flat 402, Green Meadows Residency, Shivaji Nagar, Pune, Maharashtra 411005',
    paymentMethod: 'Cash on Delivery',
    items: [
      {
        productId: 'prod-16',
        name: 'Ratnagiri Alphonso Mango',
        image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=200&auto=format&fit=crop&q=80',
        farmerName: 'Anand Vernekar',
        quantity: 2,
        unit: 'dozen',
        unitPrice: 680,
        total: 1360
      }
    ],
    subtotal: 1360,
    logisticsFee: 80,
    platformFee: 30,
    discount: 0,
    total: 1470,
    farmerEarnings: 1080,
    traditionalMarketCost: 1900,
    savingsVsTraditional: 430,
    timeline: [
      { step: 'Order Confirmed', time: '02 May 2025, 11:00 AM', completed: true, current: false, description: 'Order Placed' },
      { step: 'Farmer Preparing', time: '02 May 2025, 01:20 PM', completed: true, current: false, description: 'Harvested from orchard' },
      { step: 'Picked Up', time: '02 May 2025, 06:40 PM', completed: true, current: false, description: 'Konkan logistics van' },
      { step: 'Out for Delivery', time: '03 May 2025, 10:00 AM', completed: true, current: false, description: 'Out for delivery' },
      { step: 'Delivered', time: '03 May 2025, 12:45 PM', completed: true, current: true, description: 'Cash collected & delivered' }
    ]
  },
  {
    id: 'FD-10222',
    orderDate: '2025-04-28T18:40:00Z',
    status: 'Pending',
    buyerName: 'Rohan Deshmukh',
    deliveryAddress: 'Flat 402, Green Meadows Residency, Shivaji Nagar, Pune, Maharashtra 411005',
    paymentMethod: 'Net Banking (SBI)',
    items: [
      {
        productId: 'prod-14',
        name: '1121 Traditional Basmati Rice',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&auto=format&fit=crop&q=80',
        farmerName: 'Harpreet Kaur',
        quantity: 50,
        unit: 'kg',
        unitPrice: 88,
        total: 4400
      }
    ],
    subtotal: 4400,
    logisticsFee: 200,
    platformFee: 80,
    discount: 150,
    total: 4530,
    farmerEarnings: 3600,
    traditionalMarketCost: 6000,
    savingsVsTraditional: 1470,
    timeline: [
      { step: 'Order Confirmed', time: '28 Apr 2025, 06:40 PM', completed: true, current: true, description: 'Awaiting farmer dispatch queue slot' },
      { step: 'Farmer Preparing', time: 'Pending', completed: false, current: false, description: 'Paddy milling & packing' },
      { step: 'Picked Up', time: 'Pending', completed: false, current: false, description: 'Long haul dispatch' },
      { step: 'Out for Delivery', time: 'Pending', completed: false, current: false, description: 'Local delivery hub' },
      { step: 'Delivered', time: 'Pending', completed: false, current: false, description: 'Arrival' }
    ]
  }
];
