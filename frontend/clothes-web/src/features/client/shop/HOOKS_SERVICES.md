# Shop Feature - Hooks & Services Documentation

## 📚 Overview

Tài liệu hướng dẫn sử dụng các hooks và services cho feature Shop. Các hooks quản lý state, services xử lý logic nghiệp vụ.

---

## 🎣 HOOKS

### 1. **useFilters** - Quản lý bộ lọc

Quản lý trạng thái các bộ lọc (size, color, price, brand).

```typescript
import { useFilters } from "@/features/client/shop/hooks";

const {
  filters, // FilterState: trạng thái bộ lọc
  isLoading, // boolean: đang loading
  handleFilterChange, // (type, value) => void
  handleClearAll, // () => void
  removeFilter, // (type, value) => void
  hasActiveFilters, // () => boolean
} = useFilters();

// Sử dụng
handleFilterChange("size", "M"); // Thêm bộ lọc size
handleFilterChange("price", { min: 100, max: 500 });
handleClearAll(); // Xóa tất cả bộ lọc
```

---

### 2. **usePagination** - Quản lý phân trang

Quản lý phân trang sản phẩm.

```typescript
import { usePagination } from "@/features/client/shop/hooks";

const {
  currentPage, // number: trang hiện tại
  totalPages, // number: tổng số trang
  startIndex, // number: index bắt đầu
  endIndex, // number: index kết thúc
  currentItemsStart, // number: mục bắt đầu
  currentItemsEnd, // number: mục kết thúc
  goToPage, // (page: number) => void
  nextPage, // () => void
  prevPage, // () => void
  hasNextPage, // boolean
  hasPrevPage, // boolean
  resetPage, // () => void
} = usePagination(100, 12); // 100 sản phẩm, 12 trên một trang

// Sử dụng
goToPage(3); // Đi tới trang 3
const products = allProducts.slice(startIndex, endIndex);
```

---

### 3. **useModal** - Quản lý modal

Quản lý trạng thái các modal (AddToCart, QuickView).

```typescript
import { useModal } from "@/features/client/shop/hooks";

const {
  // AddToCart Modal
  isAddToCartModalOpen,
  selectedProduct,
  openAddToCartModal,
  closeAddToCartModal,

  // QuickView Modal
  isQuickViewOpen,
  selectedProductForQuickView,
  openQuickViewModal,
  closeQuickViewModal,

  // Utilities
  closeAllModals,
} = useModal();

// Sử dụng
openAddToCartModal(product);
openQuickViewModal(product);
closeAllModals();
```

---

### 4. **useViewMode** - Quản lý chế độ xem

Quản lý chế độ xem sản phẩm (danh sách, lưới 2/3/4/5 cột).

```typescript
import { useViewMode, type ViewMode } from "@/features/client/shop/hooks";

const {
  activeView, // ViewMode: 2 | 3 | 4 | 5
  changeView, // (view: ViewMode) => void
  isListView, // boolean
  isGridView, // boolean
  getGridColsClass, // () => string
} = useViewMode(4); // Mặc định 4 cột

// Sử dụng
changeView(3); // Đổi sang 3 cột
const gridClass = getGridColsClass(); // "grid-cols-3"

// Trong JSX
<div className={`grid ${getGridColsClass()}`}>{/* Products */}</div>;
```

---

### 5. **useSorting** - Quản lý sắp xếp

Quản lý sắp xếp sản phẩm.

```typescript
import { useSorting, type SortDirection } from "@/features/client/shop/hooks";

const {
  currentSort, // string: khóa sắp xếp
  sortDirection, // SortDirection: "asc" | "desc"
  isSortDropdownOpen, // boolean
  handleSortChange, // (key: string) => void
  toggleSortDirection, // () => void
  closeSortDropdown, // () => void
  openSortDropdown, // () => void
  toggleSortDropdown, // () => void
  resetSort, // () => void
} = useSorting("position");

// Sử dụng
handleSortChange("price"); // Đổi sắp xếp theo giá
toggleSortDirection(); // Đảo chiều sắp xếp
```

---

### 6. **useFilterAccordion** - Quản lý trạng thái accordion bộ lọc

Quản lý mở/đóng các bộ lọc.

```typescript
import { useFilterAccordion } from "@/features/client/shop/hooks";

const {
  isCategoryOpen,
  isSizeOpen,
  isColorOpen,
  isPriceOpen,
  isBrandOpen,
  isWishListOpen,
  toggleCategory,
  toggleSize,
  toggleColor,
  togglePrice,
  toggleBrand,
  toggleWishList,
  closeAll,
  openAll,
} = useFilterAccordion();

// Sử dụng
toggleCategory(); // Bật/tắt bộ lọc danh mục
closeAll(); // Đóng tất cả
```

---

## 🔧 SERVICES

### 1. **ProductService** - Xử lý sản phẩm

```typescript
import { ProductService } from "@/features/client/shop/services";

// Lọc sản phẩm
const filtered = ProductService.filterProducts(products, filters);

// Sắp xếp sản phẩm
const sorted = ProductService.sortProducts(
  products,
  "price", // khóa sắp xếp
  "asc" // chiều sắp xếp
);

// Tìm kiếm sản phẩm
const searchResults = ProductService.searchProducts(products, "áo");

// Kết hợp: lọc + sắp xếp + tìm kiếm
const processed = ProductService.processProducts(
  products,
  filters,
  "price",
  "asc",
  "áo"
);

// Lấy thống kê
const stats = ProductService.getProductStats(products);
// {
//   totalProducts: 100,
//   averagePrice: 250000,
//   minPrice: 50000,
//   maxPrice: 1000000,
//   highestRated: Product
// }
```

---

### 2. **FilterService** - Xử lý bộ lọc

```typescript
import { FilterService } from "@/features/client/shop/services";

// Kiểm tra bộ lọc hoạt động
const hasActive = FilterService.hasActiveFilters(filters, 10000, 1000000);

// Đếm bộ lọc hoạt động
const count = FilterService.getActiveFilterCount(filters);

// Format giá trị bộ lọc
const label = FilterService.formatFilterValue("price", { min: 100, max: 500 });

// Chuyển thành query string
const qs = FilterService.toQueryString(filters);
// "sizes=M,L&brands=Nike&minPrice=100&maxPrice=500"

// Phân tích query string
const parsed = FilterService.fromQueryString(qs, 10000, 1000000);

// So sánh bộ lọc
const isEqual = FilterService.isEqual(filters1, filters2);

// Tạo bản sao
const clone = FilterService.clone(filters);
```

---

### 3. **SortService** - Xử lý sắp xếp

```typescript
import { SortService } from "@/features/client/shop/services";

// Sắp xếp sản phẩm
const sorted = SortService.sortProducts(products, "price", "asc");

// Các khóa sắp xếp hỗ trợ:
// - "position"       (vị trí mặc định)
// - "price"          (giá)
// - "name"           (tên)
// - "rating"         (đánh giá)
// - "newest"         (mới nhất)
// - "best-selling"   (bán chạy nhất)
// - "discount"       (giảm giá)

// Lấy tiêu đề sắp xếp
const label = SortService.getSortLabel("price", "asc");
// "Giá (tăng dần)"

// Lấy ký hiệu chiều
const symbol = SortService.getDirectionSymbol("asc"); // "↑"
```

---

### 4. **PaginationService** - Xử lý phân trang

```typescript
import { PaginationService } from "@/features/client/shop/services";

// Tính toán phân trang
const pagination = PaginationService.calculatePagination(
  100, // totalItems
  2, // currentPage
  12 // itemsPerPage
);
// {
//   totalPages: 9,
//   startIndex: 12,
//   endIndex: 24,
//   currentItemsStart: 13,
//   currentItemsEnd: 24,
//   hasNextPage: true,
//   hasPrevPage: true,
//   totalItems: 100
// }

// Kiểm tra trang hợp lệ
const isValid = PaginationService.isValidPage(2, 9); // true

// Giới hạn trang
const limited = PaginationService.limitPage(15, 9); // 9

// Lấy mảng số trang để hiển thị
const pages = PaginationService.getPageNumbers(3, 10, 5);
// [1, 2, 3, 4, 5, null, 10]

// Lấy chuỗi hiển thị
const text = PaginationService.getDisplayText(13, 24, 100);
// "Hiển thị 13-24 trong số 100 sản phẩm"

// Tính offset cho API
const offset = PaginationService.getOffset(2, 12); // 12
```

---

## 📝 Ví dụ sử dụng kết hợp

```typescript
"use client";

import {
  useFilters,
  usePagination,
  useModal,
  useViewMode,
  useSorting,
  useFilterAccordion,
} from "@/features/client/shop/hooks";
import {
  ProductService,
  FilterService,
  SortService,
} from "@/features/client/shop/services";
import { generateProductList } from "@/features/client/shop/constants";

export default function ShopPage() {
  const productList = generateProductList();

  // Hooks
  const { filters, handleFilterChange, handleClearAll } = useFilters();
  const { currentPage, goToPage, startIndex, endIndex } = usePagination(
    productList.length,
    12
  );
  const { activeView, changeView, getGridColsClass } = useViewMode();
  const { currentSort, sortDirection, handleSortChange } = useSorting();
  const {
    isAddToCartModalOpen,
    selectedProduct,
    openAddToCartModal,
    closeAddToCartModal,
  } = useModal();

  // Xử lý sản phẩm
  let displayProducts = ProductService.processProducts(
    productList,
    filters,
    currentSort,
    sortDirection
  );

  const totalPages = Math.ceil(displayProducts.length / 12);
  displayProducts = displayProducts.slice(startIndex, endIndex);

  return (
    <div>
      {/* Filters */}
      <aside className="sidebar">
        {FilterService.hasActiveFilters(filters, 10000, 1000000) && (
          <button onClick={handleClearAll}>
            Xóa tất cả ({FilterService.getActiveFilterCount(filters)})
          </button>
        )}
      </aside>

      {/* Main Content */}
      <main>
        {/* View Mode Buttons */}
        <div>
          <button onClick={() => changeView(2)}>List</button>
          <button onClick={() => changeView(4)}>Grid 4</button>
        </div>

        {/* Sort Dropdown */}
        <div>
          <select onChange={(e) => handleSortChange(e.target.value)}>
            <option value="position">Position</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className={`grid ${getGridColsClass()}`}>
          {displayProducts.map((product) => (
            <div key={product.id}>
              <button onClick={() => openAddToCartModal(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i + 1} onClick={() => goToPage(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      </main>

      {/* AddToCart Modal */}
      {isAddToCartModalOpen && (
        <AddToCartModal
          product={selectedProduct}
          onClose={closeAddToCartModal}
        />
      )}
    </div>
  );
}
```

---

## 🎯 Best Practices

1. **Hooks**: Dùng cho component state
2. **Services**: Dùng cho logic xử lý data
3. **Kết hợp**: Hooks + Services = Clean Component

---

## 📂 File Structure

```
shop/
├── hooks/
│   ├── useFilters.ts
│   ├── usePagination.ts
│   ├── useModal.ts
│   ├── useViewMode.ts
│   ├── useSorting.ts
│   ├── useFilterAccordion.ts
│   └── index.ts
├── services/
│   ├── productService.ts
│   ├── filterService.ts
│   ├── sortService.ts
│   ├── paginationService.ts
│   └── index.ts
└── ...
```
