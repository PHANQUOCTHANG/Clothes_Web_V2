"use client";

import { useState, useCallback } from "react";
import {
  Customer,
  CustomerFilters,
  CustomerFormData,
  ModalState,
} from "../types";

// ============================================
// Mock Data
// ============================================

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 1,
    name: "Timothy Smith",
    email: "timothysmith@velzon.com",
    phone: "973-277-6950",
    joiningDate: "13 Dec, 2021",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Herbert Stokes",
    email: "herbertstokes@velzon.com",
    phone: "312-944-1448",
    joiningDate: "20 Jul, 2021",
    status: "BLOCK",
  },
  {
    id: 3,
    name: "Charles Kubik",
    email: "charleskubik@velzon.com",
    phone: "231-480-8536",
    joiningDate: "25 Sep, 2021",
    status: "BLOCK",
  },
  {
    id: 4,
    name: "Glen Matney",
    email: "glenmatney@velzon.com",
    phone: "515-395-1069",
    joiningDate: "02 Nov, 2021",
    status: "ACTIVE",
  },
  {
    id: 5,
    name: "Carolyn Jones",
    email: "carolynjones@velzon.com",
    phone: "414-453-5725",
    joiningDate: "07 Jun, 2021",
    status: "ACTIVE",
  },
  {
    id: 6,
    name: "Kevin Dawson",
    email: "kevindawson@velzon.com",
    phone: "213-741-4294",
    joiningDate: "14 Mar, 2021",
    status: "ACTIVE",
  },
  {
    id: 7,
    name: "Michael Morris",
    email: "michaelmorris@velzon.com",
    phone: "805-447-8398",
    joiningDate: "19 May, 2021",
    status: "BLOCK",
  },
  {
    id: 8,
    name: "Robert McMahon",
    email: "robertmcmahon@velzon.com",
    phone: "786-253-9927",
    joiningDate: "12 Jan, 2021",
    status: "ACTIVE",
  },
];

// ============================================
// useCustomers Hook
// ============================================

export const useCustomers = () => {
  const [customers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "BLOCK">(
    "ALL"
  );
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modal state
  const [modals, setModals] = useState<ModalState>({
    isAddOpen: false,
    isEditOpen: false,
    isDeleteOpen: false,
  });

  // ============================================
  // Computed State
  // ============================================

  // Lọc khách hàng dựa trên search và status
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);

    const matchesStatus =
      statusFilter === "ALL" || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Tính toán phân trang (8 items per page)
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

  // Đếm theo status
  const statusCounts = {
    all: filteredCustomers.length,
    active: filteredCustomers.filter((c) => c.status === "ACTIVE").length,
    blocked: filteredCustomers.filter((c) => c.status === "BLOCK").length,
  };

  // ============================================
  // Search & Filter Actions
  // ============================================

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
  }, []);

  const handleStatusFilterChange = useCallback(
    (status: "ALL" | "ACTIVE" | "BLOCK") => {
      setStatusFilter(status);
      setCurrentPage(1);
    },
    []
  );

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setStatusFilter("ALL");
    setCurrentPage(1);
  }, []);

  // ============================================
  // Selection Actions
  // ============================================

  const toggleSelectCustomer = useCallback((customerId: number) => {
    setSelectedCustomers((prev) =>
      prev.includes(customerId)
        ? prev.filter((id) => id !== customerId)
        : [...prev, customerId]
    );
  }, []);

  const selectAllCustomers = useCallback(() => {
    if (selectedCustomers.length === paginatedCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(paginatedCustomers.map((c) => c.id));
    }
  }, [selectedCustomers.length, paginatedCustomers]);

  const clearSelection = useCallback(() => {
    setSelectedCustomers([]);
  }, []);

  // ============================================
  // Modal Actions
  // ============================================

  const openAddModal = useCallback(() => {
    setModals((prev) => ({ ...prev, isAddOpen: true }));
  }, []);

  const closeAddModal = useCallback(() => {
    setModals((prev) => ({ ...prev, isAddOpen: false }));
  }, []);

  const openEditModal = useCallback((customer: Customer) => {
    setSelectedCustomer(customer);
    setModals((prev) => ({ ...prev, isEditOpen: true }));
  }, []);

  const closeEditModal = useCallback(() => {
    setModals((prev) => ({ ...prev, isEditOpen: false }));
    setSelectedCustomer(null);
  }, []);

  const openDeleteModal = useCallback((customer: Customer) => {
    setSelectedCustomer(customer);
    setModals((prev) => ({ ...prev, isDeleteOpen: true }));
  }, []);

  const closeDeleteModal = useCallback(() => {
    setModals((prev) => ({ ...prev, isDeleteOpen: false }));
    setSelectedCustomer(null);
  }, []);

  // ============================================
  // Pagination Actions
  // ============================================

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        // Auto scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [totalPages]
  );

  // ============================================
  // UI Actions
  // ============================================

  const handleMobileMenuToggle = useCallback((open: boolean) => {
    setIsMobileMenuOpen(open);
  }, []);

  // ============================================
  // Return Hook State & Methods
  // ============================================

  return {
    // Data
    customers,
    filteredCustomers,
    paginatedCustomers,
    selectedCustomers,
    selectedCustomer,
    statusCounts,

    // Filters
    searchTerm,
    statusFilter,

    // Pagination
    currentPage,
    totalPages,
    startIndex,
    endIndex,

    // Modals
    modals,

    // UI
    isMobileMenuOpen,

    // Actions - Search & Filter
    handleSearchChange,
    handleStatusFilterChange,
    clearFilters,

    // Actions - Selection
    toggleSelectCustomer,
    selectAllCustomers,
    clearSelection,

    // Actions - Modals
    openAddModal,
    closeAddModal,
    openEditModal,
    closeEditModal,
    openDeleteModal,
    closeDeleteModal,

    // Actions - Pagination
    handlePageChange,

    // Actions - UI
    handleMobileMenuToggle,
  };
};
