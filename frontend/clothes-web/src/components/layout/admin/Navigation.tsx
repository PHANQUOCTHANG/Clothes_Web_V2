"use client";

import { Grid } from "lucide-react";

export const Navigation = () => {
  const navItems = [
    { label: "Dashboards", isActive: true },
    { label: "Product", isActive: false },
    { label: "Customers", isActive: false },
    { label: "Chat", isActive: false },
    { label: "Orders", isActive: false },
    { label: "More", isActive: false },
  ];

  return (
    <nav className="bg-white border-b px-3 md:px-6 py-3 overflow-x-auto md:overflow-x-visible">
      <div className="flex items-center gap-3 md:gap-6 text-xs md:text-sm whitespace-nowrap md:whitespace-normal">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex items-center gap-2 py-1 ${
              item.isActive
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {item.isActive && <Grid className="w-4 h-4" />}
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};
