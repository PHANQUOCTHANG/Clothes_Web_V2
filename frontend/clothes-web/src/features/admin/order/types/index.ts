/**
 * Type definitions cho module order
 */

/**
 * Status đơn hàng
 */
export type OrderStatus =
  | "ĐÃ HỦY"
  | "ĐÃ GIAO"
  | "ĐANG XỬ LÝ"
  | "CHỜ LẤY HÀNG"
  | "TRẢ HÀNG";

/**
 * Phương thức thanh toán
 */
export type PaymentMethod = "Visa" | "Mastercard" | "Paypal" | "COD";

/**
 * Tab loại đơn hàng
 */
export type OrderTab =
  | "all"
  | "delivered"
  | "pickups"
  | "returns"
  | "cancelled";

/**
 * Interface cho một đơn hàng
 */
export interface Order {
  id: string;
  customer: string;
  product: string;
  date: string;
  time: string;
  amount: string;
  payment: PaymentMethod;
  status: OrderStatus;
}

/**
 * Interface cho form tạo/chỉnh sửa đơn hàng
 */
export interface OrderFormData {
  customer: string;
  product: string;
  date: string;
  amount: string;
  payment: PaymentMethod;
  status: OrderStatus;
}

/**
 * Interface cho filters
 */
export interface OrderFilters {
  searchTerm: string;
  statusFilter: string;
  dateFrom: string;
  dateTo: string;
  paymentFilter: string;
}

/**
 * Interface cho modal state
 */
export interface ModalState {
  showAdd: boolean;
  showEdit: boolean;
  showDelete: boolean;
  selectedOrder: Order | null;
}

/**
 * Interface cho date picker
 */
export interface DatePickerState {
  show: boolean;
  selectedDate: string;
  currentMonth: number;
  currentYear: number;
}
