# 🛒 Cart Feature - Hooks & Services Guide

## 📍 Vị trí sử dụng từng Hook/Service

### 1️⃣ **useCart** - Quản lý items

**Dùng ở:** Tất cả component liên quan đến thêm/xóa/cập nhật sản phẩm

| Vị trí                      | Thành phần        | Sử dụng                    |
| --------------------------- | ----------------- | -------------------------- |
| **[Cart Page](./page.tsx)** | `CartPageWrapper` | Quản lý toàn bộ items      |
| **CartItem Component**      | `CartItem.tsx`    | Nút + - để update quantity |
| **AddToCart Modal**         | `Modal`           | Thêm sản phẩm vào giỏ      |
| **Product Detail Page**     | Product Page      | Nút "Thêm vào giỏ hàng"    |

```tsx
// Ví dụ trong CartPageWrapper
const { cartItems, removeItem, updateQuantity, addItem } =
  useCart(SAMPLE_CART_ITEMS);
```

---

### 2️⃣ **useCartCalculations** - Tính toán giá

**Dùng ở:** OrderSummary component để hiển thị giá

| Vị trí                                                  | Thành phần        | Sử dụng                              |
| ------------------------------------------------------- | ----------------- | ------------------------------------ |
| **[Cart Page](./page.tsx)**                             | `CartPageWrapper` | Tính subtotal, tax, shipping, total  |
| **[OrderSummary](./components/OrderSummary.tsx)**       | Component         | Hiển thị tóm tắt đơn hàng            |
| **[FreeShippingBar](./components/FreeShippingBar.tsx)** | Component         | Hiển thị tiến độ miễn phí vận chuyển |

```tsx
// Ví dụ trong CartPageWrapper
const pricing = useCartCalculations(cartItems, {
  taxRate: 0.05,
  freeShippingThreshold: 200,
  shippingCost: 15,
});

// Sử dụng trong OrderSummary
<p>Tổng tiền: ${pricing.subtotal.toFixed(2)}</p>
<p>Vận chuyển: ${pricing.shipping.toFixed(2)}</p>
<p>Tổng cộng: ${pricing.total.toFixed(2)}</p>
```

---

### 3️⃣ **useCartFilters** - Filter/sort

**Dùng ở:** Search box & sort dropdown trong cart

| Vị trí                      | Thành phần                | Sử dụng                    |
| --------------------------- | ------------------------- | -------------------------- |
| **[Cart Page](./page.tsx)** | Có thể thêm search + sort | Tìm kiếm & sắp xếp items   |
| **CartItem List**           | Danh sách sản phẩm        | Hiển thị items đã filtered |

```tsx
// Ví dụ sử dụng (chưa được thêm vào page, có thể thêm)
const { filteredItems, setSortBy, setSearchTerm } = useCartFilters(cartItems);

// HTML
<input onChange={(e) => setSearchTerm(e.target.value)} placeholder="Tìm sản phẩm..."/>
<select onChange={(e) => setSortBy(e.target.value)}>
  <option value="newest">Mới nhất</option>
  <option value="price">Giá</option>
</select>

// Hiển thị filteredItems thay vì cartItems
{filteredItems.map(item => ...)}
```

---

### 4️⃣ **useCartPersistence** - Lưu localStorage

**Dùng ở:** Tự động save/restore giỏ hàng

| Vị trí                      | Thành phần        | Sử dụng                   |
| --------------------------- | ----------------- | ------------------------- |
| **[Cart Page](./page.tsx)** | `CartPageWrapper` | Auto-save & Auto-restore  |
| **App Root**                | `layout.tsx`      | Restore cart khi load app |

```tsx
// Ví dụ trong CartPageWrapper
const { saveCart, loadCart, hasPersistedCart } = useCartPersistence(cartItems, {
  storageKey: "cart_items",
  enableAutoSave: true, // Tự động lưu khi thay đổi
  enableAutoRestore: true, // Tự động tải khi load
});

// Load khi component mount
useEffect(() => {
  if (hasPersistedCart) {
    const saved = loadCart();
    if (saved?.length > 0) {
      saved.forEach((item) => addItem(item));
    }
  }
}, [hasPersistedCart, loadCart, addItem]);
```

---

### 5️⃣ **useCartUI** - Quản lý UI state

**Dùng ở:** Mở/đóng modal, loading state, error handling

| Vị trí                                                      | Thành phần        | Sử dụng                  |
| ----------------------------------------------------------- | ----------------- | ------------------------ |
| **[Cart Page](./page.tsx)**                                 | `CartPageWrapper` | Quản lý modal state      |
| **[ShoppingCartModal](./components/ShoppingCartModal.tsx)** | Modal Component   | Mở/đóng modal            |
| **Header/Navbar**                                           | Cart Icon         | Nút toggle giỏ hàng      |
| **Loading/Error**                                           | UI                | Hiển thị loading & error |

```tsx
// Ví dụ trong CartPageWrapper
const { isCartOpen, toggleCart, error, isLoading } = useCartUI();

// HTML
<button onClick={toggleCart}>🛒 Giỏ hàng</button>;

{
  isCartOpen && (
    <div className="cart-modal">
      {isLoading && <p>Đang tải...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* Cart content */}
    </div>
  );
}
```

---

## 🛠️ Services Usage

### **PricingService** - Tính giá

**Dùng ở:** Bất kỳ nơi cần tính/format giá

```tsx
import { PricingService } from "@/features/client/cart/services";

// Parse giá từ string
const price = PricingService.parsePrice("$29.99"); // → 29.99

// Format giá
const formatted = PricingService.formatPrice(29.99); // → "$29.99"

// Áp dụng discount
const discounted = PricingService.applyDiscount(100, 20); // → 80

// Tính tax
const tax = PricingService.calculateTax(100, 0.05); // → 5

// Tính total
const result = PricingService.calculateTotal({
  subtotal: 100,
  taxRate: 0.05,
  shippingCost: 15,
  freeShippingThreshold: 200,
});
```

---

### **PromocodeService** - Xử lý mã khuyến mãi

**Dùng ở:** Promo code input form

```tsx
import { PromocodeService } from "@/features/client/cart/services";

// Validate promo code
const validation = PromocodeService.validatePromoCode("SUMMER20", 150);
if (validation.isValid) {
  alert(validation.message); // "Áp dụng mã "SUMMER20" - Tiết kiệm $30"
} else {
  alert(validation.error); // "Mã khuyến mãi không tồn tại"
}

// Lấy tất cả active promo codes
const activePromos = PromocodeService.getAllActivePromoCodes();
```

**Promo codes có sẵn:**

- `SUMMER20`: 20% off (min $50)
- `FREESHIP`: $15 off (min $100)
- `WELCOME10`: 10% off

---

### **CartStorageService** - Lưu trữ

**Dùng ở:** Backup/restore cart

```tsx
import { CartStorageService } from "@/features/client/cart/services";

// Lưu
CartStorageService.saveItems(cartItems, "cart_backup");

// Tải
const saved = CartStorageService.loadItems("cart_backup");

// Backup thành file
CartStorageService.backupToFile(cartItems, "my-cart.json");

// Restore từ file
const restored = await CartStorageService.restoreFromFile();
```

---

## 📋 Current Implementation in Cart Page

```tsx
function CartPageWrapper() {
  // 1️⃣ Manage items
  const { cartItems, isEmpty, totalItems, updateQuantity, removeItem } =
    useCart(SAMPLE_CART_ITEMS);

  // 2️⃣ Calculate pricing
  const pricing = useCartCalculations(cartItems, {
    taxRate: 0.05,
    freeShippingThreshold: 200,
    shippingCost: 15,
  });

  // 3️⃣ Save to localStorage
  const { saveCart, loadCart, hasPersistedCart } = useCartPersistence(
    cartItems,
    {
      storageKey: "cart_items",
      enableAutoSave: true,
      enableAutoRestore: true,
    }
  );

  // 4️⃣ UI state
  const { isCartOpen, error, setError } = useCartUI();

  // Load from storage on mount
  useEffect(() => {
    if (hasPersistedCart) {
      const saved = loadCart();
      if (saved?.length > 0) {
        saved.forEach((item) => addItem(item));
      }
    }
  }, [hasPersistedCart, loadCart, addItem]);

  return <CartPage {...allProps} />;
}
```

---

## 🎯 Các Component đã dùng hooks

| Component             | Hook dùng        | Mục đích               |
| --------------------- | ---------------- | ---------------------- |
| CartPageWrapper       | Tất cả (5 hooks) | Quản lý toàn bộ logic  |
| CartItem              | useCart          | Update quantity        |
| OrderSummary          | Pricing props    | Hiển thị giá           |
| FreeShippingBar       | Pricing props    | Hiển thị miễn phí ship |
| (Potential) Search    | useCartFilters   | Tìm kiếm sản phẩm      |
| (Potential) PromoForm | PromocodeService | Nhập mã khuyến mãi     |

---

## ✨ Có thể thêm sau:

```tsx
// 1️⃣ Thêm search & sort vào cart page
const { filteredItems, setSortBy } = useCartFilters(cartItems);

// 2️⃣ Thêm promo code input
const handleApplyPromo = () => {
  const validation = PromocodeService.validatePromoCode(
    promoCode,
    pricing.subtotal
  );
  // ...
};

// 3️⃣ Thêm backup/restore buttons
const handleBackup = () => {
  CartStorageService.backupToFile(cartItems, "cart-backup.json");
};
```

---

## 📚 File Documentation

- **[HOOKS_SERVICES_USAGE.md](./HOOKS_SERVICES_USAGE.md)** - Ví dụ code chi tiết
- **[hooks/index.ts](./hooks/index.ts)** - Export tất cả hooks
- **[services/index.ts](./services/index.ts)** - Export tất cả services
