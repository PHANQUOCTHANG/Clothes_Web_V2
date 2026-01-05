import React from "react";
import { Menu } from "lucide-react";

interface CustomerHeaderProps {
  onMenuToggle: (open: boolean) => void;
  isMobileMenuOpen: boolean;
}

export const CustomerHeader: React.FC<CustomerHeaderProps> = ({
  onMenuToggle,
  isMobileMenuOpen,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between max-w-[1800px] mx-auto gap-2">
        <h1 className="text-lg md:text-xl font-semibold text-gray-700 tracking-wide uppercase">
          Customers
        </h1>
        <div className="flex items-center text-sm text-gray-500">
          <span className="hidden md:inline">Ecommerce</span>
          <span className="mx-2 hidden md:inline">›</span>
          <span className="text-gray-700">Customers</span>
        </div>
      </div>
    </div>
  );
};
