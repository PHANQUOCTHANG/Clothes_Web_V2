"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  link: string;
  icon: string;
  color: string;
}

interface StatsCardsProps {
  cards: StatCard[];
}

export const StatsCards = ({ cards }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {cards.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
        >
          <div className="text-xs text-gray-500 mb-2 truncate">
            {stat.title}
          </div>
          <div className="flex items-center justify-between mb-3 gap-2">
            <div className="text-lg sm:text-2xl font-bold text-gray-800 truncate">
              {stat.value}
            </div>
            <div
              className={`${stat.color} p-2 sm:p-3 rounded-lg text-lg sm:text-2xl flex-shrink-0`}
            >
              {stat.icon}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-1">
            <span
              className={`text-xs ${
                stat.isPositive ? "text-green-600" : "text-red-600"
              } flex items-center gap-1 truncate`}
            >
              {stat.isPositive ? (
                <TrendingUp className="w-3 h-3 flex-shrink-0" />
              ) : (
                <TrendingDown className="w-3 h-3 flex-shrink-0" />
              )}
              <span className="truncate">{stat.change}</span>
            </span>
            <a
              href="#"
              className="text-xs text-blue-600 hover:underline whitespace-nowrap truncate"
            >
              {stat.link}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
