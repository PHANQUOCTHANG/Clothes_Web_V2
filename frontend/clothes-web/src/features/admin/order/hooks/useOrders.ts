/**
 * Custom hook quản lý state cho trang quản lý đơn hàng
 */

import { useState, useCallback } from "react";
import type {
  Order,
  OrderTab,
  OrderFilters,
  DatePickerState,
  ModalState,
} from "../types";

interface UseOrdersReturn {
  // Dữ liệu
  orders: Order[];
  filteredOrders: Order[];
  selectedOrders: string[];

  // Filter state
  filters: OrderFilters;
  activeTab: OrderTab;

  // Date picker state
  datePickerState: DatePickerState;

  // Modal state
  modals: ModalState;

  // UI state
  isMobileMenuOpen: boolean;
  showFilters: boolean;

  // Filter actions
  handleSearchChange: (term: string) => void;
  handleTabChange: (tab: OrderTab) => void;
  handleStatusFilterChange: (status: string) => void;
  handlePaymentFilterChange: (payment: string) => void;
  handleDateFromChange: (date: string) => void;
  handleDateToChange: (date: string) => void;
  clearFilters: () => void;

  // Selection actions
  toggleSelectOrder: (orderId: string) => void;
  selectAllOrders: (orders: Order[]) => void;
  clearSelection: () => void;

  // Date picker actions
  handleDatePickerToggle: () => void;
  handleDateSelect: (day: number) => void;
  handleMonthChange: (month: number) => void;
  handleYearChange: (year: number) => void;

  // Modal actions
  openAddModal: () => void;
  closeAddModal: () => void;
  openEditModal: (order: Order) => void;
  closeEditModal: () => void;
  openDeleteModal: (order: Order) => void;
  closeDeleteModal: () => void;

  // UI actions
  setIsMobileMenuOpen: (open: boolean) => void;
  setShowFilters: (show: boolean) => void;
}

/**
 * Mock data cho đơn hàng
 */
const MOCK_ORDERS: Order[] = [
  {
    id: "#VZ12",
    customer: "Alexis Clarke",
    product: "Đồng hồ thông minh Noise Evolve",
    date: "20 Tháng 4, 2022",
    time: "4:05 PM",
    amount: "$1021",
    payment: "Mastercard",
    status: "ĐÃ HỦY",
  },
  {
    id: "#VZ11",
    customer: "Diana Kohler",
    product: "Áo thun tay ngắn (Xanh)",
    date: "20 Tháng 4, 2022",
    time: "4:05 PM",
    amount: "$874",
    payment: "Visa",
    status: "ĐÃ GIAO",
  },
  {
    id: "#VZ10",
    customer: "Henry Baird",
    product: "Áo sơ mi tay ngắn cổ điển",
    date: "20 Tháng 4, 2022",
    time: "4:05 PM",
    amount: "$342",
    payment: "Mastercard",
    status: "ĐANG XỬ LÝ",
  },
  {
    id: "#VZ9",
    customer: "Donald Palmer",
    product: "Áo sơ mi Oxford cài nút",
    date: "20 Tháng 4, 2022",
    time: "4:05 PM",
    amount: "$373",
    payment: "Visa",
    status: "CHỜ LẤY HÀNG",
  },
  {
    id: "#VZ8",
    customer: "Alexis Clarke",
    product: "USB Flash Drive cá nhân hóa",
    date: "20 Tháng 4, 2022",
    time: "4:05 PM",
    amount: "$247",
    payment: "Paypal",
    status: "ĐÃ GIAO",
  },
  {
    id: "#VZ7",
    customer: "Nancy Martino",
    product: "Áo thun in họa tiết",
    date: "20 Tháng 4, 2022",
    time: "4:05 PM",
    amount: "$180",
    payment: "COD",
    status: "TRẢ HÀNG",
  },
  {
    id: "#VZ6",
    customer: "James Price",
    product: "Apple iPhone 12",
    date: "20 Tháng 4, 2022",
    time: "4:05 PM",
    amount: "$1240",
    payment: "Visa",
    status: "ĐANG XỬ LÝ",
  },
  {
    id: "#VZ5",
    customer: "Thomas Taylor",
    product: "Galaxy Watch4",
    date: "20 Tháng 4, 2022",
    time: "4:05 PM",
    amount: "$408",
    payment: "Mastercard",
    status: "CHỜ LẤY HÀNG",
  },
  {
    id: "#VZ4",
    customer: "Maria Garcia",
    product: "Laptop Dell XPS 13",
    date: "19 Tháng 4, 2022",
    time: "2:30 PM",
    amount: "$1450",
    payment: "Mastercard",
    status: "ĐÃ GIAO",
  },
  {
    id: "#VZ3",
    customer: "Robert Wilson",
    product: "Tai nghe Sony WH-1000XM4",
    date: "19 Tháng 4, 2022",
    time: "11:45 AM",
    amount: "$349",
    payment: "Paypal",
    status: "ĐANG XỬ LÝ",
  },
];

/**
 * Hook quản lý trạng thái đơn hàng
 */
export const useOrders = (): UseOrdersReturn => {
  // ===== DATA STATE =====
  const [orders] = useState<Order[]>(MOCK_ORDERS);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  // ===== FILTER STATE =====
  const [filters, setFilters] = useState<OrderFilters>({
    searchTerm: "",
    statusFilter: "",
    dateFrom: "",
    dateTo: "",
    paymentFilter: "",
  });
  const [activeTab, setActiveTab] = useState<OrderTab>("all");

  // ===== DATE PICKER STATE =====
  const [datePickerState, setDatePickerState] = useState<DatePickerState>({
    show: false,
    selectedDate: "",
    currentMonth: 11,
    currentYear: 2025,
  });

  // ===== MODAL STATE =====
  const [modals, setModals] = useState<ModalState>({
    showAdd: false,
    showEdit: false,
    showDelete: false,
    selectedOrder: null,
  });

  // ===== UI STATE =====
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // ===== COMPUTED STATE =====
  const filteredOrders = orders.filter((order) => {
    // Lọc theo tab
    if (activeTab === "all") {
      // Không lọc
    } else if (activeTab === "delivered" && order.status !== "ĐÃ GIAO") {
      return false;
    } else if (activeTab === "pickups" && order.status !== "CHỜ LẤY HÀNG") {
      return false;
    } else if (activeTab === "returns" && order.status !== "TRẢ HÀNG") {
      return false;
    } else if (activeTab === "cancelled" && order.status !== "ĐÃ HỦY") {
      return false;
    }

    // Lọc theo search
    if (
      filters.searchTerm &&
      !order.customer.toLowerCase().includes(filters.searchTerm.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  // ===== FILTER ACTIONS =====
  const handleSearchChange = useCallback((term: string) => {
    setFilters((prev) => ({ ...prev, searchTerm: term }));
  }, []);

  const handleTabChange = useCallback((tab: OrderTab) => {
    setActiveTab(tab);
  }, []);

  const handleStatusFilterChange = useCallback((status: string) => {
    setFilters((prev) => ({ ...prev, statusFilter: status }));
  }, []);

  const handlePaymentFilterChange = useCallback((payment: string) => {
    setFilters((prev) => ({ ...prev, paymentFilter: payment }));
  }, []);

  const handleDateFromChange = useCallback((date: string) => {
    setFilters((prev) => ({ ...prev, dateFrom: date }));
  }, []);

  const handleDateToChange = useCallback((date: string) => {
    setFilters((prev) => ({ ...prev, dateTo: date }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      searchTerm: "",
      statusFilter: "",
      dateFrom: "",
      dateTo: "",
      paymentFilter: "",
    });
  }, []);

  // ===== SELECTION ACTIONS =====
  const toggleSelectOrder = useCallback((orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  }, []);

  const selectAllOrders = useCallback(
    (ordersToSelect: Order[]) => {
      if (selectedOrders.length === ordersToSelect.length) {
        setSelectedOrders([]);
      } else {
        setSelectedOrders(ordersToSelect.map((order) => order.id));
      }
    },
    [selectedOrders.length]
  );

  const clearSelection = useCallback(() => {
    setSelectedOrders([]);
  }, []);

  // ===== DATE PICKER ACTIONS =====
  const handleDatePickerToggle = useCallback(() => {
    setDatePickerState((prev) => ({ ...prev, show: !prev.show }));
  }, []);

  const handleDateSelect = useCallback(
    (day: number) => {
      const monthNames = [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ];
      const formattedDate = `${day} ${monthNames[
        datePickerState.currentMonth
      ].slice(0, 3)}, ${datePickerState.currentYear}`;
      setDatePickerState((prev) => ({
        ...prev,
        selectedDate: formattedDate,
        show: false,
      }));
    },
    [datePickerState.currentMonth, datePickerState.currentYear]
  );

  const handleMonthChange = useCallback((month: number) => {
    setDatePickerState((prev) => ({ ...prev, currentMonth: month }));
  }, []);

  const handleYearChange = useCallback((year: number) => {
    setDatePickerState((prev) => ({ ...prev, currentYear: year }));
  }, []);

  // ===== MODAL ACTIONS =====
  const openAddModal = useCallback(() => {
    setModals((prev) => ({ ...prev, showAdd: true }));
  }, []);

  const closeAddModal = useCallback(() => {
    setModals((prev) => ({ ...prev, showAdd: false }));
  }, []);

  const openEditModal = useCallback((order: Order) => {
    setModals((prev) => ({ ...prev, showEdit: true, selectedOrder: order }));
  }, []);

  const closeEditModal = useCallback(() => {
    setModals((prev) => ({ ...prev, showEdit: false, selectedOrder: null }));
  }, []);

  const openDeleteModal = useCallback((order: Order) => {
    setModals((prev) => ({ ...prev, showDelete: true, selectedOrder: order }));
  }, []);

  const closeDeleteModal = useCallback(() => {
    setModals((prev) => ({ ...prev, showDelete: false, selectedOrder: null }));
  }, []);

  return {
    // Dữ liệu
    orders,
    filteredOrders,
    selectedOrders,

    // Filter state
    filters,
    activeTab,

    // Date picker state
    datePickerState,

    // Modal state
    modals,

    // UI state
    isMobileMenuOpen,
    showFilters,

    // Filter actions
    handleSearchChange,
    handleTabChange,
    handleStatusFilterChange,
    handlePaymentFilterChange,
    handleDateFromChange,
    handleDateToChange,
    clearFilters,

    // Selection actions
    toggleSelectOrder,
    selectAllOrders,
    clearSelection,

    // Date picker actions
    handleDatePickerToggle,
    handleDateSelect,
    handleMonthChange,
    handleYearChange,

    // Modal actions
    openAddModal,
    closeAddModal,
    openEditModal,
    closeEditModal,
    openDeleteModal,
    closeDeleteModal,

    // UI actions
    setIsMobileMenuOpen,
    setShowFilters,
  };
};
