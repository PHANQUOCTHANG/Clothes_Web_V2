import React from "react";
import { motion } from "framer-motion";
import { getPasswordStrength } from "@/features/auth/constants/constantsAuth";

interface PasswordStrengthMeterProps {
  password: string;
}

// eslint-disable-next-line react/display-name
const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = React.memo(
  ({ password }) => {
    if (!password) {
      return null;
    }

    const { score, level, color } = getPasswordStrength(password);
    const widthPercent = Math.min(score, 100);

    return (
      <motion.div
        className="w-full mt-1.5"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Độ mạnh:</span>
          <span
            className={`font-semibold ${
              password.length === 0 ? "text-gray-400" : "text-gray-800"
            }`}
          >
            {level}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1 mt-1 overflow-hidden">
          <motion.div
            className={`h-1 rounded-full ${color}`}
            initial={{ width: 0 }}
            animate={{ width: `${widthPercent}%` }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        </div>
      </motion.div>
    );
  }
);

export default PasswordStrengthMeter;
