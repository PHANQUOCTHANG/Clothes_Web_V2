/\*\*

- 📚 CART HOOKS & SERVICES - USAGE GUIDE
- =========================================
-
- Hướng dẫn chi tiết cách sử dụng các hooks và services trong cart feature
  \*/

/\*\*

- ============================================
- 1.  useCart - Quản lý items trong giỏ
- ============================================
-
- Dùng để: Thêm, xóa, cập nhật số lượng sản phẩm trong giỏ hàng
-
- Các hàm:
- - addItem(item): Thêm sản phẩm vào giỏ
- - removeItem(id): Xóa sản phẩm khỏi giỏ
- - updateQuantity(id, quantity): Cập nhật số lượng
- - clearCart(): Xóa tất cả sản phẩm
- - getItemById(id): Lấy thông tin sản phẩm
-
- Ví dụ sử dụng:
  \*/
  // --------- EXAMPLE 1: useCart --------
  import { useCart } from "@/features/client/cart/hooks";

export function CartExample() {
const {
cartItems, // Mảng các sản phẩm trong giỏ
isEmpty, // Boolean: giỏ có trống không?
totalItems, // Tổng số lượng sản phẩm
addItem, // Hàm thêm sản phẩm
removeItem, // Hàm xóa sản phẩm
updateQuantity, // Hàm cập nhật số lượng
clearCart, // Hàm xóa tất cả
getItemById, // Hàm lấy chi tiết sản phẩm
} = useCart();

// Thêm sản phẩm
const handleAddToCart = () => {
addItem({
id: "1",
name: "Áo thun",
price: "$29.99",
quantity: 1,
image: "image.jpg",
});
};

// Cập nhật số lượng
const handleUpdateQuantity = (id: string, newQty: number) => {
updateQuantity(id, newQty);
};

// Xóa sản phẩm
const handleRemove = (id: string) => {
removeItem(id);
};

// Hiển thị danh sách
return (
<div>
<p>Tổng sản phẩm: {totalItems}</p>
{isEmpty ? (
<p>Giỏ hàng trống</p>
) : (
<div>
{cartItems.map((item) => (
<div key={item.id}>
<span>{item.name} x {item.quantity}</span>
<button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
<button onClick={() => handleRemove(item.id)}>Xóa</button>
</div>
))}
</div>
)}
</div>
);
}

/\*\*

- ============================================
- 2.  useCartCalculations - Tính toán giá
- ============================================
-
- Dùng để: Tính subtotal, tax, shipping, total
-
- Return:
- - subtotal: Tổng tiền hàng
- - tax: Tiền thuế
- - shipping: Tiền vận chuyển
- - total: Tổng cộng
- - isFreeShipping: Có được miễn phí vận chuyển?
- - remainingForFreeShip: Cần thêm bao nhiêu để miễn phí vận chuyển
-
- Ví dụ sử dụng:
  \*/
  // --------- EXAMPLE 2: useCartCalculations --------
  import { useCartCalculations } from "@/features/client/cart/hooks";

export function PricingExample() {
const { cartItems } = useCart();

// Tính toán giá với các thông số
const pricing = useCartCalculations(cartItems, {
taxRate: 0.05, // 5% tax
freeShippingThreshold: 200, // Miễn phí vận chuyển khi >= $200
shippingCost: 15, // Phí vận chuyển = $15
});

return (
<div className="order-summary">
<p>Tổng tiền: ${pricing.subtotal.toFixed(2)}</p>
<p>Thuế: ${pricing.tax.toFixed(2)}</p>
<p>Vận chuyển: ${pricing.shipping.toFixed(2)}</p>
<p style={{ fontWeight: "bold" }}>Tổng cộng: ${pricing.total.toFixed(2)}</p>

      {!pricing.isFreeShipping && (
        <p style={{ color: "red" }}>
          Thêm ${pricing.remainingForFreeShip.toFixed(2)} để được miễn phí vận chuyển
        </p>
      )}
    </div>

);
}

/\*\*

- ============================================
- 3.  useCartFilters - Filter/sort giỏ hàng
- ============================================
-
- Dùng để: Tìm kiếm, sắp xếp sản phẩm trong giỏ
-
- Sắp xếp theo:
- - name: Tên sản phẩm (A-Z)
- - price: Giá (từ thấp đến cao)
- - quantity: Số lượng
- - newest: Sản phẩm mới nhất
-
- Ví dụ sử dụng:
  \*/
  // --------- EXAMPLE 3: useCartFilters --------
  import { useCartFilters } from "@/features/client/cart/hooks";

export function SearchFilterExample() {
const { cartItems } = useCart();
const {
filteredItems, // Danh sách đã lọc/sắp xếp
sortBy, // Tiêu chí sắp xếp hiện tại
sortOrder, // Thứ tự (asc/desc)
searchTerm, // Từ tìm kiếm
setSortBy, // Thay đổi tiêu chí sắp xếp
setSortOrder, // Thay đổi thứ tự
setSearchTerm, // Cập nhật từ tìm kiếm
resetFilters, // Xóa tất cả filter
} = useCartFilters(cartItems);

return (
<div>
{/_ Tìm kiếm _/}
<input
type="text"
placeholder="Tìm sản phẩm..."
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
/>

      {/* Sắp xếp */}
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="newest">Mới nhất</option>
        <option value="name">Tên (A-Z)</option>
        <option value="price">Giá</option>
        <option value="quantity">Số lượng</option>
      </select>

      <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
        {sortOrder === "asc" ? "↑" : "↓"}
      </button>

      <button onClick={resetFilters}>Xóa filter</button>

      {/* Hiển thị danh sách đã lọc */}
      <div>
        {filteredItems.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </div>

);
}

/\*\*

- ============================================
- 4.  useCartPersistence - Lưu trữ localStorage
- ============================================
-
- Dùng để: Tự động lưu/tải giỏ hàng từ localStorage
-
- Features:
- - Auto-save: Tự động lưu khi giỏ hàng thay đổi
- - Auto-restore: Tự động tải khi component mount
- - Expiry time: Có thể set thời gian hết hạn
-
- Ví dụ sử dụng:
  \*/
  // --------- EXAMPLE 4: useCartPersistence --------
  import { useCartPersistence } from "@/features/client/cart/hooks";

export function PersistenceExample() {
const { cartItems } = useCart();
const {
isLoading, // Đang load từ storage?
saveCart, // Hàm lưu thủ công
loadCart, // Hàm tải thủ công
clearCartStorage, // Xóa từ storage
hasPersistedCart, // Có cart lưu trước đó?
} = useCartPersistence(cartItems, {
storageKey: "my_cart", // Key để lưu
enableAutoSave: true, // Tự động lưu
enableAutoRestore: true, // Tự động tải
});

if (isLoading) return <div>Đang tải giỏ hàng...</div>;

return (
<div>
{hasPersistedCart && <p>✓ Giỏ hàng đã được lưu</p>}

      <button onClick={() => saveCart(cartItems)}>
        Lưu giỏ hàng
      </button>
      <button onClick={clearCartStorage}>
        Xóa dữ liệu
      </button>
    </div>

);
}

/\*\*

- ============================================
- 5.  useCartUI - Quản lý UI state
- ============================================
-
- Dùng để: Quản lý trạng thái UI (modal, loading, error)
-
- Features:
- - Modal mở/đóng
- - Loading state
- - Error message
- - View type (mini/list/modal)
-
- Ví dụ sử dụng:
  \*/
  // --------- EXAMPLE 5: useCartUI --------
  import { useCartUI } from "@/features/client/cart/hooks";

export function CartUIExample() {
const {
isCartOpen, // Giỏ hàng đang mở?
cartView, // Loại view (mini/list/modal)
isLoading, // Đang load?
error, // Error message
openCart, // Mở giỏ hàng
closeCart, // Đóng giỏ hàng
toggleCart, // Toggle giỏ hàng
setCartView, // Đổi view type
setIsLoading, // Set loading state
setError, // Set error message
clearError, // Xóa error
} = useCartUI();

return (
<div>
{/_ Header - Nút mở giỏ _/}
<button onClick={toggleCart}>
🛒 Giỏ hàng {isCartOpen && "▼" || "▶"}
</button>

      {/* Modal Giỏ Hàng */}
      {isCartOpen && (
        <div className="cart-modal">
          {isLoading && <p>Đang tải...</p>}

          {error && (
            <div className="error">
              <p>{error}</p>
              <button onClick={clearError}>Đóng</button>
            </div>
          )}

          {!isLoading && !error && (
            <div>
              <p>Giỏ hàng của bạn</p>
            </div>
          )}

          <button onClick={closeCart}>Đóng</button>
        </div>
      )}
    </div>

);
}

/\*\*

- ============================================
- 6.  SERVICES - Hàm tiện ích
- ============================================
  \*/

/\*\*

- 6.1 PricingService - Tính toán giá
- Dùng ở: Anywhere cần tính giá
  \*/
  // --------- EXAMPLE 6: PricingService --------
  import { PricingService } from "@/features/client/cart/services";

export function PricingServiceExample() {
// Parse giá từ string
const price1 = PricingService.parsePrice("$29.99"); // → 29.99

// Format giá
const formatted = PricingService.formatPrice(29.99); // → "$29.99"

// Áp dụng discount
const discounted = PricingService.applyDiscount(100, 20); // → 80 (20% off)

// Tính tax
const tax = PricingService.calculateTax(100, 0.05); // → 5

// Tính shipping
const shipping = PricingService.calculateShipping(150, 200, 15); // → 15 (chưa đủ free ship)

// Tính tổng
const result = PricingService.calculateTotal({
subtotal: 100,
taxRate: 0.05,
shippingCost: 15,
freeShippingThreshold: 200,
});
// → { subtotal: 100, tax: 5, shipping: 15, discount: 0, total: 120 }

return (
<div>
<p>Giá gốc: {formatted}</p>
<p>Sau giảm: ${discounted}</p>
<p>Tổng: ${result.total}</p>
</div>
);
}

/\*\*

- 6.2 PromocodeService - Xử lý mã khuyến mãi
- Dùng ở: Khi người dùng nhập promo code
  \*/
  // --------- EXAMPLE 7: PromocodeService --------
  import { PromocodeService } from "@/features/client/cart/services";

export function PromocodeExample() {
const [promoCode, setPromoCode] = React.useState("");
const [discount, setDiscount] = React.useState(0);

const handleApplyPromo = () => {
// Validate promo code
const validation = PromocodeService.validatePromoCode(promoCode, 150);

    if (validation.isValid) {
      setDiscount(validation.discount || 0);
      alert(validation.message);  // "Áp dụng mã "SUMMER20" - Tiết kiệm $30"
    } else {
      alert(validation.error);  // "Mã khuyến mãi không tồn tại"
    }

};

// Lấy tất cả promo code active
const activePromos = PromocodeService.getAllActivePromoCodes();

return (
<div>
<input
value={promoCode}
onChange={(e) => setPromoCode(e.target.value)}
placeholder="Nhập mã khuyến mãi"
/>
<button onClick={handleApplyPromo}>Áp dụng</button>
<p>Tiết kiệm: ${discount.toFixed(2)}</p>

      <div className="promo-list">
        {activePromos.map((promo) => (
          <div key={promo.code}>
            {promo.code}: {promo.description}
          </div>
        ))}
      </div>
    </div>

);
}

/\*\*

- 6.3 CartStorageService - Lưu trữ localStorage
- Dùng ở: Backup/restore cart
  \*/
  // --------- EXAMPLE 8: CartStorageService --------
  import { CartStorageService } from "@/features/client/cart/services";

export function StorageServiceExample() {
const { cartItems } = useCart();

// Lưu items
const handleSaveCart = () => {
const success = CartStorageService.saveItems(cartItems, "my_cart");
if (success) alert("Giỏ hàng đã được lưu");
};

// Tải items
const handleLoadCart = () => {
const saved = CartStorageService.loadItems("my_cart");
if (saved) {
// Load saved items vào giỏ
saved.forEach((item) => addItem(item));
}
};

// Backup thành file
const handleBackup = () => {
CartStorageService.backupToFile(cartItems, "my-cart-backup.json");
};

// Restore từ file
const handleRestore = async () => {
const restored = await CartStorageService.restoreFromFile();
if (restored) {
restored.forEach((item) => addItem(item));
}
};

return (
<div>
<button onClick={handleSaveCart}>💾 Lưu giỏ hàng</button>
<button onClick={handleLoadCart}>📂 Tải giỏ hàng</button>
<button onClick={handleBackup}>📥 Backup</button>
<button onClick={handleRestore}>📤 Restore</button>
</div>
);
}

/\*\*

- ============================================
- COMPLETE EXAMPLE - SỬ DỤNG TẤT CẢ HOOKS
- ============================================
  \*/
  export function CompleteCartExample() {
  // 1. Quản lý items
  const { cartItems, isEmpty, totalItems, updateQuantity, removeItem } =
  useCart();

// 2. Tính toán giá
const pricing = useCartCalculations(cartItems, {
taxRate: 0.05,
freeShippingThreshold: 200,
shippingCost: 15,
});

// 3. Filter/sort
const { filteredItems, setSortBy } = useCartFilters(cartItems);

// 4. Lưu trữ
const { hasPersistedCart } = useCartPersistence(cartItems);

// 5. UI state
const { isCartOpen, toggleCart, error } = useCartUI();

return (
<div className="cart-page">
<button onClick={toggleCart}>
🛒 Giỏ ({totalItems}) {isCartOpen && "▼" || "▶"}
</button>

      {isCartOpen && (
        <div className="cart-content">
          {isEmpty ? (
            <p>Giỏ hàng trống</p>
          ) : (
            <>
              {/* Danh sách sản phẩm */}
              <div>
                <select onChange={(e) => setSortBy(e.target.value)}>
                  <option value="newest">Mới nhất</option>
                  <option value="price">Giá</option>
                </select>

                {filteredItems.map((item) => (
                  <div key={item.id}>
                    <span>{item.name}</span>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                    />
                    <button onClick={() => removeItem(item.id)}>Xóa</button>
                  </div>
                ))}
              </div>

              {/* Tóm tắt đơn hàng */}
              <div className="summary">
                <p>Tổng tiền: ${pricing.subtotal.toFixed(2)}</p>
                <p>Thuế: ${pricing.tax.toFixed(2)}</p>
                <p>Vận chuyển: ${pricing.shipping.toFixed(2)}</p>
                <p style={{ fontWeight: "bold" }}>
                  Tổng: ${pricing.total.toFixed(2)}
                </p>
              </div>

              {hasPersistedCart && <p>✓ Đã lưu</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}
            </>
          )}
        </div>
      )}
    </div>

);
}
