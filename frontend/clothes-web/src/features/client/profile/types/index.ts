export interface IProfileData {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
}

export interface IOrder {
  id: string;
  date: string;
  total: string;
  status: "Đã giao" | "Đang xử lý" | "Đã hủy";
  items: number;
}

export interface IAddress {
  id: number;
  name: string;
  address: string;
  isDefault: boolean;
}

export interface IFavorite {
  id: number;
  name: string;
  price: string;
  image: string;
}

export interface ProfilePageProps {
  setCurrentView: (view: string) => void;
  toggleLoginState: (state: boolean) => void;
  userName?: string;
}