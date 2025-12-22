export const SkeletonLoader = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-4 bg-gray-200 rounded w-full"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    <div className="grid grid-cols-2 gap-4">
      <div className="h-8 bg-gray-200 rounded"></div>
      <div className="h-8 bg-gray-200 rounded"></div>
    </div>
    <div className="h-40 bg-gray-200 rounded"></div>
  </div>
);

export const ProductCardSkeleton = () => (
  <div className="p-2">
    <div className="aspect-[3/4] bg-gray-200 rounded-lg animate-pulse mb-3"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-1"></div>
    <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
  </div>
);
