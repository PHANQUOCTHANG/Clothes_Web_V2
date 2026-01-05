/**
 * Products Table Component
 * Display products in a table format for admin management
 */

import React from "react";
import { Star, MoreVertical } from "lucide-react";
import { AdminProduct, ProductAction } from "../types";
import { ActionDropdown } from "./ActionDropdown";
import { ProductDetailService } from "@/features/client/product-detail/services/productDetailService";

interface ProductsTableProps {
  products: AdminProduct[];
  openActionMenu: string | null;
  onActionMenuToggle: (productId: string | null) => void;
  onActionClick: (productId: string, action: ProductAction) => void;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  openActionMenu,
  onActionMenuToggle,
  onActionClick,
}) => {
  const getStatusColor = (status: "active" | "inactive" | "pending") => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] lg:min-w-0">
        {/* Header */}
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Product
            </th>
            <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Category
            </th>
            <th className="px-4 lg:px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-4 lg:px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Price
            </th>
            <th className="px-4 lg:px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Discount
            </th>
            <th className="px-4 lg:px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Rating
            </th>
            <th className="px-4 lg:px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 lg:px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr
              key={product._id}
              className="hover:bg-gray-50 transition-colors"
            >
              {/* Product Column */}
              <td className="px-4 lg:px-6 py-4">
                <div className="flex items-center gap-3">
                  {/* Product Image */}
                  <img
                    src={product.images?.[0] || "/images/placeholder.png"}
                    alt={product.name}
                    className="w-10 h-10 rounded-md object-cover bg-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate text-sm">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </td>

              {/* Category Column */}
              <td className="px-4 lg:px-6 py-4">
                <span className="text-sm text-gray-700">
                  {typeof product.category === "string"
                    ? product.category
                    : product.category?.name || "N/A"}
                </span>
              </td>

              {/* Stock Column */}
              <td className="px-4 lg:px-6 py-4 text-right">
                <span
                  className={`text-sm font-medium ${
                    product.stock > 5
                      ? "text-gray-900"
                      : product.stock > 0
                      ? "text-orange-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }`}
                >
                  {product.stock}
                </span>
              </td>

              {/* Price Column */}
              <td className="px-4 lg:px-6 py-4 text-right">
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-semibold text-gray-900">
                    {ProductDetailService.formatPrice(
                      ProductDetailService.calculateFinalPrice(
                        product.price,
                        product.discount
                      )
                    )}
                  </span>
                  {product.discount > 0 && (
                    <span className="text-xs text-gray-500 line-through">
                      {ProductDetailService.formatPrice(product.price)}
                    </span>
                  )}
                </div>
              </td>

              {/* Discount Column */}
              <td className="px-4 lg:px-6 py-4 text-right">
                {product.discount > 0 ? (
                  <span className="text-sm font-semibold text-red-600">
                    -{product.discount}%
                  </span>
                ) : (
                  <span className="text-sm text-gray-500">-</span>
                )}
              </td>

              {/* Rating Column */}
              <td className="px-4 lg:px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-900">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({product.amountBuy})
                  </span>
                </div>
              </td>

              {/* Status Column */}
              <td className="px-4 lg:px-6 py-4 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    product.status
                  )}`}
                >
                  {ProductDetailService.getStatusLabel(product.status)}
                </span>
              </td>

              {/* Actions Column */}
              <td className="px-4 lg:px-6 py-4 text-center">
                <div className="relative inline-block">
                  <button
                    onClick={() =>
                      onActionMenuToggle(
                        openActionMenu === product._id ? null : product._id
                      )
                    }
                    className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                    aria-label="Actions"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-600" />
                  </button>

                  {/* Dropdown menu */}
                  {openActionMenu === product._id && (
                    <ActionDropdown productId={product._id} />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
