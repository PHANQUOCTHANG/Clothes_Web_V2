import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { Customer } from "../types";

interface CustomerCardProps {
  customer: Customer;
  isSelected: boolean;
  onToggleSelect: (customerId: number) => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

// Hàm lấy màu status
const getStatusColor = (status: string) => {
  return status === "ACTIVE"
    ? "bg-green-100 text-green-600"
    : "bg-red-100 text-red-600";
};

export const CustomerCard: React.FC<CustomerCardProps> = ({
  customer,
  isSelected,
  onToggleSelect,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(customer.id)}
            className="w-4 h-4 text-blue-600 rounded border-gray-300"
          />
          <div>
            <div className="text-sm font-semibold text-gray-800">
              {customer.name}
            </div>
            <div className="text-xs text-gray-500">{customer.email}</div>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(customer)}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(customer)}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm mb-3">
        <div>
          <div className="text-xs text-gray-500">Phone</div>
          <div className="font-medium text-gray-800">{customer.phone}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Joining Date</div>
          <div className="font-medium text-gray-800">
            {customer.joiningDate}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span
          className={`inline-block px-2.5 py-1 text-[10px] font-bold rounded uppercase ${getStatusColor(
            customer.status
          )}`}
        >
          {customer.status}
        </span>
      </div>
    </div>
  );
};
