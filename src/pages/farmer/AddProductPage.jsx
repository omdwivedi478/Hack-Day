import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';

export const AddProductPage = () => {
  const navigate = useNavigate();
  const { addProduct } = useMarketplace();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Vegetables',
    variety: '',
    grade: 'Grade 1',
    shelfLife: '5 - 7 Days',
    minOrderQty: '5 kg',
    availableQty: 500,
    unit: 'kg',
    price: 35,
    location: user.location || 'Bhopal, Madhya Pradesh',
    state: user.state || 'Madhya Pradesh',
    description: '',
    isOrganic: true,
    isPopular: false,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'
  });

  const categories = ['Vegetables', 'Fruits', 'Grains', 'Spices', 'Dairy'];
  const units = ['kg', 'quintal', 'dozen', 'box'];

  const sampleImages = [
    { label: 'Tomatoes', url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80' },
    { label: 'Potatoes', url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80' },
    { label: 'Green Peas', url: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=600&auto=format&fit=crop&q=80' },
    { label: 'Onions', url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80' },
    { label: 'Turmeric', url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80' },
    { label: 'Wheat/Grains', url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.price || !formData.availableQty) {
      alert('Please complete all required fields.');
      return;
    }

    addProduct({
      ...formData,
      farmerId: user.id || 'farmer-1',
      farmerName: user.name || 'Rajesh Patel',
      farmName: user.farmName || 'Rajesh Organic Farms',
      farmerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    });

    navigate('/farmer/products');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      {/* Back link */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/farmer/products" className="hover:text-primary flex items-center gap-1">
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>My Products</span>
        </Link>
        <span>&gt;</span>
        <span className="font-semibold text-primary">Add New Produce</span>
      </div>

      <div className="pb-3 border-b border-slate-200/80 dark:border-slate-800">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Publish New Harvest Listing
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          List your dawn harvest directly on FarmDirect. Transparent pricing, direct buyer discovery.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Details */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            Produce Identification
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Produce Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Fresh Hybrid Tomatoes"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Variety / Cultivar
              </label>
              <input
                type="text"
                placeholder="e.g. Cherry Tomato / Kufri Jyoti"
                value={formData.variety}
                onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Quality Grade
              </label>
              <input
                type="text"
                placeholder="e.g. Grade A / Export Grade"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Shelf Life
              </label>
              <input
                type="text"
                placeholder="e.g. 6 - 8 Days"
                value={formData.shelfLife}
                onChange={(e) => setFormData({ ...formData, shelfLife: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Farm Location
              </label>
              <input
                type="text"
                placeholder="Bhopal, MP"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            Pricing & Stock Availability
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Consumer Price (₹) *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
              />
              <span className="text-[10px] text-emerald-600 block mt-1">
                You receive ~₹{Math.round(formData.price * 0.79)} net
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Available Harvest Quantity *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.availableQty}
                onChange={(e) => setFormData({ ...formData, availableQty: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Unit of Measurement
              </label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              >
                {units.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Min Order Quantity
              </label>
              <input
                type="text"
                value={formData.minOrderQty}
                onChange={(e) => setFormData({ ...formData, minOrderQty: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div className="sm:col-span-2 flex items-center justify-between p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">
                  Certified Organic
                </span>
                <span className="text-[11px] text-slate-500">
                  Produced without synthetic pesticides or chemical fertilizers
                </span>
              </div>
              <input
                type="checkbox"
                checked={formData.isOrganic}
                onChange={(e) => setFormData({ ...formData, isOrganic: e.target.checked })}
                className="w-4 h-4 accent-primary"
              />
            </div>
          </div>
        </div>

        {/* Photo Selection */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            Produce Photo
          </h2>

          <div className="space-y-3">
            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              Choose Quick Sample Photo or Custom Image URL
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {sampleImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setFormData({ ...formData, image: img.url })}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    formData.image === img.url
                      ? 'border-primary ring-2 ring-primary/30 scale-95'
                      : 'border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <input
              type="url"
              placeholder="Or enter image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Description
            </label>
            <textarea
              rows="3"
              placeholder="Describe ripeness, harvest timing, taste and packaging..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link to="/farmer/products">
            <Button variant="ghost" size="md">
              Cancel
            </Button>
          </Link>
          <Button type="submit" variant="primary" size="lg" className="shadow-md">
            Publish Product
          </Button>
        </div>
      </form>
    </div>
  );
};
