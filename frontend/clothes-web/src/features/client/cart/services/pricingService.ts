/**
 * Service xử lý giá và tính toán trong giỏ hàng
 */
export class PricingService {
  /**
   * Parse giá từ string format
   */
  static parsePrice(priceStr: string): number {
    const cleaned = priceStr.replace(/[$,]/g, "");
    return parseFloat(cleaned) || 0;
  }

  /**
   * Format giá thành string
   */
  static formatPrice(price: number, currency: string = "$"): string {
    return `${currency}${price.toFixed(2)}`;
  }

  /**
   * Tính giá sau discount
   */
  static applyDiscount(price: number, discountPercent: number): number {
    const discountAmount = (price * discountPercent) / 100;
    return Math.round((price - discountAmount) * 100) / 100;
  }

  /**
   * Tính discountAmount
   */
  static calculateDiscount(
    originalPrice: number,
    discountPercent: number
  ): number {
    return Math.round(((originalPrice * discountPercent) / 100) * 100) / 100;
  }

  /**
   * Tính tax
   */
  static calculateTax(subtotal: number, taxRate: number = 0.05): number {
    return Math.round(subtotal * taxRate * 100) / 100;
  }

  /**
   * Tính shipping cost
   */
  static calculateShipping(
    subtotal: number,
    freeShippingThreshold: number = 200,
    shippingCost: number = 15
  ): number {
    return subtotal >= freeShippingThreshold ? 0 : shippingCost;
  }

  /**
   * Tính subtotal từ items
   */
  static calculateSubtotal(
    items: Array<{ price: string | number; quantity: number }>
  ): number {
    return items.reduce((sum, item) => {
      const price =
        typeof item.price === "string"
          ? this.parsePrice(item.price)
          : item.price;
      return sum + price * item.quantity;
    }, 0);
  }

  /**
   * Tính tổng giá trị giỏ hàng
   */
  static calculateTotal(options: {
    subtotal: number;
    taxRate?: number;
    shippingCost?: number;
    discountCode?: number;
    freeShippingThreshold?: number;
  }): {
    subtotal: number;
    tax: number;
    shipping: number;
    discount: number;
    total: number;
  } {
    const {
      subtotal,
      taxRate = 0.05,
      shippingCost = 15,
      discountCode = 0,
      freeShippingThreshold = 200,
    } = options;

    const tax = this.calculateTax(subtotal, taxRate);
    const shipping = this.calculateShipping(
      subtotal,
      freeShippingThreshold,
      shippingCost
    );
    const discount = discountCode;

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      tax,
      shipping,
      discount,
      total: Math.round((subtotal + tax + shipping - discount) * 100) / 100,
    };
  }

  /**
   * Tính giá cuối cùng cho item
   */
  static getItemFinalPrice(
    price: number,
    quantity: number,
    discount: number = 0
  ): number {
    const finalPrice = this.applyDiscount(price, discount);
    return finalPrice * quantity;
  }

  /**
   * Validate price
   */
  static isValidPrice(price: number): boolean {
    return !isNaN(price) && price >= 0;
  }

  /**
   * So sánh 2 giá
   */
  static comparePrices(
    price1: number,
    price2: number
  ): {
    difference: number;
    percentChange: number;
    isExpensive: "first" | "second" | "equal";
  } {
    const diff = price1 - price2;
    const percentChange = price1 !== 0 ? (diff / price1) * 100 : 0;

    return {
      difference: Math.abs(diff),
      percentChange: Math.abs(percentChange),
      isExpensive: diff > 0 ? "first" : diff < 0 ? "second" : "equal",
    };
  }
}
