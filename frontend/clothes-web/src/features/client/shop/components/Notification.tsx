"use client";

import { useState, useEffect } from "react";
import { Check, AlertCircle } from "lucide-react";

export type NotificationType = "success" | "error";

interface NotificationProps {
  message: string;
  type: NotificationType;
  duration?: number;
  onClose?: () => void;
}

export const Notification = ({
  message,
  type,
  duration = 3000,
  onClose,
}: NotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-9999 animate-in fade-in slide-in-from-top-2 duration-300">
      <div
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg ${
          type === "success"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        {type === "success" ? <Check size={20} /> : <AlertCircle size={20} />}
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
};
