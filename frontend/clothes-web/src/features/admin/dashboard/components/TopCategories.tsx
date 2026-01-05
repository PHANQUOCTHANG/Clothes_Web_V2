"use client";

interface Category {
  name: string;
  count: string;
}

interface TopCategoriesProps {
  categories: Category[];
}

export const TopCategories = ({ categories }: TopCategoriesProps) => {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
        TOP 10 DANH MỤC
      </h3>
      <div className="space-y-2 sm:space-y-3 max-h-96 overflow-y-auto">
        {categories.map((category, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center gap-2 text-xs sm:text-sm"
          >
            <span className="text-gray-700 truncate flex-1">
              {idx + 1}. {category.name}
            </span>
            <span className="font-medium text-gray-600 flex-shrink-0 whitespace-nowrap">
              ({category.count})
            </span>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-xs sm:text-sm text-blue-600 hover:underline">
        Xem tất cả danh mục
      </button>
    </div>
  );
};
