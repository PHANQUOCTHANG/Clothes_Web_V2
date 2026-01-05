import React from "react";
import { SlidersHorizontal } from "lucide-react";

interface CustomerFiltersProps {
  statusFilter: "ALL" | "ACTIVE" | "BLOCK";
  onStatusFilterChange: (status: "ALL" | "ACTIVE" | "BLOCK") => void;
  onClearFilters: () => void;
}

export const CustomerFilters: React.FC<CustomerFiltersProps> = ({
  statusFilter,
  onStatusFilterChange,
  onClearFilters,
}) => {
  return (
    <div className="px-4 md:px-6 py-4 bg-white border-b border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Date Picker */}
        <div>
          <input
            type="text"
            placeholder="Select date"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
          />
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) =>
              onStatusFilterChange(e.target.value as "ALL" | "ACTIVE" | "BLOCK")
            }
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
          >
            <option value="ALL">Status: All</option>
            <option value="ACTIVE">Active</option>
            <option value="BLOCK">Block</option>
          </select>
        </div>

        {/* Filters Button */}
        <div>
          <button className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>
    </div>
  );
};
