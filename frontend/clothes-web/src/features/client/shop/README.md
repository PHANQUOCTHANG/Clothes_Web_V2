# Shop Feature - Clean Architecture

## ✅ Hoàn thành - Refactoring to Clean Architecture

Đã refactor Shop feature theo Clean Architecture + Feature-based structure:

### 📋 Architecture Layers

```
shop/
├── services/
│   ├── shopApiService.ts          (Pure API Gateway)
│   ├── productService.ts          (Pure Utils/Logic)
│   └── filterService.ts           (Pure Utils/Logic)
│
├── hooks/
│   ├── useShopProducts.ts         (Query Hooks)
│   ├── useShopPage.ts             (Compose Hook)
│   ├── useFilters.ts              (UI State - No API)
│   ├── useSorting.ts              (UI State - No API)
│   ├── useViewMode.ts             (UI State - No API)
│   ├── usePagination.ts           (UI State - No API)
│   ├── useModal.ts                (UI State - No API)
│   ├── useFilterAccordion.ts      (UI State - No API)
│   └── index.ts                   (Exports)
│
├── components/
│   ├── filters/
│   ├── products/
│   └── ... (All Presentational)
│
└── constants.ts
```

### 🔄 Data Flow (One-Way Architecture)

```
Page
  ↓
Compose Hook (useShopPage) - kết hợp tất cả state
  ├─ Query Hook (useShopProducts) - fetch từ API
  │   └─ API Service (shopApiService) - HTTP calls
  ├─ UI Hooks (useFilters, useSorting, etc.) - no API
  └─ Utils (productService) - pure functions
  ↓
Page nhận cleaned data
  ↓
Render Components (presentational only)
```

### 📦 Key Files

**1. shopApiService.ts** (Pure API Gateway)

- `getProducts()` - Lấy sản phẩm với filter
- `getProductsByCategory()` - Lấy theo danh mục
- `searchProducts()` - Tìm kiếm
- ✅ No React, No Hooks, No Logic

**2. useShopProducts.ts** (Query Hooks)

- `useShopProducts()` - fetch với filter
- `useShopProductsByCategory()` - fetch theo category
- `useShopSearchProducts()` - search
- ✅ Gọi service, manage cache/loading/error

**3. useShopPage.ts** (Compose Hook)

```typescript
// Workflow:
// 1. Fetch products (useShopProducts)
// 2. UI & Filter state (useFilters, useSorting, etc.)
// 3. Process: filter + sort data
// 4. Paginate results
// 5. Sync URL (searchParams)
// 6. Restore filters from URL on load
```

- ✅ Combines tất cả hooks
- ✅ No direct API calls
- ✅ Returns cleaned data for page

**4. Page (shop/page.tsx)**

- ✅ Gọi duy nhất: `useShopPage()`
- ✅ Render components với data từ hook
- ✅ Zero business logic

### ✨ Benefits

1. **Testable** - Mỗi layer có responsibility rõ ràng
2. **Reusable** - Services/Hooks có thể dùng ở nhiều nơi
3. **Maintainable** - Dễ trace data flow
4. **Scalable** - Thêm feature không ảnh hưởng cũ
5. **Clean** - No mixed concerns

### 📝 Vietnamese Comments

Tất cả files đã có Vietnamese comments:

- shopApiService.ts - Comment HTTP calls
- useShopProducts.ts - Comment query keys + hooks
- useShopPage.ts - Numbered workflow (1-6)
- Mỗi section rõ ràng, dễ hiểu- Quản lý modal (AddToCart, QuickView)
- `openAddToCartModal()` / `closeAddToCartModal()`
- `openQuickViewModal()` / `closeQuickViewModal()`
- `closeAllModals()` - Đóng tất cả

### 4. **useViewMode**

- Quản lý chế độ xem (danh sách, grid 2/3/4/5 cột)
- `changeView()` - Thay đổi chế độ xem
- `getGridColsClass()` - Lấy class Tailwind
- `isListView` / `isGridView` - Flags

### 5. **useSorting**

- Quản lý sắp xếp
- `handleSortChange()` - Đổi cách sắp xếp
- `toggleSortDirection()` - Đảo chiều
- `toggleSortDropdown()` - Mở/đóng dropdown

### 6. **useFilterAccordion**

- Quản lý mở/đóng bộ lọc
- `toggleCategory()` / `toggleSize()` ... - Toggle từng loại
- `closeAll()` / `openAll()` - Tất cả bộ lọc

---

## 🔧 SERVICES (4 services)

### 1. **ProductService**

```typescript
// Lọc sản phẩm theo bộ lọc
filterProducts(products, filters);

// Sắp xếp sản phẩm
sortProducts(products, sortKey, direction);

// Tìm kiếm sản phẩm
searchProducts(products, query);

// Kết hợp lọc + sắp xếp + tìm kiếm
processProducts(products, filters, sortKey, direction, query);

// Lấy thống kê
getProductStats(products);
```

### 2. **FilterService**

```typescript
// Kiểm tra bộ lọc hoạt động
hasActiveFilters(filters, minPrice, maxPrice);

// Đếm bộ lọc hoạt động
getActiveFilterCount(filters);

// Format giá trị
formatFilterValue(type, value);

// Chuyển <-> query string
toQueryString(filters);
fromQueryString(qs, minPrice, maxPrice);

// So sánh và sao chép
isEqual(filters1, filters2);
clone(filters);
```

### 3. **SortService**

```typescript
// Sắp xếp sản phẩm
sortProducts(products, sortKey, direction);

// Các khóa hỗ trợ:
// - position (vị trí)
// - price (giá)
// - name (tên)
// - rating (đánh giá)
// - newest (mới nhất)
// - best-selling (bán chạy nhất)
// - discount (giảm giá)

// Lấy label
getSortLabel(sortKey, direction);

// Lấy ký hiệu
getDirectionSymbol(direction);
```

### 4. **PaginationService**

```typescript
// Tính toán phân trang
calculatePagination(totalItems, currentPage, itemsPerPage);

// Kiểm tra trang hợp lệ
isValidPage(page, totalPages);

// Giới hạn trang
limitPage(page, totalPages);

// Lấy mảng số trang
getPageNumbers(currentPage, totalPages, maxVisible);

// Text hiển thị
getDisplayText(start, end, total);

// Tính offset
getOffset(page, itemsPerPage);
```

---

## 💡 Key Features

✅ **Tách biệt Concerns**

- Hooks: State management
- Services: Business logic
- Components: Presentation

✅ **Reusable**

- Dùng lại được trong nhiều component
- Không phụ thuộc vào UI

✅ **Type-safe**

- Full TypeScript support
- IntelliSense hỗ trợ

✅ **Performance**

- useCallback tối ưu
- Tránh re-render không cần thiết

✅ **Maintainable**

- Code sạch, dễ hiểu
- Tài liệu chi tiết

---

## 🚀 Usage Example

```typescript
import {
  useFilters,
  usePagination,
  useModal,
  useViewMode,
  useSorting,
} from "@/features/client/shop/hooks";
import {
  ProductService,
  FilterService,
  SortService,
} from "@/features/client/shop/services";

export default function ShopPage() {
  const { filters, handleFilterChange } = useFilters();
  const { currentPage, goToPage } = usePagination(100, 12);
  const { activeView, changeView } = useViewMode(4);
  const { currentSort, sortDirection } = useSorting();

  // Xử lý sản phẩm
  let products = ProductService.processProducts(
    allProducts,
    filters,
    currentSort,
    sortDirection
  );

  return <div>{/* Filters, Sorting, View Mode, Products, Pagination */}</div>;
}
```

---

## 📚 Documentation

File chi tiết: `HOOKS_SERVICES.md`

---

## 🎯 Next Steps

1. Cập nhật `page.tsx` sử dụng hooks & services
2. Tạo API service để fetch từ backend
3. Thêm unit tests cho hooks & services
4. Tối ưu hóa performance
