"use client";

import { useState, useCallback } from "react";
import {
  RevenueData,
  StatsCard,
  RecentActivityItem,
  TopCategory,
  SalesLocation,
  DashboardData,
} from "../types";

// ============================================
// Mock Data
// ============================================

const MOCK_REVENUE_DATA: RevenueData[] = [
  { month: "T9", orders: 85, earnings: 75, refunds: 15 },
  { month: "T10", orders: 45, earnings: 55, refunds: 25 },
  { month: "T11", orders: 95, earnings: 62, refunds: 18 },
  { month: "T12", orders: 50, earnings: 48, refunds: 28 },
];

const MOCK_STATS_CARDS: StatsCard[] = [
  {
    title: "TỔNG DOANH THU",
    value: "$559.25k",
    change: "+16.24 %",
    isPositive: true,
    link: "Xem doanh thu ròng",
    icon: "💰",
    color: "bg-green-50",
  },
  {
    title: "ĐƠN HÀNG",
    value: "36,894",
    change: "-3.57 %",
    isPositive: false,
    link: "Xem tất cả đơn hàng",
    icon: "🛍️",
    color: "bg-blue-50",
  },
  {
    title: "KHÁCH HÀNG",
    value: "183.35M",
    change: "+29.08 %",
    isPositive: true,
    link: "Xem chi tiết",
    icon: "👥",
    color: "bg-yellow-50",
  },
  {
    title: "SỐ DƯ CỦA TÔI",
    value: "$165.89k",
    change: "+0.00 %",
    isPositive: true,
    link: "Rút tiền",
    icon: "💳",
    color: "bg-purple-50",
  },
];

const MOCK_RECENT_ACTIVITIES: RecentActivityItem[] = [
  {
    type: "purchase",
    title: "Mua hàng từ James Price",
    description: "Sản phẩm đồng hồ thông minh Noise Evolve",
    time: "02:14 PM Hôm nay",
    icon: "🛒",
    color: "bg-green-100",
  },
  {
    type: "collection",
    title: "Thêm bộ sưu tập phong cách mới",
    description: "Bởi Nesta Technologies",
    time: "9:47 PM Hôm qua",
    images: ["👗", "📷", "🎒"],
    color: "bg-red-100",
  },
  {
    type: "like",
    title: "Natasha Carey đã thích các sản phẩm",
    description: "Cho phép người dùng thích sản phẩm trong cửa hàng của bạn.",
    time: "25 Tháng 12, 2021",
    icon: "❤️",
    color: "bg-blue-100",
  },
];

const MOCK_TOP_CATEGORIES: TopCategory[] = [
  { name: "Điện thoại & Phụ kiện", count: "10,294" },
  { name: "Máy tính để bàn", count: "6,256" },
  { name: "Điện tử", count: "3,479" },
  { name: "Nhà & Nội thất", count: "2,275" },
  { name: "Tạp hóa", count: "1,950" },
  { name: "Thời trang", count: "1,582" },
  { name: "Thiết bị gia dụng", count: "1,037" },
  { name: "Sắc đẹp, Đồ chơi & Hơn nữa", count: "924" },
  { name: "Thực phẩm & Đồ uống", count: "701" },
  { name: "Đồ chơi & Trò chơi", count: "239" },
];

const MOCK_SALES_BY_LOCATION: SalesLocation[] = [
  { country: "Canada", percentage: 75, color: "bg-blue-500" },
  { country: "Greenland", percentage: 47, color: "bg-blue-400" },
  { country: "Nga", percentage: 82, color: "bg-blue-600" },
];

// ============================================
// useDashboard Hook
// ============================================

export const useDashboard = () => {
  const [dashboardData] = useState<DashboardData>({
    revenueData: MOCK_REVENUE_DATA,
    statsCards: MOCK_STATS_CARDS,
    recentActivities: MOCK_RECENT_ACTIVITIES,
    topCategories: MOCK_TOP_CATEGORIES,
    salesByLocation: MOCK_SALES_BY_LOCATION,
  });

  // ============================================
  // Computed State
  // ============================================

  // Tính tổng doanh thu
  const totalRevenue = dashboardData.statsCards[0].value;

  // Tính tổng đơn hàng
  const totalOrders = dashboardData.statsCards[1].value;

  // Tính tổng khách hàng
  const totalCustomers = dashboardData.statsCards[2].value;

  // ============================================
  // Actions
  // ============================================

  const handleViewRevenue = useCallback(() => {
    // Logic to view revenue details
  }, []);

  const handleViewOrders = useCallback(() => {
    // Logic to view all orders
  }, []);

  const handleViewCustomers = useCallback(() => {
    // Logic to view customer details
  }, []);

  const handleWithdraw = useCallback(() => {
    // Logic to withdraw funds
  }, []);

  const handleActivityClick = useCallback((activity: RecentActivityItem) => {
    // Logic to handle activity click
  }, []);

  const handleCategoryClick = useCallback((category: TopCategory) => {
    // Logic to handle category click
  }, []);

  // ============================================
  // Return Hook State & Methods
  // ============================================

  return {
    // Data
    dashboardData,
    revenueData: dashboardData.revenueData,
    statsCards: dashboardData.statsCards,
    recentActivities: dashboardData.recentActivities,
    topCategories: dashboardData.topCategories,
    salesByLocation: dashboardData.salesByLocation,

    // Computed
    totalRevenue,
    totalOrders,
    totalCustomers,

    // Actions
    handleViewRevenue,
    handleViewOrders,
    handleViewCustomers,
    handleWithdraw,
    handleActivityClick,
    handleCategoryClick,
  };
};
