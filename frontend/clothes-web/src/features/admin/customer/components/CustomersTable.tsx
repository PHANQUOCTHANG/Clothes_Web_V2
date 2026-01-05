import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { Customer } from "../types";

interface CustomersTableProps {
  customers: Customer[];
  selectedCustomers: number[];
  onToggleSelect: (customerId: number) => void;
  onSelectAll: () => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

// Hàm lấy màu status
const getStatusColor = (status: string) => {
  return status === "ACTIVE"
    ? "bg-green-100 text-green-600"
    : "bg-red-100 text-red-600";
};

export const CustomersTable: React.FC<CustomersTableProps> = ({
  customers,
  selectedCustomers,
  onToggleSelect,
  onSelectAll,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left w-10">
              <input
                type="checkbox"
                checked={
                  selectedCustomers.length === customers.length &&
                  customers.length > 0
                }
                onChange={onSelectAll}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Joining Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedCustomers.includes(customer.id)}
                  onChange={() => onToggleSelect(customer.id)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-800">
                {customer.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {customer.email}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {customer.phone}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {customer.joiningDate}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block px-2.5 py-1 text-[10px] font-bold rounded uppercase tracking-wider ${getStatusColor(
                    customer.status
                  )}`}
                >
                  {customer.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onEdit(customer)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-all"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(customer)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
