/**
 * Component textarea với validation và đếm ký tự
 */

import React from "react";
import { Check } from "lucide-react";

interface FormTextareaProps {
  // Dữ liệu
  label: string;
  placeholder: string;
  value: string;
  minLength?: number;
  error?: boolean;
  errorMessage?: string;

  // Hàm callback
  onChange: (value: string) => void;
}

/**
 * Component FormTextarea - Textarea với đếm ký tự
 */
export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  placeholder,
  value,
  minLength = 100,
  error = false,
  errorMessage,
  onChange,
}) => {
  const getInputClassName = () => {
    const baseClass =
      "w-full px-3 py-2.5 text-sm rounded focus:outline-none transition-colors duration-200 resize-none";

    if (error) {
      return `${baseClass} border-2 border-red-500`;
    }
    if (value && value.length >= minLength) {
      return `${baseClass} border-2 border-green-500`;
    }
    return `${baseClass} border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`;
  };

  const isValid = value && value.length >= minLength;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
        {label}
      </label>

      <div className="relative">
        <textarea
          placeholder={placeholder}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={getInputClassName()}
        />
      </div>

      {/* Character count */}
      <div className="flex justify-between items-center mt-1">
        <span
          className={`text-xs ${isValid ? "text-green-600" : "text-gray-500"}`}
        >
          {value.length}/{minLength} ký tự
        </span>
        {isValid && <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />}
      </div>

      {/* Error Message */}
      {error && errorMessage && (
        <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
      )}
    </div>
  );
};
