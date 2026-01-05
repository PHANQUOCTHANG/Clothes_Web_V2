"use client";

interface Activity {
  type: string;
  title: string;
  description: string;
  time: string;
  icon?: string;
  images?: string[];
  color: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
        HOẠT ĐỘNG GẦN ĐÂY
      </h3>
      <div className="space-y-4">
        {activities.map((activity, idx) => (
          <div key={idx} className="flex gap-2 sm:gap-3">
            <div
              className={`${activity.color} w-8 sm:w-10 h-8 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg sm:text-xl`}
            >
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-xs sm:text-sm text-gray-800 truncate">
                {activity.title}
              </div>
              <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                {activity.description}
              </div>
              {activity.images && (
                <div className="flex gap-2 mt-2">
                  {activity.images.map((img, i) => (
                    <span key={i} className="text-lg sm:text-xl">
                      {img}
                    </span>
                  ))}
                </div>
              )}
              <div className="text-xs text-gray-500 mt-2 truncate">
                {activity.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
