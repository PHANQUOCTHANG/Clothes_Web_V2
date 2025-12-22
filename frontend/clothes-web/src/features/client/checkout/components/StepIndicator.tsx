import React from "react";
import { ChevronRight, Check } from "lucide-react";

interface StepProps {
  currentStep: number;
  targetStep: number;
  label: string;
  isLast?: boolean;
}

const StepIndicator: React.FC<StepProps> = ({ currentStep, targetStep, label, isLast }) => {
  const isCompleted = currentStep > targetStep;
  const isActive = currentStep === targetStep;

  return (
    <div className="flex items-center gap-2">
      <div className={`
        w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500
        ${isCompleted || isActive ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 text-gray-400"}
      `}>
        {isCompleted ? <Check size={14} strokeWidth={3} /> : targetStep}
      </div>
      <span className={`text-[10px] font-black uppercase tracking-widest hidden sm:block ${isActive ? "text-gray-900" : "text-gray-400"}`}>
        {label}
      </span>
      {!isLast && <ChevronRight size={14} className="mx-2 text-gray-300 hidden sm:block" />}
    </div>
  );
};

export default StepIndicator;