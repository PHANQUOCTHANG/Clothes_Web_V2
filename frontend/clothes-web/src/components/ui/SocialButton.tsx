// File: src/components/ui/SocialButton.tsx

import React from "react";
import { motion } from "framer-motion";
import { itemVariants } from "../../features/auth/constants/constantsAuth";

interface SocialButtonProps {
  icon: React.ElementType;
  label: string;
  bgColor: string;
  textColor: string;
  delay: number;
}

const SocialButton = ({
  icon: Icon,
  label,
  bgColor,
  textColor,
  delay,
}: SocialButtonProps) => (
  <motion.button
    type="button" // Luôn đặt type="button" cho các button không phải submit
    variants={itemVariants}
    transition={{ duration: 0.5, delay: delay }}
    className={`w-full flex items-center justify-center px-4 py-3 rounded-xl border font-medium transition duration-300 hover:scale-[1.02] active:scale-95 ${bgColor} ${textColor} border-gray-300 shadow-md`}
  >
    <Icon className="w-6 h-6 mr-3" />
    {label}
  </motion.button>
);

export default SocialButton;
