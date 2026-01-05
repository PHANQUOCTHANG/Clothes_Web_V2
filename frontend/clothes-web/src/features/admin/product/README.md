# Quản Lý Sản Phẩm (Product Management) - Admin Module

## 📁 Cấu Trúc Thư Mục

```
src/features/admin/product/
├── components/          # Các component React tái sử dụng
│   ├── ActionDropdown.tsx        # Menu hành động (Xem, Sửa, Xóa)
│   ├── FilterSidebar.tsx         # Thanh lọc desktop
│   ├── MobileFilters.tsx         # Drawer lọc cho mobile
│   ├── ProductsTable.tsx         # Bảng hiển thị danh sách sản phẩm
│   ├── ProductHeader.tsx         # Header trang
│   ├── ProductTopBar.tsx         # Thanh công cụ và tabs
│   ├── Pagination.tsx            # Điều khiển phân trang
│   ├── ActiveFiltersBar.tsx      # Hiển thị bộ lọc đang hoạt động (mobile)
│   └── index.ts                  # Export tập trung
├── hooks/               # Custom React hooks
│   ├── useProductFilters.ts      # Hook quản lý state bộ lọc
│   └── index.ts                  # Export tập trung
├── types/               # TypeScript interfaces và types
│   └── index.ts                  # Định nghĩa kiểu dữ liệu
└── services/           # Placeholder cho API services (future)
```

## 🧩 Kiến Trúc Và Design Pattern

### 1. **Tách Component (Component Separation)**

- Mỗi component có một chResponsibility duy nhất
- Dễ dàng test, maintain và tái sử dụng
- Giảm dependency giữa các component

### 2. **Hook Custom (useProductFilters)**

- Quản lý toàn bộ logic về bộ lọc
- Đơn giản hóa main component
- Dễ share state giữa components

### 3. **Typed Props Interface**

- TypeScript interfaces cho mỗi component
- Type-safe props validation
- Better IDE autocomplete

### 4. **Separation of Concerns**

- **page.tsx**: Orchestration, main layout, data pass
- **components/**: UI rendering
- **hooks/**: Business logic
- **types/**: Data structure definitions

## 📝 Component Documentation

### ActionDropdown

Menu hành động cho mỗi sản phẩm (Xem, Sửa, Xóa)

```typescript
<ActionDropdown
  productId={1}
  onActionClick={(id, action) => console.log(id, action)}
/>
```

### FilterSidebar

Thanh lọc desktop đầy đủ với giá, thương hiệu, danh mục...

```typescript
<FilterSidebar
  categories={CATEGORIES}
  onCategorySelect={setSelectedCategory}
  onPriceChange={setPriceRange}
  // ... other props
/>
```

### ProductsTable

Bảng hiển thị sản phẩm với responsive design

```typescript
<ProductsTable
  products={paginatedProducts}
  openActionMenu={openActionMenu}
  onActionMenuToggle={setOpenActionMenu}
  onActionClick={handleActionClick}
/>
```

### MobileFilters

Drawer bộ lọc cho mobile (full functional)

### ProductTopBar

Thanh công cụ: Thêm sản phẩm, tìm kiếm, tabs trạng thái

### Pagination

Điều khiển phân trang với thông tin trang

### ActiveFiltersBar

Hiển thị bộ lọc đang hoạt động (mobile only)

### ProductHeader

Header với breadcrumb và nút bộ lọc mobile

## 🎯 Các Tính Năng

✅ Hiển thị danh sách sản phẩm  
✅ Tìm kiếm sản phẩm  
✅ Lọc theo: Giá, Thương hiệu, Danh mục, Giảm giá, Đánh giá  
✅ Tab trạng thái: Tất cả, Đã xuất bản, Nháp  
✅ Phân trang  
✅ Responsive design (Desktop + Mobile)  
✅ Menu hành động (Xem, Sửa, Xóa)

## 💡 Code Patterns

### Prop Drilling Reduction

```typescript
// Sử dụng hook để giảm prop drilling
const { selectedBrands, toggleBrand } = useProductFilters();
```

### Callback Function Naming

```typescript
// Naming convention: on + Action
onCategorySelect = { setSelectedCategory };
onActionClick = { handleActionClick };
onPageChange = { setCurrentPage };
```

### TypeScript Best Practices

```typescript
// Sử dụng type để explicit
const [activeTab, setActiveTab] = useState<"all" | "published" | "draft">(
  "all"
);

// Props interfaces
interface ProductsTableProps {
  products: Product[];
  onActionClick: (id: number, action: ProductAction) => void;
}
```

## 🔄 State Management Flow

```
page.tsx (Main)
    ├─ useProductFilters() ────► Hook state
    │   └─ Filter logic
    │
    ├─ Local states
    │   ├─ activeTab
    │   ├─ openActionMenu
    │   ├─ currentPage
    │   └─ showMobileFilters
    │
    └─ Pass to Components
        ├─ ProductHeader
        ├─ FilterSidebar
        ├─ MobileFilters
        ├─ ProductTopBar
        ├─ ProductsTable
        ├─ Pagination
        └─ ActiveFiltersBar
```

## 🚀 Hướng Dẫn Phát Triển

### Thêm Component Mới

1. Tạo file `.tsx` trong `components/`
2. Định nghĩa TypeScript interface cho props
3. Thêm comment tiếng Việt
4. Export từ `components/index.ts`
5. Import và sử dụng trong `page.tsx`

### Thêm Filter Mới

1. Thêm vào `DISCOUNT_OPTIONS` hoặc `RATING_OPTIONS` trong `page.tsx`
2. Thêm state trong `useProductFilters` hook
3. Cập nhật filter logic

### Intergrate API

1. Tạo service file trong `services/`
2. Replace mock data `PRODUCTS` bằng API call
3. Thêm loading/error states

## 📦 Dependencies

- React 18+
- TypeScript
- Tailwind CSS
- lucide-react (icons)

## ✨ Code Quality

- ✅ TypeScript strict mode
- ✅ Vietnamese comments for important parts
- ✅ Clean component structure
- ✅ Proper prop typing
- ✅ Semantic HTML

## 📌 Ghi Chú

- Tất cả component sử dụng `'use client'` (Next.js 13+ App Router)
- Comment tiếng Việt cho các phần quan trọng
- Mỗi component có header comment giải thích chức năng
- Type definitions tập trung trong `types/index.ts`
