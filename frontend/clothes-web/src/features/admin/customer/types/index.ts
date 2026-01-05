// ============================================
// Customer Types & Interfaces
// ============================================

export type CustomerStatus = "ACTIVE" | "BLOCK";

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  joiningDate: string;
  status: CustomerStatus;
}

export interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  joiningDate: string;
  status: CustomerStatus;
}

export interface CustomerFilters {
  searchTerm: string;
  statusFilter: CustomerStatus | "ALL";
  dateFilter?: string;
}

export interface ModalState {
  isAddOpen: boolean;
  isEditOpen: boolean;
  isDeleteOpen: boolean;
}
