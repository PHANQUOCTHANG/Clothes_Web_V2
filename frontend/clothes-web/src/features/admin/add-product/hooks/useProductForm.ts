/**
 * Hook tùy chỉnh quản lý state form sản phẩm
 */

import { useState, useCallback } from "react";
import type { ProductFormData, FormErrors, ProductTag } from "../types";

interface UseProductFormReturn {
  // Form data
  formData: ProductFormData;
  tags: ProductTag[];

  // Errors
  errors: FormErrors;

  // UI state
  activeTab: "general" | "meta";
  showDatePicker: boolean;
  selectedDate: string;
  currentMonth: number;
  currentYear: number;
  isMobileMenuOpen: boolean;

  // Form actions
  setFormData: (data: ProductFormData) => void;
  handleInputChange: (field: keyof ProductFormData, value: string) => void;
  validateField: (field: keyof ProductFormData) => boolean;
  handleSubmit: () => boolean;
  handleTabChange: (tab: "general" | "meta") => void;
  handleValidateField: (field: keyof ProductFormData) => void;

  // Tags actions
  addTag: (tag: string) => void;
  removeTag: (tagId: string) => void;
  handleAddTag: (tag: string) => void;
  handleRemoveTag: (tagId: string) => void;

  // UI actions
  setActiveTab: (tab: "general" | "meta") => void;
  setShowDatePicker: (show: boolean) => void;
  setSelectedDate: (date: string) => void;
  setCurrentMonth: (month: number) => void;
  setCurrentYear: (year: number) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
  handleDateToggle: (show: boolean) => void;
  handleDateSelect: (day: number) => void;
  handleMonthChange: (month: number) => void;
  handleYearChange: (year: number) => void;
  handleMobileMenuToggle: () => void;
}

/**
 * Hook quản lý form thêm/chỉnh sửa sản phẩm
 */
export const useProductForm = (): UseProductFormReturn => {
  // ===== FORM STATE =====
  const [formData, setFormData] = useState<ProductFormData>({
    productTitle: "",
    manufacturerName: "",
    manufacturerBrand: "",
    stocks: "",
    price: "",
    discount: "",
    orders: "",
    shortDescription: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [tags, setTags] = useState<ProductTag[]>([{ id: "1", name: "Cotton" }]);

  // ===== UI STATE =====
  const [activeTab, setActiveTab] = useState<"general" | "meta">("general");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [currentMonth, setCurrentMonth] = useState(11); // Tháng 12 = 11
  const [currentYear, setCurrentYear] = useState(2025);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ===== FORM ACTIONS =====

  /**
   * Xử lý thay đổi input
   */
  const handleInputChange = useCallback(
    (field: keyof ProductFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Xóa lỗi khi người dùng nhập
      if (value.trim()) {
        setErrors((prev) => ({ ...prev, [field]: false }));
      }
    },
    []
  );

  /**
   * Validate một field
   */
  const validateField = useCallback(
    (field: keyof ProductFormData): boolean => {
      if (!formData[field] || !formData[field].trim()) {
        setErrors((prev) => ({ ...prev, [field]: true }));
        return false;
      }
      return true;
    },
    [formData]
  );

  /**
   * Submit form
   */
  const handleSubmit = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    // Validate all required fields
    Object.keys(formData).forEach((field) => {
      if (
        !formData[field as keyof ProductFormData] ||
        !formData[field as keyof ProductFormData].trim()
      ) {
        newErrors[field] = true;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted successfully:", formData);
      return true;
    }
    return false;
  }, [formData]);

  // ===== TAG ACTIONS =====

  /**
   * Thêm tag mới
   */
  const addTag = useCallback((tagName: string) => {
    if (tagName.trim()) {
      const newTag: ProductTag = {
        id: Date.now().toString(),
        name: tagName,
      };
      setTags((prev) => [...prev, newTag]);
    }
  }, []);

  /**
   * Xóa tag
   */
  const removeTag = useCallback((tagId: string) => {
    setTags((prev) => prev.filter((tag) => tag.id !== tagId));
  }, []);

  return {
    // Form data
    formData,
    tags,

    // Errors
    errors,

    // UI state
    activeTab,
    showDatePicker,
    selectedDate,
    currentMonth,
    currentYear,
    isMobileMenuOpen,

    // Form actions
    setFormData,
    handleInputChange,
    validateField,
    handleSubmit,
    handleTabChange: setActiveTab,
    handleValidateField: validateField,

    // Tags actions
    addTag,
    removeTag,
    handleAddTag: addTag,
    handleRemoveTag: removeTag,

    // UI actions
    setActiveTab,
    setShowDatePicker,
    setSelectedDate,
    setCurrentMonth,
    setCurrentYear,
    setIsMobileMenuOpen,
    handleDateToggle: setShowDatePicker,
    handleDateSelect: (day: number) => {
      const monthNames = [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ];
      const formattedDate = `${day} ${monthNames[currentMonth].slice(
        0,
        3
      )}, ${currentYear}`;
      setSelectedDate(formattedDate);
      setShowDatePicker(false);
    },
    handleMonthChange: setCurrentMonth,
    handleYearChange: setCurrentYear,
    handleMobileMenuToggle: () => setIsMobileMenuOpen((prev) => !prev),
  };
};
