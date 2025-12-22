/* eslint-disable @next/next/no-img-element */
"use client";

import { ArrowRightIcon } from "@/components/common/Icons";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import React, { useState } from "react";

interface GridPostProps {
  post: {
    title: string;
    meta: string;
    summary: string;
    image: string;
    isBanner?: boolean;
  };
  index: number;
}

const BlogGridPost: React.FC<GridPostProps> = ({ post, index }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`flex flex-col rounded-lg overflow-hidden shadow-md scroll-reveal ${
        isVisible ? "animate-reveal" : ""
      }`}
      style={{ animationDelay: isVisible ? `${index * 0.1}s` : "0s" }}
    >
      <div className={`w-full ${post.isBanner ? "h-56" : "h-64"} overflow-hidden`}>
        <img
          src={isVisible ? post.image : "https://placehold.co/400x300/F3F4F6/9CA3AF?text=Loading..."}
          alt={post.title}
          className={`w-full h-full object-cover transition duration-300 ${!post.isBanner && "hover:scale-105"} ${imageLoaded ? "opacity-100" : "opacity-70"}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className="p-4 flex flex-col justify-between flex-1 bg-white">
        <div>
          <span className={`text-xs font-bold uppercase tracking-wider mb-1 block ${post.isBanner ? "text-blue-600" : "text-gray-500"}`}>
            {post.meta}
          </span>
          <h3 className={`text-lg font-bold text-gray-900 mb-2 hover:text-red-700 transition line-clamp-2 ${post.isBanner && "text-blue-600"}`}>
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">{post.summary}</p>
        </div>
        <button className="flex items-center text-sm font-semibold text-gray-800 hover:text-red-600 transition mt-3">
          Xem thêm <ArrowRightIcon className="w-4 h-4 ml-1" />
        </button>
      </div>
    </article>
  );
};

export default BlogGridPost;