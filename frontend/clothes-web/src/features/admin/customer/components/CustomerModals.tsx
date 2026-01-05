import React, { useState } from "react";
import { X } from "lucide-react";
import { Customer, CustomerFormData } from "../types";

interface CustomerModalsProps {
  isAddOpen: boolean;
  isEditOpen: boolean;
  isDeleteOpen: boolean;
  selectedCustomer: Customer | null;
  onCloseAdd: () => void;
  onCloseEdit: () => void;
  onCloseDelete: () => void;
  onSubmitAdd?: (data: CustomerFormData) => void;
  onSubmitEdit?: (data: CustomerFormData) => void;
  onConfirmDelete?: () => void;
}

// ============================================
// Customer Add/Edit Modal
// ============================================

const CustomerModal: React.FC<{
  isOpen: boolean;
  isEdit: boolean;
  selectedCustomer: Customer | null;
  onClose: () => void;
  onSubmit?: (data: CustomerFormData) => void;
}> = ({ isOpen, isEdit, selectedCustomer, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<CustomerFormData>({
    name: selectedCustomer?.name || "",
    email: selectedCustomer?.email || "",
    phone: selectedCustomer?.phone || "",
    joiningDate: selectedCustomer?.joiningDate || "",
    status: selectedCustomer?.status || "ACTIVE",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit?.(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
          <h3 className="text-lg font-semibold text-gray-800">
            {isEdit ? "Edit Customer" : "Add Customer"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-4 md:px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone no."
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Joining Date
            </label>
            <input
              type="text"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              placeholder="Select date"
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            >
              <option value="ACTIVE">Active</option>
              <option value="BLOCK">Block</option>
            </select>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-4 md:px-6 py-4 border-t border-gray-200 bg-gray-50 sticky bottom-0">
          <button
            onClick={onClose}
            className="px-4 md:px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 md:px-5 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600 transition-colors"
          >
            {isEdit ? "Update" : "Add Customer"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// Customer Delete Modal
// ============================================

const DeleteModal: React.FC<{
  isOpen: boolean;
  selectedCustomer: Customer | null;
  onClose: () => void;
  onConfirm?: () => void;
}> = ({ isOpen, selectedCustomer, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex justify-end px-4 pt-4">
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pb-8 text-center">
          <div className="mx-auto w-20 h-20 mb-6 bg-orange-50 rounded-full flex items-center justify-center">
            <div className="w-10 h-10 text-orange-400">
              <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
                <rect
                  x="20"
                  y="16"
                  width="40"
                  height="52"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="white"
                />
                <path
                  d="M28 10 C28 8 30 6 32 6 L48 6 C50 6 52 8 52 10 L52 16 L28 16 Z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="white"
                />
                <line
                  x1="34"
                  y1="26"
                  x2="34"
                  y2="54"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <line
                  x1="40"
                  y1="26"
                  x2="40"
                  y2="54"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <line
                  x1="46"
                  y1="26"
                  x2="46"
                  y2="54"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <line
                  x1="16"
                  y1="16"
                  x2="64"
                  y2="16"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Are you sure ?
          </h3>
          <p className="text-gray-500 text-sm mb-8">
            Are you sure you want to remove this record?
            <br />
            This action cannot be undone.
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
            >
              Close
            </button>
            <button
              onClick={() => {
                onConfirm?.();
                onClose();
              }}
              className="px-6 py-2 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 transition-all shadow-md shadow-red-100"
            >
              Yes, Delete it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// Combined Modal Component
// ============================================

export const CustomerModals: React.FC<CustomerModalsProps> = ({
  isAddOpen,
  isEditOpen,
  isDeleteOpen,
  selectedCustomer,
  onCloseAdd,
  onCloseEdit,
  onCloseDelete,
  onSubmitAdd,
  onSubmitEdit,
  onConfirmDelete,
}) => {
  return (
    <>
      <CustomerModal
        isOpen={isAddOpen}
        isEdit={false}
        selectedCustomer={null}
        onClose={onCloseAdd}
        onSubmit={onSubmitAdd}
      />

      <CustomerModal
        isOpen={isEditOpen}
        isEdit={true}
        selectedCustomer={selectedCustomer}
        onClose={onCloseEdit}
        onSubmit={onSubmitEdit}
      />

      <DeleteModal
        isOpen={isDeleteOpen}
        selectedCustomer={selectedCustomer}
        onClose={onCloseDelete}
        onConfirm={onConfirmDelete}
      />
    </>
  );
};
