/* eslint-disable @next/next/no-img-element */
"use client";

import { ArrowRightIcon } from "@/components/common/Icons";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import React, { useState } from "react";

interface PostProps {
  post: {
    title: string;
    meta: string;
    summary: string;
    image: string;
    date: string;
  };
}

const LAZY_IMAGE_PLACEHOLDER = "https://placehold.co/400x300/F3F4F6/9CA3AF?text=Đang+tải...";

const BlogFeaturedPost: React.FC<PostProps> = ({ post }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`flex flex-col md:flex-row mb-12 lg:mb-16 border border-gray-100 rounded-lg overflow-hidden shadow-lg scroll-reveal ${
        isVisible ? "animate-reveal" : ""
      }`}
    >
      <div className="md:w-5/12 w-full h-80 md:h-auto overflow-hidden flex-shrink-0">
        <img
          src={isVisible ? post.image : LAZY_IMAGE_PLACEHOLDER}
          alt={post.title}
          className={`w-full h-full object-cover transition duration-500 transform hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-70"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className="md:w-7/12 w-full p-6 md:p-8 flex flex-col justify-between bg-white">
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2 block">
            {post.meta}
          </span>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 hover:text-red-700 transition leading-snug">
            {post.title}
          </h2>
          <p className="text-gray-600 text-base line-clamp-3 mb-4">{post.summary}</p>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <span className="text-sm text-gray-500">Đăng ngày: {post.date}</span>
          <button className="flex items-center text-sm font-semibold text-gray-800 hover:text-red-600 transition">
            Xem thêm <ArrowRightIcon className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogFeaturedPost;