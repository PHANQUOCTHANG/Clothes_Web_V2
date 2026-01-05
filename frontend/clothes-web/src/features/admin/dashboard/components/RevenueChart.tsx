"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RevenueData {
  month: string;
  orders: number;
  earnings: number;
  refunds: number;
}

interface RevenueChartProps {
  data: RevenueData[];
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  const [activeTab, setActiveTab] = useState("1Y");

  const tabs = ["ALL", "1M", "6M", "1Y"];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border mb-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Doanh thu</h3>
        <div className="flex gap-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded transition-colors ${
                activeTab === tab
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div>
          <div className="text-lg sm:text-2xl font-bold text-gray-800">
            7,585
          </div>
          <div className="text-xs sm:text-sm text-gray-500 truncate">
            Đơn hàng
          </div>
        </div>
        <div>
          <div className="text-lg sm:text-2xl font-bold text-gray-800">
            $22.89k
          </div>
          <div className="text-xs sm:text-sm text-gray-500 truncate">
            Doanh thu
          </div>
        </div>
        <div>
          <div className="text-lg sm:text-2xl font-bold text-gray-800">367</div>
          <div className="text-xs sm:text-sm text-gray-500 truncate">
            Hoàn tiền
          </div>
        </div>
        <div>
          <div className="text-lg sm:text-2xl font-bold text-green-600">
            18.92%
          </div>
          <div className="text-xs sm:text-sm text-gray-500 truncate">
            Tỷ lệ chuyển đổi
          </div>
        </div>
      </div>

      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <ResponsiveContainer width="100%" height={250} minWidth={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="orders" fill="#22d3ee" />
            <Bar dataKey="earnings" fill="#3b82f6" />
            <Line
              type="monotone"
              dataKey="refunds"
              stroke="#ef4444"
              strokeDasharray="5 5"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
          <span className="whitespace-nowrap">Đơn hàng</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full flex-shrink-0"></div>
          <span className="whitespace-nowrap">Doanh thu</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
          <span className="whitespace-nowrap">Hoàn tiền</span>
        </div>
      </div>
    </div>
  );
};
