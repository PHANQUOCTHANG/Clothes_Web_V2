/**
 * Hook quản lý filter và sort giỏ hàng
 */
import { useState, useMemo } from "react";

export interface ICartItem {
  id: string | number;
  name: string;
  price: string;
  quantity: number;
}

export type SortBy = "name" | "price" | "quantity" | "newest";
export type SortOrder = "asc" | "desc";

interface UseCartFiltersReturn {
  filteredItems: ICartItem[];
  sortBy: SortBy;
  sortOrder: SortOrder;
  searchTerm: string;
  setSortBy: (sort: SortBy) => void;
  setSortOrder: (order: SortOrder) => void;
  setSearchTerm: (term: string) => void;
  resetFilters: () => void;
}

export const useCartFilters = (
  cartItems: ICartItem[]
): UseCartFiltersReturn => {
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(() => {
    let items = [...cartItems];

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      items = items.filter((item) => item.name.toLowerCase().includes(term));
    }

    // Sort items
    items.sort((a, b) => {
      let compareValue = 0;

      switch (sortBy) {
        case "name":
          compareValue = a.name.localeCompare(b.name);
          break;
        case "price":
          const priceA = parseFloat(a.price.replace("$", "") || "0");
          const priceB = parseFloat(b.price.replace("$", "") || "0");
          compareValue = priceA - priceB;
          break;
        case "quantity":
          compareValue = a.quantity - b.quantity;
          break;
        case "newest":
          // Assuming items are added in order, use index
          compareValue = cartItems.indexOf(a) - cartItems.indexOf(b);
          break;
      }

      return sortOrder === "asc" ? compareValue : -compareValue;
    });

    return items;
  }, [cartItems, sortBy, sortOrder, searchTerm]);

  const resetFilters = () => {
    setSortBy("newest");
    setSortOrder("desc");
    setSearchTerm("");
  };

  return {
    filteredItems,
    sortBy,
    sortOrder,
    searchTerm,
    setSortBy,
    setSortOrder,
    setSearchTerm,
    resetFilters,
  };
};
