"use client";

import { useDashboard } from "@/features/admin/dashboard/hooks";
import {
  WelcomeSection,
  StatsCards,
  RevenueChart,
  SalesByLocation,
  RecentActivity,
  TopCategories,
} from "@/features/admin/dashboard/components";

const Dashboard = () => {
  const {
    statsCards,
    revenueData,
    salesByLocation,
    recentActivities,
    topCategories,
  } = useDashboard();

  return (
    <>
      <WelcomeSection />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mt-4 md:mt-6">
        {/* Left Column - Stats & Charts */}
        <div className="col-span-1 lg:col-span-8 xl:col-span-9 space-y-4 md:space-y-6">
          <StatsCards cards={statsCards} />
          <RevenueChart data={revenueData} />
          <SalesByLocation locations={salesByLocation} />
        </div>

        {/* Right Column - Activity & Categories */}
        <div className="col-span-1 lg:col-span-4 xl:col-span-3 space-y-4 md:space-y-6">
          <RecentActivity activities={recentActivities} />
          <TopCategories categories={topCategories} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
