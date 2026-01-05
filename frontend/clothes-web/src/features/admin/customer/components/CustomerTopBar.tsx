import React from "react";
import { Search, Plus, Download } from "lucide-react";

interface CustomerTopBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddCustomer: () => void;
}

export const CustomerTopBar: React.FC<CustomerTopBarProps> = ({
  searchTerm,
  onSearchChange,
  onAddCustomer,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between px-4 md:px-6 py-4 md:py-5 border-b border-gray-200 gap-3">
      <h2 className="text-lg font-semibold text-gray-800">Customer List</h2>

      <div className="flex items-center gap-2 md:gap-3 flex-wrap">
        <div className="flex-1 md:flex-none relative md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={onAddCustomer}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 md:px-4 py-2 rounded text-sm font-medium transition-colors shadow-sm flex-1 md:flex-none justify-center"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden md:inline">Add Customer</span>
          <span className="md:hidden">Add</span>
        </button>

        <button className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-3 md:px-4 py-2 rounded text-sm font-medium transition-colors shadow-sm flex-1 md:flex-none justify-center">
          <Download className="w-4 h-4" />
          <span className="hidden md:inline">Import</span>
          <span className="md:hidden">Import</span>
        </button>
      </div>
    </div>
  );
};
