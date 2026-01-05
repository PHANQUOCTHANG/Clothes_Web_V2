import React from "react";
import { Plus } from "lucide-react";
import { Channel } from "../types";

interface ChannelListProps {
  channels: Channel[];
  onAddChannel: () => void;
}

export const ChannelList: React.FC<ChannelListProps> = ({
  channels,
  onAddChannel,
}) => {
  return (
    <>
      {/* Channels Section */}
      <div className="mt-4 px-4 bg-white">
        <div className="flex justify-between items-center py-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            CHANNELS
          </h3>
          <button
            onClick={onAddChannel}
            className="w-6 h-6 bg-green-50 text-green-600 rounded flex items-center justify-center hover:bg-green-100 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Channel Items */}
        {channels.map((channel, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 py-2.5 cursor-pointer hover:bg-gray-50 rounded-md px-2 transition-colors"
          >
            <span className="text-gray-400 text-sm">#</span>
            <div className="flex-1 text-sm font-normal text-gray-700">
              {channel.name}
            </div>
            {channel.unread > 0 && (
              <div className="bg-gray-600 text-white text-xs font-medium px-2 py-0.5 rounded-full min-w-[20px] text-center">
                {channel.unread}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
