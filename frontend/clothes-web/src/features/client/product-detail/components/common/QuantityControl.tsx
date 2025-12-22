import { useCallback } from "react";
import { Minus, Plus } from "lucide-react";

interface QuantityControlProps {
  quantity: number;
  setQuantity: (quantity: number | ((prev: number) => number)) => void;
}

export const QuantityControl = ({
  quantity,
  setQuantity,
}: QuantityControlProps) => {
  const handleQuantityChange = useCallback(
    (amount: number) => {
      setQuantity((prev: number) => Math.max(1, prev + amount));
    },
    [setQuantity]
  );

  return (
    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
      <button
        onClick={() => handleQuantityChange(-1)}
        className="p-3 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        disabled={quantity <= 1}
      >
        <Minus size={16} />
      </button>
      <input
        type="text"
        value={quantity}
        readOnly
        className="w-12 text-center text-sm font-medium border-x border-gray-300 bg-white focus:outline-none"
      />
      <button
        onClick={() => handleQuantityChange(1)}
        className="p-3 text-gray-700 hover:bg-gray-100"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};
