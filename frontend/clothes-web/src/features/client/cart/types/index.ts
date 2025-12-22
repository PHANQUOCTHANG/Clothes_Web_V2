export interface ICartItem {
  id: string | number;
  name: string;
  price: string;
  quantity: number;
  image: string;
  color: string;
  size: string;
}

export interface CartItemProps {
  item: ICartItem;
  updateQuantity: (id: string | number, qty: number) => void;
  removeItem: (id: string | number) => void;
  isFullPage?: boolean;
}

export interface CartPageProps {
  cartItems: ICartItem[];
  setCartItems: (items: ICartItem[]) => void;
  updateQuantity: (id: string | number, qty: number) => void;
  removeItem: (id: string | number) => void;
  createRipple: (e: React.MouseEvent<HTMLElement>) => void;
  setCurrentView: (view: string) => void;
}

export interface ShoppingCartModalProps {
  isCartOpen: boolean;
  toggleCart: () => void;
  cartItems: ICartItem[];
  setCurrentView: (view: string) => void;
  updateQuantity: (id: string | number, qty: number) => void;
  removeItem: (id: string | number) => void;
}
