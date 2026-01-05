import { IProduct, IColor } from "@/types/product";

/**
 * Product Detail Service
 * Handles formatting, calculations, and utilities for product display
 */
export class ProductDetailService {
  /**
   * Format price with Vietnamese currency
   */
  static formatPrice(price: number): string {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }

  /**
   * Calculate final price after discount
   */
  static calculateFinalPrice(price: number, discount: number = 0): number {
    if (discount < 0 || discount > 100) return price;
    return Math.round(price * (1 - discount / 100));
  }

  /**
   * Calculate savings amount
   */
  static calculateSavings(price: number, discount: number = 0): number {
    return Math.round(price * (discount / 100));
  }

  /**
   * Get rating label based on number of stars
   */
  static getRatingLabel(rating: number): string {
    if (rating >= 4.5) return "Tuyệt vời";
    if (rating >= 4) return "Rất tốt";
    if (rating >= 3) return "Tốt";
    if (rating >= 2) return "Bình thường";
    return "Không tốt";
  }

  /**
   * Check if product is in stock
   */
  static isInStock(stock: number): boolean {
    return stock > 0;
  }

  /**
   * Check if product stock is low
   */
  static isLowStock(stock: number, threshold: number = 5): boolean {
    return stock > 0 && stock <= threshold;
  }

  /**
   * Check if product is new
   */
  static isNew(createdAt: string, daysThreshold: number = 30): boolean {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const daysSinceCreated =
      (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceCreated <= daysThreshold;
  }

  /**
   * Get discount label
   */
  static getDiscountLabel(discount: number): string {
    if (discount === 0) return "";
    if (discount < 10) return `Giảm ${discount}%`;
    if (discount < 30) return `Khuyến mãi ${discount}%`;
    return `HOT DEAL -${discount}%`;
  }

  /**
   * Calculate cart total
   */
  static calculateCartTotal(
    price: number,
    quantity: number,
    discount: number = 0
  ): number {
    const finalPrice = this.calculateFinalPrice(price, discount);
    return finalPrice * quantity;
  }

  /**
   * Validate size
   */
  static validateSize(size: string, availableSizes: string[]): boolean {
    return availableSizes.includes(size);
  }

  /**
   * Validate color
   */
  static validateColor(color: string, availableColors: IColor[]): boolean {
    return availableColors.some((c) => c.name === color || c.code === color);
  }

  /**
   * Get product status label
   */
  static getStatusLabel(status: "active" | "inactive" | "pending"): string {
    const labels: Record<string, string> = {
      active: "Đang bán",
      inactive: "Tạm dừng",
      pending: "Chờ duyệt",
    };
    return labels[status] || status;
  }

  /**
   * Generate product share URLs
   */
  static getShareUrl(
    productId: string,
    productName: string
  ): Record<string, string> {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const productUrl = `${baseUrl}/products/${productId}`;
    const encodedUrl = encodeURIComponent(productUrl);
    const encodedName = encodeURIComponent(productName);

    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedName}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedName}%20${encodedUrl}`,
      copy: productUrl,
    };
  }

  /**
   * Get images array with fallback
   */
  static getProductImages(product: IProduct): string[] {
    return Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : ["/images/placeholder.png"];
  }

  /**
   * Get first image or placeholder
   */
  static getMainImage(product: IProduct): string {
    const images = this.getProductImages(product);
    return images[0];
  }

  /**
   * Format amountBuy number
   */
  static formatAmountBuy(amount: number): string {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`;
    }
    return amount.toString();
  }

  /**
   * Get stock status message
   */
  static getStockStatusMessage(stock: number): string {
    if (stock === 0) return "Hết hàng";
    if (stock <= 5) return `Chỉ còn ${stock} sản phẩm`;
    return "Còn hàng";
  }

  /**
   * Calculate rating percentage
   */
  static getRatingPercentage(rating: number): number {
    return Math.round((rating / 5) * 100);
  }
}
