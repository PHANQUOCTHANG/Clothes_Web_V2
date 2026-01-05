/**
 * Component input field với validation
 */

import React from "react";
import { AlertCircle, Check } from "lucide-react";

interface FormInputFieldProps {
  // Dữ liệu
  label: string;
  placeholder: string;
  value: string;
  error?: boolean;
  errorMessage?: string;
  prefix?: string;

  // Hàm callback
  onChange: (value: string) => void;
  onBlur?: () => void;
}

/**
 * Component FormInputField - Input field với status validation
 */
export const FormInputField: React.FC<FormInputFieldProps> = ({
  label,
  placeholder,
  value,
  error = false,
  errorMessage,
  prefix,
  onChange,
  onBlur,
}) => {
  const getInputClassName = () => {
    const baseClass =
      "w-full px-3 py-2.5 text-sm rounded focus:outline-none transition-colors duration-200";

    if (error) {
      return `${baseClass} border-2 border-red-500`;
    }
    if (value && value.trim()) {
      return `${baseClass} border-2 border-green-500`;
    }
    return `${baseClass} border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`;
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
        {label}
      </label>

      <div className="relative">
        {/* Prefix (nếu có) */}
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs sm:text-sm">
            {prefix}
          </span>
        )}

        {/* Input */}
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={`${getInputClassName()} ${prefix ? "pl-6 sm:pl-7" : ""}`}
        />

        {/* Error Icon */}
        {error && (
          <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
        )}

        {/* Success Icon */}
        {value && value.trim() && !error && (
          <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
        )}
      </div>

      {/* Error Message */}
      {error && errorMessage && (
        <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
      )}
    </div>
  );
};
