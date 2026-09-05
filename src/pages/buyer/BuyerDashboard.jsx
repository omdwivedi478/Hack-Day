import React from 'react';
import {
  Package,
  ShoppingCart,
  Clock,
  Truck,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { StatCard } from '../../components/dashboard/StatCard';
import { OrderStatusDonut } from '../../components/dashboard/OrderStatusDonut';
import { ExpenditureAreaChart } from '../../components/dashboard/ExpenditureAreaChart';
import { DeliveryStatusBarChart } from '../../components/dashboard/DeliveryStatusBarChart';
import { RecentOrdersList } from '../../components/dashboard/RecentOrdersList';

export const BuyerDashboard = () => {
  const { user } = useAuth();
  const { orders } = useMarketplace();

  return (
    <div className="space-y-6">
      {/* Dashboard Greeting Header matching reference */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Welcome, {user.name}</span>
            <span className="text-xl">👋</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            <span className="text-slate-400">Overview</span>
            <span className="mx-1.5 text-slate-300 dark:text-slate-600">&gt;</span>
            <span className="font-semibold text-primary">Dashboard</span>
          </p>
        </div>

        {/* Quick link to marketplace */}
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-primary text-white hover:bg-primary-dark transition-colors shadow-2xs self-start sm:self-auto"
        >
          <span>Order Fresh Commodities</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 4 KPI Cards matching reference */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Orders"
          value="10,546"
          icon={Package}
          change="+1.8%"
          period="Up from past week"
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50 dark:bg-emerald-950/60"
        />
        <StatCard
          title="Orders Received"
          value="5,000"
          icon={ShoppingCart}
          change="+1.8%"
          period="Up from past week"
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50 dark:bg-emerald-950/60"
        />
        <StatCard
          title="Pending Orders"
          value="5,546"
          icon={Clock}
          change="+1.8%"
          period="Up from past week"
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50 dark:bg-emerald-950/60"
        />
        <StatCard
          title="Orders In Transit"
          value="3,000"
          icon={Truck}
          change="+1.8%"
          period="Up from past week"
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50 dark:bg-emerald-950/60"
        />
      </div>

      {/* Middle Row: Order Status Donut & Expenditure Area Chart matching reference */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5">
          <OrderStatusDonut />
        </div>
        <div className="lg:col-span-7">
          <ExpenditureAreaChart />
        </div>
      </div>

      {/* Bottom Row: Delivery Status Bar Chart & Recent Orders List matching reference */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <DeliveryStatusBarChart />
        </div>
        <div className="lg:col-span-5">
          <RecentOrdersList orders={orders} />
        </div>
      </div>
    </div>
  );
};
