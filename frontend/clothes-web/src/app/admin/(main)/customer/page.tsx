'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useCustomers } from '@/features/admin/customer/hooks';
import {
  CustomerHeader,
  CustomerTopBar,
  CustomerFilters,
  CustomersTable,
  CustomerCard,
  CustomerPagination,
  CustomerModals,
  SelectionBar
} from '@/features/admin/customer/components';

export default function CustomerPage() {
  const {
    filteredCustomers,
    paginatedCustomers,
    selectedCustomers,
    selectedCustomer,
    searchTerm,
    statusFilter,
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    modals,
    isMobileMenuOpen,
    handleSearchChange,
    handleStatusFilterChange,
    toggleSelectCustomer,
    selectAllCustomers,
    openAddModal,
    closeAddModal,
    openEditModal,
    closeEditModal,
    openDeleteModal,
    closeDeleteModal,
    handlePageChange,
    handleMobileMenuToggle
  } = useCustomers();

  const [isMobile, setIsMobile] = useState(false);

  // Theo dõi kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-0">
      {/* Header */}
      <CustomerHeader onMenuToggle={handleMobileMenuToggle} isMobileMenuOpen={isMobileMenuOpen} />

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-3 md:px-6 py-4 md:py-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          {/* Top Bar */}
          <CustomerTopBar searchTerm={searchTerm} onSearchChange={handleSearchChange} onAddCustomer={openAddModal} />

          {/* Filters */}
          <CustomerFilters statusFilter={statusFilter as 'ALL' | 'ACTIVE' | 'BLOCK'} onStatusFilterChange={handleStatusFilterChange} onClearFilters={() => {}} />

          {/* Mobile View - Cards */}
          {isMobile ? (
            <div className="p-4">
              {filteredCustomers.length > 0 ? (
                <>
                  {/* Select All */}
                  <div className="flex items-center gap-3 mb-4 p-2 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={selectedCustomers.length === paginatedCustomers.length && paginatedCustomers.length > 0}
                      onChange={selectAllCustomers}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-600">
                      Select All ({selectedCustomers.length}/{paginatedCustomers.length} selected)
                    </span>
                  </div>

                  {/* Customer Cards */}
                  {paginatedCustomers.map(customer => (
                    <CustomerCard
                      key={customer.id}
                      customer={customer}
                      isSelected={selectedCustomers.includes(customer.id)}
                      onToggleSelect={toggleSelectCustomer}
                      onEdit={openEditModal}
                      onDelete={openDeleteModal}
                    />
                  ))}
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No customers found</h3>
                  <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              {filteredCustomers.length > 0 ? (
                <CustomersTable
                  customers={paginatedCustomers}
                  selectedCustomers={selectedCustomers}
                  onToggleSelect={toggleSelectCustomer}
                  onSelectAll={selectAllCustomers}
                  onEdit={openEditModal}
                  onDelete={openDeleteModal}
                />
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">No customers found</h3>
                  <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
                </div>
              )}
            </>
          )}

          {/* Pagination */}
          {filteredCustomers.length > 0 && (
            <CustomerPagination
              currentPage={currentPage}
              totalPages={totalPages}
              startIndex={startIndex}
              endIndex={endIndex}
              totalItems={filteredCustomers.length}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>

      {/* Selection Bar */}
      <SelectionBar selectedCount={selectedCustomers.length} onPrint={() => {}} onDeleteSelected={() => {}} />

      {/* Modals */}
      <CustomerModals
        isAddOpen={modals.isAddOpen}
        isEditOpen={modals.isEditOpen}
        isDeleteOpen={modals.isDeleteOpen}
        selectedCustomer={selectedCustomer}
        onCloseAdd={closeAddModal}
        onCloseEdit={closeEditModal}
        onCloseDelete={closeDeleteModal}
      />
    </div>
  );
}
