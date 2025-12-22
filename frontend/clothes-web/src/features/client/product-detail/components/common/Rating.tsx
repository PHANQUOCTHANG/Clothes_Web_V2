import { Star, ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
  home: string;
  current: string;
}

export const Breadcrumbs = ({ home, current }: BreadcrumbsProps) => (
  <div className="text-sm text-gray-500 mb-6 flex items-center space-x-2">
    <span>{home}</span>
    <ChevronRight size={14} className="text-gray-400" />
    <span className="text-gray-800">{current}</span>
  </div>
);

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: number;
  interactive?: boolean;
  onRate?: (rate: number) => void;
}

export const RatingStars = ({
  rating,
  reviewCount,
  size = 16,
  interactive = false,
  onRate,
}: RatingStarsProps) => {
  const fullStars = Math.floor(rating);
  const stars = Array(5)
    .fill(null)
    .map((_, index) => (
      <Star
        key={index}
        size={size}
        className={`
          ${
            index < fullStars
              ? "text-yellow-500 fill-yellow-500"
              : "text-gray-300"
          }
          ${
            interactive
              ? "cursor-pointer hover:text-yellow-400 hover:fill-yellow-400 transition-colors"
              : ""
          }
        `}
        style={{
          fill: index < fullStars ? "currentColor" : "none",
        }}
        onClick={() => interactive && onRate && onRate(index + 1)}
      />
    ));

  return (
    <div className="flex items-center space-x-0.5">
      <div className="flex">{stars}</div>
      {reviewCount !== undefined && (
        <span className="text-sm text-gray-600">({reviewCount} Đánh giá)</span>
      )}
    </div>
  );
};
