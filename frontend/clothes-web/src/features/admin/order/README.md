# Order Management Module

Module này quản lý tính năng quản lý đơn hàng. Được refactor thành các component riêng biệt, dễ bảo trì và tái sử dụng.

## Cấu trúc Folder

```
order/
├── components/
│   ├── OrderHeader.tsx           # Header với breadcrumb
│   ├── OrderTabs.tsx             # Tab navigation theo status
│   ├── OrderTopBar.tsx           # Search bar và create button
│   ├── OrdersTable.tsx           # Bảng hiển thị đơn hàng
│   ├── OrderPagination.tsx       # Phân trang
│   ├── SelectionBar.tsx          # Thanh hành động cho đơn đã chọn
│   ├── OrderModals.tsx           # Modal tạo/chỉnh sửa/xóa
│   └── index.ts                  # Export tất cả components
├── hooks/
│   ├── useOrders.ts              # Custom hook quản lý state
│   └── index.ts                  # Export hooks
├── types/
│   └── index.ts                  # TypeScript interfaces
└── README.md                     # Documentation này
```

## Components

### OrderHeader

Header của trang quản lý đơn hàng.

**Props:**

- `onMenuToggle: (open: boolean) => void` - Callback mobile menu
- `isMobileMenuOpen: boolean` - Trạng thái menu

**Features:**

- Breadcrumb: Thương mại điện tử › Đơn hàng
- Hamburger menu cho mobile

### OrderTabs

Tab navigation theo status đơn hàng.

**Props:**

- `activeTab: OrderTab` - Tab đang active
- `onTabChange: (tab: OrderTab) => void` - Callback khi switch tab
- `filteredOrders: Order[]` - Danh sách đơn hàng sau lọc

**Tabs:**

- Tất cả đơn hàng
- Đã giao
- Chờ lấy hàng
- Trả hàng
- Đã hủy

### OrderTopBar

Thanh tìm kiếm và các button hành động.

**Props:**

- `searchTerm: string` - Từ tìm kiếm
- `onSearchChange: (term: string) => void` - Callback search
- `onShowFiltersToggle: () => void` - Toggle filters
- `onAddOrder: () => void` - Tạo đơn hàng mới

**Features:**

- Search khách hàng
- Nút tạo đơn hàng
- Nút nhập file
- Toggle filter cho mobile

### OrdersTable

Bảng hiển thị danh sách đơn hàng.

**Props:**

- `orders: Order[]` - Danh sách đơn hàng
- `selectedOrders: string[]` - Mảng ID đơn được chọn
- `onToggleSelect: (orderId: string) => void` - Toggle select 1 dơn
- `onSelectAll: () => void` - Select/deselect tất cả
- `onEdit: (order: Order) => void` - Edit đơn hàng
- `onDelete: (order: Order) => void` - Xóa đơn hàng

**Features:**

- Checkbox select
- Hiển thị tất cả thông tin đơn (ID, khách, sản phẩm, ngày, tiền, thanh toán, status)
- Nút edit/delete
- Status badges với màu khác nhau

### OrderPagination

Component phân trang.

**Props:**

- `currentPage: number` - Trang hiện tại
- `totalPages: number` - Tổng số trang
- `startIndex: number` - Index bắt đầu
- `endIndex: number` - Index kết thúc
- `totalItems: number` - Tổng số item
- `onPageChange: (page: number) => void` - Callback page change

**Features:**

- Nút Previous/Next
- Số trang
- Hiển thị range item

### SelectionBar

Thanh hành động cho các đơn đã chọn.

**Props:**

- `selectedCount: number` - Số đơn được chọn
- `onPrint: () => void` - In đơn hàng
- `onDeleteSelected: () => void` - Xóa đơn đã chọn

**Features:**

- Hiển thị số lượng đơn chọn
- Nút in
- Nút xóa

### OrderModal

Modal để tạo/chỉnh sửa đơn hàng.

**Props:**

- `isOpen: boolean` - Trạng thái mở/đóng
- `isEdit: boolean` - Chế độ edit hay create
- `selectedOrder?: Order | null` - Đơn hàng đang edit
- `onClose: () => void` - Callback đóng modal
- `onSubmit: () => void` - Callback submit

**Fields:**

- Mã đơn hàng (read-only khi edit)
- Tên khách hàng
- Sản phẩm (select)
- Ngày đặt hàng
- Số tiền
- Phương thức thanh toán
- Trạng thái giao hàng

### DeleteModal

Modal xác nhận xóa đơn hàng.

**Props:**

- `isOpen: boolean` - Trạng thái mở/đóng
- `selectedOrder: Order | null` - Đơn hàng chuẩn bị xóa
- `onClose: () => void` - Callback cancel
- `onConfirm: () => void` - Callback xác nhận xóa

## Custom Hook: useOrders

Hook quản lý toàn bộ state cho trang quản lý đơn hàng.

### State Variables

```typescript
orders: Order[]                  // Danh sách tất cả đơn hàng
filteredOrders: Order[]         // Đơn hàng sau lọc
selectedOrders: string[]        // ID đơn được chọn

filters: OrderFilters           // State filter
activeTab: OrderTab             // Tab đang active

datePickerState: DatePickerState // State date picker
modals: ModalState              // State modal
isMobileMenuOpen: boolean       // Menu mobile
showFilters: boolean            // Hiển thị filter
```

### Methods

```typescript
// Filter actions
handleSearchChange(term); // Thay đổi từ tìm kiếm
handleTabChange(tab); // Đổi tab
handleStatusFilterChange(status); // Lọc theo status
handlePaymentFilterChange(payment); // Lọc theo payment
handleDateFromChange(date); // Từ ngày
handleDateToChange(date); // Đến ngày
clearFilters(); // Clear tất cả filter

// Selection actions
toggleSelectOrder(orderId); // Toggle select 1 đơn
selectAllOrders(orders); // Select/deselect tất cả
clearSelection(); // Clear selection

// Date picker actions
handleDatePickerToggle(); // Toggle date picker
handleDateSelect(day); // Chọn ngày
handleMonthChange(month); // Đổi tháng
handleYearChange(year); // Đổi năm

// Modal actions
openAddModal(); // Mở modal tạo
closeAddModal(); // Đóng modal tạo
openEditModal(order); // Mở modal edit
closeEditModal(); // Đóng modal edit
openDeleteModal(order); // Mở modal delete
closeDeleteModal(); // Đóng modal delete

// UI actions
setIsMobileMenuOpen(open); // Toggle mobile menu
setShowFilters(show); // Toggle show filters
```

## Type Definitions

### Order

```typescript
{
  id: string; // Mã đơn hàng (#VZ12)
  customer: string; // Tên khách hàng
  product: string; // Tên sản phẩm
  date: string; // Ngày đặt hàng
  time: string; // Giờ đặt hàng
  amount: string; // Số tiền
  payment: PaymentMethod; // Phương thức thanh toán
  status: OrderStatus; // Trạng thái
}
```

### OrderStatus

```typescript
"ĐÃ HỦY" | "ĐÃ GIAO" | "ĐANG XỬ LÝ" | "CHỜ LẤY HÀNG" | "TRẢ HÀNG";
```

### OrderTab

```typescript
"all" | "delivered" | "pickups" | "returns" | "cancelled";
```

## Usage

### Basic Example

```tsx
import OrdersPage from "@/app/admin/(main)/order/page";

export default function Page() {
  return <OrdersPage />;
}
```

### Using Individual Components

```tsx
import { OrderHeader, OrderTabs, useOrders } from "@/features/admin/order";

export default function CustomPage() {
  const orderState = useOrders();

  return (
    <>
      <OrderHeader {...orderState} />
      <OrderTabs {...orderState} />
    </>
  );
}
```

## Design Patterns

### Component Composition

Các component lớn được chia nhỏ thành component chuyên dụng:

- OrderTopBar: Search + action buttons
- OrderTabs: Tab navigation
- OrdersTable: Table display
- OrderPagination: Pagination controls

### Custom Hook for State

`useOrders` tập trung tất cả logic state, filters, modals vào 1 chỗ.

### Responsive Design

- Mobile-first approach
- Tailwind breakpoints (sm:, lg:)
- Conditional rendering cho mobile/desktop

### Mock Data

Hook sử dụng mock data `MOCK_ORDERS` để demo. Sau này có thể replace với API calls.

## Features

- ✅ Danh sách đơn hàng với pagination
- ✅ Lọc theo status (tabs)
- ✅ Tìm kiếm khách hàng
- ✅ Select multiple orders
- ✅ Tạo đơn hàng mới
- ✅ Chỉnh sửa đơn hàng
- ✅ Xóa đơn hàng
- ✅ In đơn hàng (placeholder)
- ✅ Responsive design
- ✅ Mobile-friendly UI

## Future Improvements

- [ ] API integration cho CRUD operations
- [ ] Export/Import đơn hàng
- [ ] Advanced filters (date range, amount range)
- [ ] Batch operations (change status, print)
- [ ] Order detail page
- [ ] Order tracking
- [ ] Email notifications
- [ ] Inventory sync

## Development Notes

- Tất cả components sử dụng `React.FC` interface
- Vietnamese comments trên complex logic
- Tailwind CSS cho styling
- Lucide React cho icons
- Mock data sử dụng `MOCK_ORDERS` constant
