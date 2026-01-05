# Add Product Module

Module này quản lý tính năng thêm sản phẩm mới. Nó được refactor thành các component riêng biệt, dễ bảo trì và tái sử dụng.

## Cấu trúc Folder

```
add-product/
├── components/
│   ├── AddProductHeader.tsx      # Header với breadcrumb và mobile menu
│   ├── AddProductForm.tsx        # Main form component (title, description, gallery, etc.)
│   ├── AddProductSidebar.tsx     # Sidebar (publish, schedule, categories, tags)
│   ├── MobileBottomNav.tsx       # Mobile bottom navigation
│   ├── FormInputField.tsx        # Reusable input component với validation
│   ├── FormTextarea.tsx          # Reusable textarea với character counter
│   ├── DatePicker.tsx            # Calendar component
│   └── index.ts                  # Export tất cả components
├── hooks/
│   ├── useProductForm.ts         # Custom hook quản lý form state
│   └── index.ts                  # Export hooks
├── types/
│   └── index.ts                  # TypeScript interfaces
└── README.md                     # Documentation này
```

## Components

### AddProductHeader

Header của trang thêm sản phẩm với breadcrumb navigation.

**Props:**

- `onMenuToggle: (open: boolean) => void` - Callback khi click hamburger menu (mobile)
- `isMobileMenuOpen: boolean` - Trạng thái menu mobile

**Features:**

- Breadcrumb: Thương mại điện tử › Tạo sản phẩm
- Hamburger menu cho mobile
- Responsive layout

### AddProductForm

Main form component chứa tất cả form fields.

**Props:**

- `activeTab: TabType` - Tab active (general | meta)
- `formData: ProductFormData` - Dữ liệu form
- `errors: FormErrors` - Trạng thái lỗi validation
- `onTabChange: (tab: TabType) => void` - Callback khi switch tab
- `onInputChange: (field: string, value: string) => void` - Callback khi input thay đổi
- `onValidateField: (field: string) => void` - Callback để validate field
- `onSubmit: () => void` - Callback submit form

**Sections:**

1. **Product Title** - Tiêu đề sản phẩm (required)
2. **Product Description** - Mô tả sản phẩm (rich text editor simulation)
3. **Product Gallery** - Thêm hình ảnh chính và thư viện
4. **Tabs Section** - Thông tin chung (General) & Meta Data
5. **Manufacturer Fields** - Tên & thương hiệu nhà sản xuất
6. **Pricing Section** - Stocks, Price, Discount, Orders

### AddProductSidebar

Sidebar chứa tùy chọn xuất bản sản phẩm.

**Props:**

- `selectedDate: string` - Ngày xuất bản đã chọn
- `currentMonth: number` - Tháng hiện tại (0-11)
- `currentYear: number` - Năm hiện tại
- `showDatePicker: boolean` - Trạng thái hiển thị date picker
- `tags: ProductTag[]` - Mảng thẻ sản phẩm
- `shortDescription: string` - Mô tả ngắn
- Các callback functions để xử lý user actions

**Sections:**

1. **Publish** - Chọn trạng thái (Published, Draft, Pending) & visibility
2. **Publish Schedule** - Chọn ngày & giờ xuất bản
3. **Product Categories** - Chọn danh mục sản phẩm
4. **Product Tags** - Manage thẻ sản phẩm
5. **Short Description** - Mô tả ngắn (min 100 characters)

### MobileBottomNav

Fixed bottom navigation cho mobile devices.

**Props:**

- `onSubmit: (status: 'draft' | 'published') => void` - Callback submit form
- `onScrollToTop: () => void` - Callback scroll to top
- `isLoading?: boolean` - Loading state

**Features:**

- Scroll to top button
- Save (draft) button
- Publish button
- Fixed position ở bottom

### FormInputField

Reusable input component với validation states.

**Props:**

- `label: string` - Label của input
- `placeholder: string` - Placeholder text
- `value: string` - Input value
- `error: boolean` - Trạng thái lỗi
- `errorMessage?: string` - Thông báo lỗi
- `prefix?: string` - Prefix ($, %, etc.)
- `onChange: (value: string) => void` - Callback onChange
- `onBlur?: () => void` - Callback onBlur

**Validation States:**

- ❌ Error: Border đỏ + AlertCircle icon + error message
- ✅ Success: Border xanh lá + Check icon
- Default: Border xám + blue ring khi focus

### FormTextarea

Reusable textarea component với character counter.

**Props:**

- `label: string` - Label
- `placeholder: string` - Placeholder
- `value: string` - Textarea value
- `minLength?: number` - Minimum characters (default: 100)
- `error?: boolean` - Error state
- `errorMessage?: string` - Error message
- `onChange: (value: string) => void` - Callback onChange

**Features:**

- Character counter
- Min-length validation
- Success checkmark khi đạt minimum
- Responsive rows

### DatePicker

Calendar component để chọn ngày & giờ.

**Props:**

- `selectedDate: string` - Ngày đã chọn (DD Mon, YYYY)
- `currentMonth: number` - Tháng hiện tại (0-11)
- `currentYear: number` - Năm hiện tại
- `isOpen: boolean` - Trạng thái mở/đóng
- `onDateSelect: (day: number) => void` - Callback chọn ngày
- `onMonthChange: (month: number) => void` - Callback khi switch tháng
- `onYearChange: (year: number) => void` - Callback khi switch năm
- `onToggle: (open: boolean) => void` - Callback toggle mở/đóng

**Features:**

- Lịch with previous/next month navigation
- Grid-based day selection
- Time picker (hours:minutes:AM/PM)
- Responsive sizing
- Click outside to close

## Custom Hook: useProductForm

Hook này quản lý toàn bộ form state cho trang thêm sản phẩm.

### State Variables

```typescript
formData: ProductFormData         // 8 form fields
tags: ProductTag[]               // Mảng thẻ
errors: FormErrors               // Trạng thái lỗi
activeTab: TabType              // Tab active
showDatePicker: boolean         // Date picker visibility
selectedDate: string            // Ngày đã chọn
currentMonth: number            // Tháng
currentYear: number             // Năm
isMobileMenuOpen: boolean       // Mobile menu state
```

### Methods

```typescript
handleInputChange(field, value); // Cập nhật form field
handleTabChange(tab); // Switch tab
handleValidateField(field); // Validate single field
handleSubmit(); // Validate tất cả & return boolean
handleAddTag(tag); // Thêm thẻ
handleRemoveTag(id); // Xóa thẻ
handleDateToggle(show); // Toggle date picker
handleDateSelect(day); // Chọn ngày
handleMonthChange(month); // Thay đổi tháng
handleYearChange(year); // Thay đổi năm
handleMobileMenuToggle(); // Toggle mobile menu
```

## Type Definitions

### ProductFormData

```typescript
{
  productTitle: string;
  manufacturerName: string;
  manufacturerBrand: string;
  stocks: string;
  price: string;
  discount: string;
  orders: string;
  shortDescription: string;
}
```

### FormErrors

```typescript
{
  [key: string]: boolean
}
```

### ProductTag

```typescript
{
  id: string;
  name: string;
}
```

### TabType

```typescript
"general" | "meta";
```

## Usage

### Basic Example

```tsx
import { AddProductPage } from "@/features/admin/add-product";

export default function Page() {
  return <AddProductPage />;
}
```

### Using Individual Components

```tsx
import {
  AddProductForm,
  AddProductSidebar,
  useProductForm,
} from "@/features/admin/add-product";

export default function CustomPage() {
  const formState = useProductForm();

  return (
    <div className="grid grid-cols-3 gap-6">
      <AddProductForm {...formState} />
      <AddProductSidebar {...formState} />
    </div>
  );
}
```

## Validation Rules

### Required Fields

- Product Title: Không được để trống
- Manufacturer Name: Không được để trống
- Manufacturer Brand: Không được để trống
- Stocks: Không được để trống
- Price: Không được để trống
- Orders: Không được để trống
- Short Description: Tối thiểu 100 ký tự

### Optional Fields

- Discount: Có thể bỏ trống

## Design Patterns

### 1. Component Composition

Các component lớn được chia nhỏ thành các component chuyên dụng:

- `AddProductForm` sử dụng `FormInputField` & `FormTextarea`
- `AddProductSidebar` sử dụng `DatePicker` & `FormTextarea`

### 2. Custom Hook for State Management

`useProductForm` tập trung tất cả logic state & validation vào một place duy nhất.

### 3. Responsive Design

- Mobile-first approach với Tailwind breakpoints
- Conditional rendering: `lg:hidden` cho mobile, `hidden lg:flex` cho desktop
- Flexible grid: `grid-cols-1 lg:grid-cols-3`

### 4. TypeScript Interfaces

Mọi component đều có proper TypeScript interfaces cho props.

## Best Practices

1. **Validation**: Luôn validate field khi người dùng blur hoặc submit
2. **Error Messages**: Hiển thị lỗi spesifik cho user
3. **Accessibility**: Sử dụng semantic HTML & ARIA labels
4. **Performance**: Sử dụng React.memo cho components không cần re-render
5. **Code Organization**: Tách concerns (UI, Logic, Types)

## Future Improvements

- [ ] Add API integration cho product submission
- [ ] Add image upload/preview functionality
- [ ] Add rich text editor integration
- [ ] Add category management UI
- [ ] Add form state persistence (localStorage)
- [ ] Add undo/redo functionality
- [ ] Add draft auto-save feature

## Development Notes

- Tất cả components sử dụng `React.FC` interface
- Vietnamese comments trên important/complex logic
- Tailwind CSS cho styling
- Lucide React cho icons
- Custom hooks cho state management
