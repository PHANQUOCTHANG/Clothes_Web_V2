import { useState, ReactNode } from "react";

interface OverlayTooltipProps {
  text: string;
  children: ReactNode;
}

export const OverlayTooltip = ({ text, children }: OverlayTooltipProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute top-1/2 right-12 transform -translate-y-1/2 z-20">
          <div className="px-3 py-1 text-sm font-semibold text-white bg-gray-900 rounded-lg shadow-xl whitespace-nowrap">
            {text}
          </div>
          <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-gray-900 border-y-4 border-y-transparent"></div>
        </div>
      )}
      {children}
    </div>
  );
};

interface WashingIconProps {
  children: ReactNode;
  label: string;
}

export const WashingIcon = ({ children, label }: WashingIconProps) => (
  <div
    title={label}
    className="w-8 h-8 flex items-center justify-center text-gray-700"
  >
    {children}
  </div>
);

interface MessageComponentProps {
  message: string;
  type: "success" | "error";
}

export const MessageComponent = ({ message, type }: MessageComponentProps) => {
  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";
  return (
    <div
      className={`fixed bottom-4 right-4 text-white p-3 rounded-lg shadow-xl z-50 transition-opacity duration-300 ${bgColor}`}
    >
      {message}
    </div>
  );
};
