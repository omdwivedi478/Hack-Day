import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout,
  ArrowRight,
  TrendingUp,
  Users
} from 'lucide-react';
import { PriceTransparencyCard } from '../../components/common/PriceTransparencyCard';
import { Button } from '../../components/common/Button';

export const LandingPage = () => {
  const stats = [
    { value: '2,500+', label: 'Verified Farmers' },
    { value: '18,000+', label: 'Tons Produce Sold' },
    { value: '₹4.2 Cr', label: 'Farmer Direct Earnings' },
    { value: '50+', label: 'Cities Connected' },
  ];

  const steps = [
    {
      num: '01',
      title: 'Farmers List Produce',
      desc: 'Growers set transparent farm gate prices and upload harvest availability directly from their fields.'
    },
    {
      num: '02',
      title: 'Buyers Order Directly',
      desc: 'Households, restaurants, and retail collectives purchase dawn-picked produce with zero middlemen.'
    },
    {
      num: '03',
      title: 'Farmers Prepare Orders',
      desc: 'Produce is harvested at peak maturity, sorted, cleaned, and crated with temperature care.'
    },
    {
      num: '04',
      title: 'Fresh Produce Delivered',
      desc: 'FarmDirect cold-chain logistics ensures harvest-to-doorstep delivery within 18 hours.'
    },
  ];

  return (
    <div className="space-y-16 py-4 animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-50/70 via-white to-white dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-14 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 shadow-2xs">
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span>Direct Agricultural Marketplace</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Fresh From Farms.<br />
            <span className="text-primary">Fair For Everyone.</span>
          </h1>

          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Connect directly with farmers, discover fresh produce, and see exactly where your money goes.
            Multiple intermediaries reduce farmers’ earnings and increase consumer prices — we fix that.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link to="/marketplace">
              <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md">
                <span>Shop Fresh Produce</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/farmer/dashboard">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <span>I'm a Farmer</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Statistics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-10 border-t border-slate-200/80 dark:border-slate-800">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <span className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white block">
                {stat.value}
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Signature Price Transparency Section */}
      <section className="space-y-4">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">
            Radical Fairness
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            See Where Your Money Goes
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            In traditional supply chains, 4 to 5 middlemen pocket up to 60% of what you spend.
            FarmDirect bridges the gap so farmers take home more and you pay less.
          </p>
        </div>

        <PriceTransparencyCard
          productName="Fresh Hybrid Tomatoes"
          farmerPrice={30}
          logisticsFee={4}
          platformFee={4}
          consumerPrice={38}
          unit="kg"
          traditionalPrices={{
            farmer: 18,
            trader: 24,
            wholesaler: 30,
            retailer: 40,
            consumer: 45
          }}
        />
      </section>

      {/* How It Works Section */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            How FarmDirect Works
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Four simple steps to farm-fresh produce delivered with complete transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-card transition-all duration-200 relative group"
            >
              <div className="text-3xl font-black text-emerald-600/30 dark:text-emerald-500/20 mb-3 group-hover:text-primary transition-colors">
                {step.num}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Unique Pillars: Community Buying & Price Intelligence */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-emerald-50/80 to-white dark:from-emerald-950/30 dark:to-slate-900 p-6 md:p-8 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-xs">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Community Buying Pools
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              "Buy Together. Save Together." Team up with neighbors to pool wholesale orders.
              Unlock wholesale farm rates while ensuring growers sell out their entire morning harvest in one trip.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-emerald-200/60 dark:border-emerald-800/40">
            <Link to="/community-buying">
              <Button variant="secondary" size="sm">
                <span>Explore Active Pools</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50/80 to-white dark:from-blue-950/30 dark:to-slate-900 p-6 md:p-8 rounded-2xl border border-blue-200 dark:border-blue-800/60 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-xs">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Market Price Intelligence
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Compare live mandi wholesale averages across Pune, Lasalgaon, Agra and Azadpur with FarmDirect guaranteed rates.
              Make data-driven purchases with AI-assisted price forecasts.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-blue-200/60 dark:border-blue-800/40">
            <Link to="/price-intelligence">
              <Button variant="outline" size="sm">
                <span>View Price Intelligence</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white p-8 md:p-12 rounded-3xl text-center shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Ready to Experience Fair Food?
          </h2>
          <p className="text-xs md:text-sm text-emerald-100 max-w-xl mx-auto">
            Join thousands of conscious consumers and verified local farmers building India's most transparent agricultural network.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link to="/marketplace">
              <Button variant="secondary" size="md" className="bg-white text-primary hover:bg-emerald-50">
                Explore Marketplace
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="md" className="border-white text-white hover:bg-white/10">
                Register as Producer
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
