"use client";

interface SalesLocation {
  country: string;
  percentage: number;
  color: string;
}

interface SalesByLocationProps {
  locations: SalesLocation[];
}

export const SalesByLocation = ({ locations }: SalesByLocationProps) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
          Doanh số bán hàng theo vị trí
        </h3>
        <button className="text-xs sm:text-sm text-blue-600 hover:underline text-left">
          Xuất báo cáo
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="relative min-h-[250px] lg:min-h-auto">
          <svg viewBox="0 0 800 400" className="w-full h-auto">
            <path
              d="M50,200 Q200,100 400,200 T750,200"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
            />
            <circle cx="200" cy="150" r="6" fill="#10b981" />
            <circle cx="180" cy="180" r="6" fill="#3b82f6" />
            <circle cx="550" cy="120" r="6" fill="#10b981" />
            <circle cx="450" cy="220" r="6" fill="#6366f1" />
            <text x="200" y="140" fontSize="12" fill="#374151">
              Greenland
            </text>
            <text x="180" y="210" fontSize="12" fill="#374151">
              Canada
            </text>
            <text x="550" y="110" fontSize="12" fill="#374151">
              Russia
            </text>
            <text x="450" y="250" fontSize="12" fill="#374151">
              Palestine
            </text>
          </svg>
        </div>

        <div className="space-y-4">
          {locations.map((location, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-2 gap-2">
                <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">
                  {location.country}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-gray-800 flex-shrink-0">
                  {location.percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${location.color} h-2 rounded-full transition-all`}
                  style={{ width: `${location.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
