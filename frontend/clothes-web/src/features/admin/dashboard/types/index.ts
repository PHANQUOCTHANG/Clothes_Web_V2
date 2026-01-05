// ============================================
// Dashboard Types & Interfaces
// ============================================

export interface StatsCard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  link: string;
  icon: string;
  color: string;
}

export interface RevenueData {
  month: string;
  orders: number;
  earnings: number;
  refunds: number;
}

export interface RecentActivityItem {
  type: "purchase" | "collection" | "like";
  title: string;
  description: string;
  time: string;
  icon?: string;
  images?: string[];
  color: string;
}

export interface TopCategory {
  name: string;
  count: string;
}

export interface SalesLocation {
  country: string;
  percentage: number;
  color: string;
}

export interface DashboardData {
  revenueData: RevenueData[];
  statsCards: StatsCard[];
  recentActivities: RecentActivityItem[];
  topCategories: TopCategory[];
  salesByLocation: SalesLocation[];
}
