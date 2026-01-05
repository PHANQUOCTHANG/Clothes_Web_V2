'use client';

/**
 * Trang quản lý đơn hàng
 * Sử dụng các component riêng biệt để quản lý state và UI một cách sạch
 */

import React, { useState } from 'react';
import {
  OrderHeader,
  OrderTabs,
  OrderTopBar,
  OrdersTable,
  OrderPagination,
  SelectionBar,
  OrderModal,
  DeleteModal
} from '@/features/admin/order/components';
import { useOrders } from '@/features/admin/order/hooks';

/**
 * Component trang quản lý đơn hàng
 * Orchestration component kết hợp tất cả sub-components
 */
export default function OrdersPage() {
  // ===== STATE =====
  const orderState = useOrders();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // ===== COMPUTED =====
  const totalPages = Math.ceil(orderState.filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orderState.filteredOrders.slice(startIndex, endIndex);

  // Reset page khi filter thay đổi
  React.useEffect(() => {
    setCurrentPage(1);
  }, [orderState.activeTab, orderState.filters.searchTerm]);

  // ===== HANDLERS =====
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <OrderHeader
        onMenuToggle={orderState.setIsMobileMenuOpen}
        isMobileMenuOpen={orderState.isMobileMenuOpen}
      />

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          {/* Top Bar */}
          <OrderTopBar
            searchTerm={orderState.filters.searchTerm}
            onSearchChange={orderState.handleSearchChange}
            onShowFiltersToggle={() =>
              orderState.setShowFilters(!orderState.showFilters)
            }
            onAddOrder={orderState.openAddModal}
          />

          {/* Tabs */}
          <OrderTabs
            activeTab={orderState.activeTab}
            onTabChange={orderState.handleTabChange}
            filteredOrders={orderState.filteredOrders}
          />

          {/* Selection Bar */}
          <SelectionBar
            selectedCount={orderState.selectedOrders.length}
            onPrint={() => {
              console.log('In đơn hàng:', orderState.selectedOrders);
            }}
            onDeleteSelected={orderState.openDeleteModal}
          />

          {/* Table */}
          <OrdersTable
            orders={currentOrders}
            selectedOrders={orderState.selectedOrders}
            onToggleSelect={orderState.toggleSelectOrder}
            onSelectAll={() => orderState.selectAllOrders(currentOrders)}
            onEdit={orderState.openEditModal}
            onDelete={orderState.openDeleteModal}
          />

          {/* Pagination */}
          <OrderPagination
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            endIndex={endIndex}
            totalItems={orderState.filteredOrders.length}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Modals */}
      <OrderModal
        isOpen={orderState.modals.showAdd}
        isEdit={false}
        onClose={orderState.closeAddModal}
        onSubmit={() => {
          console.log('Tạo đơn hàng');
          orderState.closeAddModal();
        }}
      />

      <OrderModal
        isOpen={orderState.modals.showEdit}
        isEdit={true}
        selectedOrder={orderState.modals.selectedOrder}
        onClose={orderState.closeEditModal}
        onSubmit={() => {
          console.log('Cập nhật đơn hàng');
          orderState.closeEditModal();
        }}
      />

      <DeleteModal
        isOpen={orderState.modals.showDelete}
        selectedOrder={orderState.modals.selectedOrder}
        onClose={orderState.closeDeleteModal}
        onConfirm={() => {
          console.log('Xóa đơn hàng:', orderState.modals.selectedOrder?.id);
          orderState.closeDeleteModal();
          orderState.clearSelection();
        }}
      />
    </div>
  );
}
