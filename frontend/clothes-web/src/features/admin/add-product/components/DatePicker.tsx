/**
 * Component date picker
 */

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps {
  // Dữ liệu
  selectedDate: string;
  currentMonth: number;
  currentYear: number;
  isOpen: boolean;

  // Hàm callback
  onDateSelect: (day: number) => void;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  onToggle: (open: boolean) => void;
}

const MONTH_NAMES = [
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

/**
 * Component DatePicker - Bộ chọn ngày tháng
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  currentMonth,
  currentYear,
  isOpen,
  onDateSelect,
  onMonthChange,
  onYearChange,
  onToggle,
}) => {
  // Tính số ngày trong tháng và ngày đầu tiên
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Xử lý chọn ngày
  const handleDateSelect = (day: number) => {
    onDateSelect(day);
  };

  // Xử lý tháng trước
  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      onMonthChange(11);
      onYearChange(currentYear - 1);
    } else {
      onMonthChange(currentMonth - 1);
    }
  };

  // Xử lý tháng sau
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      onMonthChange(0);
      onYearChange(currentYear + 1);
    } else {
      onMonthChange(currentMonth + 1);
    }
  };

  return (
    <div className="relative date-picker-container">
      <input
        type="text"
        placeholder="Nhập ngày xuất bản"
        value={selectedDate}
        onClick={() => onToggle(!isOpen)}
        readOnly
        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer transition-colors"
      />

      {/* Date Picker Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-3 sm:p-4 w-[calc(100vw-2rem)] sm:w-80 max-w-sm">
          {/* Month/Year Header */}
          <div className="flex items-center justify-between mb-3 sm:mb-4 bg-blue-500 text-white px-2 sm:px-3 py-2 rounded">
            <button
              onClick={handlePreviousMonth}
              className="p-1 hover:bg-blue-600 rounded transition-colors"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <div className="text-xs sm:text-sm font-semibold">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </div>
            <button
              onClick={handleNextMonth}
              className="p-1 hover:bg-blue-600 rounded transition-colors"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="mb-3 sm:mb-4">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2 bg-blue-500 text-white py-1 sm:py-2 rounded text-xs">
              {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
                <div key={day} className="text-center font-semibold">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before month starts */}
              {[...Array(firstDayOfMonth)].map((_, i) => (
                <div key={`empty-${i}`} className="p-2 text-center"></div>
              ))}

              {/* Days of month */}
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                return (
                  <button
                    key={day}
                    onClick={() => {
                      handleDateSelect(day);
                      onToggle(false);
                    }}
                    className="p-2 text-center rounded hover:bg-blue-100 text-xs sm:text-sm transition-colors"
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Picker */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 pt-3 sm:pt-4 border-t border-gray-200">
            <input
              type="number"
              min="1"
              max="12"
              defaultValue="12"
              className="w-12 sm:w-16 px-2 py-1 text-center border border-gray-300 rounded text-xs sm:text-sm"
            />
            <span className="text-sm sm:text-lg font-semibold">:</span>
            <input
              type="number"
              min="0"
              max="59"
              defaultValue="00"
              className="w-12 sm:w-16 px-2 py-1 text-center border border-gray-300 rounded text-xs sm:text-sm"
            />
            <select className="px-2 py-1 border border-gray-300 rounded text-xs sm:text-sm">
              <option>CH</option>
              <option>SA</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
