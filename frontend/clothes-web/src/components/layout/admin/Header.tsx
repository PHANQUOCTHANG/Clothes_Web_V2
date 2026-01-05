"use client";

import { Search, Grid, ShoppingCart, Menu, Moon, Bell } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-slate-700 text-white px-3 md:px-6 py-3 flex items-center justify-between gap-2 md:gap-4">
      <div className="flex items-center gap-2 md:gap-8 min-w-0">
        <h1 className="text-xl md:text-2xl font-bold tracking-wide whitespace-nowrap">
          VELZON
        </h1>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-slate-600 text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-md w-48 lg:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <img
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 30'%3E%3Crect fill='%23B22234' width='60' height='30'/%3E%3Cpath stroke='%23fff' stroke-width='2' d='M0 4h60M0 12h60M0 20h60M0 28h60'/%3E%3Crect fill='%233C3B6E' width='24' height='16'/%3E%3C/svg%3E"
          alt="US Flag"
          className="w-5 h-3 md:w-6 md:h-4"
        />
        <Grid className="hidden md:block w-5 h-5 cursor-pointer" />
        <div className="relative">
          <ShoppingCart className="w-5 h-5 cursor-pointer" />
          <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            4
          </span>
        </div>
        <Menu className="hidden md:block w-5 h-5 cursor-pointer" />
        <Moon className="hidden sm:block w-5 h-5 cursor-pointer" />
        <div className="relative">
          <Bell className="w-5 h-5 cursor-pointer" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anna"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <div className="hidden md:block">
            <div className="text-sm font-medium">Anna Adame</div>
            <div className="text-xs text-gray-400">Founder</div>
          </div>
        </div>
      </div>
    </header>
  );
};
