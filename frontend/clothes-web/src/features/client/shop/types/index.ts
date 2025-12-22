// Color Type
export interface Color {
  hex: string;
  name: string;
  pattern?: boolean;
}

// Product Type
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  imageHoverUrl: string;
  colors: string[];
  description: string;
  modalImages: string[];
  availableSizes: string[];
  discount?: string;
}

// Category Type
export interface Category {
  name: string;
  count: number;
}

// Brand Type
export interface Brand {
  name: string;
  count: number;
}

// Filter State Type
export interface FilterState {
  size: string[];
  price: {
    min: number;
    max: number;
  };
  brand: string[];
  color: string[];
}

// Sort Option Type
export interface SortOption {
  key: string;
  label: string;
}

// Active Filter Type
export interface ActiveFilter {
  type: "size" | "brand" | "color" | "price";
  value: string;
  label: string;
}
