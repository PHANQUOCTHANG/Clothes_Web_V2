/**
 * Service xử lý promo codes và discount
 */
export interface PromoCode {
  code: string;
  discountAmount: number;
  discountPercent?: number;
  minOrderValue: number;
  maxUses: number;
  usedCount: number;
  expiryDate: Date;
  description: string;
}

export interface PromoValidation {
  isValid: boolean;
  error?: string;
  discount?: number;
  message?: string;
}

export class PromocodeService {
  // Mock database của promo codes
  private static mockPromoCodes: Map<string, PromoCode> = new Map([
    [
      "SUMMER20",
      {
        code: "SUMMER20",
        discountPercent: 20,
        discountAmount: 0,
        minOrderValue: 50,
        maxUses: 100,
        usedCount: 45,
        expiryDate: new Date("2025-12-31"),
        description: "Summer sale - 20% off",
      },
    ],
    [
      "FREESHIP",
      {
        code: "FREESHIP",
        discountAmount: 15,
        minOrderValue: 100,
        maxUses: 500,
        usedCount: 200,
        expiryDate: new Date("2025-12-31"),
        description: "Free shipping on orders over $100",
      },
    ],
    [
      "WELCOME10",
      {
        code: "WELCOME10",
        discountPercent: 10,
        discountAmount: 0,
        minOrderValue: 0,
        maxUses: 1000,
        usedCount: 750,
        expiryDate: new Date("2025-12-31"),
        description: "Welcome discount - 10% off",
      },
    ],
  ]);

  /**
   * Validate promo code
   */
  static validatePromoCode(code: string, subtotal: number): PromoValidation {
    const upperCode = code.toUpperCase().trim();

    // Check if code exists
    if (!this.mockPromoCodes.has(upperCode)) {
      return {
        isValid: false,
        error: "Mã khuyến mãi không tồn tại",
      };
    }

    const promoCode = this.mockPromoCodes.get(upperCode)!;

    // Check expiry date
    if (new Date() > promoCode.expiryDate) {
      return {
        isValid: false,
        error: "Mã khuyến mãi đã hết hạn",
      };
    }

    // Check max uses
    if (promoCode.usedCount >= promoCode.maxUses) {
      return {
        isValid: false,
        error: "Mã khuyến mãi đã được sử dụng hết",
      };
    }

    // Check min order value
    if (subtotal < promoCode.minOrderValue) {
      return {
        isValid: false,
        error: `Đơn hàng tối thiểu $${promoCode.minOrderValue}`,
      };
    }

    // Calculate discount
    const discount = this.calculateDiscount(subtotal, promoCode);

    return {
      isValid: true,
      discount,
      message: `Áp dụng mã "${upperCode}" - Tiết kiệm $${discount.toFixed(2)}`,
    };
  }

  /**
   * Tính discount từ promo code
   */
  static calculateDiscount(subtotal: number, promoCode: PromoCode): number {
    if (promoCode.discountPercent) {
      return (
        Math.round(((subtotal * promoCode.discountPercent) / 100) * 100) / 100
      );
    }
    return promoCode.discountAmount;
  }

  /**
   * Get promo code details
   */
  static getPromoCode(code: string): PromoCode | null {
    return this.mockPromoCodes.get(code.toUpperCase()) || null;
  }

  /**
   * Get all active promo codes
   */
  static getAllActivePromoCodes(): PromoCode[] {
    const now = new Date();
    return Array.from(this.mockPromoCodes.values()).filter((promo) => {
      return now <= promo.expiryDate && promo.usedCount < promo.maxUses;
    });
  }

  /**
   * Apply multiple promo codes
   */
  static applyMultiplePromoCodes(
    codes: string[],
    subtotal: number
  ): {
    validCodes: string[];
    invalidCodes: string[];
    totalDiscount: number;
    messages: string[];
  } {
    const validCodes: string[] = [];
    const invalidCodes: string[] = [];
    const messages: string[] = [];
    let totalDiscount = 0;

    codes.forEach((code) => {
      const validation = this.validatePromoCode(code, subtotal);
      if (validation.isValid) {
        validCodes.push(code.toUpperCase());
        totalDiscount += validation.discount || 0;
        if (validation.message) {
          messages.push(validation.message);
        }
      } else {
        invalidCodes.push(code.toUpperCase());
        if (validation.error) {
          messages.push(`${code}: ${validation.error}`);
        }
      }
    });

    return {
      validCodes,
      invalidCodes,
      totalDiscount,
      messages,
    };
  }

  /**
   * Check if promo code is stackable
   */
  static isStackable(code: string): boolean {
    // In reality, some codes are not stackable
    const nonStackableCodes = ["FREESHIP"];
    return !nonStackableCodes.includes(code.toUpperCase());
  }

  /**
   * Get promo code type
   */
  static getPromoType(code: string): "percent" | "fixed" | null {
    const promoCode = this.getPromoCode(code);
    if (!promoCode) return null;
    return promoCode.discountPercent ? "percent" : "fixed";
  }
}
